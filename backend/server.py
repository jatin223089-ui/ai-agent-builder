from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from fastapi.exceptions import RequestValidationError
from starlette.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
import os
import json
import logging
import asyncio
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone
from openai import AsyncOpenAI

from database import Agent as AgentModel, Message as MessageModel, init_db, get_db, async_session

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ONLY use Groq API (FREE)
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable not set. Get it from https://console.groq.com")

# Initialize Groq client
API_KEY = GROQ_API_KEY
BASE_URL = "https://api.groq.com/openai/v1"
logger.info("✅ Using Groq API (FREE - 14,400 requests/day)")

# Initialize the OpenAI-compatible client pointing to Groq
client = AsyncOpenAI(api_key=API_KEY, base_url=BASE_URL)

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Global Exception Handler ----------
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    """Convert Pydantic validation errors to proper JSON responses"""
    errors = []
    for error in exc.errors():
        errors.append({
            "field": ".".join(str(x) for x in error["loc"][1:]),
            "message": error["msg"],
        })
    logger.error(f"Validation error: {errors}")
    return JSONResponse(
        status_code=422,
        content={"detail": "Validation error", "errors": errors},
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Catch any unhandled exceptions and return proper JSON"""
    logger.exception(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
    )


# ---------- Models ----------
class Agent(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str = ""
    system_prompt: str
    provider: str = "groq"
    model: str = "llama-3.1-8b-instant"
    temperature: float = 0.7
    template: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class AgentCreate(BaseModel):
    name: str
    description: str = ""
    system_prompt: str
    provider: str = "groq"
    model: str = "llama-3.1-8b-instant"
    temperature: float = 0.7
    template: Optional[str] = None


class AgentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    system_prompt: Optional[str] = None
    provider: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = None
    template: Optional[str] = None


class Message(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    agent_id: str
    role: str
    content: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ChatRequest(BaseModel):
    message: str


# ---------- Helpers ----------
async def _get_agent_or_404(agent_id: str, db: AsyncSession) -> AgentModel:
    result = await db.execute(select(AgentModel).where(AgentModel.id == agent_id))
    agent = result.scalar_one_or_none()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent


def agent_model_to_schema(agent: AgentModel) -> Agent:
    return Agent(
        id=agent.id,
        name=agent.name,
        description=agent.description,
        system_prompt=agent.system_prompt,
        provider=agent.provider,
        model=agent.model,
        temperature=agent.temperature,
        template=agent.template,
        created_at=agent.created_at.isoformat(),
    )


def message_model_to_schema(msg: MessageModel) -> Message:
    return Message(
        id=msg.id,
        agent_id=msg.agent_id,
        role=msg.role,
        content=msg.content,
        created_at=msg.created_at.isoformat(),
    )


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Forge agent builder API", "status": "ok"}


@api_router.post("/agents", response_model=Agent)
async def create_agent(payload: AgentCreate, db: AsyncSession = Depends(get_db)):
    agent = AgentModel(
        id=str(uuid.uuid4()),
        name=payload.name,
        description=payload.description,
        system_prompt=payload.system_prompt,
        provider=payload.provider,
        model=payload.model,
        temperature=payload.temperature,
        template=payload.template,
    )
    db.add(agent)
    await db.commit()
    await db.refresh(agent)
    return agent_model_to_schema(agent)


@api_router.get("/agents", response_model=List[Agent])
async def list_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentModel).order_by(AgentModel.created_at.desc()))
    agents = result.scalars().all()
    return [agent_model_to_schema(a) for a in agents]


@api_router.get("/agents/{agent_id}", response_model=Agent)
async def get_agent(agent_id: str, db: AsyncSession = Depends(get_db)):
    agent = await _get_agent_or_404(agent_id, db)
    return agent_model_to_schema(agent)


@api_router.put("/agents/{agent_id}", response_model=Agent)
async def update_agent(agent_id: str, payload: AgentUpdate, db: AsyncSession = Depends(get_db)):
    agent = await _get_agent_or_404(agent_id, db)
    
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    for key, value in updates.items():
        setattr(agent, key, value)
    
    db.add(agent)
    await db.commit()
    await db.refresh(agent)
    return agent_model_to_schema(agent)


@api_router.delete("/agents/{agent_id}")
async def delete_agent(agent_id: str, db: AsyncSession = Depends(get_db)):
    agent = await _get_agent_or_404(agent_id, db)
    await db.delete(agent)
    await db.execute(delete(MessageModel).where(MessageModel.agent_id == agent_id))
    await db.commit()
    return {"deleted": True}


@api_router.get("/agents/{agent_id}/messages", response_model=List[Message])
async def list_messages(agent_id: str, db: AsyncSession = Depends(get_db)):
    await _get_agent_or_404(agent_id, db)
    result = await db.execute(
        select(MessageModel).where(MessageModel.agent_id == agent_id).order_by(MessageModel.created_at)
    )
    messages = result.scalars().all()
    return [message_model_to_schema(m) for m in messages]


@api_router.delete("/agents/{agent_id}/messages")
async def clear_messages(agent_id: str, db: AsyncSession = Depends(get_db)):
    await _get_agent_or_404(agent_id, db)
    await db.execute(delete(MessageModel).where(MessageModel.agent_id == agent_id))
    await db.commit()
    return {"cleared": True}


@api_router.post("/agents/{agent_id}/chat")
async def chat_with_agent(agent_id: str, payload: ChatRequest, db: AsyncSession = Depends(get_db)):
    agent = await _get_agent_or_404(agent_id, db)
    
    # Groq is required and must be configured
    if not GROQ_API_KEY:
        raise HTTPException(
            status_code=500, 
            detail="Groq API key not configured. Get it from https://console.groq.com"
        )

    # Persist user message
    user_msg = MessageModel(
        id=str(uuid.uuid4()),
        agent_id=agent_id,
        role="user",
        content=payload.message,
    )
    db.add(user_msg)
    await db.commit()

    # Get conversation history
    result = await db.execute(
        select(MessageModel).where(
            (MessageModel.agent_id == agent_id) & 
            (MessageModel.id != user_msg.id)
        ).order_by(MessageModel.created_at)
    )
    history_messages = result.scalars().all()

    # Build messages for OpenAI
    messages = []
    
    # Add previous context
    for msg in history_messages:
        messages.append({
            "role": msg.role,
            "content": msg.content,
        })
    
    # Add current user message
    messages.append({
        "role": "user",
        "content": payload.message,
    })

    async def event_generator():
        full_text_parts = []
        try:
            # Stream from OpenAI
            stream = await client.chat.completions.create(
                model=agent.model,
                messages=[
                    {"role": "system", "content": agent.system_prompt},
                    *messages,
                ],
                temperature=agent.temperature,
                stream=True,
            )
            
            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_text_parts.append(content)
                    data = json.dumps({"type": "delta", "content": content})
                    yield f"data: {data}\n\n"
        except Exception as e:
            logger.exception("stream error")
            err = json.dumps({"type": "error", "content": str(e)})
            yield f"data: {err}\n\n"

        # Save assistant message
        full_text = "".join(full_text_parts).strip()
        if full_text:
            asst_msg = MessageModel(
                id=str(uuid.uuid4()),
                agent_id=agent_id,
                role="assistant",
                content=full_text,
            )
            db.add(asst_msg)
            await db.commit()
            done = json.dumps({"type": "done", "message_id": asst_msg.id})
        else:
            done = json.dumps({"type": "done"})
        yield f"data: {done}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no", "Connection": "keep-alive"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await init_db()

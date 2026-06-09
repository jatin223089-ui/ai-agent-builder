import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Landing from "@/pages/Landing";
import Library from "@/pages/Library";
import Builder from "@/pages/Builder";
import Chat from "@/pages/Chat";
import Quiz from "@/pages/Quiz";

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <TopBar />
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Shell>
              <Landing />
            </Shell>
          }
        />
        <Route
          path="/quiz"
          element={
            <Shell>
              <Quiz />
            </Shell>
          }
        />
        <Route
          path="/library"
          element={
            <Shell>
              <Library />
            </Shell>
          }
        />
        <Route
          path="/builder"
          element={
            <Shell>
              <Builder />
            </Shell>
          }
        />
        <Route
          path="/builder/:id"
          element={
            <Shell>
              <Builder />
            </Shell>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <Shell>
              <Chat />
            </Shell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

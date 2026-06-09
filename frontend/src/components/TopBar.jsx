import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function TopBar() {
  const loc = useLocation();
  const isActive = (p) =>
    loc.pathname === p || (p !== "/" && loc.pathname.startsWith(p));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          data-testid="topbar-logo"
          className="flex items-center gap-3 group"
        >
          {/* Minimal geometric logo matching UI */}
          <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,77,0,0.6)]">
            <Logo size={28} />
          </div>

          {/* Brand Text - matching UI typography */}
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-white group-hover:text-[#ff4d00] transition-colors duration-300">
              Forge
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600 hidden sm:inline group-hover:text-[#ff6b2b] transition-colors duration-300">
              AI
            </span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-2">
          <NavLink to="/library" active={isActive("/library")} testid="nav-library">
            My Agents
          </NavLink>
          <NavLink to="/builder" active={isActive("/builder")} testid="nav-builder">
            Create New
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, active, children, testid }) {
  return (
    <Link
      to={to}
      data-testid={testid}
      className={`px-4 py-2 text-sm transition-all font-medium ${
        active
          ? "text-white bg-white/5 border border-white/10"
          : "text-zinc-400 hover:text-white border border-transparent hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}

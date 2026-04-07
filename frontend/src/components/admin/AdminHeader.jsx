"use client";

import { Menu } from "lucide-react";

export default function AdminHeader({ adminName, onMenuClick }) {
  return (
    <header className="h-16 bg-[#FFFDF9] border-b border-[#e8e0d5] flex items-center justify-between px-6 shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-[#615236] hover:text-[#3b2f1e] transition-colors"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block" />

      {/* Admin info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-semibold text-[#3b2f1e]">{adminName || "Admin"}</p>
          <p className="text-[10px] tracking-widest text-[#9e8f7e] uppercase">Administrator</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#645643] flex items-center justify-center text-white text-sm font-bold">
          {adminName ? adminName[0].toUpperCase() : "A"}
        </div>
      </div>
    </header>
  );
}

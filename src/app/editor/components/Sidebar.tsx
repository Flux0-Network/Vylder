"use client";

import { PALETTE } from "../types";
import type { ComponentType } from "../types";

interface Props {
  onAdd: (type: ComponentType) => void;
}

export function Sidebar({ onAdd }: Props) {
  return (
    <aside className="w-60 bg-[#111] border-r border-white/8 flex flex-col">
      <div className="px-4 py-3 border-b border-white/8">
        <p className="text-xs font-medium text-white/40 uppercase tracking-widest">Komponenten</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {PALETTE.map((item) => (
          <button
            key={item.type}
            onClick={() => onAdd(item.type)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/8 transition-colors group"
          >
            <span className="w-8 h-8 rounded-md bg-white/6 flex items-center justify-center text-sm font-mono text-white/60 group-hover:bg-[#7c5cfc]/20 group-hover:text-[#a78bfa] transition-colors flex-shrink-0">
              {item.icon}
            </span>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-white/8">
        <p className="text-[11px] text-white/20 text-center">Klicken zum Hinzufügen</p>
      </div>
    </aside>
  );
}

"use client";

import { PALETTE } from "../types";
import type { BlockType } from "../types";

interface Props {
  onAdd: (type: BlockType) => void;
}

export function Sidebar({ onAdd }: Props) {
  return (
    <aside className="w-52 bg-[#111] border-r border-white/8 flex flex-col flex-shrink-0">
      <div className="px-4 py-2.5 border-b border-white/8">
        <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Komponenten</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {PALETTE.map((item) => (
          <button
            key={item.type}
            onClick={() => onAdd(item.type)}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-white/8 transition-colors group"
          >
            <span className="w-7 h-7 rounded-md bg-white/6 flex items-center justify-center text-xs font-mono text-white/50 group-hover:bg-[#7c5cfc]/20 group-hover:text-[#a78bfa] transition-colors flex-shrink-0">
              {item.icon}
            </span>
            <span className="text-sm text-white/60 group-hover:text-white transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

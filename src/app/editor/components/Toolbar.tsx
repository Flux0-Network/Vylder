"use client";

import type { Tool } from "../types";

interface Props {
  tool: Tool;
  onTool: (t: Tool) => void;
  selectedCount: number;
  onDelete: () => void;
  darkCanvas: boolean;
  onToggleDark: () => void;
}

const TOOLS: { id: Tool; label: string; icon: string; key: string }[] = [
  { id: "select", label: "Auswählen", icon: "↖", key: "V" },
  { id: "frame", label: "Frame", icon: "⬚", key: "F" },
  { id: "rect", label: "Rechteck", icon: "□", key: "R" },
  { id: "circle", label: "Kreis", icon: "○", key: "O" },
  { id: "text", label: "Text", icon: "T", key: "T" },
];

export function Toolbar({ tool, onTool, selectedCount, onDelete, darkCanvas, onToggleDark }: Props) {
  return (
    <header className="h-12 bg-[#111] border-b border-white/8 flex items-center px-4 gap-3 flex-shrink-0">
      <a href="/" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">
        Vylder
      </a>
      <div className="w-px h-5 bg-white/10" />

      {/* Tool buttons */}
      <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-1">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            title={`${t.label} (${t.key})`}
            onClick={() => onTool(t.id)}
            className={`flex items-center justify-center w-8 h-7 rounded-md text-sm transition-all ${
              tool === t.id
                ? "bg-white text-black shadow-sm"
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {t.icon}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {selectedCount > 0 && (
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          Löschen ✕
        </button>
      )}

      <button
        title={darkCanvas ? "Heller Canvas" : "Dunkler Canvas"}
        onClick={onToggleDark}
        className="flex items-center justify-center w-8 h-7 rounded-md text-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
      >
        {darkCanvas ? "☀" : "☾"}
      </button>
    </header>
  );
}

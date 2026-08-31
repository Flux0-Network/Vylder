"use client";

import type { CanvasBlock } from "../types";

interface Props {
  selectedBlock: CanvasBlock | null;
  onDelete: () => void;
  onDeselect: () => void;
}

export function Toolbar({ selectedBlock, onDelete, onDeselect }: Props) {
  return (
    <header className="h-12 bg-[#111] border-b border-white/8 flex items-center px-4 gap-3">
      <a href="/" className="text-sm font-semibold text-white/80 hover:text-white transition-colors mr-2">
        Vylder
      </a>

      <div className="w-px h-5 bg-white/10" />

      <span className="text-xs text-white/30">Editor</span>

      <div className="flex-1" />

      {selectedBlock && (
        <>
          <span className="text-xs text-white/40 font-mono">{selectedBlock.type}</span>
          <button
            onClick={onDeselect}
            className="text-xs px-3 py-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/8 transition-colors"
          >
            Abwählen
          </button>
          <button
            onClick={onDelete}
            className="text-xs px-3 py-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            Löschen ✕
          </button>
        </>
      )}

      {!selectedBlock && (
        <span className="text-xs text-white/25">Klicke eine Komponente zum Auswählen</span>
      )}
    </header>
  );
}

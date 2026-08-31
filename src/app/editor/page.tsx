"use client";

import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";
import { Toolbar } from "./components/Toolbar";
import { PALETTE } from "./types";
import type { CanvasBlock, ComponentType } from "./types";

let idCounter = 0;
function newId() {
  return `block-${++idCounter}`;
}

export default function EditorPage() {
  const [blocks, setBlocks] = useState<CanvasBlock[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedBlock = blocks.find((b) => b.id === selectedId) ?? null;

  const addBlock = useCallback((type: ComponentType) => {
    const palette = PALETTE.find((p) => p.type === type)!;
    const block: CanvasBlock = {
      id: newId(),
      type,
      props: { ...palette.defaultProps },
      x: 80 + Math.random() * 200,
      y: 80 + Math.random() * 200,
      width: palette.defaultWidth,
    };
    setBlocks((prev) => [...prev, block]);
    setSelectedId(block.id);
  }, []);

  const moveBlock = useCallback((id: string, x: number, y: number) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, x: Math.round(x), y: Math.round(y) } : b))
    );
  }, []);

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    setBlocks((prev) => prev.filter((b) => b.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        deleteSelected();
      }
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedId, deleteSelected]);

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-white overflow-hidden">
      <Toolbar
        selectedBlock={selectedBlock}
        onDelete={deleteSelected}
        onDeselect={() => setSelectedId(null)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onAdd={addBlock} />
        <Canvas
          blocks={blocks}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onMove={moveBlock}
        />
      </div>
    </div>
  );
}

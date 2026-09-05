"use client";

import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";
import { Toolbar } from "./components/Toolbar";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { PALETTE } from "./types";
import type { CanvasBlock, BlockType, Tool } from "./types";

let counter = 0;
const uid = () => `b${++counter}`;

export default function EditorPage() {
  const [blocks, setBlocks] = useState<CanvasBlock[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>("select");
  const [darkCanvas, setDarkCanvas] = useState(true);

  const selectedBlock = blocks.find((b) => b.id === selectedId) ?? null;

  const addFromPalette = useCallback((type: BlockType) => {
    const item = PALETTE.find((p) => p.type === type)!;
    const block: CanvasBlock = {
      id: uid(),
      type,
      props: { ...item.defaultProps },
      x: 80 + Math.random() * 160,
      y: 80 + Math.random() * 160,
      width: item.defaultWidth,
      height: item.defaultHeight,
    };
    setBlocks((prev) => [...prev, block]);
    setSelectedId(block.id);
    setTool("select");
  }, []);

  const addFromCanvas = useCallback((block: Omit<CanvasBlock, "id">) => {
    const newBlock = { ...block, id: uid() };
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedId(newBlock.id);
    setTool("select");
  }, []);

  const updateBlock = useCallback((id: string, patch: Partial<CanvasBlock>) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, ...patch, props: patch.props ? { ...b.props, ...patch.props } : b.props }
          : b
      )
    );
  }, []);

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    setBlocks((prev) => prev.filter((b) => b.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const toolMap: Record<string, Tool> = { v: "select", r: "rect", o: "circle", f: "frame", t: "text" };
      if (toolMap[e.key.toLowerCase()]) { setTool(toolMap[e.key.toLowerCase()]); return; }

      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        deleteSelected();
      }
      if (e.key === "Escape") { setSelectedId(null); setTool("select"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedId, deleteSelected]);

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-white overflow-hidden">
      <Toolbar
        tool={tool}
        onTool={setTool}
        selectedCount={selectedId ? 1 : 0}
        onDelete={deleteSelected}
        darkCanvas={darkCanvas}
        onToggleDark={() => setDarkCanvas((d) => !d)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onAdd={addFromPalette} />
        <Canvas
          blocks={blocks}
          selectedId={selectedId}
          tool={tool}
          onSelect={setSelectedId}
          onUpdate={updateBlock}
          onAdd={addFromCanvas}
          darkCanvas={darkCanvas}
        />
        <PropertiesPanel block={selectedBlock} onChange={updateBlock} />
      </div>
    </div>
  );
}

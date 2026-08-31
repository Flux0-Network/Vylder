"use client";

import { useRef, useCallback } from "react";
import type { CanvasBlock } from "../types";
import { BlockRenderer } from "./BlockRenderer";

const CANVAS_W = 1200;
const CANVAS_H = 900;

interface Props {
  blocks: CanvasBlock[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, x: number, y: number) => void;
}

export function Canvas({ blocks, selectedId, onSelect, onMove }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (e: React.MouseEvent, block: CanvasBlock) => {
      e.preventDefault();
      e.stopPropagation();
      onSelect(block.id);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scale = rect.width / CANVAS_W;

      // Offset between mouse and block's top-left corner
      const offsetX = (e.clientX - rect.left) / scale - block.x;
      const offsetY = (e.clientY - rect.top) / scale - block.y;

      const onMouseMove = (ev: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        const mx = (ev.clientX - r.left) / scale;
        const my = (ev.clientY - r.top) / scale;
        const newX = Math.max(0, Math.min(CANVAS_W - block.width, mx - offsetX));
        const newY = Math.max(0, Math.min(CANVAS_H - 40, my - offsetY));
        onMove(block.id, newX, newY);
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [onSelect, onMove]
  );

  return (
    <div className="flex-1 bg-[#1a1a1a] overflow-auto">
      <div className="min-w-full min-h-full p-12 flex items-start justify-center">
        <div
          ref={canvasRef}
          className="relative bg-white rounded-lg shadow-2xl flex-shrink-0"
          style={{ width: CANVAS_W, height: CANVAS_H }}
          onClick={() => onSelect(null)}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 rounded-lg pointer-events-none opacity-25"
            style={{
              backgroundImage: "radial-gradient(circle, #bbb 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {blocks.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <div className="text-5xl mb-3 opacity-20">✦</div>
              <p className="text-sm font-medium text-gray-400">Leere Canvas</p>
              <p className="text-xs text-gray-300 mt-1">Wähle links eine Komponente aus</p>
            </div>
          )}

          {blocks.map((block) => (
            <div
              key={block.id}
              className="absolute cursor-move select-none"
              style={{ left: block.x, top: block.y, width: block.width }}
              onMouseDown={(e) => startDrag(e, block)}
              onClick={(e) => { e.stopPropagation(); onSelect(block.id); }}
            >
              <div
                className={`rounded transition-shadow ${
                  selectedId === block.id
                    ? "outline outline-2 outline-offset-1 outline-[#7c5cfc] shadow-[0_0_0_4px_rgba(124,92,252,0.12)]"
                    : "hover:outline hover:outline-1 hover:outline-offset-1 hover:outline-gray-300"
                }`}
              >
                <BlockRenderer block={block} selected={selectedId === block.id} />
              </div>

              {selectedId === block.id && (
                <>
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#7c5cfc] rounded-sm pointer-events-none" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#7c5cfc] rounded-sm pointer-events-none" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#7c5cfc] rounded-sm pointer-events-none" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#7c5cfc] rounded-sm pointer-events-none" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

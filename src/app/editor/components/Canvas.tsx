"use client";

import { useRef, useCallback, useState } from "react";
import type { CanvasBlock, Tool } from "../types";
import { BlockRenderer } from "./BlockRenderer";
import { snapToOthers, applyResize, type ResizeHandle } from "../utils/snap";

const CANVAS_W = 1440;
const CANVAS_H = 960;

const HANDLES: ResizeHandle[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];

const HANDLE_STYLE: Record<ResizeHandle, React.CSSProperties> = {
  nw: { top: -5, left: -5, cursor: "nw-resize" },
  n:  { top: -5, left: "50%", transform: "translateX(-50%)", cursor: "n-resize" },
  ne: { top: -5, right: -5, cursor: "ne-resize" },
  e:  { right: -5, top: "50%", transform: "translateY(-50%)", cursor: "e-resize" },
  se: { bottom: -5, right: -5, cursor: "se-resize" },
  s:  { bottom: -5, left: "50%", transform: "translateX(-50%)", cursor: "s-resize" },
  sw: { bottom: -5, left: -5, cursor: "sw-resize" },
  w:  { left: -5, top: "50%", transform: "translateY(-50%)", cursor: "w-resize" },
};

interface DrawPreview { x: number; y: number; width: number; height: number }

interface Props {
  blocks: CanvasBlock[];
  selectedId: string | null;
  tool: Tool;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, patch: Partial<CanvasBlock>) => void;
  onAdd: (block: Omit<CanvasBlock, "id">) => void;
}

export function Canvas({ blocks, selectedId, tool, onSelect, onUpdate, onAdd }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [guideX, setGuideX] = useState<number | null>(null);
  const [guideY, setGuideY] = useState<number | null>(null);
  const [drawing, setDrawing] = useState<DrawPreview | null>(null);

  function canvasCoords(clientX: number, clientY: number) {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scale = rect.width / CANVAS_W;
    return {
      x: (clientX - rect.left) / scale,
      y: (clientY - rect.top) / scale,
      scale,
    };
  }

  // ── Move ─────────────────────────────────────────────────────────────────
  const startMove = useCallback(
    (e: React.MouseEvent, block: CanvasBlock) => {
      if (tool !== "select") return;
      e.preventDefault();
      e.stopPropagation();
      onSelect(block.id);

      const { x: cx, y: cy } = canvasCoords(e.clientX, e.clientY);
      const offsetX = cx - block.x;
      const offsetY = cy - block.y;
      const others = blocks.filter((b) => b.id !== block.id);

      function onMove(ev: MouseEvent) {
        const { x: mx, y: my } = canvasCoords(ev.clientX, ev.clientY);
        const raw = { x: mx - offsetX, y: my - offsetY, width: block.width, height: block.height };
        const { x, y, guideX: gx, guideY: gy } = snapToOthers(raw, others);
        setGuideX(gx);
        setGuideY(gy);
        onUpdate(block.id, {
          x: Math.max(0, Math.min(CANVAS_W - block.width, x)),
          y: Math.max(0, Math.min(CANVAS_H - block.height, y)),
        });
      }

      function onUp() {
        setGuideX(null);
        setGuideY(null);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      }

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [tool, blocks, onSelect, onUpdate]
  );

  // ── Resize ────────────────────────────────────────────────────────────────
  const startResize = useCallback(
    (e: React.MouseEvent, block: CanvasBlock, handle: ResizeHandle) => {
      e.preventDefault();
      e.stopPropagation();

      const { x: startX, y: startY, scale } = canvasCoords(e.clientX, e.clientY);
      const origin = { x: block.x, y: block.y, width: block.width, height: block.height };

      function onMove(ev: MouseEvent) {
        const rect = canvasRef.current!.getBoundingClientRect();
        const mx = (ev.clientX - rect.left) / scale;
        const my = (ev.clientY - rect.top) / scale;
        const dx = mx - startX;
        const dy = my - startY;
        onUpdate(block.id, applyResize(handle, origin, dx, dy));
      }

      function onUp() {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      }

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [onUpdate]
  );

  // ── Draw shapes ───────────────────────────────────────────────────────────
  const startDraw = useCallback(
    (e: React.MouseEvent) => {
      if (tool === "select") return;
      e.preventDefault();

      const { x: sx, y: sy, scale } = canvasCoords(e.clientX, e.clientY);
      setDrawing({ x: sx, y: sy, width: 0, height: 0 });

      function onMove(ev: MouseEvent) {
        const rect = canvasRef.current!.getBoundingClientRect();
        const mx = (ev.clientX - rect.left) / scale;
        const my = (ev.clientY - rect.top) / scale;
        setDrawing({
          x: Math.min(sx, mx),
          y: Math.min(sy, my),
          width: Math.abs(mx - sx),
          height: Math.abs(my - sy),
        });
      }

      function onUp(ev: MouseEvent) {
        const rect = canvasRef.current!.getBoundingClientRect();
        const mx = (ev.clientX - rect.left) / scale;
        const my = (ev.clientY - rect.top) / scale;
        const w = Math.abs(mx - sx);
        const h = Math.abs(my - sy);

        if (w > 4 && h > 4) {
          const typeMap: Record<Tool, CanvasBlock["type"]> = {
            rect: "rect",
            circle: "circle",
            frame: "frame",
            text: "text",
            select: "rect",
          };
          onAdd({
            type: typeMap[tool],
            x: Math.min(sx, mx),
            y: Math.min(sy, my),
            width: w,
            height: h,
            props: {
              fill: tool === "frame" ? "transparent" : "#d1d5db",
              fillOpacity: 1,
              stroke: tool === "frame" ? "#9ca3af" : undefined,
              strokeWidth: tool === "frame" ? 1 : 0,
              radius: tool === "circle" ? 9999 : 0,
              ...(tool === "text" ? { text: "Text", fontSize: 18, color: "#111111" } : {}),
            },
          });
        }
        setDrawing(null);

        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      }

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [tool, onAdd]
  );

  const selected = blocks.find((b) => b.id === selectedId);

  return (
    <div className="flex-1 bg-[#1a1a1a] overflow-auto">
      <div className="min-w-full min-h-full p-10 flex items-start justify-center">
        <div
          ref={canvasRef}
          className="relative bg-white rounded-xl shadow-2xl flex-shrink-0"
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            cursor: tool === "select" ? "default" : "crosshair",
          }}
          onMouseDown={startDraw}
          onClick={() => onSelect(null)}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, #aaa 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Snap guides */}
          {guideX !== null && (
            <div
              className="absolute top-0 bottom-0 w-px bg-[#7c5cfc] opacity-70 pointer-events-none"
              style={{ left: guideX }}
            />
          )}
          {guideY !== null && (
            <div
              className="absolute left-0 right-0 h-px bg-[#7c5cfc] opacity-70 pointer-events-none"
              style={{ top: guideY }}
            />
          )}

          {/* Drawing preview */}
          {drawing && tool !== "select" && (
            <div
              className="absolute border-2 border-dashed border-[#7c5cfc] bg-[#7c5cfc]/10 pointer-events-none"
              style={{
                left: drawing.x,
                top: drawing.y,
                width: drawing.width,
                height: drawing.height,
                borderRadius: tool === "circle" ? "9999px" : 0,
              }}
            />
          )}

          {/* Empty state */}
          {blocks.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <div className="text-4xl mb-3 opacity-15">✦</div>
              <p className="text-sm text-gray-400">Wähle links eine Komponente oder zeichne eine Form</p>
            </div>
          )}

          {/* Blocks */}
          {blocks.map((block) => {
            const isSel = selectedId === block.id;
            const isShape = block.type === "rect" || block.type === "circle" || block.type === "frame";
            const p = block.props;

            return (
              <div
                key={block.id}
                className="absolute select-none"
                style={{
                  left: block.x,
                  top: block.y,
                  width: block.width,
                  height: block.height,
                  opacity: p.opacity ?? 1,
                  cursor: tool === "select" ? "move" : "default",
                }}
                onMouseDown={(e) => startMove(e, block)}
                onClick={(e) => { e.stopPropagation(); onSelect(block.id); }}
              >
                {/* Shape rendering */}
                {isShape && (
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundColor: p.fill === "transparent" ? "transparent" : (p.fill ?? "#d1d5db"),
                      opacity: p.fillOpacity ?? 1,
                      borderRadius: p.radius ?? (block.type === "circle" ? "9999px" : 0),
                      border: p.strokeWidth
                        ? `${p.strokeWidth}px ${block.type === "frame" ? "dashed" : "solid"} ${p.stroke ?? "#000"}`
                        : undefined,
                    }}
                  />
                )}

                {/* Component rendering */}
                {!isShape && (
                  <BlockRenderer block={block} selected={isSel} />
                )}

                {/* Selection outline */}
                {isSel && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-sm"
                    style={{
                      outline: "2px solid #7c5cfc",
                      outlineOffset: "1px",
                      boxShadow: "0 0 0 4px rgba(124,92,252,0.12)",
                    }}
                  />
                )}

                {/* Resize handles */}
                {isSel && HANDLES.map((h) => (
                  <div
                    key={h}
                    className="absolute w-2.5 h-2.5 bg-white border-2 border-[#7c5cfc] rounded-sm z-10"
                    style={{ ...HANDLE_STYLE[h], position: "absolute" }}
                    onMouseDown={(e) => { e.stopPropagation(); startResize(e, block, h); }}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

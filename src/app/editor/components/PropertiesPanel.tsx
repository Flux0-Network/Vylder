"use client";

import type { CanvasBlock } from "../types";

interface Props {
  block: CanvasBlock | null;
  onChange: (id: string, patch: Partial<CanvasBlock>) => void;
}

export function PropertiesPanel({ block, onChange }: Props) {
  if (!block) {
    return (
      <aside className="w-60 bg-[#111] border-l border-white/8 flex flex-col flex-shrink-0">
        <div className="px-4 py-2.5 border-b border-white/8">
          <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Eigenschaften</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-white/20 text-center px-4">Wähle ein Element aus</p>
        </div>
      </aside>
    );
  }

  const p = block.props;

  const setProps = (patch: typeof p) =>
    onChange(block.id, { props: { ...p, ...patch } });

  const setGeom = (patch: Partial<Pick<CanvasBlock, "x" | "y" | "width" | "height">>) =>
    onChange(block.id, patch);

  const isShape = block.type === "rect" || block.type === "circle" || block.type === "frame";
  const isText = block.type === "heading" || block.type === "text";

  return (
    <aside className="w-60 bg-[#111] border-l border-white/8 flex flex-col flex-shrink-0 overflow-y-auto">
      <div className="px-4 py-2.5 border-b border-white/8 flex-shrink-0">
        <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Eigenschaften</p>
      </div>

      <div className="flex-1 p-3 space-y-4">

        {/* Transform */}
        <Section label="Transform">
          <div className="grid grid-cols-2 gap-1.5">
            <NumInput label="X" value={block.x} onChange={(v) => setGeom({ x: v })} />
            <NumInput label="Y" value={block.y} onChange={(v) => setGeom({ y: v })} />
            <NumInput label="B" value={block.width} onChange={(v) => setGeom({ width: Math.max(20, v) })} />
            <NumInput label="H" value={block.height} onChange={(v) => setGeom({ height: Math.max(4, v) })} />
          </div>
        </Section>

        {/* Fill */}
        <Section label="Füllung">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="color"
                value={p.fill ?? "#ffffff"}
                onChange={(e) => setProps({ fill: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent p-0.5"
              />
            </div>
            <code className="text-xs text-white/60 font-mono">{p.fill ?? "#ffffff"}</code>
            <div className="flex-1" />
            <NumInput
              label="%"
              value={Math.round((p.fillOpacity ?? 1) * 100)}
              onChange={(v) => setProps({ fillOpacity: Math.min(1, Math.max(0, v / 100)) })}
              min={0}
              max={100}
              compact
            />
          </div>
        </Section>

        {/* Stroke */}
        <Section label="Rahmen">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={p.stroke ?? "#000000"}
              onChange={(e) => setProps({ stroke: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent p-0.5"
            />
            <code className="text-xs text-white/60 font-mono">{p.stroke ?? "–"}</code>
            <div className="flex-1" />
            <NumInput
              label="px"
              value={p.strokeWidth ?? 0}
              onChange={(v) => setProps({ strokeWidth: Math.max(0, v) })}
              compact
            />
          </div>
        </Section>

        {/* Radius */}
        {(isShape || block.type === "button") && (
          <Section label="Radius">
            <NumInput
              label="px"
              value={p.radius ?? 0}
              onChange={(v) => setProps({ radius: Math.max(0, v) })}
            />
          </Section>
        )}

        {/* Opacity */}
        <Section label="Deckkraft">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round((p.opacity ?? 1) * 100)}
              onChange={(e) => setProps({ opacity: Number(e.target.value) / 100 })}
              className="flex-1 accent-[#7c5cfc]"
            />
            <span className="text-xs text-white/50 w-10 text-right font-mono">
              {Math.round((p.opacity ?? 1) * 100)}%
            </span>
          </div>
        </Section>

        {/* Typography (text blocks) */}
        {isText && (
          <Section label="Typografie">
            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-white/30 mb-1 block">Inhalt</label>
                <textarea
                  value={p.text ?? ""}
                  onChange={(e) => setProps({ text: e.target.value })}
                  rows={3}
                  className="w-full text-xs bg-white/5 border border-white/8 rounded-md px-2.5 py-2 text-white/80 resize-none focus:outline-none focus:border-[#7c5cfc]/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <NumInput
                  label="Größe"
                  value={p.fontSize ?? 16}
                  onChange={(v) => setProps({ fontSize: Math.max(8, v) })}
                />
                <div>
                  <label className="text-[10px] text-white/30 mb-1 block">Gewicht</label>
                  <select
                    value={p.fontWeight ?? "400"}
                    onChange={(e) => setProps({ fontWeight: e.target.value })}
                    className="w-full text-xs bg-white/5 border border-white/8 rounded-md px-2 py-1.5 text-white/70 focus:outline-none"
                  >
                    <option value="300">Light</option>
                    <option value="400">Normal</option>
                    <option value="500">Medium</option>
                    <option value="600">Semibold</option>
                    <option value="700">Bold</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={p.color ?? "#000000"}
                  onChange={(e) => setProps({ color: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent p-0.5"
                />
                <code className="text-xs text-white/50 font-mono">{p.color ?? "#000000"}</code>
              </div>
            </div>
          </Section>
        )}

        {/* Button content */}
        {block.type === "button" && (
          <Section label="Inhalt">
            <StrInput
              label="Label"
              value={p.label ?? ""}
              onChange={(v) => setProps({ label: v })}
            />
          </Section>
        )}

        {/* Navbar */}
        {block.type === "navbar" && (
          <Section label="Inhalt">
            <StrInput
              label="Brand"
              value={p.brand ?? ""}
              onChange={(v) => setProps({ brand: v })}
            />
          </Section>
        )}

      </div>
    </aside>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">{label}</p>
      {children}
    </div>
  );
}

function NumInput({
  label, value, onChange, min, max, compact,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex items-center gap-1" : ""}>
      {!compact && <label className="text-[10px] text-white/30 mb-1 block">{label}</label>}
      <input
        type="number"
        value={Math.round(value)}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full text-xs bg-white/5 border border-white/8 rounded-md px-2 py-1.5 text-white/80 focus:outline-none focus:border-[#7c5cfc]/50 font-mono"
      />
      {compact && <span className="text-[10px] text-white/30 whitespace-nowrap">{label}</span>}
    </div>
  );
}

function StrInput({
  label, value, onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] text-white/30 mb-1 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs bg-white/5 border border-white/8 rounded-md px-2.5 py-1.5 text-white/80 focus:outline-none focus:border-[#7c5cfc]/50"
      />
    </div>
  );
}

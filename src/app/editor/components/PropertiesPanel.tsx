"use client";

import { useState } from "react";
import type { CanvasBlock, BlockProps } from "../types";

interface Props {
  block: CanvasBlock | null;
  onChange: (id: string, patch: Partial<CanvasBlock>) => void;
}

export function PropertiesPanel({ block, onChange }: Props) {
  return (
    <aside className="w-[240px] bg-[#161616] border-l border-white/6 flex flex-col flex-shrink-0 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-white/6 flex-shrink-0">
        <button className="flex-1 py-2.5 text-xs text-white/40 hover:text-white/60 transition-colors">Agent</button>
        <button className="flex-1 py-2.5 text-xs text-white font-semibold border-b-2 border-white">Style</button>
      </div>

      {!block ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-white/20 text-center px-6">Wähle ein Element aus</p>
        </div>
      ) : (
        <PanelContent block={block} onChange={onChange} />
      )}
    </aside>
  );
}

function PanelContent({ block, onChange }: { block: CanvasBlock; onChange: Props["onChange"] }) {
  const p = block.props;

  const setP = (patch: Partial<BlockProps>) =>
    onChange(block.id, { props: { ...p, ...patch } });

  const setG = (patch: Partial<Pick<CanvasBlock, "x" | "y" | "width" | "height">>) =>
    onChange(block.id, patch);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Alignment toolbar */}
      <div className="px-3 py-2.5 border-b border-white/6 flex items-center justify-between">
        {[
          { icon: "⊢", title: "Links ausrichten" },
          { icon: "⊣", title: "Zentrieren horizontal" },
          { icon: "⊤", title: "Rechts ausrichten" },
          { icon: "⊥", title: "Oben ausrichten" },
          { icon: "⊡", title: "Zentrieren vertikal" },
          { icon: "⊦", title: "Unten ausrichten" },
          { icon: "↔", title: "Horizontal verteilen" },
          { icon: "↕", title: "Vertikal verteilen" },
        ].map((a) => (
          <button
            key={a.title}
            title={a.title}
            className="w-6 h-6 flex items-center justify-center rounded text-white/40 hover:text-white hover:bg-white/8 transition-colors text-xs"
          >
            {a.icon}
          </button>
        ))}
      </div>

      {/* Link */}
      <Section label="Link" collapsible defaultOpen={false}>
        <Row label="Link To">
          <input
            type="text"
            placeholder="Page or URL..."
            value={p.link ?? ""}
            onChange={(e) => setP({ link: e.target.value })}
            className="w-full bg-[#252525] border border-white/6 rounded-md px-2.5 py-1.5 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20"
          />
        </Row>
      </Section>

      {/* Position */}
      <Section label="Position">
        <Row label="Type">
          <Select
            value={p.positionType ?? "relative"}
            onChange={(v) => setP({ positionType: v as BlockProps["positionType"] })}
            options={["Relative", "Absolute", "Fixed", "Sticky"]}
          />
        </Row>
      </Section>

      {/* Size */}
      <Section label="Size">
        <div className="space-y-1.5">
          <Row label="Width">
            <div className="flex gap-1.5">
              <NumInput value={block.width} onChange={(v) => setG({ width: Math.max(4, v) })} />
              <Select
                value={p.widthType ?? "Fixed"}
                onChange={(v) => setP({ widthType: v.toLowerCase() as BlockProps["widthType"] })}
                options={["Fixed", "Fit", "Fill"]}
                compact
              />
            </div>
          </Row>
          <Row label="Height">
            <div className="flex gap-1.5">
              <NumInput value={block.height} onChange={(v) => setG({ height: Math.max(4, v) })} dimmed />
              <Select
                value={p.heightType ?? "Fit"}
                onChange={(v) => setP({ heightType: v.toLowerCase() as BlockProps["heightType"] })}
                options={["Fixed", "Fit", "Fill"]}
                compact
              />
            </div>
          </Row>
          <Row label="Max Width">
            <div className="flex gap-1.5">
              <input
                type="text"
                value={p.maxWidth ?? "100%"}
                onChange={(e) => setP({ maxWidth: e.target.value })}
                className="w-16 bg-[#252525] border border-white/6 rounded-md px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-white/20 text-center font-mono"
              />
              <Select value="Rel" onChange={() => {}} options={["Rel", "Px", "%"]} compact />
            </div>
          </Row>
        </div>
      </Section>

      {/* Layout */}
      <Section label="Layout">
        <div className="space-y-2">
          {/* Stack / Grid */}
          <Row label="Type">
            <div className="flex rounded-md overflow-hidden border border-white/8">
              {(["Stack", "Grid"] as const).map((t) => {
                const active = (p.layoutType ?? "stack") === t.toLowerCase();
                return (
                  <button
                    key={t}
                    onClick={() => setP({ layoutType: t.toLowerCase() as "stack" | "grid" })}
                    className={`flex-1 py-1.5 text-xs transition-colors ${
                      active ? "bg-white/15 text-white font-medium" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </Row>

          {/* Direction */}
          <Row label="Direction">
            <div className="flex gap-1.5">
              {[
                { dir: "horizontal" as const, icon: "↔" },
                { dir: "vertical" as const, icon: "↕" },
              ].map(({ dir, icon }) => {
                const active = (p.layoutDir ?? "horizontal") === dir;
                return (
                  <button
                    key={dir}
                    onClick={() => setP({ layoutDir: dir })}
                    className={`w-8 h-7 rounded-md text-sm transition-colors ${
                      active ? "bg-white/15 text-white" : "bg-[#252525] text-white/40 hover:text-white/70"
                    }`}
                  >
                    {icon}
                  </button>
                );
              })}
            </div>
          </Row>

          {/* Distribute */}
          <Row label="Distribute">
            <Select
              value={p.layoutDistribute ?? "space-between"}
              onChange={(v) => setP({ layoutDistribute: v as BlockProps["layoutDistribute"] })}
              options={["start", "center", "end", "space-between", "space-around"]}
              displayMap={{ "start": "Start", "center": "Center", "end": "End", "space-between": "Space Between", "space-around": "Space Around" }}
            />
          </Row>

          {/* Align */}
          <Row label="Align">
            <div className="flex gap-1.5">
              {(["start", "center", "end"] as const).map((a) => {
                const icons = { start: "⊤", center: "⊡", end: "⊥" };
                const active = (p.layoutAlign ?? "center") === a;
                return (
                  <button
                    key={a}
                    onClick={() => setP({ layoutAlign: a })}
                    className={`w-8 h-7 rounded-md text-sm transition-colors ${
                      active ? "bg-white/15 text-white" : "bg-[#252525] text-white/40 hover:text-white/70"
                    }`}
                  >
                    {icons[a]}
                  </button>
                );
              })}
            </div>
          </Row>

          {/* Wrap */}
          <Row label="Wrap">
            <div className="flex rounded-md overflow-hidden border border-white/8">
              {(["Yes", "No"] as const).map((w) => {
                const active = (p.layoutWrap ?? false) === (w === "Yes");
                return (
                  <button
                    key={w}
                    onClick={() => setP({ layoutWrap: w === "Yes" })}
                    className={`flex-1 py-1.5 text-xs transition-colors ${
                      active ? "bg-white/15 text-white font-medium" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </Row>

          {/* Padding */}
          <div>
            <p className="text-[10px] text-white/30 mb-1.5">Padding</p>
            <div className="grid grid-cols-4 gap-1">
              {(["paddingT", "paddingR", "paddingB", "paddingL"] as const).map((key, i) => (
                <div key={key} className="flex flex-col items-center gap-0.5">
                  <NumInput
                    value={p[key] ?? [8, 12, 8, 18][i]}
                    onChange={(v) => setP({ [key]: v })}
                    compact
                  />
                  <span className="text-[9px] text-white/20">{["T", "R", "B", "L"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Appearance */}
      <Section label="Füllung">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={p.fill ?? "#ffffff"}
              onChange={(e) => setP({ fill: e.target.value })}
              className="w-7 h-7 rounded cursor-pointer border border-white/10 bg-transparent p-0.5 flex-shrink-0"
            />
            <code className="text-xs text-white/50 font-mono flex-1">{p.fill ?? "#ffffff"}</code>
            <NumInput
              value={Math.round((p.fillOpacity ?? 1) * 100)}
              onChange={(v) => setP({ fillOpacity: Math.min(1, Math.max(0, v / 100)) })}
              compact
              suffix="%"
            />
          </div>
        </div>
      </Section>

      <Section label="Rahmen">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={p.stroke ?? "#000000"}
            onChange={(e) => setP({ stroke: e.target.value })}
            className="w-7 h-7 rounded cursor-pointer border border-white/10 bg-transparent p-0.5 flex-shrink-0"
          />
          <code className="text-xs text-white/50 font-mono flex-1">{p.stroke ?? "–"}</code>
          <NumInput
            value={p.strokeWidth ?? 0}
            onChange={(v) => setP({ strokeWidth: Math.max(0, v) })}
            compact
            suffix="px"
          />
        </div>
      </Section>

      {/* Effects */}
      <Section label="Effects" collapsible defaultOpen={false}>
        <p className="text-xs text-white/25 italic">Keine Effects</p>
      </Section>

      {/* Overlays */}
      <Section label="Overlays" collapsible defaultOpen={false}>
        <p className="text-xs text-white/25 italic">Keine Overlays</p>
      </Section>

      {/* Cursor */}
      <Section label="Cursor" collapsible defaultOpen={false}>
        <Select value="auto" onChange={() => {}} options={["auto", "pointer", "default", "text", "grab"]} />
      </Section>

      {/* Styles */}
      <Section label="Styles" collapsible defaultOpen={false}>
        <p className="text-xs text-white/25 italic">Keine Styles</p>
      </Section>

      {/* Opacity */}
      <div className="px-3 py-3 border-t border-white/6 flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-white/50 w-14">Deckkraft</span>
        <NumInput
          value={Math.round((p.opacity ?? 1) * 100) / 100}
          onChange={(v) => setP({ opacity: Math.min(1, Math.max(0, v)) })}
          compact
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={p.opacity ?? 1}
          onChange={(e) => setP({ opacity: Number(e.target.value) })}
          className="flex-1 accent-white h-1"
        />
      </div>
    </div>
  );
}

function Section({
  label, children, collapsible, defaultOpen = true,
}: {
  label: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/6">
      <button
        className="w-full flex items-center justify-between px-3 py-2.5 text-left"
        onClick={() => collapsible && setOpen((o) => !o)}
      >
        <span className="text-xs font-semibold text-white/80">{label}</span>
        {collapsible && (
          <span className="text-white/30 text-sm">{open ? "−" : "+"}</span>
        )}
        {!collapsible && <span className="text-white/30 text-sm">+</span>}
      </button>
      {open && <div className="px-3 pb-3 space-y-1.5">{children}</div>}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/40 w-20 flex-shrink-0">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function NumInput({
  value, onChange, compact, dimmed, suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  compact?: boolean;
  dimmed?: boolean;
  suffix?: string;
}) {
  return (
    <div className="relative flex items-center">
      <input
        type="number"
        value={Math.round(value * 100) / 100}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`bg-[#252525] border border-white/6 rounded-md text-xs font-mono focus:outline-none focus:border-white/20 text-center
          ${compact ? "w-12 py-1.5 px-1" : "w-full py-1.5 px-2"}
          ${dimmed ? "text-white/30" : "text-white/70"}`}
      />
      {suffix && <span className="absolute right-1 text-[9px] text-white/25 pointer-events-none">{suffix}</span>}
    </div>
  );
}

function Select({
  value, onChange, options, compact, displayMap,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  compact?: boolean;
  displayMap?: Record<string, string>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-[#252525] border border-white/6 rounded-md text-xs text-white/70 focus:outline-none focus:border-white/20 appearance-none
        ${compact ? "w-16 px-1.5 py-1.5" : "w-full px-2 py-1.5"}`}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {displayMap?.[o] ?? o}
        </option>
      ))}
    </select>
  );
}

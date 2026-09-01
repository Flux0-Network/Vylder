"use client";

import { useState } from "react";
import type { CanvasBlock } from "../types";

interface Props {
  block: CanvasBlock;
  selected: boolean;
}

export function BlockRenderer({ block }: Props) {
  const { type, props: p } = block;

  const textStyle = {
    color: p.color ?? undefined,
    fontSize: p.fontSize ? `${p.fontSize}px` : undefined,
    fontWeight: p.fontWeight ?? undefined,
    textAlign: (p.textAlign as React.CSSProperties["textAlign"]) ?? undefined,
  };

  if (type === "heading") {
    const Tag = (p.level ?? "h2") as "h1" | "h2" | "h3";
    const defaults: Record<string, string> = { h1: "2.25rem", h2: "1.5rem", h3: "1.25rem" };
    return (
      <Tag style={{ ...textStyle, fontSize: p.fontSize ? `${p.fontSize}px` : defaults[Tag], fontWeight: p.fontWeight ?? "700", margin: 0 }}>
        {p.text ?? "Überschrift"}
      </Tag>
    );
  }

  if (type === "text") {
    return (
      <p style={{ ...textStyle, margin: 0, lineHeight: 1.6 }}>
        {p.text ?? "Text"}
      </p>
    );
  }

  if (type === "button") {
    const isPrimary = p.variant !== "outline";
    return (
      <button
        style={{
          background: isPrimary ? (p.fill ?? "#7c5cfc") : "transparent",
          color: isPrimary ? "#fff" : (p.fill ?? "#7c5cfc"),
          border: isPrimary ? "none" : `2px solid ${p.fill ?? "#7c5cfc"}`,
          borderRadius: `${p.radius ?? 8}px`,
          padding: "8px 16px",
          fontWeight: 500,
          fontSize: "14px",
          cursor: "default",
          whiteSpace: "nowrap",
        }}
      >
        {p.label ?? "Button"}
      </button>
    );
  }

  if (type === "navbar") {
    return (
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: p.fill ?? "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: `${p.radius ?? 8}px`,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontWeight: 600, color: "#111" }}>{p.brand ?? "Brand"}</span>
        <div style={{ display: "flex", gap: 20, fontSize: 14, color: "#666" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Über uns</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Kontakt</a>
        </div>
      </nav>
    );
  }

  if (type === "dropdown") {
    return <DropdownBlock label={p.label ?? "Menü"} items={(p.items ?? "").split(",")} />;
  }

  if (type === "divider") {
    return (
      <hr
        style={{
          border: "none",
          borderTop: `${p.strokeWidth ?? 1}px solid ${p.stroke ?? "#e5e7eb"}`,
          width: "100%",
          margin: 0,
        }}
      />
    );
  }

  if (type === "image") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: p.fill ?? "#f3f4f6",
          border: "2px dashed #d1d5db",
          borderRadius: `${p.radius ?? 8}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: 13,
          gap: 6,
        }}
      >
        <span style={{ fontSize: 28 }}>⬜</span>
        <span>{p.alt ?? "Bild"}</span>
      </div>
    );
  }

  return null;
}

function DropdownBlock({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          fontSize: 14,
          color: "#374151",
          cursor: "default",
        }}
      >
        {label}
        <span style={{ transform: open ? "rotate(180deg)" : undefined, display: "inline-block" }}>▾</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "100%",
            marginTop: 4,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "4px 0",
            minWidth: 140,
            zIndex: 10,
          }}
        >
          {items.map((item) => (
            <div key={item} style={{ padding: "8px 14px", fontSize: 14, color: "#374151", cursor: "default" }}>
              {item.trim()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

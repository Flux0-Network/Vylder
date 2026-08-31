"use client";

import { useState } from "react";
import type { CanvasBlock } from "../types";

interface Props {
  block: CanvasBlock;
  selected: boolean;
}

export function BlockRenderer({ block, selected }: Props) {
  const { type, props } = block;

  return (
    <div
      className={`outline-2 outline-offset-2 rounded transition-all ${
        selected ? "outline outline-[#7c5cfc]" : "outline-transparent hover:outline hover:outline-white/20"
      }`}
    >
      {type === "heading" && (
        <HeadingBlock text={props.text} level={props.level as "h1" | "h2" | "h3"} />
      )}
      {type === "text" && <TextBlock text={props.text} />}
      {type === "button" && <ButtonBlock label={props.label} variant={props.variant} />}
      {type === "navbar" && <NavbarBlock brand={props.brand} />}
      {type === "dropdown" && (
        <DropdownBlock label={props.label} items={props.items.split(",")} />
      )}
      {type === "divider" && <DividerBlock />}
      {type === "image" && <ImageBlock alt={props.alt} height={props.height} />}
    </div>
  );
}

function HeadingBlock({ text, level }: { text: string; level: "h1" | "h2" | "h3" }) {
  const Tag = level;
  const sizes = { h1: "text-4xl font-bold", h2: "text-2xl font-semibold", h3: "text-xl font-medium" };
  return <Tag className={`${sizes[level]} text-gray-900`}>{text}</Tag>;
}

function TextBlock({ text }: { text: string }) {
  return <p className="text-gray-700 leading-relaxed">{text}</p>;
}

function ButtonBlock({ label, variant }: { label: string; variant: string }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        variant === "primary"
          ? "bg-[#7c5cfc] text-white hover:bg-[#6d4ef0]"
          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function NavbarBlock({ brand }: { brand: string }) {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
      <span className="font-semibold text-gray-900">{brand}</span>
      <div className="flex gap-4 text-sm text-gray-600">
        <a href="#" className="hover:text-gray-900">Home</a>
        <a href="#" className="hover:text-gray-900">Über uns</a>
        <a href="#" className="hover:text-gray-900">Kontakt</a>
      </div>
    </nav>
  );
}

function DropdownBlock({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {label}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="absolute left-0 mt-1 min-w-[140px] bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
          {items.map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              {item.trim()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DividerBlock() {
  return <hr className="border-gray-200" />;
}

function ImageBlock({ alt, height }: { alt: string; height: string }) {
  return (
    <div
      className="w-full rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400"
      style={{ height: `${height}px` }}
    >
      <span className="text-3xl">⬜</span>
      <span className="text-sm">{alt}</span>
    </div>
  );
}

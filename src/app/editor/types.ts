export type Tool = "select" | "rect" | "circle" | "frame" | "text";

export type BlockType =
  | "heading" | "text" | "button" | "navbar" | "divider" | "image" | "dropdown"
  | "rect" | "circle" | "frame";

export interface BlockProps {
  // content
  text?: string;
  label?: string;
  level?: string;
  variant?: string;
  brand?: string;
  items?: string;
  alt?: string;
  // appearance
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
  opacity?: number;
  shadow?: boolean;
  // typography
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
}

export interface CanvasBlock {
  id: string;
  type: BlockType;
  props: BlockProps;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PaletteItem {
  type: BlockType;
  label: string;
  icon: string;
  defaultProps: BlockProps;
  defaultWidth: number;
  defaultHeight: number;
}

export const PALETTE: PaletteItem[] = [
  {
    type: "heading",
    label: "Überschrift",
    icon: "H",
    defaultProps: { text: "Neue Überschrift", level: "h2", color: "#111111" },
    defaultWidth: 400,
    defaultHeight: 48,
  },
  {
    type: "text",
    label: "Text",
    icon: "¶",
    defaultProps: { text: "Dein Text hier…", color: "#444444" },
    defaultWidth: 360,
    defaultHeight: 60,
  },
  {
    type: "button",
    label: "Button",
    icon: "□",
    defaultProps: { label: "Button", variant: "primary" },
    defaultWidth: 140,
    defaultHeight: 40,
  },
  {
    type: "navbar",
    label: "Navbar",
    icon: "≡",
    defaultProps: { brand: "Meine Seite" },
    defaultWidth: 640,
    defaultHeight: 56,
  },
  {
    type: "dropdown",
    label: "Dropdown",
    icon: "▾",
    defaultProps: { label: "Menü", items: "Option 1,Option 2,Option 3" },
    defaultWidth: 180,
    defaultHeight: 40,
  },
  {
    type: "divider",
    label: "Trennlinie",
    icon: "—",
    defaultProps: { stroke: "#e5e7eb", strokeWidth: 1 },
    defaultWidth: 500,
    defaultHeight: 2,
  },
  {
    type: "image",
    label: "Bild",
    icon: "⬜",
    defaultProps: { alt: "Bild", fill: "#f3f4f6" },
    defaultWidth: 400,
    defaultHeight: 200,
  },
];

export const SNAP_THRESHOLD = 6;

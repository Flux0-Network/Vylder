export type ComponentType =
  | "heading"
  | "text"
  | "button"
  | "navbar"
  | "divider"
  | "image"
  | "dropdown";

export interface CanvasBlock {
  id: string;
  type: ComponentType;
  props: Record<string, string>;
  x: number;
  y: number;
  width: number;
}

export interface PaletteItem {
  type: ComponentType;
  label: string;
  icon: string;
  defaultProps: Record<string, string>;
  defaultWidth: number;
}

export const PALETTE: PaletteItem[] = [
  {
    type: "heading",
    label: "Überschrift",
    icon: "H",
    defaultProps: { text: "Neue Überschrift", level: "h2" },
    defaultWidth: 400,
  },
  {
    type: "text",
    label: "Text",
    icon: "¶",
    defaultProps: { text: "Schreibe hier deinen Text..." },
    defaultWidth: 360,
  },
  {
    type: "button",
    label: "Button",
    icon: "◻",
    defaultProps: { label: "Button", variant: "primary" },
    defaultWidth: 140,
  },
  {
    type: "navbar",
    label: "Navbar",
    icon: "☰",
    defaultProps: { brand: "Meine Seite" },
    defaultWidth: 600,
  },
  {
    type: "dropdown",
    label: "Dropdown-Menü",
    icon: "▾",
    defaultProps: { label: "Menü", items: "Option 1,Option 2,Option 3" },
    defaultWidth: 180,
  },
  {
    type: "divider",
    label: "Trennlinie",
    icon: "—",
    defaultProps: {},
    defaultWidth: 500,
  },
  {
    type: "image",
    label: "Bild",
    icon: "⬜",
    defaultProps: { alt: "Bild", height: "160" },
    defaultWidth: 400,
  },
];

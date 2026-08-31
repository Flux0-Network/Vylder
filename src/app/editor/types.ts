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
}

export interface PaletteItem {
  type: ComponentType;
  label: string;
  icon: string;
  defaultProps: Record<string, string>;
}

export const PALETTE: PaletteItem[] = [
  {
    type: "heading",
    label: "Überschrift",
    icon: "H",
    defaultProps: { text: "Neue Überschrift", level: "h2" },
  },
  {
    type: "text",
    label: "Text",
    icon: "¶",
    defaultProps: { text: "Schreibe hier deinen Text..." },
  },
  {
    type: "button",
    label: "Button",
    icon: "◻",
    defaultProps: { label: "Button", variant: "primary" },
  },
  {
    type: "navbar",
    label: "Navbar",
    icon: "☰",
    defaultProps: { brand: "Meine Seite" },
  },
  {
    type: "dropdown",
    label: "Dropdown-Menü",
    icon: "▾",
    defaultProps: { label: "Menü", items: "Option 1,Option 2,Option 3" },
  },
  {
    type: "divider",
    label: "Trennlinie",
    icon: "—",
    defaultProps: {},
  },
  {
    type: "image",
    label: "Bild",
    icon: "⬜",
    defaultProps: { alt: "Bild", width: "100%", height: "200" },
  },
];

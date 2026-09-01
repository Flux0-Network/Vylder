import { SNAP_THRESHOLD } from "../types";
import type { CanvasBlock } from "../types";

export interface SnapResult {
  x: number;
  y: number;
  guideX: number | null;
  guideY: number | null;
}

export function snapToOthers(
  moving: { x: number; y: number; width: number; height: number },
  others: CanvasBlock[]
): SnapResult {
  let { x, y } = moving;
  let guideX: number | null = null;
  let guideY: number | null = null;

  const ml = x, mc = x + moving.width / 2, mr = x + moving.width;
  const mt = y, mm = y + moving.height / 2, mb = y + moving.height;

  for (const o of others) {
    const ol = o.x, oc = o.x + o.width / 2, or_ = o.x + o.width;
    const ot = o.y, om = o.y + o.height / 2, ob = o.y + o.height;

    for (const ox of [ol, oc, or_]) {
      if (Math.abs(ml - ox) < SNAP_THRESHOLD) { x = ox; guideX = ox; }
      else if (Math.abs(mc - ox) < SNAP_THRESHOLD) { x = ox - moving.width / 2; guideX = ox; }
      else if (Math.abs(mr - ox) < SNAP_THRESHOLD) { x = ox - moving.width; guideX = ox; }
    }

    for (const oy of [ot, om, ob]) {
      if (Math.abs(mt - oy) < SNAP_THRESHOLD) { y = oy; guideY = oy; }
      else if (Math.abs(mm - oy) < SNAP_THRESHOLD) { y = oy - moving.height / 2; guideY = oy; }
      else if (Math.abs(mb - oy) < SNAP_THRESHOLD) { y = oy - moving.height; guideY = oy; }
    }
  }

  return { x, y, guideX, guideY };
}

export type ResizeHandle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

export function applyResize(
  handle: ResizeHandle,
  block: { x: number; y: number; width: number; height: number },
  dx: number,
  dy: number
) {
  let { x, y, width, height } = block;

  if (handle.includes("w")) { x += dx; width -= dx; }
  if (handle.includes("e")) { width += dx; }
  if (handle.includes("n")) { y += dy; height -= dy; }
  if (handle.includes("s")) { height += dy; }

  if (width < 20) { x = block.x + block.width - 20; width = 20; }
  if (height < 4) { y = block.y + block.height - 4; height = 4; }

  return { x, y, width, height };
}

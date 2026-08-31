"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CanvasBlock } from "../types";
import { BlockRenderer } from "./BlockRenderer";

interface Props {
  blocks: CanvasBlock[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (event: DragEndEvent) => void;
}

export function Canvas({ blocks, selectedId, onSelect, onReorder }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      {/* Simulated browser chrome */}
      <div className="max-w-3xl mx-auto mt-8 mb-16 rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 mx-4 bg-white rounded px-3 py-1 text-xs text-gray-400 border border-gray-200">
            meine-seite.vylder.app
          </div>
        </div>

        <div className="bg-white min-h-[600px] p-8">
          {blocks.length === 0 ? (
            <EmptyState />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onReorder}
            >
              <SortableContext
                items={blocks.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {blocks.map((block) => (
                    <SortableBlock
                      key={block.id}
                      block={block}
                      selected={selectedId === block.id}
                      onSelect={onSelect}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}

function SortableBlock({
  block,
  selected,
  onSelect,
}: {
  block: CanvasBlock;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative"
      onClick={() => onSelect(block.id)}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-opacity px-1 touch-none"
      >
        ⠿
      </div>
      <BlockRenderer block={block} selected={selected} />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl mb-4">
        ✦
      </div>
      <p className="font-medium text-gray-700 mb-1">Leere Canvas</p>
      <p className="text-sm text-gray-400">
        Wähle links eine Komponente aus, um anzufangen.
      </p>
    </div>
  );
}

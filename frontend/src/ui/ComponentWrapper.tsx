import React, { useState, useRef } from "react";
import type { UIComponent } from "../model/projectModel";

interface ComponentWrapperProps {
  comp: UIComponent;
  onSelect: (id: string | null) => void;
  onMove?: (id: string, x: number, y: number) => void;
  children: React.ReactNode; // ✅ Add this line
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  comp,
  onSelect,
  onMove,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setDragging(true);
    onSelect(comp.id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    // find canvas offset so we move relative to canvas, not window
    const canvas = wrapperRef.current?.parentElement;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();

    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;

    wrapperRef.current!.style.left = `${newX}px`;
    wrapperRef.current!.style.top = `${newY}px`;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);

    const wrapper = wrapperRef.current;
    const canvas = wrapper?.parentElement;
    if (!wrapper || !canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;

    // update React state AFTER drag ends
    if (onMove) onMove(comp.id, newX, newY);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: "absolute",
        left: comp.x,
        top: comp.y,
        cursor: dragging ? "grabbing" : "grab",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "4px",
        borderRadius: "4px",
        userSelect: "none",
        transition: dragging ? "none" : "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default ComponentWrapper;

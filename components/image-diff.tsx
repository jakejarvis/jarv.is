/* eslint-disable jsx-a11y/alt-text, @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect, Children } from "react";
import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { ChevronsLeftRightIcon } from "lucide-react";

const ImageDiff = ({ children, className }: { children: React.ReactElement[]; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Add event listeners to handle dragging outside the component
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    };

    document.addEventListener("mouseup", handleMouseUpGlobal);
    document.addEventListener("mousemove", handleMouseMoveGlobal);

    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
      document.removeEventListener("mousemove", handleMouseMoveGlobal);
    };
  }, [isDragging]);

  // Extract the two image children
  const childrenArray = Children.toArray(children);
  if (childrenArray.length !== 2) {
    console.error("ImageDiff must have exactly two children (before and after images)");
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const beforeImageProps = getImageProps(children[0].props as any).props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const afterImageProps = getImageProps(children[1].props as any).props;

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - step));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + step));
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onKeyDown={handleKeyDown}
      className={cn("relative isolate w-full max-w-full overflow-hidden select-none", className)}
      style={{ ["--slider-position" as string]: `${sliderPosition}%` }}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={sliderPosition}
      tabIndex={0}
    >
      {/* After image (full width, underneath) */}
      <div className="h-full w-full">
        <img {...afterImageProps} className="h-full w-full object-cover object-top-left" />
      </div>

      {/* Before image (clipped with width based on slider position) */}
      <div className="absolute top-0 left-0 h-full w-[var(--slider-position)] overflow-hidden">
        <img {...beforeImageProps} className="h-full w-full object-cover object-top-left" />
      </div>

      {/* Divider line */}
      <div className="bg-muted-foreground absolute top-0 bottom-0 left-[var(--slider-position)] w-1 -translate-x-1/2 drop-shadow-md" />

      {/* Slider handle */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className="bg-muted absolute top-1/2 left-[var(--slider-position)] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full border-2 drop-shadow-md"
        aria-hidden="true"
      >
        <ChevronsLeftRightIcon className="text-foreground/70 size-6" />
      </div>
    </div>
  );
};

export default ImageDiff;

"use client";

import { MouseEvent, PointerEvent, ReactNode, useRef, useState } from "react";

export default function SlideshowCarousel({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    didDrag: false,
    isPointerDown: false,
    scrollLeft: 0,
    startX: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  function scrollCarousel(direction: "left" | "right") {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === "left" ? -carousel.clientWidth : carousel.clientWidth,
      behavior: "smooth",
    });
  }

  function startDragging(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    dragState.current = {
      didDrag: false,
      isPointerDown: true,
      scrollLeft: carousel.scrollLeft,
      startX: event.clientX,
    };
    setIsDragging(true);
    carousel.setPointerCapture(event.pointerId);
  }

  function dragCarousel(event: PointerEvent<HTMLDivElement>) {
    const carousel = carouselRef.current;
    const state = dragState.current;
    if (!carousel || !state.isPointerDown) return;

    const dragDistance = event.clientX - state.startX;
    if (Math.abs(dragDistance) > 5) {
      state.didDrag = true;
      event.preventDefault();
    }

    carousel.scrollLeft = state.scrollLeft - dragDistance;
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const carousel = carouselRef.current;
    if (carousel?.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }

    dragState.current.isPointerDown = false;
    setIsDragging(false);
  }

  function preventClickAfterDrag(event: MouseEvent<HTMLDivElement>) {
    if (!dragState.current.didDrag) return;

    event.preventDefault();
    event.stopPropagation();
    dragState.current.didDrag = false;
  }

  return (
    <div className="relative mx-auto mt-14 w-full">
      <div
        id="slideshow"
        ref={carouselRef}
        onClickCapture={preventClickAfterDrag}
        onPointerCancel={stopDragging}
        onPointerDown={startDragging}
        onPointerMove={dragCarousel}
        onPointerUp={stopDragging}
        className={`relative flex h-[60vw] w-full select-none overflow-y-hidden overflow-x-scroll rounded-2xl sm:h-[360px] md:h-[450px] xl:h-[650px] xl:px-[45px] 2xl:pl-72 ${
          isDragging
            ? "cursor-grabbing snap-none scroll-auto"
            : "cursor-grab snap-x snap-mandatory scroll-smooth"
        }`}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => scrollCarousel("left")}
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-xl font-medium leading-none text-white shadow-lg shadow-black/70 transition-colors hover:bg-neutral-600 md:grid"
      >
        {"<"}
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => scrollCarousel("right")}
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-xl font-medium leading-none text-white shadow-lg shadow-black/70 transition-colors hover:bg-neutral-600 md:grid"
      >
        {">"}
      </button>
    </div>
  );
}

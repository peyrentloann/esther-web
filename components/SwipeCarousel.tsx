"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SwipeCarousel({
  slides,
  ariaLabel = "Carrousel",
}: {
  slides: ReactNode[];
  ariaLabel?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const slideWidth = el.clientWidth;
      const idx = Math.round(el.scrollLeft / slideWidth);
      setActive(idx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(slides.length - 1, active + 1));

  return (
    <div className="relative" aria-label={ariaLabel} role="region">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 md:mx-0 px-6 md:px-0 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {slides.map((slide, i) => (
          <div key={i} className="snap-center shrink-0 w-full md:w-[calc(100%-4rem)] md:mx-8 first:md:ml-0 last:md:mr-0">
            {slide}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        disabled={active === 0}
        aria-label="Précédent"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-surface shadow-lg items-center justify-center hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>
      <button
        type="button"
        onClick={next}
        disabled={active === slides.length - 1}
        aria-label="Suivant"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-surface shadow-lg items-center justify-center hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Aller à la slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

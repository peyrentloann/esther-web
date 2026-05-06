"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SwipeCarousel({
  slides,
  ariaLabel = "Carrousel",
  desktopPerView = 3,
}: {
  slides: ReactNode[];
  ariaLabel?: string;
  desktopPerView?: 1 | 2 | 3;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const computePerView = () =>
      typeof window !== "undefined" && window.innerWidth >= 768
        ? desktopPerView
        : 1;
    setPerView(computePerView());
    const onResize = () => setPerView(computePerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [desktopPerView]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const slideWidth = el.clientWidth / perView;
      const idx = Math.round(el.scrollLeft / slideWidth);
      setActive(idx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [perView]);

  const scrollTo = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth / perView;
    el.scrollTo({ left: idx * slideWidth, behavior: "smooth" });
  };

  const maxIndex = Math.max(0, slides.length - perView);
  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(maxIndex, active + 1));

  const widthClass =
    desktopPerView === 3
      ? "md:w-1/3"
      : desktopPerView === 2
        ? "md:w-1/2"
        : "md:w-full";

  return (
    <div className="relative" aria-label={ariaLabel} role="region">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 md:mx-0 px-6 md:px-0 pb-4 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`snap-start shrink-0 w-full ${widthClass} flex`}
          >
            <div className="w-full">{slide}</div>
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
        disabled={active >= maxIndex}
        aria-label="Suivant"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-surface shadow-lg items-center justify-center hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Aller à la position ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

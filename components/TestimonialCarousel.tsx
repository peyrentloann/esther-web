"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
};

export default function TestimonialCarousel({
  testimonials,
  accentClass = "text-on-tertiary-container",
  cardClass = "bg-surface-container",
  nameClass = "text-primary",
}: {
  testimonials: Testimonial[];
  accentClass?: string;
  cardClass?: string;
  nameClass?: string;
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
  const next = () => scrollTo(Math.min(testimonials.length - 1, active + 1));

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 md:gap-8 -mx-6 md:mx-0 px-6 md:px-0 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className={`snap-center shrink-0 w-full md:w-[calc(100%-4rem)] mx-auto`}
          >
            <div
              className={`p-10 md:p-12 ${cardClass} rounded-2xl relative h-full flex flex-col justify-between`}
            >
              <span
                className={`text-5xl ${accentClass} absolute -top-5 left-8 bg-surface px-2 leading-none`}
              >
                &ldquo;
              </span>
              <p className="italic text-on-surface-variant mb-8 leading-relaxed text-lg">
                {t.quote}
              </p>
              <p className={`text-xs tracking-widest font-bold ${nameClass} uppercase`}>
                — {t.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Boutons desktop */}
      <button
        type="button"
        onClick={prev}
        disabled={active === 0}
        aria-label="Témoignage précédent"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-surface shadow-lg items-center justify-center hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>
      <button
        type="button"
        onClick={next}
        disabled={active === testimonials.length - 1}
        aria-label="Témoignage suivant"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-surface shadow-lg items-center justify-center hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Aller au témoignage ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

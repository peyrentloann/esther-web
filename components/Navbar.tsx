"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/reiki", label: "Reiki" },
  { href: "/soin-hormonal", label: "Soin Hormonal" },
  { href: "/evenements", label: "Événements & Retraites" },
  { href: "/journal-hormonal", label: "Journal" },
  { href: "/a-propos", label: "À Propos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-sm shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="font-serif text-xl italic text-primary hover:opacity-80 transition-opacity"
        >
          Esther Laframboise
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-7 items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-serif tracking-tight text-base transition-all duration-400 hover:scale-105 ${
                pathname === href
                  ? "text-primary font-semibold border-b border-primary/30"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/rendez-vous"
            className="hidden md:block bg-primary text-on-primary px-5 py-2.5 rounded-full text-sm font-medium tracking-wide hover:scale-105 transition-all duration-400 active:scale-95"
          >
            Prendre rendez-vous
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-primary p-1"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-outline-variant/20 px-6 py-6 flex flex-col gap-5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-serif text-lg ${
                pathname === href ? "text-primary font-semibold" : "text-on-surface-variant"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/rendez-vous"
            onClick={() => setOpen(false)}
            className="bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-medium text-center mt-2"
          >
            Prendre rendez-vous
          </Link>
        </div>
      )}
    </nav>
  );
}

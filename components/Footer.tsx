import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl italic mb-4">Esther Laframboise</p>
            <p className="text-on-primary/70 text-sm leading-relaxed">
              Naturothérapeute certifiée & Maître Reiki
              <br />
              Shefford, Québec
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-on-primary/50 mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {[
                { href: "/reiki", label: "Reiki" },
                { href: "/soin-hormonal", label: "Soin Hormonal" },
                { href: "/evenements", label: "Événements & Retraites" },
                { href: "/journal-hormonal", label: "Journal Hormonal" },
                { href: "/a-propos", label: "À Propos" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-on-primary/70 hover:text-on-primary transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-on-primary/50 mb-5">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-on-primary/70">
              <li>Shefford, Québec</li>
              <li>
                <Link
                  href="/rendez-vous"
                  className="text-tertiary-fixed-dim hover:text-tertiary-fixed transition-colors font-medium"
                >
                  Prendre rendez-vous →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-on-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-primary/40">
          <p>© {new Date().getFullYear()} Esther Laframboise. Tous droits réservés.</p>
          <Link href="/admin" className="hover:text-on-primary/60 transition-colors">
            Espace admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

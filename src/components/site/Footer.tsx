import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/site/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo className="h-12 w-auto" />
            <p className="mt-4 max-w-md text-sm text-ink-soft">
              Cabinet de recrutement et d'intérim spécialisé en Gestion de la Relation Client (GRC) au cœur de Dakar, Sénégal.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
              <li><Link to="/a-propos" className="hover:text-primary">À propos</Link></li>
              <li><Link to="/services" className="hover:text-primary">Services</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Dakar Sacré-Cœur 3 VDN, Sénégal</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +221 33 000 00 00</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contact@sunutraining.sn</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-ink-soft sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SUNU TRAINING CENTER. Tous droits réservés.</p>
          <p>Spécialiste GRC · Dakar, Sénégal</p>
        </div>
      </div>
    </footer>
  );
}

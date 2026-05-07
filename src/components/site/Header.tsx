import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-ink-soft hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/espace-entreprise">Espace entreprise</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/candidature">Déposer mon CV</Link>
          </Button>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:bg-accent hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 pt-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/espace-entreprise" onClick={() => setOpen(false)}>Espace entreprise</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/candidature" onClick={() => setOpen(false)}>Déposer mon CV</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

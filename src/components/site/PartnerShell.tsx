import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Users, User, Plus } from "lucide-react";
import { AppShell, type NavItem } from "@/components/site/AppShell";
import { clearPartnerSession, getPartnerSession } from "@/lib/mock-data";

const NAV: NavItem[] = [
  { to: "/espace-entreprise/dashboard", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/espace-entreprise/demandes", label: "Mes demandes", icon: FileText },
  { to: "/espace-entreprise/demandes/nouvelle", label: "Nouvelle demande", icon: Plus },
  { to: "/espace-entreprise/candidats", label: "Candidats proposés", icon: Users },
  { to: "/espace-entreprise/profil", label: "Profil entreprise", icon: User },
];

export function PartnerShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [session, setSession] = useState<{ email: string; company: string } | null>(null);

  useEffect(() => {
    const s = getPartnerSession();
    if (!s) navigate({ to: "/espace-entreprise" });
    else setSession(s);
  }, [navigate]);

  if (!session) return null;

  return (
    <AppShell
      brand={session.company}
      brandSub="Espace entreprise"
      nav={NAV}
      user={{ name: session.company, sub: session.email }}
      onLogout={() => clearPartnerSession()}
    >
      {children}
    </AppShell>
  );
}

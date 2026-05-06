import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Users, FileText, Building2, ShieldCheck, BarChart3 } from "lucide-react";
import { AppShell, type NavItem } from "@/components/site/AppShell";
import { clearAdminSession, getAdminSession } from "@/lib/mock-data";

const NAV: NavItem[] = [
  { to: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/admin/candidats", label: "Candidats", icon: Users },
  { to: "/admin/demandes", label: "Demandes", icon: FileText },
  { to: "/admin/partenaires", label: "Partenaires", icon: Building2 },
  { to: "/admin/recruteurs", label: "Recruteurs", icon: ShieldCheck },
  { to: "/admin/statistiques", label: "Statistiques", icon: BarChart3 },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [session, setSession] = useState<{ email: string; name: string; role: "Admin" | "Recruteur" } | null>(null);

  useEffect(() => {
    const s = getAdminSession();
    if (!s) navigate({ to: "/admin" });
    else setSession(s);
  }, [navigate]);

  if (!session) return null;

  return (
    <AppShell
      brand="SUNU TRAINING"
      brandSub={`Backoffice · ${session.role}`}
      nav={NAV}
      user={{ name: session.name, sub: session.email }}
      onLogout={() => clearAdminSession()}
    >
      {children}
    </AppShell>
  );
}

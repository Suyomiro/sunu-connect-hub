import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, FileText, Building2, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/site/AppShell";
import { MOCK_CANDIDATS, MOCK_DEMANDES, MOCK_PARTENAIRES } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard admin — SUNU TRAINING CENTER" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const tone = (s: string) =>
    s === "Pourvue" ? "success" : s === "Nouvelle" ? "info" : s === "Clôturée" ? "default" : "warning";
  const delaiMoyen =
    Math.round(
      MOCK_DEMANDES.filter((d) => d.delaiJours).reduce((a, d) => a + (d.delaiJours ?? 0), 0) /
        MOCK_DEMANDES.filter((d) => d.delaiJours).length,
    );

  return (
    <AdminShell>
      <PageHeader title="Tableau de bord" description="Pilotage global de l'activité de recrutement." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Candidatures" value={MOCK_CANDIDATS.length} icon={Users} hint="Total dans le vivier" />
        <StatCard label="Demandes actives" value={MOCK_DEMANDES.filter((d) => d.statut !== "Clôturée" && d.statut !== "Pourvue").length} icon={FileText} hint={`${MOCK_DEMANDES.length} au total`} />
        <StatCard label="Partenaires" value={MOCK_PARTENAIRES.length} icon={Building2} hint={`${MOCK_PARTENAIRES.filter((p) => p.statut === "Actif").length} actifs`} />
        <StatCard label="Délai moyen" value={`${delaiMoyen}j`} icon={Clock} hint="Du dépôt à la shortlist" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Demandes récentes</h2>
            <Link to="/admin/demandes" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Voir tout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <table className="mt-4 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-ink-soft">
              <tr className="border-b border-border">
                <th className="py-3">Référence</th>
                <th className="py-3">Partenaire</th>
                <th className="py-3">Poste</th>
                <th className="py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DEMANDES.slice(0, 5).map((d) => (
                <tr key={d.id} className="border-b border-border/60">
                  <td className="py-3 font-mono text-xs text-ink-soft">{d.reference}</td>
                  <td className="py-3 font-medium">{d.partenaire}</td>
                  <td className="py-3 text-ink-soft">{d.poste}</td>
                  <td className="py-3"><StatusBadge tone={tone(d.statut)}>{d.statut}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Candidats récents</h2>
            <Link to="/admin/candidats" className="text-sm font-medium text-primary hover:underline">Voir →</Link>
          </div>
          <div className="mt-4 space-y-3">
            {MOCK_CANDIDATS.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                <div>
                  <p className="text-sm font-semibold">{c.prenom} {c.nom}</p>
                  <p className="text-xs text-ink-soft">{c.poste}</p>
                </div>
                <StatusBadge tone="info">{c.statut}</StatusBadge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground"><TrendingUp className="h-5 w-5" /></div>
          <div>
            <h3 className="font-display text-base font-bold">Tendance du mois</h3>
            <p className="mt-1 text-sm text-ink-soft">+ 32% de demandes par rapport au mois précédent. 4 nouveaux partenaires en pipeline.</p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

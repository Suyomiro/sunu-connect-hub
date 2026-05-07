import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatCard } from "@/components/site/AppShell";
import { Activity, Briefcase, Languages, TrendingUp } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/statistiques")({
  head: () => ({ meta: [{ title: "Statistiques — Backoffice" }] }),
  component: AdminStats,
});

function AdminStats() {
  const candidats = useStore((s) => s.candidats);
  const demandes = useStore((s) => s.demandes);
  const parStatut = demandes.reduce<Record<string, number>>((acc, d) => { acc[d.statut] = (acc[d.statut] ?? 0) + 1; return acc; }, {});
  const parLangue = candidats.flatMap((c) => c.langues).reduce<Record<string, number>>((acc, l) => { acc[l] = (acc[l] ?? 0) + 1; return acc; }, {});
  const max = Math.max(1, ...Object.values(parLangue));
  const pourvues = demandes.filter((d) => d.statut === "Pourvue").length;
  const taux = demandes.length ? Math.round((pourvues / demandes.length) * 100) : 0;

  return (
    <AdminShell>
      <PageHeader title="Statistiques" description="Indicateurs clés de l'activité de recrutement." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Taux de placement" value={`${taux}%`} icon={TrendingUp} hint="Sur l'ensemble des demandes" />
        <StatCard label="Postes pourvus" value={pourvues} icon={Briefcase} hint="Cette année" />
        <StatCard label="Candidats" value={candidats.length} icon={Activity} hint="Dans le vivier" />
        <StatCard label="Langues couvertes" value={Object.keys(parLangue).length} icon={Languages} hint="Du vivier" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold">Demandes par statut</h3>
          <div className="mt-5 space-y-3">
            {Object.entries(parStatut).map(([k, v]) => {
              const pct = (v / Math.max(1, demandes.length)) * 100;
              return (
                <div key={k}>
                  <div className="mb-1 flex justify-between text-sm"><span className="font-medium">{k}</span><span className="text-ink-soft">{v}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
            {Object.keys(parStatut).length === 0 && <p className="text-sm text-ink-soft">Aucune donnée.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold">Candidats par langue</h3>
          <div className="mt-5 space-y-3">
            {Object.entries(parLangue).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
              <div key={k}>
                <div className="mb-1 flex justify-between text-sm"><span className="font-medium">{k}</span><span className="text-ink-soft">{v}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-primary" style={{ width: `${(v / max) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

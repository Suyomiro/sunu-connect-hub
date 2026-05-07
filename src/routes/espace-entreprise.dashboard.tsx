import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { PartnerShell } from "@/components/site/PartnerShell";
import { PageHeader, StatCard, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { getPartnerSession } from "@/lib/mock-data";

export const Route = createFileRoute("/espace-entreprise/dashboard")({
  head: () => ({ meta: [{ title: "Tableau de bord — Espace entreprise" }] }),
  component: PartnerDashboard,
});

const statutTone = (s: string) => s === "Pourvue" ? "success" : s === "Nouvelle" ? "info" : s === "Clôturée" ? "default" : "warning";

function PartnerDashboard() {
  const company = getPartnerSession()?.company ?? "";
  const demandes = useStore((s) => s.demandes.filter((d) => d.partenaire === company));
  const candidatsTotal = useStore((s) => s.candidats.length);
  const actives = demandes.filter((d) => d.statut !== "Pourvue" && d.statut !== "Clôturée").length;
  const pourvues = demandes.filter((d) => d.statut === "Pourvue").length;

  return (
    <PartnerShell>
      <PageHeader title="Tableau de bord" description="Vue d'ensemble de vos demandes."
        action={<Button asChild><Link to="/espace-entreprise/demandes/nouvelle">+ Nouvelle demande</Link></Button>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Demandes actives" value={actives} icon={FileText} hint={`${demandes.length} au total`} />
        <StatCard label="Vivier candidats" value={candidatsTotal} icon={Users} hint="Profils disponibles" />
        <StatCard label="Postes pourvus" value={pourvues} icon={CheckCircle2} hint="Cette année" />
        <StatCard label="Délai moyen" value="6j" icon={Clock} hint="Du dépôt à la shortlist" />
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Demandes récentes</h2>
          <Link to="/espace-entreprise/demandes" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Voir tout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-ink-soft">
              <tr className="border-b border-border">
                <th className="py-3">Référence</th><th className="py-3">Poste</th><th className="py-3">Postes</th>
                <th className="py-3">Urgence</th><th className="py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {demandes.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-ink-soft">Aucune demande pour le moment.</td></tr>
              )}
              {demandes.map((d) => (
                <tr key={d.id} className="border-b border-border/60">
                  <td className="py-3 font-mono text-xs text-ink-soft">{d.reference}</td>
                  <td className="py-3 font-medium">{d.poste}</td>
                  <td className="py-3">{d.nbPostes}</td>
                  <td className="py-3"><StatusBadge tone={d.urgence === "Haute" ? "danger" : d.urgence === "Moyenne" ? "warning" : "default"}>{d.urgence}</StatusBadge></td>
                  <td className="py-3"><StatusBadge tone={statutTone(d.statut)}>{d.statut}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PartnerShell>
  );
}

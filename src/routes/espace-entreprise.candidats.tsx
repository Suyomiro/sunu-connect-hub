import { createFileRoute } from "@tanstack/react-router";
import { PartnerShell } from "@/components/site/PartnerShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { MOCK_CANDIDATS } from "@/lib/mock-data";

export const Route = createFileRoute("/espace-entreprise/candidats")({
  head: () => ({ meta: [{ title: "Candidats proposés — Espace entreprise" }] }),
  component: CandidatsPage,
});

function CandidatsPage() {
  return (
    <PartnerShell>
      <PageHeader title="Candidats proposés" description="Profils sélectionnés par notre équipe pour vos demandes en cours." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MOCK_CANDIDATS.slice(0, 6).map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-lg font-bold text-ink">{c.prenom} {c.nom}</p>
                <p className="text-sm text-ink-soft">{c.poste}</p>
              </div>
              <StatusBadge tone="info">{c.statut}</StatusBadge>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-ink-soft">Expérience :</span> {c.experience}</p>
              <p><span className="text-ink-soft">Langues :</span> {c.langues.join(", ")}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.competences.map((k) => (
                <span key={k} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-ink">{k}</span>
              ))}
            </div>
            <Button className="mt-5 w-full" variant="outline" size="sm">Voir le CV</Button>
          </div>
        ))}
      </div>
    </PartnerShell>
  );
}

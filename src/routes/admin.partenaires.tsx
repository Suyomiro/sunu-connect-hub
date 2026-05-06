import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { MOCK_PARTENAIRES } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/partenaires")({
  head: () => ({ meta: [{ title: "Partenaires — Backoffice" }] }),
  component: AdminPartenaires,
});

function AdminPartenaires() {
  const tone = (s: string) => (s === "Actif" ? "success" : s === "En attente" ? "warning" : "danger");
  return (
    <AdminShell>
      <PageHeader
        title="Partenaires entreprises"
        description={`${MOCK_PARTENAIRES.length} entreprises enregistrées.`}
        action={<Button>+ Ajouter un partenaire</Button>}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Entreprise</th>
              <th className="px-4 py-3">Secteur</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Demandes actives</th>
              <th className="px-4 py-3">Inscrit le</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PARTENAIRES.map((p) => (
              <tr key={p.id} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-4 py-3 font-semibold">{p.nom}</td>
                <td className="px-4 py-3">{p.secteur}</td>
                <td className="px-4 py-3"><p>{p.contact}</p><p className="text-xs text-ink-soft">{p.email}</p></td>
                <td className="px-4 py-3">{p.demandesActives}</td>
                <td className="px-4 py-3 text-ink-soft">{new Date(p.dateInscription).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3"><StatusBadge tone={tone(p.statut)}>{p.statut}</StatusBadge></td>
                <td className="px-4 py-3 text-right"><Button size="sm" variant="ghost">Gérer</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

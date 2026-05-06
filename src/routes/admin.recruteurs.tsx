import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MOCK_RECRUTEURS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/recruteurs")({
  head: () => ({ meta: [{ title: "Recruteurs — Backoffice" }] }),
  component: AdminRecruteurs,
});

function AdminRecruteurs() {
  return (
    <AdminShell>
      <PageHeader
        title="Équipe & permissions"
        description="Gérez les recruteurs ayant accès au backoffice."
        action={<Button>+ Inviter un recruteur</Button>}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Membre</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Demandes assignées</th>
              <th className="px-4 py-3">Ajouté le</th>
              <th className="px-4 py-3">Actif</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RECRUTEURS.map((r) => (
              <tr key={r.id} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-4 py-3"><p className="font-semibold">{r.nom}</p><p className="text-xs text-ink-soft">{r.email}</p></td>
                <td className="px-4 py-3"><StatusBadge tone={r.role === "Admin" ? "info" : "default"}>{r.role}</StatusBadge></td>
                <td className="px-4 py-3">{r.demandesAssignees}</td>
                <td className="px-4 py-3 text-ink-soft">{new Date(r.dateAjout).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3"><Switch defaultChecked={r.actif} /></td>
                <td className="px-4 py-3 text-right"><Button size="sm" variant="ghost">Modifier</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

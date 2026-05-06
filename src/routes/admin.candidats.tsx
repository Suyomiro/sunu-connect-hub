import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download } from "lucide-react";
import { MOCK_CANDIDATS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/candidats")({
  head: () => ({ meta: [{ title: "Candidats — Backoffice" }] }),
  component: AdminCandidats,
});

function AdminCandidats() {
  const [q, setQ] = useState("");
  const [statut, setStatut] = useState("all");
  const [langue, setLangue] = useState("all");

  const list = MOCK_CANDIDATS.filter((c) =>
    (statut === "all" || c.statut === statut) &&
    (langue === "all" || c.langues.includes(langue)) &&
    (q === "" ||
      `${c.prenom} ${c.nom}`.toLowerCase().includes(q.toLowerCase()) ||
      c.poste.toLowerCase().includes(q.toLowerCase()) ||
      c.email.toLowerCase().includes(q.toLowerCase())),
  );

  const tone = (s: string) =>
    s === "Validé" ? "success" : s === "Rejeté" ? "danger" : s === "Nouveau" ? "info" : "warning";

  return (
    <AdminShell>
      <PageHeader
        title="Vivier de candidats"
        description={`${MOCK_CANDIDATS.length} profils enregistrés.`}
        action={<Button variant="outline"><Download className="mr-2 h-4 w-4" /> Exporter CSV</Button>}
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-soft" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nom, poste, email…" className="pl-9" />
        </div>
        <Select value={statut} onValueChange={setStatut}>
          <SelectTrigger><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="Nouveau">Nouveau</SelectItem>
            <SelectItem value="Présélectionné">Présélectionné</SelectItem>
            <SelectItem value="Entretien">Entretien</SelectItem>
            <SelectItem value="Validé">Validé</SelectItem>
            <SelectItem value="Rejeté">Rejeté</SelectItem>
          </SelectContent>
        </Select>
        <Select value={langue} onValueChange={setLangue}>
          <SelectTrigger><SelectValue placeholder="Langue" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes langues</SelectItem>
            <SelectItem value="Français">Français</SelectItem>
            <SelectItem value="Anglais">Anglais</SelectItem>
            <SelectItem value="Wolof">Wolof</SelectItem>
            <SelectItem value="Espagnol">Espagnol</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Candidat</th>
              <th className="px-4 py-3">Poste</th>
              <th className="px-4 py-3">Expérience</th>
              <th className="px-4 py-3">Langues</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Reçu le</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <p className="font-semibold">{c.prenom} {c.nom}</p>
                  <p className="text-xs text-ink-soft">{c.email}</p>
                </td>
                <td className="px-4 py-3">{c.poste}</td>
                <td className="px-4 py-3">{c.experience}</td>
                <td className="px-4 py-3 text-ink-soft">{c.langues.join(", ")}</td>
                <td className="px-4 py-3"><StatusBadge tone={tone(c.statut)}>{c.statut}</StatusBadge></td>
                <td className="px-4 py-3 text-ink-soft">{new Date(c.dateCandidature).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3 text-right"><Button size="sm" variant="ghost">Détail</Button></td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-ink-soft">Aucun candidat trouvé.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { MOCK_DEMANDES } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/demandes")({
  head: () => ({ meta: [{ title: "Demandes — Backoffice" }] }),
  component: AdminDemandes,
});

function AdminDemandes() {
  const [q, setQ] = useState("");
  const [statut, setStatut] = useState("all");
  const list = MOCK_DEMANDES.filter((d) =>
    (statut === "all" || d.statut === statut) &&
    (q === "" || d.poste.toLowerCase().includes(q.toLowerCase()) || d.partenaire.toLowerCase().includes(q.toLowerCase()) || d.reference.toLowerCase().includes(q.toLowerCase())),
  );
  const tone = (s: string) =>
    s === "Pourvue" ? "success" : s === "Nouvelle" ? "info" : s === "Clôturée" ? "default" : "warning";

  return (
    <AdminShell>
      <PageHeader title="Demandes de recrutement" description={`${MOCK_DEMANDES.length} demandes au total.`} />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-soft" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Référence, poste, partenaire…" className="pl-9" />
        </div>
        <Select value={statut} onValueChange={setStatut}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="Nouvelle">Nouvelle</SelectItem>
            <SelectItem value="En traitement">En traitement</SelectItem>
            <SelectItem value="Shortlist envoyée">Shortlist envoyée</SelectItem>
            <SelectItem value="Pourvue">Pourvue</SelectItem>
            <SelectItem value="Clôturée">Clôturée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Référence</th>
              <th className="px-4 py-3">Partenaire</th>
              <th className="px-4 py-3">Poste</th>
              <th className="px-4 py-3">Postes</th>
              <th className="px-4 py-3">Urgence</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((d) => (
              <tr key={d.id} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-4 py-3 font-mono text-xs text-ink-soft">{d.reference}</td>
                <td className="px-4 py-3 font-medium">{d.partenaire}</td>
                <td className="px-4 py-3">{d.poste}</td>
                <td className="px-4 py-3">{d.nbPostes}</td>
                <td className="px-4 py-3"><StatusBadge tone={d.urgence === "Haute" ? "danger" : d.urgence === "Moyenne" ? "warning" : "default"}>{d.urgence}</StatusBadge></td>
                <td className="px-4 py-3"><StatusBadge tone={tone(d.statut)}>{d.statut}</StatusBadge></td>
                <td className="px-4 py-3 text-right"><Button size="sm" variant="ghost">Traiter</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

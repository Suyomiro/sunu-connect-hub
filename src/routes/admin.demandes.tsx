import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Trash2 } from "lucide-react";
import { useStore, demandesApi } from "@/lib/store";
import type { Demande, Statut } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/demandes")({
  head: () => ({ meta: [{ title: "Demandes — Backoffice" }] }),
  component: AdminDemandes,
});

const STATUTS: Statut[] = ["Nouvelle", "En traitement", "Shortlist envoyée", "Pourvue", "Clôturée"];

function AdminDemandes() {
  const demandes = useStore((s) => s.demandes);
  const [q, setQ] = useState("");
  const [statut, setStatut] = useState("all");
  const [view, setView] = useState<Demande | null>(null);

  const list = demandes.filter((d) =>
    (statut === "all" || d.statut === statut) &&
    (q === "" || d.poste.toLowerCase().includes(q.toLowerCase()) || d.partenaire.toLowerCase().includes(q.toLowerCase()) || d.reference.toLowerCase().includes(q.toLowerCase())),
  );
  const tone = (s: string) => s === "Pourvue" ? "success" : s === "Nouvelle" ? "info" : s === "Clôturée" ? "default" : "warning";

  return (
    <AdminShell>
      <PageHeader title="Demandes de recrutement" description={`${demandes.length} demandes au total.`} />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-soft" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Référence, poste, partenaire…" className="pl-9" />
        </div>
        <Select value={statut} onValueChange={setStatut}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            {STATUTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Référence</th><th className="px-4 py-3">Partenaire</th><th className="px-4 py-3">Poste</th>
              <th className="px-4 py-3">Postes</th><th className="px-4 py-3">Urgence</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3"></th>
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
                <td className="px-4 py-3">
                  <Select value={d.statut} onValueChange={(v) => { demandesApi.update(d.id, { statut: v as Statut }); toast.success("Statut mis à jour"); }}>
                    <SelectTrigger className="h-8 w-40"><SelectValue /></SelectTrigger>
                    <SelectContent>{STATUTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => setView(d)}><Eye className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => { if (confirm("Supprimer cette demande ?")) { demandesApi.remove(d.id); toast.success("Supprimée"); } }}><Trash2 className="h-4 w-4 text-rose-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          {view && (<>
            <DialogHeader><DialogTitle>{view.poste}</DialogTitle></DialogHeader>
            <div className="grid gap-2 text-sm">
              <p><b>Référence :</b> {view.reference}</p>
              <p><b>Partenaire :</b> {view.partenaire}</p>
              <p><b>Postes :</b> {view.nbPostes}</p>
              <p><b>Expérience :</b> {view.experience}</p>
              <p><b>Niveau :</b> {view.niveau}</p>
              <p><b>Langues :</b> {view.langues.join(", ")}</p>
              <p><b>Urgence :</b> {view.urgence}</p>
              <p><b>Statut :</b> <StatusBadge tone={tone(view.statut)}>{view.statut}</StatusBadge></p>
              <p><b>Créée le :</b> {new Date(view.dateCreation).toLocaleDateString("fr-FR")}</p>
            </div>
          </>)}
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { useStore, partenairesApi } from "@/lib/store";
import type { Partenaire } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/partenaires")({
  head: () => ({ meta: [{ title: "Partenaires — Backoffice" }] }),
  component: AdminPartenaires,
});

const STATUTS: Partenaire["statut"][] = ["Actif", "En attente", "Suspendu"];

function AdminPartenaires() {
  const partenaires = useStore((s) => s.partenaires);
  const [open, setOpen] = useState(false);
  const tone = (s: string) => s === "Actif" ? "success" : s === "En attente" ? "warning" : "danger";

  return (
    <AdminShell>
      <PageHeader title="Partenaires entreprises" description={`${partenaires.length} entreprises enregistrées.`}
        action={<Button onClick={() => setOpen(true)}><Plus className="mr-2 h-4 w-4" /> Ajouter</Button>} />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Entreprise</th><th className="px-4 py-3">Secteur</th><th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Inscrit le</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {partenaires.map((p) => (
              <tr key={p.id} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-4 py-3 font-semibold">{p.nom}</td>
                <td className="px-4 py-3">{p.secteur}</td>
                <td className="px-4 py-3"><p>{p.contact}</p><p className="text-xs text-ink-soft">{p.email}</p></td>
                <td className="px-4 py-3 text-ink-soft">{new Date(p.dateInscription).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3">
                  <Select value={p.statut} onValueChange={(v) => { partenairesApi.update(p.id, { statut: v as Partenaire["statut"] }); toast.success("Statut mis à jour"); }}>
                    <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>{STATUTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Supprimer ${p.nom} ?`)) { partenairesApi.remove(p.id); toast.success("Supprimé"); } }}><Trash2 className="h-4 w-4 text-rose-500" /></Button>
                </td>
              </tr>
            ))}
            {partenaires.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-ink-soft">Aucun partenaire.</td></tr>}
          </tbody>
        </table>
      </div>
      <NewPartenaireDialog open={open} onOpenChange={setOpen} />
      <p className="mt-4 text-xs text-ink-soft">Astuce : cliquez sur le statut pour le modifier en direct.</p>
      <p className="mt-1 text-xs text-ink-soft">Total demandes actives par partenaire : <StatusBadge>{partenaires.reduce((a, p) => a + p.demandesActives, 0)}</StatusBadge></p>
    </AdminShell>
  );
}

function NewPartenaireDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [f, setF] = useState({ nom: "", secteur: "", contact: "", email: "", telephone: "" });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Ajouter un partenaire</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); partenairesApi.add(f); toast.success("Partenaire ajouté"); setF({ nom: "", secteur: "", contact: "", email: "", telephone: "" }); onOpenChange(false); }} className="space-y-3">
          <div><Label>Entreprise *</Label><Input required value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} /></div>
          <div><Label>Secteur *</Label><Input required value={f.secteur} onChange={(e) => setF({ ...f, secteur: e.target.value })} /></div>
          <div><Label>Contact *</Label><Input required value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} /></div>
          <div><Label>Email *</Label><Input type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          <div><Label>Téléphone *</Label><Input required value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} /></div>
          <DialogFooter><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button><Button type="submit">Ajouter</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

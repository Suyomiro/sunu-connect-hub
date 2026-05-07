import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Download, Plus, Trash2, Eye } from "lucide-react";
import { useStore, candidatsApi } from "@/lib/store";
import type { Candidat, StatutCandidat } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/candidats")({
  head: () => ({ meta: [{ title: "Candidats — Backoffice" }] }),
  component: AdminCandidats,
});

const LANGUES = ["Français", "Anglais", "Wolof", "Espagnol", "Arabe", "Portugais"];
const COMPETENCES = ["Service client", "CRM (Salesforce, Zendesk…)", "Vente / Téléprospection", "Support technique", "Réclamations / Litiges", "Back-office", "Team Leader", "Formateur GRC"];
const STATUTS: StatutCandidat[] = ["Nouveau", "Présélectionné", "Entretien", "Validé", "Rejeté"];

function AdminCandidats() {
  const candidats = useStore((s) => s.candidats);
  const [q, setQ] = useState("");
  const [statut, setStatut] = useState("all");
  const [langue, setLangue] = useState("all");
  const [view, setView] = useState<Candidat | null>(null);
  const [openNew, setOpenNew] = useState(false);

  const list = candidats.filter((c) =>
    (statut === "all" || c.statut === statut) &&
    (langue === "all" || c.langues.includes(langue)) &&
    (q === "" || `${c.prenom} ${c.nom}`.toLowerCase().includes(q.toLowerCase()) || c.poste.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase())),
  );

  const tone = (s: string) => s === "Validé" ? "success" : s === "Rejeté" ? "danger" : s === "Nouveau" ? "info" : "warning";

  const exportCSV = () => {
    const headers = ["Prénom", "Nom", "Email", "Téléphone", "Poste", "Expérience", "Langues", "Statut", "Date"];
    const rows = list.map((c) => [c.prenom, c.nom, c.email, c.telephone, c.poste, c.experience, c.langues.join("|"), c.statut, c.dateCandidature]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "candidats.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <AdminShell>
      <PageHeader title="Vivier de candidats" description={`${candidats.length} profils enregistrés.`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCSV}><Download className="mr-2 h-4 w-4" /> CSV</Button>
            <Button onClick={() => setOpenNew(true)}><Plus className="mr-2 h-4 w-4" /> Ajouter</Button>
          </div>
        } />

      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-soft" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nom, poste, email…" className="pl-9" />
        </div>
        <Select value={statut} onValueChange={setStatut}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            {STATUTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={langue} onValueChange={setLangue}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes langues</SelectItem>
            {LANGUES.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Candidat</th><th className="px-4 py-3">Poste</th><th className="px-4 py-3">Expérience</th>
              <th className="px-4 py-3">Langues</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3">Reçu le</th><th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-4 py-3"><p className="font-semibold">{c.prenom} {c.nom}</p><p className="text-xs text-ink-soft">{c.email}</p></td>
                <td className="px-4 py-3">{c.poste}</td>
                <td className="px-4 py-3">{c.experience}</td>
                <td className="px-4 py-3 text-ink-soft">{c.langues.join(", ")}</td>
                <td className="px-4 py-3">
                  <Select value={c.statut} onValueChange={(v) => { candidatsApi.update(c.id, { statut: v as StatutCandidat }); toast.success("Statut mis à jour"); }}>
                    <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>{STATUTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3 text-ink-soft">{new Date(c.dateCandidature).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => setView(c)}><Eye className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Supprimer ${c.prenom} ${c.nom} ?`)) { candidatsApi.remove(c.id); toast.success("Supprimé"); } }}><Trash2 className="h-4 w-4 text-rose-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-ink-soft">Aucun candidat trouvé.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* View dialog */}
      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="max-w-2xl">
          {view && (
            <>
              <DialogHeader><DialogTitle>{view.prenom} {view.nom}</DialogTitle></DialogHeader>
              <div className="grid gap-3 text-sm">
                <p><b>Email :</b> {view.email}</p>
                <p><b>Téléphone :</b> {view.telephone}</p>
                <p><b>Poste :</b> {view.poste}</p>
                <p><b>Expérience :</b> {view.experience}</p>
                <p><b>Langues :</b> {view.langues.join(", ")}</p>
                <div><b>Compétences :</b><div className="mt-1 flex flex-wrap gap-1.5">{view.competences.map((k) => <span key={k} className="rounded-full bg-secondary px-2.5 py-1 text-xs">{k}</span>)}</div></div>
                <p><b>Statut :</b> <StatusBadge tone={tone(view.statut)}>{view.statut}</StatusBadge></p>
                <p><b>Reçu le :</b> {new Date(view.dateCandidature).toLocaleDateString("fr-FR")}</p>
                {view.cvUrl && <p><b>CV :</b> {view.cvUrl}</p>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <NewCandidatDialog open={openNew} onOpenChange={setOpenNew} />
    </AdminShell>
  );
}

function NewCandidatDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", poste: "", experience: "1-3" });
  const [langues, setLangues] = useState<string[]>([]);
  const [comps, setComps] = useState<string[]>([]);
  const toggle = (arr: string[], v: string, set: (a: string[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Ajouter un candidat</DialogTitle></DialogHeader>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (langues.length === 0) return toast.error("Au moins une langue.");
          candidatsApi.add({ ...form, langues, competences: comps });
          toast.success("Candidat ajouté");
          setForm({ prenom: "", nom: "", email: "", telephone: "", poste: "", experience: "1-3" }); setLangues([]); setComps([]);
          onOpenChange(false);
        }} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Prénom *</Label><Input required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} /></div>
            <div><Label>Nom *</Label><Input required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} /></div>
            <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>Téléphone *</Label><Input required value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} /></div>
            <div><Label>Poste *</Label><Input required value={form.poste} onChange={(e) => setForm({ ...form, poste: e.target.value })} /></div>
            <div>
              <Label>Expérience</Label>
              <Select value={form.experience} onValueChange={(v) => setForm({ ...form, experience: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">Moins d'1 an</SelectItem><SelectItem value="1-3">1 à 3 ans</SelectItem>
                  <SelectItem value="3-5">3 à 5 ans</SelectItem><SelectItem value="5-10">5 à 10 ans</SelectItem><SelectItem value="10+">10+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Langues *</Label>
            <div className="grid gap-2 sm:grid-cols-3">{LANGUES.map((l) => (
              <label key={l} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                <Checkbox checked={langues.includes(l)} onCheckedChange={() => toggle(langues, l, setLangues)} />{l}</label>
            ))}</div>
          </div>
          <div>
            <Label className="mb-2 block">Compétences</Label>
            <div className="grid gap-2 sm:grid-cols-2">{COMPETENCES.map((c) => (
              <label key={c} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                <Checkbox checked={comps.includes(c)} onCheckedChange={() => toggle(comps, c, setComps)} />{c}</label>
            ))}</div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

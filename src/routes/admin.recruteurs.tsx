import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/site/AdminShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { useStore, recruteursApi } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/recruteurs")({
  head: () => ({ meta: [{ title: "Recruteurs — Backoffice" }] }),
  component: AdminRecruteurs,
});

function AdminRecruteurs() {
  const recruteurs = useStore((s) => s.recruteurs);
  const [open, setOpen] = useState(false);

  return (
    <AdminShell>
      <PageHeader title="Équipe & permissions" description="Gérez les recruteurs ayant accès au backoffice."
        action={<Button onClick={() => setOpen(true)}><Plus className="mr-2 h-4 w-4" /> Inviter</Button>} />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Membre</th><th className="px-4 py-3">Rôle</th><th className="px-4 py-3">Demandes assignées</th>
              <th className="px-4 py-3">Ajouté le</th><th className="px-4 py-3">Actif</th><th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {recruteurs.map((r) => (
              <tr key={r.id} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-4 py-3"><p className="font-semibold">{r.nom}</p><p className="text-xs text-ink-soft">{r.email}</p></td>
                <td className="px-4 py-3">
                  <Select value={r.role} onValueChange={(v) => { recruteursApi.update(r.id, { role: v as "Admin" | "Recruteur" }); toast.success("Rôle modifié"); }}>
                    <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Recruteur">Recruteur</SelectItem></SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">{r.demandesAssignees}</td>
                <td className="px-4 py-3 text-ink-soft">{new Date(r.dateAjout).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3"><Switch checked={r.actif} onCheckedChange={(v) => recruteursApi.update(r.id, { actif: v })} /></td>
                <td className="px-4 py-3 text-right">
                  <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Retirer ${r.nom} ?`)) { recruteursApi.remove(r.id); toast.success("Retiré"); } }}><Trash2 className="h-4 w-4 text-rose-500" /></Button>
                </td>
              </tr>
            ))}
            {recruteurs.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-ink-soft">Aucun recruteur. <StatusBadge>Invitez votre équipe</StatusBadge></td></tr>}
          </tbody>
        </table>
      </div>

      <NewRecruteurDialog open={open} onOpenChange={setOpen} />
    </AdminShell>
  );
}

function NewRecruteurDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [f, setF] = useState<{ nom: string; email: string; role: "Admin" | "Recruteur" }>({ nom: "", email: "", role: "Recruteur" });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Inviter un recruteur</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); recruteursApi.add(f); toast.success("Recruteur invité"); setF({ nom: "", email: "", role: "Recruteur" }); onOpenChange(false); }} className="space-y-3">
          <div><Label>Nom complet *</Label><Input required value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} /></div>
          <div><Label>Email *</Label><Input type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          <div>
            <Label>Rôle</Label>
            <Select value={f.role} onValueChange={(v) => setF({ ...f, role: v as "Admin" | "Recruteur" })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Recruteur">Recruteur</SelectItem></SelectContent>
            </Select>
          </div>
          <DialogFooter><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button><Button type="submit">Inviter</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

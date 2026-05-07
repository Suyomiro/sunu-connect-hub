import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PartnerShell } from "@/components/site/PartnerShell";
import { PageHeader } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { demandesApi } from "@/lib/store";
import { getPartnerSession } from "@/lib/mock-data";

export const Route = createFileRoute("/espace-entreprise/demandes/nouvelle")({
  head: () => ({ meta: [{ title: "Nouvelle demande — Espace entreprise" }] }),
  component: NouvelleDemande,
});

const LANGUES = ["Français", "Anglais", "Wolof", "Espagnol", "Arabe", "Portugais"];

function NouvelleDemande() {
  const navigate = useNavigate();
  const [langues, setLangues] = useState<string[]>([]);
  const [form, setForm] = useState({ poste: "", nbPostes: 1, urgence: "Moyenne", experience: "", niveau: "", description: "" });
  const toggle = (v: string) => setLangues((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  return (
    <PartnerShell>
      <PageHeader title="Nouvelle demande de recrutement" description="Décrivez votre besoin, notre équipe vous proposera une shortlist sous 48-72h." />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (langues.length === 0) return toast.error("Sélectionnez au moins une langue.");
          if (!form.experience || !form.niveau) return toast.error("Complétez expérience et niveau.");
          const session = getPartnerSession();
          demandesApi.add({
            partenaireId: "self",
            partenaire: session?.company ?? "Mon entreprise",
            poste: form.poste,
            nbPostes: Number(form.nbPostes),
            langues,
            experience: form.experience,
            niveau: form.niveau,
            urgence: form.urgence as "Basse" | "Moyenne" | "Haute",
          });
          toast.success("Demande envoyée à notre équipe");
          navigate({ to: "/espace-entreprise/demandes" });
        }}
        className="space-y-8 rounded-2xl border border-border bg-card p-8 shadow-soft"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label>Intitulé du poste *</Label><Input required className="mt-2" placeholder="Ex : Téléconseiller bilingue FR/EN" value={form.poste} onChange={(e) => setForm({ ...form, poste: e.target.value })} /></div>
          <div><Label>Nombre de postes *</Label><Input type="number" min={1} required className="mt-2" value={form.nbPostes} onChange={(e) => setForm({ ...form, nbPostes: Number(e.target.value) })} /></div>
          <div>
            <Label>Urgence *</Label>
            <Select value={form.urgence} onValueChange={(v) => setForm({ ...form, urgence: v })}>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="Basse">Basse</SelectItem><SelectItem value="Moyenne">Moyenne</SelectItem><SelectItem value="Haute">Haute</SelectItem></SelectContent>
            </Select>
          </div>
          <div>
            <Label>Expérience requise *</Label>
            <Select value={form.experience} onValueChange={(v) => setForm({ ...form, experience: v })}>
              <SelectTrigger className="mt-2"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">Moins d'1 an</SelectItem><SelectItem value="1-3">1 à 3 ans</SelectItem>
                <SelectItem value="3-5">3 à 5 ans</SelectItem><SelectItem value="5-10">5 à 10 ans</SelectItem>
                <SelectItem value="10+">10 ans et +</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Niveau d'études *</Label>
            <Select value={form.niveau} onValueChange={(v) => setForm({ ...form, niveau: v })}>
              <SelectTrigger className="mt-2"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Bac">Bac</SelectItem><SelectItem value="Bac+2">Bac+2</SelectItem>
                <SelectItem value="Bac+3">Bac+3</SelectItem><SelectItem value="Bac+4">Bac+4</SelectItem>
                <SelectItem value="Bac+5">Bac+5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Langues exigées *</Label>
          <div className="grid gap-2 sm:grid-cols-3">
            {LANGUES.map((l) => (
              <label key={l} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-primary/40">
                <Checkbox checked={langues.includes(l)} onCheckedChange={() => toggle(l)} /> {l}
              </label>
            ))}
          </div>
        </div>

        <div><Label>Description du besoin</Label><Textarea rows={5} className="mt-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>

        <div className="flex justify-end gap-3">
          <Button asChild variant="outline" type="button"><Link to="/espace-entreprise/demandes">Annuler</Link></Button>
          <Button type="submit" size="lg">Envoyer la demande</Button>
        </div>
      </form>
    </PartnerShell>
  );
}

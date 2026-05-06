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

export const Route = createFileRoute("/espace-entreprise/demandes/nouvelle")({
  head: () => ({ meta: [{ title: "Nouvelle demande — Espace entreprise" }] }),
  component: NouvelleDemande,
});

const LANGUES = ["Français", "Anglais", "Wolof", "Espagnol", "Arabe", "Portugais"];

function NouvelleDemande() {
  const navigate = useNavigate();
  const [langues, setLangues] = useState<string[]>([]);
  const toggle = (v: string) => setLangues((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  return (
    <PartnerShell>
      <PageHeader title="Nouvelle demande de recrutement" description="Décrivez votre besoin, notre équipe vous proposera une shortlist sous 48-72h." />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (langues.length === 0) return toast.error("Sélectionnez au moins une langue.");
          toast.success("Demande envoyée à notre équipe");
          navigate({ to: "/espace-entreprise/demandes" });
        }}
        className="space-y-8 rounded-2xl border border-border bg-card p-8 shadow-soft"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="poste">Intitulé du poste *</Label>
            <Input id="poste" required className="mt-2" placeholder="Ex : Téléconseiller bilingue FR/EN" />
          </div>
          <div>
            <Label htmlFor="nb">Nombre de postes *</Label>
            <Input id="nb" type="number" min={1} defaultValue={1} required className="mt-2" />
          </div>
          <div>
            <Label htmlFor="urgence">Urgence *</Label>
            <Select required defaultValue="Moyenne">
              <SelectTrigger id="urgence" className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Basse">Basse</SelectItem>
                <SelectItem value="Moyenne">Moyenne</SelectItem>
                <SelectItem value="Haute">Haute</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="exp">Expérience requise *</Label>
            <Select required>
              <SelectTrigger id="exp" className="mt-2"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">Moins d'1 an</SelectItem>
                <SelectItem value="1-3">1 à 3 ans</SelectItem>
                <SelectItem value="3-5">3 à 5 ans</SelectItem>
                <SelectItem value="5-10">5 à 10 ans</SelectItem>
                <SelectItem value="10+">10 ans et +</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="niveau">Niveau d'études *</Label>
            <Select required>
              <SelectTrigger id="niveau" className="mt-2"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Bac">Bac</SelectItem>
                <SelectItem value="Bac+2">Bac+2</SelectItem>
                <SelectItem value="Bac+3">Bac+3</SelectItem>
                <SelectItem value="Bac+4">Bac+4</SelectItem>
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

        <div>
          <Label htmlFor="desc">Description du besoin</Label>
          <Textarea id="desc" rows={5} className="mt-2" placeholder="Missions, contexte, environnement de travail, plage horaire, etc." />
        </div>

        <div className="flex justify-end gap-3">
          <Button asChild variant="outline" type="button"><Link to="/espace-entreprise/demandes">Annuler</Link></Button>
          <Button type="submit" size="lg">Envoyer la demande</Button>
        </div>
      </form>
    </PartnerShell>
  );
}

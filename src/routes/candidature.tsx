import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/candidature")({
  head: () => ({
    meta: [
      { title: "Déposer ma candidature — SUNU TRAINING CENTER" },
      { name: "description", content: "Déposez votre CV pour intégrer notre vivier de talents GRC à Dakar. Aucun compte requis." },
    ],
  }),
  component: CandidaturePage,
});

const LANGUES = ["Français", "Anglais", "Wolof", "Espagnol", "Arabe", "Portugais"] as const;
const COMPETENCES = [
  "Service client",
  "CRM (Salesforce, Zendesk…)",
  "Vente / Téléprospection",
  "Support technique",
  "Réclamations / Litiges",
  "Back-office",
  "Team Leader",
  "Formateur GRC",
] as const;

function CandidaturePage() {
  const [submitted, setSubmitted] = useState(false);
  const [langues, setLangues] = useState<string[]>([]);
  const [comps, setComps] = useState<string[]>([]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  if (submitted) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">Candidature reçue, merci !</h1>
          <p className="mt-4 text-ink-soft">
            Notre équipe étudie votre profil. Si votre expérience correspond à une mission en cours, un recruteur vous contactera sous quelques jours.
          </p>
          <div className="mt-8">
            <Button asChild><Link to="/">Retour à l'accueil</Link></Button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Candidature</span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Rejoignez notre vivier de talents GRC.</h1>
        <p className="mt-4 text-ink-soft">
          Aucun compte à créer. Renseignez votre profil ci-dessous, nous vous recontacterons dès qu'une mission correspondant à votre expérience sera disponible.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (langues.length === 0 || comps.length === 0) {
              toast.error("Sélectionnez au moins une langue et une compétence.");
              return;
            }
            toast.success("Candidature envoyée");
            setSubmitted(true);
          }}
          className="mt-10 space-y-8 rounded-3xl border border-border bg-card p-8 shadow-soft"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="prenom">Prénom *</Label>
              <Input id="prenom" required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input id="nom" required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="tel">Téléphone *</Label>
              <Input id="tel" type="tel" required className="mt-2" />
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Langues parlées *</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {LANGUES.map((l) => (
                <label key={l} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-primary/40">
                  <Checkbox checked={langues.includes(l)} onCheckedChange={() => toggle(langues, l, setLangues)} />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Compétences GRC *</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {COMPETENCES.map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-primary/40">
                  <Checkbox checked={comps.includes(c)} onCheckedChange={() => toggle(comps, c, setComps)} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="exp">Années d'expérience *</Label>
              <Select required>
                <SelectTrigger id="exp" className="mt-2"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">Moins d'1 an</SelectItem>
                  <SelectItem value="1-3">1 à 3 ans</SelectItem>
                  <SelectItem value="3-5">3 à 5 ans</SelectItem>
                  <SelectItem value="5-10">5 à 10 ans</SelectItem>
                  <SelectItem value="10+">Plus de 10 ans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="poste">Poste recherché *</Label>
              <Input id="poste" required className="mt-2" placeholder="Ex : Téléconseiller bilingue" />
            </div>
          </div>

          <div>
            <Label htmlFor="cv">CV (PDF, DOC) *</Label>
            <label htmlFor="cv" className="mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-background px-6 py-10 text-center hover:border-primary/50">
              <Upload className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-ink">Cliquez pour téléverser votre CV</span>
              <span className="text-xs text-ink-soft">PDF, DOC, DOCX — 5 Mo max</span>
              <input id="cv" type="file" accept=".pdf,.doc,.docx" required className="sr-only" />
            </label>
          </div>

          <Button type="submit" size="lg" className="w-full">Envoyer ma candidature</Button>
          <p className="text-center text-xs text-ink-soft">
            En soumettant, vous acceptez que vos données soient utilisées pour traiter votre candidature.
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}

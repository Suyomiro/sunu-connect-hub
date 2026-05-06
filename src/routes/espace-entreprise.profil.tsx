import { createFileRoute } from "@tanstack/react-router";
import { PartnerShell } from "@/components/site/PartnerShell";
import { PageHeader } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/espace-entreprise/profil")({
  head: () => ({ meta: [{ title: "Profil entreprise — Espace entreprise" }] }),
  component: ProfilPage,
});

function ProfilPage() {
  return (
    <PartnerShell>
      <PageHeader title="Profil entreprise" description="Informations utilisées dans vos demandes et factures." />
      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Profil mis à jour"); }}
        className="grid gap-5 rounded-2xl border border-border bg-card p-8 shadow-soft sm:grid-cols-2"
      >
        <div className="sm:col-span-2"><Label>Raison sociale</Label><Input defaultValue="Orange Sénégal" className="mt-2" /></div>
        <div><Label>Secteur</Label><Input defaultValue="Télécoms" className="mt-2" /></div>
        <div><Label>NINEA / RC</Label><Input defaultValue="00123456" className="mt-2" /></div>
        <div><Label>Contact principal</Label><Input defaultValue="Khady Mbaye" className="mt-2" /></div>
        <div><Label>Téléphone</Label><Input defaultValue="+221 33 859 00 00" className="mt-2" /></div>
        <div className="sm:col-span-2"><Label>Email</Label><Input type="email" defaultValue="k.mbaye@orange.sn" className="mt-2" /></div>
        <div className="sm:col-span-2"><Label>Adresse</Label><Textarea rows={3} defaultValue="Immeuble Orange, route des Almadies, Dakar" className="mt-2" /></div>
        <div className="sm:col-span-2 flex justify-end"><Button type="submit">Enregistrer</Button></div>
      </form>
    </PartnerShell>
  );
}

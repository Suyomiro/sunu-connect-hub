import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SUNU TRAINING CENTER" },
      { name: "description", content: "Contactez SUNU TRAINING CENTER à Dakar pour discuter de vos besoins en recrutement et intérim GRC." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Parlons de vos besoins.</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft">
          Notre équipe vous répond sous 24h ouvrées. Pour les demandes de recrutement urgentes, privilégiez l'espace entreprise.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            {[
              { icon: MapPin, t: "Siège social", d: "Dakar Sacré-Cœur 3 VDN, Sénégal" },
              { icon: Phone, t: "Téléphone", d: "+221 33 000 00 00" },
              { icon: Mail, t: "Email", d: "contact@sunutraining.sn" },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{t}</p>
                  <p className="mt-1 font-medium text-ink">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message envoyé", { description: "Notre équipe vous recontacte sous 24h." });
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="rounded-3xl border border-border bg-card p-8 shadow-soft"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="company">Entreprise</Label>
                <Input id="company" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" className="mt-2" />
              </div>
            </div>
            <div className="mt-5">
              <Label htmlFor="msg">Message</Label>
              <Textarea id="msg" rows={5} required className="mt-2" placeholder="Décrivez brièvement votre besoin…" />
            </div>
            <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">Envoyer le message</Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

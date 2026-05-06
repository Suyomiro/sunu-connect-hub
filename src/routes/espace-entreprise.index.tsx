import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getPartnerSession, setPartnerSession } from "@/lib/mock-data";

export const Route = createFileRoute("/espace-entreprise/")({
  head: () => ({
    meta: [
      { title: "Espace Entreprise — SUNU TRAINING CENTER" },
      { name: "description", content: "Connectez-vous pour déposer vos demandes de recrutement GRC et suivre les candidats." },
    ],
  }),
  component: PartnerAuthPage,
});

function PartnerAuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getPartnerSession()) navigate({ to: "/espace-entreprise/dashboard" });
  }, [navigate]);

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Espace entreprise</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Vos recrutements GRC, pilotés au même endroit.
          </h1>
          <p className="mt-6 text-lg text-ink-soft">
            Déposez vos demandes, recevez des shortlists qualifiées et suivez chaque mission en temps réel.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              { icon: Building2, t: "Demandes de recrutement", d: "Profil, langue, expérience, niveau, urgence — en 2 minutes." },
              { icon: Sparkles, t: "Candidats proposés", d: "Recevez des shortlists qualifiées, prêtes à intégrer vos équipes." },
              { icon: Lock, t: "Espace sécurisé", d: "Vos données et historiques restent confidentiels." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-ink">{t}</p>
                  <p className="text-sm text-ink-soft">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Créer un compte</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6"><LoginForm /></TabsContent>
            <TabsContent value="signup" className="mt-6"><SignupForm /></TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-xs text-ink-soft">
            Vous êtes candidat ? <Link to="/candidature" className="font-medium text-primary hover:underline">Déposez votre CV ici</Link>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@partenaire.sn");
  const [pwd, setPwd] = useState("demo1234");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email || !pwd) return;
        setPartnerSession({ email, company: "Orange Sénégal" });
        toast.success("Connexion réussie");
        navigate({ to: "/espace-entreprise/dashboard" });
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="login-email">Email professionnel</Label>
        <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="login-pwd">Mot de passe</Label>
        <Input id="login-pwd" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required className="mt-2" />
      </div>
      <Button type="submit" size="lg" className="w-full">Se connecter</Button>
      <p className="text-center text-xs text-ink-soft">Démo — utilisez les identifiants pré-remplis.</p>
    </form>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setPartnerSession({ email, company });
        toast.success("Compte créé");
        navigate({ to: "/espace-entreprise/dashboard" });
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="su-company">Nom de l'entreprise</Label>
        <Input id="su-company" required className="mt-2" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="su-name">Contact</Label>
          <Input id="su-name" required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="su-phone">Téléphone</Label>
          <Input id="su-phone" type="tel" required className="mt-2" />
        </div>
      </div>
      <div>
        <Label htmlFor="su-email">Email professionnel</Label>
        <Input id="su-email" type="email" required className="mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="su-pwd">Mot de passe</Label>
        <Input id="su-pwd" type="password" required className="mt-2" />
      </div>
      <Button type="submit" size="lg" className="w-full">Créer mon compte</Button>
    </form>
  );
}

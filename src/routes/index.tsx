import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Users2, Building2, Headphones, Banknote, Smartphone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-agent.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SUNU TRAINING CENTER — Spécialiste GRC à Dakar" },
      { name: "description", content: "Recrutement et intérim spécialisés en Gestion de la Relation Client à Dakar. Talents qualifiés sous 48h." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Spécialiste GRC · Dakar
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Les meilleurs talents <span className="text-primary">au service</span> de votre relation client.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              Cabinet de recrutement et d'intérim 100% dédié à la Gestion de la Relation Client. Centres d'appels, télécoms, banques, fintechs — nous mobilisons les bons profils en 48h.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/candidature">
                  Déposer ma candidature <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/espace-entreprise">Espace entreprise</Link>
              </Button>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { k: "48h", v: "Délai de réponse" },
                { k: "100%", v: "Profils testés" },
                { k: "0 FCFA", v: "Remplacement" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-2xl font-bold text-primary sm:text-3xl">{s.k}</dt>
                  <dd className="mt-1 text-xs text-ink-soft">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-3xl" />
            <div className="overflow-hidden rounded-3xl shadow-elegant ring-1 ring-primary/10">
              <img
                src={heroImg}
                alt="Conseillère GRC souriante portant un casque, dans un centre d'appels moderne à Dakar"
                width={1280}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-background px-5 py-4 shadow-soft sm:block">
              <p className="text-xs uppercase tracking-wider text-ink-soft">Réactivité</p>
              <p className="font-display text-xl font-bold text-ink">Candidats sous 48h</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / SECTORS */}
      <section className="border-y border-border bg-secondary/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-ink-soft">
            Ils font confiance à l'expertise GRC
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: Headphones, label: "Centres d'appels & BPO" },
              { icon: Smartphone, label: "Télécoms & FAI" },
              { icon: Banknote, label: "Banques & Assurances" },
              { icon: Building2, label: "Fintechs & Startups" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-ink">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pourquoi SUNU TRAINING CENTER ?
          </h2>
          <p className="mt-4 text-ink-soft">
            Une approche unique, ciblée, et un engagement qualité mesurable. Nous fournissons des experts opérationnels dès le premier jour.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Sélection rigoureuse", d: "Tests d'élocution, orthographe et maîtrise des outils CRM. Vérification systématique des références." },
            { icon: Clock, t: "Réactivité 48h", d: "Vivier qualifié et processus optimisés pour mobiliser les bons profils en moins de 48 heures." },
            { icon: Users2, t: "Accompagnement humain", d: "Gestion RH, sociale et administrative complète. Suivi mensuel pendant les missions." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elegant hover:border-primary/30">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Trois formules, une exigence : la qualité.
              </h2>
              <p className="mt-4 text-ink-soft">Chaque formule s'adapte à vos contraintes opérationnelles tout en préservant la performance de vos équipes.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/services">Voir tous les services <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Intérim Expert", d: "Remplacement temporaire ou couverture de surcroît d'activité. Team Leaders, formateurs, experts GRC.", b: "1 à 6 mois" },
              { t: "Management de Transition", d: "Accompagnement des phases critiques : restructuration, lancement, transformation digitale.", b: "3 à 12 mois" },
              { t: "Pré-embauche", d: "Évaluation en situation réelle pendant 6 mois avec option d'embauche en CDI.", b: "Option CDI" },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-background p-7 shadow-soft">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{c.b}</span>
                <h3 className="mt-4 font-display text-xl font-semibold">{c.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{c.d}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {["Profils certifiés GRC", "Garantie remplacement", "Gestion RH incluse"].map((it) => (
                    <li key={it} className="flex items-center gap-2 text-ink-soft">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-14 text-primary-foreground shadow-elegant sm:px-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Vous recrutez ? Nous trouvons le bon profil sous 48h.
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/85">
                Créez votre espace entreprise et déposez votre première demande de recrutement gratuitement.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg" variant="secondary">
                <Link to="/espace-entreprise">Espace entreprise</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

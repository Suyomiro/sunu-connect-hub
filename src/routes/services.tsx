import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Briefcase, Rocket, Handshake, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Intérim & Recrutement GRC | SUNU TRAINING CENTER" },
      { name: "description", content: "Intérim Expert, Management de Transition, Pré-embauche : trois formules dédiées à la Gestion de la Relation Client." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Briefcase,
    badge: "1 à 6 mois",
    title: "L'Intérim Expert",
    desc: "Cœur de métier : remplacement temporaire ou couverture de surcroît d'activité pour Team Leaders, Formateurs et experts GRC.",
    bullets: ["Profils opérationnels dès J+1", "Gestion RH complète", "Garantie de remplacement gratuit"],
  },
  {
    icon: Rocket,
    badge: "3 à 12 mois",
    title: "Management de Transition",
    desc: "Accompagnement des phases critiques : restructuration d'équipes, lancement de nouveaux projets, transformation digitale.",
    bullets: ["Cadres expérimentés", "Pilotage de projet inclus", "Reporting hebdomadaire"],
  },
  {
    icon: Handshake,
    badge: "Option CDI",
    title: "Pré-embauche",
    desc: "Mission d'intérim de 6 mois avec option d'embauche en CDI. Évaluation en situation réelle avant engagement définitif.",
    bullets: ["Risque de mauvaise sélection réduit", "Période d'évaluation 6 mois", "Bascule CDI simplifiée"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Services</span>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Trois formules dédiées à la performance GRC.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-ink-soft">
          Notre processus inclut entretiens approfondis, tests techniques (élocution, orthographe, CRM), et vérification systématique des références.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, badge, title, desc, bullets }) => (
            <article key={title} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <span className="mt-5 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{badge}</span>
              <h2 className="mt-3 font-display text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{desc}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-ink-soft">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight">Notre processus en 4 étapes</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Sourcing multi-canal", d: "LinkedIn Recruiter, plateformes Emploi Dakar et Novojob, réseau de prescripteurs." },
              { n: "02", t: "Validation rigoureuse", d: "Entretiens structurés, tests standardisés (élocution, orthographe, CRM), vérification de références." },
              { n: "03", t: "Intégration accompagnée", d: "Formation aux outils du client, présentation d'équipe, suivi hebdomadaire les 2 premiers mois." },
              { n: "04", t: "Monitoring continu", d: "Entretiens mensuels, ajustements rapides, garantie de remplacement sous 48h." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-background p-6">
                <span className="font-display text-3xl font-bold text-primary/30">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/espace-entreprise">Faire une demande</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/contact">Discuter de mes besoins</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

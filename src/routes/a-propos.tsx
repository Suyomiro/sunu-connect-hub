import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Award, Target, Globe2, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — SUNU TRAINING CENTER" },
      { name: "description", content: "Cabinet sénégalais 100% dédié à la Gestion de la Relation Client. Notre vision : devenir la référence GRC en Afrique de l'Ouest." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">À propos</span>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Le premier cabinet 100% spécialisé GRC à Dakar.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-ink-soft">
          Dans un marché sénégalais devenu hub de l'outsourcing en Afrique de l'Ouest, SUNU TRAINING CENTER répond aux défis de la Gestion de la Relation Client avec une approche unique : spécialisation, sélection rigoureuse et accompagnement humain.
        </p>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Globe2, t: "Vision 5 ans", d: "Devenir la référence n°1 de l'intérim GRC en Afrique de l'Ouest, avec une présence dans 3 pays." },
            { icon: Award, t: "Expertise", d: "Maîtrise des enjeux CRM, des outils technologiques et des métiers du service client." },
            { icon: Target, t: "Réactivité", d: "Délai moyen de 48 heures pour fournir des candidats qualifiés et opérationnels." },
            { icon: HeartHandshake, t: "Accompagnement", d: "Gestion RH, sociale et administrative complète pour libérer nos clients." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-background p-6">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight">Notre identité</h2>
        <p className="mt-6 text-ink-soft">
          SARL avec siège social à Dakar Sacré-Cœur 3 VDN, SUNU TRAINING CENTER allie agilité et solidité juridique. Cette structure nous offre la flexibilité nécessaire pour grandir rapidement tout en sécurisant nos engagements envers clients et intérimaires.
        </p>
        <p className="mt-4 text-ink-soft">
          Notre équipe : un directeur de cabinet, deux recruteurs spécialisés GRC, un responsable RH et un community manager — une organisation légère qui garantit proximité et qualité d'exécution.
        </p>
      </section>
    </SiteLayout>
  );
}

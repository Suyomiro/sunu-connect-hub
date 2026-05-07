import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { PartnerShell } from "@/components/site/PartnerShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore, demandesApi } from "@/lib/store";
import { ArrowLeft, Briefcase, Calendar, GraduationCap, Languages, Users } from "lucide-react";
import { toast } from "sonner";
import type { Statut } from "@/lib/mock-data";

export const Route = createFileRoute("/espace-entreprise/demandes/$id")({
  head: () => ({ meta: [{ title: "Détails de la demande" }] }),
  component: DemandeDetail,
});

function DemandeDetail() {
  const { id } = Route.useParams();
  const d = useStore((s) => s.demandes.find((x) => x.id === id));
  const candidats = useStore((s) => s.candidats);
  const proposed = useMemo(() => candidats.slice(0, 4), [candidats]);
  if (!d) throw notFound();

  const tone = (s: string) =>
    s === "Pourvue"
      ? "success"
      : s === "Nouvelle"
        ? "info"
        : s === "Clôturée"
          ? "default"
          : "warning";

  return (
    <PartnerShell>
      <Link
        to="/espace-entreprise/demandes"
        className="mb-4 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <PageHeader
        title={d.poste}
        description={`Référence ${d.reference} · Créée le ${new Date(d.dateCreation).toLocaleDateString("fr-FR")}`}
        action={<StatusBadge tone={tone(d.statut)}>{d.statut}</StatusBadge>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-soft">
            Détails du poste
          </h3>
          <Row icon={Users} label="Postes ouverts" value={String(d.nbPostes)} />
          <Row icon={Briefcase} label="Expérience" value={d.experience} />
          <Row icon={GraduationCap} label="Niveau" value={d.niveau} />
          <Row icon={Languages} label="Langues" value={d.langues.join(", ")} />
          <Row icon={Calendar} label="Urgence" value={d.urgence} />

          <div className="pt-4 border-t border-border">
            <p className="mb-2 text-xs uppercase tracking-wider text-ink-soft">Changer le statut</p>
            <Select
              value={d.statut}
              onValueChange={(v) => {
                demandesApi.update(d.id, { statut: v as Statut });
                toast.success("Statut mis à jour");
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  [
                    "Nouvelle",
                    "En traitement",
                    "Shortlist envoyée",
                    "Pourvue",
                    "Clôturée",
                  ] as Statut[]
                ).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Candidats proposés</h3>
            <span className="text-sm text-ink-soft">{proposed.length} candidats</span>
          </div>
          <div className="mt-4 divide-y divide-border">
            {proposed.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-semibold text-ink">
                    {c.prenom} {c.nom}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {c.poste} · {c.experience} · {c.langues.join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge tone="info">{c.statut}</StatusBadge>
                  <Button size="sm" variant="outline">
                    Voir CV
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PartnerShell>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-1.5">
      <Icon className="mt-0.5 h-4 w-4 text-primary" />
      <div className="text-sm">
        <p className="text-ink-soft">{label}</p>
        <p className="font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

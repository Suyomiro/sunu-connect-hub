import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PartnerShell } from "@/components/site/PartnerShell";
import { PageHeader, StatusBadge } from "@/components/site/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Trash2 } from "lucide-react";
import { useStore, demandesApi } from "@/lib/store";
import { getPartnerSession } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/espace-entreprise/demandes/")({
  head: () => ({ meta: [{ title: "Mes demandes — Espace entreprise" }] }),
  component: DemandesPage,
});

function DemandesPage() {
  const [q, setQ] = useState("");
  const [statut, setStatut] = useState<string>("all");
  const company = getPartnerSession()?.company ?? "";
  const demandes = useStore((s) => s.demandes);
  const all = useMemo(() => demandes.filter((d) => d.partenaire === company), [demandes, company]);
  const list = all.filter(
    (d) =>
      (statut === "all" || d.statut === statut) &&
      (q === "" ||
        d.poste.toLowerCase().includes(q.toLowerCase()) ||
        d.reference.toLowerCase().includes(q.toLowerCase())),
  );
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
      <PageHeader
        title="Mes demandes de recrutement"
        description="Suivez l'avancement de chaque demande."
        action={
          <Button asChild>
            <Link to="/espace-entreprise/demandes/nouvelle">+ Nouvelle demande</Link>
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-soft" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher par poste ou référence"
            className="pl-9"
          />
        </div>
        <Select value={statut} onValueChange={setStatut}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="Nouvelle">Nouvelle</SelectItem>
            <SelectItem value="En traitement">En traitement</SelectItem>
            <SelectItem value="Shortlist envoyée">Shortlist envoyée</SelectItem>
            <SelectItem value="Pourvue">Pourvue</SelectItem>
            <SelectItem value="Clôturée">Clôturée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Référence</th>
              <th className="px-4 py-3">Poste</th>
              <th className="px-4 py-3">Postes</th>
              <th className="px-4 py-3">Urgence</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Créée le</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((d) => (
              <tr key={d.id} className="border-t border-border/60 hover:bg-secondary/30">
                <td className="px-4 py-3 font-mono text-xs text-ink-soft">{d.reference}</td>
                <td className="px-4 py-3 font-medium">{d.poste}</td>
                <td className="px-4 py-3">{d.nbPostes}</td>
                <td className="px-4 py-3">
                  <StatusBadge
                    tone={
                      d.urgence === "Haute"
                        ? "danger"
                        : d.urgence === "Moyenne"
                          ? "warning"
                          : "default"
                    }
                  >
                    {d.urgence}
                  </StatusBadge>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge tone={tone(d.statut)}>{d.statut}</StatusBadge>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {new Date(d.dateCreation).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link
                      to="/espace-entreprise/demandes/$id"
                      params={{ id: d.id }}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Détails →
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        if (confirm("Supprimer cette demande ?")) {
                          demandesApi.remove(d.id);
                          toast.success("Demande supprimée");
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-rose-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-ink-soft">
                  Aucune demande.{" "}
                  <Link
                    to="/espace-entreprise/demandes/nouvelle"
                    className="text-primary hover:underline"
                  >
                    Créer la première
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PartnerShell>
  );
}

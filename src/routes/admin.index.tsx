import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { getAdminSession, setAdminSession } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Connexion Admin — SUNU TRAINING CENTER" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@sunutraining.sn");
  const [pwd, setPwd] = useState("admin1234");

  useEffect(() => {
    if (getAdminSession()) navigate({ to: "/admin/dashboard" });
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elegant">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-bold">Backoffice SUNU</p>
            <p className="text-xs text-ink-soft">Réservé aux recruteurs</p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAdminSession({ email, name: "Aminata Diop", role: "Admin" });
            toast.success("Bienvenue");
            navigate({ to: "/admin/dashboard" });
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="ae">Email professionnel</Label>
            <Input id="ae" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2" />
          </div>
          <div>
            <Label htmlFor="ap">Mot de passe</Label>
            <Input id="ap" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required className="mt-2" />
          </div>
          <Button type="submit" size="lg" className="w-full">Se connecter</Button>
        </form>
        <p className="mt-6 text-center text-xs text-ink-soft">
          <Link to="/" className="hover:text-primary">← Retour au site</Link>
        </p>
      </div>
    </div>
  );
}

import logoSrc from "@/assets/logo.png";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={logoSrc} alt="SUNU TRAINING CENTER" className={className} />;
}

import { ShieldCheck } from "lucide-react";

export function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-bold">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary glow">
        <ShieldCheck className="h-5 w-5 text-primary-foreground" />
      </span>
      <span>Intern<span className="text-gradient">Shield</span></span>
    </a>
  );
}

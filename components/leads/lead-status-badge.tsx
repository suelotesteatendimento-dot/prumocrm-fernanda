import type { LeadStatus } from "@/lib/validations/lead";
import { leadStatusLabels } from "@/lib/validations/lead";
import { cn } from "@/lib/utils";

const statusClassName: Record<LeadStatus, string> = {
  em_aberto: "border-brand-300/55 bg-brand-100/80 text-brand-950",
  follow_up: "border-brand-500/38 bg-[#f4ece3] text-brand-950",
  aprovado: "border-emerald-200/70 bg-[#eef6ef] text-[#35523b]",
  reprovado: "border-rose-200/70 bg-[#faf1f0] text-[#7f4b45]"
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        statusClassName[status]
      )}
    >
      {leadStatusLabels[status]}
    </span>
  );
}

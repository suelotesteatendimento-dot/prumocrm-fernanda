import { Card, CardContent } from "@/components/ui/card";

type DashboardHighlightProps = {
  totalLeads: number;
  conversionRate: number;
};

export function DashboardHighlight({
  totalLeads,
  conversionRate
}: DashboardHighlightProps) {
  return (
    <Card className="overflow-hidden border-brand-300/55 bg-[linear-gradient(135deg,rgba(200,176,138,0.18),rgba(247,243,238,0.94))]">
      <CardContent className="flex flex-col gap-8 p-7 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-brand-300/50 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-brand-600">
            Visão comercial
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-brand-950">
            Um panorama claro da captação e conversão da MBW.
          </h2>
          <p className="mt-4 text-base leading-7 text-brand-600">
            O dashboard consolida os leads cadastrados, mostra a distribuição por status
            e ajuda a Dra Fernanda a identificar rapidamente oportunidades em aberto.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand-300/45 bg-white/80 px-5 py-4 shadow-[0_16px_30px_-26px_rgba(17,17,17,0.18)]">
            <p className="text-sm text-brand-600">Base ativa</p>
            <p className="mt-2 text-3xl font-semibold text-brand-950">{totalLeads}</p>
          </div>
          <div className="rounded-2xl border border-brand-500/35 bg-brand-950 px-5 py-4 shadow-[0_18px_34px_-26px_rgba(17,17,17,0.34)]">
            <p className="text-sm text-brand-300">Conversão</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {conversionRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

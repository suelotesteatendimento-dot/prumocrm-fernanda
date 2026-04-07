import type { Lead } from "@/lib/types/lead";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";

export function PipelineView({ leads }: { leads: Lead[] }) {
  return <PipelineBoard leads={leads} />;
}

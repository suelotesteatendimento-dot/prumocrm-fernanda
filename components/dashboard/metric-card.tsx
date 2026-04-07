import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  accent?: "default" | "champagne";
};

export function MetricCard({
  title,
  value,
  description,
  accent = "default"
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "border-brand-300/50",
        accent === "champagne" && "border-brand-500/45 bg-brand-100/58"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-brand-600">{title}</p>
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full bg-brand-950/70 shadow-[0_0_0_6px_rgba(200,176,138,0.12)]",
              accent === "champagne" && "bg-brand-500"
            )}
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-[2rem] font-semibold tracking-[-0.04em] text-brand-950">
          {value}
        </CardTitle>
        <CardDescription className="mt-2 text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

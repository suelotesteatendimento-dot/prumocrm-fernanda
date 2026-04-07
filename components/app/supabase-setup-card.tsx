import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SupabaseSetupCardProps = {
  title: string;
  description: string;
};

export function SupabaseSetupCard({
  title,
  description
}: SupabaseSetupCardProps) {
  return (
    <Card className="overflow-hidden border-brand-300/50">
      <CardHeader>
        <div className="inline-flex w-fit rounded-full border border-brand-300/55 bg-brand-100/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-brand-600">
          Configuração
        </div>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-brand-600">
        <p>Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` em `.env.local`.</p>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

function LoadingCard() {
  return (
    <div className="panel-muted rounded-2xl p-5">
      <div className="h-4 w-28 animate-pulse rounded-full bg-brand-200" />
      <div className="mt-4 h-10 w-24 animate-pulse rounded-xl bg-brand-200" />
      <div className="mt-3 h-4 w-40 animate-pulse rounded-full bg-brand-200" />
    </div>
  );
}

export default function AppLoading() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-300/45 bg-[linear-gradient(135deg,rgba(200,176,138,0.18),rgba(247,243,238,0.94))] p-8 shadow-[0_18px_34px_-28px_rgba(17,17,17,0.18)]">
        <div className="h-4 w-32 animate-pulse rounded-full bg-brand-200" />
        <div className="mt-4 h-10 w-2/3 animate-pulse rounded-xl bg-brand-200" />
        <div className="mt-4 h-5 w-1/2 animate-pulse rounded-full bg-brand-200" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </div>
  );
}

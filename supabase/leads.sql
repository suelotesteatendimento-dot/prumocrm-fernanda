create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text not null,
  procedimento text not null,
  origem text not null check (
    origem in ('Instagram', 'WhatsApp', 'Indicação', 'Site', 'Tráfego pago', 'Outro')
  ),
  status text not null default 'em_aberto' check (
    status in ('em_aberto', 'follow_up', 'aprovado', 'reprovado')
  ),
  observacoes text null,
  data_entrada date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;

create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

# CRM MBW

CRM enxuto para a MBW Espaço Integrativo, focado em:

- dashboard
- cadastro de leads
- pipeline comercial

## Stack

- Next.js 15 com App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- React Hook Form
- Zod
- TanStack Table
- Recharts
- dnd-kit

## Requisitos

- Node.js 20+
- npm 10+
- projeto Supabase criado

## 1. Instalar dependências

```bash
npm install
```

## 2. Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
```

Você também pode usar o arquivo `.env.example` como base.

## 3. Criar a tabela de leads no Supabase

Abra o SQL Editor do Supabase e execute o conteúdo de [supabase/leads.sql](C:\Users\Projeto\Documents\crm-fernanda\supabase\leads.sql).

Esse script cria:

- tabela `public.leads`
- validações de `status` e `origem`
- trigger para atualizar `updated_at` automaticamente

## 4. Rodar o projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## 5. Validar build local

```bash
npm run typecheck
npm run build
```

## Rotas principais

- `/login`
- `/dashboard`
- `/leads`
- `/pipeline`

## Estrutura resumida

- `app/(app)`:
  páginas autenticadas do CRM
- `components/dashboard`:
  componentes visuais e composição do dashboard
- `components/leads`:
  tabela, formulário e módulo de CRUD dos leads
- `components/pipeline`:
  kanban, colunas e cards do pipeline
- `lib/leads`:
  consultas ao Supabase
- `lib/dashboard`:
  agregação e cálculo das métricas
- `lib/pipeline`:
  montagem e movimentação do board
- `lib/supabase`:
  clientes, envs e tipos do banco

## Como o CRM funciona hoje

### Dashboard

- busca os leads no Supabase
- calcula total, em aberto, follow up, aprovados, reprovados e taxa de conversão
- mostra gráfico por status e lista de leads recentes

### Leads

- CRUD completo com Supabase
- busca por nome
- filtro por status
- criação e edição com React Hook Form + Zod
- exclusão com confirmação

### Pipeline

- kanban com `dnd-kit`
- colunas: em aberto, follow up, aprovado e reprovado
- arrastar e soltar atualiza o status no Supabase
- atualização otimista na interface

## Observações

- novos leads entram com status `em_aberto`
- se as envs do Supabase não estiverem preenchidas, as páginas protegidas mostram instruções de configuração
- o projeto usa componentes compartilhados para manter consistência visual entre login, dashboard, leads e pipeline

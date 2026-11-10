-- Marcenaria FFMA · schema do Supabase
-- Rodar uma vez no SQL Editor do projeto (Supabase > SQL Editor > New query > Run).
-- Depois, criar o usuário em Authentication > Users e liberá-lo como admin:
--   insert into admins (user_id) select id from auth.users where email = 'SEU_EMAIL';

-- ───────── Admin ─────────
create table if not exists admins (
  user_id uuid primary key references auth.users on delete cascade
);
alter table admins enable row level security;
create policy "admin lê a própria linha" on admins for select using (auth.uid() = user_id);

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- ───────── Portfólio ─────────
create table if not exists projects (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text unique not null,
  room          text,                    -- Sala | Quarto | Cozinha | Escritório | Banheiro
  city          text,
  completed_at  date,
  material      text,
  lead_time     text,
  description   text,
  is_featured   boolean default false,
  is_published  boolean default false,
  display_order int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table if not exists project_photos (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references projects on delete cascade,
  storage_path  text not null,
  url           text not null,
  caption       text,
  display_order int default 0,
  created_at    timestamptz default now()
);

-- ───────── Loja ─────────
create table if not exists products (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text unique not null,
  category        text,
  detail          text,                  -- ex.: "6 lugares", "180 cm"
  description     text,
  price           numeric(10,2) not null,
  finishes        text[] default '{}',
  lead_time       text,
  in_stock        boolean default false, -- pronta entrega
  badge           text,                  -- Destaque | Novo
  payment_methods jsonb default '["PIX","Cartão de crédito","Transferência"]',
  is_featured     boolean default false,
  is_available    boolean default true,
  display_order   int default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create table if not exists product_photos (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid not null references products on delete cascade,
  storage_path  text not null,
  url           text not null,
  display_order int default 0,
  created_at    timestamptz default now()
);

-- ───────── Orçamentos (formulário de contato) ─────────
create table if not exists quotes (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text,
  phone      text,
  city       text,
  subject    text,
  message    text,
  status     text not null default 'novo',  -- novo | respondido
  created_at timestamptz default now()
);

-- ───────── Conteúdo editável ─────────
create table if not exists company_info (
  id              int primary key default 1 check (id = 1),
  history_text    text,
  whatsapp_number text,
  phone_label     text,
  contact_email   text,
  address         text,
  updated_at      timestamptz default now()
);

-- ───────── Segurança (RLS) ─────────
alter table projects       enable row level security;
alter table project_photos enable row level security;
alter table products       enable row level security;
alter table product_photos enable row level security;
alter table quotes         enable row level security;
alter table company_info   enable row level security;

create policy "público lê projetos publicados" on projects for select using (is_published or is_admin());
create policy "admin escreve projetos" on projects for all using (is_admin()) with check (is_admin());

create policy "público lê fotos de projetos publicados" on project_photos for select
  using (is_admin() or exists (select 1 from projects p where p.id = project_id and p.is_published));
create policy "admin escreve fotos de projetos" on project_photos for all using (is_admin()) with check (is_admin());

create policy "público lê produtos disponíveis" on products for select using (is_available or is_admin());
create policy "admin escreve produtos" on products for all using (is_admin()) with check (is_admin());

create policy "público lê fotos de produtos disponíveis" on product_photos for select
  using (is_admin() or exists (select 1 from products p where p.id = product_id and p.is_available));
create policy "admin escreve fotos de produtos" on product_photos for all using (is_admin()) with check (is_admin());

create policy "qualquer um envia orçamento" on quotes for insert with check (true);
create policy "admin lê orçamentos" on quotes for select using (is_admin());
create policy "admin atualiza orçamentos" on quotes for update using (is_admin()) with check (is_admin());
create policy "admin apaga orçamentos" on quotes for delete using (is_admin());

create policy "público lê dados da empresa" on company_info for select using (true);
create policy "admin edita dados da empresa" on company_info for all using (is_admin()) with check (is_admin());

-- ───────── Fotos (Storage) ─────────
-- Bucket público para leitura; só o admin envia, troca ou apaga. Limite de 8 MB por imagem.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 8388608, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

create policy "público vê fotos" on storage.objects for select using (bucket_id = 'photos');
create policy "admin envia fotos" on storage.objects for insert with check (bucket_id = 'photos' and public.is_admin());
create policy "admin troca fotos" on storage.objects for update using (bucket_id = 'photos' and public.is_admin());
create policy "admin apaga fotos" on storage.objects for delete using (bucket_id = 'photos' and public.is_admin());

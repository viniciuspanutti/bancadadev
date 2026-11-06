create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text,
  email text not null,
  telefone text,
  faculdade text,
  curso text,
  periodo text,
  idade smallint check (idade is null or idade between 0 and 130),
  criado_em timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Usuários leem o próprio perfil"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

grant select on table public.profiles to authenticated;

create or replace function public.criar_profile()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, nome, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute procedure public.criar_profile();

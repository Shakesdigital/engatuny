create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and is_admin = true
  );
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

alter table public.profiles enable row level security;

create policy "users can read own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "admins can read all profiles"
on public.profiles
for select
using (public.is_admin(auth.uid()));

create policy "users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "admins can manage settings"
on public.settings
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "admins can manage pages"
on public.pages
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "admins can manage modules"
on public.modules
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "admins can manage page modules"
on public.page_modules
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "admins can manage tours"
on public.tours
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "admins can manage testimonials"
on public.testimonials
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "admins can manage blog posts"
on public.blog_posts
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "admins can read and manage contact submissions"
on public.contact_submissions
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

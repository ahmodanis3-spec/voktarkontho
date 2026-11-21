-- ভোক্তার কণ্ঠস্বর: আইন ও ধারা সম্পাদনার টেবিল
-- Supabase > SQL Editor-এ পুরোটা পেস্ট করে একবার Run করুন।

create table if not exists public.law_content (
  id int primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table public.law_content enable row level security;

-- সবাই পড়তে পারবে (সাইটে আইন দেখানোর জন্য)
drop policy if exists "law_read_all" on public.law_content;
create policy "law_read_all" on public.law_content
  for select using (true);

-- শুধু লগইন করা অ্যাডমিন লিখতে পারবে
drop policy if exists "law_admin_insert" on public.law_content;
create policy "law_admin_insert" on public.law_content
  for insert to authenticated with check (true);

drop policy if exists "law_admin_update" on public.law_content;
create policy "law_admin_update" on public.law_content
  for update to authenticated using (true) with check (true);

drop policy if exists "law_admin_delete" on public.law_content;
create policy "law_admin_delete" on public.law_content
  for delete to authenticated using (true);

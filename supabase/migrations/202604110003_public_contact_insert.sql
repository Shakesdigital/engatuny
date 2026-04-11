create policy "public can create contact submissions"
on public.contact_submissions
for insert
with check (true);

-- Enable UUID extension
create extension if not exists "uuid-ossp";

------------------------------------------------------------
-- 1. BLOG POSTS TABLE
------------------------------------------------------------
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  content text, -- Markdown content
  cover_image text,
  status text check (status in ('draft', 'published')) default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

------------------------------------------------------------
-- 2. BLOG TAGS
------------------------------------------------------------
create table public.blog_tags (
  id serial primary key,
  name text unique not null
);

------------------------------------------------------------
-- 3. BLOG POST TAGS (join table)
------------------------------------------------------------
create table public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id integer not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

------------------------------------------------------------
-- 4. BLOG COMMENTS
------------------------------------------------------------
create table public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  name text,
  email text,
  comment text not null,
  created_at timestamptz default now()
);

------------------------------------------------------------
-- 5. ENABLE RLS
------------------------------------------------------------
alter table blog_posts enable row level security;
alter table blog_tags enable row level security;
alter table blog_post_tags enable row level security;
alter table blog_comments enable row level security;

------------------------------------------------------------
-- 6. POLICIES
------------------------------------------------------------

-- Public can read published posts
create policy "Public can read published posts"
  on blog_posts for select
  to public
  using (status = 'published');

-- Server-only write access (service_role)
create policy "Server write posts"
  on blog_posts for all
  to service_role
  using (true)
  with check (true);

-- Tags
create policy "Public can read tags"
  on blog_tags for select
  to public
  using (true);

create policy "Server write tags"
  on blog_tags for all
  to service_role
  using (true)
  with check (true);

-- Post Tags join table
create policy "Public read post_tags"
  on blog_post_tags for select
  to public
  using (true);

create policy "Server write post_tags"
  on blog_post_tags for all
  to service_role
  using (true)
  with check (true);

-- Comments
create policy "Public read comments"
  on blog_comments for select
  to public
  using (true);

create policy "Public create comments"
  on blog_comments for insert
  to public
  with check (true);

-- Optional policy for server admin to delete comments
create policy "Admin delete comments"
  on blog_comments for delete
  to service_role
  using (true);

------------------------------------------------------------
-- 7. STORAGE BUCKET FOR BLOG IMAGES
------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

------------------------------------------------------------
-- 8. STORAGE POLICIES
------------------------------------------------------------
create policy "Public can view blog images"
  on storage.objects for select
  to public
  using (bucket_id = 'blog-images');

create policy "Server can upload blog images"
  on storage.objects for insert
  to service_role
  with check (bucket_id = 'blog-images');

create policy "Server can update blog images"
  on storage.objects for update
  to service_role
  using (bucket_id = 'blog-images')
  with check (bucket_id = 'blog-images');

create policy "Server can delete blog images"
  on storage.objects for delete
  to service_role
  using (bucket_id = 'blog-images');

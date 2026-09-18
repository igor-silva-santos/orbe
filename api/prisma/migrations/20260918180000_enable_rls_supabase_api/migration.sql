-- Supabase Security Advisor: RLS em tabelas public.
-- A API Orbe acessa via Prisma (role postgres) — bypassa RLS sem FORCE.
-- PostgREST (anon/authenticated) fica bloqueado sem policies.

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon, authenticated', tbl);
  END LOOP;
END $$;

-- Cole no Supabase → SQL Editor (projeto orbe).
-- Remove alertas "RLS Disabled in Public" sem afetar a API no Render (Prisma/postgres).

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

-- Conferir tabelas ainda sem RLS (deve retornar 0 linhas)
SELECT c.relname AS table_name
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
  AND NOT c.relrowsecurity;

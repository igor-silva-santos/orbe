-- Esta migration tinha timestamp (20250810120000) anterior ao baseline (20250920160000),
-- então `prisma migrate deploy` tentava rodá-la ANTES da tabela "Filme" existir — banco
-- novo nunca conseguia subir do zero. Renomeada pra ficar logo depois do baseline.
-- IF NOT EXISTS: no banco de produção, que já tem essas colunas desde a aplicação original
-- (sob o nome antigo da migration), rodar de novo sob o nome novo precisa ser inofensivo.
ALTER TABLE "Filme" ADD COLUMN IF NOT EXISTS "emCartaz" BOOLEAN DEFAULT false;
ALTER TABLE "Filme" ADD COLUMN IF NOT EXISTS "emBreve" BOOLEAN DEFAULT false;

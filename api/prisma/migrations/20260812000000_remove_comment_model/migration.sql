-- Remove a feature de comentários: a tabela carrega sua própria FK e índice,
-- então o DROP TABLE já cuida de ambos sem precisar dos nomes gerados pelo Prisma.
DROP TABLE IF EXISTS "Comment";

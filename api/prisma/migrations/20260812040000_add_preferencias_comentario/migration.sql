-- `preferencias_usuario_midia.comentario` está declarado no schema.prisma (usado pelo review
-- de "Já Assisti"/"Já Joguei") mas NUNCA foi criado por nenhuma migration — sem essa coluna,
-- todo GET /api/me/interactions falha com P2022 ("column does not exist"), o que quebra
-- favoritar/quero-assistir/já-assisti pra QUALQUER usuário logado (initializeApp chama essa
-- rota no carregamento de toda página). IF NOT EXISTS por segurança, caso algum ambiente já
-- tenha essa coluna adicionada manualmente por fora do histórico de migrations.
ALTER TABLE "preferencias_usuario_midia" ADD COLUMN IF NOT EXISTS "comentario" TEXT;

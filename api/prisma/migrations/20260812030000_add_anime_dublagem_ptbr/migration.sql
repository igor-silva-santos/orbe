-- Sinal pré-calculado de "tem dublagem PT-BR", preenchido no sync a partir dos personagens/
-- dubladores já buscados da AniList. Sem isso, toda rota que lista animes sem incluir a
-- relação `characters` inteira (trending, /eventos/resumo, /hoje, os cards dos carrosséis)
-- não tinha como saber se o anime é dublado e caía sempre em "Legendado".
ALTER TABLE "Anime" ADD COLUMN "dublagemPtBr" BOOLEAN NOT NULL DEFAULT false;

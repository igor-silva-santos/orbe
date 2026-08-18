-- Preferências do usuário em promoções e jogos grátis (já tenho / sem interesse / quero alertas)

CREATE TABLE "public"."preferencias_usuario_oferta" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "deal_id" TEXT NOT NULL,
    "steam_app_id" INTEGER,
    "platform" TEXT,
    "title" TEXT,
    "status" TEXT NOT NULL,
    "data_interacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preferencias_usuario_oferta_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "preferencias_usuario_oferta_usuario_id_deal_id_key" ON "public"."preferencias_usuario_oferta"("usuario_id", "deal_id");

CREATE INDEX "preferencias_usuario_oferta_usuario_id_steam_app_id_idx" ON "public"."preferencias_usuario_oferta"("usuario_id", "steam_app_id");

ALTER TABLE "public"."preferencias_usuario_oferta" ADD CONSTRAINT "preferencias_usuario_oferta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

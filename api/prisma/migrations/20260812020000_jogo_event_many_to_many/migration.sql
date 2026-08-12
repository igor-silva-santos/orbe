-- Jogo.eventId era uma FK única: um jogo só podia estar ligado a UM evento, e a sincronização
-- mais recente que passasse por ele sobrescrevia a ligação anterior — causa raiz de jogos
-- aparecendo como "revelados" no evento errado (ex.: um jogo revelado em 2023 na Wholesome
-- Snack aparecendo como revelado no Summer Games Showcase só porque esse evento foi
-- sincronizado depois). Um jogo pode legitimamente aparecer em mais de um evento, então isso
-- vira uma relação muitos-para-muitos.

-- CreateTable (join implícita do Prisma para a relação Event <-> Jogo)
CREATE TABLE "public"."_EventToJogo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- Preserva as associações existentes antes de derrubar a coluna antiga
INSERT INTO "public"."_EventToJogo" ("A", "B")
SELECT "eventId", "id" FROM "public"."Jogo" WHERE "eventId" IS NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_EventToJogo_AB_unique" ON "public"."_EventToJogo"("A", "B");
CREATE INDEX "_EventToJogo_B_index" ON "public"."_EventToJogo"("B");

-- AddForeignKey
ALTER TABLE "public"."_EventToJogo" ADD CONSTRAINT "_EventToJogo_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."_EventToJogo" ADD CONSTRAINT "_EventToJogo_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Jogo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "public"."Jogo" DROP CONSTRAINT "Jogo_eventId_fkey";

-- AlterTable
ALTER TABLE "public"."Jogo" DROP COLUMN "eventId";

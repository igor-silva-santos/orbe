-- Eventos de calendário do usuário (estreias, episódios recorrentes, ingressos de cinema)
CREATE TABLE IF NOT EXISTS "public"."UserCalendarEvent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "midiaId" INTEGER NOT NULL,
    "tipoMidia" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCalendarEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "UserCalendarEvent_userId_idx"
    ON "public"."UserCalendarEvent"("userId");

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'UserCalendarEvent_userId_fkey'
  ) THEN
    ALTER TABLE "public"."UserCalendarEvent"
      ADD CONSTRAINT "UserCalendarEvent_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "public"."User"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

-- Mensagens do formulário de contato (público, sem vínculo de usuário)
CREATE TABLE IF NOT EXISTS "public"."ContactMessage" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- Flags para o robô detetive controlar buscas no ingresso.com
ALTER TABLE "Filme" ADD COLUMN IF NOT EXISTS "ingresso_sem_pagina" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Filme" ADD COLUMN IF NOT EXISTS "prevenda_confirmada" BOOLEAN NOT NULL DEFAULT false;

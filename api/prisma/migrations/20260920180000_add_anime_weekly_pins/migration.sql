-- CreateTable
CREATE TABLE "AnimeWeeklyPin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "anilistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimeWeeklyPin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AnimeWeeklyPin_userId_idx" ON "AnimeWeeklyPin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeWeeklyPin_userId_anilistId_key" ON "AnimeWeeklyPin"("userId", "anilistId");

-- AddForeignKey
ALTER TABLE "AnimeWeeklyPin" ADD CONSTRAINT "AnimeWeeklyPin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

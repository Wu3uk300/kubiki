/*
  Warnings:

  - A unique constraint covering the columns `[userId,squareId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_squareId_key" ON "Purchase"("userId", "squareId");

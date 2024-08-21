/*
  Warnings:

  - A unique constraint covering the columns `[User]` on the table `Counter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Counter_User_key" ON "Counter"("User");

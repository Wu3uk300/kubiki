/*
  Warnings:

  - Added the required column `ownerName` to the `Square` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Square" ADD COLUMN     "ownerName" TEXT NOT NULL;

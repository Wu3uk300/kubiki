/*
  Warnings:

  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_squareId_fkey";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "StripeCustomer";

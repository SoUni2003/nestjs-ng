/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "logoUrl",
ADD COLUMN     "logo_url" TEXT;

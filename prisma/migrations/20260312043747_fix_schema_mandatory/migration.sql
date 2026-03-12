/*
  Warnings:

  - Made the column `categoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- Delete existing products with NULL categoryId
-- Break self-reference first
UPDATE "Product" SET "parentProductId" = NULL WHERE "categoryId" IS NULL;

-- Delete related tables
DELETE FROM "ProductSpecification" WHERE "productId" IN (SELECT "id" FROM "Product" WHERE "categoryId" IS NULL);
DELETE FROM "ApplicationScenario" WHERE "productId" IN (SELECT "id" FROM "Product" WHERE "categoryId" IS NULL);
DELETE FROM "ProductFeature" WHERE "productId" IN (SELECT "id" FROM "Product" WHERE "categoryId" IS NULL);

-- Delete products
DELETE FROM "Product" WHERE "categoryId" IS NULL;

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

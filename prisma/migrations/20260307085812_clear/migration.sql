/*
  Warnings:

  - You are about to drop the column `scenario` on the `ApplicationScenario` table. All the data in the column will be lost.
  - You are about to drop the column `feature` on the `ProductFeature` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `ProductSpecification` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ProductSpecification` table. All the data in the column will be lost.
  - Added the required column `name` to the `ApplicationScenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ProductFeature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ProductSpecification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationScenario" DROP COLUMN "scenario",
ADD COLUMN     "descriptions" JSONB,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductFeature" DROP COLUMN "feature",
ADD COLUMN     "descriptions" JSONB,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductSpecification" DROP COLUMN "key",
DROP COLUMN "value",
ADD COLUMN     "descriptions" JSONB,
ADD COLUMN     "name" TEXT NOT NULL;

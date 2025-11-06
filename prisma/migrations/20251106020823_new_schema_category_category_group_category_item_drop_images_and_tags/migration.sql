/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_styleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Images" DROP CONSTRAINT "Images_stylesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tags" DROP CONSTRAINT "Tags_stylesId_fkey";

-- AlterTable
ALTER TABLE "Styles" ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnail" TEXT;

-- DropTable
DROP TABLE "public"."Category";

-- DropTable
DROP TABLE "public"."Images";

-- DropTable
DROP TABLE "public"."Tags";

-- DropEnum
DROP TYPE "public"."CategoryType";

-- CreateTable
CREATE TABLE "CategoryGroup" (
    "id" SERIAL NOT NULL,
    "styleId" INTEGER NOT NULL,
    "topId" INTEGER,
    "bottomId" INTEGER,
    "outerId" INTEGER,
    "dressId" INTEGER,
    "shoesId" INTEGER,
    "bagId" INTEGER,
    "accessoryId" INTEGER,

    CONSTRAINT "CategoryGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CategoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_styleId_key" ON "CategoryGroup"("styleId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_topId_key" ON "CategoryGroup"("topId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_bottomId_key" ON "CategoryGroup"("bottomId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_outerId_key" ON "CategoryGroup"("outerId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_dressId_key" ON "CategoryGroup"("dressId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_shoesId_key" ON "CategoryGroup"("shoesId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_bagId_key" ON "CategoryGroup"("bagId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryGroup_accessoryId_key" ON "CategoryGroup"("accessoryId");

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Styles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_topId_fkey" FOREIGN KEY ("topId") REFERENCES "CategoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_bottomId_fkey" FOREIGN KEY ("bottomId") REFERENCES "CategoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_outerId_fkey" FOREIGN KEY ("outerId") REFERENCES "CategoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_dressId_fkey" FOREIGN KEY ("dressId") REFERENCES "CategoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_shoesId_fkey" FOREIGN KEY ("shoesId") REFERENCES "CategoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_bagId_fkey" FOREIGN KEY ("bagId") REFERENCES "CategoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_accessoryId_fkey" FOREIGN KEY ("accessoryId") REFERENCES "CategoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

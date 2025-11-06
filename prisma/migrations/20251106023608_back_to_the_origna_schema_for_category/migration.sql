/*
  Warnings:

  - You are about to drop the `CategoryGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('top', 'bottom', 'outer', 'dress', 'shoes', 'bag', 'accessory');

-- DropForeignKey
ALTER TABLE "public"."CategoryGroup" DROP CONSTRAINT "CategoryGroup_accessoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CategoryGroup" DROP CONSTRAINT "CategoryGroup_bagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CategoryGroup" DROP CONSTRAINT "CategoryGroup_bottomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CategoryGroup" DROP CONSTRAINT "CategoryGroup_dressId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CategoryGroup" DROP CONSTRAINT "CategoryGroup_outerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CategoryGroup" DROP CONSTRAINT "CategoryGroup_shoesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CategoryGroup" DROP CONSTRAINT "CategoryGroup_styleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CategoryGroup" DROP CONSTRAINT "CategoryGroup_topId_fkey";

-- DropTable
DROP TABLE "public"."CategoryGroup";

-- DropTable
DROP TABLE "public"."CategoryItem";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "type" "CategoryType" NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "styleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Styles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

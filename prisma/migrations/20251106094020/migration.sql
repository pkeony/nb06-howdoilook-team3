/*
  Warnings:

  - The values [top,bottom,outer,dress,shoes,bag,accessory] on the enum `CategoryType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Styles` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryType_new" AS ENUM ('TOP', 'BOTTOM', 'OUTER', 'DRESS', 'SHOES', 'BAG', 'ACCESSORY');
ALTER TABLE "Category" ALTER COLUMN "type" TYPE "CategoryType_new" USING ("type"::text::"CategoryType_new");
ALTER TYPE "CategoryType" RENAME TO "CategoryType_old";
ALTER TYPE "CategoryType_new" RENAME TO "CategoryType";
DROP TYPE "public"."CategoryType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_styleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Curation" DROP CONSTRAINT "Curation_stylesId_fkey";

-- DropTable
DROP TABLE "public"."Styles";

-- CreateTable
CREATE TABLE "Style" (
    "id" SERIAL NOT NULL,
    "thumbnail" TEXT,
    "nickname" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "viewCount" INTEGER,
    "curationCount" INTEGER,
    "tags" TEXT[],
    "imageUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Style"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curation" ADD CONSTRAINT "Curation_stylesId_fkey" FOREIGN KEY ("stylesId") REFERENCES "Style"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_stylesId_fkey";

-- DropTable
DROP TABLE "public"."Image";

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "isPrimary" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "stylesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_stylesId_fkey" FOREIGN KEY ("stylesId") REFERENCES "Styles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

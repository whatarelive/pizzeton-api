/*
  Warnings:

  - You are about to drop the column `imgPublicId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imgId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "imgId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);
INSERT INTO "new_Product" ("category", "id", "imgUrl", "price", "subtitle", "title") SELECT "category", "id", "imgUrl", "price", "subtitle", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

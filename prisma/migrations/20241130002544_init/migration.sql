/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);
INSERT INTO "new_Product" ("category", "id", "imgUrl", "price", "subtitle", "title") SELECT "category", "id", "imgUrl", "price", "subtitle", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");
CREATE UNIQUE INDEX "Product_price_key" ON "Product"("price");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

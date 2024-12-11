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
    "stock" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL
);
INSERT INTO "new_Product" ("category", "id", "imgId", "imgUrl", "price", "subtitle", "title") SELECT "category", "id", "imgId", "imgUrl", "price", "subtitle", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

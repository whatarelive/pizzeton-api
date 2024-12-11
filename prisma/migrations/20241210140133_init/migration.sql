/*
  Warnings:

  - Added the required column `productId` to the `Prominent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prominent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Prominent_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prominent" ("id") SELECT "id" FROM "Prominent";
DROP TABLE "Prominent";
ALTER TABLE "new_Prominent" RENAME TO "Prominent";
CREATE UNIQUE INDEX "Prominent_id_key" ON "Prominent"("id");
CREATE UNIQUE INDEX "Prominent_productId_key" ON "Prominent"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateTable
CREATE TABLE "Agregations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AgregationsToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AgregationsToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Agregations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AgregationsToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Agregations_id_key" ON "Agregations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Agregations_title_key" ON "Agregations"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_AgregationsToProduct_AB_unique" ON "_AgregationsToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_AgregationsToProduct_B_index" ON "_AgregationsToProduct"("B");

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "imgId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Event" ("active", "id", "imgId", "imgUrl", "subtitle", "title") SELECT "active", "id", "imgId", "imgUrl", "subtitle", "title" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");
CREATE UNIQUE INDEX "Event_title_key" ON "Event"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

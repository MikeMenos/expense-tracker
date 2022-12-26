/*
  Warnings:

  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - Made the column `amount` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiver` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receiver" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME
);
INSERT INTO "new_Transaction" ("amount", "category", "id", "receiver") SELECT "amount", "category", "id", "receiver" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

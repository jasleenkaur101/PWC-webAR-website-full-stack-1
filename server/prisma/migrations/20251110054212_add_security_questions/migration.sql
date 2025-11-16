/*
  Warnings:

  - Added the required column `securityAnswer1Hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `securityAnswer2Hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `securityQuestion1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `securityQuestion2` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "experienceId" TEXT NOT NULL,
    "convaiId" TEXT,
    "rpmAvatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "securityQuestion1" TEXT NOT NULL,
    "securityAnswer1Hash" TEXT NOT NULL,
    "securityQuestion2" TEXT NOT NULL,
    "securityAnswer2Hash" TEXT NOT NULL
);
INSERT INTO "new_User" ("convaiId", "createdAt", "email", "experienceId", "id", "name", "password", "rpmAvatarUrl") SELECT "convaiId", "createdAt", "email", "experienceId", "id", "name", "password", "rpmAvatarUrl" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_experienceId_key" ON "User"("experienceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

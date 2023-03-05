-- CreateTable
CREATE TABLE "Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dice1" TEXT,
    "dice2" TEXT,
    "dice3" TEXT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ennemy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phase" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT,
    "life" TEXT,
    "attack" TEXT,
    "description" TEXT NOT NULL
);

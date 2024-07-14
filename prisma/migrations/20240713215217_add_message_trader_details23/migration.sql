/*
  Warnings:

  - You are about to drop the `SignalTrader` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SignalWhale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SignalTrader";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SignalWhale";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Signalwhale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "alert" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "swapped" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "netWorth" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Signaltrader" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "alert" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "swapped" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "netWorth" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT,
    "birthday" DATETIME,
    "gender" TEXT,
    "avatar" TEXT,
    "address" TEXT
);

-- CreateTable
CREATE TABLE "SignalWhale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
CREATE TABLE "SignalTrader" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
CREATE TABLE "Password" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

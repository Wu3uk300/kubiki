-- CreateTable
CREATE TABLE "Square" (
    "id" SERIAL NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "content" TEXT,
    "public" BOOLEAN NOT NULL,
    "owner" INTEGER,

    CONSTRAINT "Square_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counter" (
    "Id" SERIAL NOT NULL,
    "User" TEXT NOT NULL,
    "Counter" INTEGER NOT NULL,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("Id")
);

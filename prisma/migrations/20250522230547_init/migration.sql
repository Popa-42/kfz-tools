-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userKfzProgress" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "kfzId" UUID NOT NULL,
    "seenCount" INTEGER,
    "lastSeen" TIMESTAMP(3),
    "correctCount" INTEGER,
    "lastCorrect" TIMESTAMP(3),

    CONSTRAINT "userKfzProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kfz" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "derivation" TEXT NOT NULL,
    "derivationMarked" TEXT NOT NULL,
    "stateId" UUID NOT NULL,
    "note" TEXT,

    CONSTRAINT "Kfz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kfzToFootnote" (
    "id" UUID NOT NULL,
    "kfzId" UUID NOT NULL,
    "footnote" INTEGER NOT NULL,

    CONSTRAINT "kfzToFootnote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footnote" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Footnote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" UUID NOT NULL,
    "abbr" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" UUID NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userKfzProgress" ADD CONSTRAINT "userKfzProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userKfzProgress" ADD CONSTRAINT "userKfzProgress_kfzId_fkey" FOREIGN KEY ("kfzId") REFERENCES "Kfz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kfz" ADD CONSTRAINT "Kfz_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kfzToFootnote" ADD CONSTRAINT "kfzToFootnote_kfzId_fkey" FOREIGN KEY ("kfzId") REFERENCES "Kfz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kfzToFootnote" ADD CONSTRAINT "kfzToFootnote_footnote_fkey" FOREIGN KEY ("footnote") REFERENCES "Footnote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_country_fkey" FOREIGN KEY ("country") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

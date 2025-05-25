-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_kfz_progress" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "kfz_id" UUID NOT NULL,
    "seen_count" INTEGER,
    "last_seen" TIMESTAMP(3),
    "correct_count" INTEGER,
    "last_correct" TIMESTAMP(3),

    CONSTRAINT "user_kfz_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kfz" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "derivation" TEXT,
    "derivation_marked" TEXT,
    "state_id" UUID,
    "note" TEXT,

    CONSTRAINT "kfz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kfz_to_footnote" (
    "id" UUID NOT NULL,
    "kfz_id" UUID NOT NULL,
    "footnote" INTEGER NOT NULL,

    CONSTRAINT "kfz_to_footnote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footnote" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "footnote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state" (
    "id" UUID NOT NULL,
    "abbr" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" UUID NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_kfz_progress" ADD CONSTRAINT "user_kfz_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_kfz_progress" ADD CONSTRAINT "user_kfz_progress_kfz_id_fkey" FOREIGN KEY ("kfz_id") REFERENCES "kfz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kfz" ADD CONSTRAINT "kfz_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kfz_to_footnote" ADD CONSTRAINT "kfz_to_footnote_kfz_id_fkey" FOREIGN KEY ("kfz_id") REFERENCES "kfz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kfz_to_footnote" ADD CONSTRAINT "kfz_to_footnote_footnote_fkey" FOREIGN KEY ("footnote") REFERENCES "footnote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_country_fkey" FOREIGN KEY ("country") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

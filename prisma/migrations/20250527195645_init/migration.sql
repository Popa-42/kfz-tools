/*
  Warnings:

  - The primary key for the `state` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "kfz" DROP CONSTRAINT "kfz_state_id_fkey";

-- AlterTable
ALTER TABLE "kfz" ALTER COLUMN "state_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "state" DROP CONSTRAINT "state_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "state_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "kfz" ADD CONSTRAINT "kfz_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE SET NULL ON UPDATE CASCADE;

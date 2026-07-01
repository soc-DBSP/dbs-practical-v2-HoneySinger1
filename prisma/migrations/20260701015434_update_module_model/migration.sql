/*
  Warnings:

  - The primary key for the `module` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `mod_code` on the `module` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - Added the required column `credit_unit` to the `module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "module" DROP CONSTRAINT "module_pkey",
ADD COLUMN     "credit_unit" INTEGER NOT NULL,
ADD COLUMN     "mod_coord" CHAR(4),
ALTER COLUMN "mod_code" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "module_pkey" PRIMARY KEY ("mod_code");

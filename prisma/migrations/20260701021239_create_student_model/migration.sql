/*
  Warnings:

  - Made the column `mobile_phone` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `home_phone` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "student" ALTER COLUMN "mobile_phone" SET NOT NULL,
ALTER COLUMN "home_phone" SET NOT NULL;

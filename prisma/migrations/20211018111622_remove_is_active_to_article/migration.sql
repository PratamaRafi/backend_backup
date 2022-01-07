/*
  Warnings:

  - You are about to drop the column `is_active` on the `Articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Articles` DROP COLUMN `is_active`;

-- AlterTable
ALTER TABLE `UserPets` ALTER COLUMN `updated_at` DROP DEFAULT;

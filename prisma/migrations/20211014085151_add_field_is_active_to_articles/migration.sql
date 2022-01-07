-- AlterTable
ALTER TABLE `Articles` ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `UserPets` ALTER COLUMN `updated_at` DROP DEFAULT;

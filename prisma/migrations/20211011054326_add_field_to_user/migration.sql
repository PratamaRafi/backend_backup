-- AlterTable
ALTER TABLE `User` ADD COLUMN `deleted_at` DATETIME(3),
    ADD COLUMN `is_active` BOOLEAN DEFAULT true,
    ADD COLUMN `updated_at` DATETIME(3);

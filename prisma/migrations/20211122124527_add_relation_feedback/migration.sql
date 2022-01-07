/*
  Warnings:

  - Added the required column `vendor_id` to the `Feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Feedbacks` ADD COLUMN `vendor_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserPets` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Feedbacks` ADD FOREIGN KEY (`vendor_id`) REFERENCES `Vendors`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

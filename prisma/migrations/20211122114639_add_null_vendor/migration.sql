/*
  Warnings:

  - You are about to drop the column `user_detail_pet_id` on the `Consultations` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `User_Address` table. All the data in the column will be lost.
  - You are about to drop the column `alias` on the `User_Address` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `User_Address` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `User_Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Consultations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `UserPets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `VaccineHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `VaccineHistoryPhoto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pet_id` to the `Consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `User_Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User_Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccine_photo` to the `VaccineHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veterinary` to the `VaccineHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserPets` DROP FOREIGN KEY `UserPets_ibfk_1`;

-- DropForeignKey
ALTER TABLE `User_Address` DROP FOREIGN KEY `User_Address_ibfk_2`;

-- AlterTable
ALTER TABLE `Consultations` DROP COLUMN `user_detail_pet_id`,
    ADD COLUMN `pet_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `uid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserPets` ALTER COLUMN `updated_at` DROP DEFAULT,
    MODIFY `UserId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User_Address` DROP COLUMN `UserId`,
    DROP COLUMN `alias`,
    DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `province_id` INTEGER,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `VaccineHistory` ADD COLUMN `vaccine_photo` VARCHAR(191) NOT NULL,
    ADD COLUMN `veterinary` VARCHAR(191) NOT NULL,
    MODIFY `pet_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vendors` MODIFY `total_patient` INTEGER,
    MODIFY `rating` DOUBLE;

-- CreateIndex
CREATE UNIQUE INDEX `Consultations.uid_unique` ON `Consultations`(`uid`);

-- CreateIndex
CREATE UNIQUE INDEX `UserPets.uid_unique` ON `UserPets`(`uid`);

-- CreateIndex
CREATE UNIQUE INDEX `VaccineHistory.uid_unique` ON `VaccineHistory`(`uid`);

-- CreateIndex
CREATE UNIQUE INDEX `VaccineHistoryPhoto.uid_unique` ON `VaccineHistoryPhoto`(`uid`);

-- AddForeignKey
ALTER TABLE `UserPets` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Address` ADD FOREIGN KEY (`province_id`) REFERENCES `Province`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Address` ADD FOREIGN KEY (`user_id`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VaccineHistory` ADD FOREIGN KEY (`pet_id`) REFERENCES `UserPets`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultations` ADD FOREIGN KEY (`user_id`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultations` ADD FOREIGN KEY (`pet_id`) REFERENCES `UserPets`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `UserPetsId` on the `VaccineType` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `VaccineType` table. All the data in the column will be lost.
  - You are about to drop the `UserAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedbacks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alumni` to the `Vendors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `Vendors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `google_maps_url` to the `Vendors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `Vendors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `str_issued_date` to the `Vendors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `str_number` to the `Vendors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserAddress` DROP FOREIGN KEY `UserAddress_ibfk_2`;

-- DropForeignKey
ALTER TABLE `UserAddress` DROP FOREIGN KEY `UserAddress_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UserBank` DROP FOREIGN KEY `UserBank_ibfk_1`;

-- DropForeignKey
ALTER TABLE `VaccineType` DROP FOREIGN KEY `VaccineType_ibfk_1`;

-- AlterTable
ALTER TABLE `UserPets` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `VaccineType` DROP COLUMN `UserPetsId`,
    DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `Vendors` ADD COLUMN `alumni` VARCHAR(191) NOT NULL,
    ADD COLUMN `birthdate` VARCHAR(191) NOT NULL,
    ADD COLUMN `google_maps_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `province_id` INTEGER NOT NULL,
    ADD COLUMN `str_issued_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `str_number` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `UserAddress`;

-- DropTable
DROP TABLE `UserBank`;

-- DropTable
DROP TABLE `feedbacks`;

-- CreateTable
CREATE TABLE `User_Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `is_default` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3),
    `city_id` INTEGER,
    `UserId` INTEGER NOT NULL,

    UNIQUE INDEX `User_Address.uid_unique`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `bank_username` VARCHAR(191) NOT NULL,
    `is_default` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3),
    `UserId` INTEGER NOT NULL,

    UNIQUE INDEX `User_Bank.uid_unique`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedbacks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Address` ADD FOREIGN KEY (`city_id`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Address` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Bank` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

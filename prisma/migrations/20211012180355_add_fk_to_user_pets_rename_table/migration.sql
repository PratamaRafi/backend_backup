/*
  Warnings:

  - You are about to drop the `User_Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Bank` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `UserId` to the `UserPets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User_Address` DROP FOREIGN KEY `User_Address_ibfk_2`;

-- DropForeignKey
ALTER TABLE `User_Address` DROP FOREIGN KEY `User_Address_ibfk_1`;

-- DropForeignKey
ALTER TABLE `User_Bank` DROP FOREIGN KEY `User_Bank_ibfk_1`;

-- AlterTable
ALTER TABLE `UserPets` ADD COLUMN `UserId` INTEGER NOT NULL,
    MODIFY `updated_at` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `User_Address`;

-- DropTable
DROP TABLE `User_Bank`;

-- CreateTable
CREATE TABLE `UserAddress` (
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

    UNIQUE INDEX `UserAddress.uid_unique`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBank` (
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

    UNIQUE INDEX `UserBank.uid_unique`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPets` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD FOREIGN KEY (`city_id`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBank` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

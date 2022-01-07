/*
  Warnings:

  - Added the required column `UserPetsId` to the `VaccineType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VaccineType` ADD COLUMN `UserPetsId` INTEGER NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3);

-- CreateTable
CREATE TABLE `UserPets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191),
    `breed` VARCHAR(191),
    `date_of_birth` DATETIME(3),
    `color` VARCHAR(191),
    `profile_picture_url` VARCHAR(191),
    `gender` ENUM('Male', 'Female'),
    `is_neutered` BOOLEAN,
    `is_dog_friendly` BOOLEAN,
    `is_cat_friendly` BOOLEAN,
    `is_under_10_child_friendly` BOOLEAN,
    `is_over_10_child_friendly` BOOLEAN,
    `is_microchipped` BOOLEAN,
    `is_purebred` BOOLEAN,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VaccineType` ADD FOREIGN KEY (`UserPetsId`) REFERENCES `UserPets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

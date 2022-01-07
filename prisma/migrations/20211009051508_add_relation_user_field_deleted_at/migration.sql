/*
  Warnings:

  - Added the required column `UserId` to the `User_Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `User_Bank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User_Address` ADD COLUMN `UserId` INTEGER NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3);

-- AlterTable
ALTER TABLE `User_Bank` ADD COLUMN `UserId` INTEGER NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3);

-- AddForeignKey
ALTER TABLE `User_Address` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Bank` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `VendorsId` to the `Vendor_Documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VendorsId` to the `Vendor_Medtreats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vendor_Documents` ADD COLUMN `VendorsId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Vendor_Medtreats` ADD COLUMN `VendorsId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Vendor_Documents` ADD FOREIGN KEY (`VendorsId`) REFERENCES `Vendors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor_Medtreats` ADD FOREIGN KEY (`VendorsId`) REFERENCES `Vendors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

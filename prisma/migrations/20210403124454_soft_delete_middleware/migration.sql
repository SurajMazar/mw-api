-- AlterTable
ALTER TABLE `genre` ADD COLUMN     `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `role` ADD COLUMN     `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` ADD COLUMN     `deleted` BOOLEAN NOT NULL DEFAULT false;

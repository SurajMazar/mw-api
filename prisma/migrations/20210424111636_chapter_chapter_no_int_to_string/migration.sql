-- AlterTable
ALTER TABLE `chapter` MODIFY `chapter_no` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `manga` MODIFY `excerpt` MEDIUMTEXT,
    MODIFY `description` LONGTEXT;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `Role.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191),
    `address` VARCHAR(191),
    `userImage` VARCHAR(191),
    `roleId` INTEGER NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` LONGTEXT,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `Genre.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapter_no` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `pages` LONGTEXT,
    `published` BOOLEAN NOT NULL,
    `publish_date` DATETIME(3) NOT NULL,
    `free` BOOLEAN NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `mangaId` INTEGER NOT NULL,
    `meta_title` VARCHAR(191),
    `meta_description` MEDIUMTEXT,
    `meta_keywords` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `Chapter.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumbnail` VARCHAR(191),
    `cover_picture` VARCHAR(191),
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` MEDIUMTEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL,
    `publish_date` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `meta_title` VARCHAR(191),
    `meta_description` VARCHAR(191),
    `meta_keywords` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
UNIQUE INDEX `Manga.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MangaToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
UNIQUE INDEX `_MangaToUser_AB_unique`(`A`, `B`),
INDEX `_MangaToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD FOREIGN KEY (`mangaId`) REFERENCES `Manga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MangaToUser` ADD FOREIGN KEY (`A`) REFERENCES `Manga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MangaToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `_GenreToManga` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
UNIQUE INDEX `_GenreToManga_AB_unique`(`A`, `B`),
INDEX `_GenreToManga_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GenreToManga` ADD FOREIGN KEY (`A`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToManga` ADD FOREIGN KEY (`B`) REFERENCES `Manga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

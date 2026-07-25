CREATE TABLE `web_texts` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `text_key` VARCHAR(191) NOT NULL,
  `title_sinhala` VARCHAR(191) NOT NULL,
  `title_english` VARCHAR(191) NOT NULL,
  `description_sinhala` TEXT NOT NULL,
  `description_english` TEXT NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `web_texts_text_key_key`(`text_key`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `web_images` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `image_key` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `image_url` VARCHAR(191) NOT NULL,
  `sort_order` INTEGER NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  INDEX `web_images_image_key_idx`(`image_key`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


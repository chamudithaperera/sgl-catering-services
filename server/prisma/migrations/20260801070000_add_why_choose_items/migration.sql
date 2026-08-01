CREATE TABLE `why_choose_items` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `title_sinhala` VARCHAR(191) NOT NULL,
  `title_english` VARCHAR(191) NOT NULL,
  `sort_order` INTEGER NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `why_choose_items` (`title_sinhala`, `title_english`, `sort_order`, `created_at`, `updated_at`) VALUES
  ('වසර 40කට වැඩි පළපුරුද්ද', 'Over 40 Years of Experience', 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('සාම්ප්‍රදායික ශ්‍රී ලාංකීය රස', 'Authentic Traditional Sri Lankan Recipes', 2, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('නැවුම් හා ගුණාත්මක අමුද්‍රව්‍ය', 'Fresh & High-Quality Ingredients', 3, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('වෘත්තීය හා මිත්‍රශීලී සේවාව', 'Professional and Friendly Service', 4, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('සාධාරණ මිල ගණන්', 'Affordable Prices', 5, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('සෞඛ්‍යාරක්ෂිත ආහාර සැකසීම', 'Hygienic Food Preparation', 6, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

UPDATE `web_texts`
SET
  `description_sinhala` = 'ඔබේ විශේෂ අවස්ථාව සඳහා රසවත් ආහාර, පිරිසිදු සැකසීම සහ විශ්වාසදායක සේවාව එකට ලබා දෙන අපගේ ප්‍රධාන හේතු මෙන්න.',
  `description_english` = 'SGL Catering Service brings careful preparation, warm service, and trusted Sri Lankan flavour to every event.'
WHERE `text_key` = 'whyChooseUs';

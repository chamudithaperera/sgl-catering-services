UPDATE `web_texts`
SET
  `title_sinhala` = '',
  `title_english` = '',
  `description_sinhala` = 'වසර 40කට වැඩි කාලයක් පුරා අප සාම්ප්‍රදායික ශ්‍රී ලාංකීය රසයෙන් යුත් ගුණාත්මක ආහාර සැපයුම් සේවාවක් ලබා දී ඇත. නැවුම් අමුද්‍රව්‍ය, පාරම්පරික වට්ටෝරු සමග සකස් කරන සෑම ආහාරයක්ම ඔබගේ විශේෂ අවස්ථාව අමතක නොවන මතකයක් බවට පත් කරයි',
  `description_english` = 'For more than 40 years, we have proudly provided high-quality catering services with authentic Sri Lankan flavors. Every meal is prepared with fresh ingredients, traditional recipes, and genuine care, making every celebration special and memorable.',
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `text_key` = 'about';

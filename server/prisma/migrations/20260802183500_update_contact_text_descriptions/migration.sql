INSERT INTO `web_texts` (
  `text_key`,
  `title_sinhala`,
  `title_english`,
  `description_sinhala`,
  `description_english`,
  `created_at`,
  `updated_at`
) VALUES (
  'contact',
  'අප අමතන්න',
  'Reach out to SGL',
  'ඔබගේ විශේෂ අවස්ථාව සාර්ථක කර ගැනීමට අපි සැමවිටම සූදානම්. ආහාර සැපයුම් සේවා, උත්සව උපකරණ කුලියට ගැනීම, මිල ගණන් විමසීම හෝ වෙන්කරවා ගැනීම සඳහා අදම අප හා සම්බන්ධ වන්න. ඔබට සහාය වීමට අපගේ මිත්‍රශීලී කණ්ඩායම සැමවිටම සූදානමින් සිටී.
ඔබගේ මීළඟ උත්සවයේ විශ්වාසදායක සහකරු වීමට අපි සතුටින් බලාපොරොත්තු වෙමු!',
  'We''re here to help make your special occasion a success. Contact us to discuss your catering or rental requirements, request a quotation, or make a booking. Our friendly team is always ready to assist you.
Get in touch today—we''d love to be part of your next celebration!',
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
) ON DUPLICATE KEY UPDATE
  `description_sinhala` = VALUES(`description_sinhala`),
  `description_english` = VALUES(`description_english`),
  `updated_at` = CURRENT_TIMESTAMP(3);

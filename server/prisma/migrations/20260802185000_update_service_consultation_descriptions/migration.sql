INSERT INTO `web_texts` (
  `text_key`,
  `title_sinhala`,
  `title_english`,
  `description_sinhala`,
  `description_english`,
  `created_at`,
  `updated_at`
) VALUES (
  'cateringPageConsultation',
  'වෙන්කරවා ගැනීමට අප අමතන්න',
  'Booking Support',
  'අපගේ ආහාර සැපයුම් සේවාව පිළිබඳ ඔබ උනන්දුවක් දක්වන්නේද? ඔබගේ උත්සවය සඳහා අවශ්‍ය මෙනුව සාකච්ඡා කර ඇණවුම් කිරීමට අදම අප හා සම්බන්ධ වන්න. ඔබගේ විශේෂ දිනය සාර්ථක කර ගැනීමට අපි සූදානම්.',
  'Interested in our catering services? Contact us today to discuss your event, customize your menu, and place your order. We''re happy to help make your special occasion unforgettable.',
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
) ON DUPLICATE KEY UPDATE
  `description_sinhala` = VALUES(`description_sinhala`),
  `description_english` = VALUES(`description_english`),
  `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `web_texts` (
  `text_key`,
  `title_sinhala`,
  `title_english`,
  `description_sinhala`,
  `description_english`,
  `created_at`,
  `updated_at`
) VALUES (
  'rentingPageConsultation',
  'කුලියට ගැනීමට පෙර විස්තර දැනගන්න',
  'Rental Support',
  'ඔබගේ උත්සවය සඳහා කුලී උපකරණ අවශ්‍යද? ලබා ගත හැකි උපකරණ පිළිබඳ විමසීමට, ඔබගේ අවශ්‍යතා සාකච්ඡා කිරීමට සහ වෙන්කරවා ගැනීමට අදම අප හා සම්බන්ධ වන්න. අපි ඔබට සහාය වීමට සූදානම්.',
  'Need rental items for your event? Contact us today to check availability, discuss your requirements, and make your reservation. We''re here to help.',
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
) ON DUPLICATE KEY UPDATE
  `description_sinhala` = VALUES(`description_sinhala`),
  `description_english` = VALUES(`description_english`),
  `updated_at` = CURRENT_TIMESTAMP(3);

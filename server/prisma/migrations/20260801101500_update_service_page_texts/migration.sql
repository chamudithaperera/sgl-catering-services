UPDATE `web_texts`
SET
  `description_sinhala` = 'නැවුම් අමුද්‍රව්‍ය සහ සාම්ප්‍රදායික වට්ටෝරු භාවිතයෙන් සකස් කරන රසවත් ශ්‍රී ලාංකීය ආහාර සමඟ ඔබගේ උත්සවය තවත් සුවිශේෂී කරගන්න. කුඩා හමුවීම්වල සිට විශාල උත්සව දක්වා සියලුම අවස්ථා සඳහා විශ්වාසදායක ආහාර සැපයුම් සේවාවක් අපෙන්.',
  `description_english` = 'Delight your guests with authentic Sri Lankan cuisine, freshly prepared using quality ingredients. From intimate gatherings to grand celebrations, we provide delicious food and reliable catering services for every occasion.',
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `text_key` = 'cateringPageHero';

UPDATE `web_texts`
SET
  `description_sinhala` = 'ඔබගේ උත්සවය පිළිබඳ අප සමඟ සාකච්ඡා කර ඔබට අවශ්‍ය පරිදි මෙනුව සකස් කර ගන්න. ඔබට තෝරාගත හැකි ආරම්භක මිල ගණන් පහතින් දැක්වේ.',
  `description_english` = 'Discuss your event with us, and we''ll help you create a menu that matches your taste, budget, and preferences. Our starting prices are listed below.',
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `text_key` = 'cateringPageOverview';

UPDATE `web_texts`
SET
  `description_sinhala` = 'ඔබගේ උත්සවය සම්පූර්ණ කිරීමට අවශ්‍ය මේස, පුටු, කූඩාරම්, භාජන සහ අනෙකුත් උත්සව උපකරණ අපෙන් කුලියට ලබා ගන්න. ඔබගේ විශේෂ අවස්ථාව අලංකාරවත්, පහසු සහ සාර්ථක කර ගැනීමට අවශ්‍ය සියල්ල එකම ස්ථානයකින්.',
  `description_english` = 'Complete your event with our high-quality rental items, including tables, chairs, tents, tableware, and more. We provide everything you need to make your special occasion comfortable, elegant, and well-organised.',
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `text_key` = 'rentingPageHero';

UPDATE `web_texts`
SET
  `description_sinhala` = 'ඔබගේ අවශ්‍යතා අප සමඟ සාකච්ඡා කර ඔබගේ උත්සවයට වඩාත් ගැළපෙන උපකරණ තෝරාගන්න. අපගේ ආරම්භක කුලී මිල ගණන් පහතින් දැක්වේ.',
  `description_english` = 'Discuss your event requirements with us, and we''ll help you choose the rental items that best suit your occasion. Our starting rental prices are listed below.',
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `text_key` = 'rentingPageOverview';

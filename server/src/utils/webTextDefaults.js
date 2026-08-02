const webTextKeys = [
  "hero",
  "about",
  "services",
  "serviceCatering",
  "serviceRental",
  "cateringPageHero",
  "cateringPageOverview",
  "cateringPageConsultation",
  "rentingPageHero",
  "rentingPageOverview",
  "rentingPageConsultation",
  "gallery",
  "whyChooseUs",
  "reviews",
  "contact",
];

const webTextDefaults = Object.fromEntries(
  webTextKeys.map((textKey) => [
    textKey,
    {
      textKey,
      titleSinhala: "",
      titleEnglish: "",
      descriptionSinhala: "",
      descriptionEnglish: "",
    },
  ]),
);

Object.assign(webTextDefaults, {
  about: {
    textKey: "about",
    titleSinhala: "",
    titleEnglish: "",
    descriptionSinhala:
      "වසර 40කට වැඩි කාලයක් පුරා අප සාම්ප්‍රදායික ශ්‍රී ලාංකීය රසයෙන් යුත් ගුණාත්මක ආහාර සැපයුම් සේවාවක් ලබා දී ඇත. නැවුම් අමුද්‍රව්‍ය, පාරම්පරික වට්ටෝරු සමග සකස් කරන සෑම ආහාරයක්ම ඔබගේ විශේෂ අවස්ථාව අමතක නොවන මතකයක් බවට පත් කරයි",
    descriptionEnglish:
      "For more than 40 years, we have proudly provided high-quality catering services with authentic Sri Lankan flavors. Every meal is prepared with fresh ingredients, traditional recipes, and genuine care, making every celebration special and memorable.",
  },
  cateringPageHero: {
    textKey: "cateringPageHero",
    titleSinhala: "ආහාර පාන සැපයීම",
    titleEnglish: "Catering Service",
    descriptionSinhala:
      "නැවුම් අමුද්‍රව්‍ය සහ සාම්ප්‍රදායික වට්ටෝරු භාවිතයෙන් සකස් කරන රසවත් ශ්‍රී ලාංකීය ආහාර සමඟ ඔබගේ උත්සවය තවත් සුවිශේෂී කරගන්න. කුඩා හමුවීම්වල සිට විශාල උත්සව දක්වා සියලුම අවස්ථා සඳහා විශ්වාසදායක ආහාර සැපයුම් සේවාවක් අපෙන්.",
    descriptionEnglish:
      "Delight your guests with authentic Sri Lankan cuisine, freshly prepared using quality ingredients. From intimate gatherings to grand celebrations, we provide delicious food and reliable catering services for every occasion.",
  },
  cateringPageOverview: {
    textKey: "cateringPageOverview",
    titleSinhala: "ඔබේ අවස්ථාවට ගැළපෙන මෙනු",
    titleEnglish: "Menu Selection",
    descriptionSinhala:
      "ඔබගේ උත්සවය පිළිබඳ අප සමඟ සාකච්ඡා කර ඔබට අවශ්‍ය පරිදි මෙනුව සකස් කර ගන්න. ඔබට තෝරාගත හැකි ආරම්භක මිල ගණන් පහතින් දැක්වේ.",
    descriptionEnglish:
      "Discuss your event with us, and we'll help you create a menu that matches your taste, budget, and preferences. Our starting prices are listed below.",
  },
  cateringPageConsultation: {
    textKey: "cateringPageConsultation",
    titleSinhala: "වෙන්කරවා ගැනීමට අප අමතන්න",
    titleEnglish: "Booking Support",
    descriptionSinhala:
      "ඔබේ උත්සව දිනය, අමුත්තන් ගණන සහ අවශ්‍ය මෙනුව අපට දන්වන්න. සුදුසු ආහාර ප්‍රමාණය, සේවා සැලැස්ම සහ මිල ගණන් පිළිබඳව අපි ඔබට පැහැදිලි උපදෙස් ලබා දෙන්නෙමු.",
    descriptionEnglish: "",
  },
  rentingPageHero: {
    textKey: "rentingPageHero",
    titleSinhala: "උත්සව උපකරණ කුලියට",
    titleEnglish: "Rental Service",
    descriptionSinhala:
      "ඔබගේ උත්සවය සම්පූර්ණ කිරීමට අවශ්‍ය මේස, පුටු, කූඩාරම්, භාජන සහ අනෙකුත් උත්සව උපකරණ අපෙන් කුලියට ලබා ගන්න. ඔබගේ විශේෂ අවස්ථාව අලංකාරවත්, පහසු සහ සාර්ථක කර ගැනීමට අවශ්‍ය සියල්ල එකම ස්ථානයකින්.",
    descriptionEnglish:
      "Complete your event with our high-quality rental items, including tables, chairs, tents, tableware, and more. We provide everything you need to make your special occasion comfortable, elegant, and well-organised.",
  },
  rentingPageOverview: {
    textKey: "rentingPageOverview",
    titleSinhala: "කුලියට ලබා ගත හැකි උපකරණ",
    titleEnglish: "Rental Items",
    descriptionSinhala:
      "ඔබගේ අවශ්‍යතා අප සමඟ සාකච්ඡා කර ඔබගේ උත්සවයට වඩාත් ගැළපෙන උපකරණ තෝරාගන්න. අපගේ ආරම්භක කුලී මිල ගණන් පහතින් දැක්වේ.",
    descriptionEnglish:
      "Discuss your event requirements with us, and we'll help you choose the rental items that best suit your occasion. Our starting rental prices are listed below.",
  },
  rentingPageConsultation: {
    textKey: "rentingPageConsultation",
    titleSinhala: "කුලියට ගැනීමට පෙර විස්තර දැනගන්න",
    titleEnglish: "Rental Support",
    descriptionSinhala:
      "ඔබට අවශ්‍ය උපකරණ, ප්‍රමාණය සහ උත්සව දිනය අපට දන්වන්න. ලබා ගැනීමේ හැකියාව, ගාස්තු සහ භාරදීමේ විස්තර පිළිබඳව අපි ඉක්මනින් මගපෙන්වන්නෙමු.",
    descriptionEnglish: "",
  },
  reviews: {
    textKey: "reviews",
    titleSinhala: "ඔබගේ අත්දැකීම අප සමඟ බෙදාගන්න",
    titleEnglish: "Customer Reviews",
    descriptionSinhala:
      "ඔබගේ උත්සවය ගැන කෙටි අදහසක් එක් කරන්න. අපගේ කණ්ඩායම එය සමාලෝචනය කර අනුමත කිරීමෙන් පසු වෙබ් අඩවියේ පෙන්වනු ලැබේ.",
    descriptionEnglish:
      "Share a short review about your event. After our team reviews and approves it, your feedback will be shown on the website.",
  },
  whyChooseUs: {
    textKey: "whyChooseUs",
    titleSinhala: "අප තෝරාගත යුත්තේ ඇයි",
    titleEnglish: "Why Choose us",
    descriptionSinhala:
      "ඔබේ විශේෂ අවස්ථාව සඳහා රසවත් ආහාර, පිරිසිදු සැකසීම සහ විශ්වාසදායක සේවාව එකට ලබා දෙන අපගේ ප්‍රධාන හේතු මෙන්න.",
    descriptionEnglish:
      "SGL Catering Service brings careful preparation, warm service, and trusted Sri Lankan flavour to every event.",
  },
  contact: {
    textKey: "contact",
    titleSinhala: "අප අමතන්න",
    titleEnglish: "Reach out to SGL",
    descriptionSinhala:
      "ඔබගේ විශේෂ අවස්ථාව සාර්ථක කර ගැනීමට අපි සැමවිටම සූදානම්. ආහාර සැපයුම් සේවා, උත්සව උපකරණ කුලියට ගැනීම, මිල ගණන් විමසීම හෝ වෙන්කරවා ගැනීම සඳහා අදම අප හා සම්බන්ධ වන්න. ඔබට සහාය වීමට අපගේ මිත්‍රශීලී කණ්ඩායම සැමවිටම සූදානමින් සිටී.\nඔබගේ මීළඟ උත්සවයේ විශ්වාසදායක සහකරු වීමට අපි සතුටින් බලාපොරොත්තු වෙමු!",
    descriptionEnglish:
      "We're here to help make your special occasion a success. Contact us to discuss your catering or rental requirements, request a quotation, or make a booking. Our friendly team is always ready to assist you.\nGet in touch today—we'd love to be part of your next celebration!",
  },
});

function buildWebTextFallback(textKey) {
  return webTextDefaults[textKey] || null;
}

function mergeWebTextFallback(textKey, item) {
  const fallback = buildWebTextFallback(textKey);

  if (!fallback) return item || null;
  if (!item) return fallback;

  return {
    ...item,
    titleSinhala: item.titleSinhala || fallback.titleSinhala,
    titleEnglish: item.titleEnglish || fallback.titleEnglish,
    descriptionSinhala: item.descriptionSinhala || fallback.descriptionSinhala,
    descriptionEnglish: item.descriptionEnglish || fallback.descriptionEnglish,
  };
}

module.exports = {
  webTextDefaults,
  buildWebTextFallback,
  mergeWebTextFallback,
};

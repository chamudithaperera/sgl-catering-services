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
      "අනුරාධපුරයේ විශ්වාසදායක SGL Catering Service වෙතින් විවාහ මංගල්‍ය, පවුල් උත්සව, දානමය වැඩසටහන් සහ ආයතනික අවස්ථා සඳහා රසවත් ශ්‍රී ලාංකීය ආහාර සහ වෘත්තීය සේවාවක් ලබා ගන්න.",
    descriptionEnglish: "Professional catering for every special occasion",
  },
  cateringPageOverview: {
    textKey: "cateringPageOverview",
    titleSinhala: "ඔබේ අවස්ථාවට ගැළපෙන මෙනු",
    titleEnglish: "Menu Selection",
    descriptionSinhala:
      "පහත මෙනු අතරින් ඔබේ උත්සවයට ගැළපෙන ආහාර පැකේජය තෝරාගන්න. අමුත්තන් ගණන, අවස්ථාවේ ස්වභාවය සහ ඔබේ රුචිය අනුව මෙනුව සකස් කිරීමට අපි සූදානම්.",
    descriptionEnglish: "",
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
      "විවාහ, උත්සව, දානමය වැඩසටහන් සහ පවුල් හමුවීම් සඳහා අවශ්‍ය මේස, පුටු, බඳුන් සහ අනෙකුත් උත්සව උපකරණ විශ්වාසයෙන් කුලියට ලබා ගන්න.",
    descriptionEnglish: "Reliable event equipment rental in Anuradhapura",
  },
  rentingPageOverview: {
    textKey: "rentingPageOverview",
    titleSinhala: "කුලියට ලබා ගත හැකි උපකරණ",
    titleEnglish: "Rental Items",
    descriptionSinhala:
      "ඔබේ උත්සවය සරලව සැලසුම් කරගැනීමට අවශ්‍ය ප්‍රධාන උපකරණ මෙතැනින් බලන්න. අවශ්‍ය ප්‍රමාණය සහ දිනය අනුව ලබා ගැනීමේ හැකියාව තහවුරු කර දෙන්නෙමු.",
    descriptionEnglish: "",
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

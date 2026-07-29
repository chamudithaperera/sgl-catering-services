const webTextDefaults = {
  hero: {
    textKey: "hero",
    titleSinhala: "SGL කේටරින් සර්විස්",
    titleEnglish: "SGL Catering Service",
    descriptionSinhala:
      "විවාහ උත්සව, ආයතනික හමුවීම් සහ පවුල් සැමරුම් සඳහා රසය, පිළිවෙළ සහ වෘත්තීයභාවය එක් කරන සුවිශේෂී කේටරින් අත්දැකීමක් අපි ඔබ වෙනුවෙන් සකස් කරමු.",
    descriptionEnglish:
      "Looking for a catering service in Anuradhapura? SGL Catering Service offers catering services in Anuradhapura for weddings, home functions, almsgivings, birthdays, office events, and special celebrations.",
  },
  about: {
    textKey: "about",
    titleSinhala: "SGL කේටරින් සර්විස් යනු:",
    titleEnglish: "Catering Services in Anuradhapura",
    descriptionSinhala:
      "වසර ගණනාවක් පුරා අනුරාධපුරය සහ අවට ප්‍රදේශවල පාරිභෝගික විශ්වාසය දිනාගත්, සෞඛ්‍යාරක්ෂිත හා ප්‍රණීත ආහාර සේවාවක් සපයන කේටරින් සේවාවකි. මංගල උත්සව, නිවසේ උත්සව, දාන පිංකම් සහ අනෙකුත් සියලුම විශේෂ අවස්ථා සඳහා රසවත් ආහාර සපයන අතර, උත්සව සඳහා අවශ්‍ය විවිධ භාණ්ඩද කුලියට ලබාදීමට අප සූදානම්.",
    descriptionEnglish:
      "SGL Catering Service provides catering services in Anuradhapura for Wedding catering in Anuradhapura, Birthday and home function catering, Almsgiving and family event food service, and Office event and buffet catering. If you need a catering service in Anuradhapura, our team can help plan the menu, food quantities, serving style, and event rental items.",
  },
  services: {
    textKey: "services",
    titleSinhala: "අපගේ සේවාවන්",
    titleEnglish: "Professional Event Solutions",
    descriptionSinhala:
      "ඔබගේ උත්සව අවශ්‍යතාවයට ගැළපෙන පරිදි ආහාර සේවාවන් සහ උත්සව භාණ්ඩ සැපයුම් එක්ම විශ්වාසනීය ස්ථානයකින් ලබාදීමට අපි සූදානම්.",
    descriptionEnglish: "",
  },
  serviceCatering: {
    textKey: "serviceCatering",
    titleSinhala: "ආහාර පාන සැපයීම",
    titleEnglish: "Signature Catering",
    descriptionSinhala:
      "මංගල උත්සව, ආයතනික හමුවීම්, දාන පිංකම් සහ පවුල් සැමරුම් සඳහා ඔබේ අවස්ථාවට ගැළපෙන ලෙස රසවත්, සෞඛ්‍යාරක්ෂිත සහ වෘත්තීයමය ආහාර සැපයීමක් අපි සකස් කරමු.",
    descriptionEnglish: "",
  },
  serviceRental: {
    textKey: "serviceRental",
    titleSinhala: "උත්සව භාණ්ඩ සැපයීම",
    titleEnglish: "Event Rentals",
    descriptionSinhala:
      "බෆේ උපකරණ, සේවනාංග, මේස සැකසුම් සහ උත්සව අවශ්‍යතා සඳහා භාවිතා වන විවිධ භාණ්ඩ විශ්වාසයෙන් කුලියට ලබාදී ඔබේ උත්සවය වඩාත් සම්පූර්ණව සංවිධානය කිරීමට අපි සහාය වෙමු.",
    descriptionEnglish: "",
  },
  gallery: {
    textKey: "gallery",
    titleSinhala: "ඡායාරූප",
    titleEnglish: "Curated Event Moments",
    descriptionSinhala:
      "අප විසින් සකස් කළ උත්සව භෝජන සැකසුම්, රසවත් ආහාර තේරීම් සහ අලංකාර සේවා අවස්ථා අතරින් තෝරාගත් රූප කිහිපයක් මෙහි නරඹන්න.",
    descriptionEnglish: "",
  },
  reviews: {
    textKey: "reviews",
    titleSinhala: "පාරිභෝගික අදහස්",
    titleEnglish: "Client Testimonials",
    descriptionSinhala:
      "අපගේ සේවාවන් භාවිතා කළ පාරිභෝගිකයින්ගේ අත්දැකීම් අතරින් තෝරාගත් අදහස් කිහිපයක් මෙහි නරඹන්න.",
    descriptionEnglish: "",
  },
  contact: {
    textKey: "contact",
    titleSinhala: "අප අමතන්න",
    titleEnglish: "Reach Out To SGL",
    descriptionSinhala:
      "ඔබගේ උත්සවයට ගැළපෙන ආහාර සැපයුම්, භාණ්ඩ සැකසුම් සහ වෙන්කරවා ගැනීම් සඳහා අප සමඟ සම්බන්ධවන්න. ඔබගේ අවශ්‍යතාවයට ගැළපෙන විසඳුමක් ඉක්මනින් සකස් කරදෙන්නෙමු.",
    descriptionEnglish: "",
  },
};

function buildWebTextFallback(textKey) {
  return webTextDefaults[textKey] || null;
}

module.exports = {
  webTextDefaults,
  buildWebTextFallback,
};

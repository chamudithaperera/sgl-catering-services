// Static page shell copy. Cards and record lists are loaded from the API.
export const servicePageContent = {
  catering: {
    type: "catering",
    title: "ආහාර පාන සැපයීම",
    englishTitle: "Signature Catering",
    eyebrow: "SGL Catering Service",
    image: "/assets/sgl-images/hero-buffet.jpg",
    seo: {
      title: "Catering Services Anuradhapura | SGL Catering Service",
      description:
        "Choose SGL Catering Service for catering services in Anuradhapura, including weddings, home functions, almsgivings, birthdays, office events, buffet menus, and custom food packages.",
      canonicalPath: "/catering",
      keywords: [
        "catering services anuradhapura",
        "sgl catering service",
        "wedding catering Anuradhapura",
        "buffet catering Anuradhapura",
        "home function catering Anuradhapura",
      ],
    },
    description:
      "විවාහ උත්සව, නිවසේ සැමරුම්, උපන්දින සාද සහ ආයතනික වැඩසටහන් සඳහා අවස්ථාවට ගැළපෙන පිරිසිදු, රසවත් ආහාර අත්දැකීමක් ඔබ වෙත ලබාදීමට අපි සූදානම්.",
    heroStats: [
      { label: "මෙනු තේරීම්", value: "08+", note: "විවිධ මෙනු" },
      { label: "මිල පරාසය", value: "රු. 80", note: "සිට ඉහළට" },
      { label: "සැකසුම් විලාසය", value: "අභිරුචි", note: "අයවැය අනුව" },
    ],
    sectionNav: [
      { id: "menus", label: "මෙනු සහ මිල" },
      { id: "consultation", label: "වෙන්කරවා ගැනීම" },
    ],
    overview: {
      eyebrow: "Menu List",
      title: "මෙනු සහ මිල ගණන්",
      description:
        "ඔබගේ අවස්ථාව, අමුත්තන් සංඛ්‍යාව සහ අවශ්‍ය ප්‍රමාණය අනුව අවසන් මිල වෙනස් විය හැක. වෙන්කරවා ගැනීමට පෙර අපි සමඟ මෙනුව තහවුරු කරගන්න.",
    },
    menus: [
      {
        name: "Rice & Curry / රයිස් & කරි",
        summary: "දිනපතා සහ උත්සව අවස්ථා සඳහා එළවලු, මාළු හෝ කුකුල් මස් තේරීම් සමඟ සකස් කරන බත් සහ කරි මෙනුව.",
        priceLabel: "රු. 400 සිට / පුද්ගලයෙකුට",
        featured: true,
        includedItems: ["එළවලු (Veg) - රු. 400 සිට", "මාළු (Fish) - රු. 450 සිට", "කුකුල් මස් (Chicken) - රු. 500 සිට"],
      },
      {
        name: "Fried Rice / ෆ්‍රයිඩ් රයිස්",
        summary: "සැහැල්ලු උත්සව, සාද සහ පවුල් හමුවීම් සඳහා ජනප්‍රිය ෆ්‍රයිඩ් රයිස් මෙනුව.",
        priceLabel: "රු. 600 සිට / පුද්ගලයෙකුට",
        featured: false,
        includedItems: ["අවශ්‍යතාවය අනුව චිකන්, මාළු හෝ එළවලු තේරීම් එකතු කළ හැක"],
      },
      {
        name: "Yellow Rice / කහ බත්",
        summary: "විශේෂ අවස්ථා සඳහා කහ බත් මූලික කරගත් පිරිසිදු සහ රසවත් සැකසුම.",
        priceLabel: "රු. 600 සිට / පුද්ගලයෙකුට",
        featured: false,
        includedItems: ["අවශ්‍යතාවය අනුව මස්, මාළු, එළවලු සහ සලාද තේරීම් එකතු කළ හැක"],
      },
      {
        name: "Short Eats / කෙටි ආහාර",
        summary: "තේ පැන්, රැස්වීම් සහ කුඩා සාද සඳහා කෙටි ආහාර වර්ග.",
        priceLabel: "රු. 80 සිට / එකකට",
        featured: false,
        includedItems: ["කෙටි ආහාර වර්ග අවශ්‍ය ප්‍රමාණය අනුව සකස් කර දිය හැක"],
      },
      {
        name: "Bites / බයිට් වර්ග",
        summary: "ආහාර මේසයට හෝ විශේෂ සාද සඳහා කිලෝග්‍රෑම් පදනමින් ලබාගත හැකි බයිට් වර්ග.",
        priceLabel: "රු. 600 සිට / 1kg",
        featured: true,
        includedItems: [
          "තම්බපු එළවලු (Boiled vegetables) 1kg - රු. 800 සිට",
          "වැව් මාළු (Tank fish) 1kg - රු. 1000 සිට",
          "කුකුල් මස් (Chicken) 1kg - රු. 2000 සිට",
          "ඌරු මස් / ඉස්සන් / දැල්ලෝ (Pork / Prawns / Cuttlefish) 1kg - රු. 3500 සිට",
          "මඤ්ඤොක්කා (Manioc) 1kg - රු. 600 සිට",
        ],
      },
    ],
    consultation: {
      title: "වෙන්කරවා ගැනීමට පෙර අපි සමඟ මෙනුව සකස් කරගන්න",
      description:
        "අමුත්තන් සංඛ්‍යාව, පිළිගැන්වීමේ විලාසය, අයවැය පරාසය සහ විශේෂ ආහාර අවශ්‍යතා අනුව අවසන් මෙනුව අපි ඔබ සමඟ එක්ව සකස් කරමු.",
    },
  },
  renting: {
    type: "renting",
    title: "උත්සව භාණ්ඩ සැපයීම",
    englishTitle: "Event Rentals",
    eyebrow: "SGL Rental Service",
    image: "/assets/sgl-images/indoor-buffet.jpg",
    seo: {
      title: "Event Rentals Anuradhapura | SGL Catering Service",
      description:
        "Rent buffet equipment, tables, chairs, serviceware, and event support items from SGL Catering Service in Anuradhapura for weddings, home functions, and special events.",
      canonicalPath: "/renting",
      keywords: [
        "event rentals Anuradhapura",
        "sgl catering service",
        "catering services anuradhapura",
        "buffet equipment rental Anuradhapura",
        "wedding rental items Anuradhapura",
      ],
    },
    description:
      "ඔබගේ උත්සවයට අවශ්‍ය පුටු, මේස, වීදුරු, කැනපි, වෝමර් සහ අනෙකුත් භාණ්ඩ පිරිසිදු තත්ත්වයෙන් කුලියට ලබාදීමට අපි සූදානම්.",
    heroStats: [
      { label: "භාණ්ඩ වර්ග", value: "15+", note: "තේරීම් රැසක්" },
      { label: "මිල පරාසය", value: "රු. 20", note: "සිට ඉහළට" },
      { label: "ලබාදීම", value: "දිනපතා", note: "පූර්ව වෙන්කිරීම්" },
    ],
    sectionNav: [
      { id: "items", label: "භාණ්ඩ මිල" },
      { id: "booking", label: "වෙන්කරවා ගැනීම" },
    ],
    overview: {
      eyebrow: "Rental Items",
      title: "කුලියට ලබාගත හැකි භාණ්ඩ සහ මිල",
      description:
        "අවශ්‍ය භාණ්ඩ ප්‍රමාණය සහ දිනය අනුව අවසන් මිල තහවුරු කරගත හැක. වෙන්කරවා ගැනීමට පෙර අප සමඟ භාණ්ඩ ලැයිස්තුව අවසන් කරගන්න.",
    },
    items: [
      {
        name: "Plastic Chairs / ප්ලාස්ටික් පුටු",
        category: "Seating",
        priceLabel: "රු. 30 සිට ඉහළට",
      },
      {
        name: "Covered Chairs / කවර් සහිත පුටු",
        category: "Seating",
        priceLabel: "රු. 100 සිට ඉහළට",
      },
      {
        name: "Tables / මේස",
        category: "Tables",
        priceLabel: "රු. 100 සිට ඉහළට",
      },
      {
        name: "Covered Tables / කවර් සහිත මේස",
        category: "Tables",
        priceLabel: "රු. 200 සිට ඉහළට",
      },
      {
        name: "Glasses / වීදුරු",
        category: "Serviceware",
        priceLabel: "රු. 20 සිට ඉහළට",
      },
      {
        name: "Cups / කප්",
        category: "Serviceware",
        priceLabel: "රු. 150 සිට ඉහළට",
      },
      {
        name: "Basin / බේසම්",
        category: "Support Items",
        priceLabel: "රු. 600 සිට ඉහළට",
      },
      {
        name: "Oil Lamp / පොල් තෙල් පහන",
        category: "Ceremony Items",
        priceLabel: "රු. 2000 සිට ඉහළට",
      },
      {
        name: "Garden Umbrella / උද්‍යාන කුඩ",
        category: "Outdoor",
        priceLabel: "රු. 500 සිට ඉහළට",
      },
      {
        name: "Sink / සින්ක්",
        category: "Support Items",
        priceLabel: "රු. 500 සිට ඉහළට",
      },
      {
        name: "Dessert Cup / ඩෙසට් කප්",
        category: "Serviceware",
        priceLabel: "රු. 20 සිට ඉහළට",
      },
      {
        name: "VIP Canopies / හට්",
        category: "Canopies",
        priceLabel: "රු. 2500 සිට ඉහළට",
      },
      {
        name: "Tea & Coffee Set / තේ කෝපි උපකරණ",
        category: "Beverage Support",
        priceLabel: "රු. 1000 සිට ඉහළට",
      },
      {
        name: "Saucepan / සාස්පාන්",
        category: "Kitchen Support",
        priceLabel: "රු. 500 සිට ඉහළට",
      },
      {
        name: "Gas Cooker / ගෑස් ලිප්",
        category: "Kitchen Support",
        priceLabel: "රු. 1000 සිට ඉහළට",
      },
      {
        name: "Rice Warmer",
        category: "Kitchen Support",
        priceLabel: "රු. 10,000 සිට ඉහළට",
      },
    ],
    consultation: {
      title: "උත්සව දිනයට පෙර අවශ්‍ය භාණ්ඩ ලැයිස්තුව අපි සමඟ අවසන් කරන්න",
      description:
        "අමුත්තන් සංඛ්‍යාව, ස්ථානයේ ප්‍රමාණය සහ සේවා විලාසය අනුව අවශ්‍ය උපකරණ ප්‍රමාණය නිවැරදිව සැලසුම් කර දින වෙන්කරවා ගැනීම කලින්ම සිදු කරගත හැකියි.",
    },
  },
};

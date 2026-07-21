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
    eyebrow: "Event Rentals",
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
      "බෆේ උපකරණ, මේස සැකසුම්, සේවනාංග සහ උත්සව අවශ්‍ය භාණ්ඩ පැකේජ මට්ටමින් හෝ භාණ්ඩ වශයෙන්ම කුලියට ලබාදෙමින් ඔබගේ අවස්ථාව පිළිවෙළට සංවිධානය කිරීමට අපි සහාය වෙමු.",
    heroStats: [
      { label: "කුලී පැකේජ", value: "03", note: "සූදානම් පැකේජ" },
      { label: "භාණ්ඩ වර්ග", value: "12+", note: "තේරීම් රැසක්" },
      { label: "ලබාදීම", value: "දිනපතා", note: "පූර්ව වෙන්කිරීම්" },
    ],
    sectionNav: [
      { id: "packages", label: "පැකේජ" },
      { id: "items", label: "භාණ්ඩ මිල" },
      { id: "booking", label: "වෙන්කරවා ගැනීම" },
    ],
    packagesIntro: {
      eyebrow: "Rental Bundles",
      title: "උත්සව අවශ්‍යතාවයට ගැළපෙන පැකේජ තේරීම්",
      description:
        "කුඩා පවුල් උත්සවයක සිට විශාල සාදයක දක්වා, අවශ්‍ය උපකරණ පැකේජයක් ලෙස සකස් කර ලබාදීමෙන් සැලසුම් කිරීම පහසු කරමු.",
    },
    packages: [
      {
        name: "මූලික බෆේ සැකසුම් පැකේජය",
        summary: "කුඩා හා මධ්‍යම ප්‍රමාණයේ උත්සව සඳහා අවශ්‍ය මූලික බෆේ සේවා සැකසුම.",
        priceLabel: "රු. 35,000 / දිනකට",
        featured: false,
        includedItems: [
          "චේෆින් ඩිෂ් 06",
          "පිළිගැන්වීමේ මේස 02",
          "භෝජන පිඟන් කට්ටල 40",
          "කට්ලරි කට්ටල 40",
          "වතුර බෙදාහැරීමේ උපකරණ 02",
          "පිළිගැන්වීමේ හැන්දී කට්ටලය",
        ],
      },
      {
        name: "විවාහ සේවා එකතුව",
        summary: "විවාහ හා නිල සැමරුම් සඳහා අලංකාර පිළිගැන්වීමේ භාණ්ඩ සහ භෝජන සැකසුම් ඇතුළත් පැකේජයක්.",
        priceLabel: "රු. 68,000 / දිනකට",
        featured: true,
        includedItems: [
          "චේෆින් ඩිෂ් 10",
          "බැන්කට් පුටු 100",
          "රවුම් මේස 10",
          "මේස රෙදි සහ පුටු ආවරණ කට්ටල",
          "ග්ලාස් සහ පිඟන් කට්ටල",
          "ජූස් බෙදාහැරීමේ මධ්‍යස්ථානය",
        ],
      },
      {
        name: "සම්පූර්ණ උත්සව සහය පැකේජය",
        summary: "විශාල උත්සව සහ බහු සේවා මධ්‍යස්ථාන සහිත බෆේ සැකසුම් සඳහා වැඩිම සම්පූර්ණ පැකේජය.",
        priceLabel: "රු. 125,000 / දිනකට",
        featured: true,
        includedItems: [
          "බෆේ වෝමර්ස් 14",
          "අමුත්තන් 200කට භෝජන සැකසුම",
          "සේවා මේස සහ ආවරණ සැරසිලි",
          "අතුරුපස ප්‍රදර්ශන ස්ථාන",
          "තේ හෝ කෝපි සේවා උපකරණ",
          "බීම සහ වතුර මධ්‍යස්ථාන",
        ],
      },
    ],
    itemGroupsIntro: {
      eyebrow: "Item Pricing",
      title: "භාණ්ඩ වශයෙන් කුලියට ලබාගත හැකි මිල ගණන්",
      description:
        "පැකේජයක් අවශ්‍ය නොවන විට, අවශ්‍ය භාණ්ඩ වශයෙන්ම තෝරාගෙන මිල ගණන් අනුව වෙන්කරවා ගත හැකියි.",
    },
    itemGroups: [
      {
        title: "Buffet Equipment",
        description: "ප්‍රධාන ආහාර පිළිගැන්වීම් සඳහා භාවිතා කරන උණුසුම් තබන සහ පිළිගැන්වීමේ උපකරණ.",
        items: [
          {
            name: "චේෆින් ඩිෂ්",
            imageUrl: "/assets/sgl-images/indoor-buffet.jpg",
            priceLabel: "රු. 2,500 / එක්කොටස",
            quantity: "18ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
          {
            name: "සුප් වෝමර්",
            imageUrl: "/assets/sgl-images/curry-selection.jpg",
            priceLabel: "රු. 2,000 / එක්කොටස",
            quantity: "06ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
          {
            name: "බත් වෝමර්",
            imageUrl: "/assets/sgl-images/rice-plate.jpg",
            priceLabel: "රු. 3,200 / එක්කොටස",
            quantity: "04ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
        ],
      },
      {
        title: "Tables & Seating",
        description: "නිවස තුළ සහ එළිමහන් උත්සව සඳහා මේස, පුටු සහ රෙදි සැකසුම් තේරීම්.",
        items: [
          {
            name: "රවුම් මේසය",
            imageUrl: "/assets/sgl-images/salad-station.jpg",
            priceLabel: "රු. 1,800 / එක්කොටස",
            quantity: "24ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
          {
            name: "බැන්කට් පුටුව",
            imageUrl: "/assets/sgl-images/grill-buffet.jpg",
            priceLabel: "රු. 180 / එක්කොටස",
            quantity: "220ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
          {
            name: "මේස රෙදි කට්ටලය",
            imageUrl: "/assets/sgl-images/salad-buffet.jpg",
            priceLabel: "රු. 650 / කට්ටලය",
            quantity: "කට්ටල 40ක්",
            status: "ලබාගත හැකියි",
          },
        ],
      },
      {
        title: "Dining Serviceware",
        description: "අමුත්තන්ගේ භෝජන සැකසුම සම්පූර්ණ කිරීමට අවශ්‍ය භාජන සහ පිළිගැන්වීමේ භාණ්ඩ.",
        items: [
          {
            name: "භෝජන පිඟාන",
            imageUrl: "/assets/sgl-images/hero-buffet.jpg",
            priceLabel: "රු. 45 / එක්කොටස",
            quantity: "300ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
          {
            name: "වීදුරු කෝප්පය",
            imageUrl: "/assets/sgl-images/traditional-sweets.jpg",
            priceLabel: "රු. 35 / එක්කොටස",
            quantity: "250ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
          {
            name: "කට්ලරි කට්ටලය",
            imageUrl: "/assets/sgl-images/devilled-side.jpg",
            priceLabel: "රු. 60 / කට්ටලය",
            quantity: "කට්ටල 280ක්",
            status: "ලබාගත හැකියි",
          },
        ],
      },
      {
        title: "Beverage Support",
        description: "පානීය මධ්‍යස්ථාන, තේ සැකසුම් සහ සහායක පිළිගැන්වීම් සඳහා භාවිතා කරන උපකරණ.",
        items: [
          {
            name: "ජූස් බෙදාහැරීමේ උපකරණය",
            imageUrl: "/assets/sgl-images/carrot-sambol.jpg",
            priceLabel: "රු. 1,750 / එක්කොටස",
            quantity: "08ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
          {
            name: "වතුර බොයිලරය",
            imageUrl: "/assets/sgl-images/salad-station.jpg",
            priceLabel: "රු. 2,200 / එක්කොටස",
            quantity: "05ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
          {
            name: "කුල් බොක්ස්",
            imageUrl: "/assets/sgl-images/grill-buffet.jpg",
            priceLabel: "රු. 1,200 / එක්කොටස",
            quantity: "10ක් ලබාගත හැකියි",
            status: "ලබාගත හැකියි",
          },
        ],
      },
    ],
    consultation: {
      title: "උත්සව දිනයට පෙර අවශ්‍ය භාණ්ඩ ලැයිස්තුව අපි සමඟ අවසන් කරන්න",
      description:
        "අමුත්තන් සංඛ්‍යාව, ස්ථානයේ ප්‍රමාණය සහ සේවා විලාසය අනුව අවශ්‍ය උපකරණ ප්‍රමාණය නිවැරදිව සැලසුම් කර දින වෙන්කරවා ගැනීම කලින්ම සිදු කරගත හැකියි.",
    },
  },
};

// Dummy content until the service detail pages are connected to admin-managed data.
export const servicePageContent = {
  catering: {
    type: "catering",
    title: "ආහාර පාන සැපයීම",
    eyebrow: "Signature Catering",
    image: "/assets/sgl-images/hero-buffet.jpg",
    description:
      "විවාහ උත්සව, නිවසේ සැමරුම්, උපන්දින සාද සහ ආයතනික වැඩසටහන් සඳහා අවස්ථාවට ගැළපෙන මෙනු, වෘත්තීයමය පිළිගැන්වීම සහ රසවත් ආහාර අත්දැකීමක් අපි සකස් කරමු.",
    heroStats: [
      { label: "උත්සව කාණ්ඩ", value: "05", note: "අවස්ථා වර්ග" },
      { label: "මෙනු තේරීම්", value: "10+", note: "dummy packages" },
      { label: "ඇණවුම් විලාසය", value: "Custom", note: "budget friendly" },
    ],
    sectionNav: [
      { id: "categories", label: "කාණ්ඩ" },
      { id: "menus", label: "මෙනු සහ මිල" },
      { id: "consultation", label: "වෙන්කරවා ගැනීම" },
    ],
    overview: {
      eyebrow: "Event Categories",
      title: "ඔබගේ උත්සවයට ගැළපෙන කේටරින් වර්ග",
      description:
        "සෑම අවස්ථාවක්ම එකම ආකාරයෙන් නොසැලසුම් වන නිසා, කාණ්ඩ අනුව රසය, සේවනාංග සැකසුම සහ මිල පරාසය වෙනස් කර සකස් කළ හැකි මෙනු අපි පිරිනමන්නෙමු.",
    },
    categories: [
      {
        id: "weddings",
        title: "විවාහ උත්සව",
        shortLabel: "Weddings",
        iconKey: "sparkles",
        image: "/assets/sgl-images/hero-buffet.jpg",
        description:
          "විවාහ දිනයේ අලංකාරය, රසය සහ පිළිවෙළ එකට ගෙනෙන මෙනු හා සේවනාංග සැකසුම්.",
        highlights: ["බෆේ හෝ seated service", "අතුරුපස සහ beverage options", "guest count අනුව custom setup"],
        packages: [
          {
            name: "Classic Wedding Buffet",
            summary: "ප්‍රධාන ආහාර, අතුරුපද සහ අතුරුපස ඇතුළත් සාම්ප්‍රදායික සහ නවීන රසයන්ගේ සමබර මෙනුව.",
            priceLabel: "රු. 2,850 සිට / අමුත්තා",
            featured: false,
            includedItems: [
              "බාස්මති බත් හෝ කහ බත්",
              "කුකුල් මස් ව්‍යංජනය",
              "මාළු ඇඹුල්තියල්",
              "එළවළු කරි 02ක්",
              "සැලඩ් සහ අච්චාරු",
              "වටලප්පන් හෝ pudding",
            ],
          },
          {
            name: "Grand Wedding Signature",
            summary: "විශාල ආරාධිත පිරිසකට ප්‍රිමියම් buffet table එකක් සහ dessert finish එකක් සමඟ සම්පූර්ණ විවාහ මෙනුව.",
            priceLabel: "රු. 3,950 සිට / අමුත්තා",
            featured: true,
            includedItems: [
              "බිරියානි හෝ special rice",
              "කුකුල් මස් සහ beef / fish option",
              "devilled side dish",
              "western salad corner",
              "dessert duo",
              "welcome drink station",
            ],
          },
        ],
      },
      {
        id: "home-functions",
        title: "නිවසේ උත්සව",
        shortLabel: "Home Functions",
        iconKey: "house",
        image: "/assets/sgl-images/indoor-buffet.jpg",
        description:
          "නිවසේ පැවැත්වෙන සැමරුම් සඳහා සරල, උණුසුම් සහ හොඳ පිළිවෙළකින් සකස් කරන පවුල්-හිතකාමී මෙනු.",
        highlights: ["small to medium guest count", "family-style menu options", "දිනපතා budget ranges"],
        packages: [
          {
            name: "Family Lunch Spread",
            summary: "සැහැල්ලු නිවසේ උත්සව සඳහා සරලව රසවත් lunch buffet එකක්.",
            priceLabel: "රු. 1,850 සිට / අමුත්තා",
            featured: false,
            includedItems: [
              "සුදු බත්",
              "කුකුල් මස් හෝ මාළු කරි",
              "පරිප්පු",
              "අල තෙම්පරාදු",
              "මල්කුනු සලාද",
              "fruit salad",
            ],
          },
          {
            name: "Traditional Dane Table",
            summary: "දාන පිංකම් සහ ආගමික අවස්ථා සඳහා සාම්ප්‍රදායික රසයන්ට වඩාත් ගැළපෙන මෙනුව.",
            priceLabel: "රු. 2,250 සිට / අමුත්තා",
            featured: true,
            includedItems: [
              "කහ බත්",
              "පරිප්පු සහ temperd vegetables",
              "අල, බීට් හා ගෝවා ව්‍යංජන",
              "soya / jackfruit curry option",
              "පපඩම් සහ අච්චාරු",
              "කැවිලි හෝ කිරිපැණි අයිතමයක්",
            ],
          },
        ],
      },
      {
        id: "birthday-parties",
        title: "උපන්දින සාද",
        shortLabel: "Birthday Parties",
        iconKey: "cake",
        image: "/assets/sgl-images/traditional-sweets.jpg",
        description:
          "ළමයින්ගේ සහ වැඩිහිටි උපන්දින අවස්ථා සඳහා රසවත් buffet, finger food සහ dessert-focused menus.",
        highlights: ["kids + adults menu mix", "bite-size snack add-ons", "dessert-friendly setup"],
        packages: [
          {
            name: "Garden Party Menu",
            summary: "casual celebration එකකට ගැළපෙන බයිට්ස්, main dishes සහ dessert table combo එකක්.",
            priceLabel: "රු. 1,950 සිට / අමුත්තා",
            featured: false,
            includedItems: [
              "fried rice හෝ noodles",
              "chicken bites",
              "mini sandwiches",
              "crispy potatoes",
              "cupcakes / jelly cups",
              "fruit punch",
            ],
          },
          {
            name: "Kids & Family Combo",
            summary: "කුඩා දරුවන් සහ පවුල් අමුත්තන් දෙපාර්ශවයටම ගැළපෙන වඩා විවිධාකාර මෙනුවක්.",
            priceLabel: "රු. 2,350 සිට / අමුත්තා",
            featured: true,
            includedItems: [
              "butter rice",
              "mild chicken curry",
              "sausages or fish fingers",
              "vegetable pasta",
              "ice cream / brownie item",
              "fresh juice counter",
            ],
          },
        ],
      },
      {
        id: "office-parties",
        title: "ඔෆිස් සහ ආයතනික සාද",
        shortLabel: "Office Parties",
        iconKey: "briefcase",
        image: "/assets/sgl-images/grill-buffet.jpg",
        description:
          "ආයතනික හමුවීම්, launch events සහ staff gatherings සඳහා punctual, polished catering solutions.",
        highlights: ["timed delivery", "formal buffet presentation", "tea break or full meal options"],
        packages: [
          {
            name: "Executive Lunch Buffet",
            summary: "boardroom හෝ company event එකකට පිළිවෙළ සහ රසය දෙකම රැකගන්න premium lunch menu එකක්.",
            priceLabel: "රු. 2,650 සිට / අමුත්තා",
            featured: true,
            includedItems: [
              "steamed rice හෝ biriyani rice",
              "chicken curry",
              "fish or beef special",
              "vegetable trio",
              "salad bowl",
              "dessert cup",
            ],
          },
          {
            name: "Tea & Bites Setup",
            summary: "meeting breaks, seminars සහ office celebrations සඳහා light refreshment menu එකක්.",
            priceLabel: "රු. 1,450 සිට / අමුත්තා",
            featured: false,
            includedItems: [
              "tea / coffee service",
              "rolls and patties",
              "mini sandwiches",
              "sweet bites",
              "juice option",
              "disposable or ceramic service setup",
            ],
          },
        ],
      },
      {
        id: "more-events",
        title: "වෙනත් විශේෂ අවස්ථා",
        shortLabel: "More Events",
        iconKey: "utensils",
        image: "/assets/sgl-images/salad-buffet.jpg",
        description:
          "ගිවිස ගැනීම්, house warming, anniversary dinners සහ වෙනත් විශේෂ අවස්ථා සඳහා fully customizable menus.",
        highlights: ["custom guest counts", "theme-based setup support", "menu tailoring by request"],
        packages: [
          {
            name: "Engagement Celebration Menu",
            summary: "අලංකාර පිළිගැන්වීමක් සහ balanced buffet selection එකක් සමඟ pre-wedding celebrations සඳහා සුදුසු මෙනුවක්.",
            priceLabel: "රු. 2,550 සිට / අමුත්තා",
            featured: false,
            includedItems: [
              "special rice option",
              "chicken and seafood pair",
              "fresh salad section",
              "vegetarian side options",
              "dessert platter",
              "mocktail corner",
            ],
          },
          {
            name: "Custom Event Package",
            summary: "ඔබගේ අවස්ථාවට, location එකට සහ budget එකට සරිලන ලෙස tailor කරන flexible menu option එකක්.",
            priceLabel: "රු. 3,100 සිට / අමුත්තා",
            featured: true,
            includedItems: [
              "menu consultation",
              "guest-count based quantity planning",
              "main dishes 03 සිට",
              "customized side dishes",
              "dessert and beverage add-ons",
              "service staff arrangement by request",
            ],
          },
        ],
      },
    ],
    consultation: {
      title: "වෙන්කරවා ගැනීමට පෙර අපි සමඟ මෙනුව සකස් කරගන්න",
      description:
        "guest count, serving style, budget range සහ විශේෂ ආහාර අවශ්‍යතා අනුව අවසන් මෙනුව අපි ඔබ සමඟ එක්ව සකස් කරමු.",
    },
  },
  renting: {
    type: "renting",
    title: "උත්සව භාණ්ඩ සැපයීම",
    eyebrow: "Event Rentals",
    image: "/assets/sgl-images/indoor-buffet.jpg",
    description:
      "බෆේ උපකරණ, මේස සැකසුම්, සේවනාංග සහ උත්සව අවශ්‍ය භාණ්ඩ package මට්ටමින් හෝ item-wise ලෙස කුලියට ලබාදෙමින් ඔබගේ අවස්ථාව පිළිවෙළට සංවිධානය කිරීමට අපි සහාය වෙමු.",
    heroStats: [
      { label: "Rental Packages", value: "03", note: "ready bundles" },
      { label: "Item Lists", value: "12+", note: "dummy rates" },
      { label: "Availability", value: "Daily", note: "pre-booking" },
    ],
    sectionNav: [
      { id: "packages", label: "පැකේජ" },
      { id: "items", label: "භාණ්ඩ මිල" },
      { id: "booking", label: "වෙන්කරවා ගැනීම" },
    ],
    packagesIntro: {
      eyebrow: "Rental Bundles",
      title: "උත්සව අවශ්‍යතාවයට ගැළපෙන package තේරීම්",
      description:
        "කුඩා පවුල් උත්සවයක සිට විශාල සාදයක දක්වා, අවශ්‍ය උපකරණ package එකක් ලෙස සකස් කර ලබාදීමෙන් සැලසුම් කිරීම පහසු කරමු.",
    },
    packages: [
      {
        name: "Buffet Setup Essential",
        summary: "කුඩා හා මධ්‍යම ප්‍රමාණයේ උත්සව සඳහා අවශ්‍ය මූලික buffet service setup එක.",
        priceLabel: "රු. 35,000 / දිනකට",
        featured: false,
        includedItems: [
          "Chafing dish 06",
          "Serving table 02",
          "Dinner plate set 40",
          "Cutlery set 40",
          "Water dispenser 02",
          "Serving spoon set",
        ],
      },
      {
        name: "Wedding Service Collection",
        summary: "විවාහ හා formal celebrations සඳහා අලංකාර serving items සහ dining setup ඇතුළත් package එක.",
        priceLabel: "රු. 68,000 / දිනකට",
        featured: true,
        includedItems: [
          "Chafing dish 10",
          "Banquet chair 100",
          "Round tables 10",
          "Table cloth and chair cover set",
          "Glassware and plate set",
          "Juice dispenser station",
        ],
      },
      {
        name: "Full Event Support Package",
        summary: "විශාල උත්සව සහ multi-station buffet arrangements සඳහා වැඩිම සම්පූර්ණ package එක.",
        priceLabel: "රු. 125,000 / දිනකට",
        featured: true,
        includedItems: [
          "Buffet warmers 14",
          "Dining setup for 200 guests",
          "Service tables and skirting",
          "Dessert display stands",
          "Tea / coffee service equipment",
          "Beverage and water stations",
        ],
      },
    ],
    itemGroupsIntro: {
      eyebrow: "Item Pricing",
      title: "භාණ්ඩ වශයෙන් කුලියට ලබාගත හැකි මිල ගණන්",
      description:
        "package එකක් අවශ්‍ය නොවන විට, අවශ්‍ය භාණ්ඩ වශයෙන්ම තෝරාගෙන මිල ගණන් අනුව වෙන්කරවා ගත හැකියි.",
    },
    itemGroups: [
      {
        title: "බෆේ උපකරණ",
        description: "ප්‍රධාන ආහාර පිළිගැන්වීම් සඳහා භාවිතා කරන warming සහ serving equipment.",
        items: [
          { name: "Chafing Dish", priceLabel: "රු. 2,500 / එක්කොටස", quantity: "18 available", status: "ලබාගත හැකියි" },
          { name: "Soup Warmer", priceLabel: "රු. 2,000 / එක්කොටස", quantity: "06 available", status: "ලබාගත හැකියි" },
          { name: "Rice Warmer", priceLabel: "රු. 3,200 / එක්කොටස", quantity: "04 available", status: "ලබාගත හැකියි" },
        ],
      },
      {
        title: "මේස හා අසුන් සැකසුම්",
        description: "indoor සහ outdoor event layouts සඳහා table, chair සහ linen තේරීම්.",
        items: [
          { name: "Round Table", priceLabel: "රු. 1,800 / එක්කොටස", quantity: "24 available", status: "ලබාගත හැකියි" },
          { name: "Banquet Chair", priceLabel: "රු. 180 / එක්කොටස", quantity: "220 available", status: "ලබාගත හැකියි" },
          { name: "Table Cloth Set", priceLabel: "රු. 650 / set", quantity: "40 sets", status: "ලබාගත හැකියි" },
        ],
      },
      {
        title: "Dining හා සේවනාංග",
        description: "guest dining setup එක සම්පූර්ණ කිරීමට අවශ්‍ය tableware සහ serving items.",
        items: [
          { name: "Dinner Plate", priceLabel: "රු. 45 / එක්කොටස", quantity: "300 available", status: "ලබාගත හැකියි" },
          { name: "Glass Cup", priceLabel: "රු. 35 / එක්කොටස", quantity: "250 available", status: "ලබාගත හැකියි" },
          { name: "Cutlery Set", priceLabel: "රු. 60 / set", quantity: "280 sets", status: "ලබාගත හැකියි" },
        ],
      },
      {
        title: "Beverage සහ Utility Items",
        description: "drink counters, tea stations සහ utility serving සඳහා භාවිතා කරන උපකරණ.",
        items: [
          { name: "Juice Dispenser", priceLabel: "රු. 1,750 / එක්කොටස", quantity: "08 available", status: "ලබාගත හැකියි" },
          { name: "Water Boiler", priceLabel: "රු. 2,200 / එක්කොටස", quantity: "05 available", status: "ලබාගත හැකියි" },
          { name: "Cool Box", priceLabel: "රු. 1,200 / එක්කොටස", quantity: "10 available", status: "ලබාගත හැකියි" },
        ],
      },
    ],
    consultation: {
      title: "උත්සව දිනයට පෙර අවශ්‍ය භාණ්ඩ ලැයිස්තුව අපි සමඟ finalize කරන්න",
      description:
        "guest count, venue size සහ service style අනුව අවශ්‍ය උපකරණ ප්‍රමාණය නිවැරදිව සැලසුම් කර දින වෙන්කරවා ගැනීම කලින්ම සිදු කරගත හැකියි.",
    },
  },
};

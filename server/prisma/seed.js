const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  await prisma.adminUser.upsert({
    where: { email: "admin@sglcateringservice.lk" },
    update: {
      username: "sgladmin",
      name: "SGL Admin",
      passwordHash,
    },
    create: {
      email: "admin@sglcateringservice.lk",
      username: "sgladmin",
      name: "SGL Admin",
      passwordHash,
    },
  });

  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      companyName: "SGL Catering Services",
      heroBadge: "විශ්වාසයෙන් යුත් කේටරින් සේවාවක්",
      heroTitleLineOne: "රසයෙන් සපිරි",
      heroTitleLineTwo: "මතකයේ රැඳෙන සංග්‍රහයක්",
      heroDescription:
        "විවාහ උත්සව, උපන්දින සාද, ආයතනික උත්සව සහ ඔබගේ සෑම විශේෂ අවස්ථාවක් සඳහාම රසවත්, පිරිසිදු සහ උසස් තත්ත්වයේ ආහාර සේවාවක් අපි ලබා දෙන්නෙමු.",
      aboutHeading: "අප ගැන",
      aboutIntro:
        "SGL Catering Services ඔබගේ විශේෂ අවස්ථාවන් සඳහා රසවත්, පිරිසිදු සහ උසස් තත්ත්වයේ ආහාර සැපයීමට කැපවී සිටී.",
      aboutBody:
        "කුඩා පවුල් උත්සවයක සිට විශාල විවාහ උත්සවයක් දක්වා ඔබගේ අවශ්‍යතාවයට ගැළපෙන catering සේවාවක් අපි සපයන්නෙමු. ටෙන්ට්, පුටු, මේස, බුෆේ සෙට් සහ අනෙකුත් උත්සව උපකරණ පහසු මිලට කුලියට ලබාදීමද අපගේ සේවාවන් අතරට ඇතුළත් වේ.",
      contactHeading: "ඔබගේ උත්සවය අදම සැලසුම් කරමු",
      contactDescription:
        "ඔබගේ උත්සවයේ දිනය, ස්ථානය, අමුත්තන්ගේ සංඛ්‍යාව සහ අවශ්‍ය සේවාවන් පිළිබඳ අපට දැනුම් දෙන්න. ඔබට ගැළපෙන හොඳම සේවාව සහ මිල ගණන් අපි ලබා දෙන්නෙමු.",
      phone: "+94 71 234 5678",
      whatsapp: "+94 71 234 5678",
      email: "info@sglcateringservice.lk",
      address: "නො. 125, මාලඹේ පාර, කොළඹ",
      businessHours: "සඳුදා - ඉරිදා | පෙ.ව. 8.00 - ප.ව. 8.00",
      mapUrl: "https://maps.google.com",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
    },
    create: {
      id: 1,
      companyName: "SGL Catering Services",
      heroBadge: "විශ්වාසයෙන් යුත් කේටරින් සේවාවක්",
      heroTitleLineOne: "රසයෙන් සපිරි",
      heroTitleLineTwo: "මතකයේ රැඳෙන සංග්‍රහයක්",
      heroDescription:
        "විවාහ උත්සව, උපන්දින සාද, ආයතනික උත්සව සහ ඔබගේ සෑම විශේෂ අවස්ථාවක් සඳහාම රසවත්, පිරිසිදු සහ උසස් තත්ත්වයේ ආහාර සේවාවක් අපි ලබා දෙන්නෙමු.",
      aboutHeading: "අප ගැන",
      aboutIntro:
        "SGL Catering Services ඔබගේ විශේෂ අවස්ථාවන් සඳහා රසවත්, පිරිසිදු සහ උසස් තත්ත්වයේ ආහාර සැපයීමට කැපවී සිටී.",
      aboutBody:
        "කුඩා පවුල් උත්සවයක සිට විශාල විවාහ උත්සවයක් දක්වා ඔබගේ අවශ්‍යතාවයට ගැළපෙන catering සේවාවක් අපි සපයන්නෙමු. ටෙන්ට්, පුටු, මේස, බුෆේ සෙට් සහ අනෙකුත් උත්සව උපකරණ පහසු මිලට කුලියට ලබාදීමද අපගේ සේවාවන් අතරට ඇතුළත් වේ.",
      contactHeading: "ඔබගේ උත්සවය අදම සැලසුම් කරමු",
      contactDescription:
        "ඔබගේ උත්සවයේ දිනය, ස්ථානය, අමුත්තන්ගේ සංඛ්‍යාව සහ අවශ්‍ය සේවාවන් පිළිබඳ අපට දැනුම් දෙන්න. ඔබට ගැළපෙන හොඳම සේවාව සහ මිල ගණන් අපි ලබා දෙන්නෙමු.",
      phone: "+94 71 234 5678",
      whatsapp: "+94 71 234 5678",
      email: "info@sglcateringservice.lk",
      address: "නො. 125, මාලඹේ පාර, කොළඹ",
      businessHours: "සඳුදා - ඉරිදා | පෙ.ව. 8.00 - ප.ව. 8.00",
      mapUrl: "https://maps.google.com",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
    },
  });

  await prisma.$transaction([
    prisma.benefit.deleteMany(),
    prisma.service.deleteMany(),
    prisma.foodPackage.deleteMany(),
    prisma.rentalItem.deleteMany(),
    prisma.rentalPrice.deleteMany(),
    prisma.rentalPackage.deleteMany(),
    prisma.galleryItem.deleteMany(),
    prisma.review.deleteMany(),
  ]);

  await prisma.benefit.createMany({
    data: [
      {
        title: "නැවුම් අමුද්‍රව්‍ය",
        description: "දිනපතා තෝරාගත් ගුණාත්මක අමුද්‍රව්‍ය.",
        icon: "Leaf",
        sortOrder: 1,
      },
      {
        title: "පළපුරුදු සූපවේදීන්",
        description: "රසය සහ පිරිසිදුකම පිළිබඳ අවධානයෙන් සකස් කරන ආහාර.",
        icon: "ChefHat",
        sortOrder: 2,
      },
      {
        title: "විශ්වාසනීය සේවාව",
        description: "ඔබගේ උත්සවය සඳහා නියමිත වේලාවට සේවාව.",
        icon: "ShieldCheck",
        sortOrder: 3,
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        title: "විවාහ උත්සව කේටරින්",
        description: "විවාහ උත්සව සඳහා ආහාර, බුෆේ සැකසුම් සහ සම්පූර්ණ catering සේවාව.",
        icon: "HeartHandshake",
        sortOrder: 1,
      },
      {
        title: "උපන්දින සහ පවුල් උත්සව",
        description: "උපන්දින සාද, පවුල් හමුවීම් සහ විශේෂ අවස්ථා සඳහා ආහාර පැකේජ.",
        icon: "PartyPopper",
        sortOrder: 2,
      },
      {
        title: "ආයතනික උත්සව",
        description: "රැස්වීම්, සම්මන්ත්‍රණ සහ ආයතනික උත්සව සඳහා catering සේවාව.",
        icon: "Building2",
        sortOrder: 3,
      },
      {
        title: "එළිමහන් උත්සව",
        description: "එළිමහන් උත්සව සඳහා ආහාර සහ අවශ්‍ය උපකරණ සැපයීම.",
        icon: "Trees",
        sortOrder: 4,
      },
      {
        title: "බුෆේ සේවාව",
        description: "බුෆේ සැකසුම, ආහාර බඳුන්, සේවා උපකරණ සහ සේවකයන් සමඟ සේවාව.",
        icon: "UtensilsCrossed",
        sortOrder: 5,
      },
      {
        title: "උත්සව උපකරණ කුලියට ලබාදීම",
        description: "පුටු, මේස, ටෙන්ට්, බුෆේ සෙට් සහ අනෙකුත් උපකරණ කුලියට ලබාදීම.",
        icon: "Armchair",
        sortOrder: 6,
      },
    ],
  });

  await prisma.foodPackage.createMany({
    data: [
      {
        name: "මූලික ආහාර පැකේජය",
        summary: "කුඩා සහ මධ්‍යම ප්‍රමාණයේ උත්සව සඳහා ගැළපෙන ජනප්‍රිය තේරීමක්.",
        priceLabel: "එක් පුද්ගලයෙකුට රු. 1,750 සිට",
        includedItems: ["බත් වර්ගයක්", "කරි වර්ග තුනක්", "සලාදයක්", "අතුරුපසක්"],
        featured: false,
        ctaLabel: "මිල විමසන්න",
        sortOrder: 1,
      },
      {
        name: "විශේෂ ආහාර පැකේජය",
        summary: "විවාහ, උපන්දින සහ සමාගම් උත්සව සඳහා සමතුලිත මෙනුවක්.",
        priceLabel: "එක් පුද්ගලයෙකුට රු. 2,450 සිට",
        includedItems: [
          "බත් වර්ග දෙකක්",
          "මස් හෝ මාළු වර්ගයක්",
          "කරි වර්ග හතරක්",
          "සලාදයක්",
          "අතුරුපසක්",
        ],
        featured: true,
        ctaLabel: "මිල විමසන්න",
        sortOrder: 2,
      },
      {
        name: "ප්‍රිමියම් ආහාර පැකේජය",
        summary: "විශාල උත්සව සහ විශේෂ සැලසුම් කළ ආරාධනාවන් සඳහා premium සේවාව.",
        priceLabel: "එක් පුද්ගලයෙකුට රු. 3,250 සිට",
        includedItems: [
          "විශේෂ බත් වර්ග",
          "මස් සහ මාළු ආහාර",
          "කරි සහ අතුරු ආහාර",
          "අතුරුපස",
          "පානයක්",
        ],
        featured: false,
        ctaLabel: "මිල විමසන්න",
        sortOrder: 3,
      },
    ],
  });

  await prisma.rentalItem.createMany({
    data: [
      {
        name: "ටෙන්ට්",
        description: "එළිමහන් උත්සව සඳහා වර්ෂාවෙන් සහ අව්වෙන් ආරක්ෂා වන premium tent setup.",
        category: "ටෙන්ට් සහ උත්සව සැකසුම්",
        imageUrl: "/assets/sgl-images/indoor-buffet.jpg",
        priceLabel: "රු. 15,000 සිට",
        availableQuantity: 8,
        status: "ලබාගත හැකියි",
        sortOrder: 1,
      },
      {
        name: "ප්ලාස්ටික් පුටු",
        description: "උත්සව, සාද සහ කෙටි කාලීන සැකසුම් සඳහා පිරිසිදු පුටු.",
        category: "පුටු සහ මේස",
        imageUrl: "/assets/sgl-images/salad-station.jpg",
        priceLabel: "දිනකට රු. 120",
        availableQuantity: 250,
        status: "ලබාගත හැකියි",
        sortOrder: 2,
      },
      {
        name: "මේස",
        description: "අමුත්තන්ගේ ආහාර හෝ සේවා සැකසුම් සඳහා ශක්තිමත් event tables.",
        category: "පුටු සහ මේස",
        imageUrl: "/assets/sgl-images/grill-buffet.jpg",
        priceLabel: "දිනකට රු. 650",
        availableQuantity: 60,
        status: "ලබාගත හැකියි",
        sortOrder: 3,
      },
      {
        name: "බුෆේ සෙට්",
        description: "බුෆේ service line සඳහා ආහාර display setup එක සම්පූර්ණයෙන්ම.",
        category: "බුෆේ උපකරණ",
        imageUrl: "/assets/sgl-images/hero-buffet.jpg",
        priceLabel: "දිනකට රු. 4,500",
        availableQuantity: 14,
        status: "ලබාගත හැකියි",
        sortOrder: 4,
      },
      {
        name: "කෑම උණුසුම්ව තබන භාජන",
        description: "සේවාව පුරා ආහාර උණුසුම්ව තබාගැනීමට chafing dish sets.",
        category: "බුෆේ උපකරණ",
        imageUrl: "/assets/sgl-images/devilled-side.jpg",
        priceLabel: "දිනකට රු. 1,500",
        availableQuantity: 30,
        status: "ලබාගත හැකියි",
        sortOrder: 5,
      },
      {
        name: "මේස රෙදි සහ පුටු ආවරණ",
        description: "උත්සව theme එකට ගැළපෙන පිරිසිදු table linen සහ chair covers.",
        category: "සැරසිලි උපකරණ",
        imageUrl: "/assets/sgl-images/traditional-sweets.jpg",
        priceLabel: "රු. 180 සිට",
        availableQuantity: 200,
        status: "ලබාගත හැකියි",
        sortOrder: 6,
      },
    ],
  });

  await prisma.rentalPrice.createMany({
    data: [
      { item: "ප්ලාස්ටික් පුටුවක්", priceLabel: "දිනකට රු. 120", sortOrder: 1 },
      { item: "මේසයක්", priceLabel: "දිනකට රු. 650", sortOrder: 2 },
      { item: "ටෙන්ට් එකක්", priceLabel: "රු. 15,000 සිට", sortOrder: 3 },
      { item: "බුෆේ සෙට් එකක්", priceLabel: "දිනකට රු. 4,500", sortOrder: 4 },
      { item: "කෑම උණුසුම්ව තබන භාජනයක්", priceLabel: "දිනකට රු. 1,500", sortOrder: 5 },
      { item: "පිඟන් කට්ටලයක්", priceLabel: "රු. 1,200 සිට", sortOrder: 6 },
      { item: "කෝප්ප කට්ටලයක්", priceLabel: "රු. 900 සිට", sortOrder: 7 },
      { item: "මේස රෙද්දක්", priceLabel: "දිනකට රු. 180", sortOrder: 8 },
      { item: "පුටු ආවරණයක්", priceLabel: "දිනකට රු. 150", sortOrder: 9 },
    ],
  });

  await prisma.rentalPackage.createMany({
    data: [
      {
        name: "කුඩා උත්සව පැකේජය",
        summary: "පවුල් සාද සහ කුඩා උත්සව සඳහා පහසු සැකසුමක්.",
        items: ["පුටු 25", "මේස 5", "මේස රෙදි 5", "බුෆේ සෙට් 2"],
        ctaLabel: "මිල විමසන්න",
        sortOrder: 1,
      },
      {
        name: "සාමාන්‍ය උත්සව පැකේජය",
        summary: "50-100 අමුත්තන් අතර event setup සඳහා සම්පූර්ණ package එකක්.",
        items: ["පුටු 50", "මේස 10", "ටෙන්ට් 1", "බුෆේ සෙට් 4", "මේස රෙදි", "පුටු ආවරණ"],
        ctaLabel: "මිල විමසන්න",
        sortOrder: 2,
      },
      {
        name: "විශාල උත්සව පැකේජය",
        summary: "විවාහ සහ විශාල සැමරුම් සඳහා පුළුල් service package එකක්.",
        items: ["පුටු 100", "මේස 20", "ටෙන්ට්", "බුෆේ සෙට්", "පිඟන් සහ කෝප්ප", "මේස රෙදි"],
        ctaLabel: "මිල විමසන්න",
        sortOrder: 3,
      },
    ],
  });

  await prisma.galleryItem.createMany({
    data: [
      { title: "ප්‍රධාන බුෆේ සැකසුම", category: "බුෆේ සැකසුම්", imageUrl: "/assets/sgl-images/hero-buffet.jpg", featured: true, sortOrder: 1 },
      { title: "නැවුම් සලාද කවුන්ටරය", category: "ආහාර", imageUrl: "/assets/sgl-images/salad-buffet.jpg", featured: true, sortOrder: 2 },
      { title: "ශ්‍රී ලාංකික ප්‍රධාන පිඟාන", category: "ආහාර", imageUrl: "/assets/sgl-images/rice-plate.jpg", featured: false, sortOrder: 3 },
      { title: "උණුසුම් මස් බුෆේ", category: "විවාහ උත්සව", imageUrl: "/assets/sgl-images/grill-buffet.jpg", featured: false, sortOrder: 4 },
      { title: "රසවත් අතුරුපස සහ රසකැවිලි", category: "උපන්දින සාද", imageUrl: "/assets/sgl-images/traditional-sweets.jpg", featured: false, sortOrder: 5 },
      { title: "සම්බෝල සහ අතුරු කෑම", category: "ආහාර", imageUrl: "/assets/sgl-images/carrot-sambol.jpg", featured: false, sortOrder: 6 },
      { title: "ඩෙවල්ඩ් අතුරු කෑම", category: "බුෆේ සැකසුම්", imageUrl: "/assets/sgl-images/devilled-side.jpg", featured: false, sortOrder: 7 },
      { title: "සලාද සහ සේවා තලය", category: "කුලී උපකරණ", imageUrl: "/assets/sgl-images/salad-station.jpg", featured: false, sortOrder: 8 },
      { title: "Indoor chafing setup", category: "ටෙන්ට් සහ උත්සව සැකසුම්", imageUrl: "/assets/sgl-images/indoor-buffet.jpg", featured: false, sortOrder: 9 },
      { title: "කරි සහ මෙනු තේරීම්", category: "විවාහ උත්සව", imageUrl: "/assets/sgl-images/curry-selection.jpg", featured: false, sortOrder: 10 },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        customerName: "සචිනි පෙරේරා",
        eventType: "විවාහ උත්සවය",
        rating: 5,
        quote: "අපගේ උත්සවයට ලබාදුන් ආහාර සහ සේවාව ඉතාමත් විශිෂ්ටයි. සියලුම කටයුතු නියමිත වේලාවට සිදු කළා.",
        sortOrder: 1,
      },
      {
        customerName: "නවීන් අබේසිංහ",
        eventType: "ආයතනික උත්සවය",
        rating: 5,
        quote: "Professional service එකක්. මෙනුව රසවත්, staff එක සම්බන්ධයෙන් අපට ලැබුණු response එකත් ඉතා හොඳයි.",
        sortOrder: 2,
      },
      {
        customerName: "අශානි සෙනෙවිරත්න",
        eventType: "උපන්දින සැමරුම",
        rating: 5,
        quote: "ආහාරයේ රස, පිරිසිදුකම සහ setup එක අපි බලාපොරොත්තු වූවාට වඩා හොඳයි. නැවතත් අනිවාර්යයෙන්ම තෝරාගන්නවා.",
        sortOrder: 3,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

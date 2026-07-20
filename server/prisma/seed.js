const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const contactDetails = {
  phone: "+94703324500",
  whatsapp: "+94703324500",
  email: "sudathjayathilakabs@gmail.com",
  address: "No.360, National Housing, Stage II, Anuradhapura.",
  businessHours: "සඳුදා - ඉරිදා | පෙ.ව. 8.00 - ප.ව. 8.00",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4934.785252954407!2d80.40432687591523!3d8.319864291715861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf5005cd65e2d%3A0x378ef91fdb3a6052!2sSGL%20Catering%20Service!5e1!3m2!1sen!2slk!4v1784484566797!5m2!1sen!2slk",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
};

async function seedIfEmpty(model, data) {
  const count = await model.count();

  if (count > 0) {
    return;
  }

  await model.createMany({ data });
}

async function main() {
  const passwordHash = await bcrypt.hash("Admin@1234", 10);

  await prisma.admin.upsert({
    where: { username: "sgladmin" },
    update: {
      email: "admin@sglcateringservice.lk",
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

  await prisma.contactDetails.upsert({
    where: { id: 1 },
    update: contactDetails,
    create: {
      id: 1,
      ...contactDetails,
    },
  });

  await seedIfEmpty(prisma.cateringCatergory, [
    {
      title: "විවාහ උත්සව",
      shortLabel: "Wedding",
      description: "විවාහ උත්සව සඳහා අලංකාර බුෆේ සැකසුම් සහ සම්පූර්ණ ආහාර සේවාව.",
      imageUrl: "/assets/sgl-images/hero-buffet.jpg",
      highlights: ["බුෆේ සැකසුම", "සේවා කණ්ඩායම", "විශේෂ මෙනු"],
      sortOrder: 1,
    },
    {
      title: "පවුල් සහ උපන්දින සාද",
      shortLabel: "Family",
      description: "උපන්දින, නිවසේ සාද සහ පවුල් හමුවීම් සඳහා රසවත් ආහාර පැකේජ.",
      imageUrl: "/assets/sgl-images/salad-buffet.jpg",
      highlights: ["සරල සැකසුම්", "ළමුන්ට ගැළපෙන මෙනු", "පහසු මිල"],
      sortOrder: 2,
    },
    {
      title: "ආයතනික උත්සව",
      shortLabel: "Corporate",
      description: "රැස්වීම්, වැඩමුළු සහ සමාගම් උත්සව සඳහා පිළිවෙලට සැලසුම් කළ catering සේවාව.",
      imageUrl: "/assets/sgl-images/indoor-buffet.jpg",
      highlights: ["වේලාවට සේවාව", "පිරිසිදු ඉදිරිපත් කිරීම", "සැලසුම් කළ මෙනු"],
      sortOrder: 3,
    },
  ]);

  const categories = await prisma.cateringCatergory.findMany({ orderBy: { sortOrder: "asc" } });
  const weddingCategory = categories[0];
  const familyCategory = categories[1] || weddingCategory;
  const corporateCategory = categories[2] || weddingCategory;

  if (weddingCategory) {
    await seedIfEmpty(prisma.cateringMenu, [
      {
        categoryId: weddingCategory.id,
        name: "මූලික ආහාර මෙනුව",
        summary: "කුඩා සහ මධ්‍යම ප්‍රමාණයේ උත්සව සඳහා ගැළපෙන ජනප්‍රිය තේරීමක්.",
        priceLabel: "එක් පුද්ගලයෙකුට රු. 1,750 සිට",
        includedItems: ["බත් වර්ගයක්", "කරි වර්ග තුනක්", "සලාදයක්", "අතුරුපසක්"],
        featured: false,
        ctaLabel: "මිල විමසන්න",
        sortOrder: 1,
      },
      {
        categoryId: weddingCategory.id,
        name: "විශේෂ ආහාර මෙනුව",
        summary: "විවාහ, උපන්දින සහ සමාගම් උත්සව සඳහා සමතුලිත මෙනුවක්.",
        priceLabel: "එක් පුද්ගලයෙකුට රු. 2,450 සිට",
        includedItems: ["බත් වර්ග දෙකක්", "මස් හෝ මාළු වර්ගයක්", "කරි වර්ග හතරක්", "සලාදයක්", "අතුරුපසක්"],
        featured: true,
        ctaLabel: "මිල විමසන්න",
        sortOrder: 2,
      },
      {
        categoryId: familyCategory.id,
        name: "පවුල් සාද මෙනුව",
        summary: "නිවසේ සාද සහ උපන්දින සඳහා පහසු, රසවත් සහ පිරිසිදු ආහාර තේරීමක්.",
        priceLabel: "එක් පුද්ගලයෙකුට රු. 2,100 සිට",
        includedItems: ["ෆ්‍රයිඩ් රයිස්", "චිකන් කරි", "එළවළු දෙකක්", "සලාද", "අතුරුපස"],
        featured: false,
        ctaLabel: "මිල විමසන්න",
        sortOrder: 3,
      },
      {
        categoryId: corporateCategory.id,
        name: "ප්‍රිමියම් ආහාර මෙනුව",
        summary: "විශාල උත්සව සහ විශේෂ සැලසුම් කළ ආරාධනාවන් සඳහා premium සේවාව.",
        priceLabel: "එක් පුද්ගලයෙකුට රු. 3,250 සිට",
        includedItems: ["විශේෂ බත් වර්ග", "මස් සහ මාළු ආහාර", "කරි සහ අතුරු ආහාර", "අතුරුපස", "පානයක්"],
        featured: false,
        ctaLabel: "මිල විමසන්න",
        sortOrder: 4,
      },
    ]);
  }

  await seedIfEmpty(prisma.rentalItem, [
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
  ]);

  await seedIfEmpty(prisma.rentalBundle, [
    {
      name: "කුඩා උත්සව බණ්ඩලය",
      summary: "පවුල් සාද සහ කුඩා උත්සව සඳහා පහසු සැකසුමක්.",
      priceLabel: "රු. 25,000 සිට",
      items: ["පුටු 25", "මේස 5", "මේස රෙදි 5", "බුෆේ සෙට් 2"],
      ctaLabel: "මිල විමසන්න",
      sortOrder: 1,
    },
    {
      name: "සාමාන්‍ය උත්සව බණ්ඩලය",
      summary: "50-100 අමුත්තන් අතර event setup සඳහා සම්පූර්ණ package එකක්.",
      priceLabel: "රු. 48,000 සිට",
      items: ["පුටු 50", "මේස 10", "ටෙන්ට් 1", "බුෆේ සෙට් 4", "මේස රෙදි", "පුටු ආවරණ"],
      ctaLabel: "මිල විමසන්න",
      sortOrder: 2,
    },
    {
      name: "විශාල උත්සව බණ්ඩලය",
      summary: "විවාහ සහ විශාල සැමරුම් සඳහා පුළුල් service package එකක්.",
      priceLabel: "රු. 95,000 සිට",
      items: ["පුටු 100", "මේස 20", "ටෙන්ට්", "බුෆේ සෙට්", "පිඟන් සහ කෝප්ප", "මේස රෙදි"],
      ctaLabel: "මිල විමසන්න",
      sortOrder: 3,
    },
  ]);

  await seedIfEmpty(prisma.gallery, [
    { title: "ප්‍රධාන බුෆේ සැකසුම", category: "බුෆේ සැකසුම්", imageUrl: "/assets/sgl-images/hero-buffet.jpg", featured: true, sortOrder: 1 },
    { title: "නැවුම් සලාද කවුන්ටරය", category: "ආහාර", imageUrl: "/assets/sgl-images/salad-buffet.jpg", featured: true, sortOrder: 2 },
    { title: "ශ්‍රී ලාංකික ප්‍රධාන පිඟාන", category: "ආහාර", imageUrl: "/assets/sgl-images/rice-plate.jpg", featured: false, sortOrder: 3 },
    { title: "උණුසුම් මස් බුෆේ", category: "විවාහ උත්සව", imageUrl: "/assets/sgl-images/grill-buffet.jpg", featured: false, sortOrder: 4 },
    { title: "රසවත් අතුරුපස සහ රසකැවිලි", category: "උපන්දින සාද", imageUrl: "/assets/sgl-images/traditional-sweets.jpg", featured: false, sortOrder: 5 },
    { title: "සම්බෝල සහ අතුරු කෑම", category: "ආහාර", imageUrl: "/assets/sgl-images/carrot-sambol.jpg", featured: false, sortOrder: 6 },
  ]);

  await seedIfEmpty(prisma.review, [
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
  ]);

  await seedIfEmpty(prisma.message, [
    {
      customerName: "Sample Customer",
      phone: "+94701234567",
      eventType: "Website inquiry",
      serviceNeeded: "Catering",
      eventDate: "Not specified",
      guestCount: "50",
      location: "Anuradhapura",
      message: "This is a sample inquiry. You can delete it from the admin panel.",
      isRead: false,
    },
  ]);
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

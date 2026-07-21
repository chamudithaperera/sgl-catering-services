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

async function seedContactDetailsIfMissing() {
  const existingContactDetails = await prisma.contactDetails.findUnique({ where: { id: 1 } });

  if (existingContactDetails) {
    return;
  }

  await prisma.contactDetails.create({
    data: {
      id: 1,
      ...contactDetails,
    },
  });
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

  await seedContactDetailsIfMissing();

  await prisma.cateringMenu.deleteMany();
  await prisma.cateringMenu.createMany({
    data: [
    {
      name: "Rice & Curry / රයිස් & කරි",
      summary: "දිනපතා සහ උත්සව අවස්ථා සඳහා එළවලු, මාළු හෝ කුකුල් මස් තේරීම් සමඟ සකස් කරන බත් සහ කරි මෙනුව.",
      priceLabel: "රු. 400 සිට / පුද්ගලයෙකුට",
      includedItems: ["එළවලු (Veg) - රු. 400 සිට", "මාළු (Fish) - රු. 450 සිට", "කුකුල් මස් (Chicken) - රු. 500 සිට"],
      featured: true,
      ctaLabel: "මිල විමසන්න",
      sortOrder: 1,
    },
    {
      name: "Fried Rice / ෆ්‍රයිඩ් රයිස්",
      summary: "සැහැල්ලු උත්සව, සාද සහ පවුල් හමුවීම් සඳහා ජනප්‍රිය ෆ්‍රයිඩ් රයිස් මෙනුව.",
      priceLabel: "රු. 600 සිට / පුද්ගලයෙකුට",
      includedItems: ["අවශ්‍යතාවය අනුව චිකන්, මාළු හෝ එළවලු තේරීම් එකතු කළ හැක"],
      featured: false,
      ctaLabel: "මිල විමසන්න",
      sortOrder: 2,
    },
    {
      name: "Yellow Rice / කහ බත්",
      summary: "විශේෂ අවස්ථා සඳහා කහ බත් මූලික කරගත් පිරිසිදු සහ රසවත් සැකසුම.",
      priceLabel: "රු. 600 සිට / පුද්ගලයෙකුට",
      includedItems: ["අවශ්‍යතාවය අනුව මස්, මාළු, එළවලු සහ සලාද තේරීම් එකතු කළ හැක"],
      featured: false,
      ctaLabel: "මිල විමසන්න",
      sortOrder: 3,
    },
    {
      name: "Short Eats / කෙටි ආහාර",
      summary: "තේ පැන්, රැස්වීම් සහ කුඩා සාද සඳහා කෙටි ආහාර වර්ග.",
      priceLabel: "රු. 80 සිට / එකකට",
      includedItems: ["කෙටි ආහාර වර්ග අවශ්‍ය ප්‍රමාණය අනුව සකස් කර දිය හැක"],
      featured: false,
      ctaLabel: "මිල විමසන්න",
      sortOrder: 4,
    },
    {
      name: "Bites / බයිට් වර්ග",
      summary: "ආහාර මේසයට හෝ විශේෂ සාද සඳහා කිලෝග්‍රෑම් පදනමින් ලබාගත හැකි බයිට් වර්ග.",
      priceLabel: "රු. 600 සිට / 1kg",
      includedItems: [
        "තම්බපු එළවලු (Boiled vegetables) 1kg - රු. 800 සිට",
        "වැව් මාළු (Tank fish) 1kg - රු. 1000 සිට",
        "කුකුල් මස් (Chicken) 1kg - රු. 2000 සිට",
        "ඌරු මස් / ඉස්සන් / දැල්ලෝ (Pork / Prawns / Cuttlefish) 1kg - රු. 3500 සිට",
        "මඤ්ඤොක්කා (Manioc) 1kg - රු. 600 සිට",
      ],
      featured: true,
      ctaLabel: "මිල විමසන්න",
      sortOrder: 5,
    },
    ],
  });

  await prisma.rentalItem.deleteMany();
  await prisma.rentalItem.createMany({
    data: [
    {
      name: "Plastic Chairs / ප්ලාස්ටික් පුටු",
      category: "Seating",
      imageUrl: "/assets/sgl-images/indoor-buffet.jpg",
      priceLabel: "රු. 30 සිට / එකකට",
      sortOrder: 1,
    },
    {
      name: "Covered Chairs / කවර් සහිත පුටු",
      category: "Seating",
      imageUrl: "/assets/sgl-images/salad-station.jpg",
      priceLabel: "රු. 100 සිට / එකකට",
      sortOrder: 2,
    },
    {
      name: "Tables / මේස",
      category: "Tables",
      imageUrl: "/assets/sgl-images/grill-buffet.jpg",
      priceLabel: "රු. 100 සිට / එකකට",
      sortOrder: 3,
    },
    {
      name: "Covered Tables / කවර් සහිත මේස",
      category: "Tables",
      imageUrl: "/assets/sgl-images/hero-buffet.jpg",
      priceLabel: "රු. 200 සිට / එකකට",
      sortOrder: 4,
    },
    {
      name: "Glasses / වීදුරු",
      category: "Serviceware",
      imageUrl: "/assets/sgl-images/traditional-sweets.jpg",
      priceLabel: "රු. 20 සිට / එකකට",
      sortOrder: 5,
    },
    {
      name: "Cups / කප්",
      category: "Serviceware",
      imageUrl: "/assets/sgl-images/curry-selection.jpg",
      priceLabel: "රු. 150 සිට / එකකට",
      sortOrder: 6,
    },
    {
      name: "Basin / බේසම්",
      category: "Support Items",
      imageUrl: "/assets/sgl-images/salad-buffet.jpg",
      priceLabel: "රු. 600 සිට / එකකට",
      sortOrder: 7,
    },
    {
      name: "Oil Lamp / පොල් තෙල් පහන",
      category: "Ceremony Items",
      imageUrl: "/assets/sgl-images/hero-buffet.jpg",
      priceLabel: "රු. 2000 සිට / එකකට",
      sortOrder: 8,
    },
    {
      name: "Garden Umbrella / උද්‍යාන කුඩ",
      category: "Outdoor",
      imageUrl: "/assets/sgl-images/grill-buffet.jpg",
      priceLabel: "රු. 500 සිට / එකකට",
      sortOrder: 9,
    },
    {
      name: "Sink / සින්ක්",
      category: "Support Items",
      imageUrl: "/assets/sgl-images/salad-station.jpg",
      priceLabel: "රු. 500 සිට / එකකට",
      sortOrder: 10,
    },
    {
      name: "Dessert Cup / ඩෙසට් කප්",
      category: "Serviceware",
      imageUrl: "/assets/sgl-images/traditional-sweets.jpg",
      priceLabel: "රු. 20 සිට / එකකට",
      sortOrder: 11,
    },
    {
      name: "VIP Canopies / හට්",
      category: "Canopies",
      imageUrl: "/assets/sgl-images/indoor-buffet.jpg",
      priceLabel: "රු. 2500 සිට / එකකට",
      sortOrder: 12,
    },
    {
      name: "Tea & Coffee Set / තේ කෝපි උපකරණ",
      category: "Beverage Support",
      imageUrl: "/assets/sgl-images/carrot-sambol.jpg",
      priceLabel: "රු. 1000 සිට / එකකට",
      sortOrder: 13,
    },
    {
      name: "Saucepan / සාස්පාන්",
      category: "Kitchen Support",
      imageUrl: "/assets/sgl-images/curry-selection.jpg",
      priceLabel: "රු. 500 සිට / එකකට",
      sortOrder: 14,
    },
    {
      name: "Gas Cooker / ගෑස් ලිප්",
      category: "Kitchen Support",
      imageUrl: "/assets/sgl-images/devilled-side.jpg",
      priceLabel: "රු. 1000 සිට / එකකට",
      sortOrder: 15,
    },
    {
      name: "Rice Warmer",
      category: "Kitchen Support",
      imageUrl: "/assets/sgl-images/rice-plate.jpg",
      priceLabel: "රු. 10,000 සිට / එකකට",
      sortOrder: 16,
    },
    ],
  });

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

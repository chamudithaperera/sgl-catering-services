const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { rentalItems } = require("./data/rentalItems");

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
      priceLabel: "රු. 400 සිට / පුද්ගලයෙකුට",
      includedItems: ["එළවලු (Veg) - රු. 400 සිට", "මාළු (Fish) - රු. 450 සිට", "කුකුල් මස් (Chicken) - රු. 500 සිට"],
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Fried Rice / ෆ්‍රයිඩ් රයිස්",
      priceLabel: "රු. 600 සිට / පුද්ගලයෙකුට",
      includedItems: ["අවශ්‍යතාවය අනුව චිකන්, මාළු හෝ එළවලු තේරීම් එකතු කළ හැක"],
      featured: false,
      sortOrder: 2,
    },
    {
      name: "Yellow Rice / කහ බත්",
      priceLabel: "රු. 600 සිට / පුද්ගලයෙකුට",
      includedItems: ["අවශ්‍යතාවය අනුව මස්, මාළු, එළවලු සහ සලාද තේරීම් එකතු කළ හැක"],
      featured: false,
      sortOrder: 3,
    },
    {
      name: "Short Eats / කෙටි ආහාර",
      priceLabel: "රු. 80 සිට / එකකට",
      includedItems: ["කෙටි ආහාර වර්ග අවශ්‍ය ප්‍රමාණය අනුව සකස් කර දිය හැක"],
      featured: false,
      sortOrder: 4,
    },
    {
      name: "Bites / බයිට් වර්ග",
      priceLabel: "රු. 600 සිට / 1kg",
      includedItems: [
        "තම්බපු එළවලු (Boiled vegetables) 1kg - රු. 800 සිට",
        "වැව් මාළු (Tank fish) 1kg - රු. 1000 සිට",
        "කුකුල් මස් (Chicken) 1kg - රු. 2000 සිට",
        "ඌරු මස් / ඉස්සන් / දැල්ලෝ (Pork / Prawns / Cuttlefish) 1kg - රු. 3500 සිට",
        "මඤ්ඤොක්කා (Manioc) 1kg - රු. 600 සිට",
      ],
      featured: true,
      sortOrder: 5,
    },
    ],
  });

  await seedIfEmpty(prisma.rentalItem, rentalItems);

  await seedIfEmpty(prisma.gallery, [
    { title: "ප්‍රධාන බුෆේ සැකසුම", imageUrl: "/assets/sgl-images/hero-buffet.jpg", sortOrder: 1 },
    { title: "නැවුම් සලාද කවුන්ටරය", imageUrl: "/assets/sgl-images/salad-buffet.jpg", sortOrder: 2 },
    { title: "ශ්‍රී ලාංකික ප්‍රධාන පිඟාන", imageUrl: "/assets/sgl-images/rice-plate.jpg", sortOrder: 3 },
    { title: "උණුසුම් මස් බුෆේ", imageUrl: "/assets/sgl-images/grill-buffet.jpg", sortOrder: 4 },
    { title: "රසවත් අතුරුපස සහ රසකැවිලි", imageUrl: "/assets/sgl-images/traditional-sweets.jpg", sortOrder: 5 },
    { title: "සම්බෝල සහ අතුරු කෑම", imageUrl: "/assets/sgl-images/carrot-sambol.jpg", sortOrder: 6 },
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

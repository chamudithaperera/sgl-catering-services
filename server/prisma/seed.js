const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const contactDetails = {
  phone: "0703324350",
  whatsapp: "0703324350",
  secondaryPhone: "0252227538",
  tertiaryPhone: "0703324500",
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

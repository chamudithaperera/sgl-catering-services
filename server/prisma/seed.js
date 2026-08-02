const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { webTextDefaults } = require("../src/utils/webTextDefaults");

const prisma = new PrismaClient();

const contactDetails = {
  phone: "0703324350",
  whatsapp: "0703324350",
  secondaryPhone: "0252227538",
  tertiaryPhone: "0703324500",
  email: "",
  address: "",
  businessHours: "",
  mapUrl: "",
  facebookUrl: "",
  instagramUrl: "",
};

const whyChooseItems = [
  {
    titleSinhala: "වසර 40කට වැඩි පළපුරුද්ද",
    titleEnglish: "Over 40 Years of Experience",
    sortOrder: 1,
  },
  {
    titleSinhala: "සාම්ප්‍රදායික ශ්‍රී ලාංකීය රස",
    titleEnglish: "Authentic Traditional Sri Lankan Recipes",
    sortOrder: 2,
  },
  {
    titleSinhala: "නැවුම් හා ගුණාත්මක අමුද්‍රව්‍ය",
    titleEnglish: "Fresh & High-Quality Ingredients",
    sortOrder: 3,
  },
  {
    titleSinhala: "වෘත්තීය හා මිත්‍රශීලී සේවාව",
    titleEnglish: "Professional and Friendly Service",
    sortOrder: 4,
  },
  {
    titleSinhala: "සාධාරණ මිල ගණන්",
    titleEnglish: "Affordable Prices",
    sortOrder: 5,
  },
  {
    titleSinhala: "සෞඛ්‍යාරක්ෂිත ආහාර සැකසීම",
    titleEnglish: "Hygienic Food Preparation",
    sortOrder: 6,
  },
];

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

async function seedWebTextsIfMissing() {
  for (const webText of Object.values(webTextDefaults)) {
    const existingWebText = await prisma.webText.findUnique({
      where: { textKey: webText.textKey },
      select: { id: true },
    });

    if (!existingWebText) {
      await prisma.webText.create({ data: webText });
    }
  }
}

async function main() {
  const passwordHash = await bcrypt.hash("Admin@1234", 10);

  await prisma.admin.upsert({
    where: { username: "sgladmin" },
    update: {
      email: "admin@example.com",
      name: "Admin",
      passwordHash,
    },
    create: {
      email: "admin@example.com",
      username: "sgladmin",
      name: "Admin",
      passwordHash,
    },
  });

  await seedContactDetailsIfMissing();
  await seedWebTextsIfMissing();
  await seedIfEmpty(prisma.whyChooseItem, whyChooseItems);

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

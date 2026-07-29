const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { webTextDefaults } = require("../src/utils/webTextDefaults");

const prisma = new PrismaClient();

const contactDetails = {
  phone: "",
  whatsapp: "",
  secondaryPhone: "",
  tertiaryPhone: "",
  email: "",
  address: "",
  businessHours: "",
  mapUrl: "",
  facebookUrl: "",
  instagramUrl: "",
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
  await seedWebTextsIfMissing();

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

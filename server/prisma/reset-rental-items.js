const { PrismaClient } = require("@prisma/client");
const { rentalItems } = require("./data/rentalItems");

const prisma = new PrismaClient();

async function main() {
  await prisma.rentalItem.deleteMany();
  await prisma.rentalItem.createMany({ data: rentalItems });
  console.log(`Reset ${rentalItems.length} rental items.`);
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

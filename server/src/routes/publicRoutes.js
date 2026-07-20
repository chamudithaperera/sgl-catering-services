const express = require("express");
const { prisma } = require("../config/prisma");
const { contactMessageSchema } = require("../utils/validators");

const router = express.Router();

router.get("/health", (request, response) => {
  response.json({ ok: true });
});

router.get("/content", async (request, response) => {
  const [
    contactDetails,
    cateringCategories,
    cateringMenus,
    rentalItems,
    rentalBundles,
    gallery,
    reviews,
  ] = await Promise.all([
    prisma.contactDetails.findUnique({ where: { id: 1 } }),
    prisma.cateringCatergory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.cateringMenu.findMany({ include: { category: true }, orderBy: { sortOrder: "asc" } }),
    prisma.rentalItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.rentalBundle.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.gallery.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.review.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  response.json({
    siteConfig: contactDetails,
    contactDetails,
    cateringCategories,
    foodPackages: cateringMenus,
    cateringMenus,
    rentalItems,
    rentalPackages: rentalBundles,
    rentalBundles,
    gallery,
    reviews,
  });
});

router.post("/inquiries", async (request, response) => {
  const data = contactMessageSchema.parse(request.body);

  const inquiry = await prisma.message.create({ data });

  response.status(201).json({
    message: "Inquiry received successfully",
    inquiryId: inquiry.id,
  });
});

module.exports = { publicRoutes: router };

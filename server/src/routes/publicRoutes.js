const express = require("express");
const { prisma } = require("../config/prisma");
const { contactMessageSchema } = require("../utils/validators");

const router = express.Router();

const galleryPublicSelect = {
  title: true,
  imageUrl: true,
  sortOrder: true,
};

router.get("/health", (request, response) => {
  response.json({ ok: true });
});

router.get("/home", async (request, response) => {
  const [contactDetails, gallery, reviews] = await Promise.all([
    prisma.contactDetails.findUnique({ where: { id: 1 } }),
    prisma.gallery.findMany({
      orderBy: { sortOrder: "asc" },
      select: galleryPublicSelect,
    }),
    prisma.review.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  response.json({
    siteConfig: contactDetails,
    contactDetails,
    gallery,
    reviews,
  });
});

router.get("/content", async (request, response) => {
  const [
    contactDetails,
    cateringMenus,
    rentalItems,
    gallery,
    reviews,
  ] = await Promise.all([
    prisma.contactDetails.findUnique({ where: { id: 1 } }),
    prisma.cateringMenu.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.rentalItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.gallery.findMany({
      orderBy: { sortOrder: "asc" },
      select: galleryPublicSelect,
    }),
    prisma.review.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  response.json({
    siteConfig: contactDetails,
    contactDetails,
    foodPackages: cateringMenus,
    cateringMenus,
    rentalItems,
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

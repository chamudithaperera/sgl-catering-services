const express = require("express");
const { prisma } = require("../config/prisma");
const { contactMessageSchema } = require("../utils/validators");

const router = express.Router();

router.get("/health", (request, response) => {
  response.json({ ok: true });
});

router.get("/content", async (request, response) => {
  const [
    siteConfig,
    benefits,
    services,
    foodPackages,
    rentalItems,
    rentalPrices,
    rentalPackages,
    gallery,
    reviews,
  ] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.benefit.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.foodPackage.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.rentalItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.rentalPrice.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.rentalPackage.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.review.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  response.json({
    siteConfig,
    benefits,
    services,
    foodPackages,
    rentalItems,
    rentalPrices,
    rentalPackages,
    gallery,
    reviews,
  });
});

router.post("/inquiries", async (request, response) => {
  const data = contactMessageSchema.parse(request.body);

  const inquiry = await prisma.contactMessage.create({ data });

  response.status(201).json({
    message: "Inquiry received successfully",
    inquiryId: inquiry.id,
  });
});

module.exports = { publicRoutes: router };


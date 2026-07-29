const express = require("express");
const { prisma } = require("../config/prisma");
const { contactMessageSchema } = require("../utils/validators");
const { mergeWebTextFallback, webTextDefaults } = require("../utils/webTextDefaults");

const router = express.Router();
const webTextKeys = Object.keys(webTextDefaults);

const galleryPublicSelect = {
  title: true,
  imageUrl: true,
  sortOrder: true,
};

const webImagePublicSelect = {
  title: true,
  imageUrl: true,
  sortOrder: true,
};

const webTextPublicSelect = {
  textKey: true,
  titleSinhala: true,
  titleEnglish: true,
  descriptionSinhala: true,
  descriptionEnglish: true,
};

function groupWebImages(webImages) {
  return webImages.reduce(
    (groups, item) => {
      if (item.imageKey === "banner") {
        groups.bannerImages.push(item);
      } else if (item.imageKey === "about") {
        groups.aboutImages.push(item);
      } else if (item.imageKey === "services") {
        groups.serviceImages.push(item);
      }

      return groups;
    },
    {
      bannerImages: [],
      aboutImages: [],
      serviceImages: [],
    },
  );
}

function groupWebTexts(webTexts) {
  return webTextKeys.reduce((groups, textKey) => {
    const item = webTexts.find((candidate) => candidate.textKey === textKey);
    groups[textKey] = mergeWebTextFallback(textKey, item);
    return groups;
  }, {});
}

router.get("/health", (request, response) => {
  response.json({ ok: true });
});

router.get("/home", async (request, response) => {
  const [contactDetails, gallery, webImages, webTexts, reviews] = await Promise.all([
    prisma.contactDetails.findUnique({ where: { id: 1 } }),
    prisma.gallery.findMany({
      orderBy: { sortOrder: "asc" },
      select: galleryPublicSelect,
    }),
    prisma.webImage.findMany({
      where: { imageKey: { in: ["banner", "about", "services"] } },
      orderBy: [{ imageKey: "asc" }, { sortOrder: "asc" }],
      select: {
        imageKey: true,
        ...webImagePublicSelect,
      },
    }),
    prisma.webText.findMany({
      where: { textKey: { in: webTextKeys } },
      select: webTextPublicSelect,
    }),
    prisma.review.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  const groupedImages = groupWebImages(webImages);
  const groupedTexts = groupWebTexts(webTexts);

  response.json({
    siteConfig: contactDetails,
    contactDetails,
    ...groupedImages,
    webTexts: groupedTexts,
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
    webImages,
    webTexts,
    reviews,
  ] = await Promise.all([
    prisma.contactDetails.findUnique({ where: { id: 1 } }),
    prisma.cateringMenu.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.rentalItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.gallery.findMany({
      orderBy: { sortOrder: "asc" },
      select: galleryPublicSelect,
    }),
    prisma.webImage.findMany({
      where: { imageKey: { in: ["banner", "about", "services"] } },
      orderBy: [{ imageKey: "asc" }, { sortOrder: "asc" }],
      select: {
        imageKey: true,
        ...webImagePublicSelect,
      },
    }),
    prisma.webText.findMany({
      where: { textKey: { in: webTextKeys } },
      select: webTextPublicSelect,
    }),
    prisma.review.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  const groupedImages = groupWebImages(webImages);
  const groupedTexts = groupWebTexts(webTexts);

  response.json({
    siteConfig: contactDetails,
    contactDetails,
    ...groupedImages,
    webTexts: groupedTexts,
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

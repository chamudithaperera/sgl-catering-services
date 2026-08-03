const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const convertHeic = require("heic-convert");
const sharp = require("sharp");
const { prisma } = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");
const {
  siteConfigSchema,
  foodPackageSchema,
  rentalItemSchema,
  galleryItemSchema,
  whyChooseItemSchema,
  webImageSchema,
  webTextSchema,
  reviewSchema,
} = require("../utils/validators");
const { buildWebTextFallback, mergeWebTextFallback, webTextDefaults } = require("../utils/webTextDefaults");

const uploadsDirectory = path.resolve(__dirname, "../../uploads");

if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory, { recursive: true });
}

const acceptedImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif", ".bmp", ".heic", ".heif", ".tif", ".tiff"]);
const heicImageExtensions = new Set([".heic", ".heif"]);
const heicImageMimeTypes = new Set(["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"]);
const passthroughImageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"]);
const passthroughImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);

function getImageExtension(fileName = "") {
  return path.extname(fileName).toLowerCase();
}

function isAcceptedImageUpload(file) {
  const mimeType = String(file.mimetype || "").toLowerCase();
  const extension = getImageExtension(file.originalname);

  return mimeType.startsWith("image/") || acceptedImageExtensions.has(extension);
}

function shouldKeepOriginalUpload(file) {
  const mimeType = String(file.mimetype || "").toLowerCase();
  const extension = getImageExtension(file.originalname);

  return passthroughImageMimeTypes.has(mimeType) || passthroughImageExtensions.has(extension);
}

function isHeicUpload(file) {
  const mimeType = String(file.mimetype || "").toLowerCase();
  const extension = getImageExtension(file.originalname);

  return heicImageMimeTypes.has(mimeType) || heicImageExtensions.has(extension);
}

async function normalizeUploadedImage(file) {
  if (shouldKeepOriginalUpload(file)) {
    return file;
  }

  const convertedFileName = `${path.parse(file.filename).name}.jpg`;
  const convertedFilePath = path.join(uploadsDirectory, convertedFileName);

  try {
    if (isHeicUpload(file)) {
      const inputBuffer = await fs.promises.readFile(file.path);
      const convertedBuffer = await convertHeic({
        buffer: inputBuffer,
        format: "JPEG",
        quality: 0.9,
      });

      await sharp(convertedBuffer)
        .flatten({ background: "#ffffff" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(convertedFilePath);
    } else {
      await sharp(file.path)
        .rotate()
        .flatten({ background: "#ffffff" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(convertedFilePath);
    }

    await fs.promises.unlink(file.path);

    return {
      ...file,
      filename: convertedFileName,
      mimetype: "image/jpeg",
      path: convertedFilePath,
    };
  } catch (error) {
    await fs.promises.rm(convertedFilePath, { force: true });
    throw new Error("This image format could not be processed for the website.");
  }
}

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename: (request, file, callback) => {
    const extension = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_.]/g, "")
      .toLowerCase()}${extension && file.originalname.toLowerCase().endsWith(extension.toLowerCase()) ? "" : extension}`;
    callback(null, fileName);
  },
});

const upload = multer({
  fileFilter: (request, file, callback) => {
    if (!isAcceptedImageUpload(file)) {
      callback(new Error("Only image uploads are allowed"));
      return;
    }

    callback(null, true);
  },
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  storage,
});
const router = express.Router();

const reorderModels = {
  foodPackages: prisma.cateringMenu,
  rentalItems: prisma.rentalItem,
  bannerImages: prisma.webImage,
  aboutImages: prisma.webImage,
  serviceImages: prisma.webImage,
  galleryItems: prisma.gallery,
  whyChooseItems: prisma.whyChooseItem,
  reviews: prisma.review,
};

const webImageGroups = {
  bannerImages: { imageKey: "banner", maxItems: 5 },
  aboutImages: { imageKey: "about", maxItems: 1 },
  serviceImages: { imageKey: "services", maxItems: 2 },
};
const webTextKeys = new Set(Object.keys(webTextDefaults));

const galleryAdminSelect = {
  id: true,
  title: true,
  imageUrl: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
};

const whyChooseAdminSelect = {
  id: true,
  titleSinhala: true,
  titleEnglish: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
};

const webImageAdminSelect = {
  id: true,
  imageKey: true,
  title: true,
  imageUrl: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
};

const webTextAdminSelect = {
  id: true,
  textKey: true,
  titleSinhala: true,
  titleEnglish: true,
  descriptionSinhala: true,
  descriptionEnglish: true,
  createdAt: true,
  updatedAt: true,
};

router.use(requireAuth);

router.get("/dashboard", async (request, response) => {
  const [
    foodPackages,
    rentalItems,
    bannerImages,
    aboutImages,
    serviceImages,
    webTexts,
    galleryItems,
    whyChooseItems,
    reviews,
    pendingReviews,
    contactMessages,
    unreadMessages,
  ] = await Promise.all([
    prisma.cateringMenu.count(),
    prisma.rentalItem.count(),
    prisma.webImage.count({ where: { imageKey: "banner" } }),
    prisma.webImage.count({ where: { imageKey: "about" } }),
    prisma.webImage.count({ where: { imageKey: "services" } }),
    prisma.webText.count(),
    prisma.gallery.count(),
    prisma.whyChooseItem.count(),
    prisma.review.count(),
    prisma.review.count({ where: { isApproved: false } }),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
  ]);

  response.json({
    foodPackages,
    rentalItems,
    bannerImages,
    aboutImages,
    serviceImages,
    webTexts,
    webImages: bannerImages + aboutImages + serviceImages + galleryItems,
    galleryItems,
    whyChooseItems,
    reviews,
    pendingReviews,
    contactMessages,
    unreadMessages,
  });
});

router.post("/upload", upload.single("image"), async (request, response) => {
  if (!request.file) {
    return response.status(400).json({ message: "No file uploaded" });
  }

  const processedFile = await normalizeUploadedImage(request.file);
  const fileUrl = `${request.protocol}://${request.get("host")}/uploads/${processedFile.filename}`;

  response.status(201).json({
    url: fileUrl,
    filename: processedFile.filename,
  });
});

router.patch("/reorder", async (request, response) => {
  const { resource, orderedIds } = request.body;
  const model = reorderModels[resource];

  if (!model || !Array.isArray(orderedIds)) {
    return response.status(400).json({ message: "Invalid reorder request" });
  }

  const webImageGroup = webImageGroups[resource];

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      webImageGroup
        ? model.updateMany({
            where: { id: Number(id), imageKey: webImageGroup.imageKey },
            data: { sortOrder: index + 1 },
          })
        : model.update({
            where: { id: Number(id) },
            data: { sortOrder: index + 1 },
          }),
    ),
  );

  response.json({ ok: true });
});

router.get("/site-config", async (request, response) => {
  const item = await prisma.contactDetails.findUnique({ where: { id: 1 } });
  response.json(item);
});

router.put("/site-config", async (request, response) => {
  const data = siteConfigSchema.parse(request.body);
  const item = await prisma.contactDetails.upsert({
    where: { id: 1 },
    update: data,
    create: {
      id: 1,
      ...data,
    },
  });
  response.json(item);
});

router.get("/food-packages", async (request, response) => {
  const items = await prisma.cateringMenu.findMany({ orderBy: { sortOrder: "asc" } });
  response.json(items);
});

router.post("/food-packages", async (request, response) => {
  const data = foodPackageSchema.parse(request.body);
  const item = await prisma.cateringMenu.create({ data });
  response.status(201).json(item);
});

router.put("/food-packages/:id", async (request, response) => {
  const data = foodPackageSchema.parse(request.body);
  const item = await prisma.cateringMenu.update({
    where: { id: Number(request.params.id) },
    data,
  });
  response.json(item);
});

router.delete("/food-packages/:id", async (request, response) => {
  await prisma.cateringMenu.delete({ where: { id: Number(request.params.id) } });
  response.status(204).send();
});

router.get("/rental-items", async (request, response) => {
  const items = await prisma.rentalItem.findMany({ orderBy: { sortOrder: "asc" } });
  response.json(items);
});

router.post("/rental-items", async (request, response) => {
  const data = rentalItemSchema.parse(request.body);
  const item = await prisma.rentalItem.create({ data });
  response.status(201).json(item);
});

router.put("/rental-items/:id", async (request, response) => {
  const data = rentalItemSchema.parse(request.body);
  const item = await prisma.rentalItem.update({
    where: { id: Number(request.params.id) },
    data,
  });
  response.json(item);
});

router.delete("/rental-items/:id", async (request, response) => {
  await prisma.rentalItem.delete({ where: { id: Number(request.params.id) } });
  response.status(204).send();
});

router.get("/web-images/:resource", async (request, response) => {
  const group = webImageGroups[request.params.resource];

  if (!group) {
    return response.status(404).json({ message: "Unknown web image group" });
  }

  const items = await prisma.webImage.findMany({
    where: { imageKey: group.imageKey },
    orderBy: { sortOrder: "asc" },
    select: webImageAdminSelect,
  });

  response.json(items);
});

router.post("/web-images/:resource", async (request, response) => {
  const group = webImageGroups[request.params.resource];

  if (!group) {
    return response.status(404).json({ message: "Unknown web image group" });
  }

  const currentCount = await prisma.webImage.count({ where: { imageKey: group.imageKey } });

  if (currentCount >= group.maxItems) {
    return response.status(400).json({ message: `You can add up to ${group.maxItems} image${group.maxItems === 1 ? "" : "s"} here.` });
  }

  const data = webImageSchema.parse(request.body);
  const item = await prisma.webImage.create({
    data: {
      ...data,
      imageKey: group.imageKey,
    },
    select: webImageAdminSelect,
  });

  response.status(201).json(item);
});

router.put("/web-images/:resource/:id", async (request, response) => {
  const group = webImageGroups[request.params.resource];

  if (!group) {
    return response.status(404).json({ message: "Unknown web image group" });
  }

  const data = webImageSchema.parse(request.body);
  const existingItem = await prisma.webImage.findFirst({
    where: { id: Number(request.params.id), imageKey: group.imageKey },
    select: { id: true },
  });

  if (!existingItem) {
    return response.status(404).json({ message: "Image not found" });
  }

  const item = await prisma.webImage.update({
    where: { id: existingItem.id },
    data,
    select: webImageAdminSelect,
  });

  response.json(item);
});

router.delete("/web-images/:resource/:id", async (request, response) => {
  const group = webImageGroups[request.params.resource];

  if (!group) {
    return response.status(404).json({ message: "Unknown web image group" });
  }

  const existingItem = await prisma.webImage.findFirst({
    where: { id: Number(request.params.id), imageKey: group.imageKey },
    select: { id: true },
  });

  if (!existingItem) {
    return response.status(404).json({ message: "Image not found" });
  }

  await prisma.webImage.delete({ where: { id: existingItem.id } });
  response.status(204).send();
});

router.get("/web-texts/:textKey", async (request, response) => {
  const { textKey } = request.params;

  if (!webTextKeys.has(textKey)) {
    return response.status(404).json({ message: "Unknown web text section" });
  }

  const item = await prisma.webText.findUnique({
    where: { textKey },
    select: webTextAdminSelect,
  });

  response.json(mergeWebTextFallback(textKey, item));
});

router.put("/web-texts/:textKey", async (request, response) => {
  const { textKey } = request.params;

  if (!webTextKeys.has(textKey)) {
    return response.status(404).json({ message: "Unknown web text section" });
  }

  const data = webTextSchema.parse(request.body);
  const item = await prisma.webText.upsert({
    where: { textKey },
    update: data,
    create: {
      ...buildWebTextFallback(textKey),
      ...data,
      textKey,
    },
    select: webTextAdminSelect,
  });

  response.json(item);
});

router.get("/gallery-items", async (request, response) => {
  const items = await prisma.gallery.findMany({
    orderBy: { sortOrder: "asc" },
    select: galleryAdminSelect,
  });
  response.json(items);
});

router.post("/gallery-items", async (request, response) => {
  const data = galleryItemSchema.parse(request.body);
  const item = await prisma.gallery.create({
    data,
    select: galleryAdminSelect,
  });
  response.status(201).json(item);
});

router.put("/gallery-items/:id", async (request, response) => {
  const data = galleryItemSchema.parse(request.body);
  const item = await prisma.gallery.update({
    where: { id: Number(request.params.id) },
    data,
    select: galleryAdminSelect,
  });
  response.json(item);
});

router.delete("/gallery-items/:id", async (request, response) => {
  await prisma.gallery.delete({ where: { id: Number(request.params.id) } });
  response.status(204).send();
});

router.get("/why-choose-items", async (request, response) => {
  const items = await prisma.whyChooseItem.findMany({
    orderBy: { sortOrder: "asc" },
    select: whyChooseAdminSelect,
  });
  response.json(items);
});

router.post("/why-choose-items", async (request, response) => {
  const data = whyChooseItemSchema.parse(request.body);
  const item = await prisma.whyChooseItem.create({
    data,
    select: whyChooseAdminSelect,
  });
  response.status(201).json(item);
});

router.put("/why-choose-items/:id", async (request, response) => {
  const data = whyChooseItemSchema.parse(request.body);
  const item = await prisma.whyChooseItem.update({
    where: { id: Number(request.params.id) },
    data,
    select: whyChooseAdminSelect,
  });
  response.json(item);
});

router.delete("/why-choose-items/:id", async (request, response) => {
  await prisma.whyChooseItem.delete({ where: { id: Number(request.params.id) } });
  response.status(204).send();
});

router.get("/reviews", async (request, response) => {
  const items = await prisma.review.findMany({ orderBy: { sortOrder: "asc" } });
  response.json(items);
});

router.post("/reviews", async (request, response) => {
  const data = reviewSchema.parse(request.body);
  const item = await prisma.review.create({
    data: {
      ...data,
      isApproved: true,
    },
  });
  response.status(201).json(item);
});

router.put("/reviews/:id", async (request, response) => {
  const data = reviewSchema.parse(request.body);
  const existingItem = await prisma.review.findUnique({
    where: { id: Number(request.params.id) },
    select: { isApproved: true },
  });

  if (!existingItem) {
    return response.status(404).json({ message: "Review not found" });
  }

  const item = await prisma.review.update({
    where: { id: Number(request.params.id) },
    data: {
      ...data,
      isApproved: existingItem.isApproved,
    },
  });
  response.json(item);
});

router.patch("/reviews/:id/approve", async (request, response) => {
  const item = await prisma.review.update({
    where: { id: Number(request.params.id) },
    data: { isApproved: true },
  });
  response.json(item);
});

router.delete("/reviews/:id", async (request, response) => {
  await prisma.review.delete({ where: { id: Number(request.params.id) } });
  response.status(204).send();
});

router.get("/contact-messages", async (request, response) => {
  const items = await prisma.message.findMany({
    orderBy: [{ isRead: "asc" }, { createdAt: "desc" }],
  });
  response.json(items);
});

router.patch("/contact-messages/:id/read", async (request, response) => {
  const item = await prisma.message.update({
    where: { id: Number(request.params.id) },
    data: { isRead: Boolean(request.body.isRead) },
  });
  response.json(item);
});

router.delete("/contact-messages/:id", async (request, response) => {
  await prisma.message.delete({ where: { id: Number(request.params.id) } });
  response.status(204).send();
});

module.exports = { adminRoutes: router };

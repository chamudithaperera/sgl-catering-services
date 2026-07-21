const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const { prisma } = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");
const {
  siteConfigSchema,
  foodPackageSchema,
  rentalItemSchema,
  galleryItemSchema,
  reviewSchema,
} = require("../utils/validators");

const uploadsDirectory = path.resolve(__dirname, "../../uploads");

if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory, { recursive: true });
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
    if (!file.mimetype.startsWith("image/")) {
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
  galleryItems: prisma.gallery,
  reviews: prisma.review,
};

const galleryAdminSelect = {
  id: true,
  title: true,
  imageUrl: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
};

router.use(requireAuth);

router.get("/dashboard", async (request, response) => {
  const [
    foodPackages,
    rentalItems,
    galleryItems,
    reviews,
    contactMessages,
    unreadMessages,
  ] = await Promise.all([
    prisma.cateringMenu.count(),
    prisma.rentalItem.count(),
    prisma.gallery.count(),
    prisma.review.count(),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
  ]);

  response.json({
    foodPackages,
    rentalItems,
    galleryItems,
    reviews,
    contactMessages,
    unreadMessages,
  });
});

router.post("/upload", upload.single("image"), (request, response) => {
  if (!request.file) {
    return response.status(400).json({ message: "No file uploaded" });
  }

  const fileUrl = `${request.protocol}://${request.get("host")}/uploads/${request.file.filename}`;

  response.status(201).json({
    url: fileUrl,
    filename: request.file.filename,
  });
});

router.patch("/reorder", async (request, response) => {
  const { resource, orderedIds } = request.body;
  const model = reorderModels[resource];

  if (!model || !Array.isArray(orderedIds)) {
    return response.status(400).json({ message: "Invalid reorder request" });
  }

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      model.update({
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

router.get("/reviews", async (request, response) => {
  const items = await prisma.review.findMany({ orderBy: { sortOrder: "asc" } });
  response.json(items);
});

router.post("/reviews", async (request, response) => {
  const data = reviewSchema.parse(request.body);
  const item = await prisma.review.create({ data });
  response.status(201).json(item);
});

router.put("/reviews/:id", async (request, response) => {
  const data = reviewSchema.parse(request.body);
  const item = await prisma.review.update({
    where: { id: Number(request.params.id) },
    data,
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

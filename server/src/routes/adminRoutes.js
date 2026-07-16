const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const { prisma } = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");
const {
  serviceSchema,
  foodPackageSchema,
  rentalItemSchema,
  galleryItemSchema,
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

const upload = multer({ storage });
const router = express.Router();

router.use(requireAuth);

router.get("/dashboard", async (request, response) => {
  const [services, foodPackages, rentalItems, galleryItems] = await Promise.all([
    prisma.service.count(),
    prisma.foodPackage.count(),
    prisma.rentalItem.count(),
    prisma.galleryItem.count(),
  ]);

  response.json({
    services,
    foodPackages,
    rentalItems,
    galleryItems,
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

router.get("/services", async (request, response) => {
  const items = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  response.json(items);
});

router.post("/services", async (request, response) => {
  const data = serviceSchema.parse(request.body);
  const item = await prisma.service.create({ data });
  response.status(201).json(item);
});

router.put("/services/:id", async (request, response) => {
  const data = serviceSchema.parse(request.body);
  const item = await prisma.service.update({
    where: { id: Number(request.params.id) },
    data,
  });
  response.json(item);
});

router.delete("/services/:id", async (request, response) => {
  await prisma.service.delete({ where: { id: Number(request.params.id) } });
  response.status(204).send();
});

router.get("/food-packages", async (request, response) => {
  const items = await prisma.foodPackage.findMany({ orderBy: { sortOrder: "asc" } });
  response.json(items);
});

router.post("/food-packages", async (request, response) => {
  const data = foodPackageSchema.parse(request.body);
  const item = await prisma.foodPackage.create({ data });
  response.status(201).json(item);
});

router.put("/food-packages/:id", async (request, response) => {
  const data = foodPackageSchema.parse(request.body);
  const item = await prisma.foodPackage.update({
    where: { id: Number(request.params.id) },
    data,
  });
  response.json(item);
});

router.delete("/food-packages/:id", async (request, response) => {
  await prisma.foodPackage.delete({ where: { id: Number(request.params.id) } });
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
  const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  response.json(items);
});

router.post("/gallery-items", async (request, response) => {
  const data = galleryItemSchema.parse(request.body);
  const item = await prisma.galleryItem.create({ data });
  response.status(201).json(item);
});

router.put("/gallery-items/:id", async (request, response) => {
  const data = galleryItemSchema.parse(request.body);
  const item = await prisma.galleryItem.update({
    where: { id: Number(request.params.id) },
    data,
  });
  response.json(item);
});

router.delete("/gallery-items/:id", async (request, response) => {
  await prisma.galleryItem.delete({ where: { id: Number(request.params.id) } });
  response.status(204).send();
});

module.exports = { adminRoutes: router };


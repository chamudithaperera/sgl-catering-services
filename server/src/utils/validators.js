const { z } = require("zod");

const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const foodPackageSchema = z.object({
  name: z.string().min(2),
  summary: z.string().min(10),
  priceLabel: z.string().min(2),
  includedItems: z
    .union([z.array(z.string().min(1)), z.string()])
    .transform((value) =>
      Array.isArray(value)
        ? value.map((item) => item.trim()).filter(Boolean)
        : value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
    ),
  featured: z.coerce.boolean().default(false),
  ctaLabel: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const rentalItemSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(2),
  imageUrl: z.string().min(2),
  priceLabel: z.string().min(2),
  availableQuantity: z.coerce.number().int().min(0),
  status: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const galleryItemSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  imageUrl: z.string().min(2),
  featured: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const contactMessageSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(7),
  eventType: z.string().min(2),
  serviceNeeded: z.string().min(2),
  eventDate: z.string().min(2),
  guestCount: z.string().min(1),
  location: z.string().min(2),
  message: z.string().min(10),
});

module.exports = {
  serviceSchema,
  foodPackageSchema,
  rentalItemSchema,
  galleryItemSchema,
  contactMessageSchema,
};


const { z } = require("zod");

function textLines(value) {
  return Array.isArray(value)
    ? value.map((item) => item.trim()).filter(Boolean)
    : String(value || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
}

const siteConfigSchema = z.object({
  phone: z.string().min(2),
  whatsapp: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(2),
  businessHours: z.string().min(2),
  mapUrl: z.string().min(2),
  facebookUrl: z.string().min(2),
  instagramUrl: z.string().min(2),
});

const eventCategorySchema = z.object({
  title: z.string().min(2),
  shortLabel: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().min(2),
  highlights: z.union([z.array(z.string().min(1)), z.string()]).transform(textLines),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const foodPackageSchema = z.object({
  categoryId: z
    .union([z.coerce.number().int().positive(), z.literal(""), z.null(), z.undefined()])
    .transform((value) => (value === "" || value === null || value === undefined ? null : value)),
  name: z.string().min(2),
  summary: z.string().min(10),
  priceLabel: z.string().min(2),
  includedItems: z.union([z.array(z.string().min(1)), z.string()]).transform(textLines),
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

const rentalPackageSchema = z.object({
  name: z.string().min(2),
  summary: z.string().min(10),
  priceLabel: z.string().min(2),
  items: z.union([z.array(z.string().min(1)), z.string()]).transform(textLines),
  ctaLabel: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const galleryItemSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  imageUrl: z.string().min(2),
  featured: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const reviewSchema = z.object({
  customerName: z.string().min(2),
  eventType: z.string().min(2),
  rating: z.coerce.number().int().min(1).max(5),
  quote: z.string().min(10),
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
  siteConfigSchema,
  eventCategorySchema,
  foodPackageSchema,
  rentalItemSchema,
  rentalPackageSchema,
  galleryItemSchema,
  reviewSchema,
  contactMessageSchema,
};

const { z } = require("zod");

function textLines(value) {
  return Array.isArray(value)
    ? value.map((item) => item.trim()).filter(Boolean)
    : String(value || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
}

function normalizeGoogleMapEmbedUrl(value) {
  const rawValue = String(value || "")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#34;", "\"")
    .replaceAll("&amp;", "&")
    .trim();
  const quotedSrcMatch = rawValue.match(/src\s*=\s*["']([^"']+)["']/i);
  const looseSrcMatch = rawValue.match(/src\s*=\s*["']?(https?:\/\/[^\s"'>]+)/i);
  const url = (quotedSrcMatch?.[1] || looseSrcMatch?.[1] || rawValue).trim();

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.endsWith("google.com") && parsedUrl.pathname === "/maps/embed") {
      return parsedUrl.toString();
    }
  } catch {
    return rawValue;
  }

  return rawValue;
}

const siteConfigSchema = z.object({
  phone: z.string().min(2),
  whatsapp: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(2),
  businessHours: z.string().min(2),
  mapUrl: z.string().min(2).transform(normalizeGoogleMapEmbedUrl),
  facebookUrl: z.string().min(2),
  instagramUrl: z.string().min(2),
});

const foodPackageSchema = z.object({
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
  category: z.string().min(2),
  imageUrl: z.string().optional().default(""),
  priceLabel: z.string().min(2),
  details: z.string().optional().default(""),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

const galleryItemSchema = z.object({
  title: z.string().min(2),
  imageUrl: z.string().min(2),
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
  foodPackageSchema,
  rentalItemSchema,
  galleryItemSchema,
  reviewSchema,
  contactMessageSchema,
};

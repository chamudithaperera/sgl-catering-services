import { useEffect } from "react";
import { buildSiteUrl } from "../lib/seo";

const defaultImage = "/assets/sgl-images/hero-buffet.jpg";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function Seo({
  title,
  description,
  canonicalPath = "/",
  image = defaultImage,
  keywords = [],
  structuredData,
}) {
  useEffect(() => {
    const canonicalUrl = buildSiteUrl(canonicalPath);
    const imageUrl = buildSiteUrl(image);

    document.title = title;
    upsertCanonical(canonicalUrl);
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    upsertMeta('meta[name="author"]', { name: "author", content: "SGL Catering Service" });

    if (keywords.length > 0) {
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords.join(", ") });
    }

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "SGL Catering Service",
    });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });

    const existingStructuredData = document.head.querySelector("#sgl-local-business-schema");
    existingStructuredData?.remove();

    if (structuredData) {
      const script = document.createElement("script");
      script.id = "sgl-local-business-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [canonicalPath, description, image, keywords, structuredData, title]);

  return null;
}

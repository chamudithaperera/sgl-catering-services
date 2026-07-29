import { useEffect } from "react";
import { buildSiteUrl } from "../lib/seo";

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

function removeElement(selector) {
  document.head.querySelector(selector)?.remove();
}

export function Seo({
  title,
  description,
  canonicalPath = "/",
  image = "",
  keywords = [],
  siteName = "",
  structuredData,
}) {
  useEffect(() => {
    const canonicalUrl = buildSiteUrl(canonicalPath);
    const imageUrl = image ? buildSiteUrl(image) : "";

    if (title) {
      document.title = title;
    }
    upsertCanonical(canonicalUrl);
    if (description) {
      upsertMeta('meta[name="description"]', { name: "description", content: description });
    } else {
      removeElement('meta[name="description"]');
    }
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    if (siteName) {
      upsertMeta('meta[name="author"]', { name: "author", content: siteName });
    } else {
      removeElement('meta[name="author"]');
    }

    if (keywords.length > 0) {
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords.join(", ") });
    } else {
      removeElement('meta[name="keywords"]');
    }

    if (title) {
      upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
      upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    } else {
      removeElement('meta[property="og:title"]');
      removeElement('meta[name="twitter:title"]');
    }

    if (description) {
      upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
      upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    } else {
      removeElement('meta[property="og:description"]');
      removeElement('meta[name="twitter:description"]');
    }

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    if (siteName) {
      upsertMeta('meta[property="og:site_name"]', {
        property: "og:site_name",
        content: siteName,
      });
    } else {
      removeElement('meta[property="og:site_name"]');
    }
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });

    if (imageUrl) {
      upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
    } else {
      removeElement('meta[property="og:image"]');
      removeElement('meta[name="twitter:image"]');
    }

    const existingStructuredData = document.head.querySelector("#local-business-schema");
    existingStructuredData?.remove();

    if (structuredData) {
      const script = document.createElement("script");
      script.id = "local-business-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [canonicalPath, description, image, keywords, siteName, structuredData, title]);

  return null;
}

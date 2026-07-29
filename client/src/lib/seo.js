const siteUrl = import.meta.env.VITE_SITE_URL || globalThis.location?.origin || "http://localhost";

export function buildSiteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

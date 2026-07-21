const siteUrl = "https://sglcateringservice.lk";

export function buildSiteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

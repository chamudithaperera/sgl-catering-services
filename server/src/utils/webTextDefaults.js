const webTextKeys = [
  "hero",
  "about",
  "services",
  "serviceCatering",
  "serviceRental",
  "gallery",
  "reviews",
  "contact",
];

const webTextDefaults = Object.fromEntries(
  webTextKeys.map((textKey) => [
    textKey,
    {
      textKey,
      titleSinhala: "",
      titleEnglish: "",
      descriptionSinhala: "",
      descriptionEnglish: "",
    },
  ]),
);

function buildWebTextFallback(textKey) {
  return webTextDefaults[textKey] || null;
}

module.exports = {
  webTextDefaults,
  buildWebTextFallback,
};

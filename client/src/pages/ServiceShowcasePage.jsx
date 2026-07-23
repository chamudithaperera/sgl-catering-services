import { useEffect, useMemo, useState } from "react";
import { PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { api } from "../lib/api";
import { responsiveImageProps } from "../lib/imagePerformance";
import { buildSiteUrl } from "../lib/seo";
import "./ServiceShowcasePage.css";

const contactPhone = "+94703324500";
const contactEmail = "sudathjayathilakabs@gmail.com";
const whatsappHref = `https://wa.me/${contactPhone.replace(/[^\d]/g, "")}`;

function PhoneIcon({ size = 20 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.517 16.379l-5.07-2.173a1.086 1.086 0 00-1.268.312l-2.245 2.743A16.78 16.78 0 015.912 9.24l2.744-2.245a1.084 1.084 0 00.312-1.268L6.795.657A1.094 1.094 0 005.55.028L.842 1.114A1.086 1.086 0 000 2.173 21 21 0 0021.005 23.178a1.086 1.086 0 001.059-.842l1.086-4.708a1.1 1.1 0 00-.633-1.249Z" />
    </svg>
  );
}

function GmailIcon({ size = 20 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const primaryLinks = [
  { label: "මුල් පිටුව", href: "/" },
  { label: "කේටරින්", href: "/catering", type: "catering" },
  { label: "කුලී භාණ්ඩ", href: "/renting", type: "renting" },
];

function SectionHead({ eyebrow, title, description, light = false, center = false }) {
  return (
    <div className={`service-section-head${light ? " is-light" : ""}${center ? " is-center" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function BannerSection({ page }) {
  return (
    <section className="service-banner">
      <div className="service-banner-media" aria-hidden="true">
        <img {...responsiveImageProps(page.image, "100vw")} alt="" loading="eager" decoding="async" fetchPriority="high" />
      </div>
      <div className="service-banner-overlay" aria-hidden="true" />

      <div className="service-page-shell service-banner-shell">
        <div className="service-banner-copy">
          <span>{page.eyebrow}</span>
          <h1>
            <span>{page.title}</span>
            {page.englishTitle ? <small>{page.englishTitle}</small> : null}
          </h1>
          <p>{page.description}</p>

          <div className="service-banner-actions">
            <a className="service-banner-button" href={`tel:${contactPhone}`}>
              <PhoneCall size={18} />
              <span>අමතන්න</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CateringMenuCard({ item }) {
  const includedItems = item.includedItems || [];

  return (
    <article className={`service-catering-menu-card${item.featured ? " is-featured" : ""}`}>
      <div className="service-catering-menu-card-head">
        <div>
          {item.featured ? <small>Popular</small> : null}
          <h3>{item.name}</h3>
        </div>
        <strong>{item.priceLabel}</strong>
      </div>

      {includedItems.length ? (
        <ul>
          {includedItems.map((includedItem) => (
            <li key={includedItem}>{includedItem}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function RentalItemCard({ item }) {
  const imageUrl = item.imageUrl || "/assets/sgl-images/indoor-buffet.jpg";

  return (
    <article className={`service-rental-item-card${item.featured ? " is-featured" : ""}`}>
      <div className="service-rental-item-card-media">
        <img
          {...responsiveImageProps(imageUrl, "(max-width: 720px) 76px, (max-width: 900px) 84px, 90px")}
          alt={item.name}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="service-rental-item-card-head">
        <div>
          <small>{item.category || "Rental Item"}</small>
          <h3>{item.name}</h3>
          {item.details ? <p className="service-rental-item-card-details">{item.details}</p> : null}
        </div>
        <strong>{item.priceLabel}</strong>
      </div>

    </article>
  );
}

function CateringSections({ page }) {
  const menus = page.menus || [];

  return (
    <section className="service-band service-band-ivory service-catering-menu-band" id="menus">
      <div className="service-page-shell">
        <SectionHead
          eyebrow={page.overview.eyebrow}
          title={page.overview.title}
          description={page.overview.description}
          center
        />

        <div className="service-catering-menu-list">
          {menus.map((item) => (
            <CateringMenuCard item={item} key={item.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RentingSections({ page }) {
  const items = page.items || [];

  return (
    <section className="service-band service-band-ivory service-rental-item-band" id="items">
      <div className="service-page-shell">
        <SectionHead
          eyebrow={page.overview.eyebrow}
          title={page.overview.title}
          description={page.overview.description}
          center
        />

        <div className="service-rental-item-list">
          {items.map((item) => (
            <RentalItemCard item={item} key={item.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function buildManagedCateringPage(page, content) {
  const foodPackages = content?.foodPackages || [];

  return {
    ...page,
    heroStats: [
      {
        label: "මෙනු තේරීම්",
        value: `${foodPackages.length}+`,
        note: "විවිධ මෙනු",
      },
      { label: "සැකසුම්", value: "අභිරුචි", note: "අයවැය අනුව" },
      page.heroStats[2],
    ],
    menus: foodPackages.map((item) => ({
      name: item.name,
      priceLabel: item.priceLabel,
      featured: item.featured,
      includedItems: item.includedItems,
    })),
  };
}

function buildManagedRentalPage(page, content) {
  const rentalItems = content?.rentalItems || [];

  return {
    ...page,
    heroStats: [
      { label: "භාණ්ඩ වර්ග", value: `${rentalItems.length}+`, note: "තේරීම් රැසක්" },
      { label: "මිල පරාසය", value: "රු. 20", note: "සිට ඉහළට" },
      page.heroStats[2],
    ],
    items: rentalItems.map((item) => ({
      name: item.name,
      category: item.category,
      imageUrl: item.imageUrl,
      priceLabel: item.priceLabel,
      details: item.details,
    })),
  };
}

function ContactBand({ page, anchorId }) {
  return (
    <section className="service-band service-band-footer" id={anchorId}>
      <div className="service-page-shell">
        <div className="service-contact-panel">
          <div className="service-contact-copy">
            <span>{page.type === "catering" ? "Reservation Desk" : "Rental Booking Desk"}</span>
            <h2>{page.consultation.title}</h2>
            <p>{page.consultation.description}</p>
          </div>

          <div className="service-contact-actions">
            <a className="service-contact-icon-link is-call" href={`tel:${contactPhone}`} aria-label="Call us">
              <PhoneIcon size={22} />
            </a>

            <a
              className="service-contact-icon-link is-whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp us"
            >
              <WhatsAppIcon size={22} />
            </a>

            <a className="service-contact-icon-link is-email" href={`mailto:${contactEmail}`} aria-label="Email us">
              <GmailIcon size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildEmptyManagedPage(page) {
  return page.type === "catering"
    ? {
        ...page,
        heroStats: [
          { label: "මෙනු තේරීම්", value: `${page.menus?.length || 0}+`, note: "විවිධ මෙනු" },
          { label: "සැකසුම්", value: "අභිරුචි", note: "අයවැය අනුව" },
          page.heroStats[2],
        ],
        menus: page.menus || [],
      }
    : {
        ...page,
        heroStats: [
          { label: "භාණ්ඩ වර්ග", value: `${page.items?.length || 0}+`, note: "තේරීම් රැසක්" },
          { label: "මිල පරාසය", value: "රු. 20", note: "සිට ඉහළට" },
          page.heroStats[2],
        ],
        items: page.items || [],
      };
}

export function ServiceShowcasePage({ page }) {
  const [managedPage, setManagedPage] = useState(() => buildEmptyManagedPage(page));
  const anchorId = managedPage.type === "catering" ? "consultation" : "booking";
  const serviceStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": buildSiteUrl(`${managedPage.seo?.canonicalPath || "/"}#service`),
      name:
        managedPage.type === "catering"
          ? "Catering service in Anuradhapura"
          : "Event rentals in Anuradhapura",
      alternateName:
        managedPage.type === "catering"
          ? ["Catering services in Anuradhapura", "Catering services Anuradhapura"]
          : ["Event rental equipment Anuradhapura", "Event rentals in Anuradhapura"],
      serviceType: managedPage.type === "catering" ? "Catering" : "Event rental equipment",
      description: managedPage.seo?.description || managedPage.description,
      url: buildSiteUrl(managedPage.seo?.canonicalPath || "/"),
      image: buildSiteUrl(managedPage.image),
      areaServed: {
        "@type": "City",
        name: "Anuradhapura",
      },
      provider: {
        "@type": "LocalBusiness",
        additionalType: "https://schema.org/FoodService",
        "@id": buildSiteUrl("/#sgl-catering-service"),
        name: "SGL Catering Service",
        url: buildSiteUrl("/"),
        telephone: contactPhone,
        email: contactEmail,
        address: {
          "@type": "PostalAddress",
          streetAddress: "No.360, National Housing, Stage II",
          addressLocality: "Anuradhapura",
          addressCountry: "LK",
        },
      },
    }),
    [managedPage.description, managedPage.image, managedPage.seo, managedPage.type]
  );

  useEffect(() => {
    setManagedPage(buildEmptyManagedPage(page));
  }, [page]);

  useEffect(() => {
    let ignore = false;

    api
      .get("/public/content")
      .then((response) => {
        if (ignore) return;
        setManagedPage(page.type === "catering" ? buildManagedCateringPage(page, response.data) : buildManagedRentalPage(page, response.data));
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      ignore = true;
    };
  }, [page]);

  return (
    <main className={`service-page service-page-${managedPage.type}`}>
      <Seo
        title={managedPage.seo?.title || `${managedPage.title} | SGL Catering Service`}
        description={managedPage.seo?.description || managedPage.description}
        canonicalPath={managedPage.seo?.canonicalPath || "/"}
        image={managedPage.image}
        keywords={managedPage.seo?.keywords || ["sgl catering service", "catering services anuradhapura"]}
        structuredData={serviceStructuredData}
      />
      <header className="service-page-topbar">
        <Link className="service-page-brand" to="/">
          <span className="service-page-brand-logo">
            <img src="/assets/sgl-logo.png" alt="SGL Catering" />
          </span>
        </Link>

        <nav className="service-page-primary-nav" aria-label="Primary">
          {primaryLinks.map((item) => (
            <Link className={item.type === managedPage.type ? "is-active" : ""} key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="service-page-topbar-actions">
          <a className="service-page-call-link" href={`tel:${contactPhone}`}>
            <PhoneCall size={17} />
            <span>Call Now</span>
          </a>
        </div>
      </header>

      <BannerSection page={managedPage} />

      {managedPage.type === "catering" ? <CateringSections page={managedPage} /> : <RentingSections page={managedPage} />}

      <ContactBand anchorId={anchorId} page={managedPage} />

      <footer className="service-page-footer">
        <div className="service-page-footer-shell">
          <p>
            © 2026{" "}
            <a href="https://sglcateringservice.lk/" target="_blank" rel="noreferrer">
              sglcateringservice.lk
            </a>{" "}
            by{" "}
            <a href="https://chamudithaperera.online" target="_blank" rel="noreferrer">
              chamudithaperera.online
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}

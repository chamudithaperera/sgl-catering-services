import { useEffect, useState } from "react";
import { ArrowLeft, Check, Mail, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import "./ServiceShowcasePage.css";

const contactPhone = "+94703324500";
const contactEmail = "sudathjayathilakabs@gmail.com";

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

function PackageCard({ item }) {
  return (
    <article className={`service-package-card${item.featured ? " is-featured" : ""}`}>
      <div className="service-package-card-head">
        <div>
          {item.featured ? <small>Featured</small> : null}
          <h3>{item.name}</h3>
        </div>
        <strong>{item.priceLabel}</strong>
      </div>

      <p>{item.summary}</p>

      <ul className="service-package-card-list">
        {item.includedItems.map((includedItem) => (
          <li key={includedItem}>
            <Check size={16} />
            <span>{includedItem}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function BannerSection({ page, anchorId }) {
  return (
    <section className="service-banner">
      <div className="service-banner-media" aria-hidden="true">
        <img src={page.image} alt="" loading="eager" decoding="async" fetchPriority="high" />
      </div>
      <div className="service-banner-overlay" aria-hidden="true" />

      <div className="service-page-shell service-banner-shell">
        <div className="service-banner-copy">
          <span>{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>

          <div className="service-banner-actions">
            <a className="service-banner-button is-primary" href={`#${anchorId}`}>
              වැඩි විස්තර
            </a>
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

function CateringSections({ page }) {
  const [activeCategoryId, setActiveCategoryId] = useState(() => page.categories[0]?.id ?? "");

  useEffect(() => {
    setActiveCategoryId(page.categories[0]?.id ?? "");
  }, [page]);

  const activeCategory = page.categories.find((category) => category.id === activeCategoryId) ?? page.categories[0];

  return (
    <>
      <section className="service-band service-band-dark" id="categories">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.overview.eyebrow}
            title={page.overview.title}
            description={page.overview.description}
            center
          />

          <div className="service-category-grid">
            {page.categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`service-category-card${category.id === activeCategory.id ? " is-active" : ""}`}
                onClick={() => setActiveCategoryId(category.id)}
              >
                <small>{category.shortLabel}</small>
                <strong>{category.title}</strong>
                <span>{category.packages.length} මෙනු</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="service-band service-band-ivory" id="menus">
        <div className="service-page-shell">
          <div className="service-category-feature">
            <div className="service-category-feature-media">
              <img src={activeCategory.image} alt={activeCategory.title} loading="lazy" decoding="async" />
            </div>

            <div className="service-category-feature-copy">
              <span>{activeCategory.shortLabel}</span>
              <h3>{activeCategory.title}</h3>
              <p>{activeCategory.description}</p>

              <ul className="service-category-feature-list">
                {activeCategory.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="service-menu-grid">
            {activeCategory.packages.map((item) => (
              <PackageCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function RentingSections({ page }) {
  const itemCards = page.itemGroups.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      categoryTitle: group.title,
      categoryDescription: group.description,
    }))
  );

  return (
    <>
      <section className="service-band service-band-dark" id="packages">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.packagesIntro.eyebrow}
            title={page.packagesIntro.title}
            description={page.packagesIntro.description}
            center
          />

          <div className="service-bundle-grid">
            {page.packages.map((item) => (
              <PackageCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="service-band service-band-light" id="items">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.itemGroupsIntro.eyebrow}
            title={page.itemGroupsIntro.title}
            description={page.itemGroupsIntro.description}
            light
            center
          />

          <div className="service-item-card-grid">
            {itemCards.map((item) => (
              <article className="service-item-card" key={`${item.categoryTitle}-${item.name}`}>
                <div className="service-item-card-media">
                  <img src={item.imageUrl} alt={item.name} loading="lazy" decoding="async" />
                </div>

                <div className="service-item-card-body">
                  <small>{item.categoryTitle}</small>
                  <h3>{item.name}</h3>
                  <p>{item.categoryDescription}</p>

                  <div className="service-item-card-meta">
                    <strong>{item.priceLabel}</strong>
                    <span>{item.quantity}</span>
                  </div>

                  <div className={`service-item-card-status${item.status === "ලබාගත හැකියි" ? " is-available" : ""}`}>
                    {item.status}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
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
            <a className="service-banner-button is-primary" href={`tel:${contactPhone}`}>
              <PhoneCall size={18} />
              <span>070 33 24 500</span>
            </a>

            <a className="service-banner-button" href={`mailto:${contactEmail}`}>
              <Mail size={18} />
              <span>විද්‍යුත් තැපෑල</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceShowcasePage({ page }) {
  const anchorId = page.type === "catering" ? "consultation" : "booking";

  return (
    <main className={`service-page service-page-${page.type}`}>
      <header className="service-page-topbar">
        <Link className="service-page-brand" to="/">
          <span>SGL කේටරින් සර්විස්</span>
          <small>Premium Event Catering</small>
        </Link>

        <nav className="service-page-primary-nav" aria-label="Primary">
          {primaryLinks.map((item) => (
            <Link className={item.type === page.type ? "is-active" : ""} key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="service-page-topbar-actions">
          <a className="service-page-call-link" href={`tel:${contactPhone}`}>
            <PhoneCall size={16} />
            <span>අමතන්න</span>
          </a>

          <Link className="service-page-back" to="/">
            <ArrowLeft size={18} />
            <span>මුල් පිටුවට</span>
          </Link>
        </div>
      </header>

      <BannerSection anchorId={anchorId} page={page} />

      {page.type === "catering" ? <CateringSections page={page} /> : <RentingSections page={page} />}

      <ContactBand anchorId={anchorId} page={page} />
    </main>
  );
}

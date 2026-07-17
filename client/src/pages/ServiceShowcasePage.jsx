import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CakeSlice,
  Check,
  House,
  Mail,
  Package,
  PackageSearch,
  PhoneCall,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./ServiceShowcasePage.css";

const contactPhone = "+94703324500";
const contactEmail = "sudathjayathilakabs@gmail.com";

const iconMap = {
  sparkles: Sparkles,
  house: House,
  cake: CakeSlice,
  briefcase: BriefcaseBusiness,
  utensils: UtensilsCrossed,
  package: PackageSearch,
};

const primaryLinks = [
  { label: "මුල් පිටුව", href: "/" },
  { label: "කේටරින්", href: "/catering", type: "catering" },
  { label: "කුලී භාණ්ඩ", href: "/renting", type: "renting" },
];

function ServiceIcon({ iconKey, size = 18 }) {
  const Icon = iconMap[iconKey] || Sparkles;
  return <Icon size={size} />;
}

function SectionHead({ eyebrow, title, description, inverted = false }) {
  return (
    <div className={`service-page-section-head${inverted ? " is-inverted" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function PackageCard({ item, muted = false }) {
  return (
    <article className={`service-package-card${item.featured ? " is-featured" : ""}${muted ? " is-muted" : ""}`}>
      <div className="service-package-card-head">
        <div>
          {item.featured ? <small>Selected Menu</small> : null}
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

function HeroPanel({ page }) {
  const items =
    page.type === "catering"
      ? page.categories.map((category) => ({
          key: category.id,
          label: category.title,
          meta: `${category.packages.length} මෙනු තේරීම්`,
          iconKey: category.iconKey,
        }))
      : page.packages.map((item) => ({
          key: item.name,
          label: item.name,
          meta: item.priceLabel,
          iconKey: "package",
        }));

  return (
    <aside className="service-page-hero-panel">
      <div className="service-page-hero-panel-head">
        <span>{page.type === "catering" ? "Event Lines" : "Rental Lines"}</span>
        <strong>{page.type === "catering" ? "අවස්ථා වර්ග සහ මෙනු" : "Package සහ item pricing"}</strong>
      </div>

      <div className="service-page-hero-panel-list">
        {items.map((item) => (
          <div className="service-page-hero-panel-item" key={item.key}>
            <span className="service-page-mini-icon" aria-hidden="true">
              <ServiceIcon iconKey={item.iconKey} size={16} />
            </span>
            <div>
              <strong>{item.label}</strong>
              <small>{item.meta}</small>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function AnchorBand({ page, anchorId }) {
  return (
    <section className="service-page-anchor-band">
      <div className="service-page-shell service-page-anchor-band-shell">
        <div className="service-page-anchor-copy">
          <span>{page.type === "catering" ? "Curated Service Guide" : "Rental Service Guide"}</span>
          <p>
            {page.type === "catering"
              ? "උත්සව වර්ග අනුව මෙනු සහ මිල පරාසය පහතින් සකස් කර ඇත."
              : "පැකේජ, item-wise rates සහ වෙන්කරවා ගැනීමේ අංශ පහතින් සකස් කර ඇත."}
          </p>
        </div>

        <nav className="service-page-anchor-links" aria-label="Service page sections">
          {page.sectionNav.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          ))}
          <a href={`#${anchorId}`}>අමතන්න</a>
        </nav>
      </div>
    </section>
  );
}

function CateringSections({ page }) {
  return (
    <>
      <section className="service-page-band service-page-band-light" id="categories">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.overview.eyebrow}
            title={page.overview.title}
            description={page.overview.description}
          />

          <div className="service-page-category-index">
            {page.categories.map((category, index) => (
              <a className="service-page-category-index-item" href={`#${category.id}`} key={category.id}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{category.title}</strong>
                <span>{category.packages.length} menus</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="service-page-band service-page-band-ivory" id="menus">
        <div className="service-page-shell">
          {page.categories.map((category, index) => (
            <article className={`service-story${index % 2 === 1 ? " is-reversed" : ""}`} id={category.id} key={category.id}>
              <div className="service-story-visual">
                <img src={category.image} alt={category.title} loading="lazy" decoding="async" />
                <div className="service-story-overlay">
                  <span>{category.shortLabel}</span>
                  <strong>{category.title}</strong>
                </div>
              </div>

              <div className="service-story-copy">
                <div className="service-story-heading">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <span className="service-page-mini-icon is-ivory" aria-hidden="true">
                    <ServiceIcon iconKey={category.iconKey} size={16} />
                  </span>
                  <h3>{category.title}</h3>
                </div>

                <p>{category.description}</p>

                <ul className="service-story-highlights">
                  {category.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="service-story-menu-grid">
                {category.packages.map((item, itemIndex) => (
                  <PackageCard item={item} key={item.name} muted={itemIndex > 0} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function RentingSections({ page }) {
  return (
    <>
      <section className="service-page-band service-page-band-light" id="packages">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.packagesIntro.eyebrow}
            title={page.packagesIntro.title}
            description={page.packagesIntro.description}
          />

          <div className="service-rental-packages">
            {page.packages.map((item, index) => (
              <div className="service-rental-package-slot" key={item.name}>
                <div className="service-rental-package-number">{String(index + 1).padStart(2, "0")}</div>
                <PackageCard item={item} muted={!item.featured} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-page-band service-page-band-dark" id="items">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.itemGroupsIntro.eyebrow}
            title={page.itemGroupsIntro.title}
            description={page.itemGroupsIntro.description}
            inverted
          />

          <div className="service-rates-grid">
            {page.itemGroups.map((group) => (
              <article className="service-rate-group" key={group.title}>
                <header className="service-rate-group-head">
                  <div className="service-rate-group-title">
                    <span className="service-page-mini-icon" aria-hidden="true">
                      <Package size={16} />
                    </span>
                    <h3>{group.title}</h3>
                  </div>
                  <p>{group.description}</p>
                </header>

                <div className="service-rate-table">
                  {group.items.map((item) => (
                    <div className="service-rate-row" key={`${group.title}-${item.name}`}>
                      <div className="service-rate-name">
                        <strong>{item.name}</strong>
                        <span>{item.quantity}</span>
                      </div>
                      <div className="service-rate-price">{item.priceLabel}</div>
                      <div className={`service-rate-status${item.status === "ලබාගත හැකියි" ? " is-available" : ""}`}>
                        {item.status}
                      </div>
                    </div>
                  ))}
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
    <section className="service-page-band service-page-band-footer" id={anchorId}>
      <div className="service-page-shell">
        <div className="service-contact-panel">
          <div className="service-contact-copy">
            <span>{page.type === "catering" ? "Reservation Desk" : "Rental Booking Desk"}</span>
            <h2>{page.consultation.title}</h2>
            <p>{page.consultation.description}</p>
          </div>

          <div className="service-contact-actions">
            <a className="service-contact-action is-primary" href={`tel:${contactPhone}`}>
              <PhoneCall size={18} />
              <span>070 33 24 500</span>
            </a>

            <a className="service-contact-action" href={`mailto:${contactEmail}`}>
              <Mail size={18} />
              <span>Email</span>
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

      <section className="service-page-hero">
        <div className="service-page-media" aria-hidden="true">
          <img src={page.image} alt="" loading="eager" decoding="async" fetchPriority="high" />
        </div>
        <div className="service-page-overlay" aria-hidden="true" />

        <div className="service-page-shell service-page-hero-shell">
          <div className="service-page-hero-copy">
            <span>{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.description}</p>

            <div className="service-page-hero-actions">
              <a className="service-contact-action is-primary" href={`#${anchorId}`}>
                <span>වැඩි විස්තර / වෙන්කරවා ගැනීම</span>
              </a>
              <a className="service-contact-action is-secondary" href={`tel:${contactPhone}`}>
                <PhoneCall size={18} />
                <span>දුරකථන ඇමතුම</span>
              </a>
            </div>

            <div className="service-page-hero-stats">
              {page.heroStats.map((stat) => (
                <div className="service-page-hero-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.note}</small>
                </div>
              ))}
            </div>
          </div>

          <HeroPanel page={page} />
        </div>
      </section>

      <AnchorBand anchorId={anchorId} page={page} />

      {page.type === "catering" ? <CateringSections page={page} /> : <RentingSections page={page} />}

      <ContactBand anchorId={anchorId} page={page} />
    </main>
  );
}

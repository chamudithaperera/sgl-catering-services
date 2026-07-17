import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CakeSlice,
  Check,
  ClipboardList,
  House,
  Mail,
  Package,
  PackageSearch,
  PhoneCall,
  ShieldCheck,
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
  shield: ShieldCheck,
  clipboard: ClipboardList,
};

function ServiceIcon({ iconKey, size = 18 }) {
  const Icon = iconMap[iconKey] || Sparkles;
  return <Icon size={size} />;
}

function SectionHead({ eyebrow, title, description, light = false }) {
  return (
    <div className={`service-page-section-head ${light ? "is-light" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function PackageCard({ item, light = false }) {
  return (
    <article className={`service-page-package-card ${item.featured ? "is-featured" : ""} ${light ? "is-light" : ""}`}>
      <div className="service-page-package-top">
        <div>
          {item.featured ? <small>Popular Choice</small> : null}
          <h3>{item.name}</h3>
        </div>
        <strong>{item.priceLabel}</strong>
      </div>

      <p>{item.summary}</p>

      <ul className="service-page-check-list">
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

function CateringSections({ page }) {
  return (
    <>
      <section className="service-page-section service-page-section-dark" id="categories">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.overview.eyebrow}
            title={page.overview.title}
            description={page.overview.description}
          />

          <div className="service-page-category-grid">
            {page.categories.map((category, index) => (
              <a key={category.id} className="service-page-category-card" href={`#${category.id}`}>
                <span className="service-page-category-card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-page-icon-badge" aria-hidden="true">
                  <ServiceIcon iconKey={category.iconKey} size={18} />
                </span>
                <strong>{category.title}</strong>
                <p>{category.description}</p>
                <div className="service-page-category-card-footer">
                  <small>{category.packages.length} මෙනු</small>
                  <ArrowUpRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="service-page-section service-page-section-light" id="menus">
        <div className="service-page-shell">
          {page.categories.map((category, index) => (
            <article className="service-page-category-row" id={category.id} key={category.id}>
              <div className="service-page-category-copy">
                <div className="service-page-category-media">
                  <img src={category.image} alt={category.title} loading="lazy" decoding="async" />
                  <span>{category.shortLabel}</span>
                </div>

                <div className="service-page-category-copy-body">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <div className="service-page-category-title">
                    <span className="service-page-icon-badge is-light" aria-hidden="true">
                      <ServiceIcon iconKey={category.iconKey} size={18} />
                    </span>
                    <h3>{category.title}</h3>
                  </div>
                  <p>{category.description}</p>

                  <ul className="service-page-highlight-list">
                    {category.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="service-page-package-grid">
                {category.packages.map((item) => (
                  <PackageCard item={item} key={item.name} light />
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
      <section className="service-page-section service-page-section-light" id="packages">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.packagesIntro.eyebrow}
            title={page.packagesIntro.title}
            description={page.packagesIntro.description}
            light
          />

          <div className="service-page-rental-package-grid">
            {page.packages.map((item) => (
              <PackageCard item={item} key={item.name} light />
            ))}
          </div>
        </div>
      </section>

      <section className="service-page-section service-page-section-dark" id="items">
        <div className="service-page-shell">
          <SectionHead
            eyebrow={page.itemGroupsIntro.eyebrow}
            title={page.itemGroupsIntro.title}
            description={page.itemGroupsIntro.description}
          />

          <div className="service-page-item-group-grid">
            {page.itemGroups.map((group) => (
              <article className="service-page-item-group" key={group.title}>
                <div className="service-page-item-group-head">
                  <div>
                    <span className="service-page-icon-badge" aria-hidden="true">
                      <Package size={18} />
                    </span>
                    <h3>{group.title}</h3>
                  </div>
                  <p>{group.description}</p>
                </div>

                <div className="service-page-item-list">
                  {group.items.map((item) => (
                    <div className="service-page-item-row" key={`${group.title}-${item.name}`}>
                      <div className="service-page-item-name">
                        <strong>{item.name}</strong>
                        <span>{item.quantity}</span>
                      </div>
                      <strong className="service-page-item-price">{item.priceLabel}</strong>
                      <span className={`service-page-item-status ${item.status === "ලබාගත හැකියි" ? "is-available" : ""}`}>
                        {item.status}
                      </span>
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

export function ServiceShowcasePage({ page }) {
  const contactAnchorId = page.type === "catering" ? "consultation" : "booking";

  return (
    <main className="service-page">
      <header className="service-page-topbar">
        <Link className="service-page-brand" to="/">
          <span>SGL කේටරින් සර්විස්</span>
          <small>Premium Event Catering</small>
        </Link>

        <Link className="service-page-back" to="/">
          <ArrowLeft size={18} />
          මුල් පිටුවට
        </Link>
      </header>

      <section className="service-page-hero">
        <div className="service-page-media" aria-hidden="true">
          <img src={page.image} alt="" loading="eager" decoding="async" fetchPriority="high" />
        </div>

        <div className="service-page-overlay" aria-hidden="true" />

        <div className="service-page-content">
          <span>{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>

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
      </section>

      <section className="service-page-subnav">
        <div className="service-page-shell service-page-subnav-shell">
          <div className="service-page-subnav-copy">
            <span>{page.type === "catering" ? "Menu Navigation" : "Rental Navigation"}</span>
            <p>{page.type === "catering" ? "කාණ්ඩ, මෙනු සහ මිල පරාසය පහතින් බලන්න." : "පැකේජ සහ item-wise rental rates පහතින් බලන්න."}</p>
          </div>

          <nav className="service-page-subnav-links" aria-label="Service page sections">
            {page.sectionNav.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {page.type === "catering" ? <CateringSections page={page} /> : <RentingSections page={page} />}

      <section className="service-page-consultation" id={contactAnchorId}>
        <div className="service-page-shell service-page-consultation-shell">
          <div className="service-page-consultation-copy">
            <span>{page.type === "catering" ? "Reservation Support" : "Rental Booking Support"}</span>
            <h2>{page.consultation.title}</h2>
            <p>{page.consultation.description}</p>

            <div className="service-page-consultation-points">
              <div>
                <ShieldCheck size={18} />
                <span>dummy data structure ready for future admin integration</span>
              </div>
              <div>
                <ClipboardList size={18} />
                <span>guest count, menu choice or item list based planning support</span>
              </div>
            </div>
          </div>

          <div className="service-page-consultation-actions">
            <a className="service-page-action service-page-action-primary" href={`tel:${contactPhone}`}>
              <PhoneCall size={18} />
              අමතන්න
            </a>
            <a className="service-page-action service-page-action-secondary" href={`mailto:${contactEmail}`}>
              <Mail size={18} />
              Email යවන්න
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

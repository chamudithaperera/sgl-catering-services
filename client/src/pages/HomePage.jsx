import { useEffect, useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  Leaf,
  Mail,
  MapPinned,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { api } from "../lib/api";
import { getIconComponent } from "../lib/icons";

const imageLibrary = {
  hero: "/assets/sgl-images/hero-buffet.jpg",
  about: "/assets/sgl-images/indoor-buffet.jpg",
  packages: [
    {
      src: "/assets/sgl-images/rice-plate.jpg",
      alt: "Sri Lankan rice plate",
    },
    {
      src: "/assets/sgl-images/carrot-sambol.jpg",
      alt: "Traditional carrot sambol",
    },
    {
      src: "/assets/sgl-images/curry-selection.jpg",
      alt: "Curry selection",
    },
  ],
  rentals: [
    "/assets/sgl-images/indoor-buffet.jpg",
    "/assets/sgl-images/salad-station.jpg",
    "/assets/sgl-images/grill-buffet.jpg",
    "/assets/sgl-images/salad-buffet.jpg",
    "/assets/sgl-images/devilled-side.jpg",
    "/assets/sgl-images/traditional-sweets.jpg",
  ],
  gallery: [
    {
      title: "ප්‍රධාන බුෆේ සැකසුම",
      category: "බුෆේ සැකසුම්",
      imageUrl: "/assets/sgl-images/hero-buffet.jpg",
    },
    {
      title: "නැවුම් සලාද කවුන්ටරය",
      category: "ආහාර",
      imageUrl: "/assets/sgl-images/salad-buffet.jpg",
    },
    {
      title: "ශ්‍රී ලාංකික ප්‍රධාන පිඟාන",
      category: "ආහාර",
      imageUrl: "/assets/sgl-images/rice-plate.jpg",
    },
    {
      title: "උණුසුම් මස් බුෆේ",
      category: "විවාහ උත්සව",
      imageUrl: "/assets/sgl-images/grill-buffet.jpg",
    },
    {
      title: "රසවත් අතුරුපස සහ රසකැවිලි",
      category: "උපන්දින සාද",
      imageUrl: "/assets/sgl-images/traditional-sweets.jpg",
    },
    {
      title: "සම්බෝල සහ අතුරු කෑම",
      category: "ආහාර",
      imageUrl: "/assets/sgl-images/carrot-sambol.jpg",
    },
    {
      title: "ඩෙවල්ඩ් අතුරු කෑම",
      category: "බුෆේ සැකසුම්",
      imageUrl: "/assets/sgl-images/devilled-side.jpg",
    },
    {
      title: "සලාද සහ සේවා තලය",
      category: "කුලී උපකරණ",
      imageUrl: "/assets/sgl-images/salad-station.jpg",
    },
    {
      title: "Indoor chafing setup",
      category: "ටෙන්ට් සහ උත්සව සැකසුම්",
      imageUrl: "/assets/sgl-images/indoor-buffet.jpg",
    },
    {
      title: "කරි සහ මෙනු තේරීම්",
      category: "විවාහ උත්සව",
      imageUrl: "/assets/sgl-images/curry-selection.jpg",
    },
  ],
};

const navItems = [
  ["home", "මුල් පිටුව"],
  ["about", "අප ගැන"],
  ["services", "සේවාවන්"],
  ["packages", "ආහාර පැකේජ"],
  ["rentals", "කුලී උපකරණ"],
  ["gallery", "ඡායාරූප"],
  ["reviews", "අදහස්"],
  ["contact", "අප අමතන්න"],
];

function whatsappHref(phoneNumber) {
  return `https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}`;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading reveal-on-scroll reveal-up">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      <div className="section-ornament" aria-hidden="true">
        <span />
        <i />
        <span />
      </div>
    </div>
  );
}

export function HomePage() {
  const [content, setContent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState("සියල්ල");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [contactForm, setContactForm] = useState({
    customerName: "",
    phone: "",
    eventType: "",
    serviceNeeded: "",
    eventDate: "",
    guestCount: "",
    location: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadContent() {
      const response = await api.get("/public/content");
      setContent(response.data);
    }

    loadContent().catch((error) => {
      console.error(error);
      setErrorMessage("දත්ත ලබාගැනීමේ දෝෂයක් ඇතිවිය.");
    });
  }, []);

  useEffect(() => {
    if (!content) {
      return undefined;
    }

    const elements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [content]);

  if (!content) {
    return (
      <div className="page-shell">
        <div className="site-container loading-state">
          <h2>Website preview එක සකස් කරමින්...</h2>
          <p>Local API එකෙන් Sinhala content load කරමින් සිටී.</p>
          {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
        </div>
      </div>
    );
  }

  const { siteConfig, benefits, services, foodPackages, rentalItems, rentalPrices, rentalPackages, reviews } =
    content;
  const galleryCategories = ["සියල්ල", ...new Set(imageLibrary.gallery.map((item) => item.category))];
  const visibleGallery =
    galleryCategory === "සියල්ල"
      ? imageLibrary.gallery
      : imageLibrary.gallery.filter((item) => item.category === galleryCategory);

  async function handleContactSubmit(event) {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    try {
      await api.post("/public/inquiries", contactForm);
      setStatusMessage("ඔබගේ පණිවිඩය සාර්ථකව යවන ලදී. අපි ඉක්මනින් ඔබව සම්බන්ධ කරගන්නෙමු.");
      setContactForm({
        customerName: "",
        phone: "",
        eventType: "",
        serviceNeeded: "",
        eventDate: "",
        guestCount: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("පණිවිඩය යැවීමේදී දෝෂයක් ඇතිවිය.");
    }
  }

  return (
    <div className="page-shell">
      <div className="site-container hero-wrap" id="home">
        <div className="hero-shell">
          <div className="hero-ornament hero-ornament-top" aria-hidden="true" />
          <header className="hero-nav hero-intro-nav">
            <button className="menu-toggle" onClick={() => setMenuOpen((current) => !current)} type="button">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav className={`hero-nav-links ${menuOpen ? "open" : ""}`}>
              {navItems.map(([key, label], index) => (
                <a
                  className={index === 0 ? "active" : ""}
                  href={`#${key}`}
                  key={key}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="brand-lockup">
              <strong>SGL</strong>
              <span>Catering Services</span>
            </div>

            <a className="contact-pill" href={`tel:${siteConfig.phone}`}>
              <Phone size={18} />
              දැන් අමතන්න
            </a>
          </header>

          <div className="hero-grid">
            <div className="hero-copy hero-intro-copy">
              <div className="hero-frame" aria-hidden="true" />
              <div className="eyebrow">
                <BadgeCheck size={16} />
                {siteConfig.heroBadge}
              </div>
              <h1>
                {siteConfig.heroTitleLineOne}
                <br />
                <span>{siteConfig.heroTitleLineTwo}</span>
              </h1>
              <p>{siteConfig.heroDescription}</p>

              <div className="hero-actions">
                <a className="primary-button" href={`tel:${siteConfig.phone}`}>
                  <Phone size={18} />
                  අප අමතන්න
                </a>
                <a className="outline-button" href="#packages">
                  <Sparkles size={18} />
                  ආහාර පැකේජ බලන්න
                </a>
              </div>
              </div>

            <div className="hero-visual hero-intro-visual">
              <div className="hero-photo-panel">
                <img alt="SGL buffet hero" src={imageLibrary.hero} />
              </div>
            </div>
          </div>

          <div className="benefits-strip">
            {benefits.map((benefit) => {
              const Icon = getIconComponent(benefit.icon);
              return (
                <div
                  className="benefit-item reveal-on-scroll reveal-up"
                  key={benefit.id}
                  style={{ "--reveal-delay": `${benefit.sortOrder * 90}ms` }}
                >
                  <div className="icon-orb">
                    <Icon size={24} />
                  </div>
                  <div className="benefit-copy">
                    <strong>{benefit.title}</strong>
                    <span>{benefit.description}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <a className="scroll-cue" href="#about">
            <span>පහළට බලන්න</span>
            <i />
          </a>
          <div className="hero-ornament hero-ornament-bottom" aria-hidden="true" />
        </div>
      </div>

      <main className="site-container">
        <section className="section-block section-traditional" id="about">
          <div className="about-panel reveal-on-scroll reveal-up">
            <div className="about-visual reveal-on-scroll reveal-left">
              <img alt="SGL catering buffet setup" src={imageLibrary.about} />
            </div>
            <div className="about-copy reveal-on-scroll reveal-right">
              <SectionHeading
                eyebrow="SGL Story"
                title={siteConfig.aboutHeading}
                description={siteConfig.aboutIntro}
              />
              <p>{siteConfig.aboutBody}</p>

              <div className="stats-row">
                <div className="stat-pill reveal-on-scroll reveal-up" style={{ "--reveal-delay": "80ms" }}>
                  <strong>06+</strong>
                  <span>සේවා වර්ග</span>
                </div>
                <div className="stat-pill reveal-on-scroll reveal-up" style={{ "--reveal-delay": "160ms" }}>
                  <strong>03</strong>
                  <span>ප්‍රධාන ආහාර පැකේජ</span>
                </div>
                <div className="stat-pill reveal-on-scroll reveal-up" style={{ "--reveal-delay": "240ms" }}>
                  <strong>250+</strong>
                  <span>කුලී උපකරණ</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block section-traditional" id="services">
          <SectionHeading
            eyebrow="Our Services"
            title="අපගේ සේවාවන්"
            description="උත්සවයේ ප්‍රමාණය හා අවශ්‍යතාවය අනුව සකස් කළ catering සහ rental solutions."
          />
          <div className="service-grid">
            {services.map((service) => {
              const Icon = getIconComponent(service.icon);
              return (
                <article
                  className="service-card reveal-on-scroll reveal-up"
                  key={service.id}
                  style={{ "--reveal-delay": `${service.sortOrder * 80}ms` }}
                >
                  <div className="icon-orb">
                    <Icon size={26} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section-block" id="packages">
          <SectionHeading
            eyebrow="Food Packages"
            title="අපගේ ආහාර පැකේජ"
            description="අමුත්තන්ගේ ගණන, අවස්ථාව සහ අයවැය අනුව සකස් කළ පැකේජ."
          />
          <div className="package-grid">
            {foodPackages.map((item, index) => (
              <article
                className={`package-card ${item.featured ? "featured" : ""} reveal-on-scroll reveal-up`}
                key={item.id}
                style={{ "--reveal-delay": `${(index + 1) * 90}ms` }}
              >
                <div className="package-media">
                  <img
                    alt={imageLibrary.packages[index % imageLibrary.packages.length].alt}
                    src={imageLibrary.packages[index % imageLibrary.packages.length].src}
                  />
                </div>
                {item.featured ? <div className="feature-chip">Most Popular</div> : null}
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <ul className="package-list">
                  {item.includedItems.map((packageItem) => (
                    <li key={packageItem}>
                      <ChevronRight size={16} color="#ff8a3d" />
                      {packageItem}
                    </li>
                  ))}
                </ul>
                <div className="package-price">{item.priceLabel}</div>
                <a className="mini-button" href={whatsappHref(siteConfig.whatsapp)} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} />
                  {item.ctaLabel}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="rentals">
          <SectionHeading
            eyebrow="Rental Equipment"
            title="උත්සව උපකරණ කුලියට ලබාදීම"
            description="උත්සවය සම්පූර්ණ කිරීමට අවශ්‍ය furniture, buffet සහ setup items."
          />
          <div className="rental-grid">
            {rentalItems.map((item, index) => (
              <article
                className="rental-card reveal-on-scroll reveal-up"
                key={item.id}
                style={{ "--reveal-delay": `${(index + 1) * 70}ms` }}
              >
                <img alt={item.name} src={imageLibrary.rentals[index % imageLibrary.rentals.length]} />
                <div className="rental-copy">
                  <div className="badge-row">
                    <div className="soft-badge">
                      <Leaf size={15} />
                      {item.category}
                    </div>
                    <div className="soft-badge">
                      <ShieldCheck size={15} />
                      {item.status}
                    </div>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="badge-row">
                    <div className="soft-badge">ප්‍රමාණය: {item.availableQuantity}</div>
                    <div className="soft-badge">{item.priceLabel}</div>
                  </div>
                  <a className="mini-button" href={whatsappHref(siteConfig.whatsapp)} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} />
                    මිල විමසන්න
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-traditional">
          <SectionHeading
            eyebrow="Rental Pricing"
            title="කුලී උපකරණ මිල ගණන්"
            description="නිවැරදි මිල ගණන් සඳහා ප්‍රවාහන දුර සහ අවශ්‍ය ප්‍රමාණය සමඟ අප අමතන්න."
          />
          <div className="pricing-panel reveal-on-scroll reveal-up">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>උපකරණය</th>
                  <th>මිල</th>
                </tr>
              </thead>
              <tbody>
                {rentalPrices.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item}</td>
                    <td>{item.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="pricing-note">
              උපකරණ ප්‍රමාණය, කුලී කාලය, ප්‍රවාහන දුර සහ උත්සව ස්ථානය අනුව මිල ගණන් වෙනස් විය හැකිය.
            </p>
          </div>
        </section>

        <section className="section-block section-traditional">
          <SectionHeading
            eyebrow="Rental Packages"
            title="කුලී උපකරණ පැකේජ"
            description="කුඩා සිට විශාල උත්සව දක්වා වෙන්කරවා ගත හැකි pre-built setups."
          />
          <div className="rental-package-grid">
            {rentalPackages.map((item, index) => (
              <article
                className="rental-package-card reveal-on-scroll reveal-up"
                key={item.id}
                style={{ "--reveal-delay": `${(index + 1) * 100}ms` }}
              >
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <ul className="rental-package-list">
                  {item.items.map((packageItem) => (
                    <li key={packageItem}>
                      <ChevronRight size={16} color="#063d3a" />
                      {packageItem}
                    </li>
                  ))}
                </ul>
                <div className="section-actions">
                  <a className="mini-button" href={whatsappHref(siteConfig.whatsapp)} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} />
                    {item.ctaLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-traditional" id="gallery">
          <SectionHeading
            eyebrow="Gallery"
            title="අපගේ රසවත් මතකයන්"
            description="Event catering, buffet displays සහ setup highlights preview කරන්න."
          />
          <div className="gallery-filter-row reveal-on-scroll reveal-up">
            {galleryCategories.map((category) => (
              <button
                className={`filter-chip ${galleryCategory === category ? "active" : ""}`}
                key={category}
                onClick={() => setGalleryCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {visibleGallery.map((item, index) => (
              <button
                className="gallery-card reveal-on-scroll reveal-scale"
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                style={{ "--reveal-delay": `${(index + 1) * 60}ms` }}
                type="button"
              >
                <img alt={item.title} src={item.imageUrl} />
                <div className="gallery-card-footer">
                  <strong>{item.title}</strong>
                  <p>{item.category}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section-block section-traditional" id="reviews">
          <SectionHeading
            eyebrow="Client Reviews"
            title="පාරිභෝගිකයන් අප ගැන පවසන දේ"
            description="Event day execution, food quality සහ service reliability ගැන සත්‍ය feedback."
          />
          <div className="review-grid">
            {reviews.map((review, index) => (
              <article
                className="review-card reveal-on-scroll reveal-up"
                key={review.id}
                style={{ "--reveal-delay": `${(index + 1) * 100}ms` }}
              >
                <div className="rating-row">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star fill="currentColor" key={`${review.id}-${index}`} size={18} />
                  ))}
                </div>
                <p>“{review.quote}”</p>
                <div>
                  <h3>{review.customerName}</h3>
                  <span>{review.eventType}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-traditional" id="contact">
          <SectionHeading
            eyebrow="Contact"
            title={siteConfig.contactHeading}
            description={siteConfig.contactDescription}
          />
          <div className="contact-panel reveal-on-scroll reveal-up">
            <div className="contact-grid">
              <div className="contact-info-grid">
                <div className="contact-info-card reveal-on-scroll reveal-left" style={{ "--reveal-delay": "80ms" }}>
                  <div className="icon-orb">
                    <Phone size={22} />
                  </div>
                  <div>
                    <strong>දුරකථන අංකය</strong>
                    <p>{siteConfig.phone}</p>
                  </div>
                </div>
                <div className="contact-info-card reveal-on-scroll reveal-left" style={{ "--reveal-delay": "140ms" }}>
                  <div className="icon-orb">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <strong>WhatsApp</strong>
                    <p>{siteConfig.whatsapp}</p>
                  </div>
                </div>
                <div className="contact-info-card reveal-on-scroll reveal-left" style={{ "--reveal-delay": "200ms" }}>
                  <div className="icon-orb">
                    <Mail size={22} />
                  </div>
                  <div>
                    <strong>Email</strong>
                    <p>{siteConfig.email}</p>
                  </div>
                </div>
                <div className="contact-info-card reveal-on-scroll reveal-left" style={{ "--reveal-delay": "260ms" }}>
                  <div className="icon-orb">
                    <MapPinned size={22} />
                  </div>
                  <div>
                    <strong>ලිපිනය සහ වේලාවන්</strong>
                    <p>{siteConfig.address}</p>
                    <p>{siteConfig.businessHours}</p>
                  </div>
                </div>
              </div>

              <form className="contact-form reveal-on-scroll reveal-right" onSubmit={handleContactSubmit}>
                <div className="field-grid">
                  <label className="field">
                    <span>ඔබගේ නම</span>
                    <input
                      onChange={(event) => setContactForm((current) => ({ ...current, customerName: event.target.value }))}
                      required
                      value={contactForm.customerName}
                    />
                  </label>
                  <label className="field">
                    <span>දුරකථන අංකය</span>
                    <input
                      onChange={(event) => setContactForm((current) => ({ ...current, phone: event.target.value }))}
                      required
                      value={contactForm.phone}
                    />
                  </label>
                  <label className="field">
                    <span>උත්සවයේ වර්ගය</span>
                    <input
                      onChange={(event) => setContactForm((current) => ({ ...current, eventType: event.target.value }))}
                      required
                      value={contactForm.eventType}
                    />
                  </label>
                  <label className="field">
                    <span>අවශ්‍ය සේවාව</span>
                    <input
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, serviceNeeded: event.target.value }))
                      }
                      required
                      value={contactForm.serviceNeeded}
                    />
                  </label>
                  <label className="field">
                    <span>උත්සව දිනය</span>
                    <input
                      onChange={(event) => setContactForm((current) => ({ ...current, eventDate: event.target.value }))}
                      required
                      type="date"
                      value={contactForm.eventDate}
                    />
                  </label>
                  <label className="field">
                    <span>අමුත්තන්ගේ සංඛ්‍යාව</span>
                    <input
                      onChange={(event) => setContactForm((current) => ({ ...current, guestCount: event.target.value }))}
                      required
                      value={contactForm.guestCount}
                    />
                  </label>
                </div>
                <label className="field">
                  <span>උත්සව ස්ථානය</span>
                  <input
                    onChange={(event) => setContactForm((current) => ({ ...current, location: event.target.value }))}
                    required
                    value={contactForm.location}
                  />
                </label>
                <label className="field">
                  <span>ඔබගේ පණිවිඩය</span>
                  <textarea
                    onChange={(event) => setContactForm((current) => ({ ...current, message: event.target.value }))}
                    required
                    value={contactForm.message}
                  />
                </label>
                {statusMessage ? <div className="status-message">{statusMessage}</div> : null}
                {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
                <button className="primary-button" type="submit">
                  <Phone size={18} />
                  පණිවිඩය යවන්න
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-container footer-bar">
        <p>
          {siteConfig.companyName} | Sinhala responsive catering website demo with local admin panel
        </p>
      </footer>

      <a className="floating-whatsapp" href={whatsappHref(siteConfig.whatsapp)} rel="noreferrer" target="_blank">
        <MessageCircle size={28} />
      </a>

      {selectedGalleryItem ? (
        <div className="gallery-modal" onClick={() => setSelectedGalleryItem(null)} role="presentation">
          <div className="gallery-modal-body" onClick={(event) => event.stopPropagation()} role="presentation">
            <div className="gallery-modal-top">
              <div>
                <strong>{selectedGalleryItem.title}</strong>
                <p>{selectedGalleryItem.category}</p>
              </div>
              <button onClick={() => setSelectedGalleryItem(null)} type="button">
                <X size={18} />
              </button>
            </div>
            <img alt={selectedGalleryItem.title} src={selectedGalleryItem.imageUrl} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

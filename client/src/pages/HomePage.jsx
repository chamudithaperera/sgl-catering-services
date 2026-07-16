import { useEffect, useState } from "react";
import { ChevronRight, Mail, Menu, MessageCircle, PhoneCall, X } from "lucide-react";
import "./HomePage.css";

const contactPhone = "+94712345678";
const contactEmail = "info@sglcateringservice.lk";
const whatsappHref = `https://wa.me/${contactPhone.replace(/[^\d]/g, "")}`;

const heroSlides = [
  {
    image: "/assets/sgl-images/hero-buffet.jpg",
    label: "Hero buffet",
  },
  {
    image: "/assets/sgl-images/indoor-buffet.jpg",
    label: "Indoor buffet",
  },
  {
    image: "/assets/sgl-images/grill-buffet.jpg",
    label: "Grill buffet",
  },
  {
    image: "/assets/sgl-images/salad-buffet.jpg",
    label: "Salad buffet",
  },
  {
    image: "/assets/sgl-images/salad-station.jpg",
    label: "Salad station",
  },
];

const navItems = [
  { label: "මුල් පිටුව", href: "#home" },
  { label: "අප ගැන", href: "#about" },
  { label: "අපගේ සේවාවන්", href: "#services" },
  { label: "මිල පැකේජ", href: "#pricing" },
  { label: "ඡායාරූප", href: "#gallery" },
  { label: "අප අමතන්න", href: `tel:${contactPhone}` },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  function selectSlide(slideIndex) {
    setActiveSlide(slideIndex);
    setMenuOpen(false);
  }

  function showNextSlide() {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
  }

  function toggleContactMenu() {
    setContactMenuOpen((currentState) => !currentState);
  }

  return (
    <main className="premium-home">
      <section className="premium-hero" id="home">
        <div className="premium-hero-media" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.image}
              className={`premium-hero-slide ${index === activeSlide ? "is-active" : ""}`}
            >
              <img src={slide.image} alt="" />
            </div>
          ))}
        </div>

        <div className="premium-hero-overlay" aria-hidden="true" />

        <header className="premium-nav">
          <a className="premium-brand" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="premium-brand-copy">
              <strong>SGL කේටරින් සර්විස්</strong>
              <small>Premium Event Catering</small>
            </span>
          </a>

          <div className="premium-nav-right">
            <nav className={`premium-nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  className={`premium-nav-link ${index === 0 ? "is-active" : ""}`}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="premium-nav-toggle"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen((currentState) => !currentState)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        <div className="premium-hero-content">
          <div className="premium-hero-panel">
            <h1>SGL කේටරින් සර්විස්</h1>
            <span className="premium-hero-subtitle">SGL Catering Service</span>
            <p>
              විවාහ උත්සව, ආයතනික හමුවීම් සහ පවුල් සැමරුම් සඳහා රසය, පිළිවෙළ සහ වෘත්තීයභාවය එක් කරන
              සුවිශේෂී කේටරින් අත්දැකීමක් අපි ඔබ වෙනුවෙන් සකස් කරමු.
            </p>

            <div className="premium-hero-actions">
              <button type="button" className="premium-button premium-button-primary" onClick={showNextSlide}>
                වැඩි විස්තර
                <ChevronRight size={18} />
              </button>
              <a className="premium-button premium-button-secondary" href={`tel:${contactPhone}`}>
                <PhoneCall size={18} />
                අප අමතන්න
              </a>
            </div>
          </div>
        </div>

        <div className="premium-slider-dots" aria-label="Hero slide controls">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              className={`premium-slider-dot ${index === activeSlide ? "is-active" : ""}`}
              aria-label={`${slide.label} slide`}
              aria-pressed={index === activeSlide}
              onClick={() => selectSlide(index)}
            />
          ))}
        </div>

        <div className={`premium-floating-contact ${contactMenuOpen ? "is-open" : ""}`}>
          <div className="premium-floating-actions" aria-hidden={!contactMenuOpen}>
            <a
              className="premium-floating-link premium-floating-link-call"
              href={`tel:${contactPhone}`}
              aria-label="Call us"
            >
              <PhoneCall size={20} />
            </a>
            <a
              className="premium-floating-link premium-floating-link-whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp us"
            >
              <MessageCircle size={20} />
            </a>
            <a
              className="premium-floating-link premium-floating-link-email"
              href={`mailto:${contactEmail}`}
              aria-label="Email us"
            >
              <Mail size={20} />
            </a>
          </div>

          <button
            type="button"
            className="premium-floating-toggle"
            aria-expanded={contactMenuOpen}
            aria-label={contactMenuOpen ? "Close contact menu" : "Open contact menu"}
            onClick={toggleContactMenu}
          >
            {contactMenuOpen ? <X size={24} /> : <PhoneCall size={22} />}
          </button>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChevronRight, Menu, PhoneCall, X } from "lucide-react";
import "./HomePage.css";

const contactPhone = "+94712345678";

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

const serviceItems = [
  {
    title: "ආහාර පාන සැපයීම",
    label: "Signature Catering",
    image: "/assets/sgl-images/hero-buffet.jpg",
    description:
      "මංගල උත්සව, ආයතනික හමුවීම්, දාන පිංකම් සහ පවුල් සැමරුම් සඳහා ඔබේ අවස්ථාවට ගැළපෙන ලෙස රසවත්, සෞඛ්‍යාරක්ෂිත සහ වෘත්තීයමය ආහාර සැපයීමක් අපි සකස් කරමු.",
    highlights: ["මංගල හා විශේෂ උත්සව", "අභිරුචි මෙනු සැලසුම්", "පිළිවෙළට සේවා සපයීම"],
  },
  {
    title: "උත්සව භාණ්ඩ සැපයීම",
    label: "Event Rentals",
    image: "/assets/sgl-images/indoor-buffet.jpg",
    description:
      "බෆේ උපකරණ, සේවනාංග, මේස සැකසුම් සහ උත්සව අවශ්‍යතා සඳහා භාවිතා වන විවිධ භාණ්ඩ විශ්වාසයෙන් කුලියට ලබාදී ඔබේ උත්සවය වඩාත් සම්පූර්ණව සංවිධානය කිරීමට අපි සහාය වෙමු.",
    highlights: ["බෆේ හා සේවනාංග උපකරණ", "උත්සව සැකසුම් භාණ්ඩ", "විශ්වාසනීය ලබාදීම"],
  },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isNavPinned, setIsNavPinned] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroBoundaryRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const heroBoundary = heroBoundaryRef.current;

    if (!heroBoundary) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavPinned(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-92px 0px 0px 0px",
      }
    );

    observer.observe(heroBoundary);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

    if (revealItems.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  function selectSlide(slideIndex) {
    setActiveSlide(slideIndex);
    setMenuOpen(false);
  }

  function showNextSlide() {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
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

        <header className={`premium-nav ${isNavPinned ? "is-pinned" : "is-overlay"}`}>
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

        <div ref={heroBoundaryRef} className="premium-hero-boundary" aria-hidden="true" />

      </section>

      <section className="premium-about" id="about">
        <div className="premium-about-shell">
          <div className="premium-about-media premium-reveal premium-reveal-media" data-reveal>
            <img src="/assets/sgl-images/indoor-buffet.jpg" alt="SGL Catering buffet setup" />
          </div>

          <div className="premium-about-card premium-reveal premium-reveal-card" data-reveal>
            <h2>SGL කේටරින් සර්විස් යනු:</h2>
            <p>
              වසර ගණනාවක් පුරා අනුරාධපුරය සහ අවට ප්‍රදේශවල පාරිභෝගික විශ්වාසය දිනාගත්, සෞඛ්‍යාරක්ෂිත හා
              ප්‍රණීත ආහාර සේවාවක් සපයන කේටරින් සේවාවකි. මංගල උත්සව, නිවසේ උත්සව, දාන පිංකම් සහ අනෙකුත්
              සියලුම විශේෂ අවස්ථා සඳහා රසවත් ආහාර සපයන අතර, උත්සව සඳහා අවශ්‍ය විවිධ භාණ්ඩද කුලියට ලබාදීමට
              අප සූදානම්.
            </p>
          </div>
        </div>
      </section>

      <section className="premium-services" id="services">
        <div className="premium-services-shell">
          <div className="premium-services-heading premium-reveal premium-reveal-heading" data-reveal>
            <span>Professional Event Solutions</span>
            <h2>අපගේ සේවාවන්</h2>
            <p>
              ඔබගේ උත්සව අවශ්‍යතාවයට ගැළපෙන පරිදි ආහාර සේවාවන් සහ උත්සව භාණ්ඩ සැපයුම් එක්ම විශ්වාසනීය
              ස්ථානයකින් ලබාදීමට අපි සූදානම්.
            </p>
          </div>

          <div className="premium-services-grid">
            {serviceItems.map((service, index) => (
              <article key={service.title} className="premium-service-card premium-reveal premium-reveal-service" data-reveal>
                <div className="premium-service-media">
                  <img src={service.image} alt={service.title} />
                </div>

                <div className="premium-service-content">
                  <div className="premium-service-meta">
                    <strong>{`0${index + 1}`}</strong>
                    <span>{service.label}</span>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <div className="premium-service-highlights">
                    {service.highlights.map((highlight) => (
                      <span key={highlight}>{highlight}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

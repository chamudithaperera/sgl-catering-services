import { useEffect, useState } from "react";
import { ChevronRight, Menu, PhoneCall, X } from "lucide-react";
import "./HomePage.css";

const contactPhone = "+94712345678";

const heroSlides = [
  {
    image: "/assets/sgl-images/hero-buffet.jpg",
    label: "විවාහ උත්සව",
    detail: "අලංකාර බුෆේ සැකසුම් සහ මතකයේ රැඳෙන සංග්‍රහ අත්දැකීම්.",
  },
  {
    image: "/assets/sgl-images/indoor-buffet.jpg",
    label: "ආයතනික උත්සව",
    detail: "නියමිත වේලාවට, පිරිසිදුව සහ වෘත්තීයමය ලෙස සැලසුම් කළ සේවාව.",
  },
  {
    image: "/assets/sgl-images/grill-buffet.jpg",
    label: "පවුල් සැමරුම්",
    detail: "උණුසුම් ආගන්තුක සත්කාරය සමඟ රසවත් මෙනු සහ සුවිශේෂී සැකසුම්.",
  },
];

const navItems = [
  { label: "විවාහ උත්සව", slideIndex: 0 },
  { label: "ආයතනික", slideIndex: 1 },
  { label: "පවුල් සැමරුම්", slideIndex: 2 },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <div className="premium-nav-left">
            <button
              type="button"
              className="premium-nav-toggle"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen((currentState) => !currentState)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <nav className={`premium-nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`premium-nav-button ${item.slideIndex === activeSlide ? "is-active" : ""}`}
                  onClick={() => selectSlide(item.slideIndex)}
                >
                  {item.label}
                </button>
              ))}
              <a className="premium-nav-contact" href={`tel:${contactPhone}`} onClick={() => setMenuOpen(false)}>
                අප අමතන්න
              </a>
            </nav>
          </div>

          <a className="premium-brand" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="premium-brand-mark">SGL</span>
            <span className="premium-brand-copy">
              <strong>කේටරින් සර්විස්</strong>
              <small>Premium Event Catering</small>
            </span>
          </a>
        </header>

        <div className="premium-hero-content">
          <div className="premium-hero-panel">
            <h1>SGL කේටරින් සර්විස්</h1>
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
      </section>
    </main>
  );
}

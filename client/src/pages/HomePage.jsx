import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Menu, PhoneCall, X } from "lucide-react";
import { Link } from "react-router-dom";
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
    href: "/catering",
    image: "/assets/sgl-images/hero-buffet.jpg",
    description:
      "මංගල උත්සව, ආයතනික හමුවීම්, දාන පිංකම් සහ පවුල් සැමරුම් සඳහා ඔබේ අවස්ථාවට ගැළපෙන ලෙස රසවත්, සෞඛ්‍යාරක්ෂිත සහ වෘත්තීයමය ආහාර සැපයීමක් අපි සකස් කරමු.",
  },
  {
    title: "උත්සව භාණ්ඩ සැපයීම",
    label: "Event Rentals",
    href: "/renting",
    image: "/assets/sgl-images/indoor-buffet.jpg",
    description:
      "බෆේ උපකරණ, සේවනාංග, මේස සැකසුම් සහ උත්සව අවශ්‍යතා සඳහා භාවිතා වන විවිධ භාණ්ඩ විශ්වාසයෙන් කුලියට ලබාදී ඔබේ උත්සවය වඩාත් සම්පූර්ණව සංවිධානය කිරීමට අපි සහාය වෙමු.",
  },
];

const galleryItems = [
  {
    title: "විශේෂ බෆේ සැකසුම්",
    image: "/assets/sgl-images/hero-buffet.jpg",
    layout: "feature",
    position: "center center",
  },
  {
    title: "ග්‍රිල් බෆේ අයිතම",
    image: "/assets/sgl-images/grill-buffet.jpg",
    layout: "tall",
    position: "center center",
  },
  {
    title: "සැලඩ් ස්ටේෂන්",
    image: "/assets/sgl-images/salad-station.jpg",
    layout: "standard",
    position: "center center",
  },
  {
    title: "රසකැවිලි මේසය",
    image: "/assets/sgl-images/traditional-sweets.jpg",
    layout: "standard",
    position: "center center",
  },
  {
    title: "උත්සව භෝජන සැකසුම",
    image: "/assets/sgl-images/indoor-buffet.jpg",
    layout: "wide",
    position: "center 42%",
  },
  {
    title: "ප්‍රධාන ආහාර තේරීම්",
    image: "/assets/sgl-images/rice-plate.jpg",
    layout: "standard",
    position: "center center",
  },
  {
    title: "කරි හා අතුරු අයිතම",
    image: "/assets/sgl-images/curry-selection.jpg",
    layout: "standard",
    position: "center center",
  },
  {
    title: "සැලඩ් බෆේ සැකසුම්",
    image: "/assets/sgl-images/salad-buffet.jpg",
    layout: "wide",
    position: "center center",
  },
  {
    title: "අලංකාර අතුරුපද",
    image: "/assets/sgl-images/devilled-side.jpg",
    layout: "tall",
    position: "center center",
  },
  {
    title: "කැරට් සම්බෝලය",
    image: "/assets/sgl-images/carrot-sambol.jpg",
    layout: "standard",
    position: "center center",
  },
  {
    title: "බෆේ පිළිගැන්වීම්",
    image: "/assets/hero-buffet.jpg",
    layout: "standard",
    position: "22% center",
  },
  {
    title: "උත්සව සූදානම් කිරීම",
    image: "/assets/sgl-images/indoor-buffet.jpg",
    layout: "standard",
    position: "78% center",
  },
];

const reviewItems = [
  {
    name: "සචිනි සහ දිනේෂ්",
    event: "මංගල උත්සවය",
    quote:
      "අපේ මංගල උත්සවයට ආහාරයේ රස, සේවයේ පිළිවෙළ සහ කාර්ය මණ්ඩලයේ වෘත්තීයභාවය අප බලාපොරොත්තු වූ දේටත් වඩා ඉහළ මට්ටමේ තිබුණා. ආරාධිතයෝ හැමෝම විශේෂයෙන් ආහාර ගැනම කතා කළා.",
  },
  {
    name: "දිනුකා ප්‍රනාන්දු",
    event: "ආයතනික හමුවීම",
    quote:
      "ආයතනික වැඩසටහන සඳහා ලබාදුන් ආහාර හා සැකසුම් සේවාව ඉතා සංවිධානාත්මකව සිදු වුණා. වේලාවට සැපයීම, පිරිසිදුභාවය සහ පිළිගැන්වීම නිසා අපගේ ආරාධිතයින්ට ඉතා හොඳ අත්දැකීමක් ලැබුණා.",
  },
  {
    name: "අමල්කා ජයසිංහ",
    event: "දාන පිංකම",
    quote:
      "දාන පිංකමට අවශ්‍ය ආහාර සහ භාණ්ඩ එකම ස්ථානයකින් ලැබුණු නිසා අපට සැලසුම් කිරීම බොහෝ පහසු වුණා. රසවත් ආහාරත්, ගෞරවනීය සේවාවත් නිසා පවුලේ හැමෝම ඉතා සතුටු වුණා.",
  },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
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

  function showPreviousReview() {
    setActiveReview((currentReview) => (currentReview === 0 ? reviewItems.length - 1 : currentReview - 1));
  }

  function showNextReview() {
    setActiveReview((currentReview) => (currentReview + 1) % reviewItems.length);
  }

  const currentReview = reviewItems[activeReview];

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

                  <Link className="premium-service-button" to={service.href}>
                    <span>වැඩි විස්තර</span>
                    <span className="premium-service-button-icon" aria-hidden="true">
                      <ChevronRight size={18} />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-gallery" id="gallery">
        <div className="premium-gallery-shell">
          <div className="premium-gallery-heading premium-reveal premium-reveal-heading" data-reveal>
            <span>Curated Event Moments</span>
            <h2>ඡායාරූප</h2>
            <p>
              අප විසින් සකස් කළ උත්සව භෝජන සැකසුම්, රසවත් ආහාර තේරීම් සහ අලංකාර සේවා අවස්ථා අතරින්
              තෝරාගත් රූප කිහිපයක් මෙහි නරඹන්න.
            </p>
          </div>

          <div className="premium-gallery-grid">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className={`premium-gallery-card premium-gallery-card-${item.layout} premium-reveal premium-reveal-gallery`}
                data-reveal
              >
                <img src={item.image} alt={item.title} style={{ objectPosition: item.position }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-reviews" id="reviews">
        <div className="premium-reviews-shell">
          <div className="premium-reviews-heading premium-reveal premium-reveal-heading" data-reveal>
            <span>Client Testimonials</span>
            <h2>පාරිභෝගික අදහස්</h2>
            <p>
              අපගේ සේවාවන් භාවිතා කළ පාරිභෝගිකයින්ගේ අත්දැකීම් අතරින් තෝරාගත් අදහස් කිහිපයක් මෙහි
              නරඹන්න.
            </p>
          </div>

          <div className="premium-reviews-stage premium-reveal premium-reveal-review" data-reveal>
            <div className="premium-reviews-controls">
              <button type="button" className="premium-review-arrow" aria-label="Previous review" onClick={showPreviousReview}>
                <ChevronLeft size={20} />
              </button>

              <span>{`${String(activeReview + 1).padStart(2, "0")} / ${String(reviewItems.length).padStart(2, "0")}`}</span>

              <button type="button" className="premium-review-arrow" aria-label="Next review" onClick={showNextReview}>
                <ChevronRight size={20} />
              </button>
            </div>

            <article key={currentReview.name} className="premium-review-card">
              <span className="premium-review-quote-mark" aria-hidden="true">
                “
              </span>
              <div className="premium-review-stars" aria-hidden="true">
                ★★★★★
              </div>
              <p>{currentReview.quote}</p>

              <div className="premium-review-meta">
                <strong>{currentReview.name}</strong>
                <span>{currentReview.event}</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Mail, MapPin, Menu, PhoneCall, Send, X } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import "./HomePage.css";

const contactPhone = "+94703324500";
const contactPhoneLabel = "070 33 24 500";
const contactEmail = "sudathjayathilakabs@gmail.com";
const contactLocation = "No.360, National Housing, Stage II, Anuradhapura.";
const brandTagline = "Rajarata Symbol of Sri Lankan Traditional Food Art.........";
const heroDescription =
  "විවාහ උත්සව, ආයතනික හමුවීම් සහ පවුල් සැමරුම් සඳහා රසය, පිළිවෙළ සහ වෘත්තීයභාවය එක් කරන සුවිශේෂී කේටරින් අත්දැකීමක් අපි ඔබ වෙනුවෙන් සකස් කරමු.";
const aboutHeading = "SGL කේටරින් සර්විස් යනු:";
const aboutBody =
  "වසර ගණනාවක් පුරා අනුරාධපුරය සහ අවට ප්‍රදේශවල පාරිභෝගික විශ්වාසය දිනාගත්, සෞඛ්‍යාරක්ෂිත හා ප්‍රණීත ආහාර සේවාවක් සපයන කේටරින් සේවාවකි. මංගල උත්සව, නිවසේ උත්සව, දාන පිංකම් සහ අනෙකුත් සියලුම විශේෂ අවස්ථා සඳහා රසවත් ආහාර සපයන අතර, උත්සව සඳහා අවශ්‍ය විවිධ භාණ්ඩද කුලියට ලබාදීමට අප සූදානම්.";
const contactHeading = "අප අමතන්න";
const contactDescription =
  "ඔබගේ උත්සවයට ගැළපෙන ආහාර සැපයුම්, භාණ්ඩ සැකසුම් සහ වෙන්කරවා ගැනීම් සඳහා අප සමඟ සම්බන්ධවන්න. ඔබගේ අවශ්‍යතාවයට ගැළපෙන විසඳුමක් ඉක්මනින් සකස් කරදෙන්නෙමු.";
const contactMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4934.785252954407!2d80.40432687591523!3d8.319864291715861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf5005cd65e2d%3A0x378ef91fdb3a6052!2sSGL%20Catering%20Service!5e1!3m2!1sen!2slk!4v1784484566797!5m2!1sen!2slk";

function buildGoogleMapEmbedUrl(mapUrl, fallbackEmbedUrl) {
  const iframeSrcMatch = mapUrl?.match(/src=["']([^"']+)["']/i);
  const resolvedMapUrl = iframeSrcMatch?.[1] || mapUrl;

  if (!resolvedMapUrl) {
    return fallbackEmbedUrl;
  }

  if (resolvedMapUrl.includes("/maps/embed")) {
    return resolvedMapUrl;
  }

  return fallbackEmbedUrl;
}

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
  { label: "මිල පැකේජ", to: "/catering" },
  { label: "ඡායාරූප", href: "#gallery" },
  { label: "අප අමතන්න", href: "#contact" },
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

function useActivateOnIntersect(targetRef, { rootMargin = "240px 0px", threshold = 0.08 } = {}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      return undefined;
    }

    const target = targetRef.current;

    if (!target) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsActive(true);
        observer.disconnect();
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isActive, rootMargin, targetRef, threshold]);

  return isActive;
}

function useAutoplayVideo(videoRef, isActive) {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const attemptPlayback = () => {
      video.setAttribute("autoplay", "");
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("loop", "");
      video.autoplay = true;
      video.loop = true;
      video.preload = "metadata";
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      if (video.readyState === 0) {
        video.load();
      }

      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const handlePlaybackInterruption = () => {
      if (document.visibilityState === "visible") {
        window.setTimeout(attemptPlayback, 120);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        attemptPlayback();
      }
    };

    attemptPlayback();
    video.addEventListener("loadeddata", attemptPlayback);
    video.addEventListener("canplay", attemptPlayback);
    video.addEventListener("pause", handlePlaybackInterruption);
    video.addEventListener("stalled", handlePlaybackInterruption);
    video.addEventListener("suspend", handlePlaybackInterruption);
    video.addEventListener("waiting", handlePlaybackInterruption);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("loadeddata", attemptPlayback);
      video.removeEventListener("canplay", attemptPlayback);
      video.removeEventListener("pause", handlePlaybackInterruption);
      video.removeEventListener("stalled", handlePlaybackInterruption);
      video.removeEventListener("suspend", handlePlaybackInterruption);
      video.removeEventListener("waiting", handlePlaybackInterruption);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, videoRef]);
}

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("home");
  const [content, setContent] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState("");
  const [contactStatusType, setContactStatusType] = useState("success");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadedHeroSlides, setLoadedHeroSlides] = useState(() => new Set([0, 1]));
  const gallerySectionRef = useRef(null);
  const galleryVideoRef = useRef(null);
  const isGalleryVideoActive = useActivateOnIntersect(gallerySectionRef, { rootMargin: "240px 0px", threshold: 0.08 });

  useAutoplayVideo(galleryVideoRef, isGalleryVideoActive);

  const siteConfig = content?.siteConfig;
  const homepageServices = serviceItems;
  const homepageGallery = (content?.gallery || []).map((item, index) => ({
    title: item.title,
    image: item.imageUrl,
    layout: ["hero", "portrait", "compact", "square", "landscape"][index % 5],
    position: "center center",
  }));
  const homepageReviews = (content?.reviews || []).map((review) => ({
    name: review.customerName,
    event: review.eventType,
    score: Number(review.rating || 5).toFixed(1),
    quote: review.quote,
  }));
  const homepagePhone = siteConfig?.phone || contactPhone;
  const homepagePhoneLabel = siteConfig?.phone || contactPhoneLabel;
  const homepageEmail = siteConfig?.email || contactEmail;
  const homepageLocation = siteConfig?.address || contactLocation;
  const homepageMapUrl = siteConfig?.mapUrl || "";
  const homepageMapEmbedUrl = buildGoogleMapEmbedUrl(homepageMapUrl, contactMapEmbedUrl);

  useEffect(() => {
    api
      .get("/public/content")
      .then((response) => setContent(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const upcomingSlide = (activeSlide + 1) % heroSlides.length;

    setLoadedHeroSlides((currentSlides) => {
      if (currentSlides.has(activeSlide) && currentSlides.has(upcomingSlide)) {
        return currentSlides;
      }

      const nextSlides = new Set(currentSlides);
      nextSlides.add(activeSlide);
      nextSlides.add(upcomingSlide);
      return nextSlides;
    });
  }, [activeSlide]);

  useEffect(() => {
    if (homepageReviews.length > 0 && activeReview >= homepageReviews.length) {
      setActiveReview(0);
    }
  }, [activeReview, homepageReviews.length]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]:not(.is-visible)"));

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
  }, [content]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href?.slice(1)).filter(Boolean);
    const sections = sectionIds.map((sectionId) => document.getElementById(sectionId)).filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      const navHeight = document.querySelector(".premium-nav")?.getBoundingClientRect().height || 0;
      const marker = window.scrollY + navHeight + window.innerHeight * 0.28;
      const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const contactSection = document.getElementById("contact");

      if (pageBottom && contactSection) {
        setActiveSectionId("contact");
        return;
      }

      const currentSection = sections.reduce((activeSection, section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        return sectionTop <= marker ? section : activeSection;
      }, sections[0]);

      setActiveSectionId((currentId) => (currentId === currentSection.id ? currentId : currentSection.id));
    };

    const requestActiveSectionUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", requestActiveSectionUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("resize", requestActiveSectionUpdate);
    };
  }, [content, homepageGallery.length, homepageReviews.length]);

  function selectSlide(slideIndex) {
    setActiveSlide(slideIndex);
    setMenuOpen(false);
  }

  function handleNavAnchorClick(event, href) {
    const section = document.getElementById(href.slice(1));

    if (!section) {
      return;
    }

    event.preventDefault();
    setActiveSectionId(section.id);
    setMenuOpen(false);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  }

  function showNextSlide() {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
  }

  function showPreviousReview() {
    if (homepageReviews.length === 0) return;
    setActiveReview((currentReview) => (currentReview === 0 ? homepageReviews.length - 1 : currentReview - 1));
  }

  function showNextReview() {
    if (homepageReviews.length === 0) return;
    setActiveReview((currentReview) => (currentReview + 1) % homepageReviews.length);
  }

  function handleContactFormChange(event) {
    const { name, value } = event.target;

    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleContactFormSubmit(event) {
    event.preventDefault();

    try {
      await api.post("/public/inquiries", {
        customerName: contactForm.name,
        phone: contactForm.phone,
        eventType: contactForm.eventType || "Website inquiry",
        serviceNeeded: "Website inquiry",
        eventDate: "Not specified",
        guestCount: "Not specified",
        location: "Not specified",
        message: contactForm.message,
      });
      setContactForm({ name: "", phone: "", eventType: "", message: "" });
      setContactStatusType("success");
      setContactStatus("ඔබගේ පණිවිඩය ලැබුණා. අපි ඉක්මනින් සම්බන්ධ වෙන්නම්.");
    } catch (error) {
      console.error(error);
      setContactStatusType("error");
      setContactStatus("පණිවිඩය යැවීමේදී දෝෂයක් ඇතිවිය. කරුණාකර දුරකථනයෙන් සම්බන්ධවන්න.");
    }
  }

  const previousReviewIndex = homepageReviews.length > 0 ? (activeReview === 0 ? homepageReviews.length - 1 : activeReview - 1) : 0;
  const nextReviewIndex = homepageReviews.length > 0 ? (activeReview + 1) % homepageReviews.length : 0;

  function getInitials(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => Array.from(part)[0] ?? "")
      .join("");
  }

  return (
    <main className="premium-home">
      <header className="premium-nav">
        <a className="premium-brand" href="#home" onClick={() => setMenuOpen(false)}>
          <span className="premium-brand-logo">
            <img src="/assets/sgl-logo.png" alt="SGL Catering" />
          </span>
        </a>

        <div className="premium-nav-right">
          <nav className={`premium-nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  className="premium-nav-link"
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  className={`premium-nav-link ${activeSectionId === item.href.slice(1) ? "is-active" : ""}`}
                  href={item.href}
                  onClick={(event) => handleNavAnchorClick(event, item.href)}
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          <a className="premium-nav-cta" href={`tel:${homepagePhone}`}>
            <PhoneCall size={17} />
            <span>Call Now</span>
          </a>

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

      <section className="premium-hero" id="home">
        <div className="premium-hero-media" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.image}
              className={`premium-hero-slide ${index === activeSlide ? "is-active" : ""}`}
            >
              <img
                src={loadedHeroSlides.has(index) ? slide.image : undefined}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                fetchPriority={index === 0 ? "high" : "low"}
              />
            </div>
          ))}
        </div>

        <div className="premium-hero-overlay" aria-hidden="true" />

        <div className="premium-hero-content">
          <div className="premium-hero-panel">
            <h1>SGL කේටරින් සර්විස්</h1>
            <span className="premium-hero-subtitle">SGL Catering Service</span>
            <p>{heroDescription}</p>

            <div className="premium-hero-actions">
              <button type="button" className="premium-button premium-button-primary" onClick={showNextSlide}>
                වැඩි විස්තර
                <ChevronRight size={18} />
              </button>
              <a className="premium-button premium-button-secondary" href={`tel:${homepagePhone}`}>
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

      </section>

      <section className="premium-about" id="about">
        <div className="premium-about-shell">
          <div className="premium-about-media premium-reveal premium-reveal-media" data-reveal>
            <img
              src="/assets/sgl-images/indoor-buffet.jpg"
              alt="SGL Catering buffet setup"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="premium-about-card premium-reveal premium-reveal-card" data-reveal>
            <h2>{aboutHeading}</h2>
            <p>{aboutBody}</p>
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
            {homepageServices.map((service, index) => (
              <article key={service.title} className="premium-service-card premium-reveal premium-reveal-service" data-reveal>
                <div className="premium-service-media">
                  <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
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

      {homepageGallery.length > 0 ? (
        <section ref={gallerySectionRef} className="premium-gallery" id="gallery">
          <div className="premium-gallery-background" aria-hidden="true">
            <video
              ref={galleryVideoRef}
              className="premium-gallery-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              disableRemotePlayback
            >
              {isGalleryVideoActive ? (
                <source src="/assets/sgl-videos/gallery-background.mp4?v=3" type="video/mp4" />
              ) : null}
            </video>
            <div className="premium-gallery-veil" />
          </div>

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
              {homepageGallery.map((item) => (
                <article
                  key={item.title}
                  className={`premium-gallery-card premium-gallery-card-${item.layout} premium-reveal premium-reveal-gallery`}
                  data-reveal
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    style={{ objectPosition: item.position }}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {homepageReviews.length > 0 ? (
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
              <div className="premium-reviews-carousel">
                {homepageReviews.map((review, index) => {
                  let positionClass = "is-hidden";

                  if (index === activeReview) {
                    positionClass = "is-active";
                  } else if (index === previousReviewIndex) {
                    positionClass = "is-previous";
                  } else if (index === nextReviewIndex) {
                    positionClass = "is-next";
                  }

                  return (
                    <article key={review.name} className={`premium-review-card ${positionClass}`}>
                      <div className="premium-review-rating" aria-hidden="true">
                        <span className="premium-review-stars">★★★★★</span>
                        <strong>{review.score}</strong>
                      </div>

                      <p>{review.quote}</p>

                      <div className="premium-review-meta">
                        <div className="premium-review-avatar" aria-hidden="true">
                          {getInitials(review.name)}
                        </div>

                        <div className="premium-review-meta-copy">
                          <strong>{review.name}</strong>
                          <span>{review.event}</span>
                        </div>
                      </div>

                      <span className="premium-review-quote-mark" aria-hidden="true">
                        “
                      </span>
                    </article>
                  );
                })}
              </div>

              <div className="premium-reviews-controls">
                <button type="button" className="premium-review-arrow" aria-label="Previous review" onClick={showPreviousReview}>
                  <ChevronLeft size={20} />
                </button>

                <span className="premium-review-count">{`${String(activeReview + 1).padStart(2, "0")} / ${String(homepageReviews.length).padStart(2, "0")}`}</span>

                <button type="button" className="premium-review-arrow is-active" aria-label="Next review" onClick={showNextReview}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="premium-contact" id="contact">
        <div className="premium-contact-shell">
          <div className="premium-contact-heading premium-reveal premium-reveal-heading" data-reveal>
            <span>Reach Out To SGL</span>
            <h2>{contactHeading}</h2>
            <p>{contactDescription}</p>
          </div>

          <div className="premium-contact-layout">
            <div className="premium-contact-info premium-reveal premium-reveal-card" data-reveal>
              <div className="premium-contact-intro">
                <img className="premium-contact-logo" src="/assets/sgl-logo.png" alt="SGL Catering" />
                <h3>SGL කේටරින් සර්විස්</h3>
                <p>{brandTagline}</p>
              </div>

              <div className="premium-contact-cards">
                <a className="premium-contact-card" href={`tel:${homepagePhone}`}>
                  <span className="premium-contact-card-icon" aria-hidden="true">
                    <PhoneCall size={18} />
                  </span>
                  <div>
                    <strong>දුරකථනය</strong>
                    <span>{homepagePhoneLabel}</span>
                  </div>
                </a>

                <a className="premium-contact-card" href={`mailto:${homepageEmail}`}>
                  <span className="premium-contact-card-icon" aria-hidden="true">
                    <Mail size={18} />
                  </span>
                  <div>
                    <strong>විද්‍යුත් තැපෑල</strong>
                    <span>{homepageEmail}</span>
                  </div>
                </a>

                <div className="premium-contact-card">
                  <span className="premium-contact-card-icon" aria-hidden="true">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <strong>ස්ථානය</strong>
                    <span>{homepageLocation}</span>
                  </div>
                </div>

              </div>

              <div className="premium-contact-map" aria-label="SGL Catering location map">
                <iframe
                  title="SGL Catering location in Anuradhapura"
                  src={homepageMapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="premium-contact-form-card premium-reveal premium-reveal-card" data-reveal>
              <form className="premium-contact-form" onSubmit={handleContactFormSubmit}>
                <div className="premium-contact-form-head">
                  <h3>ඔබගේ අවශ්‍යතාවය අපට දන්වන්න</h3>
                </div>

                <div className="premium-contact-form-grid">
                  <label className="premium-contact-field">
                    <span>නම</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="ඔබගේ නම"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required
                    />
                  </label>

                  <label className="premium-contact-field">
                    <span>දුරකථන අංකය</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+94 7X XXX XXXX"
                      value={contactForm.phone}
                      onChange={handleContactFormChange}
                      required
                    />
                  </label>
                </div>

                <label className="premium-contact-field">
                  <span>උත්සව වර්ගය</span>
                  <input
                    type="text"
                    name="eventType"
                    placeholder="මංගල උත්සවය / දාන පිංකම / නිවසේ උත්සවය"
                    value={contactForm.eventType}
                    onChange={handleContactFormChange}
                  />
                </label>

                <label className="premium-contact-field">
                  <span>පණිවිඩය</span>
                  <textarea
                    name="message"
                    placeholder="ඔබගේ අවශ්‍ය විස්තර මෙහි සදහන් කරන්න"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    rows={6}
                    required
                  />
                </label>

                <button type="submit" className="premium-contact-submit">
                  <span>පණිවිඩය යවන්න</span>
                  <span className="premium-contact-submit-icon" aria-hidden="true">
                    <Send size={18} />
                  </span>
                </button>
                {contactStatus ? (
                  <div className={`premium-contact-alert is-${contactStatusType}`} role="alert">
                    {contactStatus}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="premium-footer">
        <div className="premium-footer-shell">
          <p>
            © 2026 sglcateringservice.lk by{" "}
            <a href="https://chamudithaperera.online" target="_blank" rel="noreferrer">
              chamudithaperera.online
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}

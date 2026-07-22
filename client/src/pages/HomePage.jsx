import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Menu, PhoneCall, Send, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import galleryBackgroundPoster from "../assets/gallery-background-poster.jpg";
import galleryBackgroundVideo from "../assets/gallery-background-silent.mp4";
import { api } from "../lib/api";
import { responsiveImageProps } from "../lib/imagePerformance";
import { buildSiteUrl } from "../lib/seo";
import "./HomePage.css";

const contactPhone = "+94703324500";
const contactPhoneLabel = "070 33 24 500";
const contactEmail = "sudathjayathilakabs@gmail.com";
const contactLocation = "No.360, National Housing, Stage II, Anuradhapura.";
const brandTagline = "Rajarata Symbol of Sri Lankan Traditional Food Art.........";
const heroDescription =
  "විවාහ උත්සව, ආයතනික හමුවීම් සහ පවුල් සැමරුම් සඳහා රසය, පිළිවෙළ සහ වෘත්තීයභාවය එක් කරන සුවිශේෂී කේටරින් අත්දැකීමක් අපි ඔබ වෙනුවෙන් සකස් කරමු.";
const localSearchIntro =
  "Looking for a catering service in Anuradhapura? SGL Catering Service offers catering services in Anuradhapura for weddings, home functions, almsgivings, birthdays, office events, and special celebrations.";
const localSeoFeatures = [
  "Wedding catering in Anuradhapura",
  "Birthday and home function catering",
  "Almsgiving and family event food service",
  "Office event and buffet catering",
];
const aboutHeading = "SGL කේටරින් සර්විස් යනු:";
const aboutBody =
  "වසර ගණනාවක් පුරා අනුරාධපුරය සහ අවට ප්‍රදේශවල පාරිභෝගික විශ්වාසය දිනාගත්, සෞඛ්‍යාරක්ෂිත හා ප්‍රණීත ආහාර සේවාවක් සපයන කේටරින් සේවාවකි. මංගල උත්සව, නිවසේ උත්සව, දාන පිංකම් සහ අනෙකුත් සියලුම විශේෂ අවස්ථා සඳහා රසවත් ආහාර සපයන අතර, උත්සව සඳහා අවශ්‍ය විවිධ භාණ්ඩද කුලියට ලබාදීමට අප සූදානම්.";
const contactHeading = "අප අමතන්න";
const contactDescription =
  "ඔබගේ උත්සවයට ගැළපෙන ආහාර සැපයුම්, භාණ්ඩ සැකසුම් සහ වෙන්කරවා ගැනීම් සඳහා අප සමඟ සම්බන්ධවන්න. ඔබගේ අවශ්‍යතාවයට ගැළපෙන විසඳුමක් ඉක්මනින් සකස් කරදෙන්නෙමු.";
const contactMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4934.785252954407!2d80.40432687591523!3d8.319864291715861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf5005cd65e2d%3A0x378ef91fdb3a6052!2sSGL%20Catering%20Service!5e1!3m2!1sen!2slk!4v1784484566797!5m2!1sen!2slk";
const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": buildSiteUrl("/#sgl-catering-service"),
  additionalType: "https://schema.org/FoodService",
  name: "SGL Catering Service",
  alternateName: "SGL Catering Services",
  url: buildSiteUrl("/"),
  image: [
    buildSiteUrl("/assets/sgl-images/hero-buffet.jpg"),
    buildSiteUrl("/assets/sgl-images/indoor-buffet.jpg"),
    buildSiteUrl("/assets/sgl-images/grill-buffet.jpg"),
  ],
  logo: buildSiteUrl("/assets/sgl-logo.png"),
  telephone: contactPhone,
  email: contactEmail,
  description:
    "SGL Catering Service provides catering services in Anuradhapura for weddings, home functions, almsgivings, birthdays, office events, and special celebrations.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.360, National Housing, Stage II",
    addressLocality: "Anuradhapura",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.319864291715861,
    longitude: 80.40432687591523,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Anuradhapura",
    },
    {
      "@type": "AdministrativeArea",
      name: "North Central Province",
    },
  ],
  hasMap: contactMapEmbedUrl,
  priceRange: "$$",
  servesCuisine: ["Sri Lankan", "Traditional Sri Lankan", "Buffet"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contactPhone,
    contactType: "customer service",
    areaServed: "LK",
    availableLanguage: ["Sinhala", "English"],
  },
  knowsAbout: [
    "Catering service in Anuradhapura",
    "Catering services in Anuradhapura",
    "Catering services Anuradhapura",
    "Wedding catering",
    "Birthday catering",
    "Almsgiving catering",
    "Buffet catering",
    "Event rental equipment",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Catering service in Anuradhapura",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Catering services Anuradhapura",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Wedding catering in Anuradhapura",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Home function catering in Anuradhapura",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Event rental equipment in Anuradhapura",
      },
    },
  ],
};

function buildGoogleMapEmbedUrl(mapUrl, fallbackEmbedUrl) {
  const rawMapUrl = String(mapUrl || "")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#34;", "\"")
    .replaceAll("&amp;", "&")
    .trim();
  const quotedSrcMatch = rawMapUrl.match(/src\s*=\s*["']([^"']+)["']/i);
  const looseSrcMatch = rawMapUrl.match(/src\s*=\s*["']?(https?:\/\/[^\s"'>]+)/i);

  if (/<iframe/i.test(rawMapUrl) && !quotedSrcMatch) {
    return fallbackEmbedUrl;
  }

  const resolvedMapUrl = (quotedSrcMatch?.[1] || looseSrcMatch?.[1] || rawMapUrl).trim();

  if (!resolvedMapUrl) {
    return fallbackEmbedUrl;
  }

  try {
    const parsedUrl = new URL(resolvedMapUrl);

    if (parsedUrl.hostname.endsWith("google.com") && parsedUrl.pathname === "/maps/embed") {
      return parsedUrl.toString();
    }
  } catch {
    return fallbackEmbedUrl;
  }

  return fallbackEmbedUrl;
}

function buildWhatsappUrl(phoneNumber) {
  const digits = phoneNumber?.replace(/[^\d]/g, "");

  return digits ? `https://wa.me/${digits}` : "#contact";
}

function buildExternalUrl(url) {
  if (!url) {
    return "";
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
}

function ContactPhoneIcon({ size = 22 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.52 16.38l-5.07-2.17a1.09 1.09 0 0 0-1.27.31l-2.25 2.74a16.78 16.78 0 0 1-8.02-8.02L8.66 7a1.08 1.08 0 0 0 .31-1.27L6.8.66A1.09 1.09 0 0 0 5.55.03L.84 1.11A1.09 1.09 0 0 0 0 2.17a21 21 0 0 0 21.01 21.01 1.09 1.09 0 0 0 1.06-.84l1.08-4.71a1.1 1.1 0 0 0-.63-1.25Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88ZM20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.42Z" />
    </svg>
  );
}

function FacebookIcon({ size = 22 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

function GmailIcon({ size = 22 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.46v13.91c0 .9-.73 1.63-1.64 1.63h-3.81v-9.27L12 16.64l-6.55-4.91V21H1.64C.73 21 0 20.27 0 19.37V5.46C0 3.43 2.31 2.28 3.93 3.49l1.52 1.15L12 9.55l6.55-4.91 1.52-1.15C21.69 2.28 24 3.43 24 5.46Z" />
    </svg>
  );
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

function useAutoplayVideo(videoRef, shouldPlay) {
  useEffect(() => {
    if (!shouldPlay) {
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
      video.preload = "auto";
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
  }, [shouldPlay, videoRef]);
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
  const [loadedHeroSlides, setLoadedHeroSlides] = useState(() => new Set([0]));
  const [galleryVideoReady, setGalleryVideoReady] = useState(false);
  const gallerySectionRef = useRef(null);
  const galleryVideoRef = useRef(null);

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
  const homepageWhatsapp = siteConfig?.whatsapp || homepagePhone;
  const homepageWhatsappUrl = buildWhatsappUrl(homepageWhatsapp);
  const homepageEmail = siteConfig?.email || contactEmail;
  const homepageLocation = siteConfig?.address || contactLocation;
  const homepageMapUrl = siteConfig?.mapUrl || "";
  const homepageMapEmbedUrl = buildGoogleMapEmbedUrl(homepageMapUrl, contactMapEmbedUrl);
  const homepageFacebookUrl = buildExternalUrl(siteConfig?.facebookUrl);
  const facebookActionProps = homepageFacebookUrl
    ? { href: homepageFacebookUrl, target: "_blank", rel: "noreferrer" }
    : { href: "#contact" };

  useAutoplayVideo(galleryVideoRef, galleryVideoReady);

  useEffect(() => {
    api
      .get("/public/home")
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
    const preloadDelay = window.setTimeout(() => {
      setLoadedHeroSlides((currentSlides) => {
        if (currentSlides.has(activeSlide) && currentSlides.has(upcomingSlide)) {
          return currentSlides;
        }

        const nextSlides = new Set(currentSlides);
        nextSlides.add(activeSlide);
        nextSlides.add(upcomingSlide);
        return nextSlides;
      });
    }, 1400);

    return () => window.clearTimeout(preloadDelay);
  }, [activeSlide]);

  useEffect(() => {
    const gallerySection = gallerySectionRef.current;

    if (!gallerySection || galleryVideoReady) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryVideoReady(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "700px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(gallerySection);

    return () => observer.disconnect();
  }, [galleryVideoReady]);

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
    setLoadedHeroSlides((currentSlides) => {
      if (currentSlides.has(slideIndex)) {
        return currentSlides;
      }

      const nextSlides = new Set(currentSlides);
      nextSlides.add(slideIndex);
      return nextSlides;
    });
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
      <Seo
        title="Catering Service in Anuradhapura | SGL Catering Service"
        description="SGL Catering Service is a catering service in Anuradhapura for weddings, home functions, almsgivings, birthdays, office events, buffet menus, and event rentals."
        canonicalPath="/"
        keywords={[
          "sgl catering service",
          "catering service in anuradhapura",
          "catering services in anuradhapura",
          "catering services anuradhapura",
          "Anuradhapura catering",
          "wedding catering Anuradhapura",
          "buffet catering Sri Lanka",
        ]}
        structuredData={homeStructuredData}
      />
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
                {...responsiveImageProps(loadedHeroSlides.has(index) ? slide.image : undefined, "100vw")}
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
            <strong className="premium-hero-search-title">Catering Service in Anuradhapura</strong>
            <p>{heroDescription}</p>
            <p className="premium-hero-local">{localSearchIntro}</p>

            <div className="premium-hero-actions">
              <button type="button" className="premium-button premium-button-primary" onClick={(event) => handleNavAnchorClick(event, "#services")}>
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
              {...responsiveImageProps("/assets/sgl-images/indoor-buffet.jpg", "(max-width: 900px) 100vw, 50vw")}
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
                  <img
                    {...responsiveImageProps(service.image, "(max-width: 900px) 100vw, 50vw")}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                  />
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

      <section className="premium-local-seo" aria-labelledby="local-catering-heading">
        <div className="premium-local-seo-shell">
          <div className="premium-local-seo-copy premium-reveal premium-reveal-card" data-reveal>
            <span>Local Catering</span>
            <h2 id="local-catering-heading">Catering Services in Anuradhapura</h2>
            <p>
              SGL Catering Service provides catering services Anuradhapura families and businesses can book
              for weddings, birthdays, home functions, almsgivings, office events, and buffet-style celebrations.
            </p>
            <p>
              If you are searching for a catering service in Anuradhapura, our team can help plan the menu,
              food quantities, serving style, and event rental items for your function.
            </p>
          </div>

          <div className="premium-local-seo-list premium-reveal premium-reveal-service" data-reveal>
            {localSeoFeatures.map((feature) => (
              <div className="premium-local-seo-item" key={feature}>
                <span aria-hidden="true">✓</span>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-gallery" id="gallery" ref={gallerySectionRef}>
        <div className="premium-gallery-background" aria-hidden="true">
          <video
            ref={galleryVideoRef}
            className="premium-gallery-video"
            autoPlay
            muted
            loop
            playsInline
            preload={galleryVideoReady ? "metadata" : "none"}
            poster={galleryBackgroundPoster}
            disablePictureInPicture
            disableRemotePlayback
          >
            {galleryVideoReady ? <source src={galleryBackgroundVideo} type="video/mp4" /> : null}
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

          {homepageGallery.length > 0 ? (
            <div className="premium-gallery-grid">
              {homepageGallery.map((item) => (
                <article
                  key={item.title}
                  className={`premium-gallery-card premium-gallery-card-${item.layout} premium-reveal premium-reveal-gallery`}
                  data-reveal
                >
                  <img
                    {...responsiveImageProps(item.image, "(max-width: 680px) 50vw, 25vw")}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    style={{ objectPosition: item.position }}
                  />
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

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

              <div className="premium-contact-actions" aria-label="Contact options">
                <a className="premium-contact-action" href={`tel:${homepagePhone}`} aria-label="Call SGL Catering" title="Call">
                  <ContactPhoneIcon size={22} />
                </a>
                <a
                  className="premium-contact-action is-whatsapp"
                  href={homepageWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message SGL Catering on WhatsApp"
                  title="WhatsApp"
                >
                  <WhatsAppIcon size={23} />
                </a>
                <a
                  className="premium-contact-action is-facebook"
                  {...facebookActionProps}
                  aria-label="Open SGL Catering on Facebook"
                  title="Facebook"
                >
                  <FacebookIcon size={23} />
                </a>
                <a className="premium-contact-action" href={`mailto:${homepageEmail}`} aria-label="Email SGL Catering" title="Email">
                  <GmailIcon size={23} />
                </a>
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

          <div className="premium-contact-map premium-reveal premium-reveal-card" data-reveal aria-label="SGL Catering location map">
            <iframe
              title="SGL Catering location in Anuradhapura"
              src={homepageMapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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

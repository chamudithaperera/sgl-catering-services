import { useState } from "react";
import { Mail, MessageCircle, PhoneCall, X } from "lucide-react";
import "./FloatingContact.css";

const contactPhone = "+94712345678";
const contactEmail = "info@sglcateringservice.lk";
const whatsappHref = `https://wa.me/${contactPhone.replace(/[^\d]/g, "")}`;

export function FloatingContact() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((currentState) => !currentState);
  }

  return (
    <div className={`site-floating-contact ${menuOpen ? "is-open" : ""}`}>
      <div className="site-floating-actions" aria-hidden={!menuOpen}>
        <a className="site-floating-link site-floating-link-call" href={`tel:${contactPhone}`} aria-label="Call us">
          <PhoneCall size={20} />
        </a>
        <a
          className="site-floating-link site-floating-link-whatsapp"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp us"
        >
          <MessageCircle size={20} />
        </a>
        <a className="site-floating-link site-floating-link-email" href={`mailto:${contactEmail}`} aria-label="Email us">
          <Mail size={20} />
        </a>
      </div>

      <button
        type="button"
        className="site-floating-toggle"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close contact menu" : "Open contact menu"}
        onClick={toggleMenu}
      >
        {menuOpen ? <X size={24} /> : <PhoneCall size={22} />}
      </button>
    </div>
  );
}

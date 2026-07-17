import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./ServiceShowcasePage.css";

export function ServiceShowcasePage({ title, description, eyebrow, image }) {
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
          <img src={image} alt="" loading="eager" decoding="async" fetchPriority="high" />
        </div>

        <div className="service-page-overlay" aria-hidden="true" />

        <div className="service-page-content">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useState } from "react";
import { CheckCircle2, PhoneCall, Send, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { api } from "../lib/api";
import "./ReviewsPage.css";

const eventOptions = [
  { sinhala: "මංගල උත්සවය", english: "Wedding" },
  { sinhala: "උපන්දින උත්සවය", english: "Birthday party" },
  { sinhala: "ආයතනික උත්සවය", english: "Corporate event" },
  { sinhala: "දාන පිංකම", english: "Almsgiving" },
  { sinhala: "නිවසේ උත්සවය", english: "Home function" },
  { sinhala: "වෙනත්", english: "Other" },
];

const initialReviewForm = {
  customerName: "",
  eventType: "",
  rating: 5,
  note: "",
};

const defaultReviewsText = {
  titleSinhala: "ඔබගේ අත්දැකීම අප සමඟ බෙදාගන්න",
  titleEnglish: "Customer Reviews",
  descriptionSinhala:
    "ඔබගේ උත්සවය ගැන කෙටි අදහසක් එක් කරන්න. අපගේ කණ්ඩායම එය සමාලෝචනය කර අනුමත කිරීමෙන් පසු වෙබ් අඩවියේ පෙන්වනු ලැබේ.",
  descriptionEnglish:
    "Share a short review about your event. After our team reviews and approves it, your feedback will be shown on the website.",
};

function buildTelUrl(phoneNumber) {
  const digits = phoneNumber?.replace(/[^\d+]/g, "");

  return digits ? `tel:${digits}` : "#";
}

function BilingualText({ as: Component = "span", className = "", english, sinhala }) {
  return (
    <Component className={`reviews-bilingual${className ? ` ${className}` : ""}`}>
      <span>{sinhala}</span>
      <small>{english}</small>
    </Component>
  );
}

export default function ReviewsPage() {
  const [form, setForm] = useState(initialReviewForm);
  const [status, setStatus] = useState("");
  const [statusEnglish, setStatusEnglish] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageContent, setPageContent] = useState(null);
  const reviewsText = {
    ...defaultReviewsText,
    ...(pageContent?.webTexts?.reviews || {}),
  };
  const callPhone = pageContent?.siteConfig?.phone || "";

  useEffect(() => {
    api
      .get("/public/home")
      .then((response) => setPageContent(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    setStatusEnglish("");

    try {
      await api.post("/public/reviews", {
        customerName: form.customerName,
        eventType: form.eventType,
        rating: form.rating,
        quote: form.note,
      });
      setForm(initialReviewForm);
      setStatusType("success");
      setStatus("ඔබගේ අදහස ලැබුණා. අනුමත කිරීමෙන් පසු එය වෙබ් අඩවියේ පෙන්වනු ලැබේ.");
      setStatusEnglish("Your review has been received. It will be shown on the website after approval.");
    } catch (error) {
      console.error(error);
      setStatusType("error");
      setStatus("අදහස යැවීමේදී දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න.");
      setStatusEnglish("Something went wrong while sending your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="reviews-page">
      <Seo
        title={`${reviewsText.titleEnglish} | SGL Catering Services`}
        description={reviewsText.descriptionEnglish || reviewsText.descriptionSinhala}
        canonicalPath="/reviews"
        image="/assets/sgl-logo.png"
        siteName="SGL Catering Services"
      />

      <header className="reviews-nav">
        <Link className="reviews-brand" to="/">
          <span>
            <img src="/assets/sgl-logo.png" alt="Site logo" />
          </span>
        </Link>
        <nav aria-label="Primary">
          <Link to="/">
            <BilingualText english="Home" sinhala="මුල් පිටුව" />
          </Link>
          <Link className="is-active" to="/reviews">
            <BilingualText english="Reviews" sinhala="අදහස්" />
          </Link>
        </nav>
        <a className="reviews-call-button" href={buildTelUrl(callPhone)}>
          <PhoneCall size={17} />
          <span>Call Now</span>
        </a>
      </header>

      <section className="reviews-content">
        <form className="reviews-form" onSubmit={handleSubmit}>
          <div className="reviews-form-head">
            <BilingualText className="reviews-form-eyebrow" english="New review" sinhala="නව අදහසක්" />
            <BilingualText as="h2" english="Submit your review" sinhala="අදහස යවන්න" />
          </div>

          <label className="reviews-field">
            <BilingualText english="Name" sinhala="නම" />
            <input
              minLength={2}
              name="customerName"
              onChange={updateField}
              placeholder="ඔබගේ නම / Your name"
              required
              value={form.customerName}
            />
          </label>

          <label className="reviews-field">
            <BilingualText english="Event type" sinhala="උත්සව වර්ගය" />
            <select name="eventType" onChange={updateField} required value={form.eventType}>
              <option value="">උත්සව වර්ගය තෝරන්න / Select event type</option>
              {eventOptions.map((eventType) => (
                <option key={eventType.sinhala} value={eventType.sinhala}>
                  {eventType.sinhala} / {eventType.english}
                </option>
              ))}
            </select>
          </label>

          <div className="reviews-field">
            <BilingualText english="Rating" sinhala="තරු අගය" />
            <div className="reviews-rating-picker" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  aria-checked={Number(form.rating) === rating}
                  className={Number(form.rating) >= rating ? "is-selected" : ""}
                  key={rating}
                  onClick={() => setForm((currentForm) => ({ ...currentForm, rating }))}
                  role="radio"
                  type="button"
                >
                  <Star size={24} fill="currentColor" />
                </button>
              ))}
            </div>
          </div>

          <label className="reviews-field">
            <BilingualText english="Review" sinhala="අදහස" />
            <textarea
              minLength={10}
              name="note"
              onChange={updateField}
              placeholder="සේවාව, රසය, කාලයට පැමිණීම හෝ ඔබ කැමති වූ දේ ගැන ලියන්න / Write about the service, taste, timing, or what you liked"
              required
              rows={6}
              value={form.note}
            />
          </label>

          <button className="reviews-submit" disabled={isSubmitting} type="submit">
            <BilingualText english={isSubmitting ? "Sending..." : "Submit review"} sinhala={isSubmitting ? "යවමින්..." : "අදහස යවන්න"} />
            <Send size={18} />
          </button>

          {status ? (
            <div className={`reviews-alert is-${statusType}`} role="alert">
              {statusType === "success" ? <CheckCircle2 size={18} /> : null}
              <BilingualText english={statusEnglish} sinhala={status} />
            </div>
          ) : null}
        </form>
      </section>
    </main>
  );
}

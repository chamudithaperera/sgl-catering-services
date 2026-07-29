import { useState } from "react";
import { CheckCircle2, PhoneCall, Send, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { api } from "../lib/api";
import "./ReviewsPage.css";

const eventOptions = [
  "මංගල උත්සවය",
  "උපන්දින උත්සවය",
  "ආයතනික උත්සවය",
  "දාන පිංකම",
  "නිවසේ උත්සවය",
  "වෙනත්",
];

const initialReviewForm = {
  customerName: "",
  eventType: "",
  rating: 5,
  note: "",
};

function buildTelUrl(phoneNumber) {
  const digits = phoneNumber?.replace(/[^\d+]/g, "");

  return digits ? `tel:${digits}` : "#";
}

export default function ReviewsPage() {
  const [form, setForm] = useState(initialReviewForm);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const callPhone = "0703324350";

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
    } catch (error) {
      console.error(error);
      setStatusType("error");
      setStatus("අදහස යැවීමේදී දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="reviews-page">
      <Seo
        title="Customer Reviews | SGL Catering Services"
        description="Share your SGL Catering Services experience with a customer review."
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
          <Link to="/">මුල් පිටුව</Link>
          <Link className="is-active" to="/reviews">අදහස්</Link>
        </nav>
        <a className="reviews-call-button" href={buildTelUrl(callPhone)}>
          <PhoneCall size={17} />
          <span>Call Now</span>
        </a>
      </header>

      <section className="reviews-hero">
        <div className="reviews-hero-copy">
          <span>Customer Reviews</span>
          <h1>ඔබගේ අත්දැකීම අප සමඟ බෙදාගන්න</h1>
          <p>ඔබගේ උත්සවය ගැන කෙටි අදහසක් එක් කරන්න. අපගේ කණ්ඩායම එය සමාලෝචනය කර අනුමත කිරීමෙන් පසු වෙබ් අඩවියේ පෙන්වනු ලැබේ.</p>
        </div>
      </section>

      <section className="reviews-content">
        <form className="reviews-form" onSubmit={handleSubmit}>
          <div className="reviews-form-head">
            <span>නව අදහසක්</span>
            <h2>අදහස යවන්න</h2>
          </div>

          <label className="reviews-field">
            <span>නම</span>
            <input
              minLength={2}
              name="customerName"
              onChange={updateField}
              placeholder="ඔබගේ නම"
              required
              value={form.customerName}
            />
          </label>

          <label className="reviews-field">
            <span>උත්සව වර්ගය</span>
            <select name="eventType" onChange={updateField} required value={form.eventType}>
              <option value="">උත්සව වර්ගය තෝරන්න</option>
              {eventOptions.map((eventType) => (
                <option key={eventType} value={eventType}>
                  {eventType}
                </option>
              ))}
            </select>
          </label>

          <div className="reviews-field">
            <span>තරු අගය</span>
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
            <span>අදහස</span>
            <textarea
              minLength={10}
              name="note"
              onChange={updateField}
              placeholder="සේවාව, රසය, කාලයට පැමිණීම හෝ ඔබ කැමති වූ දේ ගැන ලියන්න"
              required
              rows={6}
              value={form.note}
            />
          </label>

          <button className="reviews-submit" disabled={isSubmitting} type="submit">
            <span>{isSubmitting ? "යවමින්..." : "අදහස යවන්න"}</span>
            <Send size={18} />
          </button>

          {status ? (
            <div className={`reviews-alert is-${statusType}`} role="alert">
              {statusType === "success" ? <CheckCircle2 size={18} /> : null}
              <span>{status}</span>
            </div>
          ) : null}
        </form>
      </section>
    </main>
  );
}

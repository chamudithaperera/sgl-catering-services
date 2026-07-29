import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Send, Star } from "lucide-react";
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

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => Array.from(part)[0] ?? "")
    .join("");
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState(initialReviewForm);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = useMemo(() => {
    if (!reviews.length) return "5.0";
    const total = reviews.reduce((sum, review) => sum + Number(review.rating || 5), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  useEffect(() => {
    api
      .get("/public/content")
      .then((response) => setReviews(response.data.reviews || []))
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
        description="Share your SGL Catering Services experience and read approved customer reviews."
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
          <Link to="/catering">කේටරින්</Link>
          <Link to="/renting">කුලී භාණ්ඩ</Link>
          <Link className="is-active" to="/reviews">අදහස්</Link>
        </nav>
      </header>

      <section className="reviews-hero">
        <div className="reviews-hero-copy">
          <span>Customer Reviews</span>
          <h1>ඔබගේ අත්දැකීම අප සමඟ බෙදාගන්න</h1>
          <p>ඔබගේ උත්සවය ගැන කෙටි අදහසක් එක් කරන්න. අපගේ කණ්ඩායම එය සමාලෝචනය කර අනුමත කිරීමෙන් පසු වෙබ් අඩවියේ පෙන්වනු ලැබේ.</p>
        </div>
        <div className="reviews-hero-score" aria-label={`Average rating ${averageRating}`}>
          <Star size={28} fill="currentColor" />
          <strong>{averageRating}</strong>
          <span>{reviews.length ? `${reviews.length} approved reviews` : "Approved customer feedback"}</span>
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

        <section className="reviews-approved" aria-label="Approved reviews">
          <div className="reviews-approved-head">
            <span>Approved Reviews</span>
            <h2>පාරිභෝගික අදහස්</h2>
          </div>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <article className="reviews-card" key={`${review.customerName}-${index}`}>
                <div className="reviews-card-stars" aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(Number(review.rating || 5))}
                </div>
                <p>{review.quote}</p>
                <div className="reviews-card-meta">
                  <span aria-hidden="true">{getInitials(review.customerName)}</span>
                  <div>
                    <strong>{review.customerName}</strong>
                    <small>{review.eventType}</small>
                  </div>
                </div>
              </article>
            ))}

            {!reviews.length ? (
              <div className="reviews-empty">
                <Star size={22} />
                <span>අනුමත කළ අදහස් තවම නොමැත.</span>
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
}

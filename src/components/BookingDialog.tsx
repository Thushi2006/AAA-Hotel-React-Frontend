import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useHotel } from "../lib/context";
import { rooms } from "../data/hotel";
import {
  addDays,
  fitsGuests,
  formatDate,
  formatMoney,
  localToday,
  quoteStay,
  validateSearch,
} from "../lib/booking";
import type { Extras, GuestDetails, Room } from "../lib/types";
import { Button, Eyebrow, Image, Modal } from "./ui";
export default function BookingDialog({
  preferred,
  onClose,
}: {
  preferred?: Room;
  onClose: () => void;
}) {
  const { search, setSearch, currency, setReservations, navigate } = useHotel();
  const [step, setStep] = useState(0);
  const [roomId, setRoomId] = useState(
    preferred?.id ?? rooms.find((r) => fitsGuests(r, search))?.id ?? "",
  );
  const [extras, setExtras] = useState<Extras>({
    breakfast: search.promo === "ISLANDMORNINGS",
    transfer: false,
  });
  const [guest, setGuest] = useState<GuestDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: "",
    accessibility: "",
    dietary: "",
  });
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [savedId, setSavedId] = useState("");
  const room = rooms.find((r) => r.id === roomId);
  const valid = validateSearch(search) === null;
  const quote = room && valid ? quoteStay(room, search, extras) : null;
  const eligible = rooms.filter((r) => fitsGuests(r, search));
  function next() {
    const issue = validateSearch(search);
    if (issue) {
      setError(issue);
      return;
    }
    if (!room || !fitsGuests(room, search)) {
      setError("Choose a room with enough space for your guests.");
      return;
    }
    setError("");
    setStep(1);
  }
  function finish() {
    if (!room || !quote || !accepted) return;
    const issue = validateSearch(search);
    if (issue) {
      setError(issue);
      setStep(0);
      return;
    }
    const id = "AAA-" + crypto.randomUUID().slice(0, 8).toUpperCase();
    setReservations((current) => [
      ...current,
      {
        id,
        roomId: room.id,
        search: { ...search },
        guest: { ...guest },
        extras: { ...extras },
        quote,
        status: "Preview",
        createdAt: new Date().toISOString(),
      },
    ]);
    setSavedId(id);
    setStep(3);
  }
  useEffect(() => {
    document.querySelector(".booking-modal")?.scrollTo({ top: 0 });
  }, [step]);
  const updateGuest = (key: keyof GuestDetails, value: string) =>
    setGuest({ ...guest, [key]: value });
  return (
    <Modal
      title="Reserve your stay"
      onClose={onClose}
      wide
      className="booking-modal"
    >
      <div className="booking-dialog-header">
        <Eyebrow>A LITTLE CLOSER TO YOUR ISLAND</Eyebrow>
        <h2>
          {step === 3
            ? "Your escape, imagined."
            : step === 2
              ? "The little details."
              : step === 1
                ? "Make it your own."
                : "Your island is waiting."}
        </h2>
        {step < 3 && (
          <ol className="booking-steps">
            {["Your stay", "Your details", "Review"].map((s, i) => (
              <li
                key={s}
                className={step === i ? "current" : step > i ? "complete" : ""}
              >
                <span>{step > i ? <Check size={12} /> : i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        )}
      </div>
      {step === 3 ? (
        <div className="booking-success">
          <CheckCircle2 size={50} strokeWidth={1} />
          <h3>A little something to look forward to.</h3>
          <p>Your preview reservation is ready.</p>
          <span className="confirmation-code">{savedId}</span>
          <p>
            This is a local demonstration. No room has been reserved, no payment
            has been taken and no email has been sent.
          </p>
          <div className="button-row">
            <Button
              onClick={() => {
                onClose();
                navigate("guest");
              }}
            >
              View in your guest area
            </Button>
            <button className="simple-link" onClick={onClose}>
              Continue exploring
            </button>
          </div>
        </div>
      ) : (
        <div className="booking-dialog-layout">
          <div className="booking-dialog-main">
            {step === 0 ? (
              <>
                <div className="form-grid">
                  <label>
                    Arrival
                    <input
                      type="date"
                      value={search.checkIn}
                      min={localToday()}
                      onChange={(e) => {
                        const checkIn = e.target.value;
                        setSearch({
                          ...search,
                          checkIn,
                          checkOut:
                            checkIn >= search.checkOut
                              ? addDays(checkIn, 1)
                              : search.checkOut,
                        });
                      }}
                    />
                  </label>
                  <label>
                    Departure
                    <input
                      type="date"
                      min={
                        search.checkIn
                          ? addDays(search.checkIn, 1)
                          : localToday()
                      }
                      value={search.checkOut}
                      onChange={(e) =>
                        setSearch({ ...search, checkOut: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Adults
                    <select
                      value={search.adults}
                      onChange={(e) =>
                        setSearch({ ...search, adults: Number(e.target.value) })
                      }
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "adult" : "adults"}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Children (ages 0–12)
                    <select
                      value={search.children}
                      onChange={(e) =>
                        setSearch({
                          ...search,
                          children: Number(e.target.value),
                        })
                      }
                    >
                      {[0, 1, 2, 3].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "child" : "children"}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="full-width">
                    Offer code <small>Optional</small>
                    <input
                      value={search.promo}
                      onChange={(e) =>
                        setSearch({
                          ...search,
                          promo: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="e.g. SLOWSTAY"
                    />
                  </label>
                </div>
                <h3 className="subheading">Choose your little corner</h3>
                <p className="quiet-note">
                  Preview options for your guest count. Live room availability
                  is not connected.
                </p>
                <div className="booking-room-options">
                  {eligible.map((r) => (
                    <label
                      key={r.id}
                      className={roomId === r.id ? "selected" : ""}
                    >
                      <input
                        type="radio"
                        name="room"
                        checked={roomId === r.id}
                        onChange={() => setRoomId(r.id)}
                      />
                      <Image src={r.image} alt={r.name} />
                      <span>
                        <b>{r.name}</b>
                        <small>
                          <UsersRound size={12} />
                          Up to {r.capacity} · {r.size} m²
                        </small>
                        <strong>
                          {formatMoney(r.rate, currency)} <small>/ night</small>
                        </strong>
                      </span>
                      <span className="option-check">
                        {roomId === r.id && <Check size={14} />}
                      </span>
                    </label>
                  ))}
                  {!eligible.length && (
                    <p>
                      No single room fits this guest count. Please adjust it or
                      send a group enquiry.
                    </p>
                  )}
                </div>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <Button onClick={next} disabled={!eligible.length}>
                  Continue to your details
                </Button>
              </>
            ) : step === 1 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                  setError("");
                }}
              >
                <div className="form-grid">
                  <label>
                    First name
                    <input
                      autoComplete="given-name"
                      required
                      maxLength={80}
                      value={guest.firstName}
                      onChange={(e) => updateGuest("firstName", e.target.value)}
                    />
                  </label>
                  <label>
                    Last name
                    <input
                      autoComplete="family-name"
                      required
                      maxLength={80}
                      value={guest.lastName}
                      onChange={(e) => updateGuest("lastName", e.target.value)}
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      value={guest.email}
                      onChange={(e) => updateGuest("email", e.target.value)}
                    />
                  </label>
                  <label>
                    Telephone <small>Optional</small>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={guest.phone}
                      onChange={(e) => updateGuest("phone", e.target.value)}
                    />
                  </label>
                </div>
                <p className="quiet-note">
                  Preview only. Use sample details; nothing is sent or stored
                  after refresh.
                </p>
                <h3 className="subheading">A few thoughtful extras</h3>
                <div className="extras-options">
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        extras.breakfast || search.promo === "ISLANDMORNINGS"
                      }
                      disabled={search.promo === "ISLANDMORNINGS"}
                      onChange={(e) =>
                        setExtras({ ...extras, breakfast: e.target.checked })
                      }
                    />
                    <span>
                      <b>Slow island breakfasts</b>
                      <small>
                        {formatMoney(4500, currency)} per adult, per night.
                        Children’s meals confirmed separately.
                      </small>
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={extras.transfer}
                      onChange={(e) =>
                        setExtras({ ...extras, transfer: e.target.checked })
                      }
                    />
                    <span>
                      <b>A seamless arrival</b>
                      <small>
                        Private airport transfer ·{" "}
                        {formatMoney(28000, currency)} per booking. Route to be
                        confirmed.
                      </small>
                    </span>
                  </label>
                </div>
                <div className="form-grid">
                  <label>
                    Dietary preference <small>Optional</small>
                    <select
                      value={guest.dietary}
                      onChange={(e) => updateGuest("dietary", e.target.value)}
                    >
                      <option value="">No preference selected</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Halal enquiry</option>
                      <option>Other — discuss with the hotel</option>
                    </select>
                  </label>
                  <label>
                    Accessibility request <small>Optional</small>
                    <select
                      value={guest.accessibility}
                      onChange={(e) =>
                        updateGuest("accessibility", e.target.value)
                      }
                    >
                      <option value="">No request selected</option>
                      <option>Step-free access enquiry</option>
                      <option>Accessible bathroom enquiry</option>
                      <option>Other — discuss with the hotel</option>
                    </select>
                  </label>
                  <label className="full-width">
                    Anything else to make your stay yours?
                    <textarea
                      rows={3}
                      maxLength={1000}
                      value={guest.requests}
                      onChange={(e) => updateGuest("requests", e.target.value)}
                      placeholder="A special occasion, arrival time, or a little request…"
                    />
                  </label>
                </div>
                <p className="quiet-note">
                  All special requests require confirmation by the hotel. Avoid
                  entering medical or other sensitive information.
                </p>
                <div className="step-actions">
                  <button
                    type="button"
                    className="simple-link"
                    onClick={() => setStep(0)}
                  >
                    <ArrowLeft size={15} /> Your stay
                  </button>
                  <Button type="submit">Review your stay</Button>
                </div>
              </form>
            ) : (
              <>
                <div className="review-intro">
                  <CheckCircle2 size={23} />
                  <p>Take a moment. Make sure it feels like you.</p>
                </div>
                <div className="review-details">
                  <div>
                    <span>YOUR SPACE</span>
                    <b>{room?.name}</b>
                  </div>
                  <div>
                    <span>YOUR DATES</span>
                    <b>
                      {formatDate(search.checkIn, true)} –{" "}
                      {formatDate(search.checkOut, true)}
                    </b>
                  </div>
                  <div>
                    <span>YOUR COMPANY</span>
                    <b>
                      {search.adults} {search.adults === 1 ? "adult" : "adults"}
                      {search.children ? `, ${search.children} children` : ""}
                    </b>
                  </div>
                  <div>
                    <span>YOUR NAME</span>
                    <b>
                      {guest.firstName} {guest.lastName}
                    </b>
                  </div>
                  <div>
                    <span>YOUR CONTACT</span>
                    <b>{guest.email}</b>
                  </div>
                  <div>
                    <span>YOUR EXTRAS</span>
                    <b>
                      {[
                        extras.breakfast || search.promo === "ISLANDMORNINGS"
                          ? "Breakfast"
                          : null,
                        extras.transfer ? "Airport transfer" : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "Room only"}
                    </b>
                  </div>
                </div>
                {guest.requests && (
                  <div className="review-request">
                    <b>Your request</b>
                    <p>{guest.requests}</p>
                  </div>
                )}
                <div className="preview-explanation">
                  <ShieldCheck size={20} />
                  <p>
                    <b>A preview, with peace of mind.</b>No payment details are
                    collected. No booking is sent to the hotel. Sample taxes and
                    fees are illustrative and require client approval.
                  </p>
                </div>
                <label className="consent-check">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                  />
                  <span>
                    I understand this creates a preview reservation only, and
                    does not reserve a room.
                  </span>
                </label>
                {error && (
                  <p role="alert" className="form-error">
                    {error}
                  </p>
                )}
                <div className="step-actions">
                  <button className="simple-link" onClick={() => setStep(1)}>
                    <ArrowLeft size={15} /> Your details
                  </button>
                  <Button onClick={finish} disabled={!accepted}>
                    Create preview reservation
                  </Button>
                </div>
              </>
            )}
          </div>
          <aside className="booking-summary">
            {room && <Image src={room.image} alt={room.name} />}
            <div>
              <Eyebrow>YOUR STAY AT A GLANCE</Eyebrow>
              <h3>{room?.name ?? "Choose your space"}</h3>
              {valid && quote ? (
                <>
                  <p>
                    {formatDate(search.checkIn, true)} <ArrowRight size={12} />{" "}
                    {formatDate(search.checkOut, true)}
                  </p>
                  <span className="summary-nights">
                    {quote.nights} {quote.nights === 1 ? "night" : "nights"} ·{" "}
                    {search.adults + search.children} guests
                  </span>
                  <dl>
                    <div>
                      <dt>Room · {quote.nights} nights</dt>
                      <dd>{formatMoney(quote.base, currency)}</dd>
                    </div>
                    {quote.discount > 0 && (
                      <div className="discount">
                        <dt>SLOWSTAY · 12%</dt>
                        <dd>−{formatMoney(quote.discount, currency)}</dd>
                      </div>
                    )}
                    <div>
                      <dt>Extras</dt>
                      <dd>{formatMoney(quote.extras, currency)}</dd>
                    </div>
                    <div>
                      <dt>Sample taxes & fees · 10%</dt>
                      <dd>{formatMoney(quote.tax, currency)}</dd>
                    </div>
                    <div className="summary-total">
                      <dt>Stay total</dt>
                      <dd>{formatMoney(quote.total, currency)}</dd>
                    </div>
                  </dl>
                </>
              ) : (
                <p>Choose valid dates to see a price preview.</p>
              )}
              <p className="quiet-note">
                Illustrative pricing.{" "}
                {currency === "USD"
                  ? "USD estimates use a fixed demo exchange rate of LKR 305 = USD 1. Final settlement is in LKR."
                  : ""}
              </p>
            </div>
          </aside>
        </div>
      )}
    </Modal>
  );
}

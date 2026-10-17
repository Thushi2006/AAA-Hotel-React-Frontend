import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ConciergeBell,
  Heart,
  LogOut,
  ReceiptText,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { useHotel } from "../lib/context";
import type { Reservation, StaySearch } from "../lib/types";
import { rooms } from "../data/hotel";
import {
  addDays,
  formatDate,
  formatMoney,
  localToday,
  quoteStay,
  validateSearch,
} from "../lib/booking";
import { Button, Eyebrow, Image, Modal } from "../components/ui";
const tabs = [
  { id: "stays", label: "Your stays", icon: CalendarDays },
  { id: "requests", label: "A little assistance", icon: ConciergeBell },
  { id: "preferences", label: "Your preferences", icon: Heart },
  { id: "folio", label: "Your stay summary", icon: ReceiptText },
];
export default function GuestPage() {
  const {
    reservations,
    setReservations,
    currency,
    book,
    notify,
    guestSession,
    setGuestSession,
    guestPreferences,
    setGuestPreferences,
    guestRequests: requests,
    setGuestRequests: setRequests,
  } = useHotel();
  const entered = guestSession.entered;
  const setEntered = (v: boolean) =>
    setGuestSession((s) => ({ ...s, entered: v }));
  const [authTab, setAuthTab] = useState("Sign in");
  const name = guestSession.name;
  const setName = (v: string) => setGuestSession((s) => ({ ...s, name: v }));
  const [tab, setTab] = useState("stays");
  const [cancel, setCancel] = useState<Reservation | null>(null);
  const [edit, setEdit] = useState<Reservation | null>(null);
  const [dates, setDates] = useState<StaySearch | null>(null);
  const [error, setError] = useState("");
  const [preferredName, setPreferredName] = useState(guestPreferences.name);
  const [diet, setDiet] = useState(guestPreferences.diet);
  const [pillow, setPillow] = useState(guestPreferences.pillow);
  const [requestType, setRequestType] = useState("Fresh towels");
  const [requestNotes, setRequestNotes] = useState("");
  const active = reservations.find((r) => r.status === "Preview");
  if (!entered)
    return (
      <section className="guest-entry">
        <div className="guest-entry-image">
          <Image src="/media/suite-garden.jpg" alt="A calm guest room" eager />
          <div>
            <Eyebrow light>YOUR OWN LITTLE CORNER</Eyebrow>
            <h1>
              A stay that
              <br />
              feels <i>like you.</i>
            </h1>
          </div>
        </div>
        <div className="guest-entry-form">
          <Eyebrow>WELCOME TO YOUR GUEST AREA</Eyebrow>
          <h2>
            Make yourself
            <br />
            <i>at home.</i>
          </h2>
          <p>
            View your stays, share your preferences and explore the little
            touches that make a difference.
          </p>
          <div className="filter-tabs">
            {["Sign in", "Join AAA"].map((a) => (
              <button
                className={authTab === a ? "active" : ""}
                key={a}
                onClick={() => setAuthTab(a)}
              >
                {a}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              setName(
                String(data.get("name") || active?.guest.firstName || "Guest"),
              );
              setEntered(true);
            }}
          >
            {authTab === "Join AAA" && (
              <label>
                Your name
                <input
                  name="name"
                  placeholder="Sample guest"
                  required
                  autoComplete="off"
                />
              </label>
            )}
            <label>
              Email address
              <input
                name="email"
                placeholder="guest@example.com"
                required
                type="email"
                autoComplete="off"
              />
            </label>
            <label>
              Sample password
              <input
                name="password"
                placeholder="Use a sample password"
                required
                type="password"
                minLength={6}
                autoComplete="off"
              />
            </label>
            <p className="quiet-note">
              Design preview only. Use sample credentials. No account is
              created, no authentication occurs, and passwords are neither
              stored nor transmitted.
            </p>
            <Button type="submit">
              {authTab === "Sign in"
                ? "Preview sign in"
                : "Preview registration"}
            </Button>
          </form>
          <button
            className="simple-link guest-demo"
            onClick={() => setEntered(true)}
          >
            Explore without entering details <ArrowUpRight size={15} />
          </button>
        </div>
      </section>
    );
  return (
    <section className="guest-workspace container">
      <div className="guest-heading">
        <div>
          <Eyebrow>YOUR GUEST AREA</Eyebrow>
          <h1>
            Welcome, <i>{preferredName || name}.</i>
          </h1>
          <p>A little more ease. A little more you.</p>
        </div>
        <button
          className="simple-link"
          onClick={() => {
            setEntered(false);
            setName("Guest");
          }}
        >
          <LogOut size={15} />
          Leave preview
        </button>
      </div>
      <div className="guest-demo-notice">
        <ShieldCheck size={18} />
        <span>
          Guest portal preview · All actions are local. Refreshing clears your
          session. No live hotel records are accessed.
        </span>
      </div>
      <div className="guest-workspace-grid">
        <nav aria-label="Guest area navigation">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "active" : ""}
              onClick={() => setTab(t.id)}
            >
              <t.icon size={17} />
              {t.label}
              <ArrowUpRight size={15} />
            </button>
          ))}
          <div className="guest-help">
            <ConciergeBell size={25} strokeWidth={1} />
            <h3>A little more island?</h3>
            <p>Your next quiet chapter is waiting.</p>
            <button onClick={() => book()}>
              Explore a new stay <ArrowUpRight size={15} />
            </button>
          </div>
        </nav>
        <div className="guest-panel">
          {tab === "stays" ? (
            <>
              <div className="guest-panel-heading">
                <h2>Your stays</h2>
                <button className="simple-link" onClick={() => book()}>
                  Plan another <ArrowUpRight size={14} />
                </button>
              </div>
              {!reservations.length ? (
                <div className="empty-state">
                  <CalendarDays size={38} strokeWidth={1} />
                  <h3>Your island story starts here.</h3>
                  <p>
                    Create a preview reservation to explore your stay history,
                    modifications and cancellation.
                  </p>
                  <Button onClick={() => book()}>Find your stay</Button>
                </div>
              ) : (
                <div className="reservation-list">
                  {reservations.map((r) => {
                    const room = rooms.find((x) => x.id === r.roomId)!;
                    return (
                      <article className="reservation-card" key={r.id}>
                        <Image src={room.image} alt={room.name} />
                        <div>
                          <div className="reservation-status">
                            <span
                              className={
                                r.status === "Cancelled" ? "cancelled" : ""
                              }
                            >
                              {r.status === "Cancelled" ? (
                                <XCircle size={12} />
                              ) : (
                                <CheckCircle2 size={12} />
                              )}{" "}
                              {r.status === "Cancelled"
                                ? "Cancelled preview"
                                : "Preview reservation"}
                            </span>
                            <small>{r.id}</small>
                          </div>
                          <h3>{room.name}</h3>
                          <p>
                            {formatDate(r.search.checkIn, true)} –{" "}
                            {formatDate(r.search.checkOut, true)} ·{" "}
                            {r.quote.nights} nights
                          </p>
                          <p>
                            {r.search.adults + r.search.children} guests ·{" "}
                            {formatMoney(r.quote.total, currency)}
                          </p>
                          {r.status !== "Cancelled" && (
                            <div className="reservation-actions">
                              <button
                                onClick={() => {
                                  setEdit(r);
                                  setDates({ ...r.search });
                                  setError("");
                                }}
                              >
                                Modify dates
                              </button>
                              <button onClick={() => setCancel(r)}>
                                Cancel preview
                              </button>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          ) : tab === "requests" ? (
            <>
              <h2>A little assistance</h2>
              <p>Explore the in-room service request journey.</p>
              <form
                className="request-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setRequests([
                    ...requests,
                    {
                      id: crypto.randomUUID(),
                      type: requestType,
                      notes: requestNotes,
                      status: "Created",
                      createdAt: new Date().toISOString(),
                    },
                  ]);
                  setRequestNotes("");
                  notify(
                    "Request preview created. No staff member has been notified.",
                  );
                }}
              >
                <label>
                  What can we help with?
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                  >
                    {[
                      "Fresh towels",
                      "Refresh my room",
                      "Laundry collection",
                      "Extra pillows",
                      "Drinking water",
                      "Maintenance assistance",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label>
                  A little detail <small>Optional</small>
                  <textarea
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                    rows={3}
                    maxLength={500}
                    placeholder="Tell us a little more…"
                  />
                </label>
                <Button type="submit">Create request preview</Button>
              </form>
              {requests.length > 0 && (
                <div className="request-list">
                  <h3>Your request previews</h3>
                  {requests.map((r) => (
                    <article key={r.id}>
                      <ConciergeBell size={19} />
                      <div>
                        <b>{r.type}</b>
                        <p>{r.notes || "No additional notes"}</p>
                        <small>
                          {r.status} ·{" "}
                          {new Date(r.createdAt).toLocaleTimeString("en-GB", {
                            timeZone: "Asia/Colombo",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          SLST
                        </small>
                      </div>
                      {r.status === "Created" && (
                        <button
                          onClick={() =>
                            setRequests(
                              requests.map((x) =>
                                x.id === r.id
                                  ? { ...x, status: "Cancelled" }
                                  : x,
                              ),
                            )
                          }
                        >
                          Cancel
                        </button>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : tab === "preferences" ? (
            <>
              <h2>A stay that feels like you</h2>
              <p>
                Explore the CRM preferences interface. Preferences clear when
                you refresh.
              </p>
              <form
                className="preferences-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setGuestPreferences({ name: preferredName, diet, pillow });
                  notify("Preferences updated for this preview session.");
                }}
              >
                <label>
                  <span>
                    <UserRound size={15} />
                    What should we call you?
                  </span>
                  <input
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    maxLength={80}
                    placeholder="Your preferred name"
                  />
                </label>
                <label>
                  Dietary preference
                  <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                  >
                    {[
                      "No preference",
                      "Vegetarian",
                      "Vegan",
                      "Discuss with the hotel",
                    ].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Pillow preference
                  <select
                    value={pillow}
                    onChange={(e) => setPillow(e.target.value)}
                  >
                    {["No preference", "Soft", "Firm"].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>
                <p className="quiet-note">
                  Requests are subject to property confirmation. No sensitive
                  medical or identity data is needed for this preview.
                </p>
                <Button type="submit">Save preview preferences</Button>
              </form>
            </>
          ) : (
            <>
              <h2>Your stay summary</h2>
              <p>
                A clear view of your preview reservation. This is not a live
                guest folio or invoice.
              </p>
              {active ? (
                <div className="folio-preview">
                  <div>
                    <ClipboardList size={30} />
                    <span>PREVIEW REFERENCE {active.id}</span>
                  </div>
                  <h3>{rooms.find((r) => r.id === active.roomId)?.name}</h3>
                  <dl>
                    <div>
                      <dt>Accommodation · {active.quote.nights} nights</dt>
                      <dd>{formatMoney(active.quote.base, currency)}</dd>
                    </div>
                    {active.quote.discount > 0 && (
                      <div>
                        <dt>Offer discount</dt>
                        <dd>−{formatMoney(active.quote.discount, currency)}</dd>
                      </div>
                    )}
                    <div>
                      <dt>Selected extras</dt>
                      <dd>{formatMoney(active.quote.extras, currency)}</dd>
                    </div>
                    <div>
                      <dt>Sample taxes & fees</dt>
                      <dd>{formatMoney(active.quote.tax, currency)}</dd>
                    </div>
                    <div className="summary-total">
                      <dt>Estimated total</dt>
                      <dd>{formatMoney(active.quote.total, currency)}</dd>
                    </div>
                  </dl>
                  <p>
                    No charges have been posted. Payment, room charges and folio
                    settlement require the server integration.
                  </p>
                </div>
              ) : (
                <div className="empty-state">
                  <ReceiptText size={34} />
                  <h3>A clear view, when you arrive.</h3>
                  <p>
                    Create a preview reservation to see its sample price
                    breakdown.
                  </p>
                  <Button onClick={() => book()}>Explore a stay</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {cancel && (
        <Modal
          title="Cancel preview reservation"
          onClose={() => setCancel(null)}
        >
          <h2>A change of plans?</h2>
          <p>
            This cancels the local preview for <b>{cancel.id}</b>. No real
            reservation is affected and no fee is charged.
          </p>
          <div className="button-row">
            <Button
              onClick={() => {
                setReservations(
                  reservations.map((r) =>
                    r.id === cancel.id ? { ...r, status: "Cancelled" } : r,
                  ),
                );
                setCancel(null);
                notify("Preview reservation cancelled.");
              }}
            >
              Cancel this preview
            </Button>
            <button className="simple-link" onClick={() => setCancel(null)}>
              Keep my preview
            </button>
          </div>
        </Modal>
      )}
      {edit && dates && (
        <Modal title="Modify your dates" onClose={() => setEdit(null)}>
          <h2>
            A little <i>change of pace.</i>
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const issue = validateSearch(dates);
              if (issue) {
                setError(issue);
                return;
              }
              const room = rooms.find((r) => r.id === edit.roomId)!;
              setReservations(
                reservations.map((r) =>
                  r.id === edit.id
                    ? {
                        ...r,
                        search: dates,
                        quote: quoteStay(room, dates, r.extras),
                      }
                    : r,
                ),
              );
              setEdit(null);
              notify("Preview dates updated and price recalculated.");
            }}
          >
            <div className="form-grid">
              <label>
                Arrival
                <input
                  type="date"
                  value={dates.checkIn}
                  min={localToday()}
                  onChange={(e) =>
                    setDates({ ...dates, checkIn: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Departure
                <input
                  type="date"
                  min={addDays(dates.checkIn, 1)}
                  value={dates.checkOut}
                  onChange={(e) =>
                    setDates({ ...dates, checkOut: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <p className="quiet-note">
              Changing dates recalculates the sample total. Live availability is
              not checked.
            </p>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <Button type="submit">Update preview dates</Button>
          </form>
        </Modal>
      )}
    </section>
  );
}

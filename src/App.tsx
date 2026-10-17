import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Maximize,
  UsersRound,
} from "lucide-react";
import { HotelContext } from "./lib/context";
import type {
  Currency,
  GuestRequest,
  GuestPreferences,
  GuestSession,
  Page,
  Reservation,
  Room,
} from "./lib/types";
import { addDays, formatMoney, initialSearch } from "./lib/booking";
import { Header, Footer, PreviewRibbon } from "./components/Layout";
import { Button, Eyebrow, Image, Modal } from "./components/ui";
import Home from "./pages/Home";
const BookingDialog = lazy(() => import("./components/BookingDialog"));
const EnquiryDialog = lazy(() => import("./components/EnquiryDialog"));
const GuestPage = lazy(() => import("./pages/GuestPage"));
const pages = {
  story: lazy(() =>
    import("./pages/PublicPages").then((m) => ({ default: m.StoryPage })),
  ),
  stay: lazy(() =>
    import("./pages/PublicPages").then((m) => ({ default: m.StayPage })),
  ),
  experiences: lazy(() =>
    import("./pages/PublicPages").then((m) => ({ default: m.ExperiencesPage })),
  ),
  dining: lazy(() =>
    import("./pages/PublicPages").then((m) => ({ default: m.DiningPage })),
  ),
  celebrate: lazy(() =>
    import("./pages/PublicPages").then((m) => ({ default: m.CelebratePage })),
  ),
  gallery: lazy(() =>
    import("./pages/PublicPages").then((m) => ({ default: m.GalleryPage })),
  ),
  offers: lazy(() =>
    import("./pages/PublicPages").then((m) => ({ default: m.OffersPage })),
  ),
  contact: lazy(() =>
    import("./pages/PublicPages").then((m) => ({ default: m.ContactPage })),
  ),
};
function getPage(): Page {
  const raw = location.hash.replace(/^#\/?/, "").split("?")[0];
  return raw === "guest"
    ? "guest"
    : Object.hasOwn(pages, raw)
      ? (raw as Page)
      : "home";
}
const titles: Record<Page, string> = {
  home: "A slower kind of Sri Lanka",
  story: "Our story",
  stay: "Rooms, suites & villas",
  experiences: "Island experiences",
  dining: "Dine, sip & savour",
  celebrate: "Weddings & gatherings",
  gallery: "The gallery",
  offers: "Stay offers",
  contact: "Contact & location",
  guest: "Your guest area",
};
export default function App() {
  const [guestSession, setGuestSession] = useState<GuestSession>({
    entered: false,
    name: "Guest",
  });
  const [guestPreferences, setGuestPreferences] = useState<GuestPreferences>({
    name: "",
    diet: "No preference",
    pillow: "No preference",
  });
  const [guestRequests, setGuestRequests] = useState<GuestRequest[]>([]);
  const [page, setPage] = useState<Page>(getPage);
  const [currency, setCurrency] = useState<Currency>("LKR");
  const [search, setSearch] = useState(initialSearch);
  const [booking, setBooking] = useState<{ room?: Room } | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [film, setFilm] = useState(false);
  const [enquiry, setEnquiry] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  useEffect(() => {
    const handler = () => setPage(getPage());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    document.title = titles[page] + " — AAA Hotel Sri Lanka";
    window.scrollTo({ top: 0, behavior: "instant" });
    const el = document.getElementById("main");
    el?.focus({ preventScroll: true });
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let observer: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      if (reduced) return;
      observer = new IntersectionObserver(
        (items) =>
          items.forEach((i) => {
            if (i.isIntersecting) {
              i.target.classList.add("revealed");
              observer?.unobserve(i.target);
            }
          }),
        { threshold: 0.12 },
      );
      document.querySelectorAll("[data-reveal]").forEach((e) => {
        e.classList.add("will-reveal");
        observer?.observe(e);
      });
    }, 180);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [page]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 5000);
    return () => clearTimeout(t);
  }, [toast]);
  const navigate = (p: Page) => {
    if (p === page) window.scrollTo({ top: 0, behavior: "smooth" });
    else location.hash = p === "home" ? "/" : "/" + p;
  };
  function book(preferred?: Room, promo?: string) {
    if (promo) {
      setSearch((s) => ({
        ...s,
        promo,
        checkOut:
          promo === "SLOWSTAY" && s.checkOut < addDays(s.checkIn, 3)
            ? addDays(s.checkIn, 3)
            : s.checkOut,
      }));
    }
    setRoom(null);
    setBooking({ room: preferred });
  }
  const Current = page !== "home" && page !== "guest" ? pages[page] : null;
  return (
    <HotelContext.Provider
      value={{
        guestSession,
        setGuestSession,
        guestPreferences,
        setGuestPreferences,
        guestRequests,
        setGuestRequests,
        page,
        navigate,
        currency,
        setCurrency,
        search,
        setSearch,
        book,
        showRoom: setRoom,
        showFilm: () => setFilm(true),
        showEnquiry: (t = "General enquiry") => setEnquiry(t),
        notify: setToast,
        reservations,
        setReservations,
      }}
    >
      <Header />
      <main
        id="main"
        tabIndex={-1}
        key={page}
        className="min-h-screen outline-none"
      >
        <Suspense
          fallback={
            <div className="page-loading">
              <span />
              <p>A little island time…</p>
            </div>
          }
        >
          {page === "home" ? (
            <Home />
          ) : page === "guest" ? (
            <GuestPage />
          ) : Current ? (
            <Current />
          ) : (
            <Home />
          )}
        </Suspense>
      </main>
      <Footer />
      <PreviewRibbon />
      {room && (
        <Modal
          title="Your space"
          onClose={() => setRoom(null)}
          wide
          className="room-detail-modal"
        >
          <div className="room-detail-layout">
            <Image src={room.image} alt={room.name} />
            <div>
              <Eyebrow>
                {room.collection.toUpperCase()} / {room.view.toUpperCase()}
              </Eyebrow>
              <h2>{room.name}</h2>
              <p className="lead">{room.description}</p>
              <div className="room-facts">
                <span>
                  <Maximize size={15} />
                  {room.size} m²
                </span>
                <span>
                  <UsersRound size={15} />
                  Up to {room.capacity} guests
                </span>
              </div>
              <ul className="amenity-list">
                {room.amenities.map((a) => (
                  <li key={a}>
                    <Check size={14} />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="room-detail-price">
                From <b>{formatMoney(room.rate, currency)}</b> / night
              </p>
              <p className="quiet-note">
                Sample room configuration and amenities. Accessibility and final
                inclusions require property confirmation.
              </p>
              <Button onClick={() => book(room)}>Make this your space</Button>
              <button className="simple-link" onClick={() => setRoom(null)}>
                <ArrowLeft size={14} />
                Keep exploring
              </button>
            </div>
          </div>
        </Modal>
      )}
      {film && (
        <Modal
          title="Feel the island"
          onClose={() => setFilm(false)}
          wide
          className="film-modal"
        >
          <video
            src="/media/coast.mp4"
            poster="/media/hero.jpg"
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label="Sri Lankan coastal film"
          />
          <div className="film-caption">
            <h3>A slower kind of Sri Lanka.</h3>
            <p>
              18-second coastal film · Sri Lanka · Stock footage for design
              preview
            </p>
          </div>
        </Modal>
      )}
      <Suspense fallback={null}>
        {booking && (
          <BookingDialog
            preferred={booking.room}
            onClose={() => setBooking(null)}
          />
        )}
        {enquiry && (
          <EnquiryDialog type={enquiry} onClose={() => setEnquiry(null)} />
        )}
      </Suspense>
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            ×
          </button>
        </div>
      )}
    </HotelContext.Provider>
  );
}

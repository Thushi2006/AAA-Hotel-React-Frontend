import { useEffect, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Menu,
  UserRound,
  X,
  MapPin,
} from "lucide-react";
import { useHotel } from "../lib/context";
import type { Page } from "../lib/types";
import { Brand, Button, Modal, TextLink } from "./ui";
const nav: { page: Page; label: string }[] = [
  { page: "story", label: "Our story" },
  { page: "stay", label: "Stay with us" },
  { page: "experiences", label: "Experiences" },
  { page: "dining", label: "Dine & unwind" },
  { page: "celebrate", label: "Celebrate" },
  { page: "offers", label: "Offers" },
];
export function Header() {
  const { navigate, page, currency, setCurrency, book } = useHotel();
  const [scrolled, setScrolled] = useState(window.scrollY > 30);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  const go = (p: Page) => {
    setMenu(false);
    navigate(p);
  };
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header
        className={`site-header ${scrolled || page !== "home" ? "solid" : ""}`}
      >
        <div className="header-main">
          <a
            href="#/"
            className="brand-link"
            onClick={() => setMenu(false)}
            aria-label="AAA Hotel home"
          >
            <Brand />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((n) => (
              <a
                key={n.page}
                href={"#/" + n.page}
                aria-current={page === n.page ? "page" : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <label className="currency-select">
              <span className="sr-only">Display currency</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "LKR" | "USD")}
              >
                <option value="LKR">LKR</option>
                <option value="USD">USD</option>
              </select>
            </label>
            <button
              className="icon-button guest-icon"
              onClick={() => navigate("guest")}
              aria-label="Guest area"
            >
              <UserRound size={18} />
            </button>
            <button className="reserve-button" onClick={() => book()}>
              Reserve your stay <ArrowUpRight size={15} />
            </button>
            <button
              className="icon-button menu-button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <Modal
          title="Explore"
          onClose={() => setMenu(false)}
          className="menu-modal"
        >
          <div className="mobile-navigation">
            <a href="#/" onClick={() => setMenu(false)}>
              Home <span>01</span>
            </a>
            {nav.map((n, i) => (
              <a
                key={n.page}
                href={"#/" + n.page}
                onClick={() => setMenu(false)}
              >
                {n.label}
                <span>0{i + 2}</span>
              </a>
            ))}
            <a href="#/gallery" onClick={() => setMenu(false)}>
              The gallery<span>08</span>
            </a>
            <a href="#/contact" onClick={() => setMenu(false)}>
              Find us<span>09</span>
            </a>
            <button onClick={() => go("guest")}>
              Your guest area <UserRound size={18} />
            </button>
          </div>
          <Button
            onClick={() => {
              setMenu(false);
              book();
            }}
          >
            Reserve your stay
          </Button>
        </Modal>
      )}
    </>
  );
}
export function Footer() {
  const { navigate, showEnquiry } = useHotel();
  const [policy, setPolicy] = useState("");
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-invitation">
            <div>
              <p className="eyebrow light">YOUR NEXT CHAPTER</p>
              <h2>
                Let the island
                <br /> <i>come to you.</i>
              </h2>
            </div>
            <div>
              <p>
                Some places ask you to do more.
                <br />
                Here, you can simply be.
              </p>
              <Button
                variant="light"
                onClick={() => showEnquiry("Plan my stay")}
              >
                Start a conversation
              </Button>
            </div>
          </div>
          <div className="footer-grid">
            <a href="#/" className="footer-brand" aria-label="AAA Hotel home">
              <Brand />
            </a>
            <div>
              <h3>THE AAA EXPERIENCE</h3>
              <a href="#/stay">Rooms & suites</a>
              <a href="#/dining">Dining & bar</a>
              <a href="#/experiences">Island experiences</a>
              <a href="#/celebrate">Weddings & gatherings</a>
            </div>
            <div>
              <h3>MAKE YOURSELF AT HOME</h3>
              <a href="#/offers">Stay offers</a>
              <a href="#/gallery">The gallery</a>
              <a href="#/guest">Your guest area</a>
              <a href="#/contact">Contact & location</a>
            </div>
            <div className="footer-location">
              <MapPin size={18} />
              <p>
                The southern coast.
                <br />
                Sri Lanka.
              </p>
              <TextLink light onClick={() => navigate("contact")}>
                Find your way here
              </TextLink>
              <span>Exact property details to be confirmed</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} AAA Hotel · Sri Lanka</span>
            <div>
              <button onClick={() => setPolicy("Privacy")}>Privacy</button>
              <button onClick={() => setPolicy("Stay policies")}>
                Stay policies
              </button>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "auto"
                      : "smooth",
                  })
                }
              >
                Back to top <ArrowUp size={13} />
              </button>
            </div>
          </div>
          <p className="preview-note">
            Client design preview. Property imagery, amenities, rates and offers
            are illustrative. Reservations and guest services are simulated.
          </p>
        </div>
      </footer>
      {policy && (
        <Modal title={policy} onClose={() => setPolicy("")}>
          <h2>{policy}</h2>
          {policy === "Privacy" ? (
            <div className="prose">
              <p>
                This preview does not send forms, take payments or create a
                guest account. Preview reservations and guest requests exist
                only in memory and clear when the page is refreshed.
              </p>
              <p>
                Do not enter real identity documents, payment details or
                sensitive personal information. No analytics or marketing
                cookies are used. Fonts and media are served locally.
              </p>
              <p>
                The final privacy notice, retention policy and contact details
                must be approved by the hotel before launch.
              </p>
            </div>
          ) : (
            <div className="prose">
              <p>
                Illustrative arrival time: 2 pm. Departure time: 12 noon. All
                rates and inclusions in this preview are sample content.
              </p>
              <p>
                No cancellation fee is charged in this demonstration. Production
                cancellation deadlines, deposits, taxes, child policies,
                accessibility information and payment terms must be supplied and
                approved by the hotel.
              </p>
              <p>
                A preview reservation does not reserve inventory or guarantee a
                stay.
              </p>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
export function PreviewRibbon() {
  const [open, setOpen] = useState(true);
  return open ? (
    <div className="preview-ribbon">
      <span>
        DESIGN PREVIEW <b>·</b> An island escape, imagined.
      </span>
      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss preview notice"
      >
        <X size={12} />
      </button>
    </div>
  ) : null;
}

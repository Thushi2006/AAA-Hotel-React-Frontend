import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  MapPin,
  Maximize,
  Play,
  Sun,
  UsersRound,
  Utensils,
  Waves,
} from "lucide-react";
import { useHotel } from "../lib/context";
import { experiences, galleryItems, offers, rooms } from "../data/hotel";
import {
  Button,
  Eyebrow,
  Image,
  Mark,
  Modal,
  PageHeading,
  TextLink,
} from "../components/ui";
import RoomCard from "../components/RoomCard";
import BookingBar from "../components/BookingBar";
export function StoryPage() {
  const { showFilm, navigate } = useHotel();
  return (
    <>
      <PageHeading
        eyebrow="THE SPIRIT OF AAA"
        title="A place to pause."
        italic="A feeling to keep."
        description="Inspired by the island. Shaped around the art of being here."
      />
      <section className="story-layout section-pad container">
        <div className="story-tall" data-reveal>
          <Image
            src="/media/hero-resort.jpg"
            alt="Golden light and a peaceful pool at a coastal retreat"
          />
        </div>
        <div className="story-text" data-reveal>
          <Mark className="story-mark" />
          <h2>
            We believe in
            <br />
            <i>the little things.</i>
          </h2>
          <p className="lead">
            The first breeze through an open window.
            <br />
            The second cup of tea.
            <br />
            The evening you forgot your phone.
          </p>
          <p>
            AAA is our vision of a more thoughtful coastal stay. A place that
            brings the warmth of Sri Lanka into spaces that feel calm, personal
            and connected to the island.
          </p>
          <p>
            The experience is simple: a beautiful place to sleep, a table to
            gather around and the freedom to make each day your own.
          </p>
          <TextLink onClick={() => navigate("stay")}>
            Find your own little corner
          </TextLink>
        </div>
      </section>
      <section className="story-beliefs container">
        <Eyebrow>WHAT WE MAKE ROOM FOR</Eyebrow>
        <div>
          {[
            {
              icon: Sun,
              title: "The luxury of time",
              text: "Mornings without a rush. Afternoons without a plan. A stay that moves at your pace.",
            },
            {
              icon: Waves,
              title: "A sense of place",
              text: "Natural textures, island-inspired flavours and a connection to the coast outside your door.",
            },
            {
              icon: Compass,
              title: "Thoughtful discovery",
              text: "Gentle invitations to explore, with plenty of space to simply stay where you are.",
            },
          ].map((i) => (
            <article key={i.title}>
              <i.icon size={30} strokeWidth={1} />
              <h3>{i.title}</h3>
              <p>{i.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wide-film" onClick={showFilm}>
        <Image
          src="/media/hero.jpg"
          alt="An aerial view of the Sri Lankan coastline"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            showFilm();
          }}
        >
          <Play size={24} />
          <span>The island, in a moment.</span>
        </button>
      </section>
    </>
  );
}
export function StayPage() {
  const [filter, setFilter] = useState("All stays");
  const { search, showEnquiry } = useHotel();
  const list = rooms.filter(
    (r) =>
      (filter === "All stays" || r.collection === filter) &&
      r.capacity >= search.adults + search.children,
  );
  return (
    <>
      <PageHeading
        eyebrow="ROOMS, SUITES & PRIVATE VILLAS"
        title="Find your"
        italic="kind of quiet."
        description="Warm textures. Soft light. Spaces that make doing nothing feel like everything."
        image="/media/suite-ocean.jpg"
      />
      <div className="container page-booking">
        <BookingBar compact />
      </div>
      <section className="container section-pad">
        <div className="filter-heading">
          <div className="filter-tabs" aria-label="Filter accommodation">
            {["All stays", "Rooms", "Suites", "Villas"].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <span>
            {list.length} {list.length === 1 ? "space" : "spaces"} for your
            company
          </span>
        </div>
        <p className="quiet-note">
          Sample rates and room options. Live inventory will be supplied by the
          reservation system.
        </p>
        {list.length ? (
          <div className="rooms-grid">
            {list.map((r, i) => (
              <RoomCard room={r} index={i} key={r.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>A little more room?</h3>
            <p>
              Try another collection, adjust your guest count, or ask us about a
              group stay.
            </p>
            <Button onClick={() => showEnquiry("Group stay")}>
              Enquire about your stay
            </Button>
          </div>
        )}
        <div className="inclusions">
          <Eyebrow>THE COMFORTS THAT MATTER</Eyebrow>
          <h2>
            Considered <i>in every detail.</i>
          </h2>
          <div>
            {[
              "Fresh linen & thoughtful amenities",
              "Tea & coffee in your room",
              "Connected when you want to be",
              "Spaces to slow down",
            ].map((s) => (
              <span key={s}>
                <Check size={17} />
                {s}
              </span>
            ))}
          </div>
          <p>
            Concept inclusions, subject to final property confirmation. Arrival
            2 pm · Departure 12 noon.
          </p>
        </div>
      </section>
    </>
  );
}
export function ExperiencesPage() {
  const { showEnquiry } = useHotel();
  const [tour, setTour] = useState(false);
  const [poolFilm, setPoolFilm] = useState(false);
  const [scene, setScene] = useState(0);
  return (
    <>
      <PageHeading
        eyebrow="THE ISLAND IS YOURS"
        title="Collect moments."
        italic="Not itineraries."
        description="A little adventure. A little balance. A whole lot of doing what feels right."
        image="/media/beach.jpg"
      />
      <section className="container experience-list section-pad">
        {experiences.map((ex, i) => (
          <article key={ex.id} className={i % 2 ? "reverse" : ""} data-reveal>
            <Image src={ex.image} alt={ex.label} />
            <div>
              <Eyebrow>{ex.eyebrow}</Eyebrow>
              <h2>
                {ex.title.split(" ").slice(0, -1).join(" ")}{" "}
                <i>{ex.title.split(" ").slice(-1)}</i>
              </h2>
              <p className="lead">{ex.text}</p>
              <p>{ex.detail}</p>
              <TextLink
                onClick={() =>
                  showEnquiry(ex.id === "pool" ? "Pool day pass" : ex.label)
                }
              >
                {ex.id === "pool"
                  ? "Plan a pool day"
                  : "Make it part of your stay"}
              </TextLink>
              {ex.id === "pool" && (
                <button
                  className="pool-film-link"
                  onClick={() => setPoolFilm(true)}
                >
                  <Play size={13} />
                  Watch the poolside mood film
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="tour-section">
        <div className="container">
          <Eyebrow>LOOK A LITTLE CLOSER</Eyebrow>
          <h2>
            Make yourself <i>at home.</i>
          </h2>
          <p>Take a first look at the spaces behind your stay.</p>
          <Button onClick={() => setTour(true)}>Explore the photo tour</Button>
          <p className="quiet-note">
            Photo tour preview. Property-specific 360° photography will be added
            once supplied.
          </p>
        </div>
      </section>
      {poolFilm && (
        <Modal
          title="Poolside mood film"
          onClose={() => setPoolFilm(false)}
          wide
          className="film-modal"
        >
          <video
            src="/media/pool-film.mp4"
            controls
            autoPlay
            playsInline
            aria-label="Poolside mood film"
          />
          <p className="quiet-note">
            Stock mood footage for design review. This is not footage of the
            client property.
          </p>
        </Modal>
      )}
      {tour && (
        <Modal
          title="Interactive photo tour"
          onClose={() => setTour(false)}
          wide
        >
          <div className="photo-tour">
            <Image
              src={
                [rooms[0].image, "/media/pool.jpg", "/media/restaurant.jpg"][
                  scene
                ]
              }
              alt={["Suite interior", "Pool area", "Dining area"][scene]}
            />
            <div className="tour-scene-title">
              <span>0{scene + 1} / 03</span>
              <h3>
                {
                  [
                    "A space of your own",
                    "Poolside, unhurried",
                    "A place at our table",
                  ][scene]
                }
              </h3>
            </div>
          </div>
          <div className="tour-tabs">
            {["The suite", "The pool", "The restaurant"].map((n, i) => (
              <button
                key={n}
                className={i === scene ? "active" : ""}
                onClick={() => setScene(i)}
                aria-pressed={scene === i}
              >
                {n}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <p className="quiet-note">
            Illustrative photography. This is a scene-based photo tour; an
            immersive 360° tour requires the hotel’s panorama files.
          </p>
        </Modal>
      )}
    </>
  );
}
export function DiningPage() {
  const { showEnquiry } = useHotel();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <PageHeading
        eyebrow="DINE, SIP & SAVOUR"
        title="Good food."
        italic="Better company."
        description="From your first island breakfast to one last sunset drink. Always a little delicious."
        image="/media/restaurant.jpg"
      />
      <section className="container dining-feature section-pad" data-reveal>
        <div>
          <Eyebrow>THE ISLAND TABLE</Eyebrow>
          <h2>
            Local soul.
            <br />
            <i>A world of flavour.</i>
          </h2>
          <p className="lead">Fresh thinking. Familiar warmth.</p>
          <p>
            Our proposed all-day restaurant celebrates the flavours of the
            island with a contemporary touch. Imagine fragrant curries, coastal
            ingredients and long, leisurely breakfasts.
          </p>
          <div className="detail-lines">
            <span>
              <Utensils size={17} />
              Restaurant & terrace
            </span>
            <span>
              <Sun size={17} />
              Breakfast · Lunch · Dinner
            </span>
            <span>
              <UsersRound size={17} />
              Private dining enquiries welcome
            </span>
          </div>
          <div className="button-row">
            <Button onClick={() => showEnquiry("Restaurant table")}>
              Reserve a table
            </Button>
            <TextLink onClick={() => setMenu(true)}>
              A taste of the menu
            </TextLink>
          </div>
        </div>
        <Image
          src="/media/dining.jpg"
          alt="Contemporary dining with thoughtfully plated food"
        />
      </section>
      <section className="bar-feature">
        <Image
          src="/media/hero-resort.jpg"
          alt="Golden light beside the resort pool at dusk"
        />
        <div>
          <Eyebrow light>THE GOLDEN HOUR BAR</Eyebrow>
          <h2>
            For the hours
            <br />
            <i>between plans.</i>
          </h2>
          <p>
            A cooling drink. A warm evening. The kind of conversation that
            doesn’t need an ending. Discover our vision of a relaxed poolside
            bar.
          </p>
          <TextLink light onClick={() => showEnquiry("Sunset drinks")}>
            Save an evening for this
          </TextLink>
        </div>
      </section>
      <div className="container dietary-note">
        <h3>Every guest deserves a place at the table.</h3>
        <p>
          Tell us about your dietary requirements or accessibility needs in your
          enquiry. The hotel team will confirm which requests can be
          accommodated. Allergen information must be verified with the
          restaurant before ordering.
        </p>
      </div>
      {menu && (
        <Modal title="A taste of the menu" onClose={() => setMenu(false)}>
          <Eyebrow>AN ISLAND-INSPIRED SAMPLE</Eyebrow>
          <h2>
            A little <i>temptation.</i>
          </h2>
          <div className="sample-menu">
            {[
              {
                name: "The island breakfast",
                text: "Hoppers, coconut sambol and a fragrant morning curry.",
              },
              {
                name: "From the coast",
                text: "A seasonal catch, citrus, herbs and coastal inspiration.",
              },
              {
                name: "Garden to table",
                text: "A colourful, plant-led plate shaped by the season.",
              },
              {
                name: "A sweet ending",
                text: "Coconut, tropical fruit and a little indulgence.",
              },
            ].map((m) => (
              <div key={m.name}>
                <h3>{m.name}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
          <p className="quiet-note">
            Concept menu only. Dishes, prices, allergens and opening hours
            require restaurant approval.
          </p>
          <Button
            onClick={() => {
              setMenu(false);
              showEnquiry("Restaurant table");
            }}
          >
            Enquire about dining
          </Button>
        </Modal>
      )}
    </>
  );
}
export function CelebratePage() {
  const { showEnquiry } = useHotel();
  return (
    <>
      <PageHeading
        eyebrow="WEDDINGS & GATHERINGS"
        title="Your people."
        italic="Your moment."
        description="Big feelings. Thoughtful details. Beautiful beginnings on the island."
        image="/media/wedding.jpg"
      />
      <section className="container section-pad">
        <div className="centered-intro" data-reveal>
          <Eyebrow>MADE PERSONAL</Eyebrow>
          <h2>
            Some days deserve
            <br />
            <i>somewhere special.</i>
          </h2>
          <p>
            An intimate ceremony, a family celebration or a purposeful
            gathering. Let’s imagine an occasion that feels entirely your own.
          </p>
        </div>
        <div className="venue-grid">
          {[
            {
              name: "The coastal lawn",
              image: "/media/beach.jpg",
              type: "OUTDOOR CEREMONIES",
              description:
                "Open skies, a sea breeze and a naturally beautiful backdrop.",
            },
            {
              name: "The private gathering",
              image: "/media/restaurant.jpg",
              type: "INDOOR & PRIVATE DINING",
              description:
                "A warm, considered setting for the people who matter.",
            },
          ].map((v) => (
            <article key={v.name}>
              <Image src={v.image} alt={v.name} />
              <Eyebrow>{v.type}</Eyebrow>
              <h3>{v.name}</h3>
              <p>{v.description}</p>
              <p className="quiet-note">
                Layout, capacity and pricing to be confirmed with the property.
              </p>
              <TextLink onClick={() => showEnquiry("Celebration: " + v.name)}>
                Imagine your event
              </TextLink>
            </article>
          ))}
        </div>
        <div className="celebrate-details">
          <h2>
            Every detail,
            <br />
            <i>a little more you.</i>
          </h2>
          <div>
            <p>
              Tell us about your date, your guest count and the feeling you want
              to create. Our enquiry journey makes room for catering, décor,
              equipment and the details that make it yours.
            </p>
            <Button onClick={() => showEnquiry("Wedding or event")}>
              Begin planning
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
export function OffersPage() {
  const { book } = useHotel();
  return (
    <>
      <PageHeading
        eyebrow="STAY A LITTLE DIFFERENTLY"
        title="More island."
        italic="More you."
        description="Considered packages for unhurried mornings and a little longer away."
      />
      <section className="container offer-list section-pad">
        {offers.map((o) => (
          <article key={o.id} data-reveal>
            <Image src={o.image} alt={o.title} />
            <div>
              <Eyebrow>{o.label}</Eyebrow>
              <h2>{o.title}</h2>
              <p className="lead">{o.text}</p>
              <span className="offer-code">
                YOUR OFFER CODE <b>{o.code}</b>
              </span>
              <Button onClick={() => book(undefined, o.code)}>
                Explore this offer
              </Button>
              <details>
                <summary>Package details & conditions</summary>
                <p>{o.terms}</p>
              </details>
            </div>
          </article>
        ))}
        <p className="quiet-note">
          Sample packages for design review. These are not live hotel
          promotions.
        </p>
      </section>
    </>
  );
}
export function GalleryPage() {
  const [filter, setFilter] = useState("All moments");
  const [index, setIndex] = useState<number | null>(null);
  const list = galleryItems.filter(
    (i) => filter === "All moments" || i.category === filter,
  );
  const move = (delta: number) =>
    setIndex((n) =>
      n === null ? null : (n + delta + list.length) % list.length,
    );
  return (
    <>
      <PageHeading
        eyebrow="POSTCARDS FROM AAA"
        title="A little window"
        italic="into our world."
        description="Beautiful spaces. Quiet corners. Moments you can almost feel."
      />
      <section className="container gallery-page">
        <div className="filter-tabs">
          {[
            "All moments",
            "The hotel",
            "Stays",
            "Dining",
            "Island life",
            "Celebrations",
          ].map((f) => (
            <button
              key={f}
              className={f === filter ? "active" : ""}
              aria-pressed={f === filter}
              onClick={() => {
                setFilter(f);
                setIndex(null);
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="masonry-gallery">
          {list.map((i, n) => (
            <button
              key={i.src}
              onClick={() => setIndex(n)}
              aria-label={"Enlarge " + i.title}
            >
              <Image src={i.src} alt={i.title} />
              <span>
                {i.title}
                <Maximize size={17} />
              </span>
            </button>
          ))}
        </div>
        <p className="quiet-note">
          Curated stock imagery for the visual concept. Replace with client
          property photography before launch.
        </p>
      </section>
      {index !== null && (
        <Modal
          title="Gallery"
          onClose={() => setIndex(null)}
          wide
          className="lightbox"
        >
          <div
            className="lightbox-image"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") move(-1);
              if (e.key === "ArrowRight") move(1);
            }}
          >
            <Image src={list[index].src} alt={list[index].title} eager />
            <button
              className="lightbox-prev"
              onClick={() => move(-1)}
              aria-label="Previous image"
            >
              <ArrowLeft />
            </button>
            <button
              className="lightbox-next"
              onClick={() => move(1)}
              aria-label="Next image"
            >
              <ArrowRight />
            </button>
          </div>
          <div className="lightbox-caption">
            <h3>{list[index].title}</h3>
            <span>
              {index + 1} / {list.length}
            </span>
          </div>
        </Modal>
      )}
    </>
  );
}
export function ContactPage() {
  const { showEnquiry } = useHotel();
  return (
    <>
      <PageHeading
        eyebrow="LET’S MAKE A LITTLE SPACE"
        title="The start of"
        italic="something lovely."
        description="A question, a special occasion or a stay you’re dreaming about. We would love to hear."
      />
      <section className="container contact-layout section-pad">
        <div data-reveal>
          <Eyebrow>FIND YOUR WAY TO AAA</Eyebrow>
          <h2>
            A little closer
            <br />
            to <i>the coast.</i>
          </h2>
          <div className="contact-address">
            <MapPin size={22} />
            <div>
              <h3>Southern coast, Sri Lanka</h3>
              <p>
                The exact property address and contact details will be added
                after client confirmation.
              </p>
            </div>
          </div>
          <p>
            Let us know if you are planning an airport transfer, travelling with
            children or have accessibility requirements, so the hotel can
            confirm arrangements before you arrive.
          </p>
          <Button onClick={() => showEnquiry("General enquiry")}>
            Start a conversation
          </Button>
          <p className="quiet-note">
            Enquiries are demonstrated locally in this preview and are not sent
            to the hotel.
          </p>
        </div>
        <div className="location-card">
          <Image
            src="/media/destination.jpg"
            alt="Sri Lankan landscape inspiration"
          />
          <div>
            <span className="eyebrow light">
              AN ISLAND WORTH GETTING TO KNOW
            </span>
            <h3>
              Sri Lanka,
              <br />
              <i>at your own pace.</i>
            </h3>
            <a
              href="https://www.google.com/maps/search/Southern+Province+Sri+Lanka/"
              target="_blank"
              rel="noreferrer"
            >
              Explore the southern coast <ArrowUpRight size={18} />
            </a>
            <small>Region map · Exact hotel pin pending</small>
          </div>
        </div>
      </section>
      <section className="container faq-section">
        <Eyebrow>BEFORE YOU ARRIVE</Eyebrow>
        <h2>
          A few things <i>to know.</i>
        </h2>
        {[
          {
            q: "Can I book a stay through this preview?",
            a: "You can explore the full booking interface and create a local preview reservation. It does not hold a room or take a payment. Live reservations will be enabled when the booking API and payment provider are connected.",
          },
          {
            q: "Can you help with airport transfers?",
            a: "The booking preview includes a sample private-transfer option. Final routes, journey times and prices must be confirmed by the hotel.",
          },
          {
            q: "What if I have dietary or accessibility needs?",
            a: "Include them in your enquiry so that the hotel can confirm suitable arrangements. Do not assume every request can be accommodated before receiving confirmation.",
          },
          {
            q: "Where can I manage my stay?",
            a: "Visit the guest area to explore reservation history, date changes, cancellation and guest-service requests. All actions in this design preview are local demonstrations.",
          },
        ].map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}

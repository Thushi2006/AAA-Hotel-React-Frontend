import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Sun,
  Waves,
  Wind,
  Flower2,
} from "lucide-react";
import { useHotel } from "../lib/context";
import { experiences, offers, rooms } from "../data/hotel";
import {
  Button,
  CircleArrow,
  Eyebrow,
  Image,
  Mark,
  TextLink,
} from "../components/ui";
import RoomCard from "../components/RoomCard";
import UnifiedBookingEngine from "../components/UnifiedBookingEngine";
import ArchitecturalHospitality from "../components/ArchitecturalHospitality";
import PanoramaViewer360 from "../components/PanoramaViewer360";
export default function Home() {
  const { navigate, showFilm, book } = useHotel();
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [playing, setPlaying] = useState(!reduced);
  const [videoFailed, setVideoFailed] = useState(false);
  useEffect(() => {
    if (!playing || videoFailed) {
      video.current?.pause();
      return;
    }
    video.current?.play().catch(() => setPlaying(false));
  }, [playing, videoFailed]);
  const experience = experiences[active];
  return (
    <>
      <section className="hero" aria-label="Welcome to AAA Hotel">
        <Image
          src="/media/hero.jpg"
          alt="Waves meeting the lush southern coastline of Sri Lanka"
          className="hero-poster"
          eager
        />
        {!reduced && !videoFailed && (
          <video
            ref={video}
            className="hero-video"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster="/media/hero.jpg"
            aria-hidden="true"
            onError={() => {
              setVideoFailed(true);
              setPlaying(false);
            }}
          >
            <source src="/media/coast.mp4" type="video/mp4" />
          </video>
        )}
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span />A QUIETER CORNER OF THE ISLAND
          </p>
          <h1>
            A slower kind
            <br />
            of <i>Sri Lanka.</i>
          </h1>
          <div className="hero-description">
            <span className="fine-line" />
            <p>
              Salt in the air. Warmth in every detail.
              <br />
              And all the time in the world.
            </p>
          </div>
          <button
            className="hero-discover"
            onClick={() =>
              document
                .getElementById("welcome")
                ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })
            }
          >
            Discover AAA <ArrowDown size={16} />
          </button>
        </div>
        <button className="film-button" onClick={showFilm}>
          <span className="film-play">
            <Play size={20} fill="currentColor" strokeWidth={1} />
          </span>
          <span>
            FEEL THE ISLAND<small>Watch the film</small>
          </span>
        </button>
        <div className="hero-meta">
          <span>
            6° N, 80° E <span className="meta-dot" /> SOUTHERN COAST, SRI LANKA
          </span>
          <span className="hero-meta-center">THE LUXURY OF A LITTLE LESS</span>
          <button
            onClick={() => setPlaying(!playing)}
            aria-label={
              playing ? "Pause background video" : "Play background video"
            }
            disabled={reduced || videoFailed}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
            <span>{playing ? "PAUSE" : "PLAY"}</span>
          </button>
        </div>
        <div className="hero-side-label">
          AN ISLAND. A FEELING. A PLACE TO BELONG.
        </div>
      </section>
      <UnifiedBookingEngine />
      <section id="welcome" className="welcome section-pad container">
        <div className="welcome-copy" data-reveal>
          <Eyebrow>WELCOME TO AAA HOTEL</Eyebrow>
          <h2>
            Some places
            <br />
            stay <i>with you.</i>
          </h2>
          <p className="lead">
            A feeling of arriving.
            <br />A little closer to yourself.
          </p>
          <p>
            On Sri Lanka’s sun-drenched southern coast, imagine a place where
            life moves to the rhythm of the ocean. Thoughtful spaces, island
            flavours and the simple pleasure of being here.
          </p>
          <TextLink page="story">Our story, your escape</TextLink>
          <div className="welcome-signature">
            <Mark />
            <span>
              Rooted in the island.
              <br />
              <i>Made for you.</i>
            </span>
          </div>
        </div>
        <div className="welcome-visual" data-reveal>
          <div className="welcome-main">
            <Image
              src="/media/hero-resort.jpg"
              alt="A warm, illuminated resort beside a pool at dusk"
            />
            <span className="image-caption">
              A HOME AWAY FROM THE EVERYDAY.
            </span>
          </div>
          <div className="welcome-inset">
            <Image
              src="/media/beach.jpg"
              alt="Tropical palms along a quiet shoreline"
            />
          </div>
          <div className="round-stamp">
            <svg viewBox="0 0 140 140" aria-hidden="true">
              <defs>
                <path
                  id="stamp-circle"
                  d="M70 70m-52 0a52 52 0 1 1 104 0a52 52 0 1 1-104 0"
                />
              </defs>
              <text>
                <textPath href="#stamp-circle">
                  BAREFOOT DAYS · BEAUTIFUL STAYS ·{" "}
                </textPath>
              </text>
            </svg>
            <Sun size={30} strokeWidth={1} />
          </div>
        </div>
      </section>
      <div className="values-strip">
        <span>
          <Waves size={22} strokeWidth={1} />
          Ocean air
        </span>
        <span>✧</span>
        <span>
          <Sun size={22} strokeWidth={1} />
          Slow mornings
        </span>
        <span>✧</span>
        <span>
          <Wind size={22} strokeWidth={1} />
          Thoughtful spaces
        </span>
        <span>✧</span>
        <span>
          <Flower2 size={22} strokeWidth={1} />
          Island soul
        </span>
      </div>
      <ArchitecturalHospitality />
      <section className="stays-section section-pad">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <Eyebrow>SPACES TO CALL YOUR OWN</Eyebrow>
              <h2>
                Rest comes <i>naturally.</i>
              </h2>
            </div>
            <div className="section-heading-right">
              <p>
                Wake up somewhere that feels
                <br />a world away from ordinary.
              </p>
              <TextLink page="stay">Explore all stays</TextLink>
            </div>
          </div>
          <div className="rooms-grid">
            {rooms.map((_, i) => (
              <RoomCard
                room={rooms[(i + offset) % rooms.length]}
                key={rooms[(i + offset) % rooms.length].id}
                index={i}
              />
            ))}
          </div>
          <div className="collection-bottom">
            <span>CONSIDERED SPACES. UNHURRIED STAYS.</span>
            <div className="carousel-controls">
              <button
                aria-label="Previous room collection"
                onClick={() => setOffset((offset + 2) % 3)}
              >
                <ArrowLeft size={19} />
              </button>
              <span>
                0{offset + 1} <i>/ 03</i>
              </span>
              <button
                aria-label="Next room collection"
                onClick={() => setOffset((offset + 1) % 3)}
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <PanoramaViewer360 />
      <section className="experience-section">
        <div className="experience-image" key={experience.id}>
          <Image src={experience.image} alt={experience.label} />
          <span>{experience.eyebrow}</span>
        </div>
        <div className="experience-copy">
          <div data-reveal>
            <Eyebrow light>THE ISLAND, YOUR WAY</Eyebrow>
            <h2>
              Less itinerary.
              <br />
              <i>More instinct.</i>
            </h2>
            <p>
              Let a feeling lead the way. There is a whole island of moments
              waiting for you.
            </p>
          </div>
          <div
            className="experience-tabs"
            role="tablist"
            aria-label="Explore experiences"
            aria-orientation="vertical"
          >
            {experiences.map((ex, i) => (
              <button
                role="tab"
                id={"experience-tab-" + i}
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(e) => {
                  let n = i;
                  if (e.key === "ArrowDown") n = (i + 1) % experiences.length;
                  else if (e.key === "ArrowUp")
                    n = (i + experiences.length - 1) % experiences.length;
                  else if (e.key === "Home") n = 0;
                  else if (e.key === "End") n = experiences.length - 1;
                  else return;
                  e.preventDefault();
                  setActive(n);
                  document.getElementById("experience-tab-" + n)?.focus();
                }}
                aria-selected={active === i}
                aria-controls="experience-description"
                key={ex.id}
                onClick={() => setActive(i)}
              >
                <span className="experience-tab-number">0{i + 1}</span>
                <span>{ex.label}</span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <p
            id="experience-description"
            className="experience-description"
            role="tabpanel"
            aria-labelledby={"experience-tab-" + active}
            aria-live="polite"
          >
            {experience.text}
          </p>
          <TextLink light page="experiences">
            Find your island moment
          </TextLink>
        </div>
      </section>
      <section className="dining-section section-pad container">
        <div className="dining-image" data-reveal>
          <Image
            src="/media/dining.jpg"
            alt="A beautifully plated dining experience"
          />
          <span className="small-image-label">GOOD FOOD. GREAT COMPANY.</span>
        </div>
        <div className="dining-copy" data-reveal>
          <Eyebrow>FROM THE ISLAND, WITH LOVE</Eyebrow>
          <h2>
            A taste of
            <br />
            <i>somewhere.</i>
          </h2>
          <p className="lead">
            Local roots. A curious spirit.
            <br />A seat at our table.
          </p>
          <p>
            Spice-laden mornings. Ocean-inspired plates. Conversations that
            linger long after the last bite. Discover an expression of Sri
            Lanka, served with warmth.
          </p>
          <TextLink page="dining">Dine, sip, savour</TextLink>
          <div className="dining-detail">
            <span>✳</span>
            <p>
              For the love of
              <br />
              <i>slow, delicious living.</i>
            </p>
          </div>
        </div>
      </section>
      <section className="celebrate-banner">
        <Image
          src="/media/wedding.jpg"
          alt="A romantic setting for a celebration"
        />
        <div className="celebrate-shade" />
        <div className="container relative" data-reveal>
          <Eyebrow light>BEAUTIFULLY TOGETHER</Eyebrow>
          <h2>
            For moments
            <br />
            that <i>become memories.</i>
          </h2>
          <p>
            An intimate wedding. A long-awaited reunion.
            <br />
            Your people, in a special place.
          </p>
          <Button variant="light" onClick={() => navigate("celebrate")}>
            Imagine your celebration
          </Button>
        </div>
        <span className="banner-side">
          LOVE. LAUGHTER. A LITTLE ISLAND MAGIC.
        </span>
      </section>
      <section className="offers-section section-pad container">
        <div className="section-heading" data-reveal>
          <div>
            <Eyebrow>A LITTLE MORE REASON</Eyebrow>
            <h2>
              Make time for <i>you.</i>
            </h2>
          </div>
          <TextLink page="offers">Explore our offers</TextLink>
        </div>
        <div className="offers-grid">
          {offers.map((o) => (
            <article key={o.id} className="offer-card">
              <button
                className="offer-image"
                onClick={() => navigate("offers")}
                aria-label={"Explore " + o.title}
              >
                <Image src={o.image} alt={o.title} />
                <span>{o.tag}</span>
              </button>
              <div className="offer-content">
                <p className="eyebrow">{o.label}</p>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <TextLink onClick={() => book(undefined, o.code)}>
                  Make it your escape
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="gallery-teaser">
        <div className="gallery-teaser-heading">
          <Eyebrow>POSTCARDS FROM AAA</Eyebrow>
          <h2>
            A place to <i>picture yourself.</i>
          </h2>
          <TextLink page="gallery">Step inside our world</TextLink>
        </div>
        <div className="gallery-preview-images">
          {[
            "/media/pool.jpg",
            "/media/suite-garden.jpg",
            "/media/beach.jpg",
            "/media/restaurant.jpg",
          ].map((im, i) => (
            <button
              key={im}
              onClick={() => navigate("gallery")}
              aria-label={"Open gallery, image " + (i + 1)}
            >
              <Image
                src={im}
                alt={
                  [
                    "Quiet poolside afternoons",
                    "Warm and welcoming suites",
                    "Palm-fringed coast",
                    "A warm place to dine",
                  ][i]
                }
              />
              <ArrowUpRight size={22} />
            </button>
          ))}
        </div>
      </section>
      <section className="last-note container">
        <span className="little-sun">✳</span>
        <p>
          Leave with a little sand in your shoes.
          <br />
          <i>And a little more room in your heart.</i>
        </p>
        <CircleArrow
          onClick={() => book()}
          label="Reserve your island escape"
        />
      </section>
    </>
  );
}

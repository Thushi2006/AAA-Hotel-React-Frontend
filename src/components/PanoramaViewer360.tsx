import { useState, useRef, useEffect } from "react";
import {
  Compass,
  Play,
  Pause,
  Map,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
} from "lucide-react";

interface Hotspot {
  id: string;
  label: string;
  top: string;
  left: string;
  title: string;
  description: string;
}

interface VenueScene {
  id: string;
  tabLabel: string;
  venueTag: string;
  title: string;
  description: string;
  image: string;
  dimensions: string;
  structure: string;
  tariff: string;
  capacities: {
    banquet: string;
    theatre: string;
    cocktail: string;
    classroom: string;
  };
  hotspots: Hotspot[];
}

const VENUES: VenueScene[] = [
  {
    id: "villa",
    tabLabel: "360° Clifftop Teak Plunge Pool Villa",
    venueTag: "ROOM VENUE • AAA WELIGAMA CLIFFTOP RESERVE",
    title: "360° Clifftop Teak Plunge Pool Villa",
    description:
      "Inspect the handcrafted teak joinery, sandstone plunge deck, and ocean horizon in full 360° perspective.",
    image: "/media/villa.jpg",
    dimensions: "18.5m × 10.0m (185 m²)",
    structure: "4.6m Vaulted Teak Truss",
    tariff: "Rs. 145,200 / night",
    capacities: {
      banquet: "6 Guests",
      theatre: "10 Guests",
      cocktail: "16 Guests",
      classroom: "6 Guests",
    },
    hotspots: [
      {
        id: "ceiling",
        label: "Vaulted Ceylon Teak Ceiling",
        top: "24%",
        left: "22%",
        title: "Vaulted Ceylon Teak Ceiling",
        description:
          "Sustainably harvested cross-laminated plantation teak with concealed dimmable ambient warm LEDs and natural biophilic acoustic dampening.",
      },
      {
        id: "lounge",
        label: "Earthy Linen Lounge & QR Console",
        top: "76%",
        left: "19%",
        title: "Earthy Linen Lounge & QR Console",
        description:
          "Bespoke woven handloom daybed paired with an NFC-enabled timber tablet console for instant room service and folio control.",
      },
      {
        id: "pool",
        label: "Private Infinity Plunge Pool",
        top: "69%",
        left: "58%",
        title: "Private Infinity Plunge Pool",
        description:
          "Cantilevered saltwater infinity plunge clad in dark volcanic basalt stone, overlooking the Indian Ocean reef breaks.",
      },
    ],
  },
  {
    id: "dining",
    tabLabel: "360° Cinnamon & Ember Fine Dining Pavilion",
    venueTag: "CULINARY VENUE • AAA WELIGAMA CLIFFTOP RESERVE",
    title: "360° Cinnamon & Ember Fine Dining Pavilion",
    description:
      "Experience our oceanfront open-air gastronomic pavilion featuring wood-fired ovens, live allergen tracking, and cellar selections.",
    image: "/media/dining.jpg",
    dimensions: "26.0m × 14.0m (364 m²)",
    structure: "5.2m Open Timber Colonnade",
    tariff: "Table Reservation with Token",
    capacities: {
      banquet: "64 Guests",
      theatre: "80 Guests",
      cocktail: "110 Guests",
      classroom: "40 Guests",
    },
    hotspots: [
      {
        id: "terrace",
        label: "Ocean Edge Verandah",
        top: "62%",
        left: "64%",
        title: "Ocean Edge Verandah",
        description:
          "Cantilevered dining deck floating 40 meters above the surf with twilight candle lanterns and ocean breeze ventilation.",
      },
      {
        id: "cellar",
        label: "Sommelier Teak Reserve",
        top: "35%",
        left: "26%",
        title: "Sommelier Teak Reserve",
        description:
          "Climate-controlled Ceylon cinnamon timber wine display showcasing rare old-world vintages and craft tropical spirits.",
      },
    ],
  },
  {
    id: "wedding",
    tabLabel: "360° Sculptural Beachfront Wedding Arch & Lawn",
    venueTag: "EVENT VENUE • AAA WELIGAMA OCEANFRONT",
    title: "360° Sculptural Beachfront Wedding Arch & Lawn",
    description:
      "A grand oceanfront coastal lawn with sweeping views of the southern breaks, sculpted timber ceremony arches, and manicured palmgroves.",
    image: "/media/wedding.jpg",
    dimensions: "45.0m × 30.0m (1,350 m²)",
    structure: "Open-Air Natural Lawn & Timber Staging",
    tariff: "Portfolio Event Buyout",
    capacities: {
      banquet: "120 Guests",
      theatre: "200 Guests",
      cocktail: "250 Guests",
      classroom: "80 Guests",
    },
    hotspots: [
      {
        id: "arch",
        label: "Hand-Bent Teak Ceremony Arch",
        top: "42%",
        left: "48%",
        title: "Hand-Bent Teak Ceremony Arch",
        description:
          "Architecturally steamed Ceylon teak ribbons framing the sunset horizon for exchange of vows.",
      },
      {
        id: "lawn",
        label: "Acoustic Amphitheatre Lawn",
        top: "72%",
        left: "30%",
        title: "Acoustic Amphitheatre Lawn",
        description:
          "Bermuda grass tier with buried fiber-optic audio ports for string quartets and private speeches.",
      },
    ],
  },
  {
    id: "pool-cabanas",
    tabLabel: "360° Clifftop Infinity Pool & Sunset Cabanas",
    venueTag: "WELLNESS & DAY PASS • AAA CLIFFTOP RESERVE",
    title: "360° Clifftop Infinity Pool & Sunset Cabanas",
    description:
      "A 50-meter cantilevered clifftop basalt pool featuring private cabanas, submerged chaise loungers, and RFID guest access.",
    image: "/media/pool.jpg",
    dimensions: "50.0m × 16.0m (800 m²)",
    structure: "Cantilever Basalt & Timber Decking",
    tariff: "Rs. 18,000 / Day Pass",
    capacities: {
      banquet: "30 Guests",
      theatre: "45 Guests",
      cocktail: "90 Guests",
      classroom: "20 Guests",
    },
    hotspots: [
      {
        id: "infinity-edge",
        label: "Basalt Infinity Edge",
        top: "65%",
        left: "52%",
        title: "Basalt Infinity Edge",
        description:
          "Zero-horizon edge blending the calm turquoise pool surface directly into the southern Indian Ocean.",
      },
      {
        id: "cabana",
        label: "Private Teak Daybed Cabana",
        top: "45%",
        left: "22%",
        title: "Private Teak Daybed Cabana",
        description:
          "Louvered privacy blinds, wireless charging pads, and on-demand cocktail butler call button.",
      },
    ],
  },
];

export default function PanoramaViewer360() {
  const [selectedVenueIndex, setSelectedVenueIndex] = useState(0);
  const currentVenue = VENUES[selectedVenueIndex];

  // Panorama interactive state
  const [yaw, setYaw] = useState(119);
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartYaw = useRef(119);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState(0);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [selectedSeating, setSelectedSeating] = useState<"banquet" | "theatre" | "cocktail" | "classroom">("banquet");

  // Auto orbit animation
  useEffect(() => {
    if (!isAutoOrbit || isDragging) return;
    const interval = setInterval(() => {
      setYaw((prev) => (prev >= 360 ? 0 : prev + 0.15));
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoOrbit, isDragging]);

  // Drag listeners
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartYaw.current = yaw;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    let newYaw = (dragStartYaw.current - deltaX * 0.25) % 360;
    if (newYaw < 0) newYaw += 360;
    setYaw(Math.round(newYaw));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartYaw.current = yaw;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    let newYaw = (dragStartYaw.current - deltaX * 0.25) % 360;
    if (newYaw < 0) newYaw += 360;
    setYaw(Math.round(newYaw));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const activeHotspot = currentVenue.hotspots[activeHotspotIndex] || currentVenue.hotspots[0];

  const nextHotspot = () => {
    setActiveHotspotIndex((prev) => (prev + 1) % currentVenue.hotspots.length);
  };

  const prevHotspot = () => {
    setActiveHotspotIndex(
      (prev) => (prev - 1 + currentVenue.hotspots.length) % currentVenue.hotspots.length
    );
  };

  // Calculate parallax offset based on yaw
  const backgroundOffsetX = ((yaw % 360) / 360) * 80;

  return (
    <section className="panorama-virtual-section w-full py-16 md:py-24 bg-[#231d17] text-[#f6f3ed] border-t border-stone-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Compass size={18} className="text-[#ac8968]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#ac8968] uppercase">
              360° PROPERTY &amp; VENUE VIRTUAL VIEW
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal tracking-tight">
            Interactive 360° Panorama, Floor Plan &amp; Capacity Configurator
          </h2>
        </div>

        {/* Venue Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          {VENUES.map((venue, idx) => {
            const isSelected = selectedVenueIndex === idx;
            return (
              <button
                key={venue.id}
                type="button"
                onClick={() => {
                  setSelectedVenueIndex(idx);
                  setActiveHotspotIndex(0);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#865d36] text-white shadow-lg"
                    : "bg-[#332a22] text-stone-300 hover:bg-[#43372c] hover:text-white"
                }`}
              >
                {venue.tabLabel}
              </button>
            );
          })}
        </div>

        {/* 2-Column Grid: Left Panorama Viewer, Right Capacity Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 360 Interactive Panorama Viewer */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div
              className="relative w-full h-[400px] sm:h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#483a2d] select-none cursor-grab active:cursor-grabbing bg-black"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Panorama Image with Simulated 360 Yaw Parallax */}
              <div
                className="absolute inset-0 w-[140%] h-full pointer-events-none transition-transform duration-75 ease-out"
                style={{
                  transform: `translateX(-${backgroundOffsetX}px) scale(1.08)`,
                }}
              >
                <img
                  src={currentVenue.image}
                  alt={currentVenue.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Subtle vignette shade for high-contrast luxury UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/50 pointer-events-none" />

              {/* Floating Top HUD Badges */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2.5 z-10 pointer-events-auto">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono font-medium text-stone-200 border border-white/15 shadow-sm">
                  <Compass size={14} className="text-amber-400" />
                  <span>360° PANORAMA • YAW: {Math.round(yaw)}° • DRAG TO ROTATE</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoOrbit(!isAutoOrbit);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-stone-200 border border-white/15 hover:bg-black/80 hover:text-white transition-all cursor-pointer"
                  >
                    {isAutoOrbit ? <Pause size={13} /> : <Play size={13} />}
                    <span>{isAutoOrbit ? "Pause Auto-Orbit" : "Resume Auto-Orbit"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFloorPlan(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#865d36] text-xs font-semibold text-white shadow-md hover:bg-[#9a6c40] transition-all cursor-pointer"
                  >
                    <Layers size={13} />
                    <span>View Architectural Floor Plan</span>
                  </button>
                </div>
              </div>

              {/* Hotspots Rendered on Scene */}
              {currentVenue.hotspots.map((hs, idx) => {
                const isActive = activeHotspotIndex === idx;
                return (
                  <button
                    key={hs.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspotIndex(idx);
                    }}
                    style={{ top: hs.top, left: hs.left }}
                    className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-200 shadow-xl cursor-pointer ${
                      isActive
                        ? "bg-[#865d36] text-white border border-amber-300 ring-4 ring-[#865d36]/40 scale-105"
                        : "bg-black/65 text-stone-200 border border-white/20 hover:bg-black/85 hover:text-white"
                    }`}
                  >
                    <Sparkles size={13} className="text-amber-300 shrink-0" />
                    <span className="whitespace-nowrap">{hs.label}</span>
                  </button>
                );
              })}

              {/* Bottom Hotspot Drawer inside Panorama */}
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-auto bg-[#1f1914]/85 backdrop-blur-md border border-[#4d3d2e] rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#ac8968] uppercase">
                      ACTIVE ARCHITECTURAL HOTSPOT
                    </span>
                    <span className="text-stone-500">•</span>
                    <span className="text-xs font-semibold text-white truncate">
                      {activeHotspot.title}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </div>

                {/* Hotspot Prev / Next controls */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevHotspot();
                    }}
                    className="p-2 rounded-xl bg-black/40 hover:bg-black/70 text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                    aria-label="Previous hotspot"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-mono text-stone-400 px-1">
                    0{activeHotspotIndex + 1} / 0{currentVenue.hotspots.length}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextHotspot();
                    }}
                    className="p-2 rounded-xl bg-black/40 hover:bg-black/70 text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                    aria-label="Next hotspot"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Venue Card & Seating Matrix */}
          <div className="lg:col-span-4 bg-[#2b241e] text-[#f6f3ed] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#3e342a]">
            {/* Room Venue Eyebrow */}
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#ac8968] uppercase block mb-1">
              {currentVenue.venueTag}
            </span>
            <h3 className="text-2xl font-serif text-white font-normal mb-2">
              {currentVenue.title}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-6">
              {currentVenue.description}
            </p>

            {/* Seating Style & Capacity Matrix */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
                SEATING STYLE &amp; CAPACITY MATRIX
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {(
                  [
                    { key: "banquet", label: "BANQUET" },
                    { key: "theatre", label: "THEATRE" },
                    { key: "cocktail", label: "COCKTAIL" },
                    { key: "classroom", label: "CLASSROOM" },
                  ] as const
                ).map(({ key, label }) => {
                  const isSelected = selectedSeating === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSeating(key)}
                      className={`p-3 rounded-2xl text-left border transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-[#865d36] border-[#865d36] text-white shadow-md ring-2 ring-[#865d36]/30"
                          : "bg-[#332a22] border-stone-700/60 text-stone-300 hover:border-stone-500"
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-wider uppercase block text-stone-300">
                        {label}
                      </span>
                      <span className="text-sm font-bold text-white mt-0.5 block">
                        {currentVenue.capacities[key]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specifications Details */}
            <div className="border-t border-stone-700/70 pt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Dimensions:</span>
                <span className="font-medium text-stone-200">{currentVenue.dimensions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Structure:</span>
                <span className="font-medium text-stone-200">{currentVenue.structure}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-stone-800">
                <span className="text-stone-400">Starting Tariff:</span>
                <span className="font-bold text-amber-200 text-sm">
                  {currentVenue.tariff}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Floor Plan Blueprint Modal */}
      {showFloorPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#1c1611] text-[#f6f3ed] max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[#524436] shadow-2xl relative">
            <button
              onClick={() => setShowFloorPlan(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Map size={18} className="text-[#ac8968]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#ac8968] uppercase">
                CAD BLUEPRINT SPECIFICATION
              </span>
            </div>
            <h3 className="text-2xl font-serif text-white font-normal mb-1">
              {currentVenue.title} — Floor Plan
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              Scale 1:50 Architectural Layout • {currentVenue.dimensions}
            </p>

            {/* SVG Blueprint Diagram */}
            <div className="bg-[#120e0b] border border-[#3e342a] rounded-2xl p-6 relative overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 600 360" className="w-full h-auto text-amber-200">
                {/* Blueprint grid lines */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path
                      d="M 30 0 L 0 0 0 30"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="600" height="360" fill="url(#grid)" />

                {/* Outer Wall Boundary */}
                <rect
                  x="40"
                  y="40"
                  width="520"
                  height="280"
                  fill="none"
                  stroke="#ac8968"
                  strokeWidth="2.5"
                  rx="6"
                />

                {/* Plunge Pool Area */}
                <rect
                  x="370"
                  y="70"
                  width="160"
                  height="110"
                  fill="#1b2a38"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  rx="4"
                />
                <text x="400" y="130" fill="#7dd3fc" fontSize="11" fontFamily="sans-serif">
                  Basalt Plunge (35m²)
                </text>

                {/* Master Bedroom / Living Space */}
                <rect
                  x="70"
                  y="70"
                  width="270"
                  height="220"
                  fill="none"
                  stroke="#a8a29e"
                  strokeWidth="1.5"
                />
                <text x="130" y="150" fill="#f5f5f4" fontSize="13" fontFamily="serif">
                  Master Sanctuary Living Suite
                </text>
                <text x="145" y="175" fill="#a8a29e" fontSize="10" fontFamily="sans-serif">
                  Kiln-Dried Ceylon Teak Flooring
                </text>

                {/* Sandstone Sunken Deck */}
                <rect
                  x="370"
                  y="200"
                  width="160"
                  height="90"
                  fill="none"
                  stroke="#ac8968"
                  strokeWidth="1.5"
                />
                <text x="390" y="245" fill="#fed7aa" fontSize="11" fontFamily="sans-serif">
                  Sandstone Horizon Deck
                </text>

                {/* Dimensions markings */}
                <line x1="40" y1="20" x2="560" y2="20" stroke="#ac8968" strokeWidth="1" />
                <text x="270" y="15" fill="#ac8968" fontSize="10" fontFamily="monospace">
                  18.50 METERS
                </text>

                <line x1="20" y1="40" x2="20" y2="320" stroke="#ac8968" strokeWidth="1" />
                <text
                  x="-200"
                  y="15"
                  transform="rotate(-90)"
                  fill="#ac8968"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  10.00 METERS
                </text>
              </svg>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">
                CAD Ref: AAA-DWG-WL-2026-VILLA
              </span>
              <button
                onClick={() => setShowFloorPlan(false)}
                className="bg-[#865d36] hover:bg-[#9a6c40] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

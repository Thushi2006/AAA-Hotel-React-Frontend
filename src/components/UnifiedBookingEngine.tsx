import { useState } from "react";
import {
  Bed,
  UtensilsCrossed,
  Sparkles,
  Waves,
  ShieldCheck,
  QrCode,
  Check,
  X,
} from "lucide-react";
import { useHotel } from "../lib/context";

interface RoomOption {
  id: string;
  name: string;
  property: string;
  rateLKR: number;
  rateUSD: number;
  image: string;
}

const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "clifftop-villa",
    name: "Clifftop Teak Plunge Pool Villa",
    property: "AAA Weligama Clifftop Reserve",
    rateLKR: 145200,
    rateUSD: 480,
    image: "/media/villa.jpg",
  },
  {
    id: "mass-timber-suite",
    name: "Oceanfront Mass-Timber Sanctuary Suite",
    property: "AAA Weligama Clifftop Reserve",
    rateLKR: 102850,
    rateUSD: 340,
    image: "/media/suite-ocean.jpg",
  },
  {
    id: "galle-mansion",
    name: "Galle Fort Bastion Heritage Residence",
    property: "AAA Galle Fort Heritage Sanctuary",
    rateLKR: 169400,
    rateUSD: 560,
    image: "/media/hero-resort.jpg",
  },
  {
    id: "mudita-presidential",
    name: "The Muda Reserve Two-Bedroom Presidential...",
    property: "AAA Bentota Lagoon & Beach Estate",
    rateLKR: 278300,
    rateUSD: 920,
    image: "/media/beach.jpg",
  },
];

const MEAL_PLANS = [
  {
    id: "bb",
    name: "Artisan Bed & Breakfast",
    rate: 0,
    desc: "Included in Base Villa Rate",
  },
  {
    id: "hb",
    name: "Half Board (Breakfast + Signature Dinner)",
    rate: 19663,
    desc: "+Rs. 19,663 / guest / night",
  },
  {
    id: "fb",
    name: "Full Board (All 3 Gourmet Meals)",
    rate: 33275,
    desc: "+Rs. 33,275 / guest / night",
  },
  {
    id: "ai",
    name: "All-Inclusive Ayurvedic & Sommelier Reserve",
    rate: 52938,
    desc: "+Rs. 52,938 / guest / night",
  },
];

const STAY_EXTRAS = [
  {
    id: "transfer",
    name: "Private Luxury SUV Airport Transfer (CMB)",
    rate: 28738,
  },
  {
    id: "spa",
    name: "90-Min Couples Ceylon Cinnamon Spa Ritual",
    rate: 48400,
  },
  {
    id: "candlelit",
    name: "Private Candlelit Clifftop Pavilion Dinner",
    rate: 63525,
  },
  {
    id: "late-checkout",
    name: "Guaranteed Late Checkout (Until 18:00)",
    rate: 25713,
  },
];

interface LedgerEntry {
  id: string;
  opId: string;
  title: string;
  details: string;
  price: string;
  status: "CONFIRMED" | "QUEUED" | "SYNCED";
  timestamp: string;
}

export default function UnifiedBookingEngine() {
  const { notify } = useHotel();
  const [activeTab, setActiveTab] = useState<"villa" | "dining" | "events" | "pool">("villa");

  // Villa Reservation State
  const [checkIn, setCheckIn] = useState("2026-11-12");
  const [checkOut, setCheckOut] = useState("2026-11-15");
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(ROOM_OPTIONS[0]);
  const [selectedMealPlan, setSelectedMealPlan] = useState(MEAL_PLANS[0].id);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["transfer"]);
  const [specialRequests, setSpecialRequests] = useState(
    "High floor clifftop view; nut-free welcome platter."
  );

  // Dining Reservation State
  const [diningDate, setDiningDate] = useState("2026-11-12");
  const [seatingTime, setSeatingTime] = useState("19:30 • Twilight Tasting Menu");
  const [diningParty, setDiningParty] = useState("4 Guests");
  const [zonePreference, setZonePreference] = useState(
    "Clifftop Ocean Edge (Outdoor Terrace)"
  );
  const [allergenProfile, setAllergenProfile] = useState(
    "Shellfish-safe prep required for 1 guest"
  );

  // Events Reservation State
  const [eventDate, setEventDate] = useState("2026-12-18");
  const [eventType, setEventType] = useState("Intimate Oceanfront Wedding");
  const [eventGuests, setEventGuests] = useState("80 Guests");
  const [eventVenue, setEventVenue] = useState("Sculptural Beachfront Lawn & Arch");
  const [eventNotes, setEventNotes] = useState(
    "Sunset ceremony with live acoustic accompaniment and bespoke farm-to-table banquet."
  );

  // Pool Day Pass State
  const [poolDate, setPoolDate] = useState("2026-11-14");
  const [passType, setPassType] = useState("Private Basalt Cabana + Plunge Pass");
  const [poolGuests, setPoolGuests] = useState("2 Guests");
  const [cocktailAddon, setCocktailAddon] = useState(true);

  // Modal QR confirmation state
  const [activeQrModal, setActiveQrModal] = useState<LedgerEntry | null>(null);

  // Ledger state
  const [ledger, setLedger] = useState<LedgerEntry[]>([
    {
      id: "RES-2026-8841",
      opId: "IDEMP-99412-A",
      title: "Clifftop Teak Plunge Pool Villa • 3 Nights • Half Board",
      details: "Synced with PMS & Channel Manager",
      price: "$1,390",
      status: "CONFIRMED",
      timestamp: "Just now",
    },
  ]);

  // Compute nights
  const computeNights = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
      return diff > 0 ? diff : 3;
    } catch {
      return 3;
    }
  };

  const nights = computeNights();

  // Compute Total for Sanctuary Villa
  const calculateTotal = () => {
    const baseRate = selectedRoom.rateLKR * nights;
    const mealRate =
      (MEAL_PLANS.find((m) => m.id === selectedMealPlan)?.rate || 0) *
      guestsCount *
      nights;
    const extrasTotal = selectedExtras.reduce((acc, curr) => {
      const item = STAY_EXTRAS.find((e) => e.id === curr);
      return acc + (item ? item.rate : 0);
    }, 0);
    return baseRate + mealRate + extrasTotal;
  };

  const totalSanctuaryPrice = calculateTotal();

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handlers for confirming
  const handleConfirmSanctuary = (e: React.FormEvent) => {
    e.preventDefault();
    const resId = `RES-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const opId = `IDEMP-${Math.floor(10000 + Math.random() * 90000)}-A`;
    const mealName =
      MEAL_PLANS.find((m) => m.id === selectedMealPlan)?.name.split(" ")[0] +
      " " +
      (MEAL_PLANS.find((m) => m.id === selectedMealPlan)?.name.split(" ")[1] || "");

    const newEntry: LedgerEntry = {
      id: resId,
      opId: opId,
      title: `${selectedRoom.name} • ${nights} Nights • ${mealName}`,
      details: "Synced with PMS & Channel Manager",
      price: `Rs. ${totalSanctuaryPrice.toLocaleString()}`,
      status: "CONFIRMED",
      timestamp: "Real-time sync",
    };

    setLedger([newEntry, ...ledger]);
    setActiveQrModal(newEntry);
    notify(`Sanctuary Reservation ${resId} Confirmed & Synced!`);
  };

  const handleConfirmDining = (e: React.FormEvent) => {
    e.preventDefault();
    const resId = `DIN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const opId = `KOT-${Math.floor(10000 + Math.random() * 90000)}`;

    const newEntry: LedgerEntry = {
      id: resId,
      opId: opId,
      title: `Cinnamon & Ember • ${diningParty} • ${seatingTime.split("•")[0].trim()}`,
      details: `${zonePreference} • KOT Alert Sent`,
      price: "Guaranteed Table",
      status: "CONFIRMED",
      timestamp: "Real-time sync",
    };

    setLedger([newEntry, ...ledger]);
    setActiveQrModal(newEntry);
    notify(`Dining Table Token Generated for Cinnamon & Ember!`);
  };

  const handleConfirmEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const resId = `EVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const opId = `PROP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newEntry: LedgerEntry = {
      id: resId,
      opId: opId,
      title: `${eventType} • ${eventGuests} • ${eventVenue.split(" ")[0]}`,
      details: "Arch. Proposal & Concierge Assigned",
      price: "Portfolio Lock",
      status: "CONFIRMED",
      timestamp: "Real-time sync",
    };

    setLedger([newEntry, ...ledger]);
    setActiveQrModal(newEntry);
    notify(`Event Date Reserved for Architectural Staging Proposal!`);
  };

  const handleConfirmPool = (e: React.FormEvent) => {
    e.preventDefault();
    const resId = `PASS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const opId = `RFID-${Math.floor(10000 + Math.random() * 90000)}`;
    const guestsNum = parseInt(poolGuests) || 2;
    const basePass = 18000 * guestsNum;
    const total = cocktailAddon ? basePass + 9500 * guestsNum : basePass;

    const newEntry: LedgerEntry = {
      id: resId,
      opId: opId,
      title: `${passType} • ${poolGuests}`,
      details: "Basalt Plunge + RFID Wristband Allocated",
      price: `Rs. ${total.toLocaleString()}`,
      status: "CONFIRMED",
      timestamp: "Real-time sync",
    };

    setLedger([newEntry, ...ledger]);
    setActiveQrModal(newEntry);
    notify(`Pool Pass Generated with RFID Smart Key Wristband!`);
  };

  return (
    <section className="ube-wrapper w-full py-4 sm:py-6" id="booking-engine">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Top Dark Header - Sleek, Compact, Clean Hotel UI */}
        <div className="ube-top-banner bg-[#322921] text-[#f6f3ed] rounded-2xl p-5 sm:p-6 mb-5 shadow-lg border border-[#44382d]">
          <div className="mb-3">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#ac8968] uppercase inline-block mb-1">
              ONLINE BOOKING ENGINE
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-white tracking-tight leading-snug">
              Unified Reservations: Rooms, Fine Dining, Events &amp; Pool Passes
            </h2>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab("villa")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "villa"
                  ? "bg-[#865d36] text-white shadow-sm"
                  : "bg-[#3d332a] text-[#d6cdbf] hover:bg-[#4a3f35] hover:text-white"
              }`}
            >
              <Bed size={14} />
              <span>1. Rooms &amp; Villas</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("dining")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "dining"
                  ? "bg-[#865d36] text-white shadow-sm"
                  : "bg-[#3d332a] text-[#d6cdbf] hover:bg-[#4a3f35] hover:text-white"
              }`}
            >
              <UtensilsCrossed size={14} />
              <span>2. Restaurant Table</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "events"
                  ? "bg-[#865d36] text-white shadow-sm"
                  : "bg-[#3d332a] text-[#d6cdbf] hover:bg-[#4a3f35] hover:text-white"
              }`}
            >
              <Sparkles size={14} />
              <span>3. Weddings &amp; Events</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pool")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "pool"
                  ? "bg-[#865d36] text-white shadow-sm"
                  : "bg-[#3d332a] text-[#d6cdbf] hover:bg-[#4a3f35] hover:text-white"
              }`}
            >
              <Waves size={14} />
              <span>4. Pool Day Pass</span>
            </button>
          </div>
        </div>

        {/* Content Columns: Left Interactive Form, Right Live Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-[#e7ded4]">
            {/* TAB 1: ROOMS & VILLAS */}
            {activeTab === "villa" && (
              <form onSubmit={handleConfirmSanctuary} className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif text-[#2d251e] font-normal">
                      Step 1: Select Sanctuary Villa, Dates &amp; Meal Plan
                    </h3>
                    <p className="text-[11px] text-[#7a7065] mt-0.5">
                      Protected by idempotent booking safeguards and real-time concurrency locks.
                    </p>
                  </div>
                  <span className="self-start sm:self-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#faf7f2] text-stone-700 border border-[#dcd3c7]">
                    {nights} Nights Selected
                  </span>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Number of Guests
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Room / Villa Category - Matching Image 3 Exactly */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
                    Select Room / Villa Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ROOM_OPTIONS.map((room) => {
                      const isSelected = selectedRoom.id === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoom(room)}
                          className={`ube-room-card ${
                            isSelected ? "selected" : ""
                          }`}
                        >
                          <div className="ube-thumbnail">
                            <img
                              src={room.image}
                              alt={room.name}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="card-title truncate">
                              {room.name}
                            </h4>
                            <p className="card-prop truncate">
                              {room.property}
                            </p>
                            <p className="card-rate">
                              ${room.rateUSD} / night{" "}
                              <span className="rate-sub">
                                (Rs. {room.rateLKR.toLocaleString()})
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Meal Plan - Matching Image 4 */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
                    Select Meal Plan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {MEAL_PLANS.map((plan) => {
                      const isSelected = selectedMealPlan === plan.id;
                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedMealPlan(plan.id)}
                          className={`ube-meal-card ${
                            isSelected ? "selected" : ""
                          }`}
                        >
                          <div className="meal-title">{plan.name}</div>
                          <div className="meal-desc">{plan.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Enhance Your Stay (Extras) - Matching Image 4 */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
                    Enhance Your Stay (Extras)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {STAY_EXTRAS.map((extra) => {
                      const isSelected = selectedExtras.includes(extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra.id)}
                          className={`ube-extra-card ${
                            isSelected ? "selected" : ""
                          }`}
                        >
                          <span className="truncate pr-2">{extra.name}</span>
                          <span className="extra-rate shrink-0">
                            +Rs. {extra.rate.toLocaleString()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Special Requests, Allergies &amp; Cultural/Accessibility Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36]"
                    placeholder="High floor clifftop view; nut-free welcome platter."
                  />
                </div>

                {/* Confirm Button - Matching Image 4 */}
                <button
                  type="submit"
                  className="w-full bg-[#2d251e] hover:bg-[#3f342a] text-white py-3.5 px-5 rounded-xl font-bold tracking-wider text-xs uppercase transition-all duration-150 shadow-md cursor-pointer"
                >
                  CONFIRM SANCTUARY RESERVATION (RS. {totalSanctuaryPrice.toLocaleString()})
                </button>
              </form>
            )}

            {/* TAB 2: RESTAURANT TABLE */}
            {activeTab === "dining" && (
              <form onSubmit={handleConfirmDining} className="space-y-5">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="text-lg sm:text-xl font-serif text-[#2d251e] font-normal">
                    Cinnamon &amp; Ember — Fine Dining Table Reservation
                  </h3>
                  <p className="text-[11px] text-[#7a7065] mt-0.5">
                    Includes indoor/outdoor preference and pre-linked Allergen Matrix profile.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Dining Date
                    </label>
                    <input
                      type="date"
                      value={diningDate}
                      onChange={(e) => setDiningDate(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Seating Time
                    </label>
                    <select
                      value={seatingTime}
                      onChange={(e) => setSeatingTime(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                    >
                      <option value="12:30 • Ocean Breeze Lunch">12:30 • Ocean Breeze Lunch</option>
                      <option value="14:00 • Coastal Catch Lunch">14:00 • Coastal Catch Lunch</option>
                      <option value="18:00 • Golden Hour Aperitivo">18:00 • Golden Hour Aperitivo</option>
                      <option value="19:30 • Twilight Tasting Menu">19:30 • Twilight Tasting Menu</option>
                      <option value="21:00 • Starlight Chef's Table">21:00 • Starlight Chef's Table</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Party Size
                    </label>
                    <select
                      value={diningParty}
                      onChange={(e) => setDiningParty(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                    >
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                      <option value="8 Guests">8 Guests</option>
                      <option value="Private Alcove (Up to 12)">Private Alcove (Up to 12)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Table Zone Preference
                  </label>
                  <select
                    value={zonePreference}
                    onChange={(e) => setZonePreference(e.target.value)}
                    className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                  >
                    <option value="Clifftop Ocean Edge (Outdoor Terrace)">
                      Clifftop Ocean Edge (Outdoor Terrace)
                    </option>
                    <option value="Teak Vaulted Dining Pavilion (Indoor AC)">
                      Teak Vaulted Dining Pavilion (Indoor AC)
                    </option>
                    <option value="Sunset Wine Verandah">Sunset Wine Verandah</option>
                    <option value="Sommelier's Chef Counterfront">
                      Sommelier's Chef Counterfront
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Dietary &amp; Allergen Profile (Auto-alerts Kitchen KOT &amp; Chef)
                  </label>
                  <input
                    type="text"
                    value={allergenProfile}
                    onChange={(e) => setAllergenProfile(e.target.value)}
                    className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36]"
                    placeholder="Shellfish-safe prep required for 1 guest"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#865d36] hover:bg-[#724e2d] text-white py-3.5 px-5 rounded-xl font-bold tracking-wider text-xs uppercase transition-all duration-150 shadow-md cursor-pointer"
                >
                  CONFIRM TABLE &amp; GENERATE QR SESSION TOKEN
                </button>
              </form>
            )}

            {/* TAB 3: WEDDINGS & EVENTS */}
            {activeTab === "events" && (
              <form onSubmit={handleConfirmEvent} className="space-y-5">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="text-lg sm:text-xl font-serif text-[#2d251e] font-normal">
                    Sculptural Beachfront &amp; Clifftop Celebrations
                  </h3>
                  <p className="text-[11px] text-[#7a7065] mt-0.5">
                    Tailored private event buyout, floral staging &amp; sommelier pairing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Target Event Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                    >
                      <option value="Intimate Oceanfront Wedding">Intimate Oceanfront Wedding</option>
                      <option value="Sunset Clifftop Gala Dinner">Sunset Clifftop Gala Dinner</option>
                      <option value="Private Estate Corporate Retreat">Private Estate Corporate Retreat</option>
                      <option value="Milestone Family Anniversary">Milestone Family Anniversary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Estimated Guests
                    </label>
                    <select
                      value={eventGuests}
                      onChange={(e) => setEventGuests(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                    >
                      <option value="20-40 Guests">20–40 Guests</option>
                      <option value="50-80 Guests">50–80 Guests</option>
                      <option value="80-150 Guests">80–150 Guests</option>
                      <option value="Full Resort Buyout (200+)">Full Resort Buyout (200+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Venue Staging Preference
                  </label>
                  <select
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                  >
                    <option value="Sculptural Beachfront Lawn & Arch">
                      Sculptural Beachfront Lawn &amp; Arch (Weligama)
                    </option>
                    <option value="Clifftop Mass-Timber Pavilion">
                      Clifftop Mass-Timber Pavilion (Weligama)
                    </option>
                    <option value="Galle Fort Colonial Courtyard">
                      Galle Fort Colonial Courtyard (Galle)
                    </option>
                    <option value="Bentota Lagoon Water-Deck">
                      Bentota Lagoon Water-Deck (Bentota)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Special Event Vision &amp; Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={eventNotes}
                    onChange={(e) => setEventNotes(e.target.value)}
                    className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2d251e] hover:bg-[#3f342a] text-white py-3.5 px-5 rounded-xl font-bold tracking-wider text-xs uppercase transition-all duration-150 shadow-md cursor-pointer"
                >
                  CONFIRM EVENT DATE &amp; REQUEST ARCHITECTURAL PROPOSAL
                </button>
              </form>
            )}

            {/* TAB 4: POOL DAY PASS */}
            {activeTab === "pool" && (
              <form onSubmit={handleConfirmPool} className="space-y-5">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="text-lg sm:text-xl font-serif text-[#2d251e] font-normal">
                    Clifftop Infinity Pool &amp; Sunset Cabanas Day Pass
                  </h3>
                  <p className="text-[11px] text-[#7a7065] mt-0.5">
                    Includes thermal basalt plunge, signature coconut refreshments &amp; RFID wristband.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Day Pass Date
                    </label>
                    <input
                      type="date"
                      value={poolDate}
                      onChange={(e) => setPoolDate(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Pass Category
                    </label>
                    <select
                      value={passType}
                      onChange={(e) => setPassType(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                    >
                      <option value="Private Basalt Cabana + Plunge Pass">
                        Private Basalt Cabana + Plunge Pass
                      </option>
                      <option value="Ocean Horizon Double Daybed">
                        Ocean Horizon Double Daybed
                      </option>
                      <option value="Sunset Cliff Infinity Lounger">
                        Sunset Cliff Infinity Lounger
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Guests
                    </label>
                    <select
                      value={poolGuests}
                      onChange={(e) => setPoolGuests(e.target.value)}
                      className="w-full bg-[#fdfbf9] border border-[#dcd3c7] rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#865d36] cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Guests (Cabana Max)">4 Guests (Cabana Max)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#faf6f1] border border-stone-200">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cocktailAddon}
                      onChange={(e) => setCocktailAddon(e.target.checked)}
                      className="w-4 h-4 rounded text-[#865d36] focus:ring-[#865d36]"
                    />
                    <div className="text-xs text-stone-800">
                      <span className="font-bold">Include Golden-Hour Sundowner Pairing</span>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Two artisan cocktails &amp; coconut sorbet (+Rs. 9,500 / guest).
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#865d36] hover:bg-[#724e2d] text-white py-3.5 px-5 rounded-xl font-bold tracking-wider text-xs uppercase transition-all duration-150 shadow-md cursor-pointer"
                >
                  CONFIRM POOL DAY PASS (RS.{" "}
                  {(
                    (parseInt(poolGuests) || 2) *
                    (18000 + (cocktailAddon ? 9500 : 0))
                  ).toLocaleString()}
                  )
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Live Booking & Outbox Ledger - Matching Image 3 */}
          <div className="lg:col-span-4 ube-ledger-container bg-[#28211a] text-[#f6f3ed] rounded-2xl p-5 shadow-lg border border-[#3c3227]">
            {/* Header with Shield */}
            <div className="border-b border-stone-700/60 pb-3 mb-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#ac8968] uppercase block mb-1">
                SECURE RESERVATIONS
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-serif text-white font-normal">
                  Live Booking &amp; Outbox Ledger
                </h3>
                <ShieldCheck size={18} className="text-[#ac8968]" />
              </div>
            </div>

            {/* Ledger Cards */}
            <div className="space-y-3">
              {ledger.map((item, index) => (
                <div
                  key={item.id + index}
                  onClick={() => setActiveQrModal(item)}
                  className="ube-ledger-card bg-[#1e1813] border border-[#382e24] hover:border-[#865d36] rounded-xl p-3.5 transition-all duration-150 cursor-pointer shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-stone-300">
                      {item.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider text-[#10b981] border border-[#10b981]/50 bg-[#10b981]/10">
                      {item.status}
                    </span>
                  </div>

                  <p className="text-[10px] font-mono text-stone-400 mb-1.5">
                    OpID: {item.opId}
                  </p>

                  <p className="text-xs font-medium text-stone-200 line-clamp-2 mb-2 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </p>

                  <div className="border-t border-stone-800/80 pt-2 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 truncate pr-2">
                      {item.details}
                    </span>
                    <span className="font-bold text-amber-200 shrink-0">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Session Token / Confirmation Modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#261f19] text-[#f6f3ed] max-w-sm w-full rounded-2xl p-6 border border-[#524436] shadow-2xl relative">
            <button
              onClick={() => setActiveQrModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-5">
              <div className="w-10 h-10 bg-emerald-950/80 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-400">
                <Check size={20} />
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#ac8968] uppercase block">
                IMMUTABLE PMS CONFIRMATION
              </span>
              <h3 className="text-xl font-serif text-white font-normal mt-0.5">
                {activeQrModal.id}
              </h3>
              <p className="text-[11px] text-stone-400">
                OpID: {activeQrModal.opId}
              </p>
            </div>

            {/* QR Visual */}
            <div className="bg-white p-3.5 rounded-xl w-40 h-40 mx-auto mb-5 flex flex-col items-center justify-center shadow-inner">
              <QrCode size={110} className="text-stone-900" />
              <span className="text-[8px] font-mono font-bold text-stone-600 mt-1.5">
                AAA SMART KEY PASS
              </span>
            </div>

            <div className="bg-[#1c1611] rounded-xl p-3 border border-stone-800 text-xs space-y-1 mb-5">
              <div className="text-stone-200 font-semibold truncate">{activeQrModal.title}</div>
              <div className="text-stone-400 text-[10px]">{activeQrModal.details}</div>
              <div className="text-amber-200 font-bold pt-0.5">{activeQrModal.price}</div>
            </div>

            <button
              onClick={() => setActiveQrModal(null)}
              className="w-full bg-[#865d36] hover:bg-[#724e2d] text-white py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Close Token Pass
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

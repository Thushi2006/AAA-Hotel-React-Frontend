import type { Room } from "../lib/types";
export const hotel = {
  name: "AAA Hotel",
  country: "Sri Lanka",
  location: "The southern coast, Sri Lanka",
  timezone: "Asia/Colombo",
  preview: true,
  // Replace with approved client contacts before launch. No invented phone numbers.
  contactEmail: "",
  contactPhone: "",
  address: "",
};
export const rooms: Room[] = [
  {
    id: "ocean-suite",
    name: "Ocean Terrace Suite",
    collection: "Suites",
    rate: 68000,
    capacity: 3,
    size: 68,
    bed: "King bed",
    view: "Ocean-facing terrace",
    image: "/media/suite-ocean.jpg",
    description:
      "Wake slowly. Open the terrace doors. Let the ocean set the pace. A generous, light-filled suite with natural textures and room to simply be.",
    amenities: [
      "Private terrace",
      "Freestanding bath",
      "Rain shower",
      "Wi-Fi",
      "Tea & coffee",
      "Air conditioning",
    ],
  },
  {
    id: "garden-room",
    name: "Garden Hideaway",
    collection: "Rooms",
    rate: 42000,
    capacity: 2,
    size: 42,
    bed: "King or twin beds",
    view: "Tropical garden view",
    image: "/media/suite-garden.jpg",
    description:
      "A quiet corner of the island, tucked into green. Warm timber, soft linen and a shaded place to read through the afternoon.",
    amenities: [
      "Garden balcony",
      "Rain shower",
      "Wi-Fi",
      "Tea & coffee",
      "Air conditioning",
      "Writing desk",
    ],
  },
  {
    id: "pool-villa",
    name: "The Private Pool Villa",
    collection: "Villas",
    rate: 112000,
    capacity: 5,
    size: 125,
    bed: "Two king beds",
    view: "Private pool & garden",
    image: "/media/villa.jpg",
    description:
      "Your own little world. Two bedrooms, a private pool and long, unhurried days together. A considered retreat for families and friends.",
    amenities: [
      "Private pool",
      "Two bedrooms",
      "Outdoor dining",
      "Living room",
      "Rain shower",
      "Wi-Fi",
    ],
  },
];
export const experiences = [
  {
    id: "ocean",
    label: "Ocean & open skies",
    title: "Follow the feeling.",
    text: "Barefoot mornings. Salt on your skin. A sunset with nowhere else to be. Find your own rhythm on the southern coast.",
    image: "/media/beach.jpg",
    eyebrow: "01 / THE COAST",
    detail:
      "Spend a slow morning by the shore, or ask your host to help plan a coastal walk. Swimming and water activities depend on local conditions and a confirmed operator.",
  },
  {
    id: "wellness",
    label: "A little more balance",
    title: "Return to yourself.",
    text: "Restorative rituals, quiet corners and the simple pleasure of slowing down. Make a little space for yourself.",
    image: "/media/spa.jpg",
    eyebrow: "02 / WELLNESS",
    detail:
      "Explore the proposed wellness offering: restorative spa rituals, guided breathwork and gentle morning movement. Treatments, opening hours and availability will be confirmed by the hotel.",
  },
  {
    id: "pool",
    label: "Poolside, unhurried",
    title: "Do a little less.",
    text: "An afternoon that stretches just a little longer. A cool swim, a good book, and the shade of a palm.",
    image: "/media/pool.jpg",
    eyebrow: "03 / THE POOL",
    detail:
      "Discover our pool day-pass preview. Select a time and guest count to explore the booking interface. Final access rules and prices require confirmation by the property.",
  },
  {
    id: "island",
    label: "Beyond the hotel",
    title: "An island of stories.",
    text: "Coastal lanes, local flavours and unexpected discoveries. Make room for the Sri Lanka you came to find.",
    image: "/media/destination.jpg",
    eyebrow: "04 / DISCOVER SRI LANKA",
    detail:
      "Build a day around the southern coast: heritage streets, local craft and coastal scenery. Final itineraries, travel times and prices will be arranged with the hotel team.",
  },
];
export const offers = [
  {
    id: "slow-stay",
    code: "SLOWSTAY",
    label: "THE LONGER ESCAPE",
    title: "Stay a little longer.",
    text: "A little more time, a little more island. Explore 12% off the room rate for stays of three nights or more.",
    image: "/media/beach.jpg",
    tag: "3 nights or more",
    terms:
      "Illustrative offer. 12% off room-only rates for stays of at least 3 nights. Extras and taxes are excluded from the discount. No stacking. Final validity dates and blackout dates require hotel approval.",
  },
  {
    id: "breakfast",
    code: "ISLANDMORNINGS",
    label: "ISLAND MORNINGS",
    title: "Wake up to something lovely.",
    text: "Begin every day with a leisurely breakfast. Explore our breakfast-inclusive stay package.",
    image: "/media/dining.jpg",
    tag: "Breakfast included",
    terms:
      "Illustrative package. Breakfast is added at the displayed package price of LKR 4,500 per adult per night. This is an inclusion package, not a free-breakfast discount.",
  },
];
export const galleryItems = [
  {
    src: "/media/hero-resort.jpg",
    category: "The hotel",
    title: "Evenings by the water",
  },
  {
    src: "/media/suite-ocean.jpg",
    category: "Stays",
    title: "Your private retreat",
  },
  {
    src: "/media/beach.jpg",
    category: "Island life",
    title: "A slower coastal rhythm",
  },
  {
    src: "/media/dining.jpg",
    category: "Dining",
    title: "A table worth lingering at",
  },
  {
    src: "/media/pool.jpg",
    category: "The hotel",
    title: "A long, lazy afternoon",
  },
  {
    src: "/media/suite-garden.jpg",
    category: "Stays",
    title: "Soft light, considered spaces",
  },
  {
    src: "/media/spa.jpg",
    category: "The hotel",
    title: "A little time for yourself",
  },
  {
    src: "/media/wedding.jpg",
    category: "Celebrations",
    title: "Beautifully together",
  },
  { src: "/media/restaurant.jpg", category: "Dining", title: "Gather around" },
];

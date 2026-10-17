export type Currency = "LKR" | "USD";
export type Page =
  | "home"
  | "story"
  | "stay"
  | "experiences"
  | "dining"
  | "celebrate"
  | "gallery"
  | "offers"
  | "contact"
  | "guest";
export interface Room {
  id: string;
  name: string;
  collection: "Suites" | "Rooms" | "Villas";
  rate: number;
  capacity: number;
  size: number;
  bed: string;
  view: string;
  image: string;
  description: string;
  amenities: string[];
}
export interface StaySearch {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  promo: string;
}
export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests: string;
  accessibility: string;
  dietary: string;
}
export interface Extras {
  breakfast: boolean;
  transfer: boolean;
}
export interface Quote {
  nights: number;
  base: number;
  extras: number;
  discount: number;
  tax: number;
  total: number;
}
export interface Reservation {
  id: string;
  roomId: string;
  search: StaySearch;
  guest: GuestDetails;
  extras: Extras;
  quote: Quote;
  status: "Preview" | "Cancelled";
  createdAt: string;
}
export interface GuestRequest {
  id: string;
  type: string;
  notes: string;
  status: "Created" | "Cancelled";
  createdAt: string;
}

export interface GuestSession {
  entered: boolean;
  name: string;
}
export interface GuestPreferences {
  name: string;
  diet: string;
  pillow: string;
}

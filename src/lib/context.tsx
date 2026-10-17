import { createContext, useContext } from "react";
import type {
  Currency,
  GuestRequest,
  GuestPreferences,
  GuestSession,
  Page,
  Reservation,
  Room,
  StaySearch,
} from "./types";
export interface HotelContextValue {
  guestSession: GuestSession;
  setGuestSession: React.Dispatch<React.SetStateAction<GuestSession>>;
  guestPreferences: GuestPreferences;
  setGuestPreferences: React.Dispatch<React.SetStateAction<GuestPreferences>>;
  guestRequests: GuestRequest[];
  setGuestRequests: React.Dispatch<React.SetStateAction<GuestRequest[]>>;
  currency: Currency;
  setCurrency: (v: Currency) => void;
  page: Page;
  navigate: (page: Page) => void;
  search: StaySearch;
  setSearch: (v: StaySearch) => void;
  book: (room?: Room, promo?: string) => void;
  showRoom: (room: Room) => void;
  showFilm: () => void;
  showEnquiry: (type?: string) => void;
  notify: (message: string) => void;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
}
export const HotelContext = createContext<HotelContextValue | null>(null);
export function useHotel() {
  const value = useContext(HotelContext);
  if (!value) throw new Error("Hotel provider missing");
  return value;
}

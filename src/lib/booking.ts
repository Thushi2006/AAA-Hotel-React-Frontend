import type { Currency, Extras, Quote, Room, StaySearch } from "./types";
const DAY = 86400000;
export function localToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function addDays(date: string, count: number): string {
  const timestamp = Date.parse(date + "T00:00:00Z");
  return Number.isNaN(timestamp)
    ? ""
    : new Date(timestamp + count * DAY).toISOString().slice(0, 10);
}
export function initialSearch(): StaySearch {
  const day = localToday();
  return {
    checkIn: addDays(day, 1),
    checkOut: addDays(day, 3),
    adults: 2,
    children: 0,
    promo: "",
  };
}
export function stayNights(search: StaySearch): number {
  return Math.round(
    (Date.parse(search.checkOut + "T00:00:00Z") -
      Date.parse(search.checkIn + "T00:00:00Z")) /
      DAY,
  );
}
function validDate(value: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !isNaN(Date.parse(value + "T00:00:00Z")) &&
    new Date(value + "T00:00:00Z").toISOString().slice(0, 10) === value
  );
}
export function validateSearch(
  search: StaySearch,
  today = localToday(),
): string | null {
  if (!validDate(search.checkIn) || !validDate(search.checkOut))
    return "Choose valid arrival and departure dates.";
  if (search.checkIn < today)
    return "Your arrival date must be today or later.";
  const nights = stayNights(search);
  if (nights < 1) return "Departure must be after arrival.";
  if (nights > 30)
    return "For stays longer than 30 nights, please use the enquiry form.";
  if (
    !Number.isInteger(search.adults) ||
    search.adults < 1 ||
    search.adults > 4
  )
    return "Choose between 1 and 4 adults.";
  if (
    !Number.isInteger(search.children) ||
    search.children < 0 ||
    search.children > 3
  )
    return "Choose between 0 and 3 children.";
  if (search.adults + search.children > 5)
    return "Our largest villa sleeps 5. Please enquire for larger groups.";
  const code = search.promo.trim().toUpperCase();
  if (code && !["SLOWSTAY", "ISLANDMORNINGS"].includes(code))
    return "This offer code is not recognised. Try SLOWSTAY for 3 nights or more.";
  if (code === "SLOWSTAY" && nights < 3)
    return "SLOWSTAY requires at least 3 nights.";
  return null;
}
export function fitsGuests(room: Room, search: StaySearch): boolean {
  return search.adults + search.children <= room.capacity;
}
export function quoteStay(
  room: Room,
  search: StaySearch,
  extras: Extras,
): Quote {
  const nights = stayNights(search);
  if (!Number.isInteger(nights) || nights < 1 || nights > 30)
    throw new Error("Invalid stay length");
  const base = room.rate * nights;
  const breakfast =
    extras.breakfast || search.promo.trim().toUpperCase() === "ISLANDMORNINGS";
  const extrasPrice =
    (breakfast ? 4500 * search.adults * nights : 0) +
    (extras.transfer ? 28000 : 0);
  const discount =
    search.promo.trim().toUpperCase() === "SLOWSTAY" && nights >= 3
      ? Math.round(base * 0.12)
      : 0;
  // Illustrative combined fee for UI demonstration; replace with server-side quote.
  const tax = Math.round((base - discount + extrasPrice) * 0.1);
  return {
    nights,
    base,
    extras: extrasPrice,
    discount,
    tax,
    total: base - discount + extrasPrice + tax,
  };
}
export function formatMoney(lkr: number, currency: Currency): string {
  const value = currency === "USD" ? lkr / 305 : lkr;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
export function formatDate(value: string, short = false): string {
  return new Date(value + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: short ? "short" : "long",
    year: short ? undefined : "numeric",
    timeZone: "UTC",
  });
}

import React from "react";
import test from "node:test";
import assert from "node:assert/strict";
import { renderToString } from "react-dom/server";
import { HotelContext } from "../src/lib/context";
import type { HotelContextValue } from "../src/lib/context";
import { initialSearch } from "../src/lib/booking";
import Home from "../src/pages/Home";
import GuestPage from "../src/pages/GuestPage";
import * as PublicPages from "../src/pages/PublicPages";
import BookingDialog from "../src/components/BookingDialog";
import EnquiryDialog from "../src/components/EnquiryDialog";
Object.assign(globalThis, {
  window: { matchMedia: () => ({ matches: false }), scrollY: 0 },
});
const context: HotelContextValue = {
  guestSession: { entered: false, name: "Guest" },
  setGuestSession: () => {},
  guestPreferences: {
    name: "",
    diet: "No preference",
    pillow: "No preference",
  },
  setGuestPreferences: () => {},
  guestRequests: [],
  setGuestRequests: () => {},
  page: "home",
  navigate: () => {},
  currency: "LKR",
  setCurrency: () => {},
  search: initialSearch(),
  setSearch: () => {},
  book: () => {},
  showRoom: () => {},
  showFilm: () => {},
  showEnquiry: () => {},
  notify: () => {},
  reservations: [],
  setReservations: () => {},
};
const screens = { Home, GuestPage, ...PublicPages };
for (const [name, Screen] of Object.entries(screens))
  test(name + " renders without a runtime exception", () => {
    const html = renderToString(
      <HotelContext.Provider value={context}>
        <Screen />
      </HotelContext.Provider>,
    );
    assert.ok(html.length > 200);
    assert.doesNotMatch(html, /undefined|NaN/);
  });
test("booking and enquiry dialogs render valid initial states", () => {
  for (const element of [
    <BookingDialog onClose={() => {}} />,
    <EnquiryDialog type="Wedding or event" onClose={() => {}} />,
  ]) {
    const html = renderToString(
      <HotelContext.Provider value={context}>{element}</HotelContext.Provider>,
    );
    assert.ok(html.includes("<dialog"));
    assert.doesNotMatch(html, /NaN/);
  }
});

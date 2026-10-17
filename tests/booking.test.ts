import test from "node:test";
import assert from "node:assert/strict";
import {
  addDays,
  fitsGuests,
  localToday,
  quoteStay,
  stayNights,
  validateSearch,
} from "../src/lib/booking.ts";
import type { Room, StaySearch } from "../src/lib/types.ts";
const search: StaySearch = {
  checkIn: "2027-01-01",
  checkOut: "2027-01-04",
  adults: 2,
  children: 0,
  promo: "",
};
const room: Room = {
  id: "test",
  name: "Suite",
  collection: "Suites",
  rate: 68000,
  capacity: 3,
  size: 68,
  bed: "King",
  view: "Ocean",
  image: "",
  description: "",
  amenities: [],
};
test("dates follow Sri Lanka timezone at a UTC date boundary", () =>
  assert.equal(localToday(new Date("2026-10-15T20:00:00Z")), "2026-10-16"));
test("date arithmetic crosses years and leap days", () => {
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(addDays("2028-02-28", 1), "2028-02-29");
});
test("clearing an arrival field is safe", () =>
  assert.equal(addDays("", 1), ""));
test("departure must be later than arrival", () => {
  assert.match(
    validateSearch({ ...search, checkOut: search.checkIn }, "2026-10-16")!,
    /Departure/,
  );
  assert.match(
    validateSearch({ ...search, checkOut: "2026-12-31" }, "2026-10-16")!,
    /Departure/,
  );
});
test("rejects invalid dates, past stays and oversized date ranges", () => {
  assert.match(
    validateSearch({ ...search, checkIn: "2027-02-30" }, "2026-10-16")!,
    /valid/,
  );
  assert.match(validateSearch(search, "2027-01-02")!, /today/);
  assert.match(
    validateSearch({ ...search, checkOut: "2027-02-02" }, "2026-10-16")!,
    /30 nights/,
  );
});
test("guest validation rejects excess and fractional guests", () => {
  assert.match(
    validateSearch({ ...search, adults: 4, children: 2 }, "2026-10-16")!,
    /largest/,
  );
  assert.match(
    validateSearch({ ...search, adults: 1.5 }, "2026-10-16")!,
    /adults/,
  );
});
test("capacity filtering includes children", () => {
  assert.equal(fitsGuests(room, { ...search, children: 1 }), true);
  assert.equal(fitsGuests(room, { ...search, children: 2 }), false);
});
test("quote combines nights, breakfast, one transfer and sample fees once", () => {
  const quote = quoteStay(room, search, { breakfast: true, transfer: true });
  assert.deepEqual(quote, {
    nights: 3,
    base: 204000,
    extras: 55000,
    discount: 0,
    tax: 25900,
    total: 284900,
  });
  assert.equal(stayNights(search), 3);
});
test("offer discounts room rate only before sample fees", () => {
  const quote = quoteStay(
    room,
    { ...search, promo: "SLOWSTAY" },
    { breakfast: true, transfer: true },
  );
  assert.equal(quote.discount, 24480);
  assert.equal(quote.tax, 23452);
  assert.equal(quote.total, 257972);
});
test("rejects unknown offers and short SLOWSTAY stays", () => {
  assert.match(
    validateSearch({ ...search, promo: "FREE" }, "2026-10-16")!,
    /not recognised/,
  );
  assert.match(
    validateSearch(
      { ...search, checkOut: "2027-01-03", promo: "SLOWSTAY" },
      "2026-10-16",
    )!,
    /3 nights/,
  );
});
test("breakfast package is included exactly once", () => {
  const q = quoteStay(
    room,
    { ...search, promo: "ISLANDMORNINGS" },
    { breakfast: true, transfer: false },
  );
  assert.equal(q.extras, 27000);
});
test("invalid quote lengths cannot create negative totals", () =>
  assert.throws(
    () =>
      quoteStay(
        room,
        { ...search, checkOut: "2026-12-31" },
        { breakfast: false, transfer: false },
      ),
    /Invalid/,
  ));

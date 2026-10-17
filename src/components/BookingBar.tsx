import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Minus,
  Plus,
  UsersRound,
} from "lucide-react";
import { useHotel } from "../lib/context";
import { addDays, localToday, validateSearch } from "../lib/booking";
export default function BookingBar({ compact = false }: { compact?: boolean }) {
  const { search, setSearch, book } = useHotel();
  const [guests, setGuests] = useState(false);
  const [error, setError] = useState("");
  const update = (key: "adults" | "children", delta: number) =>
    setSearch({
      ...search,
      [key]: Math.max(
        key === "adults" ? 1 : 0,
        Math.min(key === "adults" ? 4 : 3, search[key] + delta),
      ),
    });
  return (
    <form
      className={"booking-bar " + (compact ? "compact" : "")}
      onSubmit={(e) => {
        e.preventDefault();
        const err = validateSearch(search);
        setError(err ?? "");
        if (!err) {
          setGuests(false);
          book();
        }
      }}
    >
      <div className="booking-intro">
        <span>
          YOUR ISLAND
          <br /> <i>is waiting.</i>
        </span>
      </div>
      <label className="booking-field">
        <span>
          ARRIVAL <CalendarDays size={14} />
        </span>
        <input
          aria-label="Arrival date"
          type="date"
          required
          min={localToday()}
          value={search.checkIn}
          onChange={(e) => {
            const checkIn = e.target.value;
            setSearch({
              ...search,
              checkIn,
              checkOut:
                checkIn >= search.checkOut
                  ? addDays(checkIn, 1)
                  : search.checkOut,
            });
          }}
        />
      </label>
      <label className="booking-field">
        <span>
          DEPARTURE <CalendarDays size={14} />
        </span>
        <input
          aria-label="Departure date"
          type="date"
          required
          min={addDays(search.checkIn, 1)}
          value={search.checkOut}
          onChange={(e) => setSearch({ ...search, checkOut: e.target.value })}
        />
      </label>
      <div className="booking-field guest-field">
        <span>
          YOUR COMPANY <UsersRound size={15} />
        </span>
        <button
          className="guest-toggle"
          type="button"
          onClick={() => setGuests(!guests)}
          aria-expanded={guests}
        >
          {search.adults} {search.adults === 1 ? "adult" : "adults"}
          {search.children
            ? `, ${search.children} ${search.children === 1 ? "child" : "children"}`
            : ""}
          <span>⌄</span>
        </button>
        {guests && (
          <div className="guest-popover">
            <div className="popover-title">
              Make room for everyone
              <button type="button" onClick={() => setGuests(false)}>
                Done
              </button>
            </div>
            {(["adults", "children"] as const).map((t) => (
              <div className="guest-counter" key={t}>
                <span>
                  {t === "adults" ? "Adults" : "Children"}
                  <small>
                    {t === "adults" ? "Ages 13 and above" : "Ages 0–12"}
                  </small>
                </span>
                <div>
                  <button
                    type="button"
                    aria-label={"Fewer " + t}
                    disabled={search[t] === (t === "adults" ? 1 : 0)}
                    onClick={() => update(t, -1)}
                  >
                    <Minus size={13} />
                  </button>
                  <b>{search[t]}</b>
                  <button
                    type="button"
                    aria-label={"More " + t}
                    disabled={search[t] === (t === "adults" ? 4 : 3)}
                    onClick={() => update(t, 1)}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            ))}
            <p>For groups of more than 5, please enquire.</p>
          </div>
        )}
      </div>
      <button type="submit" className="availability-button">
        <span>
          Find your stay<small>EXPLORE AVAILABILITY</small>
        </span>
        <ArrowUpRight size={22} />
      </button>
      {error && (
        <p role="alert" className="booking-error">
          {error}
        </p>
      )}
    </form>
  );
}

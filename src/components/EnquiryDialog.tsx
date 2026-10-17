import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button, Eyebrow, Modal } from "./ui";
import { localToday } from "../lib/booking";
export default function EnquiryDialog({
  type,
  onClose,
}: {
  type: string;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);
  const event = /Celebration|Wedding|event/.test(type);
  const dining = /table|drinks/.test(type);
  const pool = /Pool/.test(type);
  return (
    <Modal title="A little conversation" onClose={onClose}>
      <Eyebrow>LET’S IMAGINE IT TOGETHER</Eyebrow>
      <h2>{done ? "A lovely place to start." : "Tell us a little more."}</h2>
      {done ? (
        <div className="enquiry-success">
          <CheckCircle2 size={40} strokeWidth={1} />
          <p>Your enquiry preview is complete.</p>
          <p>
            This demonstration has not sent your message. The hotel’s contact
            and notification service will be connected at integration.
          </p>
          <Button onClick={onClose}>Back to the island</Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <p className="enquiry-type">{type}</p>
          <div className="form-grid">
            <label>
              Your name
              <input
                name="name"
                required
                maxLength={100}
                placeholder="Sample guest"
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                required
                type="email"
                placeholder="guest@example.com"
              />
            </label>
            <label>
              {event
                ? "Event date"
                : dining
                  ? "Dining date"
                  : pool
                    ? "Pool day"
                    : "Preferred date"}
              <input name="date" type="date" required min={localToday()} />
            </label>
            <label>
              Number of guests
              <input
                name="guests"
                type="number"
                required
                min="1"
                max={event ? 500 : 20}
                defaultValue="2"
              />
            </label>
            {(dining || pool || event) && (
              <label className="full-width">
                {pool ? "Preferred time slot" : "Preferred time"}
                <select name="time" required>
                  <option value="">Choose a time</option>
                  {(pool
                    ? ["Morning · 9 am–1 pm", "Afternoon · 1 pm–5 pm"]
                    : [
                        "Breakfast / Morning",
                        "Lunch / Afternoon",
                        "Dinner / Evening",
                      ]
                  ).map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            )}
            {dining && (
              <label className="full-width">
                Seating preference
                <select name="seating">
                  <option>No preference</option>
                  <option>Indoor</option>
                  <option>Outdoor terrace</option>
                </select>
              </label>
            )}
            {event && (
              <>
                <label>
                  Event type
                  <select name="eventType">
                    <option>Wedding</option>
                    <option>Private celebration</option>
                    <option>Corporate gathering</option>
                  </select>
                </label>
                <label>
                  Proposed venue
                  <select name="venue">
                    <option>Help me choose</option>
                    <option>Coastal lawn · Outdoor</option>
                    <option>Private gathering · Indoor</option>
                  </select>
                </label>
                <fieldset className="full-width enquiry-checks">
                  <legend>Details to discuss</legend>
                  {[
                    "Catering",
                    "Décor",
                    "Equipment",
                    "Special requirements",
                  ].map((n) => (
                    <label key={n}>
                      <input type="checkbox" name="requirements" value={n} />
                      {n}
                    </label>
                  ))}
                </fieldset>
              </>
            )}
            <label className="full-width">
              Your message
              <textarea
                name="message"
                rows={4}
                maxLength={1200}
                placeholder="A little about what you have in mind…"
              />
            </label>
          </div>
          <p className="quiet-note">
            Use sample details for this design preview. Messages are not sent.
            Availability, capacity and prices require confirmation by the hotel.
          </p>
          <Button type="submit">Preview your enquiry</Button>
        </form>
      )}
    </Modal>
  );
}

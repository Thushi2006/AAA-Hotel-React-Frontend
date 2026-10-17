# Developer 2 handoff

## Source interpretation

Read against **Global Hospitality Platform v5.0**, in particular sections 9–13 (public digital presence, tours, customer profile and booking), 15–18 (PMS/reservations/folios), 44–49 (guest services/pool), 106 (UX/accessibility/localization), and **107–108**, which override the original ownership and sprint assumptions.

Section 107 assigns Developer 2: property/room setup, booking/reservations, channel-manager contract, CRM, folios, room-charge integration, housekeeping, laundry, pool access, guest requests and smart-lock adapter contract. It does not assign every public website content module exclusively to Developer 2. The current user request adds ownership of the public landing page/frontend. This delivery follows that request.

## This delivery versus the separate management system

| Domain               | Included frontend preview                                                                   | Remaining server/staff integration                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Public marketing     | Home, story, stays, dining/bar, experiences/pool, weddings/venues, offers, gallery, contact | Approved content, CMS/property engine and real contact routes                                           |
| Accommodation        | Room collections, room detail modal, dimensions/capacity/amenity display                    | Property/room CRUD, room status, floors/wings and maintenance in separate PMS                           |
| Reservations         | Search dates and guests, capacity filtering, room selection, extras, requests, price review | Live inventory, inventory hold/expiry, authoritative quote, concurrent-booking protection, confirmation |
| Payment              | Price breakdown and explicit no-payment demo state                                          | Developer 1 payment contract, hosted gateway checkout, verified webhook, reconciliation                 |
| CRM/identity         | Sign-in/join screen, guest preferences, history, accessibility/dietary request fields       | Developer 1 IAM, secure session, verification, consent, role/tenant controls, retention                 |
| Guest self-service   | Preview history, date modification/recalculation, cancellation                              | Authenticated ownership checks, availability recheck, policy/fees, idempotency, notifications           |
| Housekeeping/laundry | Guest request categories and local request records                                          | Staff assignment, state transitions, real-time updates and folio charging                               |
| Pool                 | Experience content and date/time/guest-count enquiry                                        | Actual pass packages, occupancy, access validation and time slots                                       |
| Folio                | Preview reservation cost summary; explicitly not an invoice                                 | Charges, splitting, restaurant room charges, payments, checkout settlement                              |
| Dining/events        | Public showcases and local enquiry UX                                                       | D3 restaurant availability/menu; D4 venues, layouts, capacity and packages                              |
| Virtual tours        | Scene-based photo-tour UI                                                                   | Hotel panorama files and an accessible panorama viewer                                                  |
| Locks/channels       | Documented as future integration                                                            | Smart-lock/RFID adapter, channel-manager/OTA contracts and access revocation                            |

## Proposed flow

1. `GET availability` returns authoritative room options, rates and restrictions for property/date/guests.
2. `POST quote` returns a versioned quote ID, expiry, integer minor-unit or decimal money, currency, taxes, policy, inclusions and cancellation conditions.
3. `POST reservation` sends quote ID, structured guest details and an idempotency key. The backend reserves inventory transactionally.
4. `POST payment checkout` returns a gateway URL. Confirmation comes only from the verified server flow.
5. Guest portal loads authenticated server-owned reservations and folios. A date change requests a new quote and availability check before approval.
6. Requests/cancellations emit shared outbox events; notification delivery is independent of the reservation transaction.

Proposed TypeScript API shapes are in `src/lib/contracts.ts`. Agree final OpenAPI contracts with D1/D2 before replacing demo state. Tenant scope must come from authenticated server context; never trust a client-supplied organization ID.

## UX details to retain

- Keep integer LKR pricing in the preview. Production uses authoritative currency/rounding policies. USD conversion here is clearly marked as a fixed demo estimate (LKR 305/USD), not a live FX service.
- The sample 10% combined taxes/fees line is a calculation placeholder, not Sri Lankan tax advice or approved property taxation.
- SLOWSTAY discounts only the room subtotal by 12% for at least three nights. ISLANDMORNINGS is a paid breakfast-inclusion package, not free breakfast.
- Never label a pending payment, local simulation or enquiry as a confirmed hotel booking.
- Native dialogs support Escape, focus trapping and focus restoration. Test with keyboard and assistive technology after integration.
- Reduced motion suppresses the looping hero video and decorative animation; a local poster remains.
- Booking inputs are structured, and special requests are not represented as confirmed amenities.

## Validation

Run `npm test` and `npm run build`. Tests cover Colombo date boundaries, valid booking ranges, guest capacity, offers, extras/tax arithmetic, invalid quote lengths and server rendering of page/dialog entry states. Real-device/browser acceptance, performance, live API, concurrency, authorization and payment tests remain required for production.

The build environment did not expose the supported browser QA skill. No browser visual or interactive acceptance is claimed for this delivery. Review the private deployed preview on desktop and mobile before client sign-off.

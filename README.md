# AAA Hotel — Sri Lanka

A complete luxury hotel **frontend design preview**, built with **React 19, TypeScript, Vite 8 and Tailwind CSS 4**. The public guest website is the first delivery. The management system remains a separate application.

## Run locally

Requires Node.js 22.13 or newer. Open this folder in VS Code, then run:

```sh
npm install
npm run dev
```

Open **http://localhost:4173**. Keep the terminal running. For the exact locked dependency tree, use `corepack pnpm install --frozen-lockfile` instead of npm.

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

`dist/` contains the built site. Preview it using the preview command or a static server, rather than double-clicking index.html. Navigation uses hash URLs, so static hosting does not need SPA rewrite rules.

## Included

- Home with local Sri Lankan coastal video, poster fallback, pause/play, reduced-motion support, animated reveals, editorial story sections and room collection controls.
- Our story, rooms/suites/villas, interactive experience tabs, dining/bar, wedding/venue enquiries, offers, filtered gallery/lightbox, photo tour, contact and FAQs.
- Booking interface: valid arrival/departure dates, adults/children, room capacity, offer codes, breakfast/transfer extras, structured requests, clear price breakdown and a preview reservation.
- Guest portal UI: sign-in/registration demonstrations, booking history, date modification with recalculation, cancellation, guest requests, preferences and a sample stay summary.
- Responsive mobile layouts, semantic sections, keyboard focus, native dialog focus trapping, labelled forms, local fonts and local media.
- TypeScript integration contracts, quote/date/capacity tests and server-render smoke checks.

## Important handoff boundary

This is a frontend preview. **No live availability, authentication, account creation, payment, confirmation email, enquiry delivery, staff notification or hotel reservation is connected.** Reservations live in React memory and clear on refresh. Guest portal forms and requests are local demonstrations. Never use real passwords or sensitive information in the demo.

Illustrative data must be approved by the client: exact hotel address, phone/email, property photographs/footage, room descriptions/capacities, amenities, venue layouts/capacities, offers, taxes, policies, dietary/accessibility availability and restaurant menu. The UI labels these preview states. No invented reviews, star ratings or awards are used.

The 360-degree requirement has a functional scene-based photo-tour preview. Replace it with a proper panorama viewer when the hotel supplies equirectangular images. The preview is not labelled as a completed 360-degree tour.

## Branding

Supplied palette: `#3E362E`, `#865D36`, `#93785B`, `#AC8968`, `#A69080`.
Warm ivory `#F6F3ED` adds contrast and negative space. Cormorant Garamond pairs with Manrope. Theme tokens live in `src/styles.css` under `@theme`.

## Project map

- `src/pages/Home.tsx` — landing page
- `src/pages/PublicPages.tsx` — public subpages
- `src/pages/GuestPage.tsx` — guest portal preview
- `src/components/BookingDialog.tsx` — reservation journey
- `src/components/EnquiryDialog.tsx` — dining/pool/event/general enquiry
- `src/data/hotel.ts` — central property/room/experience/offer/gallery content
- `src/lib/booking.ts` — date, validation, capacity and sample quote logic
- `src/lib/contracts.ts` — proposed backend interfaces
- `public/media/` — bundled imagery and MP4s
- `docs/DEVELOPER_2_HANDOFF.md` — scope and integration plan
- `ASSET_CREDITS.md` — media sources and replacement guidance

## Production integration

Use the Django backend as the source of truth for tenant scope, availability, rates, fees, reservation concurrency, identity, authorisation, financial posting and cancellation. Do not trust a browser-calculated price. Use a hosted payment-provider redirect rather than collecting card data here. The proposed endpoint names in `src/lib/contracts.ts` are a handoff proposal, not a claim that those APIs already exist.

No secrets are included. The live preview is private. Change `noindex,nofollow` and add approved canonical, social and Hotel structured metadata only after the real property details and public domain are confirmed.

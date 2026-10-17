import type { Extras, GuestDetails, Quote, Room, StaySearch } from "./types";
/** Integration boundary. Replace the preview adapter with authenticated Django endpoints.
 * Server is authoritative for rates, capacity, availability, payments and identity. */
export interface BookingApi {
  searchAvailability(
    input: StaySearch,
    signal?: AbortSignal,
  ): Promise<{ rooms: Room[]; quoteExpiresAt: string }>;
  createQuote(input: {
    roomId: string;
    search: StaySearch;
    extras: Extras;
  }): Promise<Quote & { quoteId: string }>;
  createReservation(input: {
    quoteId: string;
    guest: GuestDetails;
    idempotencyKey: string;
  }): Promise<{ reservationId: string; status: "Pending" }>;
  beginPayment(input: {
    reservationId: string;
    returnUrl: string;
  }): Promise<{ redirectUrl: string }>;
}
export interface ApiError {
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
  correlationId?: string;
}
export const endpointContracts = {
  availability: "GET /api/v1/properties/:propertyId/availability/",
  quote: "POST /api/v1/booking/quotes/",
  reservation: "POST /api/v1/reservations/",
  payment: "POST /api/v1/payments/checkout/",
  profile: "GET/PATCH /api/v1/me/",
  reservations: "GET /api/v1/me/reservations/",
  cancellation: "POST /api/v1/me/reservations/:id/cancel/",
  modification: "PATCH /api/v1/me/reservations/:id/",
  guestRequests: "POST /api/v1/me/guest-requests/",
} as const;

/**
 * While the Spring Boot backend isn't wired up yet, every student.*.service
 * file returns this mock data instead of calling the API, so the UI is
 * fully clickable during frontend development.
 *
 * To switch a section over to the real backend:
 *   1. Confirm the endpoint is live (see the comment above it in lib/constants.ts)
 *   2. Set NEXT_PUBLIC_USE_MOCK_DATA=false in .env.local (or flip USE_MOCK below)
 *   3. That's it — the service functions already call the real endpoint,
 *      mock is just the fallback while USE_MOCK is true.
 */
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

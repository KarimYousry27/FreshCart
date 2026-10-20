# Functional review (October 14, 2026)

## Source fixes applied
- Auth.js session now carries the API user ID from the sign-in response.
- Order history now uses `/orders/user/{userId}` and expects an array (the API contract), rather than `/orders/user`.
- Wishlist screen updates immediately after a successful removal via the shared Redux state; failures are visible.
- Search scans up to the first 100 products instead of only the 24-item current page. This is **not** full-catalog search; the upstream API would need server-side search for that.
- Secret generation also runs before production builds. Each installation generates its own secret.

## Not verified
- Could not install dependencies or run production build/browser tests because npm registry DNS requests returned EAI_AGAIN.
- No claim that all interactive features work end-to-end. Real API access and test credentials are required to verify checkout and user orders.
- The previously reported five dev-dependency audit findings have **not** been resolved or re-audited. Do not use `npm audit fix --force` blindly. Run `npm audit`, `npm audit --omit=dev`, `npm run typecheck`, `npm run lint`, `npm run build` after installing in an online environment.

## Run
`npm install` then `npm run dev`; open http://localhost:3000. The predev script creates `.env.local` with a random `AUTH_SECRET` if missing.

# Verification status

This project has **not** been verified end-to-end in a browser in the delivery environment. The npm registry is unreachable here, so package installation, lint, typecheck, build, and fresh audit cannot be rerun on this revision. Do not treat this archive as fully tested.

## Improvements in this revision

- `npm run dev` automatically generates a unique local `AUTH_SECRET` if missing, avoiding the common Auth.js server configuration error. The generated value is local, ignored by Git, and must not be shared. This does not bypass authentication.
- Wishlist reads products from the API as its source of truth rather than filtering them through initially empty Redux state.
- Existing typed pages, React hooks fixes, and production build fixes are preserved.

## Remaining security advisory

The last audit provided by the user reported **five high severity findings** through `eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces`. `npm audit --omit=dev` reported zero findings at that time. These are **not fixed in this archive**. Don't run `npm audit fix --force`; it proposes an incompatible downgrade. Check for upstream fixes before publishing, and rerun both audits.

## Required validation

Run `npm install`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm audit`, and `npm audit --omit=dev`. Then run `npm run dev` and verify home, search, categories, brands, product details, sign up, sign in, cart, wishlist, and checkout with a test account. Payments and order history depend on the external API and must be validated separately.

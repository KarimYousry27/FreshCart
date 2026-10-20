# FreshCart — E-Commerce Web App

A responsive e-commerce web application built with **Next.js, React, and TypeScript**. FreshCart lets users browse products, manage a shopping cart and wishlist, sign in, and place orders through the Route E-Commerce API.

I built this project to practice creating a complete front-end shopping experience, connecting a real API, managing shared state, and handling authentication in a Next.js application.

> **Project status:** Core shopping flows were manually tested locally, and TypeScript, ESLint, and the production build passed. This is a portfolio/learning project, not a production payment service.

## Features

- **Product browsing:** Browse products, view product details, and explore categories and brands.
- **Search and sorting:** Search products and use the available category and sorting controls. Search operates on a limited set of products loaded from the API, not the entire catalog.
- **Authentication:** Register, sign in, and sign out using Auth.js credentials sessions backed by the Route API.
- **Shopping cart:** Add products, update quantities, remove items, and see cart totals.
- **Wishlist:** Save and remove favorite products.
- **Checkout:** Enter shipping details and submit a cash-on-delivery order. An online payment option is also included, subject to API/payment availability.
- **Order history:** View previous orders associated with the signed-in account.
- **Responsive UI:** Layouts designed for desktop and mobile, with loading, empty, and error states.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, responsive CSS |
| UI | Radix Slot, class-variance-authority, Lucide icons, shadcn-style button |
| Authentication | Auth.js / NextAuth (Credentials, JWT sessions) |
| Shared state | Redux Toolkit, React Redux |
| Forms and validation | React Hook Form, Zod |
| API | Route E-Commerce REST API |
| Quality checks | ESLint, TypeScript, Next.js production build |

## Getting Started

**Requirements:** Node.js 20.9+ and npm. A recent Node.js LTS version is recommended.

### Environment Variables

```dotenv
AUTH_SECRET=your-own-long-random-secret
AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://ecommerce.routemisr.com/api/v1
```

- `AUTH_SECRET`: Required for Auth.js. Generated automatically for local development when missing.
- `AUTH_URL`: Local application URL; change it to your deployment URL as appropriate.
- `NEXT_PUBLIC_API_URL`: Base URL for the Route E-Commerce API.

**Never commit `.env.local`, API tokens, or credentials.** For deployment, set the secret and other environment variables in your hosting platform.

## Available Scripts

```bash
npm run dev        # Start development server
npm run typecheck  # Check TypeScript types
npm run lint       # Run ESLint
npm run build      # Create production build
npm run start      # Serve production build
npm audit          # Review dependency advisories
npm audit --omit=dev  # Audit production dependencies only
```

## How It Works

1. The storefront loads product, category, and brand data from the Route API.
2. Users can register or sign in to access account-specific features.
3. Auth.js manages the session, while authenticated requests use the API token.
4. Cart and wishlist actions update the API and synchronize relevant UI state through Redux Toolkit.
5. Checkout submits order details to the API, and the Orders page displays order history for the signed-in user.

## Testing

The following checks **passed on the tested FreshCart V2 copy**:

- `npm install`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Manual testing of product browsing, navigation, search/filters/sorting, registration, login/logout, cart, wishlist, checkout, order history, and mobile layout
- Browser console check during the final manual test (no project errors observed)
- `npm audit --omit=dev` returned **0 reported vulnerabilities** in the last reported production-dependency audit

### Known Limitations

- The full `npm audit` still reported **5 high-severity findings** in a development-tool dependency chain involving `eslint-config-next`, `@next/eslint-plugin-next`, `fast-glob`, `micromatch`, and `braces`. These findings are **not resolved** by a clean production-only audit. Avoid applying `npm audit fix --force` without checking for breaking dependency changes.
- Search is limited to products fetched for the current search request (up to 100 items), rather than a full server-side catalog search.
- Online payment depends on the external API and payment configuration; do not treat it as a verified live payment integration.
- External API availability and behavior may change.
- The manual checks above do not replace automated end-to-end tests or a production security review.

## API and Design References

- [Route E-Commerce API documentation](https://documenter.getpostman.com/view/5709532/2s93JqTRWN)
- [FreshCart design inspiration (Figma)](https://www.figma.com/design/7GOjynvDWj2Lnbb4IKjbXK/Freshcart---E-Commerce-?node-id=12-2477)
- [FreshCart reference storefront](https://freshcart-route.vercel.app/)

## Project Purpose

This project helped me practice **Next.js App Router, TypeScript, authentication, API integration, Redux Toolkit, responsive interfaces, and real-world debugging** while building an e-commerce user experience.

## Disclaimer

FreshCart is an independent educational portfolio project inspired by the referenced design. It is not an official FreshCart application. Product and account data are provided by the external Route API.

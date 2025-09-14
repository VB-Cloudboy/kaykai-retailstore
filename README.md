# KayKai Retail Store

Single-brand / single-product (with simple variations) e‑commerce site.

## 1. Purpose
Create a lean, fast, maintainable storefront for one niche flagship product with a few variant options (e.g. size, color, bundle). Initial scope: static product catalogue (single product), client‑side cart, simple checkout data capture (phase 1). Future phase: integrate secure payment (Stripe) & lightweight order API.

## 2. Technology Stack (Phase 1 – Frontend Only)
| Layer | Choice | Rationale |
|-------|--------|-----------|
| Build / Dev | Vite | Ultra fast local DX, minimal config |
| UI Library | React 18 | Ecosystem maturity & component model |
| Styling | Tailwind CSS | Rapid responsive design, utility consistency |
| State (cart) | React Context + Reducer | Simple global cart without extra deps |
| Data (product) | Local module JSON | Single product – no DB yet |
| Forms | HTML5 + light validation | Keep bundle small |

Future (Phase 2) additions:
- Backend: Minimal Node/Express (or serverless functions) for orders.
- Database: SQLite (file) or Postgres (managed) depending on needs.
- Payments: Stripe Checkout or Payment Element.
- Email: Resend / Postmark for order confirmations.

## 3. Project Structure (Planned)
```
kaykai-retailstore/
	public/
		images/               # Product & brand assets
	src/
		main.jsx              # Entry point
		App.jsx               # App shell & routing (simple conditional views)
		components/
			Navbar.jsx
			Footer.jsx
			ProductPage.jsx
			VariantSelector.jsx
			Cart.jsx
			MiniCart.jsx
			Checkout.jsx
			OrderConfirmation.jsx
		context/
			CartContext.jsx
		data/
			product.js          # Single product definition + variants
		styles/
			tailwind.css        # Tailwind directives
	package.json
	vite.config.js
	tailwind.config.js
	postcss.config.js
	README.md
```

## 4. Initial Milestones
1. Scaffold Vite + React + Tailwind (current task).
2. Implement product module & cart context.
3. Build core UI components (product, cart, checkout skeleton).
4. Add minimal client-side validation & accessibility passes.
5. Prepare for backend/payment (interfaces + notes).

## 5. Scripts (to be added after scaffolding)
| Script | Purpose |
|--------|---------|
| `dev` | Run Vite dev server |
| `build` | Production build |
| `preview` | Preview built bundle |
| `lint` | (Optional) future ESLint integration |

## 6. Future Backend / Payment Plan (Summary)
- Define `POST /orders` accepting cart items + customer info; server calculates total (authoritative pricing).
- Use Stripe Checkout Session for simplicity (redirect flow) OR Payment Element if inline checkout required.
- Persist order record after Stripe webhook confirmation (idempotent handling).

## 7. Design Principles
- Performance first: ship only what’s needed.
- Progressive enhancement: cart & checkout degrade gracefully.
- Accessibility: semantic HTML, focus management, ARIA for cart changes.
- Clear path to add backend without large refactor (separate data & cart concerns now).

## 8. Status
Frontend scaffolding baseline complete (React + Vite + Tailwind + cart context + placeholder components).

## 9. Local Development

### Prerequisites
- Node.js 18+ (LTS recommended)

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Then open: http://localhost:5173

### Build Production Bundle
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 10. Next Implementation Steps
Short term:
1. Wire navigation / simple view state for Cart & Checkout pages.
2. Implement Checkout flow (client-only mock) with validation + transitions.
3. Add accessibility polish (focus outlines on variant selection, ARIA live regions for cart changes).
4. Replace placeholder image assets.
5. Add lightweight unit tests for cart reducer.

Upcoming (backend/payment):
1. Introduce server (Express or serverless) for `POST /orders`.
2. Integrate Stripe Checkout (redirect) for payment.
3. Add environment variable handling for API keys.
4. Implement order persistence + webhook handler.
5. Add email confirmation integration.

## 11. Backend & Payment Roadmap (Detail)

### Phase A: Minimal Order API
- Endpoint: `POST /api/orders` (accepts items [{ variantId, quantity }], customer info)
- Validation: verify variant ids, compute authoritative pricing server-side
- Response: `{ orderId, amount, currency }`

### Phase B: Stripe Integration
Option 1 (Recommended start): Stripe Checkout Session
- Server: create session with line items (price data derived from internal price map)
- Client: redirect to session URL
- Webhook: `checkout.session.completed` => persist order + send email

Option 2 (Later): Payment Element
- Use client secret flow for on-page payment, enabling future upsells.

### Phase C: Persistence
- Start with SQLite (file) via better-sqlite3 for zero external dependency.
- Schema: tables `orders`, `order_items`, `products` (seeded).

### Phase D: Operational Enhancements
- Add rate limiting (basic token bucket or middleware) to `/api/orders`.
- Implement idempotency using a client-generated key header.
- Centralized logging & error tracking (e.g., pino + hosted log aggregator).

### Phase E: Email & Notifications
- Use Resend or Postmark transactional template with order summary.
- Add fallback plain-text template.

### Phase F: Security Hardening
- Validate origin/referrer for order POST.
- Strict CSP & security headers (Helmet if Express).
- Store only necessary PII; no card data (Stripe handles payment). 

---
This README will evolve as milestones complete.

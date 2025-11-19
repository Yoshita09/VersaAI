# VersaAI

VersaAI is a full-stack AI-powered web app built with the **PERN** stack (Postgres + Express + React + Node). It bundles several AI utilities (image generation, background/object removal, resume review, article & blog-title generation, etc.), account management via **Clerk**, billing/subscription handling (Stripe recommended), and stores data in a hosted **Neon Postgres** database. The project is split into two main folders: `backend` and `frontend`.

> This README documents the repository structure, features, local setup, deployment notes, environment variables, and developer guidance. Update the example values to match your actual implementation details where necessary.

---

## Key features

* **User authentication & accounts** — Clerk-powered sign-up, sign-in, and session handling.
* **AI tools & creators** — Pages and endpoints to generate images, remove backgrounds/objects, write articles, produce blog titles, and more via integrated AI services.
* **Creations & gallery** — Users can create, view, and manage AI-generated creations. UI component `CreationItem` displays saved outputs.
* **Billing & subscriptions** — Integration with Stripe to manage paid plans, usage tracking, and billing. (Files and frontend include UI/flows for subscribing and plan selection.)
* **Dashboard & community** — User dashboard for managing account, billing, and created items. Community page for sharing or viewing published items.
* **Neon (Postgres) DB** — Relational storage for users, creations, usage logs, and billing metadata.
* **Modular backend** — `controllers`, `routes`, and `middlewares` folders for clean API layering and separation of concerns.
* **Vercel-friendly** — Frontend (React) and backend are prepared for Vercel deployment; `vercel.json` present for configuration.

---

## Repository structure (high level)

```
/ (project root)
├─ backend/
│  ├─ configs/         # DB connection, Clerk/Stripe config helpers
│  ├─ controllers/     # Business logic for routes (users, creations, billing, AI endpoints)
│  ├─ middlewares/     # Auth checks, error handlers, request validation
│  ├─ routes/          # Express route definitions (api/creations, api/users, api/billing...)
│  ├─ server.js        # Entry point for the backend (Express app)
│  ├─ package.json     # Backend dependencies & scripts
│  └─ vercel.json      # (if using Vercel serverless functions / config)

├─ frontend/
│  ├─ public/          # Static assets
│  ├─ src/
│  │  ├─ assets/       # images, icons
│  │  ├─ components/   # Reusable UI components (Navbar, Sidebar, Footer, Hero, Plan, Testimonial, AiTools, CreationItem, etc.)
│  │  ├─ pages/        # Feature pages: Home, Layout, Dashboard, GenerateImages, RemoveBackground, RemoveObject, ReviewResume, WriteArticle, BlogTitles, Community, etc.
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ index.css
│  ├─ package.json
│  └─ README.md

└─ README.md (this file)
```

> The screenshots you provided confirm the above layout — component and page names are present in `src/pages` and `src/components`.

---

## Frontend (React) details

* The app uses a component-driven approach. Notable components:

  * `Navbar.jsx` — site navigation and Clerk login buttons.
  * `Sidebar.jsx` — left/right navigation for dashboard flows.
  * `Hero.jsx`, `Footer.jsx`, `Plan.jsx`, `Testimonial.jsx` — marketing and landing content.
  * `AiTools.jsx` — UI overview for different AI utilities.
  * `CreationItem.jsx` — card/list item used across dashboard & gallery.
* Pages that implement features:

  * `GenerateImages.jsx` — image generation UI and preview.
  * `RemoveBackground.jsx`, `RemoveObject.jsx` — photo editing tools.
  * `ReviewResume.jsx` — resume parsing + suggestions.
  * `WriteArticle.jsx`, `BlogTitles.jsx` — text generation workflows.
  * `Dashboard.jsx` — user dashboard for creations, billing status, and account.
  * `Community.jsx` — view and interact with shared/public creations.
* The frontend expects protected routes — the auth flow is handled by Clerk components/hooks. Billing UI shows plan selection and subscription status.

---

## Backend (Express) details

* `server.js` is the entry point and wires up middleware, routes and DB connections.

* `configs/` contains database connection (Neon), Clerk configuration helper, and (optionally) Stripe initialisation.

* `routes/` maps endpoints to controller functions. Typical endpoints include:

  * `POST /api/auth/*`  — optional auth webhooks or Clerk callbacks
  * `GET /api/creations` — list creations
  * `GET /api/creations/:id` — get single creation
  * `POST /api/creations` — create/save a new creation
  * `POST /api/generate` — proxy to AI generation service
  * `POST /api/upload` — store images/assets (possible S3 or signed-URL flow)
  * `POST /api/billing/subscribe` — create Stripe subscription
  * `POST /api/billing/webhook` — Stripe webhook handler
  * `GET /api/user` — user profile / usage queries

* `controllers/` implement the above logic, using DB models or direct SQL queries against Neon.

* `middlewares/` include authentication helpers that verify Clerk session headers or tokens before allowing protected requests.

> Note: adapt route names to match your actual backend files. Replace `api/generate` with your specific AI proxy routes when present.

---

## Environment variables (example)

*Do NOT commit these to source control. Use environment variables in your deployment platform (Vercel, Heroku, Railway, etc.).*

```
# Neon (Postgres)
DATABASE_URL=postgres://user:password@host:5432/dbname

# Clerk
CLERK_API_KEY=clerk_secret_key
CLERK_FRONTEND_API=clerk_frontend_api_key
CLERK_JWT_KEY=clerk_jwt_key

# Stripe (billing)
STRIPE_SECRET_KEY=sk_test_XXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXX

# AI provider keys (OpenAI, Stability, etc.)
OPENAI_API_KEY=sk-XXXX
STABILITY_KEY=stability_key_if_any

# App
PORT=8080
NODE_ENV=development
JWT_SECRET=some_jwt_secret  # if your app uses JWTs in addition to Clerk

# Optional storage (S3 / DigitalOcean / Supabase Storage)
STORAGE_BUCKET_NAME=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=

```

---

## Local development (recommended)

### Backend

1. `cd backend`
2. `npm install`
3. Create `.env` file with the variables above
4. `npm run dev` or `node server.js` (use `nodemon` in dev if configured)

### Frontend

1. `cd frontend`
2. `npm install`
3. Create `.env.local` (or appropriate) with `CLERK_FRONTEND_API` and any public keys
4. `npm run dev` (Vite/CRA command depending on setup)

Open `http://localhost:3000` (or the port shown by the frontend dev server).

---

## Deployment notes

* **Frontend**: Deploy to Vercel (recommended). Add frontend environment variables (`CLERK_FRONTEND_API`, any public AI keys) in the Vercel project settings.
* **Backend**: You can deploy the backend to Vercel (serverless functions) or to a Node host (Render, Railway, Heroku). If using Vercel serverless functions, ensure `vercel.json` is configured and adapt `server.js` to export handlers for serverless if necessary.
* **Database**: Use Neon for Postgres. Configure `DATABASE_URL` in the deployment platform.
* **Clerk**: Add configured redirect URLs and allowed origins in Clerk dashboard for your deployed domains.
* **Stripe**: Set webhook endpoint to the deployed `/api/billing/webhook` URL and paste the webhook secret in env.

---

## Billing / Subscription flow (high level)

1. User chooses a plan in the frontend `Plan` UI.
2. Frontend calls backend `POST /api/billing/subscribe` to create a Stripe Checkout Session or customer + subscription.
3. Backend contacts Stripe using `STRIPE_SECRET_KEY` and returns a session or client secret.
4. Checkout completes; Stripe fires a webhook to `POST /api/billing/webhook` which the backend validates using `STRIPE_WEBHOOK_SECRET` and updates subscription state in the DB.
5. Billing metadata (plan, status, next payment) is stored in Neon alongside the user record.

---

## Clerk login integration

* Use Clerk React SDK in the frontend to wrap the app (e.g. `<ClerkProvider>`), and `SignIn`, `SignUp`, or `UserButton` components where needed.
* Protect routes client-side and server-side by validating Clerk session tokens. The backend should use Clerk SDK or validate JWTs to authorize protected API calls.
* Ensure the Clerk dashboard has your app's allowed callback URLs and CORS origins set for both local and production domains.

---

## Important implementation tips & checklist

* Protect AI endpoints so only authenticated and (if required) subscribed users can call generation endpoints — enforce rate limits and monitor usage to control cost.
* Save generated assets (images/files) to a durable storage (S3-like service or Blob storage). Store only metadata (URL, prompt, owner, createdAt) in Postgres.
* Keep large model calls server-side to avoid exposing API keys in the frontend.
* Use webhooks for Stripe to reliably update subscription and billing status.
* Add logging and monitoring for billing and image-generation errors (Sentry or similar).

---

## Example API swagger-like summary (update with real routes)

```
GET  /api/creations            -> list creations (auth)
GET  /api/creations/:id        -> get a creation
POST /api/creations            -> create new creation (auth)
POST /api/generate             -> request AI-generated result (auth + maybe paid)
POST /api/upload               -> upload asset
POST /api/billing/subscribe    -> create stripe checkout
POST /api/billing/webhook      -> stripe webhooks
GET  /api/user                 -> get user profile and usage (auth)
```

---

## Contributing

* Run the local setup for both frontend and backend (two terminals).
* Follow existing code style; add components to `src/components` and pages to `src/pages`.
* Add API routes to `backend/routes` and corresponding controller logic in `backend/controllers`.
* Open PRs with clear changelogs and testing instructions.

---

## Troubleshooting

* If Clerk shows development keys or errors about allowed origins, check Clerk dashboard and ensure you added production and local origins.
* If image uploads fail, confirm storage credentials and bucket CORS settings.
* If Stripe webhook fails, verify `STRIPE_WEBHOOK_SECRET` and that your webhook endpoint is reachable.

---

Authors

Made by Yoshita, Sadhna, and Vandana.

---

## Final notes

This README provides a comprehensive starting point to understand, run, and deploy VersaAI. Since the repository contains many specific implementation files (controllers, middleware, routes), update the README route names and environment variables to match the exact names and values used in your code. If you want, I can also generate an `ENV.example`, a `Procfile`, or a `vercel.json` template customized to your current `server.js` and frontend build setup.

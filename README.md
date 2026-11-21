# Zass Education

Learning platform for **O & A Level (Cambridge)** students — past papers,
notes, revision courses and a full admin portal.

- **Live site:** deploy on Vercel from this repo (see below — the deploy is
  done from the Vercel dashboard).
- **Stack:** Next.js 16 + TypeScript + Tailwind 4 (App Router).
- **Brand:** "Zass" — Zass Education. Palette: Cyprus `#004643` (primary)
  + Sand Dune `#F0EDE5` (base/panel), white `#FFFFFF` cards, Orange `#F97316`
  (small accent only). Home uses the Design 2 (LearnMix) layout.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home — hero, subjects, popular courses, why Zass, team strip |
| `/subjects` | O & A Level subject catalogue (Cambridge syllabus codes) |
| `/papers` | Past papers library — filter by subject / year / session, download PDFs |
| `/courses` | Revision courses + notes & lessons |
| `/about` | About + Meet the Team |
| `/contact` | Contact details + email form (opens the visitor's email app) |
| `/admin` | Admin portal (see below) |

### Admin portal (`/admin`)

- **First run:** open `/admin` → setup asks for name, email and a 6+ digit
  PIN. The PIN is hashed (SHA-256) and lives **only in that browser** — no
  passwords are invented or stored anywhere else. Sign-in is PIN-only;
  there is no forgot-PIN in v1.
- **Dashboard:** real counts (subjects, papers, notes, courses, total file
  size), recent papers, quick actions.
- **Past Papers:** full CRUD + real PDF upload. Files are stored as blobs in
  IndexedDB; metadata in localStorage. Download works from the public
  `/papers` page in the same browser.
- **Subjects / Notes & Lessons / Courses:** full CRUD from the portal.
- **Settings:** site name, logo text, tagline, hero text/buttons, stats,
  announcement bar, contact + social links, footer text, SEO title /
  description, and the four palette colours. Changes apply immediately
  across the public site.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # typecheck + production build
npm start       # serve the production build
```

## Deploy on Vercel (owner's step)

1. In the Vercel dashboard: **Add New → Project → Import** this repo
   (`Hateem-Hussain-01/zass-education`).
2. Framework preset: **Next.js**. No environment variables are needed in v1.
3. Deploy. Every push to `main` redeploys automatically.

## v1 limits (read this first)

- **Data is browser-local.** Subjects, papers, notes, courses and settings
  live in the visitor's own browser (`localStorage` for JSON, `IndexedDB`
  for uploaded file bytes). There is **no backend and no sync** — content
  added in one browser does not appear on another device. A shared backend
  (Supabase) is the planned next step.
- **Admin is per-browser too.** The admin setup/PIN exists only in the
  browser where it was created. Another device needs its own setup.
- **No accounts, no payments, no email sending.** The contact form opens
  the visitor's own email app (`mailto:`).
- **Sample content is labelled.** Seed papers/notes/courses carry a
  "Sample" badge — replace them with real content from the admin portal.
- **Stats are editable placeholders.** The hero "4.8 ★ / 60k+" numbers come
  from Settings — update them to real numbers when available.
- **Team:** Zaeem Noor, Shahbaz Hussain, Alliya Shahbaz, Sufyan Munawar —
  names only, no invented roles or quotes.

## Photos

Hero, subject and course photos are real stock photos (Unsplash, free
license) stored locally under `public/images/` — the site does not hotlink
any external image host.

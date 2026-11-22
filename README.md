# Zass Education

Learning platform for **O & A Level (Cambridge)** students - past papers,
notes, revision courses and a full admin portal.

- **Live site:** deploy on Vercel from this repo (see below - the deploy is
  done from the Vercel dashboard).
- **Stack:** Next.js 16 + TypeScript + Tailwind 4 (App Router).
- **Brand:** "Zass" - Zass Education. Palette - exact two colours only:
  Cyprus `#004643` (primary: hero, buttons, headings, links, stars, all
  accents - flat fills, no gradients) + Sand Dune `#F0EDE5` (base/panel),
  white `#FFFFFF` cards.

## Design - Purdue layout

The site follows the ThemeWagon "Purdue" template **layout** (rebuilt in
our own code - the template's source, CSS and images are never copied).
Every public page opens with a flat-Cyprus hero (big bold title, soft
flat circle shapes, an arched student photo with a floating ★ badge),
followed by sections headed with a small uppercase eyebrow line above a
big bold Cyprus title, centred where the template centres them. Cards are
white, `rounded-2xl`, with a Cyprus-tint border, a subtle shadow and a
small lift on hover. Sections alternate white / Sand Dune bands with a
2px Cyprus divider line between them, and major sections fade up on
scroll (`components/Reveal.tsx`).

- **Colours - exactly two:** Cyprus `#004643` + Sand Dune `#F0EDE5`,
  white `#FFFFFF` cards, Cyprus-alpha text. Flat fills only - **no
  gradients, no orange, no other colours**.
- **Logo:** the default lockup is drawn in code
  (`components/Logo.tsx`) - a graduation cap + **ZASS** + **EDUCATION**.
  The admin can upload a replacement logo PNG in Settings → Site Logo
  (PNG only, 500 KB or less, stored as a data URL in that browser only);
  it then shows in the navbar, footer and admin header, and Remove
  brings back the default lockup.
- **Free, no shop:** the site is completely free for students - **no
  shop, cart or prices anywhere**. Public course cards show level +
  subject, never a price.
- **No invented content:** no testimonials, no invented numbers, names
  or quotes. Counts shown are real (papers, subjects, dashboard stats);
  a board with no papers yet is marked "coming soon".

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home - hero, subjects, popular courses, why Zass, team strip |
| `/subjects` | O & A Level subject catalogue (Cambridge syllabus codes) |
| `/papers` | Past papers library - filter by board / subject / year / session, download PDFs |
| `/boards` | Examination boards listing (Cambridge International, AQA GCSE, OxfordAQA, Oxford Education, IB Diploma Programme) |
| `/boards/[slug]` | One page per board - its subjects and papers, real counts only |
| `/courses` | Revision courses + notes & lessons |
| `/about` | About + Meet the Team |
| `/contact` | Contact details + email form (opens the visitor's email app) |
| `/book-session` | Book a 1-to-1 session - form saved browser-locally, listed in admin → Bookings |
| `/admin` | Admin portal (see below) |

Every public page has a proper hero section (flat Cyprus, floating
3D-style shapes, student photo) - home, subjects, papers, courses, about,
contact, boards and each board page. The home hero shows a smiling student
with a backpack (`public/images/1596495578065-6e0763fa1178.jpg`, Unsplash)
that rises from the bottom of its arch frame on load. Inner-page sections
are visually separated: alternating white / Sand Dune bands with a visible
Cyprus divider line between them (see "Design - Purdue layout" above).

## Past papers catalogue

- **Boards covered:** Cambridge International (live), AQA GCSE, OxfordAQA,
  Oxford Education, IB Diploma Programme (coming soon - a board with no
  papers yet shows as "coming soon", never with invented numbers).
- **Phase 1 (Cambridge A Level, 2021-2025) - DONE 22 Nov 2026 (main
  commit below): 1,654 papers** - Mathematics 9709 (433: 210 QP, 210 MS,
  13 thresholds), Physics 9702 (407: 197/197/13), Chemistry 9701 (407:
  197/197/13), Biology 9700 (407: 197/197/13). Sessions: Feb/Mar,
  May/June, Oct/Nov where the archive lists them; missing only Feb/Mar
  2024 and Feb/Mar 2025 for all four subjects (the March series does not
  offer them those years). May/June 2021 papers exist in the archive and
  were verified as genuine - included. Per-year ZIPs (20 total, ~473 MB
  of PDFs) are in `~/workspace/zass-papers/<code>/zips/`; see each
  subject's `SUMMARY.md` for the full per-session table.
- **Source:** public archive papers.xtremepape.rs. Papers are copyright of
  Cambridge University Press & Assessment (and of their respective boards)
  and are linked here for students' revision use.
- **Hosting:** each catalogue paper links directly to its verified archive
  URL. Per-year ZIPs (one ZIP per subject-year) are kept in the workspace
  at `~/workspace/zass-papers/<code>/zips/` - they are NOT committed to
  git. GitHub release-asset upload is not possible with the project's
  stored credential (uploads.github.com is outside the credential's
  allowed hosts), so no release assets are used.
- **Catalogue data:** `lib/papers-catalogue.ts` is generated from the
  download manifests in `~/workspace/zass-papers/<code>/manifest.json`
  (generator: `/tmp/gen_catalogue.py`) - never edit it by hand, and never
  add a paper that was not actually downloaded and verified.

### Admin portal (`/admin`)

- **First run:** open `/admin` → setup asks for name, email and a 6+ digit
  PIN. The PIN is hashed (SHA-256) and lives **only in that browser** - no
  passwords are invented or stored anywhere else. Sign-in is PIN-only;
  there is no forgot-PIN in v1.
- **Dashboard:** real counts (subjects, papers, notes, courses, new
  bookings, total file size), recent papers, quick actions.
- **Bookings:** 1-to-1 session requests from `/book-session` - status
  (New / Contacted / Done) and delete. Stored browser-locally (v1).
- **Past Papers:** full CRUD + real PDF upload. Files are stored as blobs in
  IndexedDB; metadata in localStorage. Download works from the public
  `/papers` page in the same browser.
- **Subjects / Notes & Lessons / Courses:** full CRUD from the portal.
- **Settings:** site name, logo text, **site logo PNG upload** (Settings →
  Site Logo - PNG only, 500 KB or less, browser-local; Remove restores
  the default lockup), tagline, hero text/buttons, stats,
  announcement bar, contact + social links, footer text, SEO title /
  description, and the four palette colours. Changes apply immediately
  across the public site.
- **Header:** every admin tab shows a sticky header with the portal name,
  the signed-in admin, a View Site button and a Sign Out button. Signing
  out returns to the public home page (`/`).
- **The admin portal is NOT linked from the public navbar** - it is
  reachable only via its direct `/admin` URL. The navbar instead has
  Contact Us, Book a 1-to-1 Session and Find Resources buttons.

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
  for uploaded file bytes). There is **no backend and no sync** - content
  added in one browser does not appear on another device. A shared backend
  (Supabase) is the planned next step.
- **Admin is per-browser too.** The admin setup/PIN exists only in the
  browser where it was created. Another device needs its own setup.
- **No accounts, no payments, no email sending.** The contact form opens
  the visitor's own email app (`mailto:`).
- **Sample content is labelled.** Seed papers/notes/courses carry a
  "Sample" badge - replace them with real content from the admin portal.
- **Stats are editable placeholders.** The hero "4.8 ★ / 60k+" numbers come
  from Settings - update them to real numbers when available.
- **Team:** Zaeem Noor, Shahbaz Hussain, Alliya Shahbaz, Sufyan Munawar -
  names only, no invented roles or quotes.

## Photos

Hero, subject and course photos are real stock photos (Unsplash, free
license) stored locally under `public/images/` - the site does not hotlink
any external image host.

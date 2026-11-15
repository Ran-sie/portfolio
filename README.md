# Ransie F. Arboleda — Portfolio

Personal portfolio of **Ransie F. Arboleda**, a 4th-year BSIT student at Quezon City University and Full-Stack Developer Intern.

A fast, single-page site built with Next.js and TypeScript, featuring a theme picker, achievements, an arcade section for my itch.io games, and a working contact form.

## Features

- **Responsive one-page layout** — works on desktop and mobile
- **Theme picker** — 5 accent colors with dark and light modes, saved between visits
- **Arcade section** — showcases my games, plus a hidden mini-game to discover
- **Achievements** — small unlockable badges for exploring the site
- **Contact form** — sends messages through EmailJS, with built-in spam limits
- **Resume viewer** — view in the browser or download as PDF

## Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Email | EmailJS |
| Icons | React Icons |
| Hosting | Vercel |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# then fill in your EmailJS keys

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/          # Page layout, global styles, fonts
├── components/   # UI components (theme picker, arcade, contact form, ...)
└── data/
    └── profile.ts  # All site content: bio, skills, games, projects, links
```

All text on the site lives in `src/data/profile.ts`, so content can be updated without touching the page code.

## Contact

Feel free to reach out through the contact form on the site.

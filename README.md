# K. Rajesh — Personal Portfolio

**Kadali Raghava Satya Sai Rajesh**
CS Engineering Undergraduate · NRI Institute of Technology, AP
📧 kadalijyothi99@gmail.com · 📞 +91 6300512011 · 📍 Vijayawada, AP

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/raghava-satya-sai-rajesh-kadali-1b56792b9/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/Rajesh665-mw)
[![HackerRank](https://img.shields.io/badge/HackerRank-Profile-green?style=flat&logo=hackerrank)](https://www.hackerrank.com/profile/kadalijyothi99)

---

## About

Deep space themed multi-page personal portfolio — heavy glitch effects, animated star field, shooting stars, nebula blobs, and a terminal boot-sequence gate. Built with **pure HTML, CSS, and JavaScript** — zero frameworks, zero build tools.

---

## Architecture

```
portfolio/
├── index.html          ← Main hub (gate + hero + menu grid)
├── shared.css          ← All shared styles, keyframes, nebula, panels
├── shared.js           ← All shared JS: space canvas, cursor, scroll, typed, observer
├── Kadali_Rajesh_CV.pdf ← Add your CV here for the download button
├── README.md
├── .gitignore
├── pages/
│   ├── about.html      ← Full bio, terminal typing animation, traits grid
│   ├── skills.html     ← Skill cards with animated bars
│   ├── projects.html   ← 4 project cards with holographic shimmer
│   ├── experience.html ← Timeline internship cards
│   ├── resume.html     ← Education, certs, GitHub stats widget
│   └── contact.html    ← Radar animation, social cards, contact form
└── backend/
    ├── server.js       ← Express + Nodemailer contact backend
    ├── package.json
    └── .env.example
```

---

## Features

| Feature | Detail |
|---|---|
| 🌌 Star field canvas | 300 twinkling stars + shooting stars every 2s |
| ☄️ Shooting stars | Cyan/purple trails, random direction |
| 🌫️ Nebula blobs | 3 drifting glow clouds behind all content |
| 💥 Full RGB glitch | Name glitches with pink/cyan split layers + scanlines |
| 🖥️ Boot sequence | 6-step terminal boot animation on gate |
| 🎯 Menu hub | 6 cards with sweep border, holographic shimmer, scanlines |
| ⌨️ Typed roles | Cycling typewriter with delete animation |
| 📡 Radar animation | Pulsing radar on contact page |
| 🔵 Floating particles | 20 hero particles float upward on enter |
| 📊 Scroll progress bar | Purple→cyan→green gradient |
| 🖨️ Print styles | Clean resume printing on resume page |
| 📱 Mobile responsive | Hamburger drawer nav on all pages |
| 🔗 Multi-page SPA feel | Fade transition between pages |
| ⭐ GitHub stats | Live stats + streak in resume page |
| 💾 Session memory | Gate only shows once per session |

---

## Quick Start

```bash
# Clone
git clone https://github.com/Rajesh665-mw/portfolio.git
cd portfolio

# Open directly — zero build step
open index.html

# Or serve locally (recommended — avoids CORS on shared files)
npx serve .
# → http://localhost:3000
```

> **Important:** Use a local server (`npx serve .`) rather than opening `index.html` directly in browser, so that `shared.css` and `shared.js` load correctly across pages.

---

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "feat: deep space portfolio"
git remote add origin https://github.com/Rajesh665-mw/portfolio.git
git push -u origin main

# GitHub → Settings → Pages → Source: main / root
# Live at: https://Rajesh665-mw.github.io/portfolio
```

---

## To Activate Contact Form Emails

```bash
cd backend
npm install
cp .env.example .env
# Fill in Gmail credentials
npm run dev
```

Then in `shared.js`, update the `BACKEND_URL` const (near bottom of `initContactForm`).

---

## Customisation

- **CV download** → Add `Kadali_Rajesh_CV.pdf` to the root folder
- **Project GitHub links** → Update `href` values in `pages/projects.html`
- **Boot messages** → Edit `#b0–#b5` lines in `index.html`
- **"Currently exploring"** badge → Edit `.learning-badge` text in `index.html`
- **Stats** → Update `.h-stat-n` values in `index.html`

---

## Tech Stack

**Frontend** — HTML5, CSS3, Vanilla JS, Canvas API
**Fonts** — Orbitron · Share Tech Mono · Exo 2
**Backend** — Node.js, Express, Nodemailer
**Deploy** — GitHub Pages / Vercel / Netlify

---

## License

MIT — free to use with attribution.

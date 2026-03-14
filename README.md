# LinguaFlow — Next.js + TypeScript + Tailwind + Vercel

English language learning PWA with Reading, Writing, Listening, and Speaking modules.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install shadcn/ui (confirm the existing components.json settings when prompted)
npx shadcn-ui@latest init

# 3. Add the components used by LinguaFlow
npx shadcn-ui@latest add badge card progress slider tooltip dialog

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to GitHub + Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "init: LinguaFlow"
git remote add origin https://github.com/YOUR_USERNAME/linguaflow.git
git push -u origin main
```

Then go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**.
Vercel auto-detects Next.js — zero config needed.

---

## Add PWA Icons (required for installable PWA)

Add these three files to `public/icons/`:
- `icon-192.png` (192×192 px)
- `icon-512.png` (512×512 px)
- `icon-180.png` (180×180 px — Apple Touch Icon)

Generate them at [pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator)
or [realfavicongenerator.net](https://realfavicongenerator.net)

---

## Project Structure

```
lf/
├── app/
│   ├── layout.tsx            # Root layout — fonts, header, nav, toaster
│   ├── page.tsx              # Dashboard
│   ├── reading/page.tsx
│   ├── writing/page.tsx
│   ├── listening/page.tsx
│   └── speaking/page.tsx
├── components/
│   ├── layout/               # TopHeader, BottomNav
│   ├── home/                 # DashboardClient
│   └── skills/               # ReadingClient, WritingClient, ListeningClient, SpeakingClient
├── lib/
│   ├── data/                 # passages, prompts, tracks, skills
│   ├── hooks/                # useToast.tsx, useSpeechRecognition, useSpeechSynthesis
│   ├── store/                # Zustand userStore
│   └── utils/                # cn, analysis
├── types/index.ts
├── public/manifest.json
├── next.config.js            # CommonJS — required for next-pwa
├── tailwind.config.ts
└── components.json
```

---

## Bug Fixes Applied vs. Previous Version

| Bug | Fix |
|-----|-----|
| `useToast.ts` had JSX inside a `.ts` file | Renamed to `useToast.tsx` |
| `layout.tsx` imported `Toaster` from wrong path | Fixed to `@/lib/hooks/useToast` |
| `next.config.ts` used `require()` (ESM/CJS mismatch) | Changed to `next.config.js` |

---

## Browser Compatibility

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Speech Recognition (Speaking) | ✅ | ✅ | ❌ | ❌ |
| Speech Synthesis (Listening) | ✅ | ✅ | ✅ | ✅ |
| PWA Install | ✅ | ✅ | ✅ (iOS) | ✅ |

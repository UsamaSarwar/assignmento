# Assignmento → Vite + React + shadcn/ui Migration

## Phase 1: Project Scaffolding
- [x] Move existing files to `legacy/` directory
- [x] Initialize Vite + React + TypeScript project
- [x] Set up shadcn/ui (Tailwind CSS v4 + shadcn init)
- [ ] Install shadcn components
- [x] Install core dependencies (html2canvas, jspdf, react-quill-new, etc.)

## Phase 2: Design System & Theme
- [ ] Configure global styles + shadcn theme tokens
- [ ] Set up theme provider (dark/light mode)
- [ ] Import handwriting fonts + Quill font class mappings

## Phase 3: Component Architecture
- [ ] Create component directory structure
- [ ] Build Navbar component
- [ ] Build ThemeToggle component
- [ ] Build Footer component

## Phase 4: Core Feature Components
- [ ] EditorToolbar component
- [ ] PaperSheet component (with react-quill-new)
- [ ] CustomizationPanel (HandwritingOptions, PageTextOptions, SpacingOptions, MarginLineOptions)
- [ ] OutputSection + OutputImageCard
- [ ] DrawCanvas component (Beta)
- [ ] ConsentBanner + ConsentModal

## Phase 5: Business Logic Hooks
- [ ] useConfig hook (IndexedDB storage)
- [ ] useImageGenerator hook (html2canvas + jsPDF)
- [ ] Port draw utilities

## Phase 6: App Assembly
- [ ] Wire up App.tsx with all components
- [ ] SEO meta tags in index.html
- [ ] Analytics scripts
- [ ] Schema.org JSON-LD

## Phase 7: Deployment & PWA
- [ ] Configure vite.config.ts with PWA plugin
- [ ] GitHub Actions deploy workflow
- [ ] Verify build succeeds
- [ ] Verify TypeScript compiles

## Phase 8: Verification
- [ ] Visual comparison with legacy site
- [ ] Responsive design testing
- [ ] Dark/light mode
- [ ] Generate image + PDF download
- [ ] IndexedDB persistence

---

# Detailed Implementation Plan

Redesign and rebuild the Assignmento text-to-handwriting converter from a vanilla HTML/CSS/JS static site into a modern Vite + React + shadcn/ui application, deployed to GitHub Pages.

## User Review Required

> [!IMPORTANT]
> **This is a full architecture rewrite.** The current project is ~861 lines of HTML, ~1,550 lines of CSS, and ~850 lines of vanilla JS. Every file will be replaced with React equivalents. The old files will be preserved in a `legacy/` directory until migration is verified.

> [!WARNING]
> **Deployment model change.** The current site serves raw `index.html` directly via GitHub Pages. The new app will require a `vite build` step, outputting to `dist/` and deploying that folder. A GitHub Actions workflow will be added to handle this automatically.

> [!CAUTION]
> **Quill Editor replacement.** The current app uses Quill.js (bubble theme) for rich text editing on the handwriting paper. shadcn/ui doesn't include a rich text editor. We will integrate `react-quill-new` (already in `package.json`) to preserve this functionality.

## Open Questions

> [!IMPORTANT]
> **1. Pages to migrate?** The current site has secondary pages: `404.html`, `dmca.html`, `privacypolicy.html`.
> - **Resolution:** We will migrate these to React routes using `react-router-dom` to maintain a single-page application experience.

> [!IMPORTANT]
> **2. Draw (Beta) feature:** The drawing canvas is a complex vanilla JS feature.
> - **Resolution:** We will port it as a React component (`DrawCanvas.tsx`) in Phase 4, utilizing the existing logic in `legacy/js/utils/draw.mjs`.

> [!IMPORTANT]
> **3. AdSense / AMP tags:** The current site has Google AdSense and AMP ad tags.
> - **Resolution:** AMP tags are incompatible with React SPA. We will use standard AdSense snippets and research `react-adsense` or equivalent for clean integration.

---

## Current Architecture

| Layer | Current | New |
|-------|---------|-----|
| **Structure** | Single `index.html` (861 lines) | React components + React Router |
| **Styling** | Bootstrap 5 CDN + 3 custom CSS files (~1,550 lines) | Tailwind CSS v4 + shadcn/ui + custom CSS |
| **JS Framework** | Vanilla JS (ES Modules) + jQuery | React 19 + Vite |
| **Rich Text** | Quill.js (bubble theme, CDN) | react-quill-new |
| **Image Gen** | html2canvas (vendored) | html2canvas (npm) |
| **PDF Export** | jsPDF (CDN) | jsPDF (npm) |
| **Storage** | IndexedDB (custom wrapper) | IndexedDB (same wrapper, as React hook) |
| **PWA** | Manual service worker | vite-plugin-pwa |
| **Deployment** | GitHub Pages (raw files) | GitHub Pages (Vite build → `dist/`) |
| **Dark Mode** | CSS class toggle + localStorage | shadcn theme system + `next-themes` |

---

## Proposed Changes

### Phase 1: Project Scaffolding

#### [DONE] Vite + React + TypeScript Project

1. Initialize a new Vite + React project.
2. Move all existing project files into a `legacy/` directory.
3. Preserve: `CNAME`, `README.md`, `LICENSE`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `robots.txt`, `sitemap.xml`, `ads.txt`, `manifest.webmanifest`, `.gitignore`.

#### [DONE] shadcn/ui Setup

1. Install Tailwind CSS v4 and configure it for Vite.
2. Run `npx shadcn@latest init` to set up shadcn/ui.

#### [NEW] shadcn Components Installation

Install core shadcn components needed:
- `npx shadcn@latest add button card select input label switch separator tabs dialog sheet badge tooltip dropdown-menu accordion`

---

### Phase 2: Design System & Theme

#### [NEW] `src/index.css` — Global Styles + shadcn theme

- Define CSS custom properties matching shadcn's token system.
- Map current color scheme to shadcn tokens:
  - Light: `--background: #fff`, `--foreground: #333`, `--primary: #1e88e5`
  - Dark: `--background: #121212`, `--foreground: #ccc`, `--primary: #1e88e5`
- Import handwriting fonts via Google Fonts.
- Keep `@font-face` for `Hindi_Font` (copy font file to `public/fonts/`).
- Quill font class mappings (`.ql-font-caveat`, etc.).

#### [NEW] `src/lib/theme-provider.tsx`

- Wrap app in `next-themes` `ThemeProvider`.
- Persist theme to localStorage (matching current `prefers-theme` key).

---

### Phase 3: React Component Architecture

```
src/
├── App.tsx                    # Main app shell + routing
├── main.tsx                   # Entry point
├── index.css                  # Global styles + shadcn theme
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Glassmorphic nav bar (shadcn Sheet for mobile)
│   │   ├── Footer.tsx         # Social links + bottom nav
│   │   └── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── editor/
│   │   ├── EditorToolbar.tsx  # Rich text toolbar (format, colors, fonts)
│   │   ├── PaperSheet.tsx     # The A4 preview sheet with Quill
│   │   └── DrawCanvas.tsx     # Drawing overlay (Beta)
│   ├── customization/
│   │   ├── CustomizationPanel.tsx  # All customization controls
│   │   ├── HandwritingOptions.tsx  # Font selection + upload
│   │   ├── PageTextOptions.tsx     # Font size, ink color, page size, effects, resolution
│   │   ├── SpacingOptions.tsx      # Vertical position, word/letter spacing
│   │   └── MarginLineOptions.tsx   # Paper margin, lines, background image
│   ├── output/
│   │   ├── OutputSection.tsx       # Generated images display
│   │   └── OutputImageCard.tsx     # Individual image with download/move/delete
│   ├── sections/
│   │   ├── HeroQuote.tsx           # Founder quote section
│   │   ├── HandwritingsGuide.tsx   # How to create your handwriting
│   │   ├── FeaturesSection.tsx     # Features grid
│   │   └── SponsorshipSection.tsx  # Sponsor CTA
│   └── consent/
│       ├── ConsentBanner.tsx       # Cookie consent banner
│       └── ConsentModal.tsx        # Cookie preferences modal
├── hooks/
│   ├── useConfig.ts           # IndexedDB read/write hook
│   ├── useImageGenerator.ts   # html2canvas generation logic
│   └── useTheme.ts            # Theme persistence hook
├── lib/
│   ├── storage.ts             # IndexedDB utility (port of storage.mjs)
│   ├── generate-utils.ts      # Paper style application logic
│   ├── helpers.ts             # Font loading, PDF creation, paste formatting
│   ├── draw.ts                # Canvas drawing utilities
│   └── utils.ts               # shadcn cn() utility
└── types/
    └── index.ts               # Shared TypeScript types
```

---

### Phase 4: Component Implementation Details

#### [NEW] `src/components/layout/Navbar.tsx`
- Glassmorphic floating navbar using shadcn's `Sheet` for mobile menu.
- Preserves current pill-shaped, blur-backed design.

#### [NEW] `src/components/editor/EditorToolbar.tsx`
- shadcn `Button`, `Select`, `Separator` for toolbar layout.
- Color preset buttons using shadcn `ToggleGroup`.

#### [NEW] `src/components/editor/PaperSheet.tsx`
- A4-ratio container with margin lines and ruled lines.
- Integrates `react-quill-new` with bubble theme.

#### [NEW] `src/components/customization/CustomizationPanel.tsx`
- Uses shadcn `Card` with `Accordion` groups for customization options.
- Central `Generate Image` button using shadcn `Button`.

#### [NEW] `src/components/output/OutputSection.tsx`
- Horizontal scrollable gallery of generated images using shadcn `Card`.

---

### Phase 5: Business Logic Hooks

#### [NEW] `src/hooks/useConfig.ts`
Port the IndexedDB storage wrapper as a React hook:
- Reads from IndexedDB on mount.
- Writes back on state change.
- Backward compatible with existing `assignmento-db` database.

#### [NEW] `src/hooks/useImageGenerator.ts`
Port `generate-images.mjs` logic into a hook:
- Manages `outputImages` state.
- `generateImages()` — applies paper styles, splits pages, runs html2canvas.
- `downloadAsPDF()` — creates PDF via jsPDF.

#### [NEW] `src/lib/draw.ts`
Port drawing utilities from `legacy/js/utils/draw.mjs` to work with React refs.

---

### Phase 6: App Assembly & SEO

#### [NEW] `src/App.tsx`
- Wire up all components.
- Setup `react-router-dom` for secondary pages (Privacy Policy, DMCA, etc.).

#### [NEW] `index.html` (Vite entry point)
- Preserve all existing `<meta>` SEO tags.
- Open Graph and Twitter Card meta tags.
- Google Analytics / GTM scripts.
- Schema.org JSON-LD structured data.

#### [NEW] `src/components/consent/ConsentBanner.tsx`
- Full port of current cookie consent management.

---

### Phase 7: Deployment & PWA

#### [NEW] `vite.config.ts`
- Configure `vite-plugin-pwa` with current manifest.
- Set up build options and aliases.

#### [NEW] `.github/workflows/deploy.yml`
- GitHub Actions workflow to build and deploy to `gh-pages`.

---

### Phase 8: Verification

#### [NEW] Verification Plan
- **Automated Tests:** `npm run build`, `npx tsc --noEmit`.
- **Manual Verification:** Visual comparison, responsive design, PWA functionality, IndexedDB persistence.

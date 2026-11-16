# Design system — Quiet Luxury (dual theme)

Source of truth for StockFlow UI. Direction: a shop's stock ledger, not a SaaS marketing site.
Themes: Light "Quiet Luxury Alabaster", Dark "Nocturne Luxury" (branch `feature/quiet-luxury-ui`, supersedes The Counting House palette).
Full rationale: `docs/superpowers/specs/2026-11-13-stockflow-ui-overhaul-design.md` (structure/kit laws still apply).

## Laws
- Alabaster cream / nocturne navy surfaces; navy ink; rosewood is the single interactive accent (primary buttons, active nav pill, tab underline, focus ring).
- Color is semantic: ok sage-teal, low amber (also draft + ordered), out crimson (also cancelled), info periwinkle. Defined once in `ui/Badge.jsx` tones.
- Gradients only in data viz: navy→rosewood SVG linearGradients for chart fills and the `.bar-gradient` progress bars. No glow, glass, dot grids.
- No AI-default fonts (Inter/Roboto/Geist/Space Grotesk/Plus Jakarta/DM Sans/Manrope/Outfit/Fraunces).
- Tabular numerals on every number; mono only for SKU/invoice/order numbers and ledger quantities.
- Sentence case; uppercase only on the RECEIVED stamp and data identifiers.
- Every number from the API; zero is valid (`??`, never `||`); designed empty/error/no-permission states.
- Kit components only; no bespoke page CSS.
- Contrast: small text uses `--ink-soft` (#5C544E light); `--ink-faint` (#857B74 light) only large/decorative. Field borders `--field-border` ≥3:1 (#857B74 light / #66728F dark). Focus ring rosewood light / blush dark. Respect prefers-reduced-motion.

## Tokens (client/src/index.css)
Light: paper `#f5efe6`, surface `#faf7f2`, ink `#1c263b`, ink-soft `#5c544e`, ink-faint `#857b74`, line `#e3dbd0`, on-ink `#faf7f2`.
Dark: paper `#11151e`, surface `#181e2b`, ink `#f5efe6`, ink-soft `#b5aea6`, ink-faint `#8d8680`, line `#293245`, on-ink `#121620`.
Status light/dark: ok `#1e4d40`/`#9ee0ce`, low `#8a5319`/`#f5c98e`, out `#8c3241`/`#f2acb8`, info `#44598c`/`#8da3cc` (each with a `-soft` tint).
Accent/focus: `#945661` light (hover `#7e4650`), `#c98a95` dark (hover `#d69ba5`); on-accent `#faf7f2`/`#121620`.
Sidebar: `#1c263b` light / `#0d1118` dark with hover/text/soft/line variants; the rail overrides kit tokens locally via CSS custom properties on `<aside>`.
Charts: `--chart-navy` `#1c263b`/`#8da3cc`, `--chart-rose` `#945661`/`#c98a95`; `--scrim`, `--shadow-float`, `--field-border`.
Utilities: `bg-paper bg-surface text-ink text-ink-soft border-line text-ok bg-low-soft bg-accent border-field-border …` plus `.bar-gradient` (90deg navy→rose).
Radius: sm 8 (buttons/inputs), md 10 (cards/tables), lg 14 (overlays), full (badges/nav pill).
Motion: `--dur-1/2/3` = 120/200/320ms, `--ease`, `--ease-spring` (stamp only). `.rise` entrance, `.num`, `.mono`, `.skeleton`.
Dark mode: `.dark` class on `<html>` + `@custom-variant dark`; `@theme inline` maps tokens. Pre-paint inline script in `client/index.html` applies the stored theme before first paint; `PreferencesContext` also syncs `meta[name=theme-color]`.
Chart colors come from `client/src/hooks/useChartTheme.js` (reads PreferencesContext): navy/rose, grid/tick/cursor/tooltip, and `series` tints mixed toward surface for donut slices.

## Type
IBM Plex Sans (400/500/600/700) UI; IBM Plex Mono (400/500) identifiers. Self-hosted woff2 in `public/fonts/`.
Scale: meta 12, table 13, body 14, lead 16, h3 18, h2 22, h1 28, display 36.

## Kit (client/src/components/ui/)
Button, IconButton, Badge, Card, StatCard (no default delta), DataTable (sortable, skeleton, mono/num cols),
Modal, Drawer, ConfirmDialog, FormField, Input, Select, Textarea, NumberStepper, EmptyState, Skeleton,
Tabs, SearchInput (+useDebounced), Pagination, CopyButton, Kbd, Stamp, PageHeader.
Shared `components/{Badge,DataTable,Modal,FormField,PageHeader}` re-export the kit (legacy tone names aliased).
Living documentation: `/ui-kit` (DEV only).

## Motion signatures
`animateNumber(el, from, to)` quantity tick (utils/motion.js); `Stamp` RECEIVED (spring, once). Both instant under reduced motion.
Route transitions: React 19 `<ViewTransition>` around the Outlet (P1).

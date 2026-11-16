# Memory — rolling handoff

Updated: 2026-11-16

## State
- Three feature branches off `main` (a096a2b), each committed, NONE pushed:
  - `feature/invoice-customer-details` (70dc58e): optional `customer {name,phone,email,address}` on Sale + validators, serializers derive `customerName`, POS collapsible details + inline validation, invoice "Billed to" block, CSV columns, seed ~61% fake customers, +1 server test (17 total on that branch).
  - `feature/po-view-button` (353b0cc): ghost Eye IconButton first in PO row actions, opens existing drawer, `?order=<id>` deep link, all statuses, 36×36 + aria-label + focus ring.
  - `feature/quiet-luxury-ui` (current): dual theme Light "Quiet Luxury Alabaster" / Dark "Nocturne Luxury"; tokens in `client/src/index.css`, pre-paint script in `client/index.html`, `hooks/useChartTheme.js` for Recharts gradients/tints, navy sidebar via local CSS-var overrides, rosewood accent, semantic badges (draft/ordered → low). Visual only.
- `project-context/design.md` rewritten for Quiet Luxury (was The Counting House). Per-part entries in `docs/enhance-ui/EXECUTION-LOG.md` (each on its own branch).
- Kit/layout/fonts/spacing unchanged from the Counting House overhaul; all 12 pages + shell still kit-based.

## Verification done
- Local fake-data env: temp mongod replica set on 27018 (dbpath in Temp/stockflow-test-db), `stockflow_test` for tests, `stockflow_demo` seeded for browser; API on 5001, vite on 5174 (5000/5173 occupied by user processes — left alone). No .env read.
- A1: 17/17 server tests; browser sale with details + walk-in + CSV blob inspection + inline validation.
- A2: 16/16; browser eye on all 5 statuses, Space activation, deep link, stopPropagation.
- B: 16/16 server tests; eslint 0; vite build ok; both-themes browser sweep of every page + palette/bell/modals/drawers/Login/Landing/404; toasts both directions; pre-paint dark on reload; console clean.

## Decisions
- Commit identity: Rajdeepkun <mithumondal6647@gmail.com> (per-commit `-c`, not local config). Push only when the user asks.
- B choices: stock-health bar = single navy→rose gradient at in-stock% with ok/low/out legend kept; expense category bars keep per-category hook tints (legend mapping); info-light #44598c (spec undefined); no print view exists.
- `server/src/services/stockService.js` untouched in all three parts (hard rule).

## Blockers / gaps
- Browser tool `press_key Enter` does not synthesize a native click (CDP artifact); Space verified instead — app keyboard semantics fine.
- Pre-existing race: theme toggle during post-login preference hydration can be overwritten by account sync (not introduced by B; left as-is).
- DevTools reduced-motion/offline/coarse-pointer emulation still NOT-RUN; sweep done at ~441px mobile viewport (desktop rail collapse verified earlier on redesign-v3).
- Temp mongod/API/vite background processes may still be running; test DB is disposable.

## Next step
Await user review of the three branches. Push/merge only on instruction. If merging: A1 and A2 touch disjoint files; B touches Sales/PO pages too — merge A1/A2 first, then re-apply B's chart/tone edits on the merged Sales/PO (B branch currently holds main's versions of those pages).
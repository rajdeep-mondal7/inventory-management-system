# Memory — rolling handoff

Updated: 2026-11-17

## State
- Working checkout is now the USER'S Desktop repo `C:/Users/Training/Desktop/rajdeep/inventory-management-system` (the Qoder-workspace copy at Documents/Qoder/2026-11-16/fb785038 is stale history).
- PR #16 (`integration/all-parts`, merge e031e47) was merged into `main` by the user; it carried A1 customer details + A2 PO eye + B Quiet Luxury theme.
- Desktop repo had the pasted PR#16 content uncommitted; preserved as branch `backup/desktop-paste`, then `main` fast-forwarded to e031e47.
- Current branch `fix/nav-dashboard-print-role` (pushed): 5 commits — 3322d58 Part 0/1 diagnosis (no code loss; nav complete for all roles), cd292a1 Part 2 dashboard graph (server `groupBy=week`, tooltip/KPI/format fixes), 352488a Part 3 print bill (BUSINESS_PROFILE, PrintBill portal, print.css, 3 button placements), a180d47 Part 4 topbar name+role pill, 73016b8 Part 5 recheck log. PR into main pending (gh device-flow login awaiting user approval; fallback compare link ready).
- Part 0 verdict: `git restore index.css` on clean tree = no-op, NOT the cause of "missing Sales"; stale browser/dev-server state was. `?action=in` needs `?product=` by design.
- Report-only known issues: Landing Sign Up → /login; no audit screen; Product.image/rating unused; pre-existing prefs-hydration toggle race.

## Verification done
- Server 18/18 (replica-set mongod 27018, throwaway stockflow_test); eslint 0; vite build ok.
- Headless Chrome CDP sweeps: all pages × admin/manager/staff, 0 console errors/exceptions/4xx; guards redirect; deep links open overlays; topbar at 1280/390px per role; print-media PDFs+PNGs black-on-white both themes.
- Browser flows: sale INV-2026-0276 with customer (stock 60→59, toast Print button), threshold sale → bell 8→9, CSV columns, PO-2026-0006 draft→place→receive (stock 5→9, eye drawer).
- Demo env: mongod 27018 (Temp/stockflow-test-db), API 5001, vite 5174 from Desktop folder; demo users recreated once (old seed passwords 401) then business data re-seeded; test sales/PO left as demo activity.
- Helper scripts in Temp: print-check.mjs, topbar-check.mjs, sweep-check.mjs (CDP port 9333 headless Chrome, profile Temp/print-check-profile).

## Decisions
- Commit identity Rajdeepkun <mithumondal6647@gmail.com> per-commit; never push main; no reset/clean/revert/restore used.
- gh installed via winget; credential extraction blocked by policy → device-flow login (user approves) or spec fallback compare link.
- KPI consistency = no sparklines (spec all-or-none); weekly bucketing server-side; 80mm receipt skipped.

## Blockers / gaps
- gh device-flow code 2A68-3F55 EXPIRED unapproved (2026-11-17); gh still logged out. Fallback delivered: compare link + paste-ready title/body at `C:/Users/Training/Desktop/rajdeep/PR_DESCRIPTION.md`. On user "retry login": new `gh auth login --web` code, then `gh pr create --base main --head fix/nav-dashboard-print-role` (body in that file), do NOT merge.
- Screenshots verified locally, not committed (PR checklist item left unchecked).

## Next step
After user approves gh login: `gh pr create --base main --head fix/nav-dashboard-print-role` with template body (see PR draft in conversation), do NOT merge. Then await review.
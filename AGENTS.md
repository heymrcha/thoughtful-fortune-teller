# Project rules

- Keep the app a client-only prototype until backend work is explicitly authorized; sample readings must not imply a connected interpretation engine.
- Keep shared input/count validation in `src/lib/prototype-rules.ts` with Vitest regression tests (`npm test`); both daily recommendation views must use the same data source to avoid drift.
- Keep feature transitions keyed by tab and subpage in the main shell; identical component types must not carry reading state into another service.
- Browser-only photo previews must use revocable object URLs and effect-owned timers; leaving a feature must release its resources.
- Use global CSS semantic tokens and the existing UI Button for changed controls; preserve the current product design instead of redesigning during maintenance.
- Record product history and honest implementation limits in README, and review findings with verification evidence in `docs/CODE_REVIEW.md`; do not treat sample backend buttons as implemented services.
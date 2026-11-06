# iTab-Home project guide

## Project shape

- React 19, Vite 8, TypeScript, and Tailwind CSS 4.
- Package manager: `pnpm`. Use the checked-in `pnpm-lock.yaml`.
- Browser settings are persisted in `localStorage`.
- Authenticated private defaults are served by `api/config.ts` from
  `src/config/shortcuts.yaml`.
- The project has an authenticated TinyAuth session layer. Never inspect,
  print, or commit values from `.env.local` or other secret-bearing files.

## Common commands

```bash
pnpm run dev
pnpm run build
pnpm run lint
pnpm run preview
```

Run `pnpm run build` and `pnpm run lint` before deployment. The repository
currently has existing `react(set-state-in-effect)` lint warnings; do not add
new warnings or unrelated lint fixes in a feature change.

## Configuration and persistence

`src/config/shortcuts.yaml` is the source of truth for new or reset clients.
The authenticated `/api/config` endpoint returns it only when the browser has
no local settings snapshot.

Existing clients keep their layout in:

```text
localStorage["itab_home_settings_v11"]
```

When adding a required shortcut or changing its schema:

- Add it to `src/config/shortcuts.yaml`.
- Add an idempotent, one-time migration in `src/utils/storage.ts` so existing
  clients receive the change without losing user customizations.
- Persist the migrated settings and a migration marker in the same operation.
  Do not set the marker without saving the updated settings.
- Do not bump or rename the storage key merely to ship a new default; that
  would discard existing layouts.

Shortcut URLs support both HTTP(S) and registered application protocols.
HTTP(S) shortcuts open in a new tab. Custom protocols such as `dingtalk://`
must navigate the current tab so Chrome forwards the complete URL through the
registered application handler.

## Deployment

The repository is linked to the Vercel project `itab-home`.

```bash
git push origin main
```

Pushing to `main` triggers the production deployment automatically. After
pushing:

1. Confirm the production HTML references the newly built asset.
2. Hard-reload `https://itab-home.vercel.app/` when the service worker may
   still serve an older bundle.
3. Verify behavior that depends on browser state, custom protocols, or login
   in the actual UI rather than relying only on a successful build.

Use Conventional Commits for code changes.

## Working tree hygiene

- Preserve unrelated dirty, staged, and untracked files.
- Do not reset, clean, stash, or rewrite history to simplify a task.
- Keep deployment changes scoped. Separate unrelated prod deployments into
  their own commits and explicitly call out operational side effects.

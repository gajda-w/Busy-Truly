<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project map

This is a static author website using the Next.js App Router, React and TypeScript.
Keep the architecture proportionate to this scope.

- `src/app/`: route composition, root metadata, local fonts and global CSS.
- `src/content/books.ts`: typed book content, artwork, appearance and optional links.
- `src/config/site.ts`: shared author identity and external links.
- `src/components/home/`: server-rendered homepage sections and book cards.
- `src/components/layout/`: site header and footer.
- `src/components/ui/`: existing shared visual elements and styles.
- `src/components/interactive-book/`: client-side preview, 3D geometry and motion.
- `tests/`: browser behavior, accessibility and visual regression tests.
- `reference/`: historical Framer exports and migration measurements, not current test baselines.

## Working agreements

- Use Node.js 24 (`nvm use`) and npm. Install with `npm ci`; commit only `package-lock.json`.
- Pin direct dependencies. Keep `eslint-config-next` aligned with Next.js and Node types aligned
  with the runtime. Check tool compatibility before upgrading TypeScript.
- Keep components server-rendered by default. Add `"use client"` only at the interactive boundary;
  keep static artwork passed through `children` where appropriate.
- Book identity and appearance come from explicit data, never array position. Missing purchase or
  playlist URLs mean an unavailable action; do not invent URLs or publish placeholder destinations.
- Keep component styles in colocated CSS Modules. Global CSS contains theme variables, reset and
  base typography. Keep layout and responsive rules with the component that owns them.
- Reuse existing theme values. Leave geometry-specific measurements local and explain non-obvious
  crop or animation calculations. Do not turn every number into a global design token.
- Use semantic HTML, a logical heading hierarchy and native controls. Preserve accessible names,
  keyboard behavior, focus restoration, touch scrolling and reduced-motion support.
- Effects must clean up listeners, animation frames, Web Animations and temporary body styles.
  Keep animation state named and account for interrupted opening/closing and preference changes.
- Prefer named exports for components; use default exports where Next.js conventions require them.
  Use `import type` for types and `@/` for cross-directory application imports.
- Extract components or hooks around a concrete responsibility. Keep helpers local until they have
  an actual shared use. Avoid barrel exports and new dependencies for trivial utilities.
- Preserve visible copy, layout and behavior during refactors. Make intentional product/design
  changes separately. Do not update screenshot baselines merely to make a failing test pass.
- Preserve the generated Next.js block above. Do not edit generated `next-env.d.ts` or `.next/`.
- Do not edit the original Framer project. Its exports document the migration; the application and
  reviewed browser snapshots define current behavior.

## Verification

- `npm run check`: ESLint, Prettier and generated Next.js types + TypeScript.
- `npm run test:e2e`: browser checks against a fresh production build, including visual comparisons.
- `npm run build`: standalone production build when browser checks are not needed for the change.
- Use Playwright's browser installer after a fresh setup; see `tests/README.md` for commands,
  snapshot platform requirements and reviewing intentional visual changes.
- Add or update behavior tests for meaningful interaction changes. Do not add tests that only
  repeat component markup, CSS declarations or implementation details.
- Report the checks actually run and any remaining limitations. Keep commits focused and never
  include generated reports, browser traces or unrelated changes.

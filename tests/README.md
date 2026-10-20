# Browser checks

The Playwright suite builds Next.js and starts a dedicated production server on
`http://127.0.0.1:3100`. It does not connect to a running development server.

```sh
npm ci
npx playwright install chromium firefox webkit
npm run test:e2e
```

Behavior tests run on desktop Chromium and Firefox, plus mobile Chromium and
WebKit. Tests cover both book previews with pointer, keyboard and mobile touch input,
focus restoration, page scroll locking, modal dismissal and interrupted animation.
They also check navigation, horizontal overflow at 390, 768 and 1200 pixels, and
automated WCAG A/AA accessibility rules on the page and inside a preview.
Automated accessibility checks complement manual keyboard and screen-reader review.
The WebKit skip-link check uses Option+Tab because Safari's default keyboard
traversal excludes links from plain Tab. Modal tests allow focus to move to browser
chrome while checking that background controls remain inert.

## Visual baselines

`visual.spec.ts-snapshots/` contains the original pre-refactor page and both cover
previews at 1200×900 desktop and 390×844 mobile viewports. Screenshots use reduced
motion, wait for local fonts and images, and retain Playwright's platform suffix.
The current baselines were captured on macOS with the browser pinned by the
lockfile. CI compares them on macOS; Linux runs the behavior suite separately.

```sh
# Behavior and accessibility checks on any supported platform
npm run test:e2e -- --ignore-snapshots

# Compare the committed macOS screenshots
npm run test:e2e -- tests/visual.spec.ts

# After an intentional visual change, generate proposed replacements on macOS
npm run test:e2e -- tests/visual.spec.ts --update-snapshots
```

Inspect every changed screenshot and compare it with the previous version before
committing replacements. A failing screenshot is evidence to investigate, not a
reason to update snapshots automatically. Keep historical Framer reference files
separate from these current application baselines.

Each run also writes an HTML report to `playwright-report/`. Open the latest report
with `npm run test:e2e:report` to inspect results and visual differences.
On failure, Playwright writes screenshots and traces to `test-results/`. Open a
trace with `npx playwright show-trace path/to/trace.zip`. Both report directories
are ignored by Git and uploaded by CI when a job fails.

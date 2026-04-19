# cnarios

Playwright end-to-end tests for [cnarios.com](https://www.cnarios.com). The default `baseURL` is set in `playwright.config.ts`.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) (this repo pins `pnpm@10.26.2` in `package.json`)

## Setup

```bash
pnpm install
pnpm exec playwright install
```

On Linux CI you may need system deps: `pnpm exec playwright install --with-deps`.

## Run the project

The “project” here is the test suite. From the repository root:

| Command | Description |
|--------|-------------|
| `pnpm test` | Run all Playwright tests |
| `pnpm test:ui` | Open the Playwright UI runner |
| `pnpm test:bp` | Run `tests/button-page.spec.ts` only |
| `pnpm codegen` | Launch Playwright codegen against the configured `baseURL` |

Tests use the `baseURL` in `playwright.config.ts` (currently `https://www.cnarios.com`). Point it at another environment by editing that setting or by using a separate Playwright config if you need multiple targets.

## Page Object Model (POM)

Page objects live in **`pages/`** (for example `pages/ButtonPage.ts`). Add new POM classes alongside existing ones in that folder.

## Tests

Spec files live in **`tests/`** (for example `tests/button-page.spec.ts`). Playwright is configured with `testDir: './tests'` in `playwright.config.ts`.

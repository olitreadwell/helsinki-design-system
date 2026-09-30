# City-of-Helsinki/helsinki-design-system context
> refreshed 2026-09-30 | upstream default: development @ a9fb54575 | fork default: development @ a9fb54575 (fork == upstream)

## Identity & policies
- upstream: City-of-Helsinki/helsinki-design-system. Default branch `development` (both upstream and the fork). Primary languages: TypeScript / SCSS / MDX. English-first: yes (README, CONTRIBUTING, docs site, issues and PRs are all English).
- CLA/DCO: none. CONTRIBUTING.md asks only for a fork + a PR against `development`. No CLA bot, no sign-off/DCO requirement.
- AI-assisted PR policy: unstated (no mention in CONTRIBUTING.md, README.md, DEVELOPMENT.md or `.github/`).
- signed commits required: no evidence (branch-protection API returns 404; no signature-verification workflow in `.github/workflows`).
- PR template: `.github/pull_request_template.md` — fill it verbatim. Sections: Description / Related Issue / How Has This Been Tested? / Demos / Screenshots / Add to changelog / (previous major version).
- external tracker: Jira — `helsinkisolutionoffice.atlassian.net` (tickets `HDS-xxxx`, sometimes `RATY-xxxx`). Cite the ticket URL in the PR body; no GitHub auto-link exists.
- changelog: `CHANGELOG.md` is release-managed (`scripts/changelog`, `pnpm update-changelog`). Doc/link PRs have added a line (Riippi #1695), but the template explicitly allows explaining why a changelog line is not relevant.

## Conventions (verified from merged PRs)
- branch naming (merged `headRefName`): `fix/HDS-XXXX-kebab`, `HDS-XXXX-kebab`, `feature/...`, `release-X.Y.Z`, and plain `type/kebab-desc` (e.g. `fix/toggle-button-disabled-test-coverage`, `fix/docs-*`).
- commits: Conventional Commits — `type: subject` or `type(scope): subject`; `type` must be one of build, chore, ci, deps, docs, feat, fix, perf, refactor, revert, style, test; header ≤ 72 chars (`.commitlintrc.mjs`).
- caveat: `.github/workflows/commitlint.yml` points `configFile` at `./commitlint.config.mjs`, which does not exist (the config is `.commitlintrc.mjs`), so the commitlint job may no-op.
- lint: `cd site && pnpm lint` (eslint + stylelint); CONTRIBUTING also documents `pnpm test:lint` at the root and `pnpm test` in `packages/react`.
- CI that gates merges: `build.yml` (runs on `pull_request`; builds design-tokens/core/react, runs react tests + storybooks), `commitlint.yml`, CodeQL and publish workflows. `e2e-tests.yml` is `workflow_call` only.
- node: `.nvmrc` (node 24); pnpm via `pnpm/action-setup`, install with `pnpm install --frozen-lockfile --ignore-scripts`.
- how outside PRs land: no external-contributor merge in the last 60 merged PRs (mrTuomoK 22, dependabot 21, timwessman 10, Riippi 5, mikkojamG 2). CONTRIBUTING says "all pull requests are welcome", so outsider responsiveness is untested.
- English variant: UK/British English — "customise", "colour", "behaviour", "organisation" (but -ize technical words like "memoized", "memoization"). Never normalise dialect.

## Maintainer picture
- mrTuomoK (most active: merges + releases + most feature work), timwessman, Riippi (docsite fixes), mikkojamG. Response latency to outsiders not measured this run.

## Issue-area health
- cookie-consent docs are being edited by two open maintainer PRs: #1710 (mrTuomoK, rewrites the API-tables region `api.mdx` lines 25-53) and #1711 (mrTuomoK, `api.mdx` lines 125-145 and 212-225). Neither touches lines 160 or 228.
- docsite links are an actively-fixed area (all Riippi, 2026-08): #1694 routes, #1695 storybook links, #1696 anchors, #1698 visited-link styles.
- `card/code.mdx` is claimed by #1682 ("DO NOT MERGE AND/OR REVIEW docs: create a card-link example", mrTuomoK).

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-09-30` self-found trivial cleanup — outcome pr-opened (fork) — typos + 2 dead links + malformed Storybook query strings, 10 files. Lesson: this set is done; do not re-fix these lines.

## Mined gaps (discovered, not yet attempted)
- `2026-09-30` `site/src/docs/components/card/code.mdx` (2×) and `site/src/docs/components/highlight/code.mdx` (2×): `href="/storybook/react/?path=?path=/story/..."` duplicates the `path` query param; the other 142 storybook links use the single `?path=/story/...` form. Skipped this pass (would have pushed the diff past the 10-file cap); card/code.mdx is also claimed by #1682. status: proposed
- `2026-09-30` "pre-selected" (`form-building.mdx` 2×, `select/index.mdx` 1×) vs "preselected" (`CHANGELOG.md`) — both valid English; NOT a typo, never "fix" it. status: dropped(not-a-typo)
- `2026-09-30` `packages/core/src/utils/README.md` documents the `modifierDelimeter`/`elementDelimeter` config keys — the misspelling is in the CODE identifier, so the headings must stay; only the prose was corrected to "delimiter". status: done
- `2026-09-30` `CONTRIBUTING.md` steps 4-5 tell contributors to run `pnpm test` and `pnpm test:lint`; neither script exists at the repo root (root scripts: build*/release/update-versions/clean/prepare/start:*/update-changelog). The real commands are `cd packages/react && pnpm test` and `cd site && pnpm lint`. Left alone this pass: replacing documented commands means choosing the maintainers' intended replacement, which is not a meaning-preserving typo fix. status: proposed

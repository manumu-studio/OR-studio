# Development Playbook — OR Studio v2

**Purpose:** Define the development methodology for this project. Every contributor (human or AI) follows this playbook.

---

## 1. Philosophy

- **Ship small, document why** — atomic packets with clear deliverables
- **AI as team** — Claude Code designs, Cursor builds, Human owns
- **Strict by default** — TypeScript strict, no `any`, no shortcuts
- **Port and improve** — v1 code is reference, not copy-paste
- **CMS-first** — backend collections before frontend pages

---

## 2. Roles

| Role          | Tool         | Responsibility                                                        |
| ------------- | ------------ | --------------------------------------------------------------------- |
| **Architect** | Claude Code  | Designs packets, writes tasks, reviews reports, maintains project map |
| **Builder**   | Cursor       | Executes tasks, writes code, runs quality gates, writes task reports  |
| **Owner**     | Human (Manu) | Approves packets, commits code, pushes to remote, merges PRs          |

---

## 3. Development Workflow

### Feature Cycle (per packet)

```
1. Architect writes build packet     → docs/build-packets/PACKET-NN-slug.md
2. Architect writes cursor tasks     → docs/cursor-tasks/PACKET-NN/TASK-NNN-slug.md
3. Human approves & creates branch   → git checkout -b feat/branch-name
4. Cursor executes tasks             → writes code + task reports
5. Cursor writes packet report       → docs/build-packet-reports/PACKET-NN-report.md
6. Cursor writes journal + PR doc    → docs/journal/ + docs/pull-requests/
7. Human reviews, commits, pushes    → git add, commit, push
8. Human merges to main              → PR or direct merge
```

### Task Cycle (per task within a packet)

```
1. Cursor reads .cursorrules
2. Cursor reads build packet (if first task → Automation A)
3. Cursor reads task file
4. Cursor implements
5. Cursor runs quality gate
6. Cursor writes task report (Automation C)
7. If last task → Automation B (packet report + journal + PR doc)
```

---

## 4. Document Types

### Build Packet (`docs/build-packets/PACKET-NN-slug.md`)

**Written by:** Architect (Claude Code)
**Purpose:** Feature specification with scope, schema design, acceptance criteria, and task breakdown

### Cursor Task (`docs/cursor-tasks/PACKET-NN/TASK-NNN-slug.md`)

**Written by:** Architect (Claude Code)
**Purpose:** Atomic implementation instruction for Cursor — files to create, requirements, acceptance criteria

### Task Report (`docs/cursor-task-reports/PACKET-NN/TASK-NNN-report.md`)

**Written by:** Builder (Cursor)
**Purpose:** Documents what was done, files changed, validation output, deviations

### Build Packet Report (`docs/build-packet-reports/PACKET-NN-report.md`)

**Written by:** Builder (Cursor) — after last task
**Purpose:** Aggregate summary of packet completion

### Journal Entry (`docs/journal/ENTRY-N.md`)

**Written by:** Builder (Cursor) — after last task
**Purpose:** Developer-facing record of what was built, decisions made, learnings

### PR Documentation (`docs/pull-requests/PR-X.Y.Z.md`)

**Written by:** Builder (Cursor) — after last task
**Purpose:** Team-facing PR description ready for GitHub

### Session Prompt (`docs/session-prompts/SESSION-NEXT.md`)

**Written by:** Builder (Cursor) — after commit
**Purpose:** Continuation context for next session

---

## 5. Branch Strategy

```
main                          # Production-ready code
├── feat/project-scaffolding  # Packet 00
├── feat/media-cloudinary     # Packet 01
├── feat/works-collections    # Packet 02
├── feat/cms-globals          # Packet 03
├── feat/data-seed            # Packet 04
├── feat/frontend-foundation  # Packet 05
├── feat/works-page           # Packet 06
├── feat/home-page            # Packet 07
├── feat/contact-about-pages  # Packet 08
├── feat/seo-performance      # Packet 09
├── feat/accessibility        # Packet 10
├── feat/testing              # Packet 11
├── feat/security             # Packet 12
└── feat/deployment           # Packet 13
```

---

## 6. Commit Convention (Conventional Commits)

```
feat(scope): add new feature
fix(scope): fix a bug
refactor(scope): restructure code
docs(scope): documentation changes
chore(scope): maintenance tasks
test(scope): add or update tests
style(scope): formatting, no logic changes
```

**Scopes:** `cms`, `frontend`, `works`, `home`, `contact`, `about`, `nav`, `auth`, `media`, `seed`, `ci`, `seo`, `a11y`, `security`

---

## 7. Quality Gates

### Per-Task (run after every task)

```bash
pnpm typecheck    # tsc --noEmit
pnpm lint         # ESLint
pnpm test         # Vitest
pnpm build        # Next.js build
```

### Pre-commit (Husky + lint-staged)

```bash
pnpm lint && pnpm typecheck && pnpm test
```

### CI (GitHub Actions)

```
typecheck → lint → test → build → smoke test
```

### Definition of Done (per packet)

- [ ] All tasks completed with reports
- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero warnings
- [ ] Tests pass (70% coverage minimum)
- [ ] Build succeeds
- [ ] Build packet report written
- [ ] Journal entry written
- [ ] PR documentation written

---

## 8. Code Review Checklist

- [ ] No `any` types
- [ ] No `@ts-ignore` or `@ts-expect-error`
- [ ] No `console.log` in production code
- [ ] Props defined in `.types.ts` (not inline)
- [ ] Barrel exports in `index.ts`
- [ ] File header comment present
- [ ] ARIA attributes on interactive elements
- [ ] `prefers-reduced-motion` respected on animations
- [ ] Images use Cloudinary loader with proper `sizes`
- [ ] Server Components for data fetching (no client-side CMS queries)

---

## 9. Versioning

Semantic versioning from `0.1.0` to `1.0.0`:

| Version | Packet    | Milestone           |
| ------- | --------- | ------------------- |
| 0.1.0   | PACKET-00 | Project scaffolding |
| 0.2.0   | PACKET-01 | Media + Cloudinary  |
| 0.3.0   | PACKET-02 | Works collections   |
| 0.4.0   | PACKET-03 | CMS globals         |
| 0.5.0   | PACKET-04 | Data seed           |
| 0.6.0   | PACKET-05 | Frontend foundation |
| 0.7.0   | PACKET-06 | Works page          |
| 0.8.0   | PACKET-07 | Home page           |
| 0.9.0   | PACKET-08 | Contact + About     |
| 0.10.0  | PACKET-09 | SEO + Performance   |
| 0.11.0  | PACKET-10 | Accessibility       |
| 0.12.0  | PACKET-11 | Testing             |
| 0.13.0  | PACKET-12 | Security            |
| 1.0.0   | PACKET-13 | Deployment + Launch |

---

## 10. Golden Goose Rule

All **public-facing content** (commits, PRs, journal entries) must NEVER reference:

- Internal doc paths (build-packets, cursor-tasks, etc.)
- AI tools (Claude Code, Cursor)
- Packet/task numbers (PACKET-XX, TASK-NNN)

**Write as if a human developer did the work.**

---

## 11. Session Continuity

When context window reaches ~40%, generate a continuation prompt at:
`docs/session-prompts/SESSION-NEXT.md`

Include: current task state, completed steps, remaining work, key decisions, blockers.

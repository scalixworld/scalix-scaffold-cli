# Scalix Scaffold-System - Architecture Mind Map

## 1. Overview

The Scalix Scaffold-System is an internal project scaffolding tool that generates new Scalix World applications from pre-built templates via a CLI. It is an npm workspaces monorepo containing the CLI, shared packages (design system, component taggers), and template directories. Each template is a fully configured React + Vite + TypeScript + Tailwind CSS application that can be cloned locally or from a remote Git repository.

**Package name:** `@scalix-world/scaffold`
**Version:** 0.1.0
**Binary names:** `scalix-world`, `scalix-scaffold`
**Node.js requirement:** >= 18.0.0
**License:** MIT

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript 5.x |
| CLI Framework | Commander.js |
| User Prompts | Inquirer.js |
| Terminal UX | Chalk (colors), Ora (spinners) |
| File Operations | fs-extra |
| Template Cloning | git clone (child_process) / local fs.copy |
| Build Tool (packages) | tsup |
| Build Tool (templates) | Vite 5.x |
| UI Framework (templates) | React 18, Radix UI, Tailwind CSS 3.x |
| Testing (templates) | Vitest |
| Charts (templates) | Recharts |
| State Management (some templates) | Zustand |
| Routing (some templates) | React Router DOM 6.x |
| Icons | Lucide React |

---

## 3. Repository Structure

```
Scaffold-System/
|-- package.json              # Root workspaces config
|-- package-lock.json
|-- README.md
|
|-- cli/                      # CLI application
|   |-- src/
|       |-- index.ts          # Entry point (Commander program)
|       |-- commands/
|       |   |-- create.ts     # "create <name>" command
|       |   |-- init.ts       # "init <template>" command
|       |   |-- list.ts       # "list" / "ls" command
|       |   |-- validate.ts   # "validate" command
|       |-- utils/
|           |-- config.ts     # Template registry & loading
|           |-- template.ts   # Clone/copy & variable replacement
|           |-- validation.ts # Template validation engine
|           |-- dependencies.ts # System requirement checks
|           |-- progress.ts   # Spinner/step progress UI
|
|-- packages/                 # Shared npm packages
|   |-- design-system/        # @scalix-world/design-system
|   |-- react-vite-component-tagger/    # @scalix-world/react-vite-component-tagger
|   |-- nextjs-webpack-component-tagger/ # @scalix-world/nextjs-webpack-component-tagger
|
|-- templates/                # Project templates (local)
|   |-- react/                # Base React starter
|   |-- admin-dashboard/      # Enterprise admin dashboard
|   |-- crm/                  # Customer relationship management
|   |-- ecommerce/            # E-commerce platform
|   |-- analytics-dashboard/  # Analytics & BI dashboard
|
|-- docs/                     # Documentation
|   |-- README.md
|   |-- setup-guide.md
|   |-- creating-templates.md
|   |-- dev-tools.md
|
|-- final-test-app/           # Generated test output (admin-dashboard clone)
|-- test-debug-app/           # Generated test output (admin-dashboard clone)
```

---

## 4. CLI Commands & Handlers

### 4.1 `scalix-world create <name>` (cli/src/commands/create.ts)
- **Options:** `--template <id>` (default: admin-dashboard), `--directory <dir>`, `--yes`
- **Flow:**
  1. Prompt for target directory (or use `--yes` defaults)
  2. Run pre-flight checks (Node >= 18, npm, Git, disk space, directory writable)
  3. Validate inputs (non-empty name)
  4. Check if target directory exists (prompt overwrite or skip)
  5. Get template config from registry (`getTemplateConfig`)
  6. Validate template config (`validateTemplateForUse`)
  7. Clone/copy template to target (`cloneTemplate`)
  8. Replace template variables (`{{project-name}}`, `{{PROJECT_NAME}}`, `{{ProjectName}}`)
  9. Display success and next steps

### 4.2 `scalix-world init <template>` (cli/src/commands/init.ts)
- Initializes a template in the current working directory
- Requires directory to be empty (ignores `.git`, `.gitignore`, `README.md`, `.DS_Store`)
- Calls `cloneTemplate` without a name option (no variable replacement)

### 4.3 `scalix-world list` (cli/src/commands/list.ts)
- Alias: `ls`
- Calls `getAvailableTemplates()` which merges DEFAULT_TEMPLATES (hardcoded) with local templates discovered from `templates/*/package.json`
- Displays: id, name, description, tags

### 4.4 `scalix-world validate` (cli/src/commands/validate.ts)
- **Options:** `--template <id>`, `--all`, `--strict`
- Modes:
  - `--all`: Validate all registered templates
  - `--template <id>`: Validate one specific template
  - (no flags): Validate current directory as a template
- Validation checks: package.json presence, scalixTemplate config, required files, config files (tsconfig, vite, tailwind), source directory structure, repository URL, dependencies, strict mode (.gitignore, LICENSE, etc.)

### 4.5 `scalix-world help`
- Displays Commander help output

---

## 5. Template System

### 5.1 Template Registry (cli/src/utils/config.ts)

**Hardcoded DEFAULT_TEMPLATES (8 templates):**

| ID | Name | Has Local Template |
|----|------|--------------------|
| react | React App | Yes |
| nextjs | Next.js App | No (remote only) |
| admin-dashboard | Admin Dashboard | Yes |
| crm | CRM System | Yes |
| ecommerce | E-commerce Platform | Yes |
| analytics-dashboard | Analytics Dashboard | Yes |
| vue | Vue.js App | No (remote only) |
| svelte | Svelte App | No (remote only) |

Local templates override remote defaults when IDs match. Local templates are discovered by reading `templates/*/package.json` and checking for `scalixWorldTemplate` configuration.

### 5.2 Template Config Shape (`TemplateConfig`)
```typescript
{
  id: string;          // kebab-case identifier
  name: string;        // Display name
  description: string; // Full description
  repository: string;  // Git clone URL
  branch?: string;     // Default: "main"
  tags?: string[];     // Search/filter tags
  postInstall?: string[]; // Post-creation instructions
}
```

### 5.3 Template Cloning (cli/src/utils/template.ts)
- **Local path detected?** -> `fs.copy(sourceDir, targetDir)`
- **Remote repository?** -> `git clone --depth 1 --branch <branch> <repo> <target>`, then remove `.git/`
- After cloning, runs `processTemplateVariables` to replace placeholders in common files (package.json, README.md, index.html, vite.config.ts, etc.)

### 5.4 Template Variables
| Placeholder | Replacement |
|-------------|-------------|
| `{{project-name}}` | kebab-case project name |
| `{{PROJECT_NAME}}` | UPPER_CASE project name |
| `{{ProjectName}}` | PascalCase project name |

### 5.5 Local Templates (5 present)

All local templates share a common stack:
- React 18 + TypeScript + Vite 5 + Tailwind CSS 3
- Radix UI primitives for accessible components
- Lucide React for icons
- class-variance-authority + clsx + tailwind-merge for styling
- `@scalix-world/react-vite-component-tagger` as devDependency

**react/** - Minimal starter with button, badge, card UI components

**admin-dashboard/** - Sidebar navigation, overview dashboard, data tables, dropdown menus, recharts analytics, date-fns, faker.js mock data

**crm/** - Customer management, CRM dashboard, mock data, progress bars, dialogs, selects, avatars, labels, textareas

**ecommerce/** - Product pages, category pages, cart (Zustand store), checkout, account page, admin panel, react-router-dom routing, header/footer layout, product cards, navigation menu, separator

**analytics-dashboard/** - Multi-page (dashboard, reports, data sources, settings, alerts) with react-router-dom, Zustand, sidebar + header layout, metric cards, charts, data tables, export (xlsx, jspdf, html2canvas), date picker

---

## 6. Shared Packages

### 6.1 @scalix-world/design-system (packages/design-system/)
**Purpose:** Comprehensive design token and theming library for all Scalix templates.

**Exports:**
- **Colors** (`src/colors/index.ts`): 35 color palettes x 11 shades = 385 colors, organized into 7 collections (primary, trends, industries, nature, brands, emotions, specialty). Includes semantic colors, theme-specific colors, and utility functions (withOpacity, lighten, darken, getContrastColor, meetsContrastRatio for WCAG).
- **Icons** (`src/icons/index.tsx`): Re-exports ~80+ Lucide icons organized into 11 categories (navigation, search, user, business, time, communication, actions, status, content, development, settings, nature). Provides `<Icon>` component and icon utility functions.
- **Tokens** (`src/tokens/index.ts`): Spacing (18 steps), fontSize (10 sizes), fontWeight (9 weights), lineHeight (14 values), borderRadius (8 values), shadows (7 levels), typography (font families, letter spacing), animations (durations, easings, keyframes), zIndex (semantic layers), breakpoints (5 sizes). Utility functions for CSS variable generation.
- **Themes** (`src/themes/index.ts`): 6 pre-built themes (light, dark, business, consumer, ecommerce, analytics). Each theme maps semantic colors to the color palette. Includes `themeUtils` for CSS variable generation, theme application to DOM, system preference detection, and theme watching.
- **Demo** (`src/demo.tsx`): Demo component showcasing colors, icons, metrics, themes, and design tokens.

**Build:** tsup (CJS + ESM + .d.ts)
**Peer deps:** React 18, lucide-react 0.469.0

### 6.2 @scalix-world/react-vite-component-tagger (packages/react-vite-component-tagger/)
**Purpose:** Vite plugin that adds `data-scalix-id` and `data-scalix-name` attributes to JSX elements during development for debugging/component identification.

**How it works:**
1. Runs as a Vite plugin (`apply: "serve"`, `enforce: "pre"`)
2. Only processes `.jsx` and `.tsx` files outside `node_modules`
3. Parses code with `@babel/parser` (JSX + TypeScript plugins)
4. Walks AST with `estree-walker`
5. For each `JSXOpeningElement` with a `JSXIdentifier` name, injects `data-scalix-id="file:line:col"` and `data-scalix-name="ComponentName"`
6. Uses `magic-string` for source map-preserving string manipulation

**Build:** tsup (CJS + ESM + .d.ts)

### 6.3 @scalix-world/nextjs-webpack-component-tagger (packages/nextjs-webpack-component-tagger/)
**Purpose:** Identical functionality to the Vite tagger but implemented as a webpack loader for Next.js projects.

**Differences from Vite version:**
- Uses webpack loader API (`this.async()`, `this.resourcePath`, `this.rootContext`)
- Async callback-based instead of returning transform result
- Returns original code on error instead of throwing

---

## 7. Validation Engine (cli/src/utils/validation.ts)

Two modes of validation:

### 7.1 Directory Validation (`validateTemplate`)
Checks a file-system path as a template:
- **Package.json:** Required fields (name, version), `scalixTemplate` config (id, name, description), ID format regex (`/^[a-z][a-z0-9-]*$/`)
- **Required files:** package.json
- **Recommended files:** README.md, README-template.md
- **Config files:** Validates JSON parse for .json configs, non-empty content for .js/.ts configs
- **Source structure:** At least one of src/, app/, pages/, components/ must exist with an entry file
- **Repository validation** (optional): URL format, HTTPS protocol, github.com host check
- **Dependencies** (optional): Warns about problematic deps (webpack, babel-core)
- **Strict mode** (optional): Requires .gitignore, recommends LICENSE, checks package.json for description, keywords, author, license

### 7.2 Config Validation (`validateTemplateForUse`)
Lightweight check of a TemplateConfig object:
- Required fields: id, name, description, repository
- Repository URL format and HTTPS protocol
- Tag format (lowercase with hyphens)

---

## 8. Pre-flight Checks (cli/src/utils/dependencies.ts)

Before creating an app, the CLI verifies:
1. **Node.js** >= 18.0.0
2. **npm** is installed
3. **Git** is installed
4. **Disk space** >= 100MB free (uses `os.freemem()` -- note: this checks RAM, not disk)
5. **Directory writable** (creates and removes a test file)

Provides formatted results and installation instructions for failed checks.

---

## 9. Progress UI (cli/src/utils/progress.ts)

Two progress tracking mechanisms:
- **ProgressManager:** Wrapper around `ora` spinner with start/update/succeed/fail/warn/info/stop methods and elapsed time tracking
- **StepProgress:** Multi-step progress tracker showing "(current/total)" format, used by the `create` command (6 steps)

---

## 10. Build & Scripts

| Script | Purpose |
|--------|---------|
| `npm run build` | Build all workspaces |
| `npm run dev` | Dev mode for CLI workspace |
| `npm run test` | Run tests in all workspaces |
| `npm run lint` | Lint all workspaces |
| `npm run clean` | Remove all node_modules and dist dirs |
| `npm run publish-all` | Publish all workspaces to npm |

---

## 11. Issues & Observations

### 11.1 Metadata Key Inconsistency
- Templates' `package.json` uses `scalixWorldTemplate` as the config key
- The validation engine in `validation.ts:97` checks for `scalixTemplate` (without "World")
- The `config.ts` loader at line 198 correctly reads `scalixWorldTemplate`
- This means `validateTemplate()` (directory validation mode) will always report an error because it looks for the wrong key, while `loadTemplatesFromPackages()` works correctly

### 11.2 Disk Space Check Checks RAM
- `dependencies.ts:169` uses `os.freemem()` which returns free memory (RAM), not free disk space
- The check is labeled "Disk Space" but actually validates available RAM

### 11.3 Duplicate Variable Replacement
- Both `create.ts:replaceTemplateVariables()` and `template.ts:processTemplateVariables()` perform variable replacement on overlapping file sets
- The `create` command calls `cloneTemplate` (which runs `processTemplateVariables`), then separately calls its own `replaceTemplateVariables`
- This results in double processing of files like `package.json`, `index.html`, and `src/main.tsx`

### 11.4 PascalCase Conversion is Simplistic
- `template.ts:capitalizeFirst()` only capitalizes the first character
- For a name like "my-awesome-app", `{{ProjectName}}` becomes "My-awesome-app" instead of "MyAwesomeApp"

### 11.5 Missing Local Templates for Registered Defaults
- `vue`, `svelte`, and `nextjs` are registered in DEFAULT_TEMPLATES but have no local template directories
- If used without network access, these will fail to clone

### 11.6 Test Output Committed
- `final-test-app/` and `test-debug-app/` are committed to the repo; these appear to be generated output from the admin-dashboard template and should likely be in .gitignore

### 11.7 Design System demo.tsx Import Error
- `demo.tsx:4` imports `MetricCard` from `./analytics/metricCard` but no `src/analytics/` directory exists in the design-system package
- This file would fail to compile

### 11.8 No CLI package.json Found
- The CLI `src/` files exist but no `cli/package.json` was found in the glob results, which means the workspace reference may be broken or the CLI is not independently buildable

---

## 12. Data Flow Summary

```
User runs: scalix-world create my-app --template crm
  |
  v
index.ts (Commander) --> create.ts handler
  |
  v
Pre-flight checks (Node, npm, Git, "disk", permissions)
  |
  v
Get template config from registry (config.ts)
  - Merge DEFAULT_TEMPLATES + local templates/*/package.json
  |
  v
Validate template config (validation.ts)
  |
  v
Clone template (template.ts)
  - Local? fs.copy(templates/crm/, ./my-app/)
  - Remote? git clone --depth 1 <repo> ./my-app/
  |
  v
Process template variables (template.ts + create.ts)
  - Replace {{project-name}} -> my-app
  - Replace {{PROJECT_NAME}} -> MY_APP
  - Replace {{ProjectName}} -> My-app (bug: not true PascalCase)
  |
  v
Display success + next steps
```

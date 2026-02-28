# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is 封筒ツクール (Envelope Maker), a privacy-focused web application for creating printable PDF envelopes with Japanese address formatting. The app runs entirely in the browser without sending data to servers.

## Tech Stack

- **Nuxt 3** with Vue 3 (Composition API + TypeScript)
- **Nuxt UI Pro** for components (Sky color theme)
- **@pdfme** suite (v5.3.19) for PDF generation
- **pnpm** package manager (required, enforced via preinstall script)
- **Node.js 22.13.x** (required)

## Development Commands

```bash
# Install dependencies (must use pnpm)
pnpm install

# Start development server on http://localhost:3000
pnpm dev

# Type checking
pnpm typecheck

# Linting (ESLint only)
pnpm lint:js

# Fix linting issues
pnpm lint:js --fix

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview
```

**Note:** `pnpm lint` は内部で `prettier --check .` を呼ぶが Prettier は未インストールのため失敗する。lintは `pnpm lint:js` を使うこと。

## Architecture

### Core Functionality Flow

1. User inputs address data via forms (`components/envelope-form.vue`)
2. Form data is validated and converted to PDF schema format (`utils/form.ts`)
3. Schema is dynamically generated with conditional field positioning based on input
4. PDF is generated using base template with positioned text fields (`scripts/pdf_schemas/envelope-v.ts`)
5. Real-time preview shown using @pdfme/ui Viewer (`components/pdf-preview.vue`)
6. Final PDF opens in new window for printing

### Key Components

- **Form System**: Uses Nuxt UI Pro form components with v-model bindings, no external state management
- **PDF Generation**: Composable (`composables/pdf-generator.ts`) with dynamic imports of @pdfme/generator for code splitting
- **PDF Preview**: Composable (`composables/pdf-viewer.ts`) manages @pdfme/ui Viewer lifecycle
- **Font Loading**: Composable (`composables/font.ts`) loads local Noto Sans JP fonts with Google Fonts fallback
- **PDF Template**: Pre-made base PDF (`/public/template_pdf/envelope-v.pdf`) with text overlay positions
- **Address Book**: LocalStorage-backed address book (`composables/address-book.ts`) with registration/selection modals
- **Share URL Feature**: Generates URLs with form data as query parameters (`components/share-url.vue`, `composables/query-params.ts`)
- **Responsive Breakpoint**: 640px for compact mode detection (`composables/screen-size.ts`)

### Directory Structure

- `composables/` — Auto-imported Vue composables (kebab-case naming)
- `utils/` — Auto-imported pure utility functions
- `scripts/forms/` — Form type definitions (`schema.ts`)
- `scripts/pdf_schemas/` — PDF layout schema definitions

### Important Implementation Details

- **Browser-only**: SSR is disabled (`ssr: false` in nuxt.config.ts)
- **Privacy**: ユーザーの住所データをサーバーに送信しない。フォント読み込みのみGoogle Fonts CDNへのフォールバックを許容
- **Font Strategy**: ローカルフォント (`/public/fonts/NotoSansJP-Regular.otf`) を優先し、取得失敗時のみGoogle Fontsにフォールバック
- **PDF Schema**: Array-based schema format (pdfme v5 structure) with dynamic positioning
- **Form Types**: `DestForm`, `SenderForm`, `Honorific` types in `scripts/forms/schema.ts`
- **Address Entry Accessors**: Shared in `utils/address-entry.ts` to abstract dest/sender field prefix differences
- **Address Book Storage**: バージョン管理付き `{ version: number, entries: AddressEntry[] }` 形式でlocalStorageに保存。スキーマ変更時は `composables/address-book.ts` の `migrations` マップに変換関数を追加し `CURRENT_VERSION` をインクリメントする。未登録バージョンのマイグレーションはエラーになる
- **Lazy Loading**: Components use `lazy` prefix for performance optimization
- **URL State**: Form values can be shared via query parameters, loaded on page mount

## Code Style Guidelines

- Variable names in English with clear meanings
- Comments in Japanese
- Prioritize code readability
- Follow existing style and naming conventions
- No unnecessary code or comments

## Composables Naming Convention

- Use kebab-case for composable file names (e.g., `address-book.ts`, not `useAddressBook.ts`)
- Composables and utils are auto-imported globally

## Known Issues

### CMap Font Warnings

The console shows "CMap baseUrl parameter must be specified" warnings. These are from PDF.js (used internally by pdfme) when rendering the preview and don't affect PDF generation functionality. The warnings occur because the base PDF template contains embedded Japanese fonts that PDF.js cannot fully parse without CMap files.

### TypeScript Errors in PDF Schema

`scripts/pdf_schemas/envelope-v.ts` has 2 pre-existing TS2353 errors (`destZipcode1` and `senderZipcode` properties). These are type-level issues with @pdfme's Zod schema and do not affect runtime behavior. They exist on main branch.

### Printer Compatibility

Some convenience store printers may have issues (documented in `components/print-disclaimer.vue`)

### No CI Pipeline

This project does not have GitHub Actions or other CI configured. Lint and typecheck must be run manually before pushing.

## pdfme Package Management

All @pdfme packages must be kept at the same version. The project uses pnpm overrides to ensure version consistency:

```json
"overrides": {
  "@pdfme/common": "5.3.19",
  "@pdfme/converter": "5.3.19"
}
```

## Before Making Changes

1. Run `pnpm lint:js` to check for linting errors
2. Run `pnpm typecheck` to ensure type safety (2 pre-existing errors in `envelope-v.ts` are expected)
3. Test PDF generation with various Japanese address formats
4. Verify the app works without network requests (privacy requirement)
5. Ensure changes maintain responsive design for both desktop and mobile
6. Check browser console for any new errors beyond the known CMap warnings
7. Follow the code style guidelines (English variables, Japanese comments)
8. Test share URL functionality with different form field combinations

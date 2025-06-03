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

# Linting (ESLint only - no Prettier installed)
pnpm lint
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
- **PDF Generation**: Dynamic imports of @pdfme/generator for code splitting
- **Font Loading**: Custom composable (`composables/font.ts`) loads local Noto Sans JP fonts with Google Fonts fallback
- **PDF Template**: Pre-made base PDF (`/public/template_pdf/envelope-v.pdf`) with text overlay positions
- **Responsive Breakpoint**: 640px for compact mode detection

### Important Implementation Details

- **Browser-only**: SSR is disabled (`ssr: false` in nuxt.config.ts)
- **Font Strategy**: Prioritizes local font files to reduce network requests
- **PDF Schema**: Array-based schema format (pdfme v5 structure)
- **Form Types**: TypeScript interfaces in `scripts/forms/schema.ts`
- **Responsive**: Desktop shows side-by-side preview, mobile stacks vertically
- **Lazy Loading**: Components use `lazy` prefix for performance optimization

## Code Style Guidelines

- Variable names in English with clear meanings
- Comments in Japanese
- Prioritize code readability
- Follow existing style and naming conventions
- No unnecessary code or comments

## Composables Naming Convention

- Use kebab-case for composable file names (e.g., `person-search.ts`, not `usePersonSearch.ts`)
- Composables are auto-imported globally

## Known Issues

### CMap Font Warnings

The console shows "CMap baseUrl parameter must be specified" warnings. These are from PDF.js (used internally by pdfme) when rendering the preview and don't affect PDF generation functionality. The warnings occur because the base PDF template contains embedded Japanese fonts that PDF.js cannot fully parse without CMap files.

### Printer Compatibility

Some convenience store printers may have issues (documented in `components/print-disclaimer.vue`)

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
2. Test PDF generation with various Japanese address formats
3. Verify the app works without network requests (privacy requirement)
4. Ensure changes maintain responsive design for both desktop and mobile
5. Check browser console for any new errors beyond the known CMap warnings
6. Follow the code style guidelines (English variables, Japanese comments)

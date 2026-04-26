# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm lint     # Run ESLint
pnpm codegen  # Generate Contentful types (requires CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN env vars)
```

## Architecture

This is a Next.js 16 App Router photography portfolio site that fetches content from Contentful CMS.

### Key Structure

- **`src/app/`** - App Router pages
  - `page.tsx` - Homepage (server component) that fetches galleries and renders `home-page.tsx` (client component)
  - `[slug]/page.tsx` - Dynamic redirect handler for short URLs managed in Contentful
  - `contact/page.tsx` - Contact page

- **`src/contentful/`** - Contentful integration layer
  - `client.ts` - Contentful SDK client setup
  - `galleries.ts` - Gallery content type fetching/parsing
  - `redirects.ts` - Redirect content type fetching
  - `contentImage.ts` - Image asset parsing helper
  - `types/` - Auto-generated TypeScript types from Contentful (via `pnpm codegen`)

- **`src/components/`** - React components with Framer Motion animations

### Environment Variables

Required:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`

For type generation:
- `CONTENTFUL_MANAGEMENT_TOKEN`

### Tech Stack

- Next.js 16 with App Router
- React 19
- Contentful CMS
- Framer Motion for animations
- Tailwind CSS 4 for styling
- TypeScript with path alias `@/*` mapping to `./src/*`

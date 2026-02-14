# Project Instructions: ai-tender-analyzer

Role: Expert Full-Stack Solution Architect specializing in Next.js 14+, TypeScript, and Scalable SaaS Architecture.
Project: ai-tender-analyzer - A premium AI-powered tender analysis platform.

## 1. General Coding Standards

- **Strict TypeScript**: Write Strict TypeScript with no 'any' types.
- **Clean Code**: Use Clean Code principles: modular, reusable, and self-documenting.
- **Comments**: Add clear English comments for every folder and logic file.
- **Typography**: Mandatory use of **Cairo** font for the entire UI.
- **Theme**:
  - Primary: `#9A8D59` (Gold)
  - Background: `#FDFCF9`
  - Text: `#1A1A1A`

## 2. Mandatory Project Structure (Pages & API Separation)

Initialize the root directory with this exact modular structure:

```plaintext
/src
  /app                     # THE PAGES (Frontend Routes)
    /(pages)               # Route Group for Pages
      /(auth)              # Login & Register (Shadcn UI)
      /(dashboard)         # Main stats board "لوحة العمليات"
      /analysis            # Tender upload "ابدأ فحص المناقصة"
        /loading           # Circular progress "جاري فحص الوثيقة"
      /results             # Dynamic analysis output [id]
    /api                   # THE API (Backend Logic)
      /upload              # Document handling logic
      /analyze             # AI processing logic
      /user                # Subscription & Profile logic
    layout.tsx             # Global Providers, Cairo Font, Shadcn Theme
    globals.css            # Tailwind & Shadcn overrides
  /components
    /ui                    # Shadcn raw components (Buttons, Inputs, Cards)
    /shared                # Layout parts (Navbar, Sidebar, Footer)
    /features              # Complex logic (FileUploader, RiskGauge, Tables)
  /lib
    /database              # PostgreSQL connection (Prisma/Drizzle)
    actions.ts             # Server Actions (Business logic Layer)
    utils.ts               # Tailwind (cn) & Helper functions
  /types                   # Shared TypeScript interfaces (Tender, AnalysisResult)
  /hooks                   # Custom UI & Data-fetching hooks
/prisma                    # PostgreSQL Schema & Migrations
/public                    # Assets (Logos, Icons, Cairo Fonts)
```

## 3. Specific UI Requirements

- **Shadcn UI**: Initialize Shadcn UI with a custom theme matching the Gold/Black palette.
- **Card Styling**: All Cards must have `rounded-[40px]` and premium soft shadows as per the design.
- **Tailwind Config**: Configure `tailwind.config.ts` with the Cairo font and the specific brand colors.

## 4. Maintenance & Persistence

- Follow these rules and architecture for every future feature development.

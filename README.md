# MealPlate Trust & Onboarding Experiment

A Next.js landing page experiment to validate user trust in MealPlate's AI by measuring behavior through a funnel: trust → effort → intent.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a Supabase project
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor to create the `events` table
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. Add fonts:
   - Download Cabinet Grotesk font files (Regular, Medium, Bold)
   - Place them in `public/fonts/` as:
     - `CabinetGrotesk-Regular.woff2`
     - `CabinetGrotesk-Medium.woff2`
     - `CabinetGrotesk-Bold.woff2`

4. Run the development server:
```bash
npm run dev
```

## Analytics Events

The app tracks the following events:
- `page_view` - Landing page viewed
- `cta_click_start_form` - Start button clicked
- `form_started` - First keystroke in input form
- `form_submitted` - Form submitted (with character_count in metadata)
- `generate_plan_clicked` - Generate plan CTA clicked
- `waitlist_email_submitted` - Email submitted on waitlist page

## Success Metrics

- Visit → Form Start: ≥ 50%
- Form Start → Submit: ≥ 70%
- Submit → Generate Click: ≥ 60%


# Malawi Education Books and Vacancies (MEBV)

MEBV is a Malawi-focused education and career portal combining book libraries, video learning, Python training, job vacancies, services, and admin management through Supabase.

## Included Files
- `index.html` — Home landing page
- `books.html` — Books library and search
- `video.html` / `videos.html` — Video learning center and compatibility redirect
- `python.html` — Python Academy coursework
- `vacancies.html` — Vacancies portal
- `services.html` — Professional services catalogue and inquiry form
- `blog.html` — Blog and article feed
- `about.html` — Platform story and mission
- `contact.html` — Contact and general inquiry form
- `register.html` — User registration
- `login.html` — User login with admin mode
- `profile.html` — User dashboard and premium verification
- `admin.html` — Administrative dashboard
- `css/style.css` — Shared branding and layout styles
- `js/app.js` — Core application engine for locked pages
- `js/supabase.js` — Shared Supabase client initialization
- `js/auth.js` — Authentication requirement helpers
- `js/ai-search.js` — Search utility abstraction
- `js/ads.js` — Advertisement banner loader
- `js/ratings.js` — Rating widget helper
- `js/vacancies.js` — Vacancies page interaction
- `js/services.js` — Services page interaction
- `js/blog.js` — Blog page interaction
- `js/admin.js` — Admin dashboard behavior
- `manifest.json` — PWA manifest
- `sql/policies.sql` — Supplemental tables and RLS policy setup
- `sql/seed.sql` — Sample data seed scripts
- `sql/missing-functions.sql` — Supabase RPC function definitions

## Project Goals
- Maintain all locked files without modification
- Fill missing pages and client-side functionality
- Extend Supabase compatibility with additional SQL objects
- Provide deployment-ready documentation

## Notes
- Existing locked files remain unchanged.
- New pages were designed for compatibility with current navigation.
- Supabase connection values in `js/supabase.js` must be replaced with actual project credentials before deployment.

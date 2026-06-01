# Deployment Guide for MEBV

## 1. Folder Structure
```
mebv-platform/
  assets/
  css/
    style.css
  js/
    app.js
    supabase.js
    auth.js
    ai-search.js
    ads.js
    ratings.js
    vacancies.js
    services.js
    blog.js
    admin.js
  sql/
    schema.sql
    policies.sql
    missing-functions.sql
    seed.sql
  index.html
  books.html
  video.html
  videos.html
  python.html
  vacancies.html
  services.html
  blog.html
  about.html
  contact.html
  register.html
  login.html
  profile.html
  admin.html
  manifest.json
  README.md
  PROJECT_PROGRESS.md
  SUPABASE_SETUP.md
  DEPLOYMENT_GUIDE.md
```

## 2. Supabase Setup
1. Create a new Supabase project.
2. Configure authentication: Email signup and Google OAuth.
3. Create `payment_slips` storage bucket.
4. Run `sql/schema.sql`, then `sql/policies.sql`, then `sql/missing-functions.sql`, then `sql/seed.sql`.

## 3. SQL Execution Order
1. `sql/schema.sql`
2. `sql/policies.sql`
3. `sql/missing-functions.sql`
4. `sql/seed.sql`

## 4. Storage Bucket Creation
1. Create `payment_slips` bucket.
2. Set public access only if direct file links are required.
3. Use signed URLs for private uploads when possible.

## 5. Authentication Setup
1. Enable Email auth.
2. Enable Google OAuth and configure redirect URIs.
3. Create admin user and set `profiles.role` to `super_admin`.

## 6. Admin Account Creation
- Create a new auth user.
- Insert profile row in `public.profiles`.
- Set `role = 'super_admin'`.

## 7. Environment Variables
- Set `SUPABASE_URL` and `SUPABASE_KEY` for deploys.
- Replace placeholder strings in `js/supabase.js` with actual values.

## 8. Testing Procedures
- Test login, registration, and profile flows.
- Verify vacancy search and save functionality.
- Confirm service inquiries are recorded.
- Check blog posts and rating widget behavior.
- Authenticate as admin and validate dashboard counts.

## 9. Security Checklist
- Supabase Auth enabled.
- RLS policies active for all tables.
- No hardcoded secrets in locked files.

## 10. Deployment to Cloudflare Pages
1. Connect your Git repository.
2. Set build command to `echo "No build necessary"` or leave blank.
3. Set publish directory to `/`.
4. Add environment variables for Supabase credentials.

## 11. Domain Connection
1. Add custom domain under Cloudflare Pages.
2. Verify DNS records.
3. Use Cloudflare SSL settings to enable HTTPS.

## 12. SSL Verification
- Ensure the site is served with valid SSL.
- Confirm `https://your-domain.example/index.html` loads securely.

## 13. Google Login Setup
- Configure Google provider in Supabase.
- Add authorized redirect URLs for `login.html` and `profile.html`.

## 14. Backup Procedures
- Export database schema and data regularly.
- Use Supabase backups and snapshots.
- Keep copies of `sql/` files in version control.

## 15. Maintenance Procedures
- Review and refresh `settings` values in Supabase.
- Monitor `audit_logs` for admin activity.
- Update service and vacancy content as needed.
- Keep `js/supabase.js` credentials current when keys rotate.

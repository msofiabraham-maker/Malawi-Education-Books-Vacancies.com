# Supabase Setup for MEBV

## 1. Create a Supabase Project
1. Sign in at https://app.supabase.com.
2. Create a new project for `MEBV`.
3. Select a region close to Malawi.
4. Set a secure database password.

## 2. Configure Database
1. Open the SQL editor.
2. Run `schema.sql` first to create the core schema and authentication hooks.
3. Run `sql/policies.sql` next to add supplemental tables and RLS policies.
4. Run `sql/missing-functions.sql` to create RPC functions.
5. Run `sql/seed.sql` to insert sample vacancies, services, blog posts, and advertisements.

## 3. Storage Buckets
1. Create a bucket named `payment_slips` for receipt uploads.
2. Ensure the bucket is public if direct public URLs are required, or configure signed URLs for private assets.
3. Create any additional buckets needed for documents or PDFs.

## 4. Authentication Setup
1. Enable Email authentication under Auth > Settings.
2. Enable Google OAuth and add authorized redirect URLs such as:
   - `https://your-domain.com/login.html`
   - `https://your-domain.com/profile.html`
3. Create roles in `profiles` using `role` values: `super_admin`, `admin`, `content_manager`, `moderator`, `registered_user`.
4. Do not hardcode passwords; use supabase auth for all user accounts.

## 5. Environment Variables
Update `js/supabase.js` with:
- `supabaseUrl`
- `supabaseKey`

For deployment, store these as environment variables in your hosting platform or generate a `.env` reference for build-time injection.

## 6. Admin Account Creation
1. Create a Supabase auth user by email and password.
2. Insert a matching row into `public.profiles` with `role = 'super_admin'`.
3. Use the admin hotkey flow (`Ctrl + Shift + A` held for 3 seconds) to sign in through `login.html`.

## 7. Additional Notes
- Ensure `increment_book_download` and `record_vacancy_view` RPCs are present.
- Review and approve RLS policies in the SQL editor.
- Verify `service_worker.js` registration after deployment.

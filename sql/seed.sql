-- ==========================================================================
-- Seed Data for MEBV Platform
-- ==========================================================================

INSERT INTO public.vacancies (id, title, company, category, description, deadline, requirements, apply_url, is_featured, is_urgent)
VALUES
('00000000-0000-0000-0000-000000000001', 'Secondary School Science Teacher', 'Malawi Education Trust', 'Teaching Jobs', 'Teach science subjects to secondary students with practical laboratory guidance and exam preparation.', NOW() + INTERVAL '25 days', 'Bachelor in Education; Science background; classroom management.', 'https://mebv.online/apply/science-teacher', true, true),
('00000000-0000-0000-0000-000000000002', 'Nurse Clinical Supervisor', 'Lilongwe Health NGO', 'Nursing Jobs', 'Lead a team of clinical nurses in district hospital services and community care.', NOW() + INTERVAL '18 days', 'Registered Nurse; supervisory experience; excellent communication.', 'https://mebv.online/apply/nurse-supervisor', true, false),
('00000000-0000-0000-0000-000000000003', 'ICT Internship', 'Blantyre Tech Academy', 'Internships', 'Hands-on internship with software development teams and digital learning content production.', NOW() + INTERVAL '12 days', 'Basic programming knowledge; willingness to learn; good teamwork.', 'https://mebv.online/apply/ict-internship', false, true);

INSERT INTO public.services (id, title, description, category, price_range, is_featured)
VALUES
('11111111-1111-1111-1111-111111111111', 'Website Development', 'Responsive website creation for academic organizations, businesses, and local communities.', 'Digital Product', 'From MWK 120,000', true),
('11111111-1111-1111-1111-111111111112', 'Mobile App Development', 'Native and cross-platform mobile applications for students, schools, and enterprise services.', 'Digital Product', 'From MWK 180,000', true),
('11111111-1111-1111-1111-111111111113', 'CV Writing', 'Professional CV design with personalized deployment for Malawi job markets.', 'Career Services', 'From MWK 15,000', false);

INSERT INTO public.blogs (id, title, content, author_id, cover_url)
VALUES
('22222222-2222-2222-2222-222222222221', 'How to Prepare for MSCE Past Papers', 'Discover the best strategy for revising MSCE past papers, balancing time, and using online learning resources effectively.', NULL, 'assets/LOGO.png'),
('22222222-2222-2222-2222-222222222222', 'Career Tips for Malawi Graduates', 'A practical guide for graduates looking for education roles, internships, and online certifications across Malawi.', NULL, 'assets/LOGO.png');

INSERT INTO public.advertisements (id, title, banner_url, target_url, type, start_date, end_date, is_active)
VALUES
('33333333-3333-3333-3333-333333333331', 'MEBV Premium Python Cohort', 'assets/LOGO.png', 'https://mebv.online/python.html', 'banner', NOW(), NOW() + INTERVAL '90 days', true),
('33333333-3333-3333-3333-333333333332', 'Submit Your Job Vacancy', 'assets/LOGO.png', 'https://mebv.online/vacancies.html', 'banner', NOW(), NOW() + INTERVAL '90 days', true);

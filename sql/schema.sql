-- ============================================================================
-- MALAWI EDUCATION BOOKS AND VACANCIES (MEBV) - DATABASE SCHEMA
-- ============================================================================
-- Designed for PostgreSQL / Supabase
-- Covers authentication profiles, libraries, vacancies, Python academy, 
-- PWA tracking, payment logs, and dynamic web configuration settings.
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clean-up existing triggers/functions if running schema fresh
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ==========================================
-- 1. USER PROFILES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR(255),
    avatar_url TEXT DEFAULT 'assets/LOGO.png',
    phone_number VARCHAR(50),
    role VARCHAR(50) DEFAULT 'registered_user' CHECK (role IN ('super_admin', 'admin', 'content_manager', 'moderator', 'registered_user', 'guest')),
    download_count INTEGER DEFAULT 0,
    xp INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE
);

-- ==========================================
-- 2. BOOKS LIBRARY
-- ==========================================
CREATE TABLE IF NOT EXISTS public.books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) DEFAULT 'Unknown',
    description TEXT,
    category VARCHAR(100) NOT NULL CHECK (category IN ('MSCE Books', 'JCE Books', 'Primary Books', 'Nursing Books', 'Novels', 'Past Papers', 'Others')),
    tags TEXT[],
    file_url TEXT,
    pdf_url TEXT,
    cover_url TEXT DEFAULT 'assets/LOGO.png',
    download_count INTEGER DEFAULT 0,
    rating_avg NUMERIC(3,2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_recent BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 3. BOOK REQUESTS & BROKEN LINKS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.book_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    book_title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    details TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.broken_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    item_type VARCHAR(50) CHECK (item_type IN ('book', 'video')),
    item_id UUID NOT NULL,
    report_details TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 4. VIDEO LEARNING CENTER
-- ==========================================
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    youtube_id VARCHAR(50) NOT NULL,
    thumbnail_url TEXT,
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 5. PYTHON ACADEMY (PREMIUM)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.python_lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    level VARCHAR(50) NOT NULL CHECK (level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
    lesson_order INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    youtube_id VARCHAR(50) NOT NULL,
    notes TEXT,
    examples TEXT,
    exercises TEXT,
    quiz_questions JSONB NOT NULL, -- Format: Array of objects {question, options, correct_index}
    xp_reward INTEGER DEFAULT 50,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.python_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.python_lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    quiz_score INTEGER,
    xp_earned INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    certificate_id VARCHAR(100) UNIQUE NOT NULL, -- e.g. MEBV-PY-XXXXXX
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    level VARCHAR(50) NOT NULL CHECK (level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FULL_COURSE')),
    verification_hash VARCHAR(255) NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 6. VACANCIES PORTAL
-- ==========================================
CREATE TABLE IF NOT EXISTS public.vacancies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN (
        'Government Jobs', 'NGO Jobs', 'Teaching Jobs', 'Nursing Jobs', 'Health Jobs', 
        'Banking Jobs', 'Engineering Jobs', 'IT Jobs', 'Scholarships', 'Internships', 
        'Attachments', 'Tenders', 'Others'
    )),
    description TEXT NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    requirements TEXT,
    apply_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_urgent BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 7. SERVICE MARKETPLACE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.service_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    service_name VARCHAR(255) NOT NULL, -- Matches requested list
    details TEXT NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 8. PREMIUM PAYMENT GATEWAY QUEUE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_type VARCHAR(50) CHECK (plan_type IN ('monthly', 'yearly', 'lifetime')),
    method VARCHAR(100) NOT NULL CHECK (method IN ('Airtel Money', 'TNM Mpamba', 'National Bank')),
    proof_url TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE
);

-- ==========================================
-- 9. ADVERTISEMENT ENGINE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.advertisements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    banner_url TEXT NOT NULL,
    target_url TEXT,
    type VARCHAR(50) DEFAULT 'banner' CHECK (type IN ('banner', 'image', 'video')),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    views INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 10. COMMUNITY BLOG & FEEDBACK
-- ==========================================
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    cover_url TEXT DEFAULT 'assets/LOGO.png',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    feedback TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 11. GENERAL PLATFORM SETTINGS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 12. AUDIT LOGS FOR ADMINISTRATORS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================================
-- AUTOMATED TRIGGERS & FUNCTIONS
-- ============================================================================

-- Create profile automatically upon signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'MEBV User'),
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'assets/LOGO.png'),
    'registered_user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Profiles Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Books Security
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Books are viewable by everyone" ON public.books FOR SELECT USING (true);
CREATE POLICY "Only admins can modify books" ON public.books FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'content_manager'))
);

-- Book Requests Security
ALTER TABLE public.book_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own book requests" ON public.book_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert book requests" ON public.book_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all book requests" ON public.book_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'moderator'))
);

-- Broken Links Security
ALTER TABLE public.broken_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can report broken links" ON public.broken_links FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage broken links" ON public.broken_links FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'moderator'))
);

-- Videos Security
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Videos are viewable by everyone" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Admins can manage videos" ON public.videos FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'content_manager'))
);

-- Python Lessons Security
ALTER TABLE public.python_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons are viewable by logged in users" ON public.python_lessons FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage lessons" ON public.python_lessons FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Python Progress Security
ALTER TABLE public.python_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own progress" ON public.python_progress FOR ALL USING (auth.uid() = user_id);

-- Certificates Security
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Certificates are viewable by everyone" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Admins can issue certificates" ON public.certificates FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Vacancies Security
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vacancies are viewable by everyone" ON public.vacancies FOR SELECT USING (true);
CREATE POLICY "Admins can manage vacancies" ON public.vacancies FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'content_manager'))
);

-- Service Inquiries Security
ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert inquiries" ON public.service_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own inquiries" ON public.service_inquiries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all inquiries" ON public.service_inquiries FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Payments Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own payment status" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage payments" ON public.payments FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Advertisements Security
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Advertisements are viewable by everyone" ON public.advertisements FOR SELECT USING (true);
CREATE POLICY "Admins can manage advertisements" ON public.advertisements FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Blog Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blogs are viewable by everyone" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Admins and managers can write blogs" ON public.blogs FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'content_manager'))
);

-- Testimonials Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved testimonials are public" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Registered users can post testimonials" ON public.testimonials FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can moderate testimonials" ON public.testimonials FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'moderator'))
);

-- Settings Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are readable by everyone" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Only super admins can update settings" ON public.settings FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Audit Logs Security
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only admins can see audit logs" ON public.audit_logs FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- ==========================================
-- SEED INITIAL WEBSITE SETTINGS
-- ==========================================
INSERT INTO public.settings (key, value) VALUES
('general_settings', '{
    "website_name": "Malawi Education Books and Vacancies",
    "whatsapp_number": "+265897228943",
    "phone_number": "+265993984344",
    "email": "msofiabraham@gmail.com",
    "facebook_link": "https://www.facebook.com/MEBVOnlineClasses",
    "youtube_channel_link": "https://www.youtube.com/",
    "homepage_banner": "Unlock Your Academic & Career Potential in Malawi",
    "download_limits": {
        "guest_limit": 10
    },
    "theme_colors": {
        "primary": "#0A1931",
        "secondary": "#FFC107",
        "accent": "#FFFFFF",
        "background": "#F5F5F5"
    },
    "seo_settings": {
        "meta_title": "Malawi Education Books and Vacancies (MEBV)",
        "meta_description": "Access free MSCE/JCE past papers, secondary text books, primary learning resources, nursing material, premium Python courses, and job vacancies across Malawi."
    }
}')
ON CONFLICT (key) DO NOTHING;
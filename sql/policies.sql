-- ==========================================================================
-- Supplemental Platform Tables & Policies
-- ==========================================================================

CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price_range VARCHAR(100),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.saved_vacancies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    vacancy_id UUID REFERENCES public.vacancies(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, vacancy_id)
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public services are viewable by everyone" ON public.services;
CREATE POLICY "Public services are viewable by everyone" ON public.services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'content_manager'))
);

ALTER TABLE public.saved_vacancies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own saved vacancies" ON public.saved_vacancies;
CREATE POLICY "Users can manage their own saved vacancies" ON public.saved_vacancies FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can insert saved vacancies" ON public.saved_vacancies FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Optional Policies for service inquiries and blog feedback if needed
DROP POLICY IF EXISTS "Users can insert inquiries" ON public.service_inquiries;
CREATE POLICY "Users can insert inquiries" ON public.service_inquiries FOR INSERT WITH CHECK (true);

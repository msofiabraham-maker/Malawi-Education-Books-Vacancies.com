-- ==========================================================================
-- Missing SQL Functions for the MEBV Platform
-- ==========================================================================

CREATE OR REPLACE FUNCTION public.increment_book_download(book_row_id UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
    UPDATE public.books
    SET download_count = COALESCE(download_count, 0) + 1
    WHERE id = book_row_id;
END;
$$ SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.record_vacancy_view(vacancy_row_id UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
    UPDATE public.vacancies
    SET views = COALESCE(views, 0) + 1
    WHERE id = vacancy_row_id;
END;
$$ SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.save_vacancy(user_uuid UUID, vacancy_row_id UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO public.saved_vacancies (user_id, vacancy_id)
    VALUES (user_uuid, vacancy_row_id)
    ON CONFLICT DO NOTHING;
END;
$$ SECURITY DEFINER;

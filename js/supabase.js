window.MEBVSUP = {
    supabaseUrl: "https://iafvcamlkqokqwejshyd.supabase.co", // Replace with your Supabase URL
    supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZnZjYW1sa3Fva3F3ZWpzaHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNjIxMTksImV4cCI6MjA5NTczODExOX0.rpFCC55m0dpU12xzFY1PEJNtqNkiCPhimRmly2_xYew", // Replace with your Supabase anon/public key
    client: null,

    init() {
        if (!this.client && typeof supabase !== 'undefined') {
            this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
        }
        return this.client;
    },

    async getSession() {
        if (!this.init()) return null;
        const { data } = await this.client.auth.getSession();
        return data?.session || null;
    },

    async getCurrentUser() {
        const session = await this.getSession();
        return session?.user || null;
    }
};

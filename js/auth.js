window.AuthManager = {
    async requireSession(redirect = 'login.html') {
        const client = MEBVSUP.init();
        if (!client) {
            window.location.href = redirect;
            return null;
        }
        const { data } = await client.auth.getSession();
        if (!data?.session) {
            window.location.href = redirect;
            return null;
        }
        return data.session.user;
    },

    async requireAdmin(redirect = 'login.html?admin_access=true') {
        const client = MEBVSUP.init();
        if (!client) {
            window.location.href = redirect;
            return null;
        }
        const { data } = await client.auth.getSession();
        if (!data?.session) {
            window.location.href = redirect;
            return null;
        }
        const { data: profile } = await client
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .single();
        const role = profile?.role || 'guest';
        if (!['super_admin', 'admin', 'content_manager', 'moderator'].includes(role)) {
            window.location.href = redirect;
            return null;
        }
        return data.session.user;
    },

    async getProfile() {
        const client = MEBVSUP.init();
        if (!client) return null;
        const { data } = await client.auth.getSession();
        if (!data?.session) return null;
        const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
        return profile || null;
    },

    async signOut(redirect = 'index.html') {
        const client = MEBVSUP.init();
        if (!client) return;
        await client.auth.signOut();
        window.location.href = redirect;
    }
};

window.AdEngine = {
    async load(targetSelector = '.ad-slot', limit = 1) {
        const client = MEBVSUP.init();
        if (!client) return;
        const { data, error } = await client
            .from('advertisements')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(limit);

        const target = document.querySelector(targetSelector);
        if (!target) return;

        if (error || !data || data.length === 0) {
            target.innerHTML = '<div class="glass-card" style="padding:24px; text-align:center;">No active campaigns are available at this time.</div>';
            return;
        }

        target.innerHTML = data.map(ad => {
            const label = ad.type === 'video' ? 'Video Sponsor' : 'Sponsored';
            return `
                <div class="glass-card" style="padding:24px; display:flex; flex-direction:column; gap:16px;">
                    <span class="hero-badge" style="background: rgba(223, 177, 91, 0.12); color: var(--color-secondary);">${label}</span>
                    <h3 style="margin:0; color: var(--color-primary);">${ad.title}</h3>
                    <p style="color: var(--color-text-muted); line-height:1.6;">${ad.banner_url ? 'Explore our partner resources and support educational growth.' : ''}</p>
                    <a href="${ad.target_url || '#'}" class="btn btn-secondary" target="_blank" rel="noreferrer">Learn More</a>
                </div>
            `;
        }).join('');
    }
};

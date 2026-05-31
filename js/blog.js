window.BlogPage = {
    posts: [],

    async init() {
        MEBVSUP.init();
        await this.loadPosts();
        this.renderPosts();
        this.bindSearch();
    },

    async loadPosts() {
        const client = MEBVSUP.init();
        if (!client) return;
        const { data, error } = await client
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
            this.posts = data;
        }
    },

    bindSearch() {
        const searchInput = document.getElementById('blog-search');
        if (!searchInput) return;
        searchInput.addEventListener('input', () => this.renderPosts());
    },

    renderPosts() {
        const query = document.getElementById('blog-search')?.value.toLowerCase().trim() || '';
        const wrapper = document.getElementById('blog-grid');
        if (!wrapper) return;
        const filtered = this.posts.filter(post => {
            const text = [post.title, post.content].join(' ').toLowerCase();
            return !query || text.includes(query);
        });
        if (filtered.length === 0) {
            wrapper.innerHTML = '<div class="glass-card" style="padding:40px; text-align:center; grid-column:1/-1;"><h3>No blog posts found.</h3><p style="color: var(--color-text-muted); margin-top:10px;">Try another keyword or refresh for new content.</p></div>';
            return;
        }
        wrapper.innerHTML = filtered.map(post => `
            <div class="glass-card" style="padding:24px; display:flex; flex-direction:column; gap:18px;">
                <h3 style="color: var(--color-primary);">${post.title}</h3>
                <p style="color: var(--color-text-muted); line-height:1.75;">${post.content.substring(0, 180)}...</p>
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                    <span style="font-size:0.9rem; color: var(--color-secondary);">Published ${new Date(post.created_at).toLocaleDateString()}</span>
                    <button class="btn btn-secondary" onclick="BlogPage.openPostModal('${post.id}')">Read More</button>
                </div>
                <div id="rating-${post.id}" style="margin-top:10px;"></div>
            </div>
        `).join('');
        filtered.forEach(post => {
            RatingWidget.mount(`#rating-${post.id}`, post.id);
        });
    },

    openPostModal(id) {
        const post = this.posts.find(item => item.id === id);
        if (!post) return;
        const content = `
            <p style="color: var(--color-text-muted); line-height:1.7;">${post.content}</p>
            <p style="margin-top:24px; color: var(--color-primary);"><strong>Author:</strong> ${post.author_id || 'MEBV Team'}</p>
        `;
        const modalId = 'mebv-dynamic-modal';
        const existing = document.getElementById(modalId);
        if (existing) existing.remove();
        document.body.insertAdjacentHTML('beforeend', `
            <div id="${modalId}" class="modal-backdrop" style="position:fixed;inset:0;background:rgba(10,25,49,0.62);display:flex;align-items:center;justify-content:center;z-index:10000;">
                <div class="glass-card" style="max-width:700px;width:90%;padding:28px;">
                    <h2 style="margin-bottom:16px;color:var(--color-primary);">${post.title}</h2>
                    <div style="color:var(--color-text-dark);line-height:1.8;">${content}</div>
                    <div style="margin-top:24px; display:flex; justify-content:flex-end; gap:12px;"><button class="btn btn-primary" onclick="document.getElementById('${modalId}').remove()">Close</button></div>
                </div>
            </div>
        `);
    }
};

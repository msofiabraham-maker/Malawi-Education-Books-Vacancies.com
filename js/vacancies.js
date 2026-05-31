window.VacanciesApp = {
    categories: [
        'Government Jobs', 'NGO Jobs', 'Teaching Jobs', 'Nursing Jobs',
        'Health Jobs', 'Banking Jobs', 'Engineering Jobs', 'IT Jobs',
        'Scholarships', 'Internships', 'Attachments', 'Tenders', 'Others'
    ],
    vacancies: [],
    activeCategory: 'All Vacancies',

    async init() {
        MEBVSUP.init();
        this.buildCategoryTabs();
        await this.loadVacancies();
        this.bindSearch();
        this.renderFeaturedSection();
        this.renderUrgentSection();
    },

    async loadVacancies() {
        const client = MEBVSUP.init();
        if (!client) return;
        const { data, error } = await client
            .from('vacancies')
            .select('*')
            .order('deadline', { ascending: true });

        if (!error && data) {
            this.vacancies = data;
            this.renderVacancies();
            return;
        }

        this.vacancies = [];
        this.renderVacancies();
    },

    buildCategoryTabs() {
        const container = document.getElementById('vacancy-category-tabs');
        if (!container) return;
        container.innerHTML = `
            <button class="category-tab-btn active" data-category="All Vacancies">All Vacancies</button>
            ${this.categories.map(item => `<button class="category-tab-btn" data-category="${item}">${item}</button>`).join('')}
        `;
        container.querySelectorAll('.category-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeCategory = btn.dataset.category;
                this.renderVacancies();
            });
        });
    },

    bindSearch() {
        const searchInput = document.getElementById('vacancy-search');
        if (!searchInput) return;
        searchInput.addEventListener('input', () => this.renderVacancies());
    },

    renderVacancies() {
        const wrapper = document.getElementById('vacancies-grid');
        if (!wrapper) return;
        const query = document.getElementById('vacancy-search')?.value.toLowerCase().trim() || '';

        const filtered = this.vacancies.filter(vacancy => {
            const matchesCategory = this.activeCategory === 'All Vacancies' || vacancy.category === this.activeCategory;
            const searchText = [vacancy.title, vacancy.company, vacancy.description, vacancy.requirements].join(' ').toLowerCase();
            const matchesQuery = !query || searchText.includes(query);
            return matchesCategory && matchesQuery;
        });

        if (filtered.length === 0) {
            wrapper.innerHTML = `
                <div class="glass-card" style="grid-column:1/-1; padding:40px; text-align:center;">
                    <h3>No vacancies match your search.</h3>
                    <p style="color: var(--color-text-muted); margin-top:12px;">Try another keyword or select a different category.</p>
                </div>
            `;
            return;
        }

        wrapper.innerHTML = filtered.map(vacancy => this.renderVacancyCard(vacancy)).join('');
        wrapper.querySelectorAll('.vacancy-card button').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.currentTarget.dataset.vacancyId;
                if (event.currentTarget.dataset.action === 'save') {
                    this.toggleSaveVacancy(id);
                } else {
                    this.openDetailsModal(id);
                }
            });
        });
    },

    renderVacancyCard(vacancy) {
        const deadline = new Date(vacancy.deadline);
        const expires = this.formatCountdown(deadline);
        const isSaved = this.isVacancySaved(vacancy.id);
        return `
            <div class="glass-card vacancy-card" style="padding:24px; display:flex; flex-direction:column; gap:18px;">
                <div style="display:flex; justify-content:space-between; align-items:start; gap:12px; flex-wrap:wrap;">
                    <div>
                        <span class="hero-badge" style="background: rgba(16, 185, 129, 0.1); color: var(--color-success);">${vacancy.category}</span>
                        <h3 style="margin: 14px 0 10px; color: var(--color-primary);">${vacancy.title}</h3>
                        <p style="color: var(--color-text-muted); margin:0;">${vacancy.company}</p>
                    </div>
                    <button class="btn btn-outline" data-action="save" data-vacancy-id="${vacancy.id}">${isSaved ? 'Saved' : 'Save Vacancy'}</button>
                </div>
                <p style="color: var(--color-text-dark); line-height:1.65;">${vacancy.description.substring(0, 160)}...</p>
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                    <span style="font-weight:700; color:var(--color-secondary);">Deadline: ${deadline.toLocaleDateString()}</span>
                    <span style="font-size:0.95rem; color:var(--color-text-muted);">${expires}</span>
                </div>
                <div style="display:flex; gap:12px; flex-wrap:wrap;">
                    <button class="btn btn-primary" data-action="details" data-vacancy-id="${vacancy.id}">View Details</button>
                    <button class="btn btn-secondary" data-action="save" data-vacancy-id="${vacancy.id}">${isSaved ? 'Saved' : 'Save Vacancy'}</button>
                </div>
            </div>
        `;
    },

    openDetailsModal(id) {
        const vacancy = this.vacancies.find(item => item.id === id);
        if (!vacancy) return;
        const content = `
            <div style="display:grid; gap:18px;">
                <p style="color: var(--color-text-muted);">${vacancy.description}</p>
                <p><strong>Company:</strong> ${vacancy.company}</p>
                <p><strong>Requirements:</strong> ${vacancy.requirements || 'Not specified'}</p>
                <p><strong>Apply Link:</strong> <a href="${vacancy.apply_url || '#'}" target="_blank" rel="noreferrer">${vacancy.apply_url || 'No external link provided'}</a></p>
                <p><strong>Deadline:</strong> ${new Date(vacancy.deadline).toLocaleDateString()}</p>
            </div>
        `;
        this.showModal(vacancy.title, content, `
            <button class="btn btn-outline" onclick="document.getElementById('mebv-dynamic-modal').remove()">Close</button>
            <button class="btn btn-primary" onclick="VacanciesApp.toggleSaveVacancy('${id}')">${this.isVacancySaved(id) ? 'Saved' : 'Save Vacancy'}</button>
        `);
        this.invokeViewCount(id);
    },

    formatCountdown(deadlineDate) {
        const diff = deadlineDate - new Date();
        if (diff <= 0) return 'Deadline passed';
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        return `${days}d ${hours}h ${minutes}m remaining`;
    },

    isVacancySaved(id) {
        const stored = JSON.parse(localStorage.getItem('mebv_saved_vacancies') || '[]');
        return stored.includes(id);
    },

    async toggleSaveVacancy(id) {
        const saved = this.isVacancySaved(id);
        let savedList = JSON.parse(localStorage.getItem('mebv_saved_vacancies') || '[]');
        if (saved) {
            savedList = savedList.filter(entry => entry !== id);
        } else {
            savedList.push(id);
        }
        localStorage.setItem('mebv_saved_vacancies', JSON.stringify(savedList));
        await this.syncSavedVacancyToServer(id, !saved);
        this.renderVacancies();
    },

    async syncSavedVacancyToServer(id, isSaving) {
        const client = MEBVSUP.init();
        if (!client) return;
        const session = await client.auth.getSession();
        if (!session?.session?.user?.id) return;
        const userId = session.session.user.id;
        if (!isSaving) return;
        await client.from('saved_vacancies').insert({ user_id: userId, vacancy_id: id }).select();
    },

    async invokeViewCount(id) {
        const client = MEBVSUP.init();
        if (!client) return;
        await client.rpc('record_vacancy_view', { vacancy_row_id: id });
    },

    renderFeaturedSection() {
        const wrapper = document.getElementById('featured-vacancies');
        if (!wrapper || !this.vacancies) return;
        const featured = this.vacancies.filter(job => job.is_featured).slice(0, 3);
        wrapper.innerHTML = featured.length > 0
            ? featured.map(vacancy => `
                <div class="glass-card" style="padding:20px;">
                    <h4 style="color: var(--color-primary); margin-bottom:10px;">${vacancy.title}</h4>
                    <p style="color: var(--color-text-muted); margin-bottom:12px;">${vacancy.company}</p>
                    <p style="font-size:0.95rem;">${vacancy.description.substring(0, 90)}...</p>
                </div>
            `).join('')
            : '<div class="glass-card" style="padding:24px; text-align:center;">No featured vacancies currently available.</div>';
    },

    renderUrgentSection() {
        const wrapper = document.getElementById('urgent-vacancies');
        if (!wrapper || !this.vacancies) return;
        const urgent = this.vacancies.filter(job => job.is_urgent).slice(0, 2);
        wrapper.innerHTML = urgent.length > 0
            ? urgent.map(vacancy => `
                <div class="glass-card" style="padding:22px; border-left:4px solid var(--color-danger);">
                    <h4 style="color: var(--color-primary); margin-bottom:8px;">${vacancy.title}</h4>
                    <p style="color: var(--color-text-muted); margin-bottom:10px;">${vacancy.company}</p>
                    <span style="font-weight:700; color:var(--color-danger);">Deadline: ${new Date(vacancy.deadline).toLocaleDateString()}</span>
                </div>
            `).join('')
            : '<div class="glass-card" style="padding:24px; text-align:center;">No urgent vacancies posted yet.</div>';
    },

    showModal(title, content, actions = '') {
        const modalId = 'mebv-dynamic-modal';
        const existing = document.getElementById(modalId);
        if (existing) existing.remove();
        const markup = `
            <div id="${modalId}" class="modal-backdrop" style="position:fixed;inset:0;background:rgba(10,25,49,0.6);display:flex;align-items:center;justify-content:center;z-index:10000;">
                <div class="glass-card" style="max-width:600px;width:90%;padding:28px;">
                    <h3 style="margin-bottom:16px;color:var(--color-primary);">${title}</h3>
                    <div style="color:var(--color-text-dark);line-height:1.7;margin-bottom:24px;">${content}</div>
                    <div style="display:flex;justify-content:flex-end;gap:12px;flex-wrap:wrap;">${actions || '<button class="btn btn-primary" onclick="document.getElementById(\'mebv-dynamic-modal\').remove()">Close</button>'}</div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', markup);
    }
};

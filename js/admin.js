window.AdminPanel = {
    state: {
        section: 'dashboard',
        currentAdmin: null,
        currentItem: null,
        modalMode: 'create',
        confirmCallback: null,
        search: '',
        filter: '',
        auditDate: ''
    },

    config: {
        dashboard: { title: 'Dashboard' },
        books: {
            title: 'Books',
            table: 'books',
            searchFields: ['title', 'author', 'category', 'description'],
            filterField: 'category',
            fields: [
                { name: 'title', label: 'Book Title', type: 'text', required: true },
                { name: 'author', label: 'Author', type: 'text' },
                { name: 'category', label: 'Category', type: 'select', options: ['MSCE Books', 'JCE Books', 'Primary Books', 'Nursing Books', 'Novels', 'Past Papers', 'Others'], required: true },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'file_url', label: 'Google Drive Link (Optional)', type: 'text', placeholder: 'https://drive.google.com/...' },
                { name: 'pdf_url', label: 'PDF URL', type: 'text', placeholder: 'https://...' },
                { name: 'pdf_file', label: 'Upload PDF', type: 'file', accept: '.pdf' },
                { name: 'cover_url', label: 'Cover Image URL', type: 'text', placeholder: 'https://...' },
                { name: 'cover_file', label: 'Upload Cover Image', type: 'file', accept: 'image/*' },
                { name: 'is_featured', label: 'Featured Book', type: 'checkbox' }
            ]
        },
        videos: {
            title: 'Videos',
            table: 'videos',
            searchFields: ['title', 'category', 'description'],
            filterField: 'category',
            fields: [
                { name: 'title', label: 'Video Title', type: 'text', required: true },
                { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Programming' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'youtube_url', label: 'YouTube URL', type: 'text', required: true, placeholder: 'https://www.youtube.com/watch?v=...' },
                { name: 'thumbnail_url', label: 'Thumbnail URL', type: 'text', placeholder: 'https://...' },
                { name: 'thumbnail_file', label: 'Upload Thumbnail', type: 'file', accept: 'image/*' },
                { name: 'is_featured', label: 'Featured Video', type: 'checkbox' }
            ]
        },
        lessons: {
            title: 'Python Lessons',
            table: 'python_lessons',
            searchFields: ['title', 'level', 'notes', 'examples'],
            filterField: 'level',
            fields: [
                { name: 'title', label: 'Lesson Title', type: 'text', required: true },
                { name: 'level', label: 'Level', type: 'select', options: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], required: true },
                { name: 'lesson_order', label: 'Lesson Order', type: 'number', required: true },
                { name: 'youtube_url', label: 'Video URL', type: 'text', required: true, placeholder: 'https://www.youtube.com/watch?v=...' },
                { name: 'notes', label: 'Notes', type: 'textarea' },
                { name: 'examples', label: 'Examples', type: 'textarea' },
                { name: 'quiz_questions', label: 'Quiz Questions (JSON)', type: 'json', placeholder: '[{"question":"...","options":["..."],"correct_answer":"..."}]' },
                { name: 'passing_score', label: 'Passing Score', type: 'number', placeholder: '70' },
                { name: 'is_premium', label: 'Premium Lesson', type: 'checkbox' }
            ]
        },
        vacancies: {
            title: 'Vacancies',
            table: 'vacancies',
            searchFields: ['title', 'company', 'category', 'description', 'requirements'],
            filterField: 'category',
            fields: [
                { name: 'company', label: 'Company', type: 'text', required: true },
                { name: 'title', label: 'Job Title', type: 'text', required: true },
                { name: 'category', label: 'Category', type: 'select', options: ['Government Jobs', 'NGO Jobs', 'Teaching Jobs', 'Nursing Jobs', 'Health Jobs', 'Banking Jobs', 'Engineering Jobs', 'IT Jobs', 'Scholarships', 'Internships', 'Attachments', 'Tenders', 'Others'], required: true },
                { name: 'description', label: 'Description', type: 'textarea', required: true },
                { name: 'requirements', label: 'Requirements', type: 'textarea' },
                { name: 'deadline', label: 'Deadline', type: 'datetime-local', required: true },
                { name: 'apply_url', label: 'Apply URL', type: 'text', placeholder: 'https://...' },
                { name: 'is_featured', label: 'Featured Vacancy', type: 'checkbox' },
                { name: 'is_urgent', label: 'Urgent Vacancy', type: 'checkbox' }
            ]
        },
        services: {
            title: 'Services',
            table: 'services',
            searchFields: ['title', 'category', 'description', 'price_range'],
            filterField: 'category',
            fields: [
                { name: 'title', label: 'Service Name', type: 'text', required: true },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Career Services' },
                { name: 'price_range', label: 'Price Range', type: 'text', placeholder: 'e.g. From MWK 15,000' },
                { name: 'is_featured', label: 'Featured Service', type: 'checkbox' }
            ]
        },
        blogs: {
            title: 'Blog Posts',
            table: 'blogs',
            searchFields: ['title', 'content', 'category'],
            filterField: 'category',
            fields: [
                { name: 'title', label: 'Title', type: 'text', required: true },
                { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Learning' },
                { name: 'content', label: 'Content', type: 'textarea', required: true },
                { name: 'cover_url', label: 'Featured Image URL', type: 'text', placeholder: 'https://...' },
                { name: 'cover_file', label: 'Upload Featured Image', type: 'file', accept: 'image/*' },
                { name: 'is_featured', label: 'Featured Post', type: 'checkbox' }
            ]
        },
        ads: {
            title: 'Advertisements',
            table: 'advertisements',
            searchFields: ['title', 'target_url', 'type'],
            filterField: 'is_active',
            fields: [
                { name: 'title', label: 'Ad Title', type: 'text', required: true },
                { name: 'banner_url', label: 'Banner Image URL', type: 'text', placeholder: 'https://...' },
                { name: 'banner_file', label: 'Upload Banner Image', type: 'file', accept: 'image/*' },
                { name: 'target_url', label: 'Link URL', type: 'text', placeholder: 'https://...' },
                { name: 'type', label: 'Ad Type', type: 'select', options: ['banner', 'image', 'video'], required: true },
                { name: 'start_date', label: 'Start Date', type: 'datetime-local', required: true },
                { name: 'end_date', label: 'End Date', type: 'datetime-local', required: true },
                { name: 'is_active', label: 'Active', type: 'checkbox' }
            ]
        },
        users: {
            title: 'Users'
        },
        payments: {
            title: 'Payments'
        },
        audit: {
            title: 'Audit Logs'
        }
    },

    async init() {
        const client = MEBVSUP.init();
        if (!client) return;
        const user = await AuthManager.requireAdmin();
        if (!user) return;
        this.state.currentAdmin = user;
        this.bindEvents();
        await this.refreshDashboard();
    },

    bindEvents() {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', event => {
                const section = event.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        const addButton = document.getElementById('admin-add-button');
        if (addButton) {
            addButton.addEventListener('click', () => {
                if (this.state.section !== 'dashboard') {
                    this.openModal(this.state.section);
                }
            });
        }

        document.getElementById('admin-modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('admin-confirm-cancel').addEventListener('click', () => this.closeConfirm());
        document.getElementById('admin-confirm-yes').addEventListener('click', async () => {
            if (typeof this.state.confirmCallback === 'function') {
                await this.state.confirmCallback();
            }
            this.closeConfirm();
        });

        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', event => {
                const section = event.currentTarget.dataset.action;
                this.switchSection(section);
                this.openModal(section);
            });
        });

        ['books', 'videos', 'lessons', 'vacancies', 'services', 'blogs', 'ads', 'users', 'payments', 'audit'].forEach(section => {
            const search = document.getElementById(`${section}-search`);
            const filter = document.getElementById(`${section}-filter`);
            if (search) {
                search.addEventListener('input', () => this.reloadCurrentSection());
            }
            if (filter) {
                filter.addEventListener('change', () => this.reloadCurrentSection());
            }
        });

        const auditDate = document.getElementById('audit-date-filter');
        if (auditDate) {
            auditDate.addEventListener('change', event => {
                this.state.auditDate = event.target.value;
                this.reloadCurrentSection();
            });
        }
    },

    async switchSection(section) {
        if (!this.config[section]) return;
        this.state.section = section;
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });
        document.querySelectorAll('.admin-section').forEach(sectionNode => {
            sectionNode.classList.toggle('active', sectionNode.id === `${section}-section`);
        });
        document.getElementById('admin-page-title').innerText = this.config[section].title || 'Dashboard';
        document.getElementById('admin-page-subtitle').innerText = section === 'dashboard' ? 'A complete admin CMS for managing books, videos, lessons, vacancies, services, blogs, ads, users, payments, and audit data.' : `Manage ${this.config[section].title || section} records and settings.`;
        const showAdd = ['books', 'videos', 'lessons', 'vacancies', 'services', 'blogs', 'ads'].includes(section);
        const addButton = document.getElementById('admin-add-button');
        if (addButton) {
            if (showAdd) {
                addButton.classList.remove('hidden');
                addButton.innerText = `Add ${this.config[section].title}`;
            } else {
                addButton.classList.add('hidden');
            }
        }
        await this.reloadCurrentSection();
    },

    async refreshDashboard() {
        await this.loadOverview();
        await this.updateDashboardMetrics();
        await this.loadRecentActivity();
    },

    async loadOverview() {
        const client = MEBVSUP.init();
        if (!client) return;
        const tables = ['books', 'videos', 'python_lessons', 'vacancies', 'services', 'payments', 'advertisements', 'profiles', 'audit_logs'];
        const panels = ['books', 'videos', 'lessons', 'vacancies', 'services', 'payments', 'ads', 'users', 'audit'];
        const queries = tables.map(table => client.from(table).select('id', { count: 'exact' }));
        const results = await Promise.all(queries);
        results.forEach((result, index) => {
            const count = result?.[0]?.count || 0;
            const panel = panels[index];
            const element = document.getElementById(`admin-count-${panel}`);
            if (element) element.innerText = count;
        });
    },

    async updateDashboardMetrics() {
        const client = MEBVSUP.init();
        if (!client) return;
        const [usersRes, booksRes, videosRes, vacanciesRes, servicesRes, booksDownloads, paymentsRes, recentAuditRes] = await Promise.all([
            client.from('profiles').select('id', { count: 'exact' }),
            client.from('books').select('id', { count: 'exact' }),
            client.from('videos').select('id', { count: 'exact' }),
            client.from('vacancies').select('id', { count: 'exact' }),
            client.from('services').select('id', { count: 'exact' }),
            client.from('books').select('download_count'),
            client.from('payments').select('amount').eq('status', 'approved'),
            client.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(8)
        ]);

        const totalUsers = usersRes?.[0]?.count || 0;
        const totalBooks = booksRes?.[0]?.count || 0;
        const totalVideos = videosRes?.[0]?.count || 0;
        const totalVacancies = vacanciesRes?.[0]?.count || 0;
        const totalServices = servicesRes?.[0]?.count || 0;
        const totalDownloads = (booksDownloads?.data || []).reduce((sum, book) => sum + Number(book.download_count || 0), 0);
        const totalRevenue = (paymentsRes?.data || []).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
        const activityCount = recentAuditRes?.data?.length || 0;

        document.getElementById('metric-users').innerText = totalUsers;
        document.getElementById('metric-books').innerText = totalBooks;
        document.getElementById('metric-videos').innerText = totalVideos;
        document.getElementById('metric-vacancies').innerText = totalVacancies;
        document.getElementById('metric-services').innerText = totalServices;
        document.getElementById('metric-downloads').innerText = totalDownloads;
        document.getElementById('metric-revenue').innerText = `MWK ${totalRevenue.toLocaleString()}`;
        document.getElementById('metric-activity').innerText = `${activityCount} recent events`;

        const activityContainer = document.getElementById('dashboard-activity');
        if (activityContainer) {
            activityContainer.innerHTML = (recentAuditRes?.data || []).map(entry => `
                <div class="admin-card">
                    <strong>${entry.action}</strong>
                    <p style="margin: 10px 0 0 0; color:#aab8d6; font-size:0.94rem;">${entry.details || 'No details provided.'}</p>
                    <span style="display:block; margin-top:10px; color:#7da4ff; font-size:0.84rem;">${new Date(entry.created_at).toLocaleString()}</span>
                </div>
            `).join('') || '<p style="color:#8da1c3;">No activity found.</p>';
        }
    },

    async loadRecentActivity() {
        const client = MEBVSUP.init();
        if (!client) return;
        const { data } = await client.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(6);
        const container = document.getElementById('admin-activity-list');
        if (!container) return;
        if (!data || data.length === 0) {
            container.innerHTML = '<p style="color: #8da1c3;">No administrative events logged yet.</p>';
            return;
        }
        container.innerHTML = data.map(item => `
            <div class="admin-card">
                <strong>${item.action}</strong>
                <p style="margin: 10px 0 0 0; color:#aab8d6;">${item.details || 'No additional details.'}</p>
                <span style="display:block; margin-top:10px; color:#7da4ff; font-size:0.84rem;">${new Date(item.created_at).toLocaleString()}</span>
            </div>
        `).join('');
    },

    async reloadCurrentSection() {
        const section = this.state.section;
        const searchInput = document.getElementById(`${section}-search`);
        const filterInput = document.getElementById(`${section}-filter`);
        if (searchInput) this.state.search = searchInput.value.trim();
        if (filterInput) this.state.filter = filterInput.value;
        if (section === 'audit') {
            this.state.search = document.getElementById('audit-search')?.value.trim() || '';
            this.state.filter = '';
        }
        await this.loadSection(section);
    },

    async loadSection(section) {
        switch (section) {
            case 'dashboard':
                await this.refreshDashboard();
                return;
            case 'books':
                return this.loadBooks();
            case 'videos':
                return this.loadVideos();
            case 'lessons':
                return this.loadLessons();
            case 'vacancies':
                return this.loadVacancies();
            case 'services':
                return this.loadServices();
            case 'blogs':
                return this.loadBlogs();
            case 'ads':
                return this.loadAds();
            case 'users':
                return this.loadUsers();
            case 'payments':
                return this.loadPayments();
            case 'audit':
                return this.loadAuditLogs();
            default:
                return;
        }
    },

    async loadBooks() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('books').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load books.');
        const items = this.applySearchAndFilter(data || [], 'books');
        this.renderTable('books', items);
    },

    async loadVideos() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('videos').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load videos.');
        const items = this.applySearchAndFilter(data || [], 'videos');
        this.renderTable('videos', items);
    },

    async loadLessons() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('python_lessons').select('*').order('lesson_order', { ascending: true });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load lessons.');
        const items = this.applySearchAndFilter(data || [], 'lessons');
        this.renderTable('lessons', items);
    },

    async loadVacancies() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('vacancies').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load vacancies.');
        const items = this.applySearchAndFilter(data || [], 'vacancies');
        this.renderTable('vacancies', items);
    },

    async loadServices() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('services').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load services.');
        const items = this.applySearchAndFilter(data || [], 'services');
        this.renderTable('services', items);
    },

    async loadBlogs() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('blogs').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load blog posts.');
        const items = this.applySearchAndFilter(data || [], 'blogs');
        this.renderTable('blogs', items);
    },

    async loadAds() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('advertisements').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load advertisements.');
        const items = this.applySearchAndFilter(data || [], 'ads');
        this.renderTable('ads', items);
    },

    async loadUsers() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('profiles').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load users.');
        const items = (data || []).filter(user => {
            const term = this.state.search.toLowerCase();
            if (!term && !this.state.filter) return true;
            const matchesSearch = term === '' || [user.full_name, user.phone_number, user.role, user.id].some(value => String(value || '').toLowerCase().includes(term));
            const matchesFilter = !this.state.filter || user.role === this.state.filter;
            return matchesSearch && matchesFilter;
        });
        this.renderUsers(items);
    },

    async loadPayments() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('payments').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load payments.');
        const items = (data || []).filter(payment => {
            const term = this.state.search.toLowerCase();
            if (!term && !this.state.filter) return true;
            const matchesSearch = term === '' || [payment.user_id, payment.method, payment.status, payment.plan_type].some(value => String(value || '').toLowerCase().includes(term));
            const matchesFilter = !this.state.filter || payment.status === this.state.filter;
            return matchesSearch && matchesFilter;
        });
        this.renderPayments(items);
    },

    async loadAuditLogs() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        let query = client.from('audit_logs').select('*').order('created_at', { ascending: false });
        if (this.state.auditDate) {
            const start = `${this.state.auditDate}T00:00:00Z`;
            const end = `${this.state.auditDate}T23:59:59Z`;
            query = query.gte('created_at', start).lte('created_at', end);
        }
        const { data, error } = await query;
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load audit logs.');
        const items = (data || []).filter(entry => {
            const term = this.state.search.toLowerCase();
            if (!term) return true;
            return [entry.action, entry.details, entry.user_id].some(value => String(value || '').toLowerCase().includes(term));
        });
        this.renderAudit(items);
    },

    applySearchAndFilter(items, section) {
        const config = this.config[section];
        return (items || []).filter(item => {
            const term = this.state.search.toLowerCase();
            const passesSearch = !term || config.searchFields.some(field => String(item[field] || '').toLowerCase().includes(term));
            const passesFilter = !this.state.filter || String(item[config.filterField] || '').toLowerCase() === String(this.state.filter).toLowerCase();
            return passesSearch && passesFilter;
        });
    },

    renderTable(section, items) {
        const container = document.getElementById(`${section}-table-container`);
        if (!container) return;
        if (!items || items.length === 0) {
            container.innerHTML = '<p style="color:#aab8d6; margin-top:18px;">No records found.</p>';
            return;
        }
        const headers = this.getTableHeaders(section);
        const rows = items.map(item => this.buildRow(section, item)).join('');
        container.innerHTML = `
            <div style="overflow-x:auto; margin-top:18px;">
                <table class="admin-table">
                    <thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
        this.attachRowListeners(section);
    },

    getTableHeaders(section) {
        switch (section) {
            case 'books': return ['Title', 'Author', 'Category', 'Featured', 'PDF', 'Created', 'Actions'];
            case 'videos': return ['Title', 'Category', 'Featured', 'YouTube', 'Thumbnail', 'Created', 'Actions'];
            case 'lessons': return ['Lesson', 'Level', 'Order', 'Premium', 'Video', 'Created', 'Actions'];
            case 'vacancies': return ['Job Title', 'Company', 'Category', 'Deadline', 'Featured', 'Urgent', 'Actions'];
            case 'services': return ['Service', 'Category', 'Price', 'Featured', 'Created', 'Actions'];
            case 'blogs': return ['Title', 'Category', 'Featured', 'Created', 'Actions'];
            case 'ads': return ['Title', 'Type', 'Active', 'Start', 'End', 'Actions'];
            default: return ['Item', 'Details', 'Actions'];
        }
    },

    buildRow(section, item) {
        switch (section) {
            case 'books':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.author || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${item.pdf_url ? `<a href="${item.pdf_url}" target="_blank" style="color:#7dc6ff;">Open</a>` : '-'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('books', item.id)}</td>
                </tr>`;
            case 'videos':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${item.youtube_id ? `<a href="https://youtu.be/${item.youtube_id}" target="_blank" style="color:#7dc6ff;">Watch</a>` : '-'}</td>
                    <td>${item.thumbnail_url ? `<a href="${item.thumbnail_url}" target="_blank" style="color:#7dc6ff;">View</a>` : '-'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('videos', item.id)}</td>
                </tr>`;
            case 'lessons':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.level || ''}</td>
                    <td>${item.lesson_order || ''}</td>
                    <td>${item.is_premium ? 'Yes' : 'No'}</td>
                    <td>${item.youtube_id ? `<a href="https://youtu.be/${item.youtube_id}" target="_blank" style="color:#7dc6ff;">Watch</a>` : '-'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('lessons', item.id)}</td>
                </tr>`;
            case 'vacancies':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.company || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${this.formatDate(item.deadline)}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${item.is_urgent ? 'Yes' : 'No'}</td>
                    <td>${this.actionButtons('vacancies', item.id)}</td>
                </tr>`;
            case 'services':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${item.price_range || ''}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('services', item.id)}</td>
                </tr>`;
            case 'blogs':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.category || 'General'}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('blogs', item.id)}</td>
                </tr>`;
            case 'ads':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.type || ''}</td>
                    <td>${item.is_active ? '<span class="status-chip status-active">Active</span>' : '<span class="status-chip status-inactive">Inactive</span>'}</td>
                    <td>${this.formatDate(item.start_date)}</td>
                    <td>${this.formatDate(item.end_date)}</td>
                    <td>${this.actionButtons('ads', item.id)}</td>
                </tr>`;
            default:
                return `<tr><td colspan="7">No preview available.</td></tr>`;
        }
    },

    actionButtons(section, id) {
        return `
            <button class="btn btn-secondary admin-edit-button" data-section="${section}" data-id="${id}">Edit</button>
            <button class="btn btn-danger admin-delete-button" data-section="${section}" data-id="${id}">Delete</button>
        `;
    },

    attachRowListeners(section) {
        document.querySelectorAll(`.admin-edit-button[data-section="${section}"]`).forEach(button => {
            button.addEventListener('click', async event => {
                const id = event.currentTarget.dataset.id;
                await this.openEditModal(section, id);
            });
        });
        document.querySelectorAll(`.admin-delete-button[data-section="${section}"]`).forEach(button => {
            button.addEventListener('click', event => {
                const id = event.currentTarget.dataset.id;
                this.confirmAction('Delete record', 'This action cannot be undone. Continue?', async () => {
                    await this.deleteEntity(section, id);
                });
            });
        });
    },

    async openEditModal(section, id) {
        const client = MEBVSUP.init();
        if (!client) return;
        const config = this.config[section];
        const { data, error } = await client.from(config.table).select('*').eq('id', id).single();
        if (error || !data) return this.showMessage('error', `Unable to load ${config.title || section} for editing.`);
        await this.openModal(section, data);
    },

    async openModal(section, item = null) {
        const config = this.config[section];
        if (!config || !config.fields) return;
        this.state.modalMode = item ? 'edit' : 'create';
        this.state.currentItem = item;
        const title = item ? `Edit ${config.title}` : `Add ${config.title}`;
        document.getElementById('admin-modal-title').innerText = title;
        const form = document.getElementById('admin-modal-form');
        form.innerHTML = this.buildForm(section, item);
        form.addEventListener('submit', event => this.handleSubmit(event, section));
        document.getElementById('admin-modal').classList.remove('hidden');
        document.getElementById('admin-modal').scrollTop = 0;
    },

    buildForm(section, item) {
        const config = this.config[section];
        return config.fields.map(field => {
            const value = item ? item[field.name] : '';
            const required = field.required ? 'required' : '';
            const checked = field.type === 'checkbox' && value ? 'checked' : '';
            const fieldValue = field.type === 'datetime-local' && value ? this.toDateTimeLocal(value) : value || '';
            switch (field.type) {
                case 'textarea':
                    return `<div class="form-row full"><label class="form-label">${field.label}</label><textarea name="${field.name}" class="form-control" ${required} placeholder="${field.placeholder || ''}">${fieldValue}</textarea></div>`;
                case 'select':
                    return `
                        <div class="form-row full">
                            <label class="form-label">${field.label}</label>
                            <select name="${field.name}" class="form-control" ${required}>
                                <option value="">Select ${field.label}</option>
                                ${field.options.map(option => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`).join('')}
                            </select>
                        </div>
                    `;
                case 'checkbox':
                    return `
                        <div class="form-row full" style="align-items:center; gap: 10px;">
                            <label class="form-label" style="margin-bottom:0;">${field.label}</label>
                            <input type="checkbox" name="${field.name}" ${checked}>
                        </div>
                    `;
                case 'file':
                    return `
                        <div class="form-row full">
                            <label class="form-label">${field.label}</label>
                            <input type="file" name="${field.name}" class="form-control" accept="${field.accept || '*/*'}">
                            ${item && item[field.name.replace('_file', '_url')] ? `<span class="form-note">Current: <a href="${item[field.name.replace('_file', '_url')]}" target="_blank" style="color:#7dc6ff;">View existing</a></span>` : ''}
                        </div>
                    `;
                case 'json':
                    return `<div class="form-row full"><label class="form-label">${field.label}</label><textarea name="${field.name}" class="form-control" placeholder="${field.placeholder || ''}" rows="6">${value ? JSON.stringify(value, null, 2) : ''}</textarea><p class="form-note">Provide quiz questions as JSON array of objects with question, options, and correct_answer keys.</p></div>`;
                case 'number':
                case 'datetime-local':
                    return `<div class="form-row full"><label class="form-label">${field.label}</label><input type="${field.type}" name="${field.name}" value="${fieldValue}" class="form-control" ${required} placeholder="${field.placeholder || ''}"></div>`;
                default:
                    return `<div class="form-row full"><label class="form-label">${field.label}</label><input type="${field.type}" name="${field.name}" value="${fieldValue}" class="form-control" ${required} placeholder="${field.placeholder || ''}"></div>`;
            }
        }).join('') + `
            <div class="modal-actions">
                <button type="button" class="btn btn-outline" id="admin-modal-close">Cancel</button>
                <button type="submit" class="btn btn-primary">${this.state.modalMode === 'edit' ? 'Save Changes' : 'Create Record'}</button>
            </div>
        `;
    },

    async handleSubmit(event, section) {
        event.preventDefault();
        const form = event.target;
        const config = this.config[section];
        const values = {};
        const files = {};

        config.fields.forEach(field => {
            const input = form.querySelector(`[name="${field.name}"]`);
            if (!input) return;
            if (field.type === 'checkbox') {
                values[field.name] = input.checked;
                return;
            }
            if (field.type === 'file') {
                if (input.files && input.files.length) {
                    files[field.name] = input.files[0];
                }
                return;
            }
            if (field.type === 'json') {
                const text = input.value.trim();
                try {
                    values[field.name] = text ? JSON.parse(text) : [];
                } catch (err) {
                    return this.showMessage('error', 'Quiz JSON is not valid.');
                }
                return;
            }
            values[field.name] = input.value;
        });

        await this.saveEntity(section, values, files);
    },

    async saveEntity(section, values, files) {
        const client = MEBVSUP.init();
        if (!client) return;
        const config = this.config[section];
        const payload = { ...values };

        if (section === 'videos' || section === 'lessons') {
            if (payload.youtube_url) {
                const id = this.parseYouTubeId(payload.youtube_url);
                if (!id) return this.showMessage('error', 'Invalid YouTube URL.');
                payload.youtube_id = id;
            }
            delete payload.youtube_url;
        }

        if (section === 'books') {
            if (payload.pdf_url === '') delete payload.pdf_url;
            if (payload.cover_url === '') delete payload.cover_url;
            if (payload.file_url === '') delete payload.file_url;
            if (payload.file_url) {
                const normalized = this.normalizeGoogleDriveDownloadLink(payload.file_url);
                if (!normalized) return this.showMessage('error', 'Invalid Google Drive link');
                payload.file_url = normalized;
            }
        }

        if (section === 'blogs') {
            if (!payload.category) payload.category = 'General';
        }

        if (files.pdf_file) {
            payload.pdf_url = await this.uploadAsset('cms-assets', `books/${Date.now()}_${files.pdf_file.name}`, files.pdf_file);
        }
        if (files.cover_file) {
            payload.cover_url = await this.uploadAsset('cms-assets', `${section}/${Date.now()}_${files.cover_file.name}`, files.cover_file);
        }
        if (files.thumbnail_file) {
            payload.thumbnail_url = await this.uploadAsset('cms-assets', `videos/${Date.now()}_${files.thumbnail_file.name}`, files.thumbnail_file);
        }
        if (files.banner_file) {
            payload.banner_url = await this.uploadAsset('cms-assets', `ads/${Date.now()}_${files.banner_file.name}`, files.banner_file);
        }

        if (section === 'lessons') {
            if (payload.quiz_questions && !Array.isArray(payload.quiz_questions)) {
                this.showMessage('error', 'Quiz questions must be a JSON array.');
                return;
            }
            if (payload.passing_score !== undefined && payload.passing_score !== '') {
                payload.passing_score = Number(payload.passing_score);
                if (Number.isNaN(payload.passing_score)) {
                    this.showMessage('error', 'Passing score must be a number.');
                    return;
                }
            }
        }

        const sanitized = this.sanitizePayload(section, payload);
        let result;
        if (this.state.modalMode === 'edit') {
            result = await client.from(config.table).update(sanitized).eq('id', this.state.currentItem.id);
        } else {
            result = await client.from(config.table).insert(sanitized);
        }
        this.setLoading(true);
        const { error } = result;
        this.setLoading(false);
        if (error) {
            return this.showMessage('error', `Failed to save ${config.title}.`);
        }
        this.showMessage('success', `${config.title} saved successfully.`);
        await this.logAudit(`${this.state.modalMode === 'edit' ? 'Updated' : 'Created'} ${config.title}`, `${sanitized.title || sanitized.name || sanitized.company || 'Record'} ${this.state.modalMode === 'edit' ? 'updated' : 'created'} by admin.`);
        this.closeModal();
        await this.reloadCurrentSection();
        await this.loadOverview();
        await this.updateDashboardMetrics();
    },

    sanitizePayload(section, payload) {
        const sanitized = { ...payload };
        const config = this.config[section];
        config.fields.forEach(field => {
            if (field.type === 'file') {
                delete sanitized[field.name];
            }
        });
        if (section === 'lessons') {
            if (typeof sanitized.is_premium === 'undefined') sanitized.is_premium = false;
        }
        if (section === 'ads') {
            if (sanitized.start_date) sanitized.start_date = new Date(sanitized.start_date).toISOString();
            if (sanitized.end_date) sanitized.end_date = new Date(sanitized.end_date).toISOString();
        }
        if (section === 'vacancies') {
            if (sanitized.deadline) sanitized.deadline = new Date(sanitized.deadline).toISOString();
        }
        return sanitized;
    },

    parseYouTubeId(url) {
        if (!url) return null;
        const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    },

    extractGoogleDriveFileId(url) {
        if (!url) return null;
        let normalized = url.trim();
        if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(normalized)) {
            normalized = `https://${normalized}`;
        }
        try {
            const parsed = new URL(normalized);
            const hostname = parsed.hostname.toLowerCase();
            if (!['drive.google.com', 'docs.google.com'].includes(hostname)) {
                return null;
            }
            const patterns = [
                /https?:\/\/drive\.google\.com\/file\/d\/([^\/\?]+)(?:\/view)?/i,
                /https?:\/\/drive\.google\.com\/open\?id=([^&]+)/i,
                /https?:\/\/drive\.google\.com\/uc\?id=([^&]+)/i,
                /https?:\/\/docs\.google\.com\/.*\/d\/([^\/\?]+)(?:\/.*)?/i
            ];
            for (const pattern of patterns) {
                const match = normalized.match(pattern);
                if (match && match[1]) return match[1];
            }
            return null;
        } catch (err) {
            return null;
        }
    },

    normalizeGoogleDriveDownloadLink(url) {
        const fileId = this.extractGoogleDriveFileId(url);
        if (!fileId) return null;
        return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
    },

    async uploadAsset(bucket, path, file) {
        if (!file) return null;
        const client = MEBVSUP.init();
        if (!client) return null;
        const { data, error } = await client.storage.from(bucket).upload(path, file, { cacheControl: '3600', upsert: true });
        if (error) {
            this.showMessage('error', `Storage upload failed: ${error.message}`);
            throw error;
        }
        const { data: publicData } = await client.storage.from(bucket).getPublicUrl(path);
        return publicData?.publicUrl || null;
    },

    formatDate(value) {
        if (!value) return '-';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return date.toLocaleString();
    },

    toDateTimeLocal(value) {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        const offset = date.getTimezoneOffset();
        const local = new Date(date.getTime() - offset * 60000);
        return local.toISOString().slice(0, 16);
    },

    closeModal() {
        document.getElementById('admin-modal').classList.add('hidden');
        const form = document.getElementById('admin-modal-form');
        if (form) form.innerHTML = '';
        this.state.currentItem = null;
    },

    confirmAction(title, message, callback) {
        document.getElementById('admin-confirm-title').innerText = title;
        document.getElementById('admin-confirm-message').innerText = message;
        this.state.confirmCallback = callback;
        document.getElementById('admin-confirm-modal').classList.remove('hidden');
    },

    closeConfirm() {
        document.getElementById('admin-confirm-modal').classList.add('hidden');
        this.state.confirmCallback = null;
    },

    async deleteEntity(section, id) {
        const client = MEBVSUP.init();
        const config = this.config[section];
        if (!client || !config) return;
        this.setLoading(true);
        const { error } = await client.from(config.table).delete().eq('id', id);
        this.setLoading(false);
        if (error) return this.showMessage('error', `Failed to delete ${config.title}.`);
        this.showMessage('success', `${config.title} deleted successfully.`);
        await this.logAudit(`Deleted ${config.title}`, `Deleted record ${id}`);
        await this.reloadCurrentSection();
        await this.loadOverview();
        await this.updateDashboardMetrics();
    },

    renderUsers(users) {
        const container = document.getElementById('users-table-container');
        if (!container) return;
        if (!users || users.length === 0) {
            container.innerHTML = '<p style="color:#aab8d6; margin-top:18px;">No users found.</p>';
            return;
        }
        const rows = users.map(user => `
            <tr>
                <td>${user.full_name || 'Anonymous'}</td>
                <td>${user.id}</td>
                <td>${user.phone_number || '-'}</td>
                <td>${user.role || 'guest'}</td>
                <td>${user.download_count || 0}</td>
                <td>${this.formatDate(user.created_at)}</td>
                <td>
                    <select data-user-id="${user.id}" class="form-control role-selector" style="min-width:140px; margin-bottom:8px;">
                        ${['super_admin','admin','content_manager','moderator','registered_user','guest'].map(role => `<option value="${role}" ${user.role === role ? 'selected' : ''}>${role}</option>`).join('')}
                    </select>
                    <button class="btn btn-secondary admin-user-toggle" data-user-id="${user.id}" data-current-role="${user.role}">${user.role === 'guest' ? 'Reactivate' : 'Suspend'}</button>
                </td>
            </tr>
        `).join('');
        container.innerHTML = `
            <div style="overflow-x:auto; margin-top:18px;">
                <table class="admin-table">
                    <thead><tr><th>Name</th><th>User ID</th><th>Phone</th><th>Role</th><th>Downloads</th><th>Created</th><th>Actions</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
        this.attachUserActions();
    },

    attachUserActions() {
        document.querySelectorAll('.role-selector').forEach(select => {
            select.addEventListener('change', async event => {
                const userId = event.currentTarget.dataset.userId;
                const role = event.currentTarget.value;
                await this.updateUserRole(userId, role);
            });
        });
        document.querySelectorAll('.admin-user-toggle').forEach(button => {
            button.addEventListener('click', async event => {
                const userId = event.currentTarget.dataset.userId;
                const currentRole = event.currentTarget.dataset.currentRole;
                const newRole = currentRole === 'guest' ? 'registered_user' : 'guest';
                await this.updateUserRole(userId, newRole, currentRole === 'guest' ? 'Reactivated user' : 'Suspended user');
            });
        });
    },

    async updateUserRole(userId, role, actionLabel) {
        const client = MEBVSUP.init();
        this.setLoading(true);
        const { error } = await client.from('profiles').update({ role }).eq('id', userId);
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to update user role.');
        this.showMessage('success', `User role updated to ${role}.`);
        await this.logAudit(actionLabel || 'Changed user role', `User ${userId} changed to ${role}`);
        await this.loadUsers();
        await this.loadOverview();
        await this.updateDashboardMetrics();
    },

    renderPayments(payments) {
        const container = document.getElementById('payments-table-container');
        if (!container) return;
        if (!payments || payments.length === 0) {
            container.innerHTML = '<p style="color:#aab8d6; margin-top:18px;">No payments found.</p>';
            return;
        }
        const rows = payments.map(payment => `
            <tr>
                <td>${payment.user_id || '-'}</td>
                <td>${payment.plan_type || '-'}</td>
                <td>${payment.method || '-'}</td>
                <td>MWK ${Number(payment.amount || 0).toLocaleString()}</td>
                <td>${payment.status || '-'}</td>
                <td>${this.formatDate(payment.created_at)}</td>
                <td>
                    <a class="btn btn-secondary" href="${payment.proof_url || '#'}" target="_blank">Proof</a>
                    <button class="btn btn-success admin-payment-approve" data-id="${payment.id}" ${payment.status === 'approved' ? 'disabled' : ''}>Approve</button>
                    <button class="btn btn-danger admin-payment-reject" data-id="${payment.id}" ${payment.status === 'rejected' ? 'disabled' : ''}>Reject</button>
                </td>
            </tr>
        `).join('');
        container.innerHTML = `
            <div style="overflow-x:auto; margin-top:18px;">
                <table class="admin-table">
                    <thead><tr><th>User</th><th>Plan</th><th>Method</th><th>Amount</th><th>Status</th><th>Submitted</th><th>Actions</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
        this.attachPaymentActions();
    },

    attachPaymentActions() {
        document.querySelectorAll('.admin-payment-approve').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.currentTarget.dataset.id;
                this.openPaymentReview(id, 'approved');
            });
        });
        document.querySelectorAll('.admin-payment-reject').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.currentTarget.dataset.id;
                this.openPaymentReview(id, 'rejected');
            });
        });
    },

    async openPaymentReview(id, status) {
        const notes = window.prompt(`Add notes for ${status} payment (optional):`);
        if (notes === null) return;
        await this.updatePaymentStatus(id, status, notes);
    },

        async updatePaymentStatus(id, status, notes) {
        const client = MEBVSUP.init();
        if (!client) return;

        const { data: payment, error: paymentFetchError } = await client
            .from('payments')
            .select('user_id')
            .eq('id', id)
            .single();

        if (paymentFetchError || !payment) {
            this.showMessage('error', 'Payment record not found.');
            return;
        }

        const payload = { status };
        if (status === 'approved') payload.verified_at = new Date().toISOString();
        if (notes) payload.notes = notes;

        this.setLoading(true);
        const { error } = await client.from('payments').update(payload).eq('id', id);
        if (error) {
            this.setLoading(false);
            return this.showMessage('error', 'Unable to update payment status.');
        }

        if (status === 'approved') {
            const { error: profileErr } = await client.from('profiles').update({
                is_verified: true,
                is_premium: true,
                updated_at: new Date().toISOString()
            }).eq('id', payment.user_id);

            if (profileErr) {
                this.setLoading(false);
                return this.showMessage('error', 'Payment approved, but user verification update failed.');
            }
        }

        this.setLoading(false);
        this.showMessage('success', `Payment ${status}.`);
        await this.logAudit(`${status.charAt(0).toUpperCase() + status.slice(1)} payment`, `Payment ${id} ${status} by admin.`);
        await this.loadPayments();
        await this.updateDashboardMetrics();
    },
    renderAudit(records) {
        const container = document.getElementById('audit-table-container');
        if (!container) return;
        if (!records || records.length === 0) {
            container.innerHTML = '<p style="color:#aab8d6; margin-top:18px;">No audit logs found.</p>';
            return;
        }
        const rows = records.map(entry => `
            <tr>
                <td>${entry.user_id || '-'}</td>
                <td>${entry.action || '-'}</td>
                <td>${entry.details || '-'}</td>
                <td>${this.formatDate(entry.created_at)}</td>
            </tr>
        `).join('');
        container.innerHTML = `
            <div style="overflow-x:auto; margin-top:18px;">
                <table class="admin-table">
                    <thead><tr><th>User</th><th>Action</th><th>Details</th><th>Created</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    async logAudit(action, details) {
        const client = MEBVSUP.init();
        if (!client || !this.state.currentAdmin) return;
        await client.from('audit_logs').insert({
            user_id: this.state.currentAdmin.id,
            action,
            details: details || '',
            created_at: new Date().toISOString()
        });
    },

    showMessage(type, message) {
        const toast = document.getElementById('admin-toast');
        if (!toast) return;
        toast.innerText = message;
        toast.classList.add('visible');
        toast.style.background = type === 'error' ? 'rgba(216, 84, 75, 0.95)' : 'rgba(35, 96, 175, 0.92)';
        setTimeout(() => toast.classList.remove('visible'), 4400);
    },

    setLoading(show) {
        const loader = document.getElementById('admin-loading');
        if (!loader) return;
        loader.classList.toggle('hidden', !show);
    }
};
window.AdminPanel = {
    state: {
        section: 'dashboard',
        currentAdmin: null,
        currentItem: null,
        modalMode: 'create',
        confirmCallback: null,
        search: '',
        filter: '',
        auditDate: ''
    },

    config: {
        dashboard: { title: 'Dashboard' },
        books: {
            title: 'Books',
            table: 'books',
            searchFields: ['title', 'author', 'category', 'description'],
            filterField: 'category',
            fields: [
                { name: 'title', label: 'Book Title', type: 'text', required: true },
                { name: 'author', label: 'Author', type: 'text' },
                { name: 'category', label: 'Category', type: 'select', options: ['MSCE Books', 'JCE Books', 'Primary Books', 'Nursing Books', 'Novels', 'Past Papers', 'Others'], required: true },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'file_url', label: 'Google Drive Link (Optional)', type: 'text', placeholder: 'https://drive.google.com/...' },
                { name: 'pdf_url', label: 'PDF URL', type: 'text', placeholder: 'https://...' },
                { name: 'pdf_file', label: 'Upload PDF', type: 'file', accept: '.pdf' },
                { name: 'cover_url', label: 'Cover Image URL', type: 'text', placeholder: 'https://...' },
                { name: 'cover_file', label: 'Upload Cover Image', type: 'file', accept: 'image/*' },
                { name: 'is_featured', label: 'Featured Book', type: 'checkbox' }
            ]
        },
        videos: {
            title: 'Videos',
            table: 'videos',
            searchFields: ['title', 'category', 'description'],
            filterField: 'category',
            fields: [
                { name: 'title', label: 'Video Title', type: 'text', required: true },
                { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Programming' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'youtube_url', label: 'YouTube URL', type: 'text', required: true, placeholder: 'https://www.youtube.com/watch?v=...' },
                { name: 'thumbnail_url', label: 'Thumbnail URL', type: 'text', placeholder: 'https://...' },
                { name: 'thumbnail_file', label: 'Upload Thumbnail', type: 'file', accept: 'image/*' },
                { name: 'is_featured', label: 'Featured Video', type: 'checkbox' }
            ]
        },
        lessons: {
            title: 'Python Lessons',
            table: 'python_lessons',
            searchFields: ['title', 'level', 'notes', 'examples'],
            filterField: 'level',
            fields: [
                { name: 'title', label: 'Lesson Title', type: 'text', required: true },
                { name: 'level', label: 'Level', type: 'select', options: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], required: true },
                { name: 'lesson_order', label: 'Lesson Order', type: 'number', required: true },
                { name: 'youtube_url', label: 'Video URL', type: 'text', required: true, placeholder: 'https://www.youtube.com/watch?v=...' },
                { name: 'notes', label: 'Notes', type: 'textarea' },
                { name: 'examples', label: 'Examples', type: 'textarea' },
                { name: 'quiz_questions', label: 'Quiz Questions (JSON)', type: 'json', placeholder: '[{"question":"...","options":["..."],"correct_answer":"..."}]' },
                { name: 'passing_score', label: 'Passing Score', type: 'number', placeholder: '70' },
                { name: 'is_premium', label: 'Premium Lesson', type: 'checkbox' }
            ]
        },
        vacancies: {
            title: 'Vacancies',
            table: 'vacancies',
            searchFields: ['title', 'company', 'category', 'description', 'requirements'],
            filterField: 'category',
            fields: [
                { name: 'company', label: 'Company', type: 'text', required: true },
                { name: 'title', label: 'Job Title', type: 'text', required: true },
                { name: 'category', label: 'Category', type: 'select', options: ['Government Jobs', 'NGO Jobs', 'Teaching Jobs', 'Nursing Jobs', 'Health Jobs', 'Banking Jobs', 'Engineering Jobs', 'IT Jobs', 'Scholarships', 'Internships', 'Attachments', 'Tenders', 'Others'], required: true },
                { name: 'description', label: 'Description', type: 'textarea', required: true },
                { name: 'requirements', label: 'Requirements', type: 'textarea' },
                { name: 'deadline', label: 'Deadline', type: 'datetime-local', required: true },
                { name: 'apply_url', label: 'Apply URL', type: 'text', placeholder: 'https://...' },
                { name: 'is_featured', label: 'Featured Vacancy', type: 'checkbox' },
                { name: 'is_urgent', label: 'Urgent Vacancy', type: 'checkbox' }
            ]
        },
        services: {
            title: 'Services',
            table: 'services',
            searchFields: ['title', 'category', 'description', 'price_range'],
            filterField: 'category',
            fields: [
                { name: 'title', label: 'Service Name', type: 'text', required: true },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Career Services' },
                { name: 'price_range', label: 'Price Range', type: 'text', placeholder: 'e.g. From MWK 15,000' },
                { name: 'is_featured', label: 'Featured Service', type: 'checkbox' }
            ]
        },
        blogs: {
            title: 'Blog Posts',
            table: 'blogs',
            searchFields: ['title', 'content', 'category'],
            filterField: 'category',
            fields: [
                { name: 'title', label: 'Title', type: 'text', required: true },
                { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Learning' },
                { name: 'content', label: 'Content', type: 'textarea', required: true },
                { name: 'cover_url', label: 'Featured Image URL', type: 'text', placeholder: 'https://...' },
                { name: 'cover_file', label: 'Upload Featured Image', type: 'file', accept: 'image/*' },
                { name: 'is_featured', label: 'Featured Post', type: 'checkbox' }
            ]
        },
        ads: {
            title: 'Advertisements',
            table: 'advertisements',
            searchFields: ['title', 'target_url', 'type'],
            filterField: 'is_active',
            fields: [
                { name: 'title', label: 'Ad Title', type: 'text', required: true },
                { name: 'banner_url', label: 'Banner Image URL', type: 'text', placeholder: 'https://...' },
                { name: 'banner_file', label: 'Upload Banner Image', type: 'file', accept: 'image/*' },
                { name: 'target_url', label: 'Link URL', type: 'text', placeholder: 'https://...' },
                { name: 'type', label: 'Ad Type', type: 'select', options: ['banner', 'image', 'video'], required: true },
                { name: 'start_date', label: 'Start Date', type: 'datetime-local', required: true },
                { name: 'end_date', label: 'End Date', type: 'datetime-local', required: true },
                { name: 'is_active', label: 'Active', type: 'checkbox' }
            ]
        },
        users: { title: 'Users' },
        payments: { title: 'Payments' },
        audit: { title: 'Audit Logs' }
    },

    async init() {
        const client = MEBVSUP.init();
        if (!client) return;
        const user = await AuthManager.requireAdmin();
        if (!user) return;
        this.state.currentAdmin = user;
        this.bindEvents();
        await this.refreshDashboard();
    },

    bindEvents() {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', event => {
                const section = event.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        const addButton = document.getElementById('admin-add-button');
        if (addButton) {
            addButton.addEventListener('click', () => {
                if (this.state.section !== 'dashboard') {
                    this.openModal(this.state.section);
                }
            });
        }

        const closeModalButton = document.getElementById('admin-modal-close');
        if (closeModalButton) closeModalButton.addEventListener('click', () => this.closeModal());

        const cancelConfirmButton = document.getElementById('admin-confirm-cancel');
        if (cancelConfirmButton) cancelConfirmButton.addEventListener('click', () => this.closeConfirm());

        const confirmYesButton = document.getElementById('admin-confirm-yes');
        if (confirmYesButton) confirmYesButton.addEventListener('click', async () => {
            if (typeof this.state.confirmCallback === 'function') {
                await this.state.confirmCallback();
            }
            this.closeConfirm();
        });

        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', event => {
                const section = event.currentTarget.dataset.action;
                this.switchSection(section);
                this.openModal(section);
            });
        });

        ['books', 'videos', 'lessons', 'vacancies', 'services', 'blogs', 'ads', 'users', 'payments', 'audit'].forEach(section => {
            const search = document.getElementById(`${section}-search`);
            const filter = document.getElementById(`${section}-filter`);
            if (search) {
                search.addEventListener('input', () => this.reloadCurrentSection());
            }
            if (filter) {
                filter.addEventListener('change', () => this.reloadCurrentSection());
            }
        });

        const auditDate = document.getElementById('audit-date-filter');
        if (auditDate) {
            auditDate.addEventListener('change', event => {
                this.state.auditDate = event.target.value;
                this.reloadCurrentSection();
            });
        }
    },

    async switchSection(section) {
        if (!this.config[section]) return;
        this.state.section = section;
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });
        document.querySelectorAll('.admin-section').forEach(sectionNode => {
            sectionNode.classList.toggle('active', sectionNode.id === `${section}-section`);
        });

        document.getElementById('admin-page-title').innerText = this.config[section].title || 'Dashboard';
        document.getElementById('admin-page-subtitle').innerText = section === 'dashboard'
            ? 'A complete admin CMS for managing books, videos, lessons, vacancies, services, blogs, ads, users, payments, and audit data.'
            : `Manage ${this.config[section].title || section} records and settings.`;

        const showAdd = ['books', 'videos', 'lessons', 'vacancies', 'services', 'blogs', 'ads'].includes(section);
        const addButton = document.getElementById('admin-add-button');
        if (addButton) {
            if (showAdd) {
                addButton.classList.remove('hidden');
                addButton.innerText = `Add ${this.config[section].title}`;
            } else {
                addButton.classList.add('hidden');
            }
        }

        await this.reloadCurrentSection();
    },

    async refreshDashboard() {
        await this.loadOverview();
        await this.updateDashboardMetrics();
        await this.loadRecentActivity();
    },

    async loadOverview() {
        const client = MEBVSUP.init();
        if (!client) return;
        const tables = ['books', 'videos', 'python_lessons', 'vacancies', 'services', 'payments', 'advertisements', 'profiles', 'audit_logs'];
        const panels = ['books', 'videos', 'lessons', 'vacancies', 'services', 'payments', 'ads', 'users', 'audit'];
        const queries = tables.map(table => client.from(table).select('id', { count: 'exact' }));
        const results = await Promise.all(queries);
        results.forEach((result, index) => {
            const count = result?.[0]?.count || 0;
            const panel = panels[index];
            const element = document.getElementById(`admin-count-${panel}`);
            if (element) element.innerText = count;
        });
    },

    async updateDashboardMetrics() {
        const client = MEBVSUP.init();
        if (!client) return;
        const [usersRes, booksRes, videosRes, vacanciesRes, servicesRes, booksDownloads, paymentsRes, recentAuditRes] = await Promise.all([
            client.from('profiles').select('id', { count: 'exact' }),
            client.from('books').select('id', { count: 'exact' }),
            client.from('videos').select('id', { count: 'exact' }),
            client.from('vacancies').select('id', { count: 'exact' }),
            client.from('services').select('id', { count: 'exact' }),
            client.from('books').select('download_count'),
            client.from('payments').select('amount').eq('status', 'approved'),
            client.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(8)
        ]);

        const totalUsers = usersRes?.[0]?.count || 0;
        const totalBooks = booksRes?.[0]?.count || 0;
        const totalVideos = videosRes?.[0]?.count || 0;
        const totalVacancies = vacanciesRes?.[0]?.count || 0;
        const totalServices = servicesRes?.[0]?.count || 0;
        const totalDownloads = (booksDownloads?.data || []).reduce((sum, book) => sum + Number(book.download_count || 0), 0);
        const totalRevenue = (paymentsRes?.data || []).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
        const activityCount = recentAuditRes?.data?.length || 0;

        document.getElementById('metric-users').innerText = totalUsers;
        document.getElementById('metric-books').innerText = totalBooks;
        document.getElementById('metric-videos').innerText = totalVideos;
        document.getElementById('metric-vacancies').innerText = totalVacancies;
        document.getElementById('metric-services').innerText = totalServices;
        document.getElementById('metric-downloads').innerText = totalDownloads;
        document.getElementById('metric-revenue').innerText = `MWK ${totalRevenue.toLocaleString()}`;
        document.getElementById('metric-activity').innerText = `${activityCount} recent events`;

        const activityContainer = document.getElementById('dashboard-activity');
        if (activityContainer) {
            activityContainer.innerHTML = (recentAuditRes?.data || []).map(entry => `
                <div class="admin-card">
                    <strong>${entry.action}</strong>
                    <p style="margin: 10px 0 0 0; color:#aab8d6; font-size:0.94rem;">${entry.details || 'No details provided.'}</p>
                    <span style="display:block; margin-top:10px; color:#7da4ff; font-size:0.84rem;">${new Date(entry.created_at).toLocaleString()}</span>
                </div>
            `).join('') || '<p style="color:#8da1c3;">No activity found.</p>';
        }
    },

    async loadRecentActivity() {
        const client = MEBVSUP.init();
        if (!client) return;
        const { data } = await client.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(6);
        const container = document.getElementById('admin-activity-list');
        if (!container) return;
        if (!data || data.length === 0) {
            container.innerHTML = '<p style="color:#8da1c3;">No administrative events logged yet.</p>';
            return;
        }
        container.innerHTML = data.map(item => `
            <div class="admin-card">
                <strong>${item.action}</strong>
                <p style="margin: 10px 0 0 0; color:#aab8d6;">${item.details || 'No additional details.'}</p>
                <span style="display:block; margin-top:10px; color:#7da4ff; font-size:0.84rem;">${new Date(item.created_at).toLocaleString()}</span>
            </div>
        `).join('');
    },

    async reloadCurrentSection() {
        const section = this.state.section;
        const searchInput = document.getElementById(`${section}-search`);
        const filterInput = document.getElementById(`${section}-filter`);
        if (searchInput) this.state.search = searchInput.value.trim();
        if (filterInput) this.state.filter = filterInput.value;
        if (section === 'audit') {
            this.state.search = document.getElementById('audit-search')?.value.trim() || '';
            this.state.filter = '';
        }
        await this.loadSection(section);
    },

    async loadSection(section) {
        switch (section) {
            case 'dashboard':
                return this.refreshDashboard();
            case 'books':
                return this.loadBooks();
            case 'videos':
                return this.loadVideos();
            case 'lessons':
                return this.loadLessons();
            case 'vacancies':
                return this.loadVacancies();
            case 'services':
                return this.loadServices();
            case 'blogs':
                return this.loadBlogs();
            case 'ads':
                return this.loadAds();
            case 'users':
                return this.loadUsers();
            case 'payments':
                return this.loadPayments();
            case 'audit':
                return this.loadAuditLogs();
            default:
                return;
        }
    },

    async loadBooks() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('books').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load books.');
        const items = this.applySearchAndFilter(data || [], 'books');
        this.renderTable('books', items);
    },

    async loadVideos() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('videos').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load videos.');
        const items = this.applySearchAndFilter(data || [], 'videos');
        this.renderTable('videos', items);
    },

    async loadLessons() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('python_lessons').select('*').order('lesson_order', { ascending: true });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load lessons.');
        const items = this.applySearchAndFilter(data || [], 'lessons');
        this.renderTable('lessons', items);
    },

    async loadVacancies() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('vacancies').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load vacancies.');
        const items = this.applySearchAndFilter(data || [], 'vacancies');
        this.renderTable('vacancies', items);
    },

    async loadServices() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('services').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load services.');
        const items = this.applySearchAndFilter(data || [], 'services');
        this.renderTable('services', items);
    },

    async loadBlogs() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('blogs').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load blog posts.');
        const items = this.applySearchAndFilter(data || [], 'blogs');
        this.renderTable('blogs', items);
    },

    async loadAds() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('advertisements').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load advertisements.');
        const items = this.applySearchAndFilter(data || [], 'ads');
        this.renderTable('ads', items);
    },

    async loadUsers() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('profiles').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load users.');
        const items = (data || []).filter(user => {
            const term = this.state.search.toLowerCase();
            const matchesSearch = !term || [user.full_name, user.phone_number, user.role, user.id].some(value => String(value || '').toLowerCase().includes(term));
            const matchesFilter = !this.state.filter || user.role === this.state.filter;
            return matchesSearch && matchesFilter;
        });
        this.renderUsers(items);
    },

    async loadPayments() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        const { data, error } = await client.from('payments').select('*').order('created_at', { ascending: false });
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load payments.');
        const items = (data || []).filter(payment => {
            const term = this.state.search.toLowerCase();
            const matchesSearch = !term || [payment.user_id, payment.method, payment.status, payment.plan_type].some(value => String(value || '').toLowerCase().includes(term));
            const matchesFilter = !this.state.filter || payment.status === this.state.filter;
            return matchesSearch && matchesFilter;
        });
        this.renderPayments(items);
    },

    async loadAuditLogs() {
        this.setLoading(true);
        const client = MEBVSUP.init();
        let query = client.from('audit_logs').select('*').order('created_at', { ascending: false });
        if (this.state.auditDate) {
            const start = `${this.state.auditDate}T00:00:00Z`;
            const end = `${this.state.auditDate}T23:59:59Z`;
            query = query.gte('created_at', start).lte('created_at', end);
        }
        const { data, error } = await query;
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to load audit logs.');
        const items = (data || []).filter(entry => {
            const term = this.state.search.toLowerCase();
            return !term || [entry.action, entry.details, entry.user_id].some(value => String(value || '').toLowerCase().includes(term));
        });
        this.renderAudit(items);
    },

    applySearchAndFilter(items, section) {
        const config = this.config[section];
        return (items || []).filter(item => {
            const term = this.state.search.toLowerCase();
            const passesSearch = !term || config.searchFields.some(field => String(item[field] || '').toLowerCase().includes(term));
            const passesFilter = !this.state.filter || String(item[config.filterField] || '').toLowerCase() === String(this.state.filter).toLowerCase();
            return passesSearch && passesFilter;
        });
    },

    renderTable(section, items) {
        const container = document.getElementById(`${section}-table-container`);
        if (!container) return;
        if (!items || items.length === 0) {
            container.innerHTML = '<p style="color:#aab8d6; margin-top:18px;">No records found.</p>';
            return;
        }
        const headers = this.getTableHeaders(section);
        const rows = items.map(item => this.buildRow(section, item)).join('');
        container.innerHTML = `
            <div style="overflow-x:auto; margin-top:18px;">
                <table class="admin-table">
                    <thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
        this.attachRowListeners(section);
    },

    getTableHeaders(section) {
        switch (section) {
            case 'books': return ['Title', 'Author', 'Category', 'Featured', 'PDF', 'Created', 'Actions'];
            case 'videos': return ['Title', 'Category', 'Featured', 'YouTube', 'Thumbnail', 'Created', 'Actions'];
            case 'lessons': return ['Lesson', 'Level', 'Order', 'Premium', 'Video', 'Created', 'Actions'];
            case 'vacancies': return ['Job Title', 'Company', 'Category', 'Deadline', 'Featured', 'Urgent', 'Actions'];
            case 'services': return ['Service', 'Category', 'Price', 'Featured', 'Created', 'Actions'];
            case 'blogs': return ['Title', 'Category', 'Featured', 'Created', 'Actions'];
            case 'ads': return ['Title', 'Type', 'Active', 'Start', 'End', 'Actions'];
            default: return ['Item', 'Details', 'Actions'];
        }
    },

    buildRow(section, item) {
        switch (section) {
            case 'books':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.author || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${item.pdf_url ? `<a href="${item.pdf_url}" target="_blank" style="color:#7dc6ff;">Open</a>` : '-'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('books', item.id)}</td>
                </tr>`;
            case 'videos':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${item.youtube_id ? `<a href="https://youtu.be/${item.youtube_id}" target="_blank" style="color:#7dc6ff;">Watch</a>` : '-'}</td>
                    <td>${item.thumbnail_url ? `<a href="${item.thumbnail_url}" target="_blank" style="color:#7dc6ff;">View</a>` : '-'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('videos', item.id)}</td>
                </tr>`;
            case 'lessons':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.level || ''}</td>
                    <td>${item.lesson_order || ''}</td>
                    <td>${item.is_premium ? 'Yes' : 'No'}</td>
                    <td>${item.youtube_id ? `<a href="https://youtu.be/${item.youtube_id}" target="_blank" style="color:#7dc6ff;">Watch</a>` : '-'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('lessons', item.id)}</td>
                </tr>`;
            case 'vacancies':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.company || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${this.formatDate(item.deadline)}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${item.is_urgent ? 'Yes' : 'No'}</td>
                    <td>${this.actionButtons('vacancies', item.id)}</td>
                </tr>`;
            case 'services':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${item.price_range || ''}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('services', item.id)}</td>
                </tr>`;
            case 'blogs':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.category || 'General'}</td>
                    <td>${item.is_featured ? 'Yes' : 'No'}</td>
                    <td>${this.formatDate(item.created_at)}</td>
                    <td>${this.actionButtons('blogs', item.id)}</td>
                </tr>`;
            case 'ads':
                return `<tr>
                    <td>${item.title || ''}</td>
                    <td>${item.type || ''}</td>
                    <td>${item.is_active ? '<span class="status-chip status-active">Active</span>' : '<span class="status-chip status-inactive">Inactive</span>'}</td>
                    <td>${this.formatDate(item.start_date)}</td>
                    <td>${this.formatDate(item.end_date)}</td>
                    <td>${this.actionButtons('ads', item.id)}</td>
                </tr>`;
            default:
                return `<tr><td colspan="7">No preview available.</td></tr>`;
        }
    },

    actionButtons(section, id) {
        return `
            <button class="btn btn-secondary admin-edit-button" data-section="${section}" data-id="${id}">Edit</button>
            <button class="btn btn-danger admin-delete-button" data-section="${section}" data-id="${id}">Delete</button>
        `;
    },

    attachRowListeners(section) {
        document.querySelectorAll(`.admin-edit-button[data-section="${section}"]`).forEach(button => {
            button.addEventListener('click', async event => {
                const id = event.currentTarget.dataset.id;
                await this.openEditModal(section, id);
            });
        });
        document.querySelectorAll(`.admin-delete-button[data-section="${section}"]`).forEach(button => {
            button.addEventListener('click', event => {
                const id = event.currentTarget.dataset.id;
                this.confirmAction('Delete record', 'This action cannot be undone. Continue?', async () => {
                    await this.deleteEntity(section, id);
                });
            });
        });
    },

    async openEditModal(section, id) {
        const client = MEBVSUP.init();
        if (!client) return;
        const config = this.config[section];
        const { data, error } = await client.from(config.table).select('*').eq('id', id).single();
        if (error || !data) return this.showMessage('error', `Unable to load ${config.title || section} for editing.`);
        await this.openModal(section, data);
    },

    async openModal(section, item = null) {
        const config = this.config[section];
        if (!config || !config.fields) return;
        this.state.modalMode = item ? 'edit' : 'create';
        this.state.currentItem = item;
        const title = item ? `Edit ${config.title}` : `Add ${config.title}`;
        document.getElementById('admin-modal-title').innerText = title;
        document.getElementById('admin-modal-form').innerHTML = this.buildForm(section, item);
        document.getElementById('admin-modal-form').addEventListener('submit', event => this.handleSubmit(event, section));
        document.getElementById('admin-modal').classList.remove('hidden');
        document.getElementById('admin-modal').scrollTop = 0;
    },

    buildForm(section, item) {
        const config = this.config[section];
        return config.fields.map(field => {
            const value = item ? item[field.name] : '';
            const required = field.required ? 'required' : '';
            const checked = field.type === 'checkbox' && value ? 'checked' : '';
            const fieldValue = field.type === 'datetime-local' && value ? this.toDateTimeLocal(value) : value || '';
            switch (field.type) {
                case 'textarea':
                    return `<div class="form-row full"><label class="form-label">${field.label}</label><textarea name="${field.name}" class="form-control" ${required} placeholder="${field.placeholder || ''}">${fieldValue}</textarea></div>`;
                case 'select':
                    return `
                        <div class="form-row full">
                            <label class="form-label">${field.label}</label>
                            <select name="${field.name}" class="form-control" ${required}>
                                <option value="">Select ${field.label}</option>
                                ${field.options.map(option => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`).join('')}
                            </select>
                        </div>
                    `;
                case 'checkbox':
                    return `
                        <div class="form-row full" style="align-items:center; gap:10px;">
                            <label class="form-label" style="margin-bottom:0;">${field.label}</label>
                            <input type="checkbox" name="${field.name}" ${checked}>
                        </div>
                    `;
                case 'file':
                    return `
                        <div class="form-row full">
                            <label class="form-label">${field.label}</label>
                            <input type="file" name="${field.name}" class="form-control" accept="${field.accept || '*/*'}">
                            ${item && item[field.name.replace('_file', '_url')] ? `<span class="form-note">Current: <a href="${item[field.name.replace('_file', '_url')]}" target="_blank" style="color:#7dc6ff;">View existing</a></span>` : ''}
                        </div>
                    `;
                case 'json':
                    return `<div class="form-row full"><label class="form-label">${field.label}</label><textarea name="${field.name}" class="form-control" placeholder="${field.placeholder || ''}" rows="6">${value ? JSON.stringify(value, null, 2) : ''}</textarea><p class="form-note">Provide quiz questions as JSON array of objects with question, options, and correct_answer keys.</p></div>`;
                case 'number':
                case 'datetime-local':
                    return `<div class="form-row full"><label class="form-label">${field.label}</label><input type="${field.type}" name="${field.name}" value="${fieldValue}" class="form-control" ${required} placeholder="${field.placeholder || ''}"></div>`;
                default:
                    return `<div class="form-row full"><label class="form-label">${field.label}</label><input type="${field.type}" name="${field.name}" value="${fieldValue}" class="form-control" ${required} placeholder="${field.placeholder || ''}"></div>`;
            }
        }).join('') + `
            <div class="modal-actions">
                <button type="button" class="btn btn-outline" id="admin-modal-close">Cancel</button>
                <button type="submit" class="btn btn-primary">${this.state.modalMode === 'edit' ? 'Save Changes' : 'Create Record'}</button>
            </div>
        `;
    },

    async handleSubmit(event, section) {
        event.preventDefault();
        const form = event.target;
        const config = this.config[section];
        const values = {};
        const files = {};

        config.fields.forEach(field => {
            const input = form.querySelector(`[name="${field.name}"]`);
            if (!input) return;
            if (field.type === 'checkbox') {
                values[field.name] = input.checked;
                return;
            }
            if (field.type === 'file') {
                if (input.files && input.files.length) {
                    files[field.name] = input.files[0];
                }
                return;
            }
            if (field.type === 'json') {
                const text = input.value.trim();
                try {
                    values[field.name] = text ? JSON.parse(text) : [];
                } catch (err) {
                    return this.showMessage('error', 'Quiz JSON is not valid.');
                }
                return;
            }
            values[field.name] = input.value;
        });

        await this.saveEntity(section, values, files);
    },

    async saveEntity(section, values, files) {
        const client = MEBVSUP.init();
        if (!client) return;
        const config = this.config[section];
        const payload = { ...values };

        if (section === 'videos' || section === 'lessons') {
            if (payload.youtube_url) {
                const id = this.parseYouTubeId(payload.youtube_url);
                if (!id) return this.showMessage('error', 'Invalid YouTube URL.');
                payload.youtube_id = id;
            }
            delete payload.youtube_url;
        }

        if (section === 'books') {
            const validCategories = ['MSCE Books', 'JCE Books', 'Primary Books', 'Nursing Books', 'Novels', 'Past Papers', 'Others'];
            if (!payload.category || !validCategories.includes(payload.category)) {
                return this.showMessage('error', 'Please select a valid category');
            }
            if (payload.pdf_url === '') delete payload.pdf_url;
            if (payload.cover_url === '') delete payload.cover_url;
            if (payload.file_url === '') delete payload.file_url;
            if (payload.file_url) {
                const normalized = this.normalizeGoogleDriveDownloadLink(payload.file_url);
                if (!normalized) return this.showMessage('error', 'Invalid Google Drive link');
                payload.file_url = normalized;
            }
        }

        if (section === 'blogs') {
            if (!payload.category) payload.category = 'General';
        }

        if (files.pdf_file) {
            payload.pdf_url = await this.uploadAsset('cms-assets', `books/${Date.now()}_${files.pdf_file.name}`, files.pdf_file);
        }
        if (files.cover_file) {
            payload.cover_url = await this.uploadAsset('cms-assets', `${section}/${Date.now()}_${files.cover_file.name}`, files.cover_file);
        }
        if (files.thumbnail_file) {
            payload.thumbnail_url = await this.uploadAsset('cms-assets', `videos/${Date.now()}_${files.thumbnail_file.name}`, files.thumbnail_file);
        }
        if (files.banner_file) {
            payload.banner_url = await this.uploadAsset('cms-assets', `ads/${Date.now()}_${files.banner_file.name}`, files.banner_file);
        }

        if (section === 'lessons') {
            if (payload.quiz_questions && !Array.isArray(payload.quiz_questions)) {
                this.showMessage('error', 'Quiz questions must be a JSON array.');
                return;
            }
            if (payload.passing_score && Number.isNaN(Number(payload.passing_score))) {
                this.showMessage('error', 'Passing score must be a number.');
                return;
            }
        }

        const sanitized = this.sanitizePayload(section, payload);
        if (section === 'books') {
            console.log('Final books payload before insert:', sanitized);
            console.log('Books insert payload JSON:', JSON.stringify(sanitized, null, 2));
        }
        const operation = this.state.modalMode === 'edit'
            ? client.from(config.table).update(sanitized).eq('id', this.state.currentItem.id)
            : client.from(config.table).insert(sanitized);

        this.setLoading(true);
        const { error } = await operation;
        this.setLoading(false);
        if (error) {
            console.error('Supabase save error:', error);
            console.error('Error code:', error?.code);
            console.error('Error message:', error?.message);
            console.error('Error details:', error?.details);
            console.error('Error hint:', error?.hint);
            return this.showMessage('error', `Failed to save ${config.title}.`);
        }
        this.showMessage('success', `${config.title} saved successfully.`);
        await this.logAudit(`${this.state.modalMode === 'edit' ? 'Updated' : 'Created'} ${config.title}`, `${sanitized.title || sanitized.name || sanitized.company || 'Record'} ${this.state.modalMode === 'edit' ? 'updated' : 'created'} by admin.`);
        this.closeModal();
        await this.reloadCurrentSection();
        await this.loadOverview();
        await this.updateDashboardMetrics();
    },

    sanitizePayload(section, payload) {
        const sanitized = { ...payload };
        const config = this.config[section];
        config.fields.forEach(field => {
            if (field.type === 'file') {
                delete sanitized[field.name];
            }
        });
        if (section === 'lessons') {
            if (typeof sanitized.is_premium === 'undefined') sanitized.is_premium = false;
            if (sanitized.passing_score === '') delete sanitized.passing_score;
        }
        if (section === 'ads') {
            if (sanitized.start_date) sanitized.start_date = new Date(sanitized.start_date).toISOString();
            if (sanitized.end_date) sanitized.end_date = new Date(sanitized.end_date).toISOString();
        }
        if (section === 'vacancies') {
            if (sanitized.deadline) sanitized.deadline = new Date(sanitized.deadline).toISOString();
        }
        return sanitized;
    },

    parseYouTubeId(url) {
        if (!url) return null;
        const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    },

    extractGoogleDriveFileId(url) {
        if (!url) return null;
        let normalized = url.trim();
        if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(normalized)) {
            normalized = `https://${normalized}`;
        }
        try {
            const parsed = new URL(normalized);
            const hostname = parsed.hostname.toLowerCase();
            if (!['drive.google.com', 'docs.google.com'].includes(hostname)) {
                return null;
            }
            const patterns = [
                /https?:\/\/drive\.google\.com\/file\/d\/([^\/\?]+)(?:\/view)?/i,
                /https?:\/\/drive\.google\.com\/open\?id=([^&]+)/i,
                /https?:\/\/drive\.google\.com\/uc\?id=([^&]+)/i,
                /https?:\/\/docs\.google\.com\/.*\/d\/([^\/\?]+)(?:\/.*)?/i
            ];
            for (const pattern of patterns) {
                const match = normalized.match(pattern);
                if (match && match[1]) return match[1];
            }
            return null;
        } catch (err) {
            return null;
        }
    },

    normalizeGoogleDriveDownloadLink(url) {
        const fileId = this.extractGoogleDriveFileId(url);
        if (!fileId) return null;
        return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
    },

    async uploadAsset(bucket, path, file) {
        if (!file) return null;
        const client = MEBVSUP.init();
        if (!client) return null;
        const { data, error } = await client.storage.from(bucket).upload(path, file, { cacheControl: '3600', upsert: true });
        if (error) {
            this.showMessage('error', `Storage upload failed: ${error.message}`);
            throw error;
        }
        const { data: publicData } = await client.storage.from(bucket).getPublicUrl(path);
        return publicData?.publicUrl || null;
    },

    formatDate(value) {
        if (!value) return '-';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return date.toLocaleString();
    },

    toDateTimeLocal(value) {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        const offset = date.getTimezoneOffset();
        const local = new Date(date.getTime() - offset * 60000);
        return local.toISOString().slice(0, 16);
    },

    closeModal() {
        document.getElementById('admin-modal').classList.add('hidden');
        const form = document.getElementById('admin-modal-form');
        if (form) form.innerHTML = '';
        this.state.currentItem = null;
    },

    confirmAction(title, message, callback) {
        document.getElementById('admin-confirm-title').innerText = title;
        document.getElementById('admin-confirm-message').innerText = message;
        this.state.confirmCallback = callback;
        document.getElementById('admin-confirm-modal').classList.remove('hidden');
    },

    closeConfirm() {
        document.getElementById('admin-confirm-modal').classList.add('hidden');
        this.state.confirmCallback = null;
    },

    async deleteEntity(section, id) {
        const client = MEBVSUP.init();
        const config = this.config[section];
        if (!client || !config) return;
        this.setLoading(true);
        const { error } = await client.from(config.table).delete().eq('id', id);
        this.setLoading(false);
        if (error) return this.showMessage('error', `Failed to delete ${config.title}.`);
        this.showMessage('success', `${config.title} deleted successfully.`);
        await this.logAudit(`Deleted ${config.title}`, `Deleted record ${id}`);
        await this.reloadCurrentSection();
        await this.loadOverview();
        await this.updateDashboardMetrics();
    },

    renderUsers(users) {
        const container = document.getElementById('users-table-container');
        if (!container) return;
        if (!users || users.length === 0) {
            container.innerHTML = '<p style="color:#aab8d6; margin-top:18px;">No users found.</p>';
            return;
        }
        const rows = users.map(user => `
            <tr>
                <td>${user.full_name || 'Anonymous'}</td>
                <td>${user.id}</td>
                <td>${user.phone_number || '-'}</td>
                <td>${user.role || 'guest'}</td>
                <td>${user.download_count || 0}</td>
                <td>${this.formatDate(user.created_at)}</td>
                <td>
                    <select data-user-id="${user.id}" class="form-control role-selector" style="min-width:140px; margin-bottom:8px;">
                        ${['super_admin','admin','content_manager','moderator','registered_user','guest'].map(role => `<option value="${role}" ${user.role === role ? 'selected' : ''}>${role}</option>`).join('')}
                    </select>
                    <button class="btn btn-secondary admin-user-toggle" data-user-id="${user.id}" data-current-role="${user.role}">${user.role === 'guest' ? 'Reactivate' : 'Suspend'}</button>
                </td>
            </tr>
        `).join('');
        container.innerHTML = `
            <div style="overflow-x:auto; margin-top:18px;">
                <table class="admin-table">
                    <thead><tr><th>Name</th><th>User ID</th><th>Phone</th><th>Role</th><th>Downloads</th><th>Created</th><th>Actions</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
        this.attachUserActions();
    },

    attachUserActions() {
        document.querySelectorAll('.role-selector').forEach(select => {
            select.addEventListener('change', async event => {
                const userId = event.currentTarget.dataset.userId;
                const role = event.currentTarget.value;
                await this.updateUserRole(userId, role);
            });
        });
        document.querySelectorAll('.admin-user-toggle').forEach(button => {
            button.addEventListener('click', async event => {
                const userId = event.currentTarget.dataset.userId;
                const currentRole = event.currentTarget.dataset.currentRole;
                const newRole = currentRole === 'guest' ? 'registered_user' : 'guest';
                await this.updateUserRole(userId, newRole, currentRole === 'guest' ? 'Reactivated user' : 'Suspended user');
            });
        });
    },

    async updateUserRole(userId, role, actionLabel) {
        const client = MEBVSUP.init();
        this.setLoading(true);
        const { error } = await client.from('profiles').update({ role }).eq('id', userId);
        this.setLoading(false);
        if (error) return this.showMessage('error', 'Unable to update user role.');
        this.showMessage('success', `User role updated to ${role}.`);
        await this.logAudit(actionLabel || 'Changed user role', `User ${userId} changed to ${role}`);
        await this.loadUsers();
        await this.loadOverview();
        await this.updateDashboardMetrics();
    },

    renderPayments(payments) {
        const container = document.getElementById('payments-table-container');
        if (!container) return;
        if (!payments || payments.length === 0) {
            container.innerHTML = '<p style="color:#aab8d6; margin-top:18px;">No payments found.</p>';
            return;
        }
        const rows = payments.map(payment => `
            <tr>
                <td>${payment.user_id || '-'}</td>
                <td>${payment.plan_type || '-'}</td>
                <td>${payment.method || '-'}</td>
                <td>MWK ${Number(payment.amount || 0).toLocaleString()}</td>
                <td>${payment.status || '-'}</td>
                <td>${this.formatDate(payment.created_at)}</td>
                <td>
                    ${payment.proof_url ? `<a class="btn btn-secondary" href="${payment.proof_url}" target="_blank">Proof</a>` : '-'}
                    <button class="btn btn-success admin-payment-approve" data-id="${payment.id}" ${payment.status === 'approved' ? 'disabled' : ''}>Approve</button>
                    <button class="btn btn-danger admin-payment-reject" data-id="${payment.id}" ${payment.status === 'rejected' ? 'disabled' : ''}>Reject</button>
                </td>
            </tr>
        `).join('');
        container.innerHTML = `
            <div style="overflow-x:auto; margin-top:18px;">
                <table class="admin-table">
                    <thead><tr><th>User</th><th>Plan</th><th>Method</th><th>Amount</th><th>Status</th><th>Submitted</th><th>Actions</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
        this.attachPaymentActions();
    },

    attachPaymentActions() {
        document.querySelectorAll('.admin-payment-approve').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.currentTarget.dataset.id;
                this.openPaymentReview(id, 'approved');
            });
        });
        document.querySelectorAll('.admin-payment-reject').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.currentTarget.dataset.id;
                this.openPaymentReview(id, 'rejected');
            });
        });
    },

    async openPaymentReview(id, status) {
        const notes = window.prompt(`Add notes for ${status} payment (optional):`);
        if (notes === null) return;
        await this.updatePaymentStatus(id, status, notes);
    },

        async updatePaymentStatus(id, status, notes) {
        const client = MEBVSUP.init();
        if (!client) return;

        const { data: payment, error: paymentFetchError } = await client
            .from('payments')
            .select('user_id')
            .eq('id', id)
            .single();

        if (paymentFetchError || !payment) {
            this.showMessage('error', 'Payment record not found.');
            return;
        }

        const payload = { status };
        if (status === 'approved') payload.verified_at = new Date().toISOString();
        if (notes) payload.notes = notes;

        this.setLoading(true);
        const { error } = await client.from('payments').update(payload).eq('id', id);
        if (error) {
            this.setLoading(false);
            return this.showMessage('error', 'Unable to update payment status.');
        }

        if (status === 'approved') {
            const { error: profileErr } = await client.from('profiles').update({
                is_verified: true,
                is_premium: true,
                updated_at: new Date().toISOString()
            }).eq('id', payment.user_id);

            if (profileErr) {
                this.setLoading(false);
                return this.showMessage('error', 'Payment approved, but user verification update failed.');
            }
        }

        this.setLoading(false);
        this.showMessage('success', `Payment ${status}.`);
        await this.logAudit(`${status.charAt(0).toUpperCase() + status.slice(1)} payment`, `Payment ${id} ${status} by admin.`);
        await this.loadPayments();
        await this.updateDashboardMetrics();
    },
    renderAudit(records) {
        const container = document.getElementById('audit-table-container');
        if (!container) return;
        if (!records || records.length === 0) {
            container.innerHTML = '<p style="color:#aab8d6; margin-top:18px;">No audit logs found.</p>';
            return;
        }
        const rows = records.map(entry => `
            <tr>
                <td>${entry.user_id || '-'}</td>
                <td>${entry.action || '-'}</td>
                <td>${entry.details || '-'}</td>
                <td>${this.formatDate(entry.created_at)}</td>
            </tr>
        `).join('');
        container.innerHTML = `
            <div style="overflow-x:auto; margin-top:18px;">
                <table class="admin-table">
                    <thead><tr><th>User</th><th>Action</th><th>Details</th><th>Created</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    async logAudit(action, details) {
        const client = MEBVSUP.init();
        if (!client || !this.state.currentAdmin) return;
        await client.from('audit_logs').insert({
            user_id: this.state.currentAdmin.id,
            action,
            details: details || '',
            created_at: new Date().toISOString()
        });
    },

    showMessage(type, message) {
        const toast = document.getElementById('admin-toast');
        if (!toast) return;
        toast.innerText = message;
        toast.classList.add('visible');
        toast.style.background = type === 'error' ? 'rgba(216, 84, 75, 0.95)' : 'rgba(35, 96, 175, 0.92)';
        setTimeout(() => toast.classList.remove('visible'), 4400);
    },

    setLoading(show) {
        const loader = document.getElementById('admin-loading');
        if (!loader) return;
        loader.classList.toggle('hidden', !show);
    }
};


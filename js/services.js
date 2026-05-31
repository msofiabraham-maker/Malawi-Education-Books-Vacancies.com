window.ServicesPage = {
    serviceList: [],

    async init() {
        MEBVSUP.init();
        await this.loadServices();
        this.renderServices();
        this.bindSubmit();
    },

    async loadServices() {
        const client = MEBVSUP.init();
        if (!client) return;
        const { data, error } = await client
            .from('services')
            .select('*')
            .order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
            this.serviceList = data;
            return;
        }
        this.serviceList = [
            { id: 'web-dev', title: 'Website Development', description: 'Responsive, accessible websites tailored for education providers and local enterprises.', category: 'Digital Product', price_range: 'From MWK 120,000' },
            { id: 'app-dev', title: 'Mobile App Development', description: 'Android and iOS application solutions for schools, academies, and small businesses.', category: 'Digital Product', price_range: 'From MWK 180,000' },
            { id: 'research', title: 'Research Services', description: 'Educational and market research services for NGOs, institutions, and job seekers.', category: 'Consulting', price_range: 'Custom pricing' },
            { id: 'job-assist', title: 'Job Application Assistance', description: 'Tailored application support for Malawi job opportunities and scholarship submissions.', category: 'Career Services', price_range: 'From MWK 30,000' },
            { id: 'cv-writing', title: 'CV Writing', description: 'Professional CV creation with optimized layouts for international and local recruitment.', category: 'Career Services', price_range: 'From MWK 15,000' },
            { id: 'cover-letter', title: 'Cover Letter Writing', description: 'Compelling cover letters that align with each career path and vacancy requirements.', category: 'Career Services', price_range: 'From MWK 10,000' },
            { id: 'academic-consult', title: 'Academic Consultation', description: 'Supervisor mentorship, course planning, and academic strategy for students and tutors.', category: 'Education', price_range: 'From MWK 25,000' },
            { id: 'sourcing', title: 'Educational Resource Sourcing', description: 'Rapid procurement of books, past papers, and classroom materials on request.', category: 'Support', price_range: 'Variable' },
            { id: 'content-creation', title: 'Digital Content Creation', description: 'Branded digital content for courses, events, and promotional outreach.', category: 'Creative', price_range: 'From MWK 40,000' },
            { id: 'online-training', title: 'Online Training', description: 'Live and recorded training sessions for Python, ICT, and soft skills development.', category: 'Training', price_range: 'From MWK 35,000' }
        ];
    },

    renderServices() {
        const wrapper = document.getElementById('services-grid');
        if (!wrapper) return;
        wrapper.innerHTML = this.serviceList.map(service => `
            <div class="glass-card" style="padding:24px; min-height:280px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span class="hero-badge" style="background: rgba(223, 177, 91, 0.12); color: var(--color-secondary);">${service.category}</span>
                    <h3 style="margin:18px 0 10px; color: var(--color-primary);">${service.title}</h3>
                    <p style="color: var(--color-text-muted); line-height:1.75;">${service.description}</p>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; flex-wrap:wrap; gap:12px;">
                    <span style="font-weight:700; color: var(--color-primary);">${service.price_range || 'Contact for quote'}</span>
                    <button class="btn btn-secondary" onclick="ServicesPage.prefillRequest('${service.title}')">Request Service</button>
                </div>
            </div>
        `).join('');
    },

    prefillRequest(serviceName) {
        const input = document.getElementById('service-name-input');
        if (input) input.value = serviceName;
        window.scrollTo({ top: document.getElementById('service-inquiry-form').offsetTop - 80, behavior: 'smooth' });
    },

    bindSubmit() {
        const form = document.getElementById('service-inquiry-form');
        if (!form) return;
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const serviceName = document.getElementById('service-name-input').value.trim();
            const contactName = document.getElementById('service-contact-name').value.trim();
            const contactEmail = document.getElementById('service-contact-email').value.trim();
            const contactPhone = document.getElementById('service-contact-phone').value.trim();
            const details = document.getElementById('service-details').value.trim();
            if (!serviceName || !contactName || !contactEmail || !contactPhone || !details) {
                this.showFormMessage('Please complete all required fields.', false);
                return;
            }
            const client = MEBVSUP.init();
            if (!client) return;
            const session = await client.auth.getSession();
            const { error } = await client.from('service_inquiries').insert({
                user_id: session?.data?.session?.user?.id || null,
                service_name: serviceName,
                details,
                contact_name: contactName,
                contact_email: contactEmail,
                contact_phone: contactPhone,
                status: 'pending'
            });
            if (error) {
                this.showFormMessage(error.message, false);
            } else {
                form.reset();
                this.showFormMessage('Your service request has been submitted successfully.', true);
            }
        });
    },

    showFormMessage(message, isSuccess) {
        const alert = document.getElementById('service-message');
        if (!alert) return;
        alert.innerText = message;
        alert.style.color = isSuccess ? 'var(--color-success)' : 'var(--color-danger)';
    }
};

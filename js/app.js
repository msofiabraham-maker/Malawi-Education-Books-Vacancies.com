/* ============================================================================
   MALAWI EDUCATION BOOKS AND VACANCIES (MEBV) - CORE APPLICATION ENGINE
   ============================================================================ */

// Global App Namespace
window.MEBV = {
    supabaseUrl: "https://iafvcamlkqokqwejshyd.supabase.co", // Replace with actual Supabase Project URL
    supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZnZjYW1sa3Fva3F3ZWpzaHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNjIxMTksImV4cCI6MjA5NTczODExOX0.rpFCC55m0dpU12xzFY1PEJNtqNkiCPhimRmly2_xYew", // Replace with actual Anon Public API Key
    client: null,
    settings: {},
    currentUser: null,
    guestDownloadLimit: 10,
    
    // Core Initialization
    async init() {
        this.initSupabase();
        await this.loadSettings();
        this.applyDynamicConfiguration();
        await this.checkAuthSession();
        this.handleSplashScreen();
        this.initGlobalEventListeners();
        this.trackActiveUsageFeedback();
    },

    // Initialize Supabase Client
    initSupabase() {
        if (typeof supabase !== 'undefined') {
            this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
        } else {
            console.warn("Supabase library not loaded. Running in local fallback state.");
        }
    },

    // Load Dynamic Admin Settings from Supabase DB
    async loadSettings() {
        try {
            if (this.client) {
                const { data, error } = await this.client
                    .from('settings')
                    .select('value')
                    .eq('key', 'general_settings')
                    .single();

                if (data && !error) {
                    this.settings = data.value;
                    this.guestDownloadLimit = this.settings.download_limits?.guest_limit || 10;
                    return;
                }
            }
        } catch (e) {
            console.error("Failed to load settings from DB. Utilizing local defaults.", e);
        }

        // Local hardcoded defaults if DB fetch fails
        this.settings = {
            website_name: "Malawi Education Books and Vacancies",
            whatsapp_number: "+265897228943",
            phone_number: "+265993984344",
            email: "msofiabraham@gmail.com",
            facebook_link: "https://www.facebook.com/MEBVOnlineClasses",
            homepage_banner: "Unlock Your Academic & Career Potential in Malawi",
            theme_colors: {
                primary: "#0A1931",
                secondary: "#DFB15B",
                accent: "#FFFFFF",
                background: "#F5F7FA"
            }
        };
    },

    // Apply Live Branding Configurations (Without Code Edits)
    applyDynamicConfiguration() {
        const root = document.documentElement;
        const colors = this.settings.theme_colors;
        if (colors) {
            if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
            if (colors.secondary) root.style.setProperty('--color-secondary', colors.secondary);
            if (colors.accent) root.style.setProperty('--color-accent', colors.accent);
            if (colors.background) root.style.setProperty('--color-bg-light', colors.background);
        }

        // Apply metadata and page titles dynamically
        if (this.settings.seo_settings?.meta_title && document.title === "MEBV") {
            document.title = this.settings.seo_settings.meta_title;
        }
    },

    // Check Authentication Session
    async checkAuthSession() {
        if (!this.client) return;
        try {
            const { data: { session } } = await this.client.auth.getSession();
            if (session) {
                const { data: profile } = await this.client
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                
                this.currentUser = { ...session.user, ...profile };
                this.updateUIAfterLogin();
            } else {
                this.currentUser = null;
                this.updateUIAfterLogout();
            }
        } catch (e) {
            console.error("Auth status verification failed.", e);
        }
    },

    // Splash Screen Transitions (2-4 Seconds Lifecycle)
    handleSplashScreen() {
        const splash = document.querySelector('.splash-screen');
        const indicator = document.querySelector('.splash-progress-indicator');
        if (!splash) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (indicator) indicator.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                splash.style.opacity = '0';
                splash.style.visibility = 'hidden';
                setTimeout(() => splash.remove(), 800);
            }
        }, 150);
    },

    // Secret Admin Login Key Combination Listener (Hold Ctrl + Shift + A for 3 seconds)
    initGlobalEventListeners() {
        let keyTimer;
        let keysPressed = {};

        window.addEventListener('keydown', (e) => {
            keysPressed[e.key] = true;
            if (keysPressed['Control'] && keysPressed['Shift'] && (keysPressed['A'] || keysPressed['a'])) {
                if (!keyTimer) {
                    keyTimer = setTimeout(() => {
                        window.location.href = "login.html?admin_access=true";
                    }, 3000);
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            delete keysPressed[e.key];
            clearTimeout(keyTimer);
            keyTimer = null;
        });
    },

    // Guest Download Verification Engine
    verifyDownloadPermission() {
        if (this.currentUser) return true; // Logged in users have limitless access

        let guestDownloads = JSON.parse(localStorage.getItem('mebv_guest_downloads') || '[]');
        if (guestDownloads.length >= this.guestDownloadLimit) {
            this.showAuthRequirementModal();
            return false;
        }
        return true;
    },

    // Record guest book download
    registerBookDownload(bookId) {
        if (this.currentUser) return;
        let guestDownloads = JSON.parse(localStorage.getItem('mebv_guest_downloads') || '[]');
        if (!guestDownloads.includes(bookId)) {
            guestDownloads.push(bookId);
            localStorage.setItem('mebv_guest_downloads', JSON.stringify(guestDownloads));
        }
    },

    // Global Modal Interface Generator
    showModal(title, contentHTML, actionsHTML = '') {
        const modalId = 'mebv-dynamic-modal';
        let modal = document.getElementById(modalId);
        if (modal) modal.remove();

        const modalMarkup = `
            <div id="${modalId}" class="modal-backdrop" style="
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(10, 25, 49, 0.6); backdrop-filter: blur(8px);
                display: flex; justify-content: center; align-items: center; z-index: 10000;
                animation: fadeIn 0.3s ease;
            ">
                <div class="glass-card modal-content" style="
                    width: 90%; max-width: 500px; padding: 32px;
                    animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                ">
                    <h3 style="margin-bottom: 16px; color: var(--color-primary);">${title}</h3>
                    <div style="margin-bottom: 24px; color: var(--color-text-dark); font-size: 0.95rem;">${contentHTML}</div>
                    <div class="modal-actions" style="display: flex; gap: 12px; justify-content: flex-end;">
                        ${actionsHTML || `<button class="btn btn-primary" onclick="document.getElementById('${modalId}').remove()">Close</button>`}
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalMarkup);
    },

    // Triggers registration popup once limit exceeded
    showAuthRequirementModal() {
        this.showModal(
            "Account Registration Required",
            `You have downloaded ${this.guestDownloadLimit} books as a Guest. To maintain unrestricted downloads, access the complete past papers database, and track your Python progress, please create an account.`,
            `
                <button class="btn btn-outline" onclick="document.getElementById('mebv-dynamic-modal').remove()">Later</button>
                <a href="register.html" class="btn btn-primary">Create Account</a>
            `
        );
    },

    // Rating and Feedback Popup Prompt System
    trackActiveUsageFeedback() {
        // Star reviews prompt shown automatically after 1 min active usage
        let reviewPrompted = localStorage.getItem('mebv_review_prompted');
        if (!reviewPrompted) {
            setTimeout(() => {
                this.showFeedbackPopup();
                localStorage.setItem('mebv_review_prompted', 'true');
            }, 60000);
        }
    },

    showFeedbackPopup() {
        this.showModal(
            "Rate Your Experience",
            `
                <p style="margin-bottom: 15px;">Your feedback helps us provide high-quality educational resources across Malawi. Please rate MEBV:</p>
                <div class="star-rating-selector" style="display: flex; gap: 8px; font-size: 2rem; color: #CCC; cursor: pointer; justify-content: center; margin: 20px 0;">
                    <span class="star-btn" data-star="1">★</span>
                    <span class="star-btn" data-star="2">★</span>
                    <span class="star-btn" data-star="3">★</span>
                    <span class="star-btn" data-star="4">★</span>
                    <span class="star-btn" data-star="5">★</span>
                </div>
                <textarea id="feedback-text" class="form-control" placeholder="Write a brief comment (optional)..." style="height: 80px;"></textarea>
            `,
            `
                <button class="btn btn-outline" onclick="document.getElementById('mebv-dynamic-modal').remove()">Dismiss</button>
                <button class="btn btn-secondary" onclick="MEBV.submitFeedback()">Submit Review</button>
            `
        );

        // Star interaction script binds instantly
        const stars = document.querySelectorAll('.star-btn');
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = e.target.dataset.star;
                localStorage.setItem('mebv_temp_rating', rating);
                stars.forEach((s, idx) => {
                    s.style.color = idx < rating ? 'var(--color-secondary)' : '#CCC';
                });
            });
        });
    },

    async submitFeedback() {
        const rating = localStorage.getItem('mebv_temp_rating') || 5;
        const feedback = document.getElementById('feedback-text').value;
        const modal = document.getElementById('mebv-dynamic-modal');

        if (this.client) {
            await this.client.from('testimonials').insert({
                user_id: this.currentUser?.id || null,
                name: this.currentUser?.full_name || "Guest Student",
                feedback: feedback,
                rating: parseInt(rating),
                is_approved: false
            });
        }
        
        if (modal) modal.remove();
        localStorage.removeItem('mebv_temp_rating');
        this.showModal("Thank You!", "Your feedback has been submitted successfully to our moderators.");
    },

    // Smooth counter animation utility for home/about statistics
    animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // lower is faster
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    },

    // Dynamic UI Updates based on Auth state
    updateUIAfterLogin() {
        const authContainer = document.querySelector('.nav-actions');
        if (authContainer) {
            authContainer.innerHTML = `
                <a href="profile.html" class="btn btn-outline" style="padding: 10px 20px;">Dashboard</a>
                <button class="btn btn-primary" onclick="MEBV.logout()" style="padding: 10px 20px;">Logout</button>
            `;
        }
    },

    updateUIAfterLogout() {
        const authContainer = document.querySelector('.nav-actions');
        if (authContainer) {
            authContainer.innerHTML = `
                <a href="login.html" class="btn btn-outline" style="padding: 10px 20px;">Login</a>
                <a href="register.html" class="btn btn-primary" style="padding: 10px 20px;">Join Free</a>
            `;
        }
    },

    async logout() {
        if (this.client) {
            await this.client.auth.signOut();
            window.location.reload();
        }
    },

};

// Start Global Instance
document.addEventListener("DOMContentLoaded", () => MEBV.init());
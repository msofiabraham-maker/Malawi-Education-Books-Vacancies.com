window.RatingWidget = {
    mount(containerSelector, itemKey, callback) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const stored = localStorage.getItem(`mebv_rating_${itemKey}`);
        const rating = stored ? Number(stored) : 0;
        container.innerHTML = this.renderStars(rating);
        container.querySelectorAll('.rating-star').forEach(star => {
            star.addEventListener('click', async () => {
                const value = Number(star.dataset.value);
                localStorage.setItem(`mebv_rating_${itemKey}`, value);
                container.innerHTML = this.renderStars(value);
                if (typeof callback === 'function') {
                    await callback(value);
                }
            });
        });
    },

    renderStars(current = 0) {
        return Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            return `<span class="rating-star" data-value="${value}" style="cursor:pointer; font-size:1.4rem; color:${value <= current ? '#DFB15B' : '#CBD5E1'}; margin-right:4px;">★</span>`;
        }).join('');
    }
};

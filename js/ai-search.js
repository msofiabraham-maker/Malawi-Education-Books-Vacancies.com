window.AISearch = {
    parseCategory(query, categories) {
        const normalized = query.toLowerCase();
        return categories.find(category => normalized.includes(category.toLowerCase()));
    },

    filter(items, query, fields = ['title', 'description'], categoryField = 'category') {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return items;

        const category = this.parseCategory(normalized, items.map(item => item[categoryField]).filter(Boolean));
        return items.filter(item => {
            const matchesCategory = category ? item[categoryField] === category : true;
            const textMatch = fields.some(field => {
                const value = (item[field] || '').toString().toLowerCase();
                return value.includes(normalized);
            });
            return matchesCategory && textMatch;
        });
    }
};

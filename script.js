document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const recipeCards = document.querySelectorAll('.recipe-card');
    let scrollTimeout;
    let lastSearchTerm = '';

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        lastSearchTerm = searchTerm;
        let firstMatch = null;

        recipeCards.forEach(card => {
            const tags = card.dataset.tags.toLowerCase();
            if (tags.includes(searchTerm)) {
                card.style.display = 'block';
                if (!firstMatch) {
                    firstMatch = card;
                }
            } else {
                card.style.display = 'none';
            }
        });

        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Wait 500ms after input stops before scrolling
        scrollTimeout = setTimeout(() => {
            // Only scroll if the search term hasn't changed
            if (searchTerm === lastSearchTerm && firstMatch) {
                const parentCategory = firstMatch.closest('.category');
                if (parentCategory) {
                    parentCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, 500);
    });
});

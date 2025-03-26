document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const recipeCards = document.querySelectorAll('.recipe-card');
    let scrollTimeout;

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
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

        // Clear any previous scroll timeouts to debounce scrolling
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Only scroll if there's a matching card
        if (firstMatch) {
            scrollTimeout = setTimeout(() => {
                const parentCategory = firstMatch.closest('.category');
                if (parentCategory) {
                    parentCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300); // Wait 300ms after input stops before scrolling
        }
    });
});

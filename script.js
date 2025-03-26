document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const recipeCards = document.querySelectorAll('.recipe-card');

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

        if (firstMatch) {
            // Scroll the parent category (section) of the first matching card into view
            const parentCategory = firstMatch.closest('.category');
            if (parentCategory) {
                parentCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

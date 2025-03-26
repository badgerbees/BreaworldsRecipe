document.addEventListener('DOMContentLoaded', () => {
    // --- Search & Scroll Logic ---
    const searchBar = document.getElementById('searchBar');
    const recipeCards = document.querySelectorAll('.recipe-card');
    let scrollTimeout;
    let lastSearchTerm = '';

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        lastSearchTerm = searchTerm;

        // If the search term is empty, show all cards and cancel scrolling
        if (searchTerm.trim() === '') {
            recipeCards.forEach(card => {
                card.style.display = 'block';
            });
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            return; // Do not scroll when search is empty
        }

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

        // Wait 700ms after input stops before scrolling
        scrollTimeout = setTimeout(() => {
            // Only scroll if the search term hasn't changed and we have a match
            if (searchTerm === lastSearchTerm && firstMatch) {
                const parentCategory = firstMatch.closest('.category');
                if (parentCategory) {
                    parentCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, 700);
    });

    // --- Category Toggle Logic ---
    const toggleButton = document.getElementById('toggle-categories');
    const categoriesList = document.getElementById('categories-list');

    toggleButton.addEventListener('click', () => {
        categoriesList.classList.toggle('visible');
    });

    // Collapse the categories list when a link is clicked
    const categoryLinks = categoriesList.querySelectorAll('a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Allow the anchor's default scrolling behavior, then hide the menu
            categoriesList.classList.remove('visible');
        });
    });
});

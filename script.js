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
        let exactMatch = null;
        recipeCards.forEach(card => {
            const tags = card.dataset.tags.toLowerCase();
            if (tags.includes(searchTerm)) {
                card.style.display = 'block';
                const cardTitle = card.querySelector('h3').textContent.trim().toLowerCase();
                // Save the first matched card (fallback)
                if (!firstMatch) {
                    firstMatch = card;
                }
                // If the title exactly matches the search term, prioritize it
                if (cardTitle === searchTerm) {
                    exactMatch = card;
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Prioritize an exact match if it exists
        if (exactMatch) {
            firstMatch = exactMatch;
        }

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

    // Collapse the categories list when a link is clicked and scroll smoothly to the section
    const categoryLinks = categoriesList.querySelectorAll('a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Allow the menu to collapse before scrolling
                categoriesList.classList.remove('visible');
                setTimeout(() => {
                    const targetOffset = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetOffset,
                        behavior: 'smooth'
                    });
                }, 100); // Delay of 100ms before scrolling
            }
        });
    });
});

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

    // --- Main Category Toggle Logic ---
    const toggleButton = document.getElementById('toggle-categories');
    const categoriesList = document.getElementById('categories-list');

    toggleButton.addEventListener('click', () => {
        categoriesList.classList.toggle('visible');
    });

    // --- Subcategory Toggle Logic ---
    const subcatToggles = document.querySelectorAll('.subcat-toggle');
    subcatToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const subcatList = toggle.nextElementSibling;
            if (subcatList && subcatList.classList.contains('subcat-list')) {
                subcatList.classList.toggle('visible');
            }
        });
    });

    // --- Scroll on Category Link Click ---
    const categoryLinks = categoriesList.querySelectorAll('a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Collapse categories list
                categoriesList.classList.remove('visible');
                // Delay a bit before scrolling
                setTimeout(() => {
                    const targetOffset = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetOffset,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });
});

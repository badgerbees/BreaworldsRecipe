document.addEventListener('DOMContentLoaded', () => {
    // --- Search & Scroll Logic ---
    const searchBar = document.getElementById('searchBar');
    const searchInfo = document.getElementById('search-info'); // Element for showing category info
    const recipeCards = document.querySelectorAll('.recipe-card');
    let scrollTimeout;
    let searchInfoTimeout;
    let lastSearchTerm = '';

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        lastSearchTerm = searchTerm;
        
        // Clear any previous search info timeout
        if (searchInfoTimeout) {
            clearTimeout(searchInfoTimeout);
        }
        // Clear previous search info text immediately
        searchInfo.textContent = '';

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
        let matchedCategories = new Set();

        recipeCards.forEach(card => {
            const tags = card.dataset.tags.toLowerCase();
            if (tags.includes(searchTerm)) {
                card.style.display = 'block';
                if (!firstMatch) {
                    firstMatch = card;
                }
                // Get the category title from the closest .category element's h2
                const parentCategory = card.closest('.category');
                if (parentCategory) {
                    const categoryTitle = parentCategory.querySelector('h2').textContent.trim();
                    matchedCategories.add(categoryTitle);
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Delay the update of the search info text by 500ms
        searchInfoTimeout = setTimeout(() => {
            if (matchedCategories.size > 0) {
                searchInfo.textContent = 'Matching categories: ' + Array.from(matchedCategories).join(', ');
            } else {
                searchInfo.textContent = 'No matching categories.';
            }
        }, 500);

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

    // --- Recipe Card Click Logic ---
    recipeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a "pop" effect by adding an active class temporarily
            card.classList.add('active');
            setTimeout(() => {
                card.classList.remove('active');
            }, 200);
            
            // Get the card's title from its h3 element
            const title = card.querySelector('h3').textContent.trim();
            
            // Clear the search bar and dispatch input event to force update
            searchBar.value = '';
            searchBar.dispatchEvent(new Event('input'));
            
            // After a short delay, set the new value and dispatch input event again
            setTimeout(() => {
                searchBar.value = title;
                searchBar.dispatchEvent(new Event('input'));
                // Scroll the search bar into view at the top
                searchBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    });
});

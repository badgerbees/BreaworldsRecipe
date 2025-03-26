document.addEventListener('DOMContentLoaded', () => {
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

    // Add click event listeners for all elements with the "ingredient" class
    const ingredientElements = document.querySelectorAll('.ingredient');
    ingredientElements.forEach(ingredient => {
        ingredient.addEventListener('click', () => {
            // Get the text of the clicked ingredient and normalize it
            const searchName = ingredient.textContent.trim().toLowerCase();
            let foundCard = null;
            recipeCards.forEach(card => {
                const cardTitle = card.querySelector('h3').textContent.trim().toLowerCase();
                if (cardTitle === searchName && !foundCard) {
                    foundCard = card;
                }
            });
            if (foundCard) {
                const parentCategory = foundCard.closest('.category');
                if (parentCategory) {
                    parentCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});

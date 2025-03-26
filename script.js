document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const recipeCards = document.querySelectorAll('.recipe-card');

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();

        recipeCards.forEach(card => {
            const tags = card.dataset.tags.toLowerCase();
            if (tags.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

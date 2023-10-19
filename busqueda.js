function performSearch() {
    const cards = document.querySelectorAll('.swiper-slide');
    const searchInput = document.querySelector('#navbar__search-input');
    const filterSelect = document.querySelector('#filtro');
  
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value.toLowerCase();
  
    cards.forEach((card) => {
      const cardContent = card.textContent.toLowerCase();
      const shouldShowCard = cardContent.includes(searchTerm) && cardContent.includes(filterValue);
      
      card.style.display = shouldShowCard ? 'block' : 'none';
    });
  }
  
  // Export the function (optional, depends on your setup)
  // You can also just call this function without exporting it
  export { performSearch };
  
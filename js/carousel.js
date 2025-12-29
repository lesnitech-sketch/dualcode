/**
 * DUAL CODE - Portfolio Carousel
 * Infinite horizontal auto-scroll carousel
 */

document.addEventListener('DOMContentLoaded', function() {

  console.log('🎠 Carousel script: DOM loaded');

  // ============================================
  // Portfolio Carousel Setup
  // ============================================

  const portfolioGrid = document.getElementById('portfolio-grid');
  console.log('🎠 Portfolio grid found:', portfolioGrid);

  if (portfolioGrid) {
    // Create carousel wrapper
    const carouselWrapper = document.createElement('div');
    carouselWrapper.id = 'portfolio-carousel-wrapper';

    // Create carousel track
    const carouselTrack = document.createElement('div');
    carouselTrack.id = 'portfolio-carousel-track';

    // Get all portfolio cards
    const cards = Array.from(portfolioGrid.querySelectorAll('.portfolio-card'));
    console.log('🎠 Found', cards.length, 'portfolio cards');

    // Clone cards for infinite effect (duplicate twice)
    const allCards = [...cards, ...cards];
    console.log('🎠 Total cards (with duplicates):', allCards.length);

    // Wrap each card and add to track
    allCards.forEach((card, index) => {
      const item = document.createElement('div');
      item.className = 'portfolio-carousel-item';

      // Clone the card with all content (deep clone)
      const clonedCard = card.cloneNode(true);

      // Ensure the card is visible
      clonedCard.style.display = 'flex';
      clonedCard.style.opacity = '1';

      // Remove fade-in classes that might hide the card
      clonedCard.classList.remove('fade-in', 'stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6');

      // Case study preview removed

      item.appendChild(clonedCard);
      carouselTrack.appendChild(item);

      // Debug log
      if (index === 0) {
        console.log('🎠 First card content:', clonedCard.innerHTML.substring(0, 200));
      }
    });

    // Add track to wrapper
    carouselWrapper.appendChild(carouselTrack);

    console.log('🎠 Carousel wrapper HTML:', carouselWrapper.innerHTML.substring(0, 300));

    // Replace grid with carousel
    portfolioGrid.replaceWith(carouselWrapper);

    console.log('✨ Portfolio carousel initialized');
    console.log('🎠 Carousel wrapper:', carouselWrapper);
    console.log('🎠 Carousel track children:', carouselTrack.children.length);
  } else {
    console.warn('⚠️ Portfolio grid not found!');
  }

  // Case study preview function removed

  console.log('🎠 Carousel script loaded');
});

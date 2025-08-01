const hamburger = document.getElementById('lhHamburger');
    const menu = document.getElementById('lhMobileMenu');

    // Toggle menu
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent it from triggering the document click
      menu.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('active');
      }
});
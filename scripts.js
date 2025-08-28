// Minimal JS for accessibility and smooth scrolling

// Enable smooth scrolling for anchor links (for browsers that don't support CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      target.tabIndex = -1;
      target.focus();
    }
  });
});
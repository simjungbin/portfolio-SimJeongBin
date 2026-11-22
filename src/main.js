/**
 * SimJeongBin Portfolio - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
  }

  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) {
    headerLogo.addEventListener('click', scrollToTop);
  }
});

// Example: Smooth scroll behavior or scroll animations
window.addEventListener('scroll', () => {
  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});

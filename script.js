const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Ouvrir le menu');
  nav?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
  nav?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener(
  'scroll',
  () => header?.classList.toggle('is-scrolled', window.scrollY > 18),
  { passive: true },
);

if (prefersReducedMotion) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();

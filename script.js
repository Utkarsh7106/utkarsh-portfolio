// ============================================================
// PROGRESS BAR CONFIG
// To update QSpiders training progress: edit the values below.
// pct   → percentage complete (0 to 100)
// label → the status text shown next to the module name
// Just change these numbers — no need to touch the HTML.
// ============================================================
const PROGRESS_DATA = {
  sql:    { pct: 100, label: 'Completed ✓' },
  python: { pct: 100, label: 'Completed ✓' },
  powerbi:{ pct: 20,  label: 'In Progress' },
  excel:  { pct: 0,  label: 'Starting soon' },
  dslibs: { pct: 0,  label: 'Starting soon' },
};
// ============================================================

(function () {

  // ----- Theme toggle -----
  const toggle = document.getElementById('themeToggle');
  const html   = document.documentElement;
  const saved  = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ----- Nav on scroll -----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ----- Scroll reveal -----
  const reveals = document.querySelectorAll('.reveal');
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealIO.observe(el));

  // ----- Progress bars -----
  // Inject values from PROGRESS_DATA into the HTML, then animate on scroll.
  Object.entries(PROGRESS_DATA).forEach(([key, data]) => {
    const fill  = document.querySelector(`.prog-fill[data-prog="${key}"]`);
    const label = document.getElementById(`prog-label-${key}`);
    if (fill)  fill.style.setProperty('--pct', data.pct + '%');
    if (label) label.textContent = data.label;
  });

  const progFills = document.querySelectorAll('.prog-fill');
  const progIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate');
        progIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  progFills.forEach(el => progIO.observe(el));

  // ----- Project filter tabs -----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectRows = document.querySelectorAll('.project-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectRows.forEach(row => {
        if (filter === 'all' || row.getAttribute('data-category') === filter) {
          row.classList.remove('hidden');
        } else {
          row.classList.add('hidden');
        }
      });
    });
  });

})();

/* ══════════════════════════════════════════
   RMS Portfolio — Main Script
══════════════════════════════════════════ */

(function () {

  // Custom cursor removed

  /* ── Navbar scroll glass effect ── */
  const navHead = document.querySelector('.nav-head');
  function onScroll() {
    if (navHead) {
      if (window.scrollY > 60) navHead.classList.add('scrolled');
      else navHead.classList.remove('scrolled');
    }
    updateLineFill();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Hamburger menu ── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  function closeMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.classList.remove('is-open');
    navMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      navMenu.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ── Universal reveal helper ── */
  function makeObserver(selector, threshold) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);   // stop watching once visible
          }
        });
      },
      { threshold: threshold || 0, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
  }

  /* Watch all scroll-animated elements */
  makeObserver('.timeline-item', 0.1);
  makeObserver('.project-card',  0.05);
  makeObserver('.seminar-card',  0.05);
  makeObserver('.reveal',        0.1);

  /* Skills section (whole section gets class) */
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    const skillsObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            skillsObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    skillsObs.observe(skillsSection);
  }

  /* Contact section */
  const contactSection = document.querySelector('.contact-section');
  if (contactSection) {
    const contactObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            contactObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    contactObs.observe(contactSection);
  }

  /* ── Safety net: if anything is still invisible after 800ms, show it ── */
  setTimeout(() => {
    document.querySelectorAll('.timeline-item, .project-card, .seminar-card, .reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    if (skillsSection)  skillsSection.classList.add('is-visible');
    if (contactSection) contactSection.classList.add('is-visible');
  }, 800);

  /* ── Timeline line fill ── */
  const lineFill        = document.querySelector('.timeline-line-fill');
  const timelineSection = document.querySelector('.timeline-section');

  function updateLineFill() {
    if (!timelineSection || !lineFill) return;
    const rect     = timelineSection.getBoundingClientRect();
    const viewH    = window.innerHeight;
    const total    = rect.height + viewH;
    const scrolled = viewH - rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / total));
    lineFill.style.height = `${progress * 100}%`;
  }
  window.addEventListener('scroll', updateLineFill, { passive: true });
  updateLineFill();

  /* ── Contact form submit feedback ── */
  const form = document.getElementById('portfolio-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-send-message span');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = 'MESSAGE SENT ✓';
      setTimeout(() => { btn.textContent = orig; form.reset(); }, 3000);
    });
  }

  /* Initial scroll check */
  onScroll();

})();

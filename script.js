/* ── Timeline: scroll-reveal items + animated line fill ── */

(function () {
  const items = document.querySelectorAll('.timeline-item');
  const lineFill = document.querySelector('.timeline-line-fill');
  const timelineSection = document.querySelector('.timeline-section');

  /* ---------- Intersection Observer for item reveal ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));

  /* ---------- Intersection Observer for skills section reveal ---------- */
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    skillsObserver.observe(skillsSection);
  }

  /* ---------- Line fill driven by scroll position ---------- */
  function updateLineFill() {
    if (!timelineSection || !lineFill) return;

    const sectionRect = timelineSection.getBoundingClientRect();
    const viewH = window.innerHeight;

    // progress: 0 when section top hits bottom of viewport, 1 when section bottom hits top
    const total = sectionRect.height + viewH;
    const scrolled = viewH - sectionRect.top;
    const progress = Math.min(1, Math.max(0, scrolled / total));

    lineFill.style.height = `${progress * 100}%`;
  }

  window.addEventListener('scroll', updateLineFill, { passive: true });
  updateLineFill();

  /* ---------- Intersection Observer for project cards reveal ---------- */
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    projectCards.forEach((card) => projectObserver.observe(card));
  }
})();

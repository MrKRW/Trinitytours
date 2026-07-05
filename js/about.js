/* ============================================
   TRINITY TOURS – ABOUT US PAGE JS
   Extends main.js — page-specific behaviour
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Testimonial slider (mirrors main.js pattern) ---- */
  const track   = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const getCards   = () => track.querySelectorAll('.testi-card');
    const getVisible = () => {
      const w = window.innerWidth;
      if (w < 768) return 1;
      if (w < 1100) return 2;
      return 3;
    };

    const updateSlider = () => {
      const cards   = getCards();
      const visible = getVisible();
      const max     = Math.max(0, cards.length - visible);
      currentIndex  = Math.min(currentIndex, max);

      const cardW = cards[0] ? cards[0].offsetWidth + 24 : 404;
      track.style.transform = `translateX(-${currentIndex * cardW}px)`;
    };

    nextBtn.addEventListener('click', () => {
      const cards   = getCards();
      const visible = getVisible();
      const max     = Math.max(0, cards.length - visible);
      if (currentIndex < max) { currentIndex++; updateSlider(); }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; updateSlider(); }
    });

    window.addEventListener('resize', updateSlider);
  }

  /* ---- Scroll reveal (re-uses .reveal classes from style.css) ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Animated count-up for stat numbers ---- */
  const animateCount = (el, target, suffix = '') => {
    const duration = 1800;
    const start    = performance.now();
    const isFloat  = target % 1 !== 0;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value    = eased * target;
      el.textContent = (isFloat ? value.toFixed(1) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const id = el.id;
        if (id === 'stat-years')        animateCount(el, 15, '+');
        if (id === 'stat-travellers')   animateCount(el, 50, 'K+');
        if (id === 'stat-destinations') animateCount(el, 100, '+');
        if (id === 'stat-satisfaction') animateCount(el, 90, '%');
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  ['stat-years', 'stat-travellers', 'stat-destinations', 'stat-satisfaction'].forEach(id => {
    const el = document.getElementById(id);
    if (el) statObserver.observe(el);
  });

});

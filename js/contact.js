/* ============================================
   TRINITY TOURS – CONTACT PAGE JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('.nav-link, .btn-get-started').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

  }

  /* ---- Topic pills ---- */
  const pills = document.querySelectorAll('.topic-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  /* ---- Contact form submit (demo) ---- */
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success-msg');
  const submitBtn  = document.getElementById('btn-submit-contact');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const email = document.getElementById('contact-email');
      const fname = document.getElementById('contact-first-name');
      if (!fname.value.trim() || !email.value.trim()) {
        fname.style.borderColor = fname.value.trim() ? '' : '#e53e3e';
        email.style.borderColor = email.value.trim() ? '' : '#e53e3e';
        return;
      }

      // Simulate send
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending…';
      setTimeout(() => {
        submitBtn.disabled  = false;
        submitBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;
        submitBtn.style.background = '#40916C';
        if (successMsg) successMsg.classList.add('visible');
        form.reset();
        pills.forEach((p, i) => p.classList.toggle('selected', i === 0));
        setTimeout(() => {
          submitBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
          submitBtn.style.background = '';
        }, 4000);
      }, 1200);
    });
  }

  /* ---- FAQ accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(f => {
        f.classList.remove('open');
        f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); question.click(); }
    });
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Scroll-to-top ---- */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

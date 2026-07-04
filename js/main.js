/* ============================================
   TRINITY TOURS – JAVASCRIPT
   ============================================ */

(function () {
  'use strict';

  /* ==========================================
     NAVBAR – scroll behaviour & mobile toggle
  ========================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Scroll-to-top button
    const scrollBtn = document.getElementById('scroll-top');
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ==========================================
     HERO SLIDESHOW
  ========================================== */
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let slideTimer;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startSlideshow() {
    slideTimer = setInterval(nextSlide, 6000);
  }

  indicators.forEach(btn => {
    btn.addEventListener('click', () => {
      clearInterval(slideTimer);
      goToSlide(parseInt(btn.dataset.slide));
      startSlideshow();
    });
  });

  startSlideshow();

  /* ==========================================
     SCROLL-TO-TOP
  ========================================== */
  document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================
     COUNTER ANIMATION (STATS)
  ========================================== */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  /* ==========================================
     INTERSECTION OBSERVER – reveal on scroll
  ========================================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Animate counters when stats section appears
          entry.target.querySelectorAll('.count').forEach(animateCounter);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Add reveal classes to key sections
  const revealElements = [
    { selector: '.stats-section', cls: 'reveal' },
    { selector: '.about-text', cls: 'reveal-left' },
    { selector: '.about-image-grid', cls: 'reveal-right' },
    { selector: '.package-card', cls: 'reveal' },
    { selector: '.dest-card', cls: 'reveal' },
    { selector: '.testi-card', cls: 'reveal' },
    { selector: '.story-card', cls: 'reveal' },
    { selector: '.contact-info', cls: 'reveal-left' },
    { selector: '.contact-form-wrap', cls: 'reveal-right' },
    { selector: '.cta-content', cls: 'reveal' },
    { selector: '.newsletter-box', cls: 'reveal' },
    { selector: '.stat-item', cls: 'reveal' },
  ];

  revealElements.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(cls);
      el.style.transitionDelay = `${i * 0.08}s`;
      revealObserver.observe(el);
    });
  });

  // Stats section specific observer for counters
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.count').forEach(animateCounter);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }

  /* ==========================================
     DESTINATIONS FILTER TABS
  ========================================== */
  const destTabs = document.querySelectorAll('.dest-tab');
  const destCards = document.querySelectorAll('.dest-card');

  destTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      destTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      destCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================
     TESTIMONIALS CAROUSEL
  ========================================== */
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');
  const testiCards = track ? track.querySelectorAll('.testi-card') : [];
  let testiIndex = 0;
  let cardsVisible = 3;

  function updateCardsVisible() {
    if (window.innerWidth < 768) cardsVisible = 1;
    else if (window.innerWidth < 900) cardsVisible = 2;
    else cardsVisible = 3;
  }

  function moveTestimonials(dir) {
    updateCardsVisible();
    const maxIndex = Math.max(0, testiCards.length - cardsVisible);
    testiIndex = Math.max(0, Math.min(testiIndex + dir, maxIndex));
    const cardWidth = testiCards[0] ? testiCards[0].offsetWidth + 24 : 0;
    track.style.transform = `translateX(-${testiIndex * cardWidth}px)`;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => moveTestimonials(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveTestimonials(1));

  // Auto-rotate testimonials
  let testiAutoTimer = setInterval(() => moveTestimonials(1), 5000);
  if (track) {
    track.addEventListener('mouseenter', () => clearInterval(testiAutoTimer));
    track.addEventListener('mouseleave', () => {
      testiAutoTimer = setInterval(() => {
        updateCardsVisible();
        const maxIndex = Math.max(0, testiCards.length - cardsVisible);
        if (testiIndex >= maxIndex) testiIndex = -1;
        moveTestimonials(1);
      }, 5000);
    });
  }

  /* ==========================================
     CONTACT FORM
  ========================================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-contact-submit');
      const success = document.getElementById('form-success');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Sent! ✓';
        btn.style.background = '#40916C';
        success.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled = false;
          btn.style.background = '';
          success.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

  /* ==========================================
     NEWSLETTER FORM
  ========================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-newsletter-submit');
      btn.textContent = 'Subscribed! ✓';
      btn.style.background = '#52B788';
      btn.disabled = true;
      document.getElementById('newsletter-email').value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    });
  }

  /* ==========================================
     SEARCH BOX
  ========================================== */
  const searchBtn = document.querySelector('.btn-search');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const dest = document.getElementById('search-destination').value;
      const checkin = document.getElementById('search-checkin').value;
      if (!dest) {
        document.getElementById('search-destination').focus();
        document.getElementById('search-destination').style.borderBottom = '2px solid #E9A227';
        return;
      }
      // Scroll to packages section as a simple search action
      document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ==========================================
     SMOOTH ANCHOR SCROLLING
  ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ==========================================
     HOVER PARALLAX ON PACKAGE CARDS
  ========================================== */
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ==========================================
     INIT – mark as ready
  ========================================== */
  document.body.classList.add('js-ready');
  console.log('✅ Trinity Tours – Sri Lanka | All systems go!');

})();

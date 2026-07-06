/* ============================================
   TRINITY TOURS – ABOUT US PAGE JS
   Extends main.js — page-specific behaviour
   ============================================ */

/* ---- localStorage key for reviews ---- */
const REVIEWS_KEY = 'trinityTours_reviews';

/* ---- Default seed reviews (shown on first load) ---- */
const DEFAULT_REVIEWS = [
  {
    id: 'default-1',
    name: 'Sophia Carter',
    location: 'Travel Blogger, UK',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4,
    text: 'An absolutely unforgettable experience! The seamless booking process and well-curated packages made my trip stress-free. Every destination felt like a dream come true!'
  },
  {
    id: 'default-2',
    name: 'Ravi Patel',
    location: 'Dubai, UAE',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    text: 'Professional, punctual and passionate about their country. Trinity Tours showed us the real Sri Lanka beyond just the tourist spots. Genuinely life-changing.'
  },
  {
    id: 'default-3',
    name: 'Daniel Carter',
    location: 'Solo Traveller, Australia',
    avatar: 'https://i.pravatar.cc/150?img=53',
    rating: 4,
    text: "Trinity Tours exceeded my expectations. The booking was fast and stress-free. Every detail of my trip was handled properly. Can't wait to book my next trip with them!"
  },
  {
    id: 'default-4',
    name: 'Emma Wilson',
    location: 'Adventure Photographer, Canada',
    avatar: 'https://i.pravatar.cc/150?img=44',
    rating: 5,
    text: 'The personalised recommendations and top-notch accommodations exceeded all my expectations. Trinity Tours is the gold standard for Sri Lanka travel. Highly recommended!'
  }
];

/* ---- Get reviews from localStorage (seeding defaults if first visit) ---- */
function getReviews() {
  try {
    const stored = localStorage.getItem(REVIEWS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) { /* ignore */ }
  // First visit — seed with defaults and save
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(DEFAULT_REVIEWS));
  return DEFAULT_REVIEWS;
}

/* ---- Build star SVGs for a given rating (1–5) ---- */
function buildStars(rating) {
  const filled = '#D3A154';
  const empty  = '#E2E8F0';
  const starPath = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
  let html = '';
  for (let i = 1; i <= 5; i++) {
    const color = i <= rating ? filled : empty;
    html += `<svg width="18" height="18" viewBox="0 0 24 24" fill="${color}"><path d="${starPath}"/></svg>`;
  }
  return html;
}

/* ---- Build a single testimonial card HTML ---- */
function buildCard(review) {
  const initials = review.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const avatarHTML = review.avatar
    ? `<img src="${review.avatar}" alt="${review.name}" class="testi-avatar-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
       <div class="testi-avatar-fallback" style="display:none;">${initials}</div>`
    : `<div class="testi-avatar-fallback">${initials}</div>`;

  return `
    <div class="testi-card" data-review-id="${review.id}">
      <div class="testi-header">
        <div class="testi-author-wrapper">
          <div class="testi-avatar-wrap">
            ${avatarHTML}
          </div>
          <div class="testi-author-info">
            <strong>${review.name}</strong>
            <span>${review.location || ''}</span>
          </div>
        </div>
        <div class="testi-quote-icon">
          <svg width="28" height="24" viewBox="0 0 28 24" fill="#4a6c52">
            <polygon points="10,0 16,0 6,24 0,24" />
            <polygon points="22,0 28,0 18,24 12,24" />
          </svg>
        </div>
      </div>
      <p class="testi-text">${review.text}</p>
      <div class="testi-stars">${buildStars(review.rating)}</div>
    </div>
  `;
}

/* ---- Render all reviews into the slider track ---- */
function renderReviews() {
  const track   = document.getElementById('testimonials-track');
  const empty   = document.getElementById('testi-empty');
  const trackWrap = document.querySelector('.testimonials-track-wrap');
  if (!track) return;

  const reviews = getReviews();

  if (!reviews || reviews.length === 0) {
    track.innerHTML = '';
    if (trackWrap) trackWrap.style.display = 'none';
    if (empty) empty.style.display = 'flex';
    return;
  }

  if (trackWrap) trackWrap.style.display = '';
  if (empty) empty.style.display = 'none';
  track.innerHTML = reviews.map(buildCard).join('');
}

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Render reviews first ---- */
  renderReviews();

  /* ---- Testimonial slider ---- */
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
      if (!cards.length) return;
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

    window.addEventListener('resize', () => {
      currentIndex = 0;
      updateSlider();
    });

    // Initial call after render
    setTimeout(updateSlider, 50);
  }

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
      const eased    = 1 - Math.pow(1 - progress, 3);
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

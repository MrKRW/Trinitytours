/* ============================================
   TRINITY TOURS – DESTINATIONS PAGE JAVASCRIPT
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

    // Scroll-to-top button
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }
  });

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



  /* ==========================================
     SCROLL TO TOP
  ========================================== */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================
     DESTINATIONS FILTER & SEARCH
  ========================================== */
  const tabButtons   = document.querySelectorAll('#dest-tabs-page .dest-tab');
  const allCards     = document.querySelectorAll('#dest-page-grid .dest-page-card');
  const countEl      = document.getElementById('dest-count');
  const searchInput  = document.getElementById('dest-search-input');
  const emptyState   = document.getElementById('dest-empty-state');
  const loadMoreWrap = document.getElementById('dest-load-more-wrap');
  const sortSelect   = document.getElementById('dest-sort');

  let activeFilter = 'all';
  let searchQuery  = '';

  // Update the count display
  function updateCount(n) {
    if (countEl) {
      countEl.innerHTML = `Showing <strong>${n}</strong> destination${n !== 1 ? 's' : ''}`;
    }
  }

  // Apply filter + search
  function applyFilters() {
    let visible = 0;

    allCards.forEach(card => {
      const categories = card.dataset.category || '';
      const name       = card.dataset.name || '';

      const categoryMatch = activeFilter === 'all' || categories.includes(activeFilter);
      const searchMatch   = searchQuery === '' || name.includes(searchQuery.toLowerCase());

      if (categoryMatch && searchMatch) {
        card.classList.remove('hidden');
        card.style.display = '';
        visible++;
      } else {
        card.classList.add('hidden');
        card.style.display = 'none';
      }
    });

    updateCount(visible);

    if (emptyState) {
      emptyState.style.display = visible === 0 ? 'block' : 'none';
    }
    if (loadMoreWrap) {
      loadMoreWrap.style.display = visible === 0 ? 'none' : 'block';
    }
  }

  // Tab click
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Reset filter (empty state button)
  const resetBtn = document.getElementById('btn-reset-filter');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeFilter = 'all';
      searchQuery  = '';
      if (searchInput) searchInput.value = '';
      tabButtons.forEach(t => t.classList.remove('active'));
      const allTab = document.getElementById('tab-all');
      if (allTab) allTab.classList.add('active');
      applyFilters();
    });
  }

  // Sort (re-orders DOM cards)
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const sortVal = sortSelect.value;
      const grid    = document.getElementById('dest-page-grid');
      if (!grid) return;

      const cardsArr = Array.from(grid.querySelectorAll('.dest-page-card'));

      cardsArr.sort((a, b) => {
        const priceA  = parseFloat(a.dataset.price);
        const priceB  = parseFloat(b.dataset.price);
        const ratingA = parseFloat(a.dataset.rating);
        const ratingB = parseFloat(b.dataset.rating);

        if (sortVal === 'price-low')  return priceA - priceB;
        if (sortVal === 'price-high') return priceB - priceA;
        if (sortVal === 'rating')     return ratingB - ratingA;
        return 0; // popular – keep original order
      });

      // Re-append in sorted order
      cardsArr.forEach(c => grid.appendChild(c));
    });
  }

  // Initial count
  updateCount(allCards.length);

  /* ==========================================
     LOAD MORE (simulated – toggle hidden cards)
  ========================================== */
  const INITIAL_SHOW = 9; // show 9 cards initially; load more reveals the rest
  let showingAll = false;

  function setInitialVisibility() {
    allCards.forEach((card, i) => {
      if (i >= INITIAL_SHOW) {
        card.setAttribute('data-loadmore', 'true');
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
    updateCount(Math.min(allCards.length, INITIAL_SHOW));
  }

  const loadMoreBtn = document.getElementById('btn-load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      if (!showingAll) {
        allCards.forEach(card => {
          if (card.getAttribute('data-loadmore') === 'true') {
            card.removeAttribute('data-loadmore');
            card.style.display = '';
            card.classList.remove('hidden');
          }
        });
        loadMoreBtn.textContent = 'Show Less';
        showingAll = true;
        updateCount(allCards.length);
      } else {
        setInitialVisibility();
        loadMoreBtn.textContent = 'Load More Destinations';
        showingAll = false;
        window.scrollTo({ top: document.getElementById('dest-page-grid').offsetTop - 120, behavior: 'smooth' });
      }
    });
  }

  setInitialVisibility();

  /* ==========================================
     INTERSECTION OBSERVER – reveal on scroll
  ========================================== */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.about-stat-pill, .region-card, .bento-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

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
     INIT
  ========================================== */
  document.body.classList.add('js-ready');
  console.log('✅ Trinity Tours – Destinations Page | Ready');

})();

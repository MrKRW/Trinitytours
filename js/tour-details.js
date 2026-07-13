document.addEventListener('DOMContentLoaded', () => {
  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const tourId = params.get('id');

  // Fallback to beach if none provided (for testing/graceful degradation)
  const data = tourData[tourId] || tourData['beach'];

  if (data) {
    // Populate Hero
    document.getElementById('hero-bg').style.backgroundImage = `url('${data.image}')`;
    document.getElementById('tour-title').textContent = data.title;
    document.getElementById('tour-duration').textContent = data.duration;
    document.getElementById('tour-category').textContent = data.category;
    document.title = `${data.title} - Trinity Tours`;

    // Populate Sidebar
    document.getElementById('tour-price').innerHTML = `${data.price} <span>/ person</span>`;

    // Populate Main Content
    document.getElementById('tour-desc').textContent = data.description;

    // Populate Highlights
    const highlightsContainer = document.getElementById('tour-highlights');
    data.highlights.forEach(highlight => {
      const div = document.createElement('div');
      div.className = 'highlight-item';
      div.innerHTML = `
        <svg class="highlight-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${highlight}</span>
      `;
      highlightsContainer.appendChild(div);
    });

    // Populate Itinerary
    const itineraryContainer = document.getElementById('tour-itinerary');
    data.itinerary.forEach((day, index) => {
      const item = document.createElement('div');
      item.className = `itinerary-item ${index === 0 ? 'active' : ''}`;
      
      const header = document.createElement('div');
      header.className = 'itinerary-header';
      header.innerHTML = `
        <span class="itinerary-day">${day.day}</span>
        <span class="itinerary-title">${day.title}</span>
        <svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;

      const body = document.createElement('div');
      body.className = 'itinerary-body';
      body.textContent = day.description;

      // Accordion logic
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.itinerary-item').forEach(el => {
          el.classList.remove('active');
          el.querySelector('.chevron').style.transform = 'rotate(0deg)';
        });

        // Open this one if it wasn't active
        if (!isActive) {
          item.classList.add('active');
          header.querySelector('.chevron').style.transform = 'rotate(180deg)';
        }
      });

      // Initial rotation for the first item
      if (index === 0) {
        header.querySelector('.chevron').style.transform = 'rotate(180deg)';
      }

      item.appendChild(header);
      item.appendChild(body);
      itineraryContainer.appendChild(item);
    });
  }
});

/**
 * ISAP FORUM - CORE SCRIPT & INTERACTION SYSTEM
 * Information Systems Academics and Practitioners Forum (Ghana & Africa)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  highlightActiveNavLink();
  initAnnouncementBanner();
  initForumModal();
  initForumSearch();
  initContactForm();
  initResourceFiltering();
});

/* ==========================================================================
   1. MOBILE NAVIGATION SYSTEM
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mobileMenu = document.getElementById('mobileNavMenu');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleMobileMenu(!isExpanded);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('is-open') && !mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMobileMenu(false);
    }
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      toggleMobileMenu(false);
      toggleBtn.focus();
    }
  });

  // Close mobile menu on screen resize if window expands past desktop breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  });

  function toggleMobileMenu(show) {
    toggleBtn.setAttribute('aria-expanded', show ? 'true' : 'false');
    if (show) {
      mobileMenu.classList.add('is-open');
    } else {
      mobileMenu.classList.remove('is-open');
    }
  }
}

/* ==========================================================================
   2. ACTIVE NAVIGATION INDICATOR
   ========================================================================== */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const desktopLinks = document.querySelectorAll('.nav-link');
  desktopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* ==========================================================================
   3. PROMOTIONAL BANNER WITH PICTURE (PLACED AFTER NAVBAR)
   ========================================================================== */
const isapAnnouncementData = {
  id: "isap_announcement_2026_01",
  enabled: true,
  type: "event",
  image: "assets/hero-group-1.jpg",
  imageAlt: "ISAP Academic and Practitioner Forum Community members in Ghana",
  label: "UPCOMING PUBLIC FORUM 2026",
  title: "The Future of Artificial Intelligence & Information Systems in Ghana",
  description: "Join academics, practitioners, and policy leaders for a national discussion in Accra.",
  buttonText: "View Forum Details",
  buttonUrl: "forum.html",
  endDate: "2026-12-31",
  dismissable: true
};

function initAnnouncementBanner() {
  const bannerContainer = document.getElementById('isapPromoBanner');
  if (!bannerContainer || !isapAnnouncementData.enabled) return;

  // Check Expiration Date
  if (isapAnnouncementData.endDate) {
    const now = new Date();
    const expiryDate = new Date(isapAnnouncementData.endDate);
    if (now > expiryDate) {
      bannerContainer.style.display = 'none';
      return;
    }
  }

  // Check localStorage Persistence (if dismissed)
  const isDismissed = localStorage.getItem(`isap_banner_dismissed_${isapAnnouncementData.id}`);
  if (isDismissed === 'true') {
    bannerContainer.style.display = 'none';
    return;
  }

  // Render Banner Content with Image
  bannerContainer.innerHTML = `
    <div class="container">
      <div class="promo-banner-inner">
        <div class="promo-content-group">
          <img src="${isapAnnouncementData.image}" alt="${isapAnnouncementData.imageAlt}" class="promo-banner-img">
          <div class="promo-text-group">
            <span class="promo-badge">${isapAnnouncementData.label}</span>
            <h3 class="promo-title">${isapAnnouncementData.title}</h3>
            <p class="promo-desc">${isapAnnouncementData.description}</p>
          </div>
        </div>
        <div class="promo-actions-group">
          <a href="${isapAnnouncementData.buttonUrl}" class="btn btn-navy btn-sm">
            <span>${isapAnnouncementData.buttonText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          ${isapAnnouncementData.dismissable ? `
            <button class="promo-dismiss-btn" id="dismissPromoBannerBtn" aria-label="Close announcement">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  bannerContainer.style.display = 'block';

  // Handle Dismiss Event
  const dismissBtn = document.getElementById('dismissPromoBannerBtn');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      bannerContainer.style.display = 'none';
      localStorage.setItem(`isap_banner_dismissed_${isapAnnouncementData.id}`, 'true');
    });
  }
}

/* ==========================================================================
   4. ACCESSIBLE FORUM MODAL DIALOG ("Start a Discussion")
   ========================================================================== */
function initForumModal() {
  const triggerBtns = document.querySelectorAll('.js-start-discussion-btn');
  const modal = document.getElementById('startDiscussionModal');
  const closeBtns = document.querySelectorAll('.js-modal-close');
  let lastActiveElement = null;

  if (!modal || triggerBtns.length === 0) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      lastActiveElement = document.activeElement;
      openModal();
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 50);
    }
  }

  function closeModal() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }
}

/* ==========================================================================
   5. LIVE FORUM BOARD SEARCH / FILTER
   ========================================================================== */
function initForumSearch() {
  const searchInput = document.getElementById('forumSearchInput');
  const boardCards = document.querySelectorAll('.forum-board-card');

  if (!searchInput || boardCards.length === 0) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    boardCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (query === '' || text.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successAlert = document.getElementById('contactSuccessAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name validation
    const nameInput = document.getElementById('contactName');
    const nameError = document.getElementById('contactNameError');
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Full name is required.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Email validation
    const emailInput = document.getElementById('contactEmail');
    const emailError = document.getElementById('contactEmailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Email address is required.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Subject validation
    const subjectInput = document.getElementById('contactSubject');
    const subjectError = document.getElementById('contactSubjectError');
    if (!subjectInput.value.trim()) {
      showError(subjectInput, subjectError, 'Subject is required.');
      isValid = false;
    } else {
      clearError(subjectInput, subjectError);
    }

    // Message validation
    const messageInput = document.getElementById('contactMessage');
    const messageError = document.getElementById('contactMessageError');
    if (!messageInput.value.trim()) {
      showError(messageInput, messageError, 'Message is required.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters long.');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    if (isValid) {
      if (successAlert) {
        successAlert.classList.add('is-visible');
      }
      form.reset();
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  function showError(input, errorElement, message) {
    input.classList.add('has-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('is-visible');
    }
  }

  function clearError(input, errorElement) {
    input.classList.remove('has-error');
    if (errorElement) {
      errorElement.classList.remove('is-visible');
    }
  }
}

/* ==========================================================================
   7. RESOURCES REPOSITORY FILTERING
   ========================================================================== */
function initResourceFiltering() {
  const filterBtns = document.querySelectorAll('.js-resource-filter');
  const resourceCards = document.querySelectorAll('.resource-card');

  if (filterBtns.length === 0 || resourceCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter visible cards
      resourceCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (selectedFilter === 'all' || category === selectedFilter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. ISAP PROMOTIONAL SLIDING CAROUSEL MODULE (IMAGES ONLY, NO TEXT)
   ========================================================================== */
/**
 * Retrieves the promo slide dataset.
 * // TODO: Replace with backend fetch() call when admin panel is available to manage slides dynamically.
 */
function getPromoSlides() {
  return Promise.resolve([
    { src: 'assets/hero-group-1.jpg', alt: 'ISAP Academic and Practitioner Community gathering in Ghana' },
    { src: 'assets/hero-group-2.jpg', alt: 'ISAP Information Systems conference delegates and speakers' },
    { src: 'assets/promo-slide-1.png', alt: 'ISAP UPSA academic community group photo' },
    { src: 'assets/promo-slide-2.png', alt: 'ISAP information systems seminar workshop meeting' },
    { src: 'assets/promo-slide-3.png', alt: 'ISAP technology trends and awareness webinar poster' },
    { src: 'assets/promo-slide-4.png', alt: 'ISAP Bachelor of Science in Information Technology banner' }
  ]);
}

(function initIsapPromoCarouselModule() {
  document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.getElementById('isapPromoCarousel');
    var track = document.getElementById('promoCarouselTrack');
    var dotsContainer = document.getElementById('promoCarouselDots');

    if (!carousel || !track || !dotsContainer) return;

    // Permanent visible display
    carousel.style.display = 'block';

    getPromoSlides().then(function(slides) {
      if (!slides || slides.length === 0) return;

      // Populate Slides & Dots Dynamically
      track.innerHTML = '';
      dotsContainer.innerHTML = '';

      slides.forEach(function(slide, idx) {
        // Slide Element
        var slideEl = document.createElement('div');
        slideEl.className = 'promo-carousel-slide' + (idx === 0 ? ' is-active' : '');
        slideEl.setAttribute('role', 'tabpanel');
        slideEl.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');

        var imgEl = document.createElement('img');
        imgEl.src = slide.src;
        imgEl.alt = slide.alt; // Screen reader accessible alt text, visually no text overlaid
        imgEl.className = 'promo-carousel-img';
        slideEl.appendChild(imgEl);
        track.appendChild(slideEl);

        // Dot Indicator (Dots only, no text labels)
        var dotBtn = document.createElement('button');
        dotBtn.type = 'button';
        dotBtn.className = 'promo-carousel-dot' + (idx === 0 ? ' is-active' : '');
        dotBtn.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
        dotBtn.addEventListener('click', function() {
          goToSlide(idx);
        });
        dotsContainer.appendChild(dotBtn);
      });

      var currentSlideIndex = 0;
      var autoAdvanceInterval = null;
      var slideDuration = 4000; // Auto advance every 4 seconds

      function goToSlide(index) {
        var slideNodes = track.querySelectorAll('.promo-carousel-slide');
        var dotNodes = dotsContainer.querySelectorAll('.promo-carousel-dot');

        if (slideNodes.length === 0) return;

        currentSlideIndex = (index + slideNodes.length) % slideNodes.length;

        slideNodes.forEach(function(s, i) {
          if (i === currentSlideIndex) {
            s.classList.add('is-active');
            s.setAttribute('aria-hidden', 'false');
          } else {
            s.classList.remove('is-active');
            s.setAttribute('aria-hidden', 'true');
          }
        });

        dotNodes.forEach(function(d, i) {
          if (i === currentSlideIndex) {
            d.classList.add('is-active');
            d.setAttribute('aria-selected', 'true');
          } else {
            d.classList.remove('is-active');
            d.setAttribute('aria-selected', 'false');
          }
        });
      }

      function startAutoAdvance() {
        stopAutoAdvance();
        autoAdvanceInterval = setInterval(function() {
          goToSlide(currentSlideIndex + 1);
        }, slideDuration);
      }

      function stopAutoAdvance() {
        if (autoAdvanceInterval) {
          clearInterval(autoAdvanceInterval);
          autoAdvanceInterval = null;
        }
      }

      // Accessibility & Hover Interactions (Pause on hover/focus)
      carousel.addEventListener('mouseenter', stopAutoAdvance);
      carousel.addEventListener('mouseleave', startAutoAdvance);
      carousel.addEventListener('focusin', stopAutoAdvance);
      carousel.addEventListener('focusout', startAutoAdvance);

      startAutoAdvance();
    });
  });
})();




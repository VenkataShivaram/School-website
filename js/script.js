/**
 * Vijay Vidhyanikethan High School — script.js
 * =============================================
 * Features:
 *   1. Dark / Light Mode Toggle (localStorage)
 *   2. Hamburger Mobile Menu
 *   3. Sticky Navbar scroll behaviour
 *   4. Smooth Scrolling
 *   5. Scroll Animations (IntersectionObserver)
 *   6. Animated Counters
 *   7. Gallery Filter Tabs
 *   8. Lightbox Image Viewer
 *   9. Admission Form Validation
 *  10. Contact Form Validation
 *  11. Back-to-Top Button
 */

'use strict';

/* =====================================================
   1. DARK / LIGHT MODE
   ===================================================== */
(function initTheme() {
  const STORAGE_KEY = 'vvn-theme';
  const html        = document.documentElement;
  const toggle      = document.getElementById('themeToggle');
  const icon        = document.getElementById('themeIcon');

  /** Apply a theme ('dark' or 'light') */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (icon) {
      icon.className = theme === 'dark'
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-moon';
    }
    if (toggle) {
      toggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  /** Read saved preference, fall back to OS preference */
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Initialise on load
  applyTheme(getInitialTheme());

  // Toggle button click
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();


/* =====================================================
   2. HAMBURGER MOBILE MENU
   ===================================================== */
(function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu
    ? mobileMenu.querySelectorAll('.mobile-menu__link')
    : [];

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });
})();


/* =====================================================
   3. STICKY NAVBAR — scroll behaviour + active link
   ===================================================== */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveLink() {
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) currentId = sec.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === `#${currentId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
  }, { passive: true });

  updateNavbar();
  updateActiveLink();
})();


/* =====================================================
   4. SMOOTH SCROLLING for anchor links
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-h'),
        10
      ) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* =====================================================
   5. SCROLL ANIMATIONS (IntersectionObserver)
   ===================================================== */
(function initScrollAnimations() {
  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Just make all elements visible immediately
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
    // Stagger delay for grid children
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    observer.observe(el);
  });
})();


/* =====================================================
   6. ANIMATED COUNTERS
   ===================================================== */
(function initCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        if (prefersReduced) { el.textContent = target; return; }
        let start     = 0;
        const duration = 1800;
        const step     = Math.ceil(target / (duration / 16));
        const timer    = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = start;
          if (start >= target) clearInterval(timer);
        }, 16);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));
})();


/* =====================================================
   7. GALLERY FILTER TABS
   ===================================================== */
(function initGalleryTabs() {
  const tabs  = document.querySelectorAll('.gallery__tab');
  const items = document.querySelectorAll('.gallery__item');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => {
        t.classList.remove('gallery__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('gallery__tab--active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        item.classList.toggle('hidden', !show);

        // Re-trigger animation
        if (show) {
          item.classList.remove('visible');
          setTimeout(() => item.classList.add('visible'), 30);
        }
      });
    });
  });

  // Make all visible on load
  items.forEach(item => item.classList.add('visible'));
})();


/* =====================================================
   8. LIGHTBOX IMAGE VIEWER
   ===================================================== */
/** Open the lightbox with the given image source and alt text */
function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightboxImage');
  const cap      = document.getElementById('lightboxCaption');

  if (!lightbox || !img) return;

  img.src = src;
  img.alt = caption || '';
  if (cap) cap.textContent = caption || '';

  lightbox.removeAttribute('hidden');
  lightbox.classList.add('opening');
  document.body.style.overflow = 'hidden';

  // Focus the close button for keyboard accessibility
  const closeBtn = document.getElementById('lightbox-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

/** Close the lightbox */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightboxImage');
  if (!lightbox) return;
  lightbox.setAttribute('hidden', '');
  lightbox.classList.remove('opening');
  document.body.style.overflow = '';
  if (img) { img.src = ''; img.alt = ''; }
}

// Close on Escape key
document.addEventListener('keydown', e => {
  const lightbox = document.getElementById('lightbox');
  if (e.key === 'Escape' && lightbox && !lightbox.hasAttribute('hidden')) {
    closeLightbox();
  }
});


/* =====================================================
   9. ADMISSION FORM VALIDATION
   ===================================================== */
(function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;

  /** Validate a single field, return true if valid */
  function validateField(id, rules) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    if (!input || !error) return false; // If elements are missing, fail validation for safety

    let message = '';
    const value = input.value.trim();

    if (rules.required && !value) {
      message = rules.requiredMsg || 'This field is required.';
    } else if (rules.minLength && value.length < rules.minLength) {
      message = rules.minLengthMsg || `Minimum ${rules.minLength} characters required.`;
    } else if (rules.pattern && !rules.pattern.test(value)) {
      message = rules.patternMsg || 'Invalid input.';
    }

    error.textContent = message;
    if (message) {
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
    
    return !message;
  }

  function validateAdmissionForm() {
    let isValid = true;

    if (!validateField('studentName', {
      required: true,
      requiredMsg: 'Please enter the student\'s name.',
      minLength: 3,
      minLengthMsg: 'Name must be at least 3 characters.'
    })) {
      isValid = false;
    }

    if (!validateField('parentName', {
      required: true,
      requiredMsg: 'Please enter the parent or guardian\'s name.',
      minLength: 3,
      minLengthMsg: 'Name must be at least 3 characters.'
    })) {
      isValid = false;
    }

    if (!validateField('phone', {
      required: true,
      requiredMsg: 'Please enter a phone number.',
      pattern: /^[6-9]\d{9}$/,
      patternMsg: 'Please enter a valid 10-digit Indian mobile number.'
    })) {
      isValid = false;
    }

    if (!validateField('classApplying', {
      required: true,
      requiredMsg: 'Please select the class applying for.'
    })) {
      isValid = false;
    }

    if (!validateField('admissionMessage', {
      required: true,
      requiredMsg: 'Please write your message.',
      minLength: 10,
      minLengthMsg: 'Message must be at least 10 characters.'
    })) {
      isValid = false;
    }
    
    return isValid;
  }

  // Clear errors dynamically on input
  ['studentName', 'parentName', 'phone', 'classApplying', 'admissionMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        const error = document.getElementById(`${id}-error`);
        if (error) error.textContent = '';
        el.classList.remove('error');
      });
    }
  });

  // Allow only digits in phone fields
  const phoneEl = document.getElementById('phone');
  if (phoneEl) {
    phoneEl.addEventListener('input', () => {
      phoneEl.value = phoneEl.value.replace(/\D/g, '');
    });
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Prevent submission if validation fails
    if (validateAdmissionForm() === false) {
      return; 
    }

    const submitBtn = document.getElementById('admissionSubmit');
    const success = document.getElementById('admissionSuccess');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    }

    if (success) {
      success.setAttribute('hidden', 'true');
    }

    const payload = {
      studentName: document.getElementById('studentName').value.trim(),
      parentName: document.getElementById('parentName').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      className: document.getElementById('classApplying').value,
      message: document.getElementById('admissionMessage').value.trim()
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwSR0cSRkG-eozIsHOwqlWYis0T0-BqLlfbPi-wKUJ2iONp9BDIg7fWGuZCGAAyCVUF/exec', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        if (success) {
          success.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i><p>Thank you! Your admission enquiry has been submitted.</p>';
          success.style.color = '';
          success.removeAttribute('hidden');
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Enquiry Submitted';
        }
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Submission error:', error);
      if (success) {
        success.innerHTML = '<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i><p>Submission failed. Please try again.</p>';
        success.style.color = '#e53e3e';
        success.removeAttribute('hidden');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
})();


/* =====================================================
   10. CONTACT FORM VALIDATION
   ===================================================== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function validateField(id, rules) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    if (!input || !error) return true;

    let message = '';

    if (rules.required && !input.value.trim()) {
      message = rules.requiredMsg || 'This field is required.';
    } else if (rules.minLength && input.value.trim().length < rules.minLength) {
      message = rules.minLengthMsg || `Minimum ${rules.minLength} characters required.`;
    } else if (rules.pattern && !rules.pattern.test(input.value.trim())) {
      message = rules.patternMsg || 'Invalid input.';
    }

    error.textContent = message;
    input.classList.toggle('error', !!message);
    return !message;
  }

  function validateContactForm() {
    const v1 = validateField('contactParentName', {
      required:    true,
      requiredMsg: 'Please enter your name.',
      minLength:   2,
      minLengthMsg:'Name must be at least 2 characters.'
    });
    const v2 = validateField('contactPhone', {
      required:    true,
      requiredMsg: 'Please enter your phone number.',
      pattern:     /^[6-9]\d{9}$/,
      patternMsg:  'Please enter a valid 10-digit Indian mobile number.'
    });
    const v3 = validateField('contactMessage', {
      required:    true,
      requiredMsg: 'Please write your message.',
      minLength:   10,
      minLengthMsg:'Message must be at least 10 characters.'
    });
    return v1 && v2 && v3;
  }

  // Allow only digits in phone
  const contactPhone = document.getElementById('contactPhone');
  if (contactPhone) {
    contactPhone.addEventListener('input', () => {
      contactPhone.value = contactPhone.value.replace(/\D/g, '');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateContactForm()) return;

    // --- BACKEND HOOK ---
    // Replace this block with an actual fetch/API call to your backend:
    //
    // const formData = {
    //   parentName: document.getElementById('contactParentName').value.trim(),
    //   phone:      document.getElementById('contactPhone').value.trim(),
    //   message:    document.getElementById('contactMessage').value.trim(),
    // };
    //
    // fetch('/api/contact', {
    //   method:  'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body:    JSON.stringify(formData),
    // }).then(...);
    // --- END BACKEND HOOK ---

    const success   = document.getElementById('contactSuccess');
    const submitBtn = document.getElementById('contactSubmit');
    if (success) {
      success.removeAttribute('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent';
    }
    form.reset();
  });
})();


/* =====================================================
   11. BACK TO TOP BUTTON
   ===================================================== */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

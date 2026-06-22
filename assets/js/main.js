document.addEventListener('DOMContentLoaded', () => {
  // --- Check Touch Device ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
  }

  // --- Custom Cursor ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (!isTouchDevice && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;
      cursorDot.style.transform = `translate(${x}px, ${y}px)`;
      
      // Add slight lag to outline for premium organic feel
      cursorOutline.animate({
        transform: `translate(${x}px, ${y}px)`
      }, { duration: 250, fill: "forwards" });
    });

    // Hover effects for links and interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .clickable, input, textarea, select, .portfolio-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
        cursorDot.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
        cursorDot.classList.remove('hover');
      });
    });
  }

  // --- Loading Screen ---
  const loader = document.getElementById('loader');
  if (loader) {
    // 1.8s display then fade out
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.add('loaded');
        // Start counters AFTER loader is fully hidden (above-the-fold stats)
        startCounters();
      }, 600);
    }, 1800);
  }

  // --- Sticky Header, Scroll Progress & Scroll-to-Top ---
  const header = document.querySelector('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    // Sticky header
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Progress
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progressPct = (window.scrollY / totalHeight) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = `${progressPct}%`;
      }
    }

    // Scroll to Top visibility
    if (scrollToTopBtn) {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger-menu');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          burger.classList.remove('active');
        }

        const headerHeight = header.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Mobile Menu Toggle ---
  const burger = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
          navLinks.classList.remove('active');
          burger.classList.remove('active');
        }
      }
    });
  }

  // --- Language Switcher Logic ---
  let currentLang = 'ar';
  const langToggleBtn = document.getElementById('lang-toggle');

  function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(currentLang);
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLanguage);
  }

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (lang === 'ar') {
      document.body.classList.remove('lang-en');
      document.body.classList.add('lang-ar');
    } else {
      document.body.classList.remove('lang-ar');
      document.body.classList.add('lang-en');
    }

    // Update button text
    if (langToggleBtn) {
      langToggleBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    }

    // Update translations
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      
      // Check input elements
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    });

    // Update Stats counters suffixes and trigger refresh
    updateStatsText(lang);

    // Re-render portfolio projects with correct language
    renderPortfolio(currentFilter);

    // Dispatch custom event for language changes
    document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  }

  function updateStatsText(lang) {
    const statsNumbers = document.querySelectorAll('.counter-num');
    statsNumbers.forEach(stat => {
      const isCompleted = stat.classList.contains('completed');
      if (isCompleted) {
        const val = stat.getAttribute('data-target');
        const suffix = stat.getAttribute(`data-${lang}-suffix`) || '';
        stat.textContent = val + suffix;
      }
    });
  }

  // --- Numeric Counters Animation (RAF easing, ~2.5s duration) ---
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    const counters = document.querySelectorAll('.counter-num');
    const DURATION = 2500; // ms — clearly visible counting animation

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const startTime = performance.now();

      function easeOut(t) {
        // Cubic ease-out: starts fast, decelerates at the end
        return 1 - Math.pow(1 - t, 3);
      }

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const easedProgress = easeOut(progress);
        const current = Math.round(easedProgress * target);

        if (progress < 1) {
          counter.textContent = current;
          requestAnimationFrame(tick);
        } else {
          counter.classList.add('completed');
          const suffix = counter.getAttribute(`data-${currentLang}-suffix`) || '';
          counter.textContent = target + suffix;
        }
      }

      requestAnimationFrame(tick);
    });
  }

  // --- Scroll Reveal and Counter Trigger ---
  const revealElements = document.querySelectorAll('.reveal-element');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve to boost performance and prevent redundant calculations
        revealObserver.unobserve(entry.target);
        
        // Trigger counters if stats section in view
        if (entry.target.classList.contains('stats-container') || entry.target.querySelector('.counter-num')) {
          startCounters();
        }
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Portfolio Integration ---
  const portfolioGrid = document.getElementById('portfolio-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let currentFilter = 'all';

  // Render Projects Grid
  function renderPortfolio(filter = 'all') {
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = '';
    
    const filteredProjects = window.portfolioData.filter(proj => {
      return filter === 'all' || proj.categoryKey === filter;
    });

    filteredProjects.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'portfolio-card reveal-element revealed';
      card.setAttribute('data-id', proj.id);
      card.setAttribute('tabindex', '0'); // Accessibility: Focusable via Tab
      card.setAttribute('aria-label', `${proj.title[currentLang]} - ${proj.category[currentLang]}`);
      
      const title = proj.title[currentLang];
      const client = proj.client ? proj.client[currentLang] : '';
      const category = proj.category[currentLang];
      
      card.innerHTML = `
        <div class="portfolio-img-wrapper">
          <img src="${proj.coverImage}" alt="${title}" ${idx >= 3 ? 'loading="lazy"' : 'loading="eager"'}>
          <div class="portfolio-overlay">
            <span class="portfolio-category">${category}</span>
            <h3 class="portfolio-title">${title}</h3>
            ${client ? `<span class="portfolio-client">${client}</span>` : ''}
            <div class="portfolio-cta">
              <span data-ar="عرض التفاصيل" data-en="View Details">${currentLang === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(proj.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(proj.id);
        }
      });
      portfolioGrid.appendChild(card);
    });

    // Make sure custom cursor hooks apply to newly created cards
    if (!isTouchDevice && cursorDot && cursorOutline) {
      const cards = portfolioGrid.querySelectorAll('.portfolio-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          cursorOutline.classList.add('hover');
          cursorDot.classList.add('hover');
        });
        card.addEventListener('mouseleave', () => {
          cursorOutline.classList.remove('hover');
          cursorDot.classList.remove('hover');
        });
      });
    }
  }

  // Handle Portfolio Filtering
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      currentFilter = this.getAttribute('data-filter');
      
      // Save current scroll height and lock it to prevent layout jump
      const currentHeight = portfolioGrid.offsetHeight;
      portfolioGrid.style.minHeight = `${currentHeight}px`;
      
      // Add animation to grid transition
      portfolioGrid.style.opacity = 0;
      portfolioGrid.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        renderPortfolio(currentFilter);
        portfolioGrid.style.opacity = 1;
        portfolioGrid.style.transform = 'translateY(0)';
        
        // Release min-height lock after grid animation is complete
        setTimeout(() => {
          portfolioGrid.style.minHeight = '';
        }, 300);
      }, 300);
    });
  });

  // --- Lightbox / Modal Module ---
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClient = document.getElementById('lightbox-client');
  const lightboxYear = document.getElementById('lightbox-year');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxPdf = document.getElementById('lightbox-pdf');
  const lightboxWeb = document.getElementById('lightbox-web');
  
  const lightboxSlides = document.getElementById('lightbox-slides');
  const lightboxDots = document.getElementById('lightbox-dots');

  let activeProject = null;
  let activeSlideIndex = 0;

  function openLightbox(projectId) {
    activeProject = window.portfolioData.find(p => p.id === projectId);
    if (!activeProject) return;

    activeSlideIndex = 0;
    updateLightboxContent();

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
    activeProject = null;
  }

  function updateLightboxContent() {
    if (!activeProject) return;

    // Set Text Fields
    lightboxCategory.textContent = activeProject.category[currentLang];
    lightboxTitle.textContent = activeProject.title ? activeProject.title[currentLang] : '';
    
    // Handle Client Box Display
    const client = activeProject.client ? activeProject.client[currentLang] : '';
    const clientBox = document.querySelector('.lightbox-client-box');
    if (clientBox) {
      if (client) {
        lightboxClient.textContent = client;
        clientBox.style.display = 'block';
      } else {
        lightboxClient.textContent = '';
        clientBox.style.display = 'none';
      }
    } else {
      lightboxClient.textContent = client;
    }

    // Handle Year Display
    if (activeProject.year) {
      lightboxYear.textContent = activeProject.year;
      lightboxYear.style.display = 'inline';
    } else {
      lightboxYear.textContent = '';
      lightboxYear.style.display = 'none';
    }

    // Handle Description Display
    const desc = activeProject.description ? activeProject.description[currentLang] : '';
    if (lightboxDesc) {
      if (desc) {
        lightboxDesc.textContent = desc;
        lightboxDesc.style.display = 'block';
      } else {
        lightboxDesc.textContent = '';
        lightboxDesc.style.display = 'none';
      }
    }

    // Set Buttons (PDF & External Web)
    if (activeProject.profilePdfUrl && activeProject.profilePdfUrl !== '#') {
      lightboxPdf.href = activeProject.profilePdfUrl;
      lightboxPdf.style.display = 'inline-flex';
    } else {
      lightboxPdf.style.display = 'none';
    }

    if (activeProject.externalWebsiteUrl && activeProject.externalWebsiteUrl !== '#') {
      lightboxWeb.href = activeProject.externalWebsiteUrl;
      lightboxWeb.style.display = 'inline-flex';
    } else {
      lightboxWeb.style.display = 'none';
    }

    // Set Slides
    lightboxSlides.innerHTML = '';
    activeProject.gallery.forEach((imgUrl, idx) => {
      const slide = document.createElement('div');
      slide.className = `lightbox-slide ${idx === 0 ? 'active' : ''}`;
      slide.innerHTML = `<img src="${imgUrl}" alt="${activeProject.title[currentLang]}" loading="lazy">`;
      lightboxSlides.appendChild(slide);
    });

    // Set Dots
    lightboxDots.innerHTML = '';
    activeProject.gallery.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `lightbox-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(idx));
      lightboxDots.appendChild(dot);
    });

    // Hide navigation controls if gallery has 1 or fewer images
    if (activeProject.gallery.length <= 1) {
      if (lightboxPrev) lightboxPrev.style.display = 'none';
      if (lightboxNext) lightboxNext.style.display = 'none';
      if (lightboxDots) lightboxDots.style.display = 'none';
    } else {
      if (lightboxPrev) lightboxPrev.style.display = 'flex';
      if (lightboxNext) lightboxNext.style.display = 'flex';
      if (lightboxDots) lightboxDots.style.display = 'flex';
    }
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll('.lightbox-slide');
    const dots = document.querySelectorAll('.lightbox-dot');
    
    if (slides.length === 0) return;

    // Bound limits
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    activeSlideIndex = index;

    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => goToSlide(activeSlideIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => goToSlide(activeSlideIndex + 1));

  // Close lightbox on click outside the content container
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') {
      if (currentLang === 'ar') goToSlide(activeSlideIndex - 1);
      else goToSlide(activeSlideIndex + 1);
    }
    if (e.key === 'ArrowLeft') {
      if (currentLang === 'ar') goToSlide(activeSlideIndex + 1);
      else goToSlide(activeSlideIndex - 1);
    }
  });

  // Initialize Portfolio render
  renderPortfolio('all');

  // --- Contact Form Submission & Feedback ---
  const contactForm = document.querySelector('.contact-form');
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  document.body.appendChild(toast);

  if (contactForm) {
    // Clear validation error styling on input/focus
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const clearError = () => {
        const group = input.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          group.classList.remove('has-error');
          const errorSpan = group.querySelector('.error-msg');
          if (errorSpan) errorSpan.remove();
        }
      };
      input.addEventListener('input', clearError);
      input.addEventListener('change', clearError);
      input.addEventListener('focus', clearError);
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Custom validation check
      let isValid = true;
      
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const phoneInput = document.getElementById('form-phone');
      const categorySelect = document.getElementById('form-category');
      
      // Helper to show errors
      const showError = (input, arMsg, enMsg) => {
        const group = input.closest('.form-group');
        if (group && !group.classList.contains('has-error')) {
          group.classList.add('has-error');
          const errorSpan = document.createElement('span');
          errorSpan.className = 'error-msg';
          errorSpan.textContent = currentLang === 'ar' ? arMsg : enMsg;
          group.appendChild(errorSpan);
        }
        isValid = false;
      };
      
      // Clean previous errors first
      contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
        const err = group.querySelector('.error-msg');
        if (err) err.remove();
      });
      
      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'يرجى إدخال الاسم الكريم *', 'Please enter your name *');
      }
      
      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showError(emailInput, 'يرجى إدخال البريد الإلكتروني *', 'Please enter your email *');
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح *', 'Please enter a valid email *');
      }
      
      // Validate Phone
      if (!phoneInput.value.trim()) {
        showError(phoneInput, 'يرجى إدخال رقم الجوال *', 'Please enter your phone number *');
      } else if (phoneInput.value.trim().length < 7) {
        showError(phoneInput, 'يرجى إدخال رقم جوال صحيح *', 'Please enter a valid phone number *');
      }
      
      // Validate Category
      if (!categorySelect.value) {
        showError(categorySelect, 'يرجى اختيار نوع الفعالية *', 'Please select event type *');
      }
      
      if (!isValid) {
        // Find the first error group and scroll to it smoothly
        const firstError = contactForm.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      // Visual Feedback Loading
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = currentLang === 'ar' 
        ? '<span>جاري الإرسال...</span>' 
        : '<span>Sending...</span>';

      setTimeout(() => {
        // Show success toast
        toast.textContent = currentLang === 'ar'
          ? 'تم إرسال رسالتك بنجاح! سيتواصل معك أحد مستشارينا قريباً.'
          : 'Your message has been sent successfully! Our consultant will contact you shortly.';
        
        toast.classList.add('show');
        
        // Reset form
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      }, 1500);
    });
  }
});

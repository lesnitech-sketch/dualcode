/**
 * DUAL CODE - Main JavaScript
 * Core interactions and functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // Mobile Menu Toggle
  // ============================================

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('header');
  
  // Garantir que o menu comece oculto
  if (mobileMenu) {
    mobileMenu.classList.add('mobile-menu-hidden');
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      // Alternar entre mostrar e esconder o menu
      if (mobileMenu.classList.contains('mobile-menu-hidden')) {
        mobileMenu.classList.remove('mobile-menu-hidden');
        mobileMenu.classList.add('active');
      } else {
        mobileMenu.classList.add('mobile-menu-hidden');
        mobileMenu.classList.remove('active');
      }

      // Mudar o ícone do menu
      const icon = this.querySelector('svg');
      if (mobileMenu.classList.contains('active')) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      }
    });

    // Fechar o menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('mobile-menu-hidden');
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('svg');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      });
    });
  }

  // ============================================
  // Smooth Scroll for Navigation Links
  // ============================================

  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset for fixed header
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Header Scroll Effect (Shadow on scroll)
  // ============================================

  if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // Lazy Loading Images (fallback for older browsers)
  // ============================================

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // Active Navigation Link Highlighting
  // ============================================

  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link, .mobile-nav-link');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksAll.forEach(link => {
          link.classList.remove('text-blue-600');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-blue-600');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // ============================================
  // Portfolio Card Hover Effects (Enhanced)
  // ============================================

  const portfolioCards = document.querySelectorAll('.portfolio-card');

  portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ============================================
  // Stats Counter Animation (when visible)
  // ============================================

  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  function animateStats() {
    if (hasAnimated) return;

    const statsSection = document.getElementById('about');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      hasAnimated = true;

      statNumbers.forEach(stat => {
        const target = stat.textContent.replace(/\+|%/g, '');
        const isPercentage = stat.textContent.includes('%');
        const hasPlus = stat.textContent.includes('+');
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = parseInt(target) / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= parseInt(target)) {
            current = parseInt(target);
            clearInterval(timer);
          }

          let displayValue = Math.floor(current);
          if (hasPlus) displayValue += '+';
          if (isPercentage) displayValue += '%';

          stat.textContent = displayValue;
        }, duration / steps);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats(); // Check on load

  // ============================================
  // Form Validation (if contact form exists)
  // ============================================

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = this.querySelector('input[name="name"]');
      const emailInput = this.querySelector('input[name="email"]');
      const messageInput = this.querySelector('textarea[name="message"]');

      // Basic validation
      let isValid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Por favor, informe seu nome');
        isValid = false;
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        showError(emailInput, 'Por favor, informe um e-mail válido');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'Por favor, escreva uma mensagem');
        isValid = false;
      }

      if (isValid) {
        // Form is valid - submit or show success message
        showSuccess('Mensagem enviada com sucesso!');
        this.reset();
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    // Add error styling and message
    input.classList.add('border-red-500');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;

    const existingError = input.parentNode.querySelector('.text-red-500');
    if (existingError) {
      existingError.remove();
    }

    input.parentNode.appendChild(errorDiv);

    // Remove error on input
    input.addEventListener('input', function() {
      this.classList.remove('border-red-500');
      const error = this.parentNode.querySelector('.text-red-500');
      if (error) error.remove();
    });
  }

  function showSuccess(message) {
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successDiv.textContent = message;

    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }

  // ============================================
  // Performance: Debounce Scroll Events
  // ============================================

  function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll-heavy functions
  window.addEventListener('scroll', debounce(highlightNavigation, 10));
  window.addEventListener('scroll', debounce(animateStats, 10));

  // ============================================
  // Log Initialization
  // ============================================

  console.log('🎨 Dual Code website initialized successfully');
  console.log('📱 Mobile menu:', mobileMenuBtn ? 'Active' : 'Not found');
  console.log('🔗 Navigation links:', navLinks.length);
  console.log('🖼️ Portfolio cards:', portfolioCards.length);

});

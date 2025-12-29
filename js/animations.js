/**
 * DUAL CODE - Animations JavaScript
 * Scroll-based animations and visual effects
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // Intersection Observer for Fade-In Animations
  // ============================================

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of element is visible
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });

  // ============================================
  // Stagger Animation for Card Grids
  // ============================================

  const staggerElements = document.querySelectorAll('[class*="stagger-"]');

  staggerElements.forEach(element => {
    // Extract stagger delay from class name
    const staggerClass = Array.from(element.classList).find(cls => cls.startsWith('stagger-'));
    if (staggerClass) {
      const delay = parseInt(staggerClass.split('-')[1]) * 100; // 100ms per stagger level
      element.style.transitionDelay = `${delay}ms`;
    }
  });

  // ============================================
  // Parallax Effect for Hero Section
  // ============================================

  const heroSection = document.querySelector('.hero-section');
  const heroImage = document.querySelector('.hero-image img');

  if (heroSection && heroImage) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3; // Parallax speed

      if (scrolled < heroSection.offsetHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // ============================================
  // Hover Tilt Effect for Service Cards
  // ============================================

  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ============================================
  // Progress Indicator on Process Steps
  // ============================================

  const processSteps = document.querySelectorAll('.process-step');

  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, {
    threshold: 0.3
  });

  processSteps.forEach((step, index) => {
    // Initial state
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = 'all 0.6s ease';
    step.style.transitionDelay = `${index * 0.1}s`;

    processObserver.observe(step);
  });

  // ============================================
  // Testimonial Cards Rotation Animation
  // ============================================

  const testimonialCards = document.querySelectorAll('.testimonial-card');

  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const quote = this.querySelector('.testimonial-quote');
      if (quote) {
        quote.style.transform = 'scale(1.2) rotate(-5deg)';
        quote.style.opacity = '0.25';
      }
    });

    card.addEventListener('mouseleave', function() {
      const quote = this.querySelector('.testimonial-quote');
      if (quote) {
        quote.style.transform = 'scale(1) rotate(0deg)';
        quote.style.opacity = '0.15';
      }
    });
  });

  // ============================================
  // Gradient Animation for CTA Section
  // ============================================

  const ctaSection = document.querySelector('.cta-section');

  if (ctaSection) {
    let hue = 0;

    setInterval(() => {
      hue = (hue + 0.5) % 360;
      // Subtle gradient shift
      ctaSection.style.filter = `hue-rotate(${hue}deg)`;
    }, 100);
  }

  // ============================================
  // Image Loading Animation
  // ============================================

  const images = document.querySelectorAll('img');

  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    }
  });

  // Add loaded class CSS if not already present
  const style = document.createElement('style');
  style.textContent = `
    img {
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    img.loaded {
      opacity: 1;
    }
  `;

  // Only add if not already present
  if (!document.querySelector('style[data-img-loader]')) {
    style.setAttribute('data-img-loader', 'true');
    document.head.appendChild(style);
  }

  // ============================================
  // Portfolio Image Hover Zoom Effect
  // ============================================

  const portfolioImages = document.querySelectorAll('.portfolio-image');

  portfolioImages.forEach(container => {
    const img = container.querySelector('img');

    if (img) {
      container.addEventListener('mouseenter', function() {
        img.style.transform = 'scale(1.08)';
      });

      container.addEventListener('mouseleave', function() {
        img.style.transform = 'scale(1)';
      });
    }
  });

  // ============================================
  // Scroll Progress Indicator (optional)
  // ============================================

  function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #1F6FEB 0%, #8B5CF6 100%);
      width: 0%;
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // Uncomment to enable scroll progress bar
  // createScrollProgressBar();

  // ============================================
  // Button Ripple Effect
  // ============================================

  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-primary-small');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-animation {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // ============================================
  // Smooth Reveal for Stats on Scroll
  // ============================================

  const stats = document.querySelectorAll('.stat-item');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.5
  });

  stats.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.5s ease';
    statsObserver.observe(stat);
  });

  // ============================================
  // Navigation Link Hover Animation
  // ============================================

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // ============================================
  // Log Animations Initialization
  // ============================================

  console.log('✨ Animations initialized successfully');
  console.log('👁️ Observing', fadeElements.length, 'fade-in elements');
  console.log('📊 Stagger elements:', staggerElements.length);
  console.log('🎴 Service cards with tilt:', serviceCards.length);

});

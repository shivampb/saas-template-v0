/* ============================================
   HIREASSESS — Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     1. SMOOTH SCROLL & NAVBAR SCROLL EFFECT
     ============================================= */
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        navLinks.classList.remove('open');
        navActions.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  });


  /* =============================================
     2. MOBILE HAMBURGER MENU
     ============================================= */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navActions = document.querySelector('.nav-actions');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navActions.classList.toggle('open');
  });


  /* =============================================
     3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ============================================= */
  const revealElements = document.querySelectorAll('.reveal-up');
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );
  
  revealElements.forEach((el) => revealObserver.observe(el));


  /* =============================================
     4. COUNTER ANIMATION
     ============================================= */
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    
    const format = (num) => {
      if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
      if (num >= 1_000) return (num / 1_000).toFixed(num >= 10_000 ? 0 : 1) + 'K';
      return num.toLocaleString();
    };
    
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = format(current) + '+';
      if (progress < 1) requestAnimationFrame(step);
    };
    
    requestAnimationFrame(step);
  };
  
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  counters.forEach((c) => counterObserver.observe(c));


  /* =============================================
     5. PRICING TOGGLE (Monthly ↔ Annual)
     ============================================= */
  const billingToggle = document.getElementById('billing-toggle');
  const toggleMonthly = document.getElementById('toggle-monthly');
  const toggleAnnual = document.getElementById('toggle-annual');
  const priceAmounts = document.querySelectorAll('.price-amount[data-monthly]');
  let isAnnual = false;
  
  billingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    billingToggle.classList.toggle('active', isAnnual);
    toggleMonthly.classList.toggle('active', !isAnnual);
    toggleAnnual.classList.toggle('active', isAnnual);
    
    priceAmounts.forEach((el) => {
      const price = isAnnual ? el.dataset.annual : el.dataset.monthly;
      // Animate price change
      el.style.transform = 'translateY(-10px)';
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = '$' + price;
        el.style.transform = 'translateY(10px)';
        setTimeout(() => {
          el.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        }, 30);
      }, 150);
    });
  });


  /* =============================================
     6. PARALLAX EFFECT ON HERO SHAPES
     ============================================= */
  const shapes = document.querySelectorAll('.shape');
  
  window.addEventListener('mousemove', (e) => {
    const cx = e.clientX / window.innerWidth - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;
    
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 15;
      shape.style.transform = `translate(${cx * speed}px, ${cy * speed}px)`;
    });
  }, { passive: true });


  /* =============================================
     7. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
     ============================================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');
  
  const highlightNav = () => {
    const scrollY = window.scrollY + 200;
    
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollY >= top && scrollY < top + height) {
        navLinksAll.forEach((link) => {
          link.style.color = '';
          link.style.background = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--primary-600)';
            link.style.background = 'var(--primary-50)';
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', highlightNav, { passive: true });


  /* =============================================
     8. CHART BAR ANIMATION ON SCROLL
     ============================================= */
  const chartBars = document.querySelectorAll('.chart-bar');
  
  const chartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'bar-grow 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }
      });
    },
    { threshold: 0.3 }
  );
  
  chartBars.forEach((bar) => {
    bar.style.transform = 'scaleY(0)';
    bar.style.animation = 'none';
    chartObserver.observe(bar);
  });


  /* =============================================
     9. TILT EFFECT ON FEATURE CARDS
     ============================================= */
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `translateY(-4px) perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });


  /* =============================================
     10. TYPED EFFECT FOR HERO (subtle)
     ============================================= */
  // Subtle gradient shift animation on hero gradient text
  const gradientText = document.querySelector('.hero-title .gradient-text');
  if (gradientText) {
    let hue = 0;
    const shiftGradient = () => {
      hue = (hue + 0.3) % 360;
      const h1 = (240 + hue) % 360;
      const h2 = (270 + hue) % 360;
      gradientText.style.backgroundImage = `linear-gradient(135deg, hsl(${h1}, 80%, 65%), hsl(${h2}, 75%, 60%))`;
      requestAnimationFrame(shiftGradient);
    };
    shiftGradient();
  }

});

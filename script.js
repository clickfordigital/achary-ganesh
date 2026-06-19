/**
 * Acharya Ganesh - Premium Vedic Astrology Interactive Engine
 * Vanilla JavaScript implementation for animations, indicators, and interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileMenu();
  initStars();
  initScrollReveal();
  initCounters();
  initFaqAccordions();
  initModalAndForms();
  initBackToTop();
  initCircularStats();
});

/* Sticky Glassmorphism Header */
function initStickyHeader() {
  const header = document.getElementById("main-header");
  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("glass-nav", "py-3");
      header.classList.remove("bg-transparent", "py-5");
    } else {
      header.classList.remove("glass-nav", "py-3");
      header.classList.add("bg-transparent", "py-5");
    }
  };
  window.addEventListener("scroll", onScroll);
  onScroll(); // initial load trigger
}

/* Background Twinkling Constellation Stars Creator */
function initStars() {
  const starFields = document.querySelectorAll(".constellations-bg");
  starFields.forEach((field) => {
    const starCount = parseInt(field.getAttribute("data-stars")) || 40;
    field.style.position = "absolute";
    field.style.top = "0";
    field.style.left = "0";
    field.style.width = "100%";
    field.style.height = "100%";
    field.style.pointerEvents = "none";
    field.style.overflow = "hidden";

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star-starry animate-twinkle";
      
      const size = Math.random() * 2.2 + 0.6;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 4 + 2;
      const delay = Math.random() * 3;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.setProperty("--twinkle-duration", `${duration}s`);
      star.style.animationDelay = `${delay}s`;
      
      // Random delicate golden or cosmic white tint
      if (Math.random() > 0.6) {
        star.style.backgroundColor = "#dfbe7c"; // golden star
        star.style.boxShadow = "0 0 8px rgba(223, 190, 124, 0.8)";
      } else {
        star.style.backgroundColor = "#fff"; // cosmic white
        star.style.boxShadow = "0 0 6px rgba(255, 255, 255, 0.6)";
      }

      field.appendChild(star);
    }
  });
}

/* Scroll Reveal using Intersection Observer */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger visual triggers
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 80 % 300);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
}

/* Animated Counters */
function initCounters() {
  const counterElements = document.querySelectorAll(".counter-number");
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-target")) || 0;
    const suffix = element.getAttribute("data-suffix") || "";
    const duration = 2200; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * target);

      if (target >= 1000) {
        element.textContent = currentValue.toLocaleString("en-IN") + suffix;
      } else {
        element.textContent = currentValue + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target.toLocaleString("en-IN") + suffix;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observerOptions = {
    threshold: 0.3,
    root: null
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counterElements.forEach((el) => counterObserver.observe(el));
}

/* Animated SVG Circular Progress Bars in Section 2 */
function initCircularStats() {
  const progressBars = document.querySelectorAll(".progress-ring");
  
  const animateRing = (ring) => {
    const percent = parseInt(ring.getAttribute("data-percent")) || 100;
    const circle = ring.querySelector(".progress-ring-circle");
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    // Animate strokeOffset
    const offset = circumference - (percent / 100) * circumference;
    
    setTimeout(() => {
      circle.style.transition = "stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)";
      circle.style.strokeDashoffset = offset;
    }, 150);
  };

  const ringObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rings = entry.target.querySelectorAll(".progress-ring");
        rings.forEach(animateRing);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const parentSection = document.getElementById("who-benefits");
  if (parentSection) {
    ringObserver.observe(parentSection);
  }
}

/* Accordion Component Logic */
function initFaqAccordions() {
  const accordionHeaders = document.querySelectorAll(".faq-header");
  
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const activeHeader = document.querySelector(".faq-header.active");
      const content = header.nextElementSibling;
      const chevron = header.querySelector(".chevron-icon");

      // Collapsing other open FAQs
      if (activeHeader && activeHeader !== header) {
        activeHeader.classList.remove("active");
        const openContent = activeHeader.nextElementSibling;
        const openChevron = activeHeader.querySelector(".chevron-icon");
        openContent.style.maxHeight = null;
        openContent.classList.remove("open");
        if (openChevron) openChevron.classList.remove("rotated");
      }

      // Toggling current FAQ
      header.classList.toggle("active");
      if (header.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
        if (chevron) chevron.classList.add("rotated");
      } else {
        content.style.maxHeight = null;
        content.classList.remove("open");
        if (chevron) chevron.classList.remove("rotated");
      }
    });
  });
  
  // Set first accordion active by default
  if (accordionHeaders.length > 0) {
    accordionHeaders[0].click();
  }
}

/* Modals & Interactive Form Submissions */
function initModalAndForms() {
  const bookingModal = document.getElementById("booking-modal");
  const openModalBtns = document.querySelectorAll(".open-booking-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalForm = document.getElementById("modal-consultation-form");
  const mainLeadForm = document.getElementById("main-lead-form");

  // Open booking modal
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (bookingModal) {
        bookingModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close booking modal
  const closeModal = () => {
    if (bookingModal) {
      bookingModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener("click", (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  // Helper to show a majestic success notice toast
  const showToast = (name, type) => {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-5 right-5 z-50 glass-premium border-gold-glow px-6 py-4 rounded-xl flex items-center justify-between shadow-2xl max-w-sm transition-all duration-500 transform translate-y-10 opacity-0";
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-gold-950 text-gold-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/></svg>
        </div>
        <div>
          <h4 class="font-bold text-gold-300 font-cinzel text-sm">Sacred Path Connected</h4>
          <p class="text-[11px] text-gray-300">Blessed companion <strong>${name}</strong>, your ${type} request has been recorded. Acharya Ganesh will align the planets shortly!</p>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-y-10", "opacity-0");
    }, 100);

    // Auto close
    setTimeout(() => {
      toast.classList.add("translate-y-10", "opacity-0");
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 5500);
  };

  // Submit main lead form
  if (mainLeadForm) {
    mainLeadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("lead-name");
      const name = nameInput ? nameInput.value : "Astro Enquirer";
      const selection = document.getElementById("lead-type")?.value || "Consultation";
      
      showToast(name, selection.toLowerCase());
      mainLeadForm.reset();
    });
  }

  // Submit modal form
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("modal-name");
      const name = nameInput ? nameInput.value : "Blessed Soul";
      const selection = document.getElementById("modal-type")?.value || "Astro Reading";

      closeModal();
      showToast(name, selection.toLowerCase());
      modalForm.reset();
    });
  }
}

/* Back to Top Indicator & Button */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  
  if (!backToTopBtn) return;

  const toggleBtnVisibility = () => {
    if (window.scrollY > window.innerHeight) {
      backToTopBtn.classList.remove("scale-0", "opacity-0");
      backToTopBtn.classList.add("scale-100", "opacity-100");
    } else {
      backToTopBtn.classList.add("scale-0", "opacity-0");
      backToTopBtn.classList.remove("scale-100", "opacity-100");
    }
  };

  window.addEventListener("scroll", toggleBtnVisibility);
  toggleBtnVisibility();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* Mobile Hamburger Menu Controller */
function initMobileMenu() {
  const burgerBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu-link");

  if (!burgerBtn || !mobileMenu) return;

  const toggleMenu = () => {
    mobileMenu.classList.toggle("hidden");
    document.body.style.overflow = mobileMenu.classList.contains("hidden") ? "auto" : "hidden";
  };

  burgerBtn.addEventListener("click", toggleMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      document.body.style.overflow = "auto";
    });
  });
}


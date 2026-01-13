// Initialize AOS with smooth animations
AOS.init({
  disable: false, // Enable animations for better UX
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  mirror: false,
  offset: 100,
  delay: 50,
  anchorPlacement: "top-bottom",
});

// Dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const moonIcon = darkModeToggle.querySelector(".fa-moon");
  const sunIcon = darkModeToggle.querySelector(".fa-sun");

  // Function to update icons
  const updateIcons = (isDark) => {
    moonIcon.classList.toggle("hidden", isDark);
    sunIcon.classList.toggle("hidden", !isDark);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", isDark);
    updateIcons(isDark);
  };

  // Initialize dark mode based on saved preference
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  document.documentElement.classList.toggle("dark", savedDarkMode);
  updateIcons(savedDarkMode);

  // Add click event listener
  darkModeToggle.addEventListener("click", toggleDarkMode);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // Enhanced scroll to top button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className =
    "fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white p-4 rounded-full shadow-premium-lg transition-all duration-300 opacity-0 transform translate-y-10 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 hover:scale-110 hover:shadow-xl";
  scrollToTopBtn.style.display = "none";
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollToTopBtn);

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Navbar scroll effect and active section highlighting
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    // Navbar shadow on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-xl");
    } else {
      navbar.classList.remove("shadow-xl");
    }

    // Scroll to top button
    if (window.scrollY > 500) {
      scrollToTopBtn.style.display = "block";
      setTimeout(() => {
        scrollToTopBtn.style.opacity = "1";
        scrollToTopBtn.style.transform = "translateY(0)";
      }, 50);
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.transform = "translateY(10px)";
      setTimeout(() => (scrollToTopBtn.style.display = "none"), 300);
    }

    // Active section highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-blue-600", "dark:text-blue-400");
      const underline = link.querySelector("span:last-child");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("text-blue-600", "dark:text-blue-400");
        if (underline) underline.style.width = "100%";
      } else {
        if (underline) underline.style.width = "0";
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      const icon = mobileMenuBtn.querySelector("i");
      if (mobileMenu.classList.contains("hidden")) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      } else {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      }
    });

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  // Set current year in footer
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Animated counter for metrics
  const animateCounter = (element, target, suffix = "") => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const updateCounter = () => {
      step++;
      current += increment;
      if (step < steps) {
        if (target % 1 === 0) {
          element.textContent = Math.min(Math.floor(current), target) + suffix;
        } else {
          element.textContent =
            Math.min(current.toFixed(1), target.toFixed(1)) + suffix;
        }
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    };

    updateCounter();
  };

  // Intersection Observer for counter animation
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px",
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        const metricValue = entry.target.querySelector(".key-metric");
        if (metricValue) {
          const countAttr = metricValue.getAttribute("data-count");
          const suffixAttr = metricValue.getAttribute("data-suffix") || "";

          if (countAttr) {
            const target = parseFloat(countAttr);
            if (!isNaN(target)) {
              metricValue.textContent = "0" + suffixAttr;
              setTimeout(() => {
                animateCounter(metricValue, target, suffixAttr);
              }, 300);
            }
          }
        }
      }
    });
  }, observerOptions);

  // Observe metric cards in hero section
  document.querySelectorAll("#hero .metric-card").forEach((card) => {
    counterObserver.observe(card);
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add floating animation to profile image
const profileImage = document.querySelector("#hero img");
if (profileImage) {
  profileImage.classList.add("animate-float");
}

// Add project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "";
  });
});

// Add skill badge hover effects
document.querySelectorAll(".skill-badge").forEach((badge) => {
  badge.addEventListener("mouseenter", () => {
    badge.style.transform = "scale(1.1)";
  });

  badge.addEventListener("mouseleave", () => {
    badge.style.transform = "scale(1)";
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("shadow-lg");
    return;
  }

  if (currentScroll > lastScroll) {
    // Scrolling down
    navbar.classList.add("shadow-lg");
  } else {
    // Scrolling up
    navbar.classList.remove("shadow-lg");
  }

  lastScroll = currentScroll;
});

// Add loading animation for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.classList.add("loaded");
  });
});

// Add year to copyright
const yearSpan = document.querySelector("footer p");
if (yearSpan) {
  yearSpan.textContent = yearSpan.textContent.replace(
    "2024",
    new Date().getFullYear()
  );
}

// Handle View More/Less toggles
document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".toggle-content");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.previousElementSibling;
      content.classList.toggle("hidden");

      // Update button text and icon
      const icon = button.querySelector("i");
      if (content.classList.contains("hidden")) {
        button.innerHTML = '<i class="fas fa-plus-circle mr-2"></i> View More';
      } else {
        button.innerHTML = '<i class="fas fa-minus-circle mr-2"></i> View Less';
      }
    });
  });
});

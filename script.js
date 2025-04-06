document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenuButton = document.querySelector("button.md\\:hidden");
  const mobileMenu = document.querySelector(".hidden.md\\:hidden");
  const header = document.querySelector("header");

  // Mobile menu toggle
  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Mobile dropdown toggles
  const mobileDropdownButtons = document.querySelectorAll(
    ".mobile-menu button"
  );
  mobileDropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dropdown = this.nextElementSibling;
      dropdown.classList.toggle("hidden");
      const icon = this.querySelector("svg");
      icon.style.transform = dropdown.classList.contains("hidden")
        ? "rotate(0deg)"
        : "rotate(180deg)";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".md\\:hidden") &&
      !mobileMenu.classList.contains("hidden")
    ) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      header.classList.remove("shadow-md");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      // Scroll down
      header.classList.add("shadow-md");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      // Scroll up
      header.classList.remove("shadow-md");
    }
    lastScroll = currentScroll;
  });

  // Desktop dropdown hover effect
  const dropdowns = document.querySelectorAll(".group");
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".group-hover\\:block");
    let timeoutId;

    dropdown.addEventListener("mouseenter", () => {
      clearTimeout(timeoutId);
      menu.classList.remove("hidden");
    });

    dropdown.addEventListener("mouseleave", () => {
      timeoutId = setTimeout(() => {
        menu.classList.add("hidden");
      }, 200);
    });
  });

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add("animate-fadeIn");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Initial check

  // Form validation
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const inputs = form.querySelectorAll("input, textarea");
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("border-red-500");
        } else {
          input.classList.remove("border-red-500");
        }
      });

      if (isValid) {
        // Here you would typically send the form data to a server
        alert("Thank you for your interest! We will contact you soon.");
        form.reset();
      }
    });
  }

  // Add smooth scrolling to all links
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

  // Navigation active state handling
  const navLinks = document.querySelectorAll("[data-nav]");

  // Set Home as active by default
  const homeLink = document.querySelector('[data-nav="home"]');
  if (homeLink) {
    homeLink.classList.add("active");
  }

  // Add click event listeners to all navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });

      // Add active class to clicked link
      link.classList.add("active");

      // Close mobile menu if open
      const mobileMenu = document.querySelector(".md\\:hidden.bg-white");
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  });
});

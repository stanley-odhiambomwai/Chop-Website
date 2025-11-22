/* =========================================
   HOME PAGE INTERACTIVITY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const heroImg = document.querySelector(".hero-img");

  /* ---------------------------------------
     PARALLAX SCROLL FOR HERO IMAGE
  ---------------------------------------- */
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    heroImg.style.transform =
      `translateY(${scrollY * 0.25}px) scale(1.20)`;
  });

  /* ---------------------------------------
     FLOATING ACTION BUTTON (ORDER NOW)
  ---------------------------------------- */
  const fab = document.getElementById("fab");
  fab.addEventListener("click", () => {
    window.location.href = "Order.html";
  });

  /* ---------------------------------------
     SMOOTH NAVIGATION HIGHLIGHT EFFECT
  ---------------------------------------- */
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-3px)";
    });
    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0)";
    });
  });

  /* ---------------------------------------
     SUBTLE HEADER SHADOW ON SCROLL
  ---------------------------------------- */
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
    } else {
      header.style.boxShadow = "none";
    }
  });

});


/* ============================
   ABOUT PAGE INTERACTIONS
============================ */

document.addEventListener("DOMContentLoaded", () => {

  // Parallax background
  const aboutBg = document.querySelector(".about-hero-bg");

  window.addEventListener("scroll", () => {
    const y = window.scrollY * 0.25;
    if (aboutBg) {
      aboutBg.style.transform = `translateY(${y}px) scale(1.18)`;
    }
  });

  // Scroll reveal for services
  const revealSections = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.3 });

  revealSections.forEach(sec => observer.observe(sec));
});

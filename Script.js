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


/* =========================================
        ADVANCED ORDER PAGE CART SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".order-item");
  const cartPanel = document.getElementById("cartPanel");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  // Cart array
  let cart = [];

  // -------------------------------
  // ADD TO CART CLICK HANDLER
  // -------------------------------
  items.forEach(item => {
    item.querySelector(".add-btn").addEventListener("click", () => {
      const name = item.dataset.name;
      const price = parseInt(item.dataset.price);

      // CHECK if item already exists
      const existing = cart.find(cartItem => cartItem.name === name);

      if (existing) {
        existing.qty += 1;     // increase quantity
      } else {
        cart.push({
          name,
          price,
          qty: 1
        });
      }

      updateCart();
      cartPanel.classList.add("open");      // auto-open cart

      // Add bounce animation to cart panel
      cartPanel.style.transform = "scale(1.02)";
      setTimeout(() => {
        cartPanel.style.transform = "scale(1)";
      }, 150);
    });
  });

  // UPDATE CART DISPLAY
  
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      cartItems.innerHTML += `
        <div class="cart-row">
          <div class="cart-row-left">
            <strong>${item.name}</strong>
            <p>₦${item.price} × ${item.qty}</p>
          </div>

          <div class="cart-controls">
            <button class="qty-btn minus" data-index="${index}">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn plus" data-index="${index}">+</button>
            <button class="remove-btn" data-index="${index}">x</button>
          </div>
        </div>
      `;
    });

    cartTotal.textContent = "₦" + total;

    // Add functionality to buttons
    addCartButtonActions();
  }

  // -------------------------------
  // QUANTITY + REMOVE BUTTONS
  // -------------------------------
  function addCartButtonActions() {

    // Increase Quantity
    document.querySelectorAll(".plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        cart[i].qty += 1;
        updateCart();
      });
    });

    // Decrease Quantity
    document.querySelectorAll(".minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        if (cart[i].qty > 1) {
          cart[i].qty -= 1;
        } else {
          cart.splice(i, 1);
        }
        updateCart();
      });
    });

    // Remove item entirely
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        cart.splice(i, 1);
        updateCart();
      });
    });
  }

});


/* =========================================
     MENU PAGE INTERACTIVE EFFECTS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     PARALLAX EFFECT FOR MENU HERO
  --------------------------------*/
  const menuHero = document.querySelector(".menu-hero");

  window.addEventListener("scroll", () => {
    if (!menuHero) return;
    let scrollY = window.scrollY * 0.35;
    menuHero.style.backgroundPositionY = `${scrollY}px`;
  });

  /* -------------------------------
     SMOOTH REVEAL OF MENU SECTIONS
  --------------------------------*/
  const revealOptions = {
    threshold: 0.25,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("menu-show");
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  document.querySelectorAll(".menu-item").forEach(item => {
    item.classList.add("menu-hidden");
    revealObserver.observe(item);
  });

});


/* ========================================
      CATERING PAGE ANIMATIONS
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Fade-in cards
  const cards = document.querySelectorAll(".cater-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-show");
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => {
    card.classList.add("fade-hidden");
    observer.observe(card);
  });

});



/* ==================================================
      CATERING FORM SUCCESS POPUP
==================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const cateringForm = document.querySelector(".catering-form");

  if (cateringForm) {
    cateringForm.addEventListener("submit", (e) => {
      setTimeout(() => {
        showSuccessPopup();
      }, 800);
    });
  }
});

function showSuccessPopup() {
  const popup = document.createElement("div");
  popup.className = "success-popup";
  popup.innerHTML = `
    <div class="popup-box">
      <h2>Inquiry Submitted 🎉</h2>
      <p>Thank you! Your catering request has been sent successfully.<br>
      We will contact you shortly.</p>
      <button class="close-popup">Close</button>
    </div>
  `;

  document.body.appendChild(popup);

  popup.querySelector(".close-popup").addEventListener("click", () => {
    popup.remove();
  });
}

tailwind.config = {
  theme: {
    extend: {
      colors: {
        "eclat-black": "#0a0a0a",
        "eclat-gold": "#D4AF37",
        "eclat-gray": "#1f1f1f",
        "eclat-white": "#f5f5f5",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      backgroundImage: {
        noise:
          "url('https://t3.ftcdn.net/jpg/03/16/22/07/360_F_316220793_6q6C3m6h8kM8s5r5.jpg')", // Subtle grain texture
      },
    },
  },
};

// 2nd part
ScrollTrigger.create({
  start: "top -100",
  onUpdate: (self) => {
    if (self.direction === 1)
      document.getElementById("navbar").classList.add("active");
    else document.getElementById("navbar").classList.remove("active");
  },
});

// 4. FLUID NAVIGATION
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.5,
      scrollTo: e.currentTarget.getAttribute("href"),
      ease: "power4.inOut",
    });
  });
});

// 5. CUISINE GRID MASK REVEAL
gsap.utils.toArray(".cuisine-card").forEach((card) => {
  gsap.to(card.querySelector(".reveal-mask"), {
    scrollTrigger: { trigger: card, start: "top 80%" },
    scaleY: 0,
    duration: 1.5,
    ease: "expo.inOut",
  });
});

// 6. DISH GALLERY HORIZONTAL PARALLAX
gsap.to("#dish-gallery", {
  scrollTrigger: {
    trigger: "#signature",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
  x: -300,
});

// 3rd part

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Staggered Entrance
  gsap.from(".order-item", {
    scrollTrigger: { trigger: "#order-grid", start: "top 80%" },
    y: 80,
    opacity: 0,
    stagger: 0.15,
    duration: 1.2,
    ease: "expo.out",
  });

  // 2. Magnetic Logic
  const magneticBtns = document.querySelectorAll(".magnetic-btn");
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4 });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    });
  });

  // 3. Cart Logic
  let count = 0;
  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      count++;
      document.getElementById("cart-count").innerText = count;
      if (count === 1) {
        gsap.to("#floating-cart", { y: 0, opacity: 1, duration: 0.6 });
      }
    });
  });
});

//  4th part

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. CUSTOM CURSOR LOGIC ---
  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (animation in CSS)
    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" },
    );
  });

  // Hover States
  const hoverTriggers = document.querySelectorAll(".hover-trigger");
  hoverTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => {
      document.body.classList.add("hovering");
    });
    trigger.addEventListener("mouseleave", () => {
      document.body.classList.remove("hovering");
    });
  });

  // --- 2. SCROLL REVEAL ANIMATION (IntersectionObserver) ---
  const observerOptions = {
    root: null,
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal-element");
  revealElements.forEach((el) => observer.observe(el));

  // --- 3. DYNAMIC MENU BACKGROUND ---
  const menuItems = document.querySelectorAll(".menu-item");
  const menuBg = document.getElementById("menu-bg");

  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const imageUrl = this.getAttribute("data-image");
      menuBg.style.opacity = 0; // Fade out slightly
      setTimeout(() => {
        menuBg.style.backgroundImage = `url('${imageUrl}')`;
        menuBg.style.opacity = 0.4; // Fade in new image
      }, 200);
    });
  });

  // Reset to default when leaving the UL
  document.querySelector("ul").addEventListener("mouseleave", () => {
    menuBg.style.opacity = 0.2;
    // Optional: reset to default image
  });

  // --- 4. NAVBAR SCROLL EFFECT ---
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-black/80", "backdrop-blur-md", "shadow-lg");
      navbar.classList.remove("py-6");
      navbar.classList.add("py-4");
    } else {
      navbar.classList.remove("bg-black/80", "backdrop-blur-md", "shadow-lg");
      navbar.classList.remove("py-4");
      navbar.classList.add("py-6");
    }
  });

  // --- 5. PARALLAX EFFECT FOR HERO ---
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    const heroBg = document.getElementById("hero-bg");
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollPosition * 0.5}px) scale(1.1)`;
    }
  });
});

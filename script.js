/* ============================================
   Shikha Sultana — Portfolio Card
   Lightweight interactivity
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Subtle 3D tilt on the card following the pointer (desktop only)
  const card = document.getElementById("portfolioCard");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (card && canHover) {
    const MAX_TILT = 6; // degrees

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0..1
      const y = (e.clientY - rect.top) / rect.height;   // 0..1
      const rotateY = (x - 0.5) * MAX_TILT * 2;
      const rotateX = (0.5 - y) * MAX_TILT * 2;
      card.style.transform =
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
    });
  }

  // 3. Reveal sections on scroll (progressive enhancement)
  const sections = document.querySelectorAll(".section");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(18px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(section);
    });
  }

  // 4. Copy email to clipboard on click
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink && navigator.clipboard) {
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailLink.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const original = emailLink.innerHTML;
        emailLink.innerHTML = '<span aria-hidden="true">✅</span> Email copied!';
        setTimeout(() => (emailLink.innerHTML = original), 1800);
      }).catch(() => {
        window.location.href = emailLink.href;
      });
    });
  }
});

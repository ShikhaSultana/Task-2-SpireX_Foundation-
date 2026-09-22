/* ============================================
   Shikha Sultana — Modern Professional CV
   Interactivity: skill bars, reveal, copy, print
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Animate skill bars when they enter the viewport
  const fills = document.querySelectorAll(".skill-bar__fill");
  const animateFills = () => {
    fills.forEach((fill) => {
      const level = fill.getAttribute("data-level") || "0";
      fill.style.width = level + "%";
    });
  };

  if ("IntersectionObserver" in window && fills.length) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateFills();
            barObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    barObserver.observe(document.querySelector(".skill-bars"));
  } else {
    animateFills();
  }

  // 3. Reveal sections on scroll
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
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(16px)";
      section.style.transition = "opacity 0.55s ease, transform 0.55s ease";
      observer.observe(section);
    });
  }

  // 4. Click-to-copy email
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  if (navigator.clipboard) {
    emailLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const email = link.textContent.replace(/[^\S\r\n]*✉️\s*/, "").trim();
        navigator.clipboard.writeText(email).then(() => {
          const original = link.innerHTML;
          link.innerHTML = '<span class="ico">✅</span> Email copied!';
          setTimeout(() => (link.innerHTML = original), 1800);
        }).catch(() => {
          window.location.href = link.href;
        });
      });
    });
  }

  // 5. Print / Save as PDF button
  const footer = document.querySelector(".resume__footer");
  if (footer) {
    const btn = document.createElement("button");
    btn.textContent = "🖨️ Print / Save as PDF";
    btn.setAttribute("aria-label", "Print or save this resume as PDF");
    Object.assign(btn.style, {
      marginTop: "10px",
      padding: "8px 18px",
      fontSize: "0.78rem",
      fontWeight: "600",
      color: "#fff",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      border: "none",
      borderRadius: "9px",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 6px 16px rgba(99,102,241,0.35)",
    });
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-2px)";
      btn.style.boxShadow = "0 10px 22px rgba(99,102,241,0.45)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)";
      btn.style.boxShadow = "0 6px 16px rgba(99,102,241,0.35)";
    });
    btn.addEventListener("click", () => window.print());
    footer.appendChild(document.createElement("br"));
    footer.appendChild(btn);
  }
});

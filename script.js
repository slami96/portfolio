// ✅ Remove fallback if JS works
document.documentElement.classList.remove("no-js");

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Animate hero
gsap.from(".hero-title", { opacity: 0, y: -50, duration: 1 });
gsap.from(".hero-subtitle", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from(".cta-button", { opacity: 0, scale: 0.8, duration: 1, delay: 1 });

// Scroll animations for sections
document.querySelectorAll("section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });
});

// Project animations
document.querySelectorAll(".project").forEach((project) => {
  const image = project.querySelector(".project-image");
  const overlay = project.querySelector(".project-overlay");

  gsap.timeline({
    scrollTrigger: {
      trigger: project,
      start: "top 70%",
      end: "center center",
      scrub: 1,
    },
  })
    .from(image, { scale: 1.2, opacity: 0, duration: 1 })
    .to(overlay, { opacity: 1, duration: 0.8 }, "-=0.2");
});

// Debug logging
console.log("=== PORTFOLIO LOADED ===");
const projectButtons = document.querySelectorAll(".project-button");
console.log("Project buttons found:", projectButtons.length);
projectButtons.forEach((btn, i) =>
  console.log(`Button ${i + 1}: ${btn.textContent}`)
);

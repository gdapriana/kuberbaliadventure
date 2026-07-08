document.addEventListener("DOMContentLoaded", () => {
  const heroInfo = document.querySelector("#hero .hero-info-card");

  gsap.fromTo(
    heroInfo,
    {
      y: "100%",
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.8,
    },
  );
});

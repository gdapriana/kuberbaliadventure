document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("blog");
  const cards = document.querySelectorAll("#blog .blog-card");

  if (!root || cards.length === 0) return;

  gsap.fromTo(
    cards,
    {
      y: "20%",
      scale: 0.5,
      opacity: 0,
    },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: "back.inOut",
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        toggleActions: "restart reverse restart reverse",
      },
    }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("footer");
  const cards = document.querySelectorAll(
    "footer .footer-brand-col, footer .footer-links-col, footer .footer-connect-col"
  );

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
        start: "top 90%",
        toggleActions: "restart reverse restart reverse",
      },
    }
  );
});

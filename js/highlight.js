document.addEventListener("DOMContentLoaded", () => {
  const highlightItems = document.querySelectorAll(
    "#highlight .highlight-item",
  );
  const highlightRoot = document.querySelector("#highlight");

  gsap.fromTo(
    highlightItems,
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
        trigger: highlightRoot,
        start: "top 85%",
        toggleActions: "restart reverse restart reverse",
      },
    },
  );
});

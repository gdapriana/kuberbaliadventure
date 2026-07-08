document.addEventListener("DOMContentLoaded", function () {
  const discoverRoot = document.getElementById("discover");
  const discoverCard = document.querySelectorAll("#discover .discover-card");
  const discoverDescription = document.querySelector(
    "#discover .discover-card-caption",
  );

  gsap.fromTo(
    discoverCard,
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
        trigger: discoverRoot,
        start: "top 85%",
        toggleActions: "restart reverse restart reverse",
      },
    },
  );

  gsap.fromTo(
    discoverDescription,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      delay: 1,
      duration: 1.5,
      ease: "back.inOut",
      scrollTrigger: {
        trigger: discoverRoot,
        start: "top 85%",
        toggleActions: "restart reverse restart reverse",
      },
    },
  );
});

gsap.registerPlugin(ScrollTrigger);

gsap.from("#packages .package-card", {
  y: 60,
  opacity: 0,
  scale: 0.8,
  duration: 1.2,
  stagger: 0.05,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#packages",
    start: "top 85%",
    toggleActions: "restart reverse restart reverse",
  },
});

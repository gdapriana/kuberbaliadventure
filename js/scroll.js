document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  let targetY = window.scrollY;

  const isScrollable = (el) => {
    if (!el || el === document.body || el === document.documentElement) return false;
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    const isScrollableType = overflowY === "auto" || overflowY === "scroll";
    return isScrollableType && el.scrollHeight > el.clientHeight;
  };

  window.addEventListener("wheel", (e) => {
    let parent = e.target;
    while (parent && parent !== document.body) {
      if (isScrollable(parent)) return;
      parent = parent.parentElement;
    }

    e.preventDefault();

    targetY += e.deltaY;
    targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    });
  }, { passive: false });

  window.addEventListener("scroll", () => {
    if (!gsap.isTweening(window)) {
      targetY = window.scrollY;
    }
  }, { passive: true });
});

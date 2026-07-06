function splitTextIntoWords(element) {
  const nodes = Array.from(element.childNodes);
  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) {
        const words = node.textContent.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        words.forEach(word => {
          if (word.trim()) {
            const wrapper = document.createElement("span");
            wrapper.style.display = "inline-block";
            wrapper.style.overflow = "hidden";
            wrapper.style.verticalAlign = "bottom";

            const inner = document.createElement("span");
            inner.className = "reveal-word";
            inner.style.display = "inline-block";
            inner.style.transform = "translateY(110%)";
            inner.style.opacity = "0";
            inner.textContent = word;

            wrapper.appendChild(inner);
            fragment.appendChild(wrapper);
          } else {
            fragment.appendChild(document.createTextNode(word));
          }
        });
        element.replaceChild(fragment, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      splitTextIntoWords(node);
    }
  });
}

gsap.registerPlugin(ScrollTrigger);

const headings = document.querySelectorAll("h2");
headings.forEach(heading => {
  splitTextIntoWords(heading);
  const words = heading.querySelectorAll(".reveal-word");

  gsap.to(words, {
    y: "0%",
    opacity: 1,
    duration: 1,
    stagger: 0.05,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
      toggleActions: "restart reverse restart reverse"
    }
  });
});

const ctaBtn = document.querySelector(".cta-btn");
if (ctaBtn) {
  ctaBtn.addEventListener("mouseenter", () => {
    gsap.to(ctaBtn, {
      scale: 1.05,
      y: -3,
      boxShadow: "0 8px 20px rgba(204, 143, 30, 0.4)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  ctaBtn.addEventListener("mouseleave", () => {
    gsap.to(ctaBtn, {
      scale: 1,
      y: 0,
      boxShadow: "0 0px 0px rgba(204, 143, 30, 0)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  ctaBtn.addEventListener("mousedown", () => {
    gsap.to(ctaBtn, {
      scale: 0.95,
      y: 0,
      duration: 0.1,
      ease: "power2.out"
    });
  });

  ctaBtn.addEventListener("mouseup", () => {
    gsap.to(ctaBtn, {
      scale: 1.05,
      y: -3,
      duration: 0.1,
      ease: "power2.out"
    });
  });
}

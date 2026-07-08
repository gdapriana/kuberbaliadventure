document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".reviews-track");
  const cards = document.querySelectorAll(".review-card");
  const prevBtn = document.querySelector(".reviews-btn-prev");
  const nextBtn = document.querySelector(".reviews-btn-next");

  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const totalItems = cards.length;

  const getCardsToShow = () => {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 992) return 2;
    return 3;
  };

  const updateSlider = () => {
    const cardsToShow = getCardsToShow();
    const maxIndex = totalItems - cardsToShow;

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    const cardWidth = cards[0].getBoundingClientRect().width;
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap) || 0;
    const moveX = -currentIndex * (cardWidth + gap);

    gsap.to(track, {
      x: moveX,
      duration: 1.2,
      ease: "back.out",
      overwrite: "auto",
    });

    if (prevBtn && nextBtn) {
      if (currentIndex === 0) {
        prevBtn.classList.add("disabled");
      } else {
        prevBtn.classList.remove("disabled");
      }

      if (currentIndex >= maxIndex) {
        nextBtn.classList.add("disabled");
      } else {
        nextBtn.classList.remove("disabled");
      }
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const cardsToShow = getCardsToShow();
      if (currentIndex < totalItems - cardsToShow) {
        currentIndex++;
        updateSlider();
      }
    });
  }

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        const cardsToShow = getCardsToShow();
        if (diff > 0 && currentIndex < totalItems - cardsToShow) {
          currentIndex++;
          updateSlider();
        } else if (diff < 0 && currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      }
    },
    { passive: true },
  );

  window.addEventListener("resize", updateSlider);

  cards.forEach((card) => {
    const text = card.querySelector(".review-text");
    if (!text || text.textContent.length <= 150) return;

    const wrap = document.createElement("div");
    wrap.classList.add("review-text-wrap");
    wrap.style.height = "92px";
    wrap.style.overflow = "hidden";
    wrap.style.position = "relative";

    text.parentNode.insertBefore(wrap, text);
    wrap.appendChild(text);

    const btn = document.createElement("button");
    btn.classList.add("read-toggle-btn");
    btn.textContent = "Read More";
    wrap.parentNode.insertBefore(btn, wrap.nextSibling);

    btn.addEventListener("click", () => {
      const isExpanded = wrap.classList.contains("expanded");
      if (isExpanded) {
        wrap.classList.remove("expanded");
        btn.textContent = "Read More";
        gsap.to(wrap, {
          height: 92,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: updateSlider
        });
      } else {
        wrap.classList.add("expanded");
        btn.textContent = "Read Less";
        gsap.fromTo(wrap,
          { height: 92 },
          {
            height: text.scrollHeight,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              wrap.style.height = "auto";
              updateSlider();
            }
          }
        );
      }
      updateSlider();
    });
  });

  setTimeout(updateSlider, 100);

  const reviewsRoot = document.getElementById("reviews");
  if (reviewsRoot && cards.length > 0) {
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
          trigger: reviewsRoot,
          start: "top 85%",
          toggleActions: "restart reverse restart reverse",
        },
      }
    );
  }
});

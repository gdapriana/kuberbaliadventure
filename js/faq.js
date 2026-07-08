document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".faq-accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".faq-accordion-item");
      const body = item.querySelector(".faq-accordion-body");
      const innerText = item.querySelector(".faq-accordion-inner p");
      const icon = item.querySelector(".faq-icon-wrapper");
      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".faq-accordion-item").forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherBody = otherItem.querySelector(".faq-accordion-body");
          const otherIcon = otherItem.querySelector(".faq-icon-wrapper");

          gsap.to(otherBody, {
            height: 0,
            duration: 0.7,
            ease: "power2.inOut",
            overwrite: "auto",
          });

          gsap.to(otherIcon, {
            rotation: 0,
            duration: 0.7,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      });

      if (isOpen) {
        item.classList.remove("active");
        gsap.to(body, {
          height: 0,
          duration: 1,
          ease: "back.inOut",
          overwrite: "auto",
        });
        gsap.to(icon, {
          rotation: 0,
          duration: 1,
          ease: "back.inOut",
          overwrite: "auto",
        });
      } else {
        item.classList.add("active");
        gsap.killTweensOf([body, icon, innerText]);

        gsap.fromTo(
          body,
          { height: 0, opacity: 0, scale: 0.5 },
          {
            height: body.scrollHeight,
            duration: 0.5,
            opacity: 1,
            scale: 1,
            ease: "back.out",
            overwrite: "auto",
            onComplete: () => {
              body.style.height = "auto";
            },
          },
        );

        gsap.to(icon, {
          rotation: 135,
          duration: 0.4,
          ease: "back.out(2)",
          overwrite: "auto",
        });

        gsap.fromTo(
          innerText,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, delay: 0.15, ease: "power2.out" },
        );
      }
    });
  });

  const root = document.getElementById("faq");
  const items = document.querySelectorAll("#faq .faq-accordion-item");

  if (root && items.length > 0) {
    gsap.fromTo(
      items,
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
  }
});

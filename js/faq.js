document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".faq-accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".faq-accordion-item");
      const body = item.querySelector(".faq-accordion-body");
      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".faq-accordion-item").forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-accordion-body").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("active");
        body.style.maxHeight = null;
      } else {
        item.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".mobile-nav-toggle");
  const drawer = document.querySelector(".mobile-menu-drawer");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      drawer.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (drawer.classList.contains("open")) {
        if (!header.contains(e.target) && !drawer.contains(e.target)) {
          drawer.classList.remove("open");
          toggle.classList.remove("open");
        }
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992 && drawer.classList.contains("open")) {
        drawer.classList.remove("open");
        toggle.classList.remove("open");
      }
    }, { passive: true });
  }
});

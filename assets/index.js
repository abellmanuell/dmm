// import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css";

document.querySelectorAll(".mi-item").forEach((item) => {
  const header = item.querySelector(".mi-header");
  const answer = item.querySelector(".mi-answer");
  const icon = item.querySelector(".mi-icon");

  setupFAQItem(
    header,
    answer,
    icon,
    "./assets/images/icons/icon-up-arrow.svg",
    "./assets/images/icons/icon-greater-than.svg"
  );
});

document.querySelectorAll(".faq-item").forEach((item) => {
  const header = item.querySelector(".faq-header");
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector(".faq-icon");

  setupFAQItem(
    header,
    answer,
    icon,
    "./assets/images/icons/icon-add-circle.svg",
    "./assets/images/icons/icon-minus-circle.svg"
  );
});

function setupFAQItem(headerEl, answerEl, iconEl, addIcon, minusIcon) {
  let isOpen = false;

  headerEl.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      iconEl.src = minusIcon;
      answerEl.style.display = "none";
    } else {
      iconEl.src = addIcon;
      answerEl.style.display = "block";
    }
  });
}

/* Swiper Best selling and detective */
const mobileDivs = document.querySelectorAll(".mobile-layout");
const desktopDivs = document.querySelectorAll(".desktop-layout");

function toggleLayout() {
  if (window.innerWidth < 768) {
    // Show all mobile divs
    mobileDivs.forEach((div) => (div.style.display = "block"));
    desktopDivs.forEach((div) => (div.style.display = "none"));
  } else {
    // Show all desktop divs
    mobileDivs.forEach((div) => (div.style.display = "none"));
    desktopDivs.forEach((div) => (div.style.display = "block"));

    // Initialize Swiper once
    desktopDivs.forEach((div) => {
      if (!div.dataset.swiperInit) {
        new Swiper(div, {
          loop: true,
          slidesPerView: 3,
          spaceBetween: 32,
          autoplay: { delay: 2000 },
        });
        div.dataset.swiperInit = true;
      }
    });
  }
}

// Run on load
toggleLayout();

// Run on resize
window.addEventListener("resize", toggleLayout);

new Swiper(".mySwiper", {
  loop: true,
  speed: 5000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    0: {
      spaceBetween: 32,
    },
    340: {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 32,
      freeMode: true,
    },
    768: {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 32,
      freeMode: true,
    },
    1024: {
      slidesPerView: "auto",
      spaceBetween: 32,
      centeredSlides: true,
      slidesOffsetBefore: 50,
      slidesOffsetAfter: 50,
    },
  },
});
function initScopedSwiper(scopeEl) {
  const swiperContainer = scopeEl.querySelector(".swiperPackage");
  const swiperPackageWrapper = scopeEl.querySelector(".swiperPackageWrapper");
  const customPagination = scopeEl.querySelector(".custom-pagination");

  const prevBtn = scopeEl.querySelector(".swiper-prev");
  const nextBtn = scopeEl.querySelector(".swiper-next");

  let swiperInstance = null;

  function bindArrowNavigation(swiper) {
    prevBtn.addEventListener("click", () => swiper.slidePrev());
    nextBtn.addEventListener("click", () => swiper.slideNext());
  }

  function createCustomPagination(swiper) {
    customPagination.innerHTML = ""; // clear old buttons

    swiper.slides.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.className =
        "h-2 w-2 cursor-pointer rounded-full transition flex items-center justify-center";

      const span = document.createElement("span");
      span.className =
        "block h-2 w-2 rounded-full " +
        (i === swiper.realIndex ? "bg-pumpkin-500" : "bg-black/20");

      btn.appendChild(span);

      btn.addEventListener("click", () => {
        swiper.slideToLoop(i);
      });

      customPagination.appendChild(btn);
    });
  }

  function updateCustomPagination(swiper) {
    const spans = customPagination.querySelectorAll("span");
    spans.forEach((span, i) => {
      span.className =
        "block h-2 w-2 rounded-full " +
        (i === swiper.realIndex ? "bg-pumpkin-500" : "bg-black/20");
    });
  }

  function toggleSwiper() {
    if (window.innerWidth >= 1024) {
      if (!swiperContainer.classList.contains("swiper")) {
        swiperContainer.classList.add("swiper");
        swiperPackageWrapper.classList.remove("grid-cols-2", "gap-6");
        swiperPackageWrapper.setAttribute("style", "display:grid;");
        swiperPackageWrapper.removeAttribute("style");
      }

      if (!swiperInstance) {
        swiperInstance = new Swiper(swiperContainer, {
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          breakpoints: {
            0: { enabled: false },
            768: { slidesPerView: 3, spaceBetween: 32, enabled: true },
            1024: { slidesPerView: 4, spaceBetween: 32, enabled: true },
          },
          on: {
            afterInit: function () {
              createCustomPagination(this);
              bindArrowNavigation(this);
            },
            slideChange: function () {
              updateCustomPagination(this);
            },
          },
        });
      }
    } else {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
      swiperContainer.classList.remove("swiper");
      swiperPackageWrapper.classList.add("grid-cols-2", "gap-6");
      swiperPackageWrapper.setAttribute("style", "display:grid;");
      customPagination.innerHTML = ""; // remove buttons on mobile
    }
  }

  toggleSwiper();
  window.addEventListener("resize", toggleSwiper);
}

// Initialize all scopes
document.querySelectorAll(".swiperScope").forEach((scope) => {
  initScopedSwiper(scope);
});

new Swiper(".mySwiper", {
  loop: true,
  speed: 5000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
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

const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownLabel = document.getElementById("dropdownLabel");

// Toggle dropdown
dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

// Handle selection
dropdownMenu.querySelectorAll("button").forEach((item) => {
  item.addEventListener("click", (e) => {
    dropdownLabel.textContent = e.target.dataset.value;
    dropdownMenu.classList.add("hidden");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const videoContent = document.getElementById("videoContent");
const videoClose = document.getElementById("videoClose");

// Open modal
document.querySelectorAll(".video-trigger").forEach((btn) => {
  btn.addEventListener("click", () => {
    const videoUrl = btn.getAttribute("data-video");
    videoFrame.src = videoUrl;

    videoModal.classList.remove("hidden");
    videoModal.classList.add("flex");

    videoContent.classList.remove("video-animate");
    void videoContent.offsetWidth;
    videoContent.classList.add("video-animate");
  });
});

// Close modal
videoClose.addEventListener("click", () => {
  videoModal.classList.add("hidden");
  videoModal.classList.remove("flex");
  videoFrame.src = "";
});

document.querySelectorAll(".mi-item").forEach((item) => {
  const header = item.querySelector(".mi-header");
  const answer = item.querySelector(".mi-answer");
  const icon = item.querySelector(".mi-icon");

  setupFAQItem(
    header,
    answer,
    icon,
    "./assets/images/icons/icon-down-arrow-2.svg",
    "./assets/images/icons/icon-up-arrow.svg"
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
      answerEl.style.display = "block";
    } else {
      iconEl.src = addIcon;
      answerEl.style.display = "none";
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
      customPagination.innerHTML = "";
    }
  }

  toggleSwiper();
  window.addEventListener("resize", toggleSwiper);
}

// Initialize all scopes
document.querySelectorAll(".swiperScope").forEach((scope) => {
  initScopedSwiper(scope);
});

/********************************
 *
 *  Product Image Swipper
 *
 * ******************************/
function initResponsiveSwiper() {
  const scope = document.querySelector(".swiperProductScope");
  if (!scope) return;
  const swiperContainer = scope.querySelector(".swiperProduct");
  const swiperWrapper = scope.querySelector(".swiper-wrapper");
  const customPagination = scope.querySelector(".custom-pagination");

  let swiperInstance = null;

  function buildThumbs(slides) {
    customPagination.innerHTML = "";
    slides.forEach((slide, index) => {
      const img =
        slide.querySelector("img.product-image") ||
        slide.querySelector("img.w-full") ||
        slide.querySelector("img.rounded-2xl") ||
        Array.from(slide.querySelectorAll("img")).pop();

      const src = img ? img.src : "";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "swiper-thumb w-[80px] h-[80px] overflow-hidden rounded-2xl border-2 border-transparent opacity-60";
      btn.innerHTML = `<img src="${src}" class="w-full h-full object-cover" alt="thumb-${index}" />`;

      btn.addEventListener("click", () => {
        if (swiperInstance) {
          swiperInstance.slideToLoop(index, 300);
        }
      });

      customPagination.appendChild(btn);
    });
  }

  function updateThumbs(activeIndex) {
    const btns = customPagination.querySelectorAll("button");
    btns.forEach((btn, i) => {
      if (i === activeIndex) {
        btn.classList.add("border-pumpkin-500");
        btn.classList.remove("opacity-60");
      } else {
        btn.classList.remove("border-pumpkin-500");
        btn.classList.add("opacity-60");
      }
    });
  }

  function enableSwiper() {
    if (!swiperInstance) {
      swiperContainer.classList.add("swiper");
      swiperWrapper.classList.add("swiper-wrapper");
      swiperWrapper.classList.remove("grid", "grid-cols-2", "gap-8");

      swiperInstance = new Swiper(swiperContainer, {
        loop: true,
        speed: 500,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: "auto",
            spaceBetween: 16,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
            centeredSlides: false,
          },
        },
        on: {
          init: function () {
            const realSlides = Array.from(this.slides).filter(
              (s) => !s.classList.contains("swiper-slide-duplicate")
            );
            buildThumbs(realSlides);
            updateThumbs(this.realIndex);
          },
          slideChange: function () {
            updateThumbs(this.realIndex);
          },
        },
      });
    }
    customPagination.style.display = "flex";
  }

  function disableSwiper() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    swiperContainer.classList.remove("swiper");
    swiperWrapper.classList.remove("swiper-wrapper");
    swiperWrapper.classList.add("grid", "grid-cols-2", "gap-8");

    customPagination.style.display = "none";
  }

  function toggleSwiper() {
    if (window.innerWidth <= 1024) {
      enableSwiper();
    } else {
      disableSwiper();
    }
  }

  toggleSwiper();
  window.addEventListener("resize", toggleSwiper);
}

initResponsiveSwiper();

document.querySelectorAll(".zoom-trigger").forEach((btn) => {
  btn.addEventListener("click", () => {
    const slide = btn.closest(".swiper-slide") || btn.closest("div");
    const img = slide.querySelector("img.product-image");
    if (!img) return;

    const zoomModal = document.getElementById("zoomModal");
    const zoomedImage = document.getElementById("zoomedImage");

    zoomedImage.src = img.src;
    zoomModal.classList.remove("hidden");
    zoomModal.classList.add("flex");
  });
});

// Close button
const zoomClose = document.getElementById("zoomClose");
if (zoomClose) {
  zoomClose.addEventListener("click", () => {
    const zoomModal = document.getElementById("zoomModal");
    if (zoomModal) {
      zoomModal.classList.add("hidden");
      zoomModal.classList.remove("flex");
    }
  });
}

// Close on background click
const zoomModal = document.getElementById("zoomModal");

if (zoomModal) {
  // Close when clicking on the dark background
  zoomModal.addEventListener("click", (e) => {
    if (e.target.id === "zoomModal") {
      zoomModal.classList.add("hidden");
      zoomModal.classList.remove("flex");
    }
  });
}

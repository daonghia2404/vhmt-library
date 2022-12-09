window.onload = () => {
  header.init();
  navigation.init();
  owlCarousel.init();
  folderTree.init();
  tabWrapper.init();
  select2.init();
  seeMoreSection.init();
  showHidePassword.init();
  customAudio.init();
  modal.init();
  amount.init();
  profileCardMenu.init();
  lightGalleryJs.init();
};

const loading = {
  init: function () {
    this.configLoading();
  },
  configLoading: function () {},
};

const owlCarousel = {
  init: function () {
    this.setupHomeBannerCarousel();
    this.setupBookCollectionCarousel();
    this.setupCardWithTitleLibrariesSystemCarousel();
    this.setupCardWithTitleLibraryCarousel();
    this.setupCardWithTitleCarousel();
    this.setupPostBlockCarousel();
    this.setupBookDetailCarousel();
    this.setupPostCarousel();
  },
  setupImageGalleryModalCarousel: function (
    data,
    currentClickIndex = 0,
    isSetuped = false
  ) {
    const viewMain = document.querySelector("#ImageViewModalGallery");
    const galleryMain = document.querySelector("#ImageGalleryModalGallery");
    viewMain.innerHTML = "";
    galleryMain.innerHTML = "";
    data.forEach((item) => {
      const elementView = document.createElement("div");
      const elementGallery = document.createElement("div");
      elementView.className = "ImageGalleryModal-view-item ";
      elementGallery.className = "ImageGalleryModal-gallery-item";

      elementView.innerHTML = `<img src="${item.url}" alt="" />`;
      elementGallery.innerHTML = `<img src="${item.url}" alt="" />`;

      viewMain.append(elementView);
      galleryMain.append(elementGallery);
    });

    let currentIndexItem = currentClickIndex;
    const textTotal = document.querySelector(
      ".ImageGalleryModal-gallery-total"
    );

    const updateCarousel = (activeIndex) => {
      currentIndexItem = activeIndex;
      galleryItems.forEach((i) => i.classList.remove("active"));
      galleryItems[activeIndex].classList.add("active");
      textTotal.innerHTML = `Hình ảnh: ${activeIndex + 1}/${
        galleryItems.length
      }`;
    };

    const galleryOwl = $("#ImageGalleryModalGallery").owlCarousel({
      responsive: {
        0: {
          items: 3,
          slideBy: 3,
        },
        768: {
          items: 5,
          slideBy: 5,
        },
      },
      loop: false,
      autoplay: false,
      smartSpeed: 300,
      lazyLoad: true,
      dots: false,
      nav: false,
      margin: 5,
    });

    const viewOwl = $("#ImageViewModalGallery").owlCarousel({
      responsive: {
        0: {
          items: 1,
          slideBy: 1,
        },
      },
      loop: false,
      autoplay: false,
      smartSpeed: 300,
      lazyLoad: true,
      dots: false,
      nav: false,
      margin: 0,
    });

    const prevBtn = document.querySelector(".ImageGalleryModal-view-prev");
    const nextBtn = document.querySelector(".ImageGalleryModal-view-next");
    const galleryItems = document.querySelectorAll(
      ".ImageGalleryModal-gallery-item"
    );

    viewOwl.on("changed.owl.carousel", (event) => {
      const currentIndex = event.item.index;
      galleryOwl.trigger("to.owl.carousel", currentIndex);
      updateCarousel(
        typeof currentIndex === "number" ? currentIndex : currentIndexItem
      );
    });

    if (!isSetuped) {
      prevBtn.addEventListener("click", () => {
        if (currentIndexItem > 0) {
          viewOwl.trigger("prev.owl.carousel", [300]);
        }
      });

      nextBtn.addEventListener("click", () => {
        if (currentIndexItem < galleryItems.length - 1) {
          viewOwl.trigger("next.owl.carousel", [300]);
        }
      });
    }

    galleryItems.forEach((item, index) =>
      item.addEventListener("click", () => {
        viewOwl.trigger("to.owl.carousel", index);
      })
    );

    galleryItems[currentIndexItem].classList.add("active");
    textTotal.innerHTML = `Hình ảnh: ${currentIndexItem + 1}/${galleryItems.length}`;
    viewOwl.trigger("to.owl.carousel", currentIndexItem);
  },
  setupHomeBannerCarousel: function () {
    $("#HomeBanner-top").owlCarousel({
      responsive: {
        0: {
          items: 1,
          slideBy: 1,
          mouseDrag: true,
          touchDrag: true,
        },
        991: {
          items: 1,
          slideBy: 1,
          mouseDrag: false,
          touchDrag: false,
        },
      },
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 300,
      lazyLoad: true,
      dots: true,
      nav: true,
      navText: [
        '<img src="./assets/icons/icon-caret-circle-left-white.svg" alt="" />',
        '<img src="./assets/icons/icon-caret-circle-right-white.svg" alt="" />',
      ],
      margin: 0,
    });

    $("#HomeBanner-bottom").owlCarousel({
      responsive: {
        0: {
          items: 1.5,
          mouseDrag: true,
          touchDrag: true,
        },
        991: {
          items: 3,
          mouseDrag: false,
          touchDrag: false,
          autoplay: false,
        },
      },
      center: true,
      autoplay: false,
      loop: true,
      lazyLoad: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 300,
      dots: false,
      nav: false,
      margin: 16,
    });
  },
  setupBookCollectionCarousel: function () {
    const bookCollections = document.querySelectorAll(".BookCollection");
    bookCollections.forEach((item) => {
      const prevBtn = item.querySelector(".owl-arrow-left");
      const nextBtn = item.querySelector(".owl-arrow-right");
      const mainOwl = item.querySelector(".owl-carousel");

      if (prevBtn && nextBtn && mainOwl) {
        const $owl = $(mainOwl).owlCarousel({
          responsive: {
            0: {
              items: 1,
              mouseDrag: true,
              touchDrag: true,
            },
            991: {
              items: 1,
              mouseDrag: false,
              touchDrag: false,
            },
          },
          loop: true,
          autoplay: false,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          smartSpeed: 300,
          lazyLoad: true,
          dots: false,
          nav: false,
          margin: 16,
        });

        prevBtn.addEventListener("click", () => {
          $owl.trigger("prev.owl.carousel");
        });

        nextBtn.addEventListener("click", () => {
          $owl.trigger("next.owl.carousel");
        });
      }
    });
  },
  setupCardWithTitleLibraryCarousel: function () {
    const cartWithTitle = document.querySelectorAll(".CardWithTitle.library");
    cartWithTitle.forEach((item) => {
      const prevBtn = item.querySelector(".owl-arrow-left");
      const nextBtn = item.querySelector(".owl-arrow-right");
      const mainOwl = item.querySelector(".owl-carousel");

      if (prevBtn && nextBtn && mainOwl) {
        const $owl = $(mainOwl).owlCarousel({
          responsive: {
            0: {
              items: 2,
              mouseDrag: true,
              touchDrag: true,
              margin: 16,
            },
            991: {
              items: 3,
              mouseDrag: false,
              touchDrag: false,
            },
          },
          loop: true,
          autoplay: false,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          smartSpeed: 300,
          lazyLoad: true,
          dots: false,
          nav: false,
          margin: 30,
        });

        prevBtn.addEventListener("click", () => {
          $owl.trigger("prev.owl.carousel");
        });

        nextBtn.addEventListener("click", () => {
          $owl.trigger("next.owl.carousel");
        });
      }
    });
  },
  setupCardWithTitleLibrariesSystemCarousel: function () {
    const cartWithTitle = document.querySelectorAll(
      ".CardWithTitle.libraries-system"
    );
    cartWithTitle.forEach((item) => {
      const prevBtn = item.querySelector(".owl-arrow-left");
      const nextBtn = item.querySelector(".owl-arrow-right");
      const mainOwl = item.querySelector(".owl-carousel");

      if (prevBtn && nextBtn && mainOwl) {
        const $owl = $(mainOwl).owlCarousel({
          responsive: {
            0: {
              items: 1,
              mouseDrag: true,
              touchDrag: true,
            },
            991: {
              items: 1,
              mouseDrag: false,
              touchDrag: false,
            },
          },
          loop: true,
          autoplay: false,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          smartSpeed: 300,
          lazyLoad: true,
          dots: false,
          nav: false,
          margin: 30,
        });

        prevBtn.addEventListener("click", () => {
          $owl.trigger("prev.owl.carousel");
        });

        nextBtn.addEventListener("click", () => {
          $owl.trigger("next.owl.carousel");
        });
      }
    });
  },
  setupCardWithTitleCarousel: function () {
    const cartWithTitle = document.querySelectorAll(
      ".CardWithTitle:not(.library):not(.libraries-system)"
    );
    cartWithTitle.forEach((item) => {
      const prevBtn = item.querySelector(".owl-arrow-left");
      const nextBtn = item.querySelector(".owl-arrow-right");
      const mainOwl = item.querySelector(".owl-carousel");

      if (prevBtn && nextBtn && mainOwl) {
        const $owl = $(mainOwl).owlCarousel({
          responsive: {
            0: {
              items: 2.2,
              slideBy: 1,
              mouseDrag: true,
              touchDrag: true,
            },
            768: {
              items: 3,
              slideBy: 1,
              mouseDrag: true,
              touchDrag: true,
            },
            991: {
              items: 4,
              slideBy: 1,
              mouseDrag: false,
              touchDrag: false,
            },
          },
          loop: true,
          autoplay: false,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          smartSpeed: 300,
          lazyLoad: true,
          dots: false,
          nav: false,
        });

        prevBtn.addEventListener("click", () => {
          $owl.trigger("prev.owl.carousel");
        });

        nextBtn.addEventListener("click", () => {
          $owl.trigger("next.owl.carousel");
        });
      }
    });
  },
  setupPostBlockCarousel: function () {
    $(".PostBlock-carousel").owlCarousel({
      responsive: {
        0: {
          items: 1,
          slideBy: 1,
          mouseDrag: true,
          touchDrag: true,
        },
        991: {
          items: 1,
          slideBy: 1,
          mouseDrag: false,
          touchDrag: false,
        },
      },
      loop: true,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 300,
      lazyLoad: true,
      dots: false,
      nav: true,
      navText: [
        '<img src="./assets/icons/icon-caret-square-left-gray.svg" alt="" />',
        '<img src="./assets/icons/icon-caret-square-right-gray.svg" alt="" />',
      ],
      margin: 0,
    });
  },
  setupPostCarousel: function () {
    $(".PostCarousel").owlCarousel({
      responsive: {
        0: {
          items: 1,
          mouseDrag: true,
          touchDrag: true,
        },
        991: {
          items: 1,
          mouseDrag: false,
          touchDrag: false,
        },
      },
      loop: true,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 300,
      lazyLoad: true,
      dots: false,
      nav: true,
      navText: [
        '<img src="./assets/icons/icon-arrow-square-left-gray-light.svg" alt="" />',
        '<img src="./assets/icons/icon-arrow-square-right-gray-light.svg" alt="" />',
      ],
      margin: 0,
    });
  },
  setupBookDetailCarousel: function () {
    let activeIndex = 0;
    const listSlider = document.querySelector(
      ".BookDetailSection-preview-list-group"
    );
    const listSliderItems = listSlider?.querySelectorAll(
      ".BookDetailSection-preview-list-item"
    );
    const arrowUp = document.querySelector(
      ".BookDetailSection-preview-list-arrow.prev"
    );
    const arrowDown = document.querySelector(
      ".BookDetailSection-preview-list-arrow.next"
    );

    const $owl = $("#BookDetailSection-carousel").owlCarousel({
      responsive: {
        0: {
          items: 1,
          nav: true,
          mouseDrag: true,
          touchDrag: true,
        },
        991: {
          items: 1,
          mouseDrag: false,
          touchDrag: false,
        },
      },
      loop: false,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 300,
      lazyLoad: true,
      dots: false,
      nav: false,
      navText: [
        '<img src="./assets/icons/icon-angle-left-gray-light.svg" alt="" />',
        '<img src="./assets/icons/icon-angle-right-gray-light.svg" alt="" />',
      ],
      margin: 0,
    });

    arrowUp?.addEventListener?.("click", () => {
      listSlider.scrollTop = listSlider.scrollTop - 85 - 15;
    });

    arrowDown?.addEventListener?.("click", () => {
      listSlider.scrollTop = listSlider.scrollTop + 85 + 15;
    });

    listSliderItems?.forEach?.((item, index) =>
      item.addEventListener("click", () => {
        activeIndex = index;
        $owl.trigger("to.owl.carousel", [index, 500]);
        listSliderItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      })
    );

    listSliderItems?.[activeIndex]?.classList?.add?.("active");
  },
};

const header = {
  init: function () {
    this.menuMobile();
    this.filterCategoryMobile();
    this.dropdownAccount();
  },
  dropdownAccount: function () {
    const headerAccount = document.querySelector(".Header-account");
    const headerDropdown = document.querySelector(".Header-sub-items");

    if (headerAccount && headerDropdown) {
      headerAccount?.addEventListener?.("click", (e) => {
        headerDropdown.classList.toggle("active");
      });
      const listener = (event) => {
        if (!headerDropdown || headerDropdown.contains(event.target)) return;
        headerDropdown.classList.remove("active");
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }
  },
  menuMobile: function () {
    const btnMenu = document.querySelector(".NavigationMobile-open");
    const menu = document.querySelector(".NavigationMobile");

    if (btnMenu && menu) {
      const overlay = menu.querySelector(".NavigationMobile-overlay");
      const close = menu.querySelector(".NavigationMobile-close");

      btnMenu.addEventListener("click", () => {
        menu.classList.add("active");
      });
      overlay.addEventListener("click", () => {
        menu.classList.remove("active");
      });
      close.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    }
  },
  filterCategoryMobile: function () {
    const btnMenu = document.querySelector(".FilterCategoryMobile-open");
    const menu = document.querySelector(".FilterCategoryMobile");

    if (btnMenu && menu) {
      const overlay = menu.querySelector(".FilterCategoryMobile-overlay");
      const close = menu.querySelector(".FilterCategoryMobile-close");

      btnMenu.addEventListener("click", () => {
        menu.classList.add("active");
      });
      overlay.addEventListener("click", () => {
        menu.classList.remove("active");
      });
      close.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    }
  },
};

const navigation = {
  init: function () {
    this.dropdownSubmenu();
    this.dropdownSubmenuMobile();
    this.dropdownCategories();
  },
  dropdownCategories: function () {
    const wrapper = document.querySelector(".CategoriesDropdown.event-click");
    if (wrapper) {
      const wrapperBtn = wrapper.querySelector(".CategoriesDropdown-wrapper");

      wrapperBtn?.addEventListener("click", () => {
        wrapper.classList.toggle("active");
      });
    }
  },
  dropdownSubmenu: function () {
    const navigationItems = document.querySelectorAll(".Navigation-list-item");

    navigationItems.forEach((item) => {
      const caretIcon = item.querySelector(".Navigation-list-item-caret");
      const subItems = item.querySelector(".Navigation-sub-items");

      if (caretIcon) {
        item?.addEventListener?.("click", (e) => {
          item.classList.toggle("active");
          subItems.classList.toggle("active");
        });
      }

      const listener = (event) => {
        if (!subItems || subItems.contains(event.target)) return;
        item.classList.remove("active");
        subItems.classList.remove("active");
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    });
  },
  dropdownSubmenuMobile: function () {
    const navigationItems = document.querySelectorAll(
      ".NavigationMobile-list-item"
    );

    navigationItems.forEach((item) => {
      const caretIcon = item.querySelector(".NavigationMobile-list-item-caret");
      const subItems = item.querySelector(".NavigationMobile-sub-items");

      if (caretIcon) {
        item?.addEventListener?.("click", (e) => {
          subItems.classList.toggle("active");
          item.classList.toggle("active");
        });
      }
    });
  },
};

const folderTree = {
  init: function () {
    this.dropdownSubmenu();
  },
  dropdownSubmenu: function () {
    const items = document.querySelectorAll(".FolderTree-group-item");

    items.forEach((item) => {
      const arrow = item.querySelector(".FolderTree-group-item-arrow");
      const subItems = item.querySelector(".FolderTree-subItems");

      if (arrow && subItems)
        arrow.addEventListener("click", () => item.classList.toggle("active"));
    });
  },
};

const tabWrapper = {
  init: function () {
    this.config();
  },
  config: function () {
    const mains = document.querySelectorAll(".tab-wrapper");

    mains.forEach((main) => {
      const tabItems = main.querySelectorAll(".tab-item");
      const tabMains = main.querySelectorAll(".tab-main");

      tabItems?.[0]?.classList?.add("active");
      tabMains?.[0]?.classList?.add("active");

      tabItems.forEach((tab, tabIndex) =>
        tab.addEventListener("click", () => {
          tabItems.forEach((item) => item.classList.remove("active"));
          tabMains.forEach((item) => item.classList.remove("active"));

          tabItems[tabIndex].classList.add("active");
          tabMains[tabIndex].classList.add("active");
        })
      );
    });
  },
};

const select2 = {
  init: function () {
    this.singleSelect2();
  },
  singleSelect2: function () {
    const selects = document.querySelectorAll(".single-select2");

    selects.forEach((item) => {
      $(item).select2({
        placeholder: item.dataset.placeholder,
        minimumResultsForSearch: -1,
        width: "100%",
      });
    });
  },
};

const seeMoreSection = {
  init: function () {
    this.config();
  },
  config: function () {
    const sections = document.querySelectorAll(".SeeMore");
    sections.forEach((item) => {
      let isExpand = false;
      const btn = item.querySelector(".SeeMore-btn");

      btn.addEventListener("click", () => {
        const text = btn.querySelector("span");
        if (isExpand) {
          item.classList.remove("active");
          text.innerHTML = "Xem đầy đủ";
        } else {
          item.classList.add("active");
          text.innerHTML = "Thu gọn";
        }

        isExpand = !isExpand;
      });
    });
  },
};

const modal = {
  init: function () {
    this.config();
  },
  config: function () {
    const openBtns = document.querySelectorAll(".Modal-open");

    openBtns.forEach((item) =>
      item.addEventListener("click", () => {
        const modal = document.querySelector(`#${item.dataset.modal}`);

        if (modal) {
          const overlay = modal.querySelector(".Modal-overlay");
          const closeBtn = modal.querySelector(".Modal-close");

          modal.classList.add("active");

          overlay.addEventListener("click", () =>
            modal.classList.remove("active")
          );
          closeBtn.addEventListener("click", () =>
            modal.classList.remove("active")
          );
        }
      })
    );
  },
};

const toast = {
  show: function (image, title, description) {
    const main = document.querySelector(".Notification");
    const div = document.createElement("div");
    div.className = "Notification-item flex items-center show-up";
    div.innerHTML = `
      <div class="Notification-item-close">
        <img src="./assets/icons/icon-close.svg" alt="" />
      </div> 

      <div class="Notification-item-image">
        <img src="${image}" alt="" />
      </div>

      <div class="Notification-item-info">
        <div class="Notification-item-title">${title}</div>
        <div class="Notification-item-description">${description}</div>
      </div>
    `;

    const close = div.querySelector(".Notification-item-close");
    close.addEventListener("click", () => {
      div.className = "Notification-item flex items-center hide";

      const timeoutAnimation = setTimeout(() => {
        div.remove();
        clearTimeout(timeoutAnimation);
      }, 500);
    });

    main.appendChild(div);

    const timeout = setTimeout(() => {
      div.className = "Notification-item flex items-center hide";

      const timeoutAnimation = setTimeout(() => {
        div.remove();
        clearTimeout(timeoutAnimation);
      }, 500);
      clearTimeout(timeout);
    }, 3000);
  },
};

const showHidePassword = {
  init: function () {
    this.config();
  },
  config: function () {
    const inputPasswords = document.querySelectorAll(
      ".Input.show-hide-password"
    );

    inputPasswords.forEach((item) => {
      const btnShowHide = item.querySelector(".Input-show-hide-password");
      const input = item.querySelector(".Input-control");

      btnShowHide.addEventListener("click", () => {
        btnShowHide.classList.toggle("active");
        input.type = input.type === "password" ? "text" : "password";
      });
    });
  },
};

setInterval(() => {
  toast.show(
    "./assets/images/image-book-block.png",
    "<b>Lê Nam</b> vừa đọc “Giáo trình phân tích kinh doanh nội dung này 2 dòng ...",
    "1 phút trước"
  );
}, 5000);

const amount = {
  init: function () {
    this.config();
  },
  config: function () {
    const main = document.querySelectorAll(".Amount");
    main.forEach((item) => {
      const minusBtn = item.querySelector(".Amount-minus");
      const plusBtn = item.querySelector(".Amount-plus");
      const control = item.querySelector(".Amount-control input");
      const MIN = 1;

      minusBtn.addEventListener("click", () => {
        const currentValue = Number(control.value);
        if (currentValue > MIN) {
          control.value = currentValue - 1;
        }
      });

      plusBtn.addEventListener("click", () => {
        const currentValue = Number(control.value);
        control.value = currentValue + 1;
      });
    });
  },
};

const customAudio = {
  init: function () {
    this.config();
  },
  config: function () {
    const mains = document.querySelectorAll(".js-custom-audio-player");
    mains.forEach((main) => {
      if (main) {
        let audioPlayer = main.querySelector(".audio-current");

        const audioTitle = main.querySelector(".audio-title");
        const audioAuthor = main.querySelector(".audio-des .audio-author");
        const audioImage = document.querySelector(
          ".section-book-detail-image img"
        );

        const audioCurrentTime = main.querySelector(".audio-current-time");
        const audioTotalTime = main.querySelector(".audio-total-time");

        let isAudioProcessSlide = false;
        rangesliderJs.create($(".range-slider-input.audio-process"), {
          min: 0,
          max: 100,
          value: 0,
          step: 1,
          // callbacks
          onInit: (value, percent, position) => {},
          onSlideStart: (value, percent, position) => {},
          onSlide: (value, percent, position) => {
            isAudioProcessSlide = true;
          },
          onSlideEnd: (value, percent, position) => {
            setAudioLoading(true);
            isAudioProcessSlide = false;
            audioPlayer.currentTime = value;
            playAudio();
          },
        });
        const audioProcessDOM = main.querySelector(
          ".range-slider-input.audio-process"
        );
        const audioProcess = audioProcessDOM["rangeslider-js"];

        const audioIconVolume = main.querySelector(".audio-volume-wrapper svg");
        let isVolumeProcessSlide = false;
        rangesliderJs.create($(".range-slider-input.audio-volume"), {
          min: 0,
          max: 100,
          value: 100,
          step: 1,
          // callbacks
          onInit: (value, percent, position) => {},
          onSlideStart: (value, percent, position) => {},
          onSlide: (value, percent, position) => {
            isVolumeProcessSlide = true;
            if (value === 0) {
              audioIconVolume.parentNode.classList.add("mute");
            } else {
              audioIconVolume.parentNode.classList.remove("mute");
            }
            audioPlayer.volume = value / 100;
          },
          onSlideEnd: (value, percent, position) => {
            isVolumeProcessSlide = false;
            if (value === 0) {
              audioIconVolume.parentNode.classList.add("mute");
            } else {
              audioIconVolume.parentNode.classList.remove("mute");
            }
            audioPlayer.volume = value / 100;
          },
        });
        const volumeDOM = main.querySelector(
          ".range-slider-input.audio-volume"
        );
        const volumeProcess = volumeDOM["rangeslider-js"];

        const audioPrevBtn = main.querySelector(".audio-prev");
        const audioPlayBtn = main.querySelector(".audio-play");
        const audioNextBtn = main.querySelector(".audio-next");
        const audioLoopBtn = main.querySelector(".audio-repeat");
        const audioShuffleBtn = main.querySelector(".audio-shuffle");

        const audioPlaybackRate = main.querySelectorAll(
          ".audio-time-skip .dropdown-item"
        );

        const audioBarList = main.querySelector(".audio-bar");
        const audioListsItem = main.querySelector(".audio-detail-lists");

        audioBarList.addEventListener("click", () => {
          audioBarList.classList.toggle("active");
          audioListsItem.classList.toggle("active");
        });

        const audioLoading = main.querySelector(".audio-loading");
        const setAudioLoading = (isLoading) => {
          if (isLoading) audioLoading.classList.add("loading");
          else audioLoading.classList.remove("loading");
        };

        let isAudioShuffle = false;
        let isAudioLoop = false;
        let oldValueAudio = 100;

        const formatTime = (seconds) => {
          if (seconds === 0 || !seconds) return "00:00:00";
          return new Date(seconds * 1000).toISOString().substr(11, 8);
        };

        // const getDuration = (src, cb) => {
        //   var audio = new Audio()
        //   $(audio).on("loadedmetadata", function () {
        //     cb(audio.duration)
        //   })
        //   audio.src = src
        // }

        let currentListIndex = 0;
        const audioLists = main.querySelectorAll(".AudioList-item");

        // audioLists.forEach((item, index) => {
        //   const audioSrc = item.dataset.audioSrc
        //   getDuration(audioSrc, (duration) => {
        //     item.querySelector('.item__timer').innerHTML = formatTime(duration)
        //   })
        // })
        audioLists.forEach((item, index) =>
          item.addEventListener("click", () => {
            audioLists.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");

            currentListIndex = index;
            const audioSrc = item.dataset.audioSrc;
            const audioTitle = item.dataset.audioTitle;
            const audioAuthor = item.dataset.audioAuthor;
            const audioImage = item.dataset.audioImage;

            changeAudio(audioImage, audioTitle, audioAuthor, audioSrc);
          })
        );

        const getShuffleAudio = () => {
          const index = Math.floor(Math.random() * audioLists.length);
          if (index === currentListIndex || !audioLists[index]) {
            getShuffleAudio();
          } else {
            currentListIndex = index;
            renderAudio();
          }
        };

        const renderAudio = () => {
          audioLists.forEach((i) => i.classList.remove("active"));
          audioLists[currentListIndex].classList.add("active");

          const audioSrc = audioLists[currentListIndex].dataset.audioSrc;
          const audioTitle = audioLists[currentListIndex].dataset.audioTitle;
          const audioAuthor = audioLists[currentListIndex].dataset.audioAuthor;
          const audioImage = audioLists[currentListIndex].dataset.audioImage;

          changeAudio(audioImage, audioTitle, audioAuthor, audioSrc);
        };

        const initAudio = () => {
          audioPlayer.currentTime = 0;
          audioProcess.update({ min: 0, max: audioPlayer.duration, value: 0 });
          audioCurrentTime.innerHTML = formatTime(0);
          audioTotalTime.innerHTML = formatTime(audioPlayer.duration);
        };

        const mounted = async () => {
          let isMounted = true;
          const audioSrc = audioLists[currentListIndex].dataset.audioSrc;
          const audioTitle = audioLists[currentListIndex].dataset.audioTitle;
          const audioAuthor = audioLists[currentListIndex].dataset.audioAuthor;
          const audioImage = audioLists[currentListIndex].dataset.audioImage;

          setAudioLoading(true);
          const res = await fetch(audioSrc);
          if (res.status === 200) {
            audioPlayer.querySelector("source").src = audioSrc;
            audioTitle.innerHTML = audioTitle;
            audioAuthor.innerHTML = audioAuthor;
            audioImage.src = audioImage;

            audioPlayer.addEventListener("loadeddata", () => {
              if (isMounted) {
                pauseAudio();
                setAudioLoading(false);
                initAudio();
                isMounted = false;
              }
            });
            playAudio(true);
          }
        };

        const updateAudio = () => {
          if (!isAudioProcessSlide)
            audioProcess.update({ value: audioPlayer.currentTime });
          audioCurrentTime.innerHTML = formatTime(audioPlayer.currentTime);
          audioTotalTime.innerHTML = formatTime(audioPlayer.duration);
        };

        const changeAudio = async (image, title, author, src) => {
          audioPlayer.pause();
          setAudioLoading(true);
          const res = await fetch(src);

          if (res.status === 200) {
            audioPlayer.querySelector("source").src = src;
            audioTitle.innerHTML = title;
            audioAuthor.innerHTML = author;
            if (audioImage) audioImage.src = image;

            audioPlayer.addEventListener("loadeddata", () => {
              setAudioLoading(false);
              initAudio();
            });
            playAudio(true);
          }
        };

        audioPlayer.addEventListener("canplay", (e) => {
          setAudioLoading(false);
        });

        const nextAudio = () => {
          currentListIndex++;
          if (audioLists[currentListIndex]) {
            renderAudio();
          } else {
            currentListIndex = audioLists.length;
          }
        };

        const prevAudio = () => {
          currentListIndex--;
          if (audioLists[currentListIndex]) {
            renderAudio();
          } else {
            currentListIndex = 0;
          }
        };

        const playAudio = (isLoad) => {
          audioPlayBtn.classList.add("active");
          if (isLoad) audioPlayer.load();
          audioPlayer.play();
        };
        const pauseAudio = () => {
          audioPlayBtn.classList.remove("active");
          audioPlayer.pause();
        };

        audioPlayer.addEventListener("timeupdate", (e) => {
          updateAudio();
        });
        audioPlayer.addEventListener("ended", () => {
          audioPlayBtn.classList.remove("active");

          if (isAudioShuffle) {
            getShuffleAudio();
          } else if (isAudioLoop) {
            renderAudio();
          } else {
            nextAudio();
          }
        });

        audioPlayBtn.addEventListener("click", () => {
          audioPlayBtn.classList.toggle("active");
          if (audioPlayBtn.className.includes("active")) {
            playAudio();
          } else {
            pauseAudio();
          }
        });
        audioNextBtn.addEventListener("click", () => {
          if (isAudioShuffle) getShuffleAudio();
          else nextAudio();
        });
        audioPrevBtn.addEventListener("click", () => {
          prevAudio();
        });
        audioLoopBtn.addEventListener("click", () => {
          audioLoopBtn.classList.toggle("active");
          if (audioLoopBtn.className.includes("active")) {
            isAudioLoop = true;
          } else {
            isAudioLoop = false;
          }
        });
        audioShuffleBtn.addEventListener("click", () => {
          audioShuffleBtn.classList.toggle("active");
          if (audioShuffleBtn.className.includes("active")) {
            isAudioShuffle = true;
          } else {
            isAudioShuffle = false;
          }
        });

        audioIconVolume.addEventListener("click", () => {
          audioIconVolume.parentNode.classList.toggle("mute");
          if (audioIconVolume.parentNode.className.includes("mute")) {
            oldValueAudio = volumeProcess.value;
            volumeProcess.update({ value: 0 });
            audioPlayer.volume = 0;
          } else {
            volumeProcess.update({ value: oldValueAudio });
            audioPlayer.volume = oldValueAudio / 100;
          }
        });

        audioPlaybackRate.forEach((item, index) =>
          item.addEventListener("click", () => {
            audioPlaybackRate.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");
            audioPlayer.playbackRate = Number(item.dataset.playbackRate);
          })
        );

        mounted();
      }
    });
  },
};

const profileCardMenu = {
  init: function () {
    this.config();
  },
  config: function () {
    const main = document.querySelector(".ProfileCardMobile");
    if (main) {
      const btn = main.querySelector(".ProfileCard-account-arrow");

      btn.addEventListener("click", () => {
        main.classList.toggle("show");
      });
    }
  },
};

const lightGalleryJs = {
  init: function () {
    this.config();
  },
  config: function () {
    const mains = document.querySelectorAll(".lightgallery");
    const imageGalleryModal = document.querySelector(".ImageGalleryModal");

    if (imageGalleryModal) {
      const overlay = imageGalleryModal.querySelector(
        ".ImageGalleryModal-overlay"
      );
      const closeBtn = imageGalleryModal.querySelector(
        ".ImageGalleryModal-close"
      );

      function handleCloseModal() {
        imageGalleryModal.classList.remove("active");
        $("#ImageGalleryModalGallery")
          .owlCarousel({})
          .trigger("destroy.owl.carousel");
        $("#ImageViewModalGallery")
          .owlCarousel({})
          .trigger("destroy.owl.carousel");
      }

      overlay.addEventListener("click", handleCloseModal);
      closeBtn.addEventListener("click", handleCloseModal);

      mains.forEach((main) => {
        let isSetuped = false;
        const items = Array.from(main.querySelectorAll(".lightgallery-item"));
        const data = items.map((item) => ({
          url: item.dataset.src,
        }));
        items.forEach((item, index) =>
          item.addEventListener("click", () => {
            owlCarousel.setupImageGalleryModalCarousel(data, index, isSetuped);
            isSetuped = true;
            imageGalleryModal.classList.add("active");
          })
        );
      });
    }

    // lightGallery(document.getElementById("lightgallery"), {
    //   plugins: [lgThumbnail],
    //   speed: 500,
    //   zoom: true,
    //   thumbnail: true,
    //   selector: ".lightgallery-item",
    //   thumbWidth: 128,
    //   thumbHeight: "128px",
    //   // ... other settings
    // });
  },
};

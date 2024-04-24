"use strict";

const typeTextElem = document.querySelector("#typeTextElem");
const header = document.querySelector("header");
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropDownContainer = document.querySelector(".dropdown-list");
const sidebar = document.querySelector(".side-bar");
const scrollToTopButton = document.querySelector("#Btnscroll");
const headerBanner = document.querySelector(".banner");

const galleyPictures = document.querySelectorAll(".gallery-pictures");
const galleryTabPaneButtons = document.querySelectorAll(".tabpane-list-item");

const resumeTabButtons = document.querySelectorAll(".resume-tabpane-list-item");
const resumeContent = document.querySelectorAll(".resume-content");

const modal = document.getElementById("modalContainer");
const modalImg = document.getElementById("imgModal");
const galleryImages = document.getElementsByClassName("pictures");

const closeSideBarbtn = document.querySelector(".close-sidebar-btn");
const openSidebarBtn = document.querySelector("#openSidebarBtn");

let isOpenImageModal = false;
let isOpenSideBar = false;

const toggleSidebar = () => {
  isOpenSideBar = !isOpenSideBar;
  sidebar.classList.toggle("active");
};
//sidebar dropdown
const handleDropdown = () => {
  dropDownContainer.classList.toggle("active");
};
//start type writter with delay
let textArrayCounter = 0,
  textIncreaseCounter = 0,
  textDecreaseCounter = 0;
let wordCollector = "";
let isDelayInProgress = false;

const textArray = [
  "React Developer",
  "reza azarnia ",
  "Freelancer ",
  "web designer ",
];

const handleTypeWriter = () => {
  wordCollector = textArray[textArrayCounter].slice(0, ++textIncreaseCounter);
  typeTextElem.innerHTML = wordCollector;

  if (textIncreaseCounter < textArray[textArrayCounter].length) {
    setTimeout(handleTypeWriter, 500);
  } else {
    // Delay before clearing the text
    if (!isDelayInProgress) {
      isDelayInProgress = true;
      setTimeout(() => {
        isDelayInProgress = false;
        handleClearText();
      }, 1000);
    }
  }
};

const handleClearText = () => {
  wordCollector = textArray[textArrayCounter].slice(0, textIncreaseCounter);
  typeTextElem.innerHTML = wordCollector;

  if (textIncreaseCounter > 0) {
    textIncreaseCounter--;
    setTimeout(handleClearText, 100);
  } else {
    setTimeout(handleTypeWriter, 500); // Start typing the next text after 1 second
    textArrayCounter++;
  }
  if (textArrayCounter > textArray.length - 1) {
    textArrayCounter = 0;
  }
};

const closePictureModal = () => {
  isOpenImageModal = false;
  modal.previousElementSibling.classList.remove("active");
  modal.classList.remove("active");
};

//update the scroll btn visiblity
const updateScrollToTopButtonVisibility = () => {
  const isScrolledPastHeader =
    window.scrollY > +(headerBanner.clientHeight - header.clientHeight);

  scrollToTopButton.classList.toggle("active", isScrolledPastHeader);
};

//handle show sticky header
const handleStickyHeader = () => {
  header.classList.toggle("sticky", window.scrollY > 0);
};

//start tabpne handler
const handleTabpane = (tabPaneButtons, filterFunction) => {
  let activeTab = tabPaneButtons[0];
  tabPaneButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!tab.classList.contains("active")) {
        tab.classList.add("active");
        activeTab.classList.remove("active");
        activeTab = tab;
        filterFunction(activeTab);
      }
    });
  });
};

// gallery pictures filtering
const filterGalleryPictures = (activeTab) => {
  const tabName = activeTab.dataset.name;
  let isMatch = null;
  galleyPictures.forEach((item) => {
    isMatch = item.classList.contains(tabName) || tabName === "all";
    item.classList.toggle("hide", !isMatch);
    item.classList.toggle("show", isMatch);
  });
};

//start tabpane resume filtering
const filterResumeContent = (activeTab) => {
  const activeTabId = activeTab.id.split("#").join("");
  resumeContent.forEach((item) => {
    const isMatch = item.id === activeTabId ? true : null;
    item.classList.toggle("active", isMatch);
  });
};

handleTabpane(galleryTabPaneButtons, filterGalleryPictures);
handleTabpane(resumeTabButtons, filterResumeContent);
//start gallery picture modal
const showPictureModal = (picture) => {
  console.log(picture);
  modalImg.src = picture.src;
  modal.previousElementSibling.classList.add("active");
  modal.classList.add("active");
  isOpenImageModal = true;
}; //
[...galleryImages].forEach((image) =>
  image.addEventListener("click", () => showPictureModal(image))
);
window.addEventListener("load", () => {
  handleStickyHeader();
  handleTypeWriter();
});
window.addEventListener("scroll", () => {
  handleStickyHeader();
  updateScrollToTopButtonVisibility();
});

dropdownBtn.addEventListener("click", handleDropdown);
openSidebarBtn.addEventListener("click", toggleSidebar);
closeSideBarbtn.addEventListener("click", toggleSidebar);
scrollToTopButton.addEventListener("click", () => window.scroll(0, 0));

//close image modal
document.body.addEventListener("click", function (event) {
  const { target } = event;
  if (isOpenImageModal && target.nodeName !== "IMG") {
    closePictureModal();
  }
  if (
    isOpenSideBar &&
    !openSidebarBtn.contains(target) &&
    !target.closest(".side-bar")
  ) {
    toggleSidebar();
  }
});

// owl carousel parts
$(".sliderLogo").owlCarousel({
  loop: true,
  nav: true,
  autoplay: true,
  autoplayTimeout: 3000,
  margin: 15,
  responsive: {
    0: {
      items: 2,
    },
    768: {
      items: 3,
    },
  },
});
$(".row-card").owlCarousel({
  loop: false,
  nav: true,
  margin: 20,
  responsive: {
    0: {
      margin: 10,
      items: 1,
    },
    600: {
      items: 2,
    },
    1024: {
      items: 3,
    },
  },
});
$(".client-slider").owlCarousel({
  nav: true,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 4000,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
  },
});
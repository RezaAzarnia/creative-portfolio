/*side bar function*/
function openNav() {
  document.getElementById("offcanvas-pannel").style.width = "225px";
  // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("offcanvas-pannel").style.width = "0";
}

/* scrollY function*/
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

/*   dropdown container */
const dropdown = document.querySelector(".dropdown-btn");
dropdown.addEventListener("click", function () {
  const dropDownContainer = document.querySelector(".dropdown-container");
  dropDownContainer.classList.toggle("active");
});

/*   slider logo part */

$(".sliderLogo").owlCarousel({
  loop: false,
  dot: true,
  nav: true,
  margin: 20,
  responsive: {
    0: {
      margin: 10,
      items: 1,
    },
    577: {
      items: 2,
      nav: true,
      margin: 0,
    },
    768: {
      items: 3,
      nav: true,
    },
    // 1000: {
    //     items: 3,
    //     margin: 10,
    // },
  },
});
$(".row-card").owlCarousel({
  loop: false,
  nav: true,
  margin: 0,
  responsive: {
    0: {
      margin: 10,
      items: 1,
    },
    601: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
});
$(".row-slider").owlCarousel({
  loop: false,
  nav: true,
  margin: 10,
  responsive: {
    0: {
      margin: 10,
      items: 1,
    },
  },
});

/*-----------------------
    galley tab pane 
------------------------- */

const pics = document.querySelectorAll(".pic");
const tabPaneTabs = document.querySelectorAll(".tabs");
let data = "";

function findEach(item) {
  data = "";
  item.addEventListener("click", function () {
    tabPaneTabs.forEach((elem) => elem.classList.remove("active"));
    data = item.dataset.name;
    item.classList.add("active");
    matchPicture(data);
  });
}

function matchPicture(data) {
  for (let i = 0; i < pics.length; i++) {
    if (pics[i].dataset.name == data || data == "all") {
      pics[i].classList.add("show");
      pics[i].classList.remove("hide");
    } else {
      pics[i].classList.add("hide");
      pics[i].classList.remove("show");
    }
  }
}

tabPaneTabs.forEach(findEach);

//tabpane resume

var tabs = document.querySelectorAll("[data-tab-target]");
var tabContent = document.querySelectorAll("[data-tab-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    var target = document.querySelector(tab.dataset.tabTarget);
    tabContent.forEach((tabContent) => tabContent.classList.remove("active"));
    target.classList.add("active");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");
  });
});

//scroll btn
const btnScroll = document.querySelector("#Btnscroll");

btnScroll.addEventListener("click", function () {
  $("html,body").animate({ scrollTop: 0 }, "slow");
});

//picture modal
const modal = document.getElementById("modalContainer");
const modalImg = document.getElementById("imgModal");
const images = document.getElementsByClassName("pictures");
const exit = document.getElementById("exit");

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function () {
    modalImg.src = this.src;
    modal.style.display = "block";
  });
}

document.body.addEventListener("click", function (event) {
  console.log(event.target.nodeName);
  if (event.target.nodeName === "DIV") {
    modal.style.display = "none";
  }
});

function exitFunc() {
  modal.style.display = "none";
}

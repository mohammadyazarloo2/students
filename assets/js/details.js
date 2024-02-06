let day = document.querySelector(".day");
let night = document.querySelector(".night");
day.addEventListener("click", function () {
  document.body.classList.add("active");
});
night.addEventListener("click", function () {
  document.body.classList.remove("active");
});

let oldScroll = window.scrollY;
window.addEventListener("scroll", (e) => {
  if (oldScroll > window.scrollY) {
    document.querySelector("header").classList.add("fixed-header");
  } else {
    document.querySelector("header").classList.add("fixed-header-hide");
    document.querySelector("header").classList.remove("fixed-header");
  }
  if (window.scrollY === 0) {
    document.querySelector("header").classList.remove("fixed-header-hide");
    document.querySelector("header").classList.remove("fixed-header");
  }
  oldScroll = window.scrollY;
});

let btnBasket = document.querySelector(".basket-s");
let btnBasketClose = document.querySelector(".basket-content-close");

btnBasket.addEventListener("click", function (e) {
  const isClickedInsideDiv = e
    .composedPath()
    .includes(document.querySelector(".basket-s"));

  console.log(isClickedInsideDiv);
  if (isClickedInsideDiv) {
    this.classList.add("active");
    document.querySelector(".basket-sidebar").classList.add("active");
    document.querySelector("main").classList.add("basketSidebar");
  }
});

btnBasketClose.addEventListener("click", function () {
  this.classList.remove("active");
  document.querySelector(".basket-sidebar").classList.remove("active");
  document.querySelector("main").classList.remove("basketSidebar");
});

document.addEventListener("click", (e) => {
  const isClickedInsideDiv = e
    .composedPath()
    .includes(
      document.querySelector("header"),
      document.querySelector(".basket-sidebar")
    );
  const close = e
    .composedPath()
    .includes(document.querySelector(".basket-content-close"));

  if (isClickedInsideDiv == false || close == true) {
    btnBasketClose.classList.remove("active");
    document.querySelector(".basket-sidebar").classList.remove("active");
    document.querySelector("main").classList.remove("basketSidebar");
  }
});

const searchinput = document.querySelector(".search-gol");
searchinput.value = "";
searchinput.addEventListener("focus", function () {
  this.parentElement.querySelector("label").classList.add("labelmove");
});
searchinput.addEventListener("blur", function () {
  if (searchinput.value == "") {
    this.parentElement.querySelector("label").classList.remove("labelmove");
  }
});

const commentsTab = document.querySelectorAll(".tabs");
const commentsContent = document.querySelectorAll(".tabs-content");
const d = document.querySelector(".tabs");

for (let i = 0; i < commentsTab.length; i++) {
  commentsTab[i].addEventListener("click", function () {
    d.classList.remove("active-default");
    console.log(commentsTab[i].classList);

    for (let i = 0; i < commentsTab.length; i++) {
      commentsTab[i].classList.remove("active");
    }
    for (let i = 0; i < commentsContent.length; i++) {
      commentsContent[i].classList.remove("active");
    }

    commentsTab[i].classList.add("active");
    commentsContent[i].classList.add("active");
  });
}

const input = document.querySelectorAll("input");
const txtarea = document.querySelector("textarea");

txtarea.value = "";
txtarea.addEventListener("click", function () {
  this.parentElement.querySelector("label").classList.add("input-hover");
});
txtarea.addEventListener("blur", function () {
  if (txtarea.value.length == "") {
    this.parentElement.querySelector("label").classList.remove("input-hover");
  }
});

for (let i = 0; i < input.length; i++) {
  input[i].value = "";
  input[i].addEventListener("click", function () {
    this.parentElement.querySelector("label").classList.add("input-hover");
  });
  input[i].addEventListener("blur", function () {
    if (input[i].value.length == "") {
      this.parentElement.querySelector("label").classList.remove("input-hover");
    }
  });
}

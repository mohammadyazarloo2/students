// turn pages when click next or prev button
const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

pageTurnBtn.forEach((el, index) => {
  el.onclick = () => {
    const pageTurnId = el.getAttribute("data-page");
    const pageTurn = document.getElementById(pageTurnId);

    if (pageTurn.classList.contains("turn")) {
      pageTurn.classList.remove("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 - index;
      }, 500);
    } else {
      pageTurn.classList.add("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + index;
      }, 500);
    }
  };
});

// contact me button when click
const pages = document.querySelectorAll(".book-page.page-right");
const contactMeBtn = document.querySelector(".btn.contact-me");

contactMeBtn.onclick = () => {
  pages.forEach((page, index) => {
    setTimeout(() => {
      page.classList.add("turn");
      setTimeout(() => {
        page.style.zIndex = 20 + index;
      }, 500);
    }, (index + 1) * 200 + 100);
  });
};

// turn pages when click next or prev button

const images = document.querySelectorAll(".js-slider-item");

let i = 0;
let j = images.length;
console.log(j)

if (i === 0) {
  document.querySelector("#prev").classList.remove("activeArrow");
  document.querySelector("#next").classList.add("activeArrow");
} else {
  document.querySelector("#prev").classList.add("activeArrow");
  document.querySelector("#next").classList.remove("activeArrow");
}

function next() {
  console.log();
  document.getElementById("page-" + (i + 1)).classList.remove("active");
  i = (j + i + 1) % j;
  console.log(i);
  document.getElementById("page-" + (i + 1)).classList.add("active");

  document.querySelector("#prev").classList.add("activeArrow");
  document.querySelector("#next").classList.add("activeArrow");

  if (i === 0) {
    document.querySelector("#prev").classList.remove("activeArrow");
    document.querySelector("#next").classList.add("activeArrow");
  }
  if (i === j-1) {
    document.querySelector("#next").classList.remove("activeArrow");
    document.querySelector("#prev").classList.add("activeArrow");
  }
  
}

function prev() {
  document.getElementById("page-" + (i + 1)).classList.remove("active");
  i = (j + i - 1) % j;
  document.getElementById("page-" + (i + 1)).classList.add("active");
  console.log("i:", i);
  console.log("j:", j);

  document.querySelector("#prev").classList.add("activeArrow");
  document.querySelector("#next").classList.add("activeArrow");

  if (i === 0) {
    document.querySelector("#next").classList.add("activeArrow");
    document.querySelector("#prev").classList.remove("activeArrow");
  }
  if (i === j-1) {
    document.querySelector("#next").classList.add("activeArrow");
    document.querySelector("#prev").classList.remove("activeArrow");
  }
}

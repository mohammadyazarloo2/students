let day = document.querySelector(".day");
let night = document.querySelector(".night");
day.addEventListener("click", function () {
  document.querySelector('.footer-container svg path').setAttribute('fill','#f3f8ff')
  document.body.classList.add("active");
});
night.addEventListener("click", function () {
  document.querySelector('.footer-container svg path').setAttribute('fill','#040d12')
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

const input = document.querySelectorAll("input[type=text],input[type=email]");
const txtarea = document.querySelector("textarea");

if (txtarea) {
  txtarea.addEventListener("click", function () {
    this.parentElement.querySelector("label").classList.add("input-hover");
  });
  txtarea.addEventListener("blur", function () {
    if (txtarea.value.length == "") {
      this.parentElement.querySelector("label").classList.remove("input-hover");
    }
  });
}

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

let descriptionDetails = document.querySelector(".description p");

if (descriptionDetails) {
  let text = descriptionDetails.innerText;

  let limitedDiscription = descriptionDetails.innerText.substring(0, 500);

  document.querySelector(".description p").innerText = limitedDiscription;

  let showMore = document.querySelector(".content-description-showmore");
  showMore.addEventListener("click", function () {
    document.querySelector(".description p").innerText = text;
    this.classList.add("hideShort");
  });

  console.log(descriptionDetails.innerText.substring(0, 500));
}

// filters product section

let catoriesFilter=document.querySelectorAll('.right-ps-item');
let categoriesFilterMode=document.querySelectorAll('.right-ps-item-more')
for(let i=0;i<catoriesFilter.length;i++){
  

  catoriesFilter[i].addEventListener('click',function(){
    
    
    

    if(this.classList.contains('active')){
      this.querySelector('.right-ps-item-more i').setAttribute('style','transition:all 0.5s ease-in-out')
    this.querySelector('.right-ps-item-more i').setAttribute('style','transform:rotate(90deg)')
    this.classList.remove('active')

    this.querySelector('.right-ps-item-more i').classList.remove('bi-chevron-up')
    this.querySelector('.right-ps-item-list').classList.remove('show-item-list')
    }else{
      for(let j=0;j<catoriesFilter.length;j++){
        if(catoriesFilter[j].classList.contains('active')){
          catoriesFilter[j].querySelector('.right-ps-item-list').classList.remove('show-item-list')
        catoriesFilter[j].querySelector('.right-ps-item-more i').classList.remove('bi-chevron-up')
        catoriesFilter[j].classList.remove('active')
        }
      }
      this.querySelector('.right-ps-item-more i').setAttribute('style','transition:all 0.5s ease-in-out')
    this.querySelector('.right-ps-item-more i').setAttribute('style','transform:rotate(90deg)')
    this.classList.add('active')

    this.querySelector('.right-ps-item-more i').classList.add('bi-chevron-up')
    this.querySelector('.right-ps-item-list').classList.add('show-item-list')
    }
    
    
  })

  

}
let fullScreenProduct=document.querySelector('.full-screen-image')

fullScreenProduct.addEventListener('click',function(){
  console.log(this.parentElement.querySelector('img').src)
})






















// slider section
const THRESHOLD = 20;

class SwipeSlider {
  constructor(slider) {
    this.startX = 0;
    this.oldX = 0;
    this.startPosition = 0;
    this.snapPosition = 0;
    this.isDown = false;
    this.userHasSwiped = false;

    // Init
    this.cacheElements(slider);
    this.setDimensions();
    this.setIndicator();
    this.bindHandlers();
  }

  cacheElements(slider) {
    this.slider = slider;
    this.items = this.slider.querySelectorAll('.js-slider-item');
    this.indicator = slider.parentNode.querySelector('.js-slider-indicator');
    this.indicatorBar = slider.parentNode.querySelector('.js-slider-indicator-bar');
    this.arrows = slider.parentNode.querySelectorAll('.js-slider-arrow');
  }

  setDimensions() {
    const spacing = 20;
    const sliderWidth = this.slider.offsetWidth;
    const itemWidth = this.items[0].offsetWidth;
    const itemsWidth = this.items.length * itemWidth;

    this.itemWidth = itemWidth;
    this.maxAllowedW = sliderWidth < itemsWidth ? sliderWidth - itemsWidth - spacing : 0;
  }

  setIndicator() {
    if (!this.indicator) return;

    const times = (this.items.length * this.itemWidth) / this.slider.offsetWidth;
    const length = this.indicatorBar.offsetWidth / times;

    this.indicator.style.width = `${length}px`;
  }

  // Calculate

  calculateBoundaries(position, bounce = true) {
    const bounceMargin = bounce ? this.itemWidth / 4 : 0;

    if (position > bounceMargin) return bounceMargin;
    if (position < this.maxAllowedW - bounceMargin) return this.maxAllowedW - bounceMargin;

    return position;
  }

  calculateNextSnap(position, swipeNext) {
    let snapPosition = (parseInt((position / this.itemWidth), 10) - swipeNext) * this.itemWidth;

    if (snapPosition < this.maxAllowedW) snapPosition = this.maxAllowedW;
    return snapPosition;
  }

  moveIndicator(currPos) {
    if (!this.indicator) return;

    const indicatorPos = this.indicatorBar.offsetWidth - this.indicator.offsetWidth;
    const position = this.mapToRange(currPos, 0, this.maxAllowedW, 0, indicatorPos);

    this.indicator.style.left = `${position}px`;
  }

  moveSlider(position, snapPosition = null) {
    // When dragging we need 2 positions: current and snap on end
    this.snapPosition = snapPosition != null ? snapPosition : position;

    this.slider.setAttribute('style', `transform: translate3d(${position}px, 0, 0)`);
  }

  // Helpers

  mapToRange(num, inMin, inMax, outMin, outMax) {
    return ((num - inMin) * (outMax - outMin)) / ((inMax - inMin) + outMin);
  }

  toggleArrowDisable() {
    this.arrows.forEach((el) => el.classList.remove('disabled'));

    if (this.snapPosition === 0) this.arrows[0].classList.add('disabled');
    else if (this.snapPosition === this.maxAllowedW) this.arrows[1].classList.add('disabled');
  }

  // Handlers

  bindHandlers() {
    // TODO: maybe add mousedwon and touchstart listeners here. Then add inside them
    // only the relevant move / end listeners (touch or mouse), and remove them on end
    this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.slider.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.slider.addEventListener('touchend', (e) => this.handleEnd(e));

    this.slider.addEventListener('mousedown', (e) => this.handleMouseStart(e));
    this.slider.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.slider.addEventListener('mouseup', (e) => this.handleEnd(e));
    this.slider.addEventListener('mouseleave', (e) => this.handleEnd(e));

    this.slider.addEventListener('wheel', (e) => this.handleWheel(e));

    this.slider.addEventListener('click', (e) => this.handleClick(e));
    window.addEventListener('resize', () => this.handleResize());

    if (!this.arrows.length) return;

    this.arrows[0].addEventListener('click', (e) => this.handleArrowClick(e)); // left
    this.arrows[1].addEventListener('click', (e) => this.handleArrowClick(e)); // right
  }

  // Start

  handleTouchStart(e) {
    if (e.touches.length > 1) return;

    this.handleStart(e);
  }

  handleMouseStart(e) {
    e.preventDefault();

    this.handleStart(e);
  }

  handleStart(e) {
    this.isDown = true;
    this.userHasSwiped = false;
    this.startPosition = this.snapPosition;
    this.startX = (e.pageX || e.touches[0].pageX) - this.slider.offsetLeft;

    this.slider.classList.add('active');
  }

  // Move

  handleTouchMove(e) {
    if (e.touches.length > 1 || !this.isDown) return;

    this.handleMove(e);
  }

  handleMouseMove(e) {
    if (!this.isDown) return;

    e.preventDefault();
    this.handleMove(e);
  }

  handleMove(e) {
    const pageX = e.pageX || e.touches[0].pageX;
    const currX = pageX - this.slider.offsetLeft;
    const dist = currX - this.startX;

    if (Math.abs(dist) < THRESHOLD) return;

    const swipeNext = this.oldX - currX < 0 ? 0 : 1; // Swipe direction
    const accelerate = this.mapToRange(Math.abs(dist), THRESHOLD, window.innerWidth, 1, 3);
    const position = this.calculateBoundaries(this.startPosition + (dist * accelerate));

    e.preventDefault();

    this.userHasSwiped = true;
    this.oldX = currX;

    this.moveSlider(position, this.calculateNextSnap(position, swipeNext));
    this.moveIndicator(position);
  }

  // End

  handleEnd() {
    if (!this.isDown) return;

    this.isDown = false;
    this.slider.classList.remove('active');

    this.moveSlider(this.snapPosition);
    this.moveIndicator(this.snapPosition);

    if (this.arrows.length > 0) this.toggleArrowDisable();
  }

  // Other Handlers

  handleWheel(e) {
    if (Math.abs(e.deltaX) < THRESHOLD) return;

    const step = 40;
    const snapPosition = this.snapPosition + (step * Math.sign(e.deltaX));

    this.slider.classList.add('active'); // Will be removed on mouseleave
    this.moveSlider(this.calculateBoundaries(snapPosition, false));
    this.moveIndicator(snapPosition);
    this.toggleArrowDisable();
  }

  handleArrowClick(e) {
    const direction = e.target.classList.contains('left') ? 1 : -1;
    const position = this.calculateBoundaries(
      this.snapPosition + (direction * this.itemWidth), false
    );

    this.slider.classList.remove('active');
    this.moveSlider(position);
    this.moveIndicator(position);
    this.toggleArrowDisable();
  }

  handleResize() {
    this.setIndicator();
    this.setDimensions();

    if (this.maxAllowedW > this.snapPosition) {
      this.moveSlider(this.maxAllowedW);
      this.moveIndicator(this.maxAllowedW);
    }
  }

  handleClick(e) {
    if (!this.userHasSwiped) return;

    e.preventDefault(); // Disallow click while swiping
    this.userHasSwiped = false;
  }
}


const sliders = document.querySelectorAll('.slider');
sliders.forEach((slider) => { new SwipeSlider(slider) });

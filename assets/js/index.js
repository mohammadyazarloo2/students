function pageLoading() {
  setTimeout(showLoading, 0);
}
function showLoading() {
}

// make a simple slider
let nextSlide=document.querySelector('.next');
let prevSlide=document.querySelector('.prev');
nextSlide.addEventListener('click',function(){
  let items=document.querySelectorAll('.item');
  document.querySelector('.slide').appendChild(items[0])
})
prevSlide.addEventListener('click',function(){
  let items=document.querySelectorAll('.item');
  document.querySelector('.slide').prepend(items[items.length-1])
})

const wrapper = document.querySelector(".slider-wrapper");
const product = document.querySelector(".products-section");
const btnSlider=document.querySelectorAll('.slider-wrapper span');
const firstProductWidth=product.querySelector('.product').offsetWidth;
const carouselChildren=[...product.children]

let isDragging = false,startX,startScrollLeft,timeoutId;

let cardPreview=Math.round(product.offsetWidth * firstProductWidth)

carouselChildren.slice(-cardPreview).reverse().forEach(card=>{
  product.insertAdjacentHTML('afterbegin',card.outerHTML);
})
carouselChildren.slice(0,cardPreview).forEach(card=>{
  product.insertAdjacentHTML('beforeend',card.outerHTML);
})

btnSlider.forEach(btn=>{
  btn.addEventListener('click',()=>{
    product.scrollLeft+=btn.id==='left' ? -firstProductWidth : firstProductWidth;
  })
})




const dragStart = (e) => {
  isDragging = true;
  product.classList.add('dragging');
  startX=-e.pageX;
  startScrollLeft=-product.scrollLeft;
};


const dragging = (e) => {
  if (!isDragging) return;
  product.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop=(e)=>{
  isDragging = false;
  product.classList.remove('dragging');
}

const autoPlay=()=>{
  if(window.innerWidth < 800) return;
  timeoutId=setTimeout(()=> {product.scrollLeft += firstProductWidth},2500)
}

autoPlay()


const infiniteSCroll=()=>{
  if(product.scrollLeft === 0){
    product.scrollLeft=product.scrollWidth - (2*product.offsetWidth);
    product.classList.remove('no-transition');
  }else if(Math.ceil(product.scrollLeft) === product.scrollWidth - product.offsetWidth){
    product.classList.add('no-transition');
    product.scrollLeft=product.offsetWidth;
    product.classList.remove('no-transition');
  }
  clearInterval(timeoutId)
  if(!wrapper.matches(':hover')) autoPlay()
}

product.addEventListener("mousedown", dragStart);
product.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
product.addEventListener("scroll", infiniteSCroll);
wrapper.addEventListener("mouseenter", ()=>{clearInterval(timeoutId)});
wrapper.addEventListener("mouseleave", autoPlay);

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

let day = document.querySelector(".day");
let night = document.querySelector(".night");
day.addEventListener("click", function () {
  document.body.classList.add("active");
});
night.addEventListener("click", function () {
  document.body.classList.remove("active");
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

// window.scrollTo({
//     left:40,
//     top:300,
//     behavior:'smooth'
// })
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

function showVisible() {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 560) {
      for (let img of document.querySelectorAll("img")) {
        let realSrc = img.dataset.src;
        if (!realSrc) continue;

        setTimeout(function () {
          realSrc += "?nocache=" + Math.random();

          img.src = realSrc;

          img.dataset.src = "";
        }, 2000);
      }
    }
  });
}

window.addEventListener("scroll", showVisible);




//   add basket section


if (document.readyState == "ready") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let btnAddBasket = document.querySelectorAll(".btn-addbasket");
  for (let i = 0; i < btnAddBasket.length; i++) {
    var button = btnAddBasket[i];
    button.addEventListener("click", clickedBasketItem);
  }
}
function clickedBasketItem(e) {
  let button = e.target;
  let shopItems =
    button.parentElement.parentElement.parentElement.parentElement;
  let imgsrc = shopItems.querySelector(".product-img img").src;
  let name = shopItems.querySelector(".product-title").innerText;
  let price = shopItems.querySelector(".product-price").innerText;
  addBasket(imgsrc, name, price);
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  console.log(buttonClicked.parentElement.parentElement.parentElement.remove());
}

function addBasket(imgsrc, name, price) {
  let content=[]
  let divp = document.createElement("div");
  divp.classList.add("basketcart-items");
  let bsname = document.querySelectorAll(".basketcart-item-name span")
    .innerText;
  let basketItems = document.querySelectorAll(".basket-loader")[0];
  for (let i = 0; i < bsname; i++) {
    if (name == bsname[i]) {
      alert("exist");
      return;
    }
  }

  content .push(`
                    <div class="basketcart-item-img">
                        <img src="${imgsrc}" width="50" height="50">
                    </div>
                    <div class="basketcart-item-name">
                        <span> ${name} </span>
                    </div>
                    <div class="basketcart-item-price">
                        <span> ${price} </span>
                    </div>
                    <div class="basketcart-item-quantity"> <span>1</span> </div>
                    <div class="basketcart-item-remove">
                        <button class="btn-basketcart-remove">
                            <span class="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>
    `);
  divp.innerHTML = content;
  basketItems.append(divp);
  divp
    .getElementsByClassName("btn-basketcart-remove")[0]
    .addEventListener("click", removeCartItem);

    
  localStorage.setItem('basket',content);
}
let data=localStorage.getItem('basket')
console.log(data)

if(data !=''){
  
  let divp = document.createElement("div");
  divp.classList.add("basketcart-items");
  let basketItems = document.querySelectorAll(".basket-loader")[0];
  
  divp.innerHTML = data;
  basketItems.append(divp);
  divp
    .getElementsByClassName("btn-basketcart-remove")[0]
    .addEventListener("click", removeCartItem);
}
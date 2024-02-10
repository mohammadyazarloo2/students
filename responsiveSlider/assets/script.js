//get access all the images
let slideImages=document.querySelectorAll('img')

//get access the next and prev buttons
let next=document.querySelector('.next');
let prev=document.querySelector('.prev');
//access the indicator
let dots=document.querySelectorAll('.dot')

var counter=0;


slideImages.forEach(image=>{
    image.addEventListener('touchstart',()=>alert('ok'))
})

//code for the next button
next.addEventListener('click',slideNext)
function slideNext(){
    slideImages[counter].style.animation='next1 0.5s ease-in forwards';
    if(counter >= slideImages.length-1){
        counter=0
    }else{
        counter++
    }
    slideImages[counter].style.animation='next2 0.5s ease-in forwards';
    indicators()
}

// code for prev button
prev.addEventListener('click',slidePrev)
function slidePrev(){
    slideImages[counter].style.animation='prev1 0.5s ease-in forwards'
    if(counter==0){
        counter=slideImages.length-1;
    }else{
        counter--;
    }
    slideImages[counter].style.animation='prev2 0.5s ease-in forwards'
    indicators()
}


//auto scrolling

function autoSliding(){
    deltaInterval=setInterval(timer,5000);
    function timer(){
        slideNext()
        indicators()
    }
}
autoSliding()

//stop auto scrolling

const container=document.querySelector('.slider-container')
container.addEventListener('mouseover',function(){
    clearInterval(deltaInterval);
})
container.addEventListener('mouseout',autoSliding)

// add and remove active class from indicators

function indicators(){
    for(i=0;i<dots.length;i++){
        dots[i].className=dots[i].className.replace(' active','')
    }
    dots[counter].className+=' active'
}

function switchImage(currentImage){
    currentImage.classList.add('active');
    var imageId=currentImage.getAttribute('attr')
    if(imageId > counter){
        slideImages[counter].style.animation='next1 0.5s ease-in forwards'
        counter=imageId
        slideImages[counter].style.animation='next2 0.5s ease-in forwards'
    }else if(imageId==counter){
        return;
    }else{
        slideImages[counter].style.animation='prev1 0.5s ease-in forwards'
        counter=imageId
        slideImages[counter].style.animation='prev2 0.5s ease-in forwards'
    }
    indicators()
}





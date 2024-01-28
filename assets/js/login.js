const input=document.querySelectorAll('input')

for(let i=0;i<input.length;i++){
    input[i].addEventListener('click',function(){
        this.parentElement.querySelector('label').classList.add('input-hover')
    })
    input[i].addEventListener('blur',function(){
        this.parentElement.querySelector('label').classList.remove('input-hover')
    })
}
let day = document.querySelector(".day");
let night = document.querySelector(".night");
day.addEventListener("click", function () {
  document.body.classList.add("active");
});
night.addEventListener("click", function () {
  document.body.classList.remove("active");
});
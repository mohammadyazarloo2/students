// turn pages when click next or prev button
const pageTurnBtn=document.querySelectorAll('.nextprev-btn')

pageTurnBtn.forEach((el,index)=>{
    el.onclick=()=>{
        const pageTurnId=el.getAttribute('data-page')
        const pageTurn=document.getElementById(pageTurnId)

        if(pageTurn.classList.contains('turn')){
            pageTurn.classList.remove('turn')
            setTimeout(()=>{
                pageTurn.style.zIndex=20-index
            },500)
        }else{
            pageTurn.classList.add('turn')
            setTimeout(()=>{
                pageTurn.style.zIndex=20+index
            },500)
        }
    }
})

// contact me button when click
const pages=document.querySelectorAll('.book-page.page-right')
const contactMeBtn=document.querySelector('.btn.contact-me')

contactMeBtn.onclick=()=>{
    pages.forEach((page,index)=>{
        setTimeout(()=>{
            page.classList.add('turn')
            setTimeout(()=>{
                page.style.zIndex=20+index
            },500)
        },(index+1) * 200 + 100)
    })
    
}





// turn pages when click next or prev button
const pageTurnBtnMobile=document.querySelectorAll('.nextprev-btn.mobile')

pageTurnBtnMobile.forEach((el,index)=>{
    el.onclick=()=>{
        const pageTurnIdMobile=el.getAttribute('data-page')
        const pageTurnMobile=document.getElementById(pageTurnIdMobile)

        if(pageTurnMobile.classList.contains('turn')){
            pageTurnMobile.classList.remove('turn')
            pageTurnMobile.classList.remove('active')
            setTimeout(()=>{
                pageTurnMobile.style.zIndex=20-index
            },500)
        }else{
            pageTurnMobile.classList.add('turn')
            pageTurnMobile.classList.add('active')
            setTimeout(()=>{
                pageTurnMobile.style.zIndex=20+index
            },500)
        }
    }
})

// contact me button when click
const pagesMobile=document.querySelectorAll('.book-page.page-right.mobile')
const contactMeBtnMobile=document.querySelector('.btn.contact-me.mobile')

contactMeBtn.onclick=()=>{
    pagesMobile.forEach((page,index)=>{
        setTimeout(()=>{
            page.classList.add('turn')
            setTimeout(()=>{
                page.style.zIndex=20+index
            },500)
        },(index+1) * 200 + 100)
    })
    
}



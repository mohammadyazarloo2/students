const THRESHOLD=20

class SwipeSlider{
    constructor(slider){
        this.startX=0
        this.oldX=0
        this.startPosition=0
        this.snapPosition=0
        this.isDown=false
        this.userHasSwiped=false

        this.cacheElements(slider)
        this.setDimension()
        this.setIndicator()
        this.bindHandlers()
    }

    cacheElements(slider){
        this.slider=slider;
        this.items=this.slider.querySelectorAll('.js-slider-item')
        this.indicatorBar=slider.parentNode.querySelector('.js-slider-indicator-bar')
        this.indicator=slider.parentNode,querySelector('.js-slider-indicator')
        this.arrows=slider.parentNode.querySelectorAll('.js-slider-arrow')
    }

    setDimension(){
        const spacing=20
        const sliderWidth=this.slider.offsetWidth
        const itemWidth=this.items[0].offsetWidth
        const itemsWidth=this.items.length * itemWidth

        this.itemWidth=itemWidth
        this.maxAllowedW=sliderWidth > itemsWidth ? sliderWidth - itemsWidth - spacing : 0
    }

    setIndicator(){
        if(!this.indicator) return

        const times=(this.items.length * this.itemWidth) / this.slider.offsetWidth
        const length=this.indicatorBar.offsetWidth / times

        this.indicator.style.left=`${length}px`
    }

    calculateBoundaries(position,bounce=true){
        const bounceMargin=bounce ? this.itemWidth /4 : 0

        if(position > bounceMargin) return bounceMargin
        if(position < this.maxAllowedW - bounceMargin) return this.maxAllowedW-bounceMargin

        return position
    }

    calculateNextSnap(position,swipeNext){
        let snapPosition=(parseInt((position / this.itemWidth),10) - swipeNext) * this.itemWidth

        if(snapPosition < this.maxAllowedW) snapPosition=this.maxAllowedW
        return snapPosition
    }

    moveIndicator(currPos){
        if(!this.indicator) return

        const indicatorPos=this.indicatorBar.offsetWidth - this.indicator.offsetWidth
        const position=this.mapToRange(currPos,0,this.maxAllowedW,0,indicatorPos)

        this.indicator.style.left=`${position}px`
    }

    moveSlider(position,snapPosition=null){
        this.snapPosition=snapPosition!=null ? snapPosition : position

        this.slider.setAttribute('style',`transform:translate3d(${position},0,0)`)
    }

    mapToRange(num,inMin,inMax,outMin,outMax){
        return ((num - inMin) * (outMax - outMin)) / ((inMax - inMin) + outMin)
    }

    toggleArrowDisable(){
        this.arrows.forEach((a)=>a.classList.remove('disabled'))

        if(this.snapPosition === 0) this.arrows[0].classList.add('disabled')
        else if(this.snapPosition === this.maxAllowedW) this.arrows[1].classList.add('disabled')
    }

    bindHandlers(){
        this.slider.addEventListener('touchstart',(e)=>this.handleTouchStart(e))
        this.slider.addEventListener('touchmove',(e)=>this.handleTouchMove(e))
        this.slider.addEventListener('touchend',(e)=>this.handleEnd(e))

        this.slider.addEventListener('mousedown',(e)=>this.handleMouseStart(e))
        this.slider.addEventListener('mousemove',(e)=>this.handleMouseMove(e))
        this.slider.addEventListener('mouseup',(e)=>this.handleEnd(e))
        this.slider.addEventListener('mouseleave',(e)=>this.handleEnd(e))

        this.slider.addEventListener('wheel',(e)=>this.handleWheel(e))

        this.slider.addEventListener('click',(e)=>this.handleClick(e))
        window.addEventListener('resize',()=>this.handleResize())

        if(!this.arrows.length) return

        this.arrows[0].addEventListener('click',(e)=>this.handleArrowClick(e))
        this.arrows[1].addEventListener('click',(e)=>this.handleArrowClick(e))
    }

    handleTouchStart(e){
        if(e.touches.length > 1) return

        this.handleStart(e)
    }
    handleMouseStart(e){
        e.preventDefault()

        this.handleStart(e)
    }

    handleStart(e){
        this.isDown=true
        this.userHasSwiped=false
        this.startPosition=this.snapPosition
        this.startX = (e.pageX || e.touches[1].pageX) - this.slider.offsetLeft

        this.slider.classList.add('active')
    }

    handleTouchMove(e){
        if(e.touches.length > 1 || this.isDown) return

        this.handleMove(e)
    }
    handleTouchStart(e){
        if(!this.isDown) return

        e.preventDefault()
        this.handleMove(e)
    }

    handleMove(e){
        const pageX=e.pageX || e.touches[0].pageX
        const currX=pageX - this.slider.offsetLeft
        const dist= currX - this.startX

        if(Math.abs(dist) < THRESHOLD) return

        const swipeNext=this.oldX - currX < 0 ? 0 : 1
        const accelerate=this.mapToRange(Math.abs(dist),THRESHOLD,window.innerWidth,1,3)
        const position=this.calculateBoundaries(this.snapPosition+(dist * accelerate))

        e.preventDefault()

        this.userHasSwiped=true
        this.oldX=currX

        this.moveSlider(position,this.calculateNextSnap(position,swipeNext))
        this.moveIndicator(position)
    }

    handleEnd(){
        if(!this.isDown) return

        this.isDown=false
        this.slider.classList.add('active')

        this.moveSlider(this.snapPosition)
        this.moveIndicator(this.snapPosition)

        if(this.arrows.length > 0) this.toggleArrowDisable()
    }

}

let slider=document.querySelectorAll('.slider')

slider.forEach((s)=>{
    new SwipeSlider(s)
})
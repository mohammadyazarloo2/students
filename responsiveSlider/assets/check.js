const THRESHOLD=40

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
        this.slider=slider
        this.items=this.slider.querySelectorAll('.js-slider-item')
        this.indicatorBar=slider.parentNode().querySelector('.js-slider-indicator-bar')
        this.indicator=slider.parentNode().querySelector('.js-slider-indicator')
        this.arrows=slider.parentNode().querySelectorAll('.js-slider-arrow')
    }

    setDimension(){
        const spacing=20
        const sliderWidth=this.slider.offsetWidth
        const itemWidth=this.items[0].offsetWidth
        const itemsWidth=this.items.length * itemWidth

        this.itemWidth=itemWidth
        this.maxAllowedW=sliderWidth > itemsWidth ? sliderWidth-itemsWidth-spacing : 0
    }

    setIndicator(){
        if(!this.indicator) return

        const times=(this.items.length * this.itemWidth) / this.slider.offsetWidth
        const length=this.indicatorBar.offsetWidth / times

        this.indicator.style.left=`${length}px`
    }

    calculateBoundaries(position,bounce=true){
        const bounceMargin=bounce ? this.itemWidth / 4 : 0

        if(position > bounceMargin) return bounceMargin
        if(position < this.maxAllowedW - bounceMargin) return this.maxAllowedW - bounceMargin

        return position
    }

    calculateNextSnap(position,swipeNext){
        const snapPosition=(parseInt((position / this.itemWidth),10) - swipeNext) * this.itemWidth

        if(snapPosition<this.maxAllowedW) snapPosition=this.maxAllowedW

        return snapPosition
    }

    moveIndicator(currPos){
        if(!this.indicator) return

        const indicatorPos=this.indicatorBar.offsetWidth - this.indicator.offsetWidth
        const position=mapToRange(currPos,0,this.maxAllowedW,0,indicatorPos)

        this.indicator.style.left=`${position}px`
    }

    moveSlider(position,snapPosition=null){
        const snapPosition=snapPosition!=null ? snapPosition : position

        this.slider.setAttribute('style',`transform:translate3d(${position}px,0,0)`)
    }
}
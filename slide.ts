/// <reference path="typings/globals/jquery/index.d.ts"/>

class Slider{
    private $slides:JQuery;
    private $arrows:JQuery;
    private $wrapper:JQuery = $(".wrapper");
    private numberOfSlides: number;
    private currentSlide: number = 0;
    private imageUrls = "https://unsplash.it/700/500";
    constructor(numberOfSlides:number){
        this.numberOfSlides = numberOfSlides;
        this.buildArrows();
        this.buildSlides();
    }

    buildSlides(){
        var slides = "";
        for(var i = 0; i < this.numberOfSlides; i++){
            slides += `<div class="slide">
                            <img src="${this.imageUrls}?image=${i}"/>
                        </div>`;
        }
        this.$slides = $(slides);
        this.$wrapper.append(this.$slides);
        this.setCurrentSlide(0);
    }
    buildArrows(){
        var arrows = `<a class="left arrows">Prev</a><a class="right arrows">Next</a>`;
        this.$arrows = $(arrows);
        this.$wrapper.append(this.$arrows);
        this.$arrows.on("click", {context: this}, this.goToSlide);
    }
    setCurrentSlide(current:number){
        this.currentSlide = current;
        this.$slides.eq(this.currentSlide).fadeIn(500).siblings(".slide").fadeOut(500);
    }
    goToSlide(event:JQueryEventObject){
        var slider = <Slider>event.data.context;
        var direction = ($(this).hasClass("left")) ? "prev" : "next";
        if(direction === "next"){
            var currentSlide = slider.currentSlide + 1;
            if(currentSlide > slider.numberOfSlides - 1){
                currentSlide = 0;
            }
            slider.setCurrentSlide(currentSlide);
        }
        else{
            var currentSlide = slider.currentSlide - 1;
            if(currentSlide < 0){
                currentSlide = slider.numberOfSlides - 1;
            }
            slider.setCurrentSlide(currentSlide);
        }
    }
}

var slider = new Slider(10);
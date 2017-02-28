/// <reference path="typings/globals/jquery/index.d.ts"/>
var Slider = (function () {
    function Slider(numberOfSlides) {
        this.$wrapper = $(".wrapper");
        this.currentSlide = 0;
        this.imageUrls = "https://unsplash.it/700/500";
        this.numberOfSlides = numberOfSlides;
        this.buildArrows();
        this.buildSlides();
    }
    Slider.prototype.buildSlides = function () {
        var slides = "";
        for (var i = 0; i < this.numberOfSlides; i++) {
            slides += "<div class=\"slide\">\n                            <img src=\"" + this.imageUrls + "?image=" + i + "\"/>\n                        </div>";
        }
        this.$slides = $(slides);
        this.$wrapper.append(this.$slides);
        this.setCurrentSlide(0);
    };
    Slider.prototype.buildArrows = function () {
        var arrows = "<a class=\"left arrows\">Prev</a><a class=\"right arrows\">Next</a>";
        this.$arrows = $(arrows);
        this.$wrapper.append(this.$arrows);
        this.$arrows.on("click", { context: this }, this.goToSlide);
    };
    Slider.prototype.setCurrentSlide = function (current) {
        this.currentSlide = current;
        this.$slides.eq(this.currentSlide).fadeIn(500).siblings(".slide").fadeOut(500);
    };
    Slider.prototype.goToSlide = function (event) {
        var slider = event.data.context;
        var direction = ($(this).hasClass("left")) ? "prev" : "next";
        if (direction === "next") {
            var currentSlide = slider.currentSlide + 1;
            if (currentSlide > slider.numberOfSlides - 1) {
                currentSlide = 0;
            }
            slider.setCurrentSlide(currentSlide);
        }
        else {
            var currentSlide = slider.currentSlide - 1;
            if (currentSlide < 0) {
                currentSlide = slider.numberOfSlides - 1;
            }
            slider.setCurrentSlide(currentSlide);
        }
    };
    return Slider;
}());
var slider = new Slider(10);

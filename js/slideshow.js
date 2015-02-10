var SlideSpeed = 1000;
var SlideWidth = 1300;
$(document).ready(function(e) {
    var index = 0;
    var count = $('.wrapper').children().length; // set this value dynamically

    var interval = setInterval(next, 1*60*1000); // create the interval

    // move to next slide
    function next() {
        index = (index + 1) % count; //equals 1
        goto(index);
    }

    // move to previous slide
    function previous() {
        index = (index + count - 1) % count;
        goto(index);
    }

    // go to slide x
    function goto(x) {
        var margin = -(index * SlideWidth); // set offset by index + width
        $('.wrapper').stop().animate({ // stop cancels any running animations
            'margin-left': margin
        }, SlideSpeed);

    }

});

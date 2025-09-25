$(function() {
    resize();
    $(window).resize(function(){resize()});
})

function resize() {
    $('body, .wrap').css('height', window.innerHeight);
}


$(document)
.on('click', 'a', function(e) {
    if($(this).attr('href').length == 0) {
        e.preventDefault();
    }
})
.on('mousedown', 'img', function(e) {
    e.preventDefault();
})
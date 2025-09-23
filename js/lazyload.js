$(function() {
    var $scrollContainer;
    var loadImages = lazyload();
    var throttledLoad = throttle(loadImages, 500, 1000);

    function bindLazyScroll() {
        if ($scrollContainer) {
            $scrollContainer.off('scroll', throttledLoad);
        }
        $scrollContainer = (window.innerWidth <= 1024) ? $('.wrap') : $(window);
        $scrollContainer.on('scroll', throttledLoad);
        loadImages();
    }

    bindLazyScroll();
    $(window).on('resize', bindLazyScroll);

    if(window.innerWidth <= 1024) {
        $('[data-lazy-background]').each(function() {
            if(typeof $(this).data('lazy-background-m') !== 'undefined' && $(this).data('lazy-background-m') !== '') {
                $(this).data('lazy-background', $(this).data('lazy-background-m'));
            }
        })
        $('[data-lazy-img]').each(function() {
            if(typeof $(this).data('lazy-img-m') !== 'undefined' && $(this).data('lazy-img-m') !== '') {
                $(this).data('lazy-img', $(this).data('lazy-img-m'));
            }
        })
    }
});

function throttle(fn, delay, atleast) {
    var timeout = null,
        startTime = new Date();
    return function() {
        var curTime = new Date();
        clearTimeout(timeout);
        if(curTime - startTime >= atleast) {
            fn();
            startTime = curTime;
        } else {
            timeout = setTimeout(fn, delay);
        }
    }
}

function lazyload() {
    return function() {
        var seeHeight = document.documentElement.clientHeight;
        var scrollTop;

        if(window.innerWidth <= 1024) {
            scrollTop = $('.wrap').scrollTop();
        } else {
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        }

        $('[data-lazy-background]').each(function() {
            if($(this).offset().top < seeHeight + scrollTop + window.innerHeight*1.5) {
                $(this).css('background', 'url('+$(this).data('lazy-background')+')');
            }
        });
        $('[data-lazy-img]').each(function() {
            if($(this).offset().top < seeHeight + scrollTop + window.innerHeight*1.5) {
                $(this).attr('src', $(this).data('lazy-img'));
            }
        });
    }
}

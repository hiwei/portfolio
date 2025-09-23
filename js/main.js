var projectData;
$(function() {
    getProject();
})

function getProject() {
    $('.loading').show();
    var _url = 'js/project.json';            
    fetch(_url).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        projectData = data.data;

        // index
        $('.project-wrap').empty();
        for(var i=0; i<9; i++) {
            $('.project-wrap').append(`
                <a href="" data-project="${i}" data-lazy-background="${projectData[i].capture}"><p>${projectData[i].title}</p></a>
            `)
        }
        $('.loading').fadeOut();
    })
}

export function getFullProject() {
    $('.loading').show();
    $('.project-content').empty();
    for(var i=0; i<projectData.length; i++) {
        $('.project-content').append(`
            <div class="project-block">
                <a href="" data-project="${i}"></a>
                <div class="project-img"><div data-lazy-background="${projectData[i].capture}"></div></div>
                <h2>${projectData[i].title}</h2>
                <p>${projectData[i].company}</p>
            </div>
        `);
    }
    $('.loading').fadeOut();
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
.on('click', '[data-project]', function() {
    $('.loading, .lightbox').fadeIn();
    $('.lightbox').removeClass('active');
    $('.lightbox-block').scrollTop(0);

    var _index = $(this).data('project');
    if(projectData[_index].mainVideo.length > 0) {
        $('.main-video').show();
        $('.main-video video').attr('src', projectData[_index].mainVideo);
    } else {
        $('.main-video').hide();
    }
    if(projectData[_index].mainImg.length > 0) {
        $('.main-image').show();
        $('.main-image img').attr('src', projectData[_index].mainImg);
    } else {
        $('.main-image').hide();
    }
    if(projectData[_index].company.length > 0) {
        $('.lightbox-banner h3').show();
        $('.lightbox-banner h3').html(projectData[_index].company);
    } else {
        $('.lightbox-banner h3').hide();
    }
    if(projectData[_index].title.length > 0) {
        $('.content-title h4').show();
        $('.content-title h4').html(projectData[_index].title);
    } else {
        $('.content-title h4').hide();
    }
    if(projectData[_index].website.length > 0) {
        $('.content-title a').removeClass('disabled');
        $('.content-title a').attr('href', projectData[_index].website);
    } else {
        $('.content-title a').addClass('disabled');
    }
    if(projectData[_index].content.length > 0) {
        $('.article-div').show();
        $('.article-div').html(projectData[_index].content);
    } else {
        $('.article-div').hide();
    }
    if(projectData[_index].images.length > 0) {
        $('.article-img').empty();
        for(var j=0; j<projectData[_index].images.length; j++) {
            $('.article-img').append('<div><img src="'+projectData[_index].images[j]+'"></div>')
            // adjust img m size
            $('.article-img div:nth-child('+(j+1)+') img').on('load', function() {
                if(this.naturalWidth < 800) {
                    $(this).addClass('m')
                }
            })
        }
    } else {
        $('.article-img').empty();
    }
    
    
    var $imgs = $('.lightbox img').filter(function() { return $(this).attr('src'); });
    var $videos = $('.lightbox video').filter(function() { return $(this).attr('src'); });
    var _loadNum = $imgs.length + $videos.length;
    var _loaded = 0;

    function checkLoaded() {
        if (_loaded >= _loadNum) {
            $('.loading').fadeOut();
            $('.lightbox').addClass('active');
        }
    }
    // img loaded
    $imgs.each(function() {
        if (this.complete && this.naturalWidth !== 0) {
            _loaded++;
            checkLoaded();
        } else {
            $(this).on('load error', function() {
                _loaded++;
                checkLoaded();
            });
        }
    });
    // vid loaded
    $videos.each(function() {
        if (this.readyState >= 2) {
            _loaded++;
            checkLoaded();
        } else {
            $(this).on('loadeddata error', function() {
                _loaded++;
                checkLoaded();
            });
        }
    });
    checkLoaded();

})
.on('click', '.lightbox-close', function() {
    $('.lightbox').fadeOut();
})



.on('mousemove', '.kv-fix', function(e) {
    var _x = (e.offsetX - window.innerWidth*0.5) * 0.01;
    var _y = (e.offsetY - window.innerHeight*0.5) * 0.01;
    $('.pool div').css('transform', 'scale('+ (_x/_y>1?1+(_x/_y)*0.01:1) +')')
    $('.crystal img').css('transform', 'translate('+ _x +'%, '+ _y*0.75 +'%)')
    $('.head img').css('transform', 'translate('+ -_x*0.5 +'%, '+ _y +'%)')
    $('.cloud img').css('transform', 'translate('+ _x*1.5 +'%, '+ -_y*3 +'%)')
    $('.computer img').css('transform', 'translate('+ -_x*0.5 +'%, '+ _y +'%) rotate('+ (_x/_y)*0.1 +'deg)')
    $('.camera img').css('transform', 'translate('+ -_x*1.5 +'%, '+ -_y*2 +'%)')
    $('.phone img').css('transform', 'translate('+ _x*3 +'%, '+ _y*3 +'%)').css('filter', 'hue-rotate('+ (_x/_y)*2.5 +'deg)')
    $('.unicorn img').css('transform', 'translate('+ _x*1.5 +'%, '+ _y +'%) rotate('+ -_x*0.5 +'deg) scale('+ (_y>1?1+_y*0.1:1) +')')
    $('.flower img').css('transform', 'translate('+ _x*2.5 +'%, '+ -_y*3 +'%) scale('+ (_y>1?1+_y*0.1:1) +')')
    $('.doll img').css('transform', 'translate('+ -_x*2.5 +'%, '+ _y*3 +'%)')
    $('.duck img').css('transform', 'translate('+ _x*5 +'%, '+ _y*5 +'%) rotate('+ _x*1.5 +'deg)')
    $('.bag img').css('transform', 'translate('+ -_x*5 +'%, '+ _y*5 +'%) rotate('+ _x*1.5 +'deg)')
    $('.eye img').css('transform', 'translate('+ -_x*3 +'%, '+ -_y*2.5 +'%) scale('+ (_y>1?1+_y*0.05:1) +')')
    $('.teeth img').css('transform', 'translate('+ -_x*2.5 +'%, '+ _y*3 +'%) rotate('+ _x*1.5 +'deg)')
})

$(window).scroll(function() {
    var _p = $(window).scrollTop() / ($('.kv').height() - window.innerHeight)
    $('.name-1').css('gap', parseInt(_p*30*window.innerHeight*0.01))
    $('.name-2').css('gap', parseInt(_p*5*window.innerHeight*0.01))
    $('.skill').css('gap', parseInt((_p*15 - 10)*2*window.innerHeight*0.01))
    $('.pool').css('transform', 'translate('+ - _p*80 +'%, '+ ( -50 - _p*70) +'%)')
    $('.crystal').css('transform', 'translate('+ - _p*60 +'%, '+ ( -50 - _p*80) +'%)')
    $('.head').css('transform', 'translate('+ - _p*45 +'%, '+ ( -50 - _p*50) +'%) scale('+(1+_p*0.3)+')')
    $('.cloud').css('transform', 'translate('+ _p*25 +'%, '+ ( -50 - _p*70) +'%) scale('+(1+_p*0.1)+')')
    $('.computer').css('transform', 'translate('+ _p*45 +'%, '+ ( -50 - _p*70) +'%) scale('+(1+_p*0.2)+') rotate(8deg)')
    $('.camera').css('transform', 'translate('+ _p*35 +'%, '+ ( -50 - _p*120) +'%) scale('+(1+_p*0.2)+') rotate(-8deg)')
    $('.phone').css('transform', 'translate('+ - _p*5 +'%, '+ ( -50 - _p*150) +'%) scale('+(1+_p*0.2)+') rotate(-12deg)')
    $('.unicorn').css('transform', 'translate('+ _p*85 +'%, '+ ( -50 - _p*20) +'%) rotate('+ (-8 + _p*15) +'deg)')
    $('.flower').css('transform', 'translate('+ _p*50 +'%, '+ ( -50 - _p*150) +'%) scale('+(1+_p*1.25)+') rotate('+ _p*15 +'deg)')
    $('.doll').css('transform', 'translate('+ -_p*50 +'%, '+ ( -50 - _p*200) +'%) rotate('+ -_p*15 +'deg)')
    $('.duck').css('transform', 'translate('+ _p*150 +'%, '+ ( -50 - _p*200) +'%) rotate('+ _p*15 +'deg)')
    $('.bag').css('transform', 'translate('+ -_p*25 +'%, '+ ( -50 - _p*150) +'%) scale('+(1+_p*0.25)+') rotate('+ -_p*15 +'deg)')
    $('.eye').css('transform', 'translate('+ _p*150 +'%, '+ ( -50 - _p*225) +'%) rotate('+ _p*15 +'deg)')
    $('.teeth').css('transform', 'translate('+ -_p*35 +'%, '+ ( -50 - _p*150) +'%) scale('+(1+_p*0.25)+') rotate('+ -_p*15 +'deg)')
    if(_p > 0.9) {
        $('.kv-fix').addClass('hide');
    } else {
        $('.kv-fix').removeClass('hide');
    }

    if($('.banner').length > 0) {
        if($(window).scrollTop() > $('.banner').offset().top - window.innerHeight*0.5) {
            $('.banner').addClass('active')
        } else {
            $('.banner').removeClass('active')
        }
    }
})
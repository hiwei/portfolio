import { getFullProject } from './main.js';

var landingIndex = true;
$(function() {
    detectLandingLocation();
    pathChange();
    $('.buffering').hide();
})

var bufferingTime = 1000;
var clickable = true;

$(document)
.on('click', '[data-href]', function(e) {
    if(clickable) {
        clickable = false;
        e.preventDefault();
        landingIndex = false;
        history.pushState(null, '', $(this).data('href'));
        $(window).trigger('routechange');
    } else {
        return false;
    }
})
$(window).on('popstate routechange', function() {
    pathChange();
})

var detailPathArray = [
    {'name': 'projects', 'number': 1}
]
function pathChange() {
    var path = window.location.pathname;
    $('.buffering').show();
    setTimeout(function() {
        clickable = true;
        $('.buffering').hide();
    }, bufferingTime + 500)
    if(path == '/portfolio-wei/' || path == '/' || path.indexOf('index') >= 0) {
        // 首頁
        goToIndex();
        return;
    }
    let _matched = false;
    for(let i in detailPathArray) {
        if (path.indexOf(detailPathArray[i].name) >= 0) {
            goToDetailPage(detailPathArray[i])
            _matched = true;
            break;
        }
    }
    if (!_matched) {
        console.log('404')
    }
}

export function goToDetailPage(_array) {
    // 是否load過
    if($('.load-content').find('[data-load="'+_array.name+'"]').length == 0) {
        $('.load-content').append('<div data-load="'+_array.name+'"></div>');
        $('[data-load="'+_array.name+'"]').load('load/'+_array.name+'.html', function() {
            getFullProject();
        });
        
    }
    setTimeout(function() {
        $('.kv, .content, [data-load]').hide();
        setTimeout(function() {
            $('.load-content, [data-load="'+_array.name+'"]').show();
            $(window).scrollTop(0);
        }, 250)
    }, bufferingTime + 250)
}
export function goToIndex() {
    setTimeout(function() {
        $('.load-content, [data-load]').hide();
        setTimeout(function() {
            $('.kv, .content').show();
            $(window).scrollTop(0);
        }, 250)
    }, bufferingTime + 250)
}

// 偵測進入網站是否直接進分頁
export function detectLandingLocation() {
    var path = window.location.pathname;
    if(landingIndex) {
        if(path == '/portfolio-wei/' || path == '/' || path.indexOf('index') >= 0) {
        } else {
            $('.kv, .content, [data-load]').hide();
            $('.load-content, [data-load="projects"]').show();
            $(window).scrollTop(0);
            // 載入
            var _url = 'js/project.json';            
            fetch(_url).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                var projectData = data.data;
                getFullProject();
            })
        }
    }
}
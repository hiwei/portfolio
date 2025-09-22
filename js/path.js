var landingIndex = true;
$(function() {
    detectLandingLocation();
    // pathChange();
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
    }, bufferingTime)
    if(path == '/raw-test/' || path == '/' || path.indexOf('index') >= 0) {
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
        $('[data-load="'+_array.name+'"]').load(_array.name+'.html');
    }
    setTimeout(function() {
        $('.kv, .content, [data-load]').hide();
        $('.load-content, [data-load="'+_array.name+'"]').show();
    }, bufferingTime)
}
export function goToIndex() {
    setTimeout(function() {
        $('.load-content, [data-load]').hide();
        $('.kv, .content').show();
    }, bufferingTime)
}

// 偵測進入網站是否直接進分頁
export function detectLandingLocation() {
    var path = window.location.pathname;
    if(landingIndex) {
        if(path == '/raw-test/' || path == '/' || path.indexOf('index') >= 0) {
        } else {
            $('.wrap').addClass('no-transition');
            setTimeout(function() {
                $('.wrap').removeClass('no-transition');
            }, 25)
        }
    }
}
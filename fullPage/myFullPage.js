$.fn.extend({
    myFullPage: function(config) {
        var colorsArray = config.colorsArray;
        var $W = $(this);
        var $Section = $W.find('.section');
        var clientWidth = $(window).outerWidth();
        var clientHeight = $(window).outerHeight();
        var currIndex = 0;
        var lock = true;

        $commonStyle = {
            width: '100%',
            height: '100%'
        }

        $('html').add('body')
            .css({position: 'relative', margin: '0px',overflow: 'hidden'})
            .add($W).add($Section).css($commonStyle);
        $W.css({position: 'absolute',left: 0, top: 0})
            .find('.section').each(function(index, ele) {
                $(ele).css({backgroundColor: colorsArray[index], position: 'relative'})
                    .find('.slide').css({float: 'left', width: clientWidth, height: clientHeight})
                    .wrapAll('<div class="slideWrapper"></div>')
            })
        $Section.find('.slideWrapper').each(function(index, ele) {
            $(ele).css({width: $(ele).find('.slide').size() * clientWidth, height: clientHeight})
        })

        $Section.eq(0).addClass('active').end()
            .find('.slideWrapper')
                .css({position: 'absolute', left: 0, top: 0})
                .each(function(index, ele) {
                $(ele).find('.slide').eq(0).addClass('innerActive');
            })

        $(document).on('keydown', function(e) {
            if (e.which == 38 || e.which == 40) {
                var newTop = $W.offset().top;
                var direction = '';
                if (lock) {
                    lock = false;
                    if (e.which == 38 && currIndex != 0) {
                        direction = 'top';
                        config.onLeave(currIndex, direction);
                        currIndex--;
                        newTop += clientHeight;
                    } else if(e.which == 40 && currIndex != $Section.size() -1){
                        direction = 'bottom';
                        config.onLeave(currIndex, direction);
                        currIndex++;
                        newTop -= clientHeight;
                    }
                    $W.animate({
                        top: newTop
                    }, 100, 'swing', function() {
                        lock = true;
                        $Section.eq(currIndex).addClass('active');
                        if (direction == 'top') {
                            $Section.eq(currIndex + 1).removeClass('active')
                        } else {
                            $Section.eq(currIndex - 1).removeClass('active')
                        }
                        config.afterLoad(currIndex, direction);
                    })
                }
            }
            if (e.which == 37 || e.which == 39) {
                if (lock) {
                    lock = false;
                    var $SW = $('.active').find('.slideWrapper');
                    var currShowDom = $SW.find('.innerActive');
                    var newLeft = $SW.offset().left;
                    var direction = null;
                    if (e.which == 37 && currShowDom.index() != 0) {
                        newLeft += clientWidth;
                        direction = 'left';
                    } else if (e.which == 39 && currShowDom.index() != $SW.find('.slide').size() -1 ) {
                        newLeft -= clientWidth;
                        direction = 'right';
                    }
                    $SW.animate({
                        left: newLeft
                    }, 350, 'swing', function() {
                        lock = true;
                        direction != null ? currShowDom.removeClass('innerActive') : '';
                        if (direction == 'left') {
                            currShowDom.prev().addClass('innerActive')
                        } else {
                            currShowDom.next().addClass('innerActive')
                        }
                    })

                }
            }
        })
    }
})
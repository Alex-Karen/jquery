(function() {
    function jQuery(selector) {
        return new jQuery.prototype.init(selector);
    }
    jQuery.prototype.init = function (selector) {
        this.length = 0;
        if (selector == null) {
            return null;
        }
        if (typeof selector == 'string' && selector.indexOf('.') != -1) {
            var dom = document.getElementsByClassName(selector.slice(1));
        } else if(typeof selector == 'string' && selector.indexOf('#') != -1){
            var dom = document.getElementById(selector.slice(1));
        }
        if (selector instanceof Element || dom.length == undefined) {
            this[0] = dom || selector;
            this.length++;
        } else {
            for(var i = 0; i < dom.length; i++) {
                this[i] = dom[i];
                this.length++;
            }
        }
    }
    jQuery.prototype.css = function(config) {
        for (var i = 0; i < this.length; i++) {
            for (attr in config) {
                this[i].style[attr] = config[attr];
            }
        }
        return this;
    }
    jQuery.prototype.pushStack = function(dom) {
        if (dom.constructor != jQuery) {
            dom = jQuery(dom);
        }
        dom.prevObject = this; 
        return dom;
    }
    jQuery.prototype.get = function(num) {
        return num != null ? (num >= 0 ? this[num] : this[num + this.length]) : [].slice.call(this, 0);
    }
    jQuery.prototype.eq = function(num) {
        var dom = num != null ? (num >= 0 ? this[num] : this[num + this.length]) : null;
        return this.pushStack(dom);
    }
    jQuery.prototype.add = function(selector) {
        var curtObj = jQuery(selector);
        var baseObj = this;
        var newObj = jQuery();

        for(var i = 0; i < curtObj.length; i++) {
            newObj[newObj.length++] = curtObj[i];
        }
        for(var i = 0; i < baseObj.length; i++) {
            newObj[newObj.length++] = baseObj[i];
        }
        
        this.pushStack(newObj);
        return newObj;
    }
    jQuery.prototype.end = function() {
        return this.prevObject;
    }
    jQuery.prototype.myOn = function(type, handler) {
        for(var i = 0; i < this.length; i++) {
            if (!this.cacheEvent) {
                this[i].cacheEvent = {};
            }
            if (!this[i].cacheEvent) {
                this[i].cacheEvent[type] = [handle];
            } else {
                this[i].cacheEvent[type].push(handler);
            }
        }
    }
    jQuery.prototype.myTrigger = function(type) {
        var params = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
        var self = this;
        for(var i = 0; i < this.length; i++) {
            if (this[i].cacheEvent[type]) {
                this[i].cacheEvent[type].forEach(function(ele, index) {
                    ele.apply(self, params)
                })
            }
        }
    }
    jQuery.prototype.myQueue = function() {
        var queueObj = this;
        var queueName = arguments[0] || 'fx';
        var addFunc = arguments[1] || null;
        var len = arguments.length;

        if (len == 1) {
            return queueObj[0][queueName];
        }

        queueObj[0][queueName] == undefined ? queueObj[0][queueName] = [addFunc] : queueObj[0][queueName].push(addFunc);
        return this;
    }
    jQuery.prototype.myDequeue = function() {
        var self = this;
        var queueName = arguments[0] || 'fx';
        var queueArr = this.myQueue(queueName);

        var currFunc = queueArr.shift();
        if (currFunc == undefined) {
            return ;
        }
        var next = function() {
            self.myDequeue(queueName);
        }
        currFunc(next);
        return this;
    }
    jQuery.prototype.myAnimate = function(json, callback) {
        var len = this.length;
        var self = this;
        var baseFunc = function(next) {
            var times = 0;
            for (var i = 0; i < len; i++) {
                startMove(self[i], json, function() {
                    times++;
                    if (times == len) {
                        callback && callback();
                        next();
                    }
                });
            }
        }

        this.myQueue('fx', baseFunc);
        if (this.myQueue('fx').length == 1) {
            this.myDequeue('fx');
        }

        function getStyle (dom, attr) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom, null)[attr];
            }else {
                return dom.currentStyle[attr];
            }
        }

        function startMove (dom, attrObj, callback) {
            clearInterval(dom.timer);
            var iSpeed = null, iCur = null;
            dom.timer = setInterval(function () {
                var bStop = true;
                for (var attr in attrObj) {
                    // 'width' 'height' 
                    if (attr == 'opacity') {
                        iCur = parseFloat( getStyle(dom, attr) ) * 100;
                    }else {
                        iCur = parseInt( getStyle(dom, attr) );
                    }
                    iSpeed = (attrObj[attr] - iCur) / 7;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    if (attr == 'opacity') {
                       dom.style.opacity = (iCur + iSpeed) / 100; 
                    }else {
                       dom.style[attr] = iCur + iSpeed + 'px';
                    }
                    if (iCur != attrObj[attr]) {
                        bStop = false;
                    }
                }
                if (bStop) {
                    clearInterval(dom.timer);
                    typeof callback == 'function' && callback();
                }
            }, 30);
        }
        return this;
    }
    jQuery.prototype.myDelay = function(duration) {
        var queueArr = this[0]['fx'];
        queueArr.push(function(next) {
            setTimeout(function() {
                next();
            }, duration);
        });
        return this;
    }

    jQuery.prototype.init.prototype = jQuery.prototype;
    // window.$ = window.jQuery = jQuery;
})();
// $('.demo').css({width:'100px',height: '100px', backgroundColor: 'red'})
// $('.demo').get(0);
// $('.demo').eq(0);
// $('.wrapper ul').find('li')
// $('.wrapper ul li').filter(function(index, ele) {
//     return index % 2 == 0;
// })
// $('.wrapper ul').find('li').is('.demo')
// $('.wrapper').add('.demo').css({width:'100px', height: '100px',backgoroundColor: 'red'});
// $('.wrapper').find('ul').css().end();

// $('.demo').eq(0).addClass('active');
// $('.demo').removeClass(function(index, ele) {
//     if (index % 2 ==0) {
//         return 'demo'
//     }
//     return ''
// })

// var shopArr = [
//     {name: 'a', age: 18, class: 1}, 
//     {name: 'b', age: 19, class: 2},
//     {name: 'c', age: 20, class: 3}
// ];
// var oTb = $('.stb')
// shopArr.forEach(function(ele, index) {
//     var cloneDom = $('.tpl').clone().removeClass('tpl');
//     cloneDom.find('td').eq(0).text(ele.name).next().text(ele.age).next().text(ele.class)
//     cloneDom.appendTo($('.stb'))
// })
// $('.demo').on('click','', {name: 'aaa'}, function(e) {
//     console.log(e.data.name)
// })

// $('.demo').on('fullPage', function() {
//     console.log(1)
// })
// $('.demo').trigger('fullPage')
// $('.demo').on('mouseenter', function() {
//     console.log(1)
// }).on('mouseleave', function() {
//     console.log(2)
// })

// $('.demo').hover(function() {
//     console.log('enter')
// }, function() {
//     console.log('leave')
// })

// $('li').each(function(index, ele) {
//     $(ele).text(index).addClass('tpl');
// })

// $('p').children().each(function(index, ele) {
//     console.log(ele)
// })

// $('ul').on('click', function(e) {
//     console.log($(e.target).index());
// })
//undefined string number boolean array object function  typeof return value
// $.type(undefined)
// $.type([])
// $.type(function() {})

// var list = {
//     init: function() {
//         this.ms = 123;
//         this.dom = document.getElementById('demo');
//         this.bindEvent();
//     },
//     bindEvent: function() {
//         this.dom.onclick = $.proxy(this.show, this);
//     },
//     show: function() {
//         console.log(this.produseMs(this.ms));
//     },
//     produseMs: function(ms) {
//         return ms + 234;
//     }
// }
// list.init();

// var arr = [1, 2, 3, 4]
// $.each(arr, function(index, ele) {
//     console.log(index + '---' + ele);
// });
// var arr1 = $.map(arr, function(index, ele) {
//     return ele * index
// })

// $.parseJson();  //JSON.parse(); 

$.makeArray('d', arr) //1传一个类数组，转成数组 2两个参数，第一个参数push到第二个数组中
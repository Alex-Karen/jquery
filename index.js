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
    jQuery.myCallbacks = function() {
        var options = arguments[0] || '';
        var list = [];
        var fired = false;
        var fireIndex = 0;
        var fires = function() {
            for(; fireIndex < list.length; fireIndex++) {
                list[fireIndex].apply(window, args);
            }
            if (options.indexOf('once') != -1) {
                list = [];
                fireIndex = 0;
            }
        }
        return {
            add: function(func) {
                list.push(func)
                if (options.indexOf('memery') != -1 && fired) {
                    fire();
                }
                return this;
            },
            fire: function() {
                fireIndex = 0;
                args = arguments;
                fired = true;
                fier();
            }
        }
    }
    jQuery.myDeferred = function() {
        var arr = [
            [jQuery.myCallbacks('once memery'), 'done', 'resolve'],
            [jQuery.myCallbacks('once memery'), 'fail', 'reject'],
            [jQuery.myCallbacks('memery'), 'progress', 'notify'],
        ]
        var pendding = true;
        var deferred = {}
        for (var i = 0; i < arr.length; i++) {
            arr[i][1] = (function(index) {
                return function(func) {
                    arr[index][0].add(func);
                }
            })(i)

            arr[i][2] = (function(index) {
                return function() {
                    var args= arguments;
                    if(pendding) {
                        arr[index][0].fire.apply(window, args);
                        arr[index][2] != notify ? pendding = false : '';
                    }
                }
            })(i)
        }

        return deferred;
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

// $.makeArray('d', arr) //1传一个类数组，转成数组 2两个参数，第一个参数push到第二个数组中

//随机数
// $.extend({
//     definedMandom(start, final) {
//         var len = final - start;
//         return Math.random() * len + start
//     },
//     abc() {
//         console.log('abc')
//     }
// })
//拖拽
// $.fn.extend({
//     drag() {
//         var disX,
//             disY,
//             self = this;
//         $(this).on('mousedown', function(e) {
//             disX = e.pageX - $(this).offset().left;
//             disY = e.pageY - $(this).offset().top;

//             $(document).on('mousemove', function(e) {
//                 $(self).css({left: e.pageX - disX, top: e.pageY - disY})
//             })
//             $(document).on('mouseup', function(e) {
//                 $(document).off('mousemove').off('mouseup')
//             })
//         })
//         return this;
//     }
// });
// $('#demo').drag()

// 浅层克隆
// 第二个对象(及后面的所有对象) 克隆到第一个对象中 覆盖 引用值共同一个
// var obj1 = {
//         lastName: 'a',
//         age: 12
//     },
//     obj2 = {
//         lastName: 'b',
//         age: 15,
//         smoke: true
//     },
//     obj3 = {
//         lastName: 'c',
//         furtune: 100
//     };
// $.extend(obj1, obj2)

//深层克隆 引用值独立

// $.extend(true, obj1, obj2);

// $.ajax({
//     url: 'https://localhost:7443/',
//     type: 'post',
//     data: {},
//     dataType: 'JSON',
//     async: false,//同步
//     success: function(data) {
//         $.each(data, function(index, ele) {
//             console.log(ele)
//         })
//     },
//     error: function(e) {
//         console.log(e.status, e.statusText)
//     },
//     complete: function() {
//         //容错处理
//         console.log('成功或错误后执行')
//     },
//     context: $('#demo'),         //改变执行上下文this
//     timeout: 3000
// })

// var cb = $.Callbacks(); // once memery

// cb.add();

// cb.fire();

// var df = $.Deferred(); // done成功  fail失败 progress正在进行

// function getSorce() {
//     var df = $.Deferred();
//     setInterval(function() {
//         var sorce = Math.random() * 100;
//         if (sorce > 60) {
//             df.resolve('success')
//         } else if (sorce < 40) {
//             df.reject('fail');
//         } else {
//             df.notify('progress');
//         }
//     }, 1500);
//     return df.promise();
// }
// var df = getSorce();
// df.done(function(msg) {
//     console.log(msg)
// })
// df.fail(function(msg) {
//     console.log(msg)
// })
// df.progress(function(msg) {
//     console.log(msg)
// })

// (function() {
//     $.ajax({
//         url: '',
//         type: 'post'
//     })
// })().then(function(res) {
//     return $.ajax({
//         url: '',
//         type: 'post'
//     })
// }).then(function(res) {
//     console.log(res)
// })

$.when(df1, df2, df3).then(function() {

}, function() {
    
})
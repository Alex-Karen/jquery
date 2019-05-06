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
var shopArr = [
    {name: 'a', age: 18, class: 1}, 
    {name: 'b', age: 19, class: 2},
    {name: 'c', age: 20, class: 3}
];
var oTb = $('.stb')
shopArr.forEach(function(ele, index) {
    var cloneDom = $('.tpl').clone().removeClass('tpl');
    cloneDom.find('td').eq(0).text(ele.name).next().text(ele.age).next().text(ele.class)
    cloneDom.appendTo($('.stb'))
})

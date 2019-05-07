# jQuery学习

jQuery精髓：选择元素    循环操作    链式调用

## 选择器

    css selector

    jquery unique selector

    null、undefined、dom

    $(function(){}) $(document).ready(function())

## DOM

$('.class').get()  //获得由选择器指定的 DOM 元素

$('.class').eq()   //将匹配元素集缩减值指定 index 上的一个

$('.class').find()  //获得当前元素集合中每个元素的后代,通过选择器、jQuery 对象或元素来筛选 向下查找

$('.class').find('li').filter('.demo')  //将匹配元素集合缩减为匹配指定选择器的元素

$('.class').find('li').not('.demo')  //从匹配元素集合中删除元素  filter反选

$('.li').has('ul').css()    //将匹配元素集合缩减为包含特定元素的后代的集合。 含有ul的li

$('.wrapper').is('span')    //根据选择器检查当前匹配元素集合，如果存在至少一个匹配元素，则返回 true。

$('.wrapper').add('ul')   //将元素添加到匹配元素的集合中

$('.wrapper').end()   //结束当前链条中的最近的筛选操作，并将匹配元素集还原为之前的状态

## 赋值取值方法

.html() 返回或设置被选元素的内容 (inner HTML)

.text() 设置或返回被选元素的文本内容

.size() 返回被 jQuery 选择器匹配的元素的数量 $().lenght

.addClass() 向被选元素添加一个或多个类

.removeClass()  从被选元素移除一个或多个类

.hasClass() 检查被选元素是否包含指定的 class

.css()  设置或返回被选元素的一个或多个样式属性

.attr() 设置或返回被选元素的属性值 基于setAttribute getAttribute

.prop() 特性映射 非特性不能映射 js dom {}

    尽量避免直接添加行间样式，因为其权重过高 ，这样不利于响应式设计，破坏了c3+h5优雅的解决方案

    attr和prop的区别：jQuery认为：attribute的checked、selected、disabled就是表示该属性初始状态的值，

    property的checked、selected、disabled才表示该属性实时状态的值(值为true或false)

.val()

## DOM操作 增删改查

.next() 获得匹配元素集合中每个元素紧邻的同辈元素

.prev() 获得匹配元素集合中每个元素紧邻的前一个同胞元素，通过选择器进行筛选是可选的

.prevAll()   获得匹配元素集合中每个元素之前的所有同辈元素，由选择器进行筛选（可选）

.nextAll()  获得匹配元素集合中每个元素之后的所有同辈元素，由选择器进行筛选（可选）

.prevUntil('h1', $('input[type="checkbox"]))   获得每个元素之前所有的同辈元素，直到遇到匹配选择器的元素为止

.nextUntil()    获得每个元素之后所有的同辈元素，直到遇到匹配选择器的元素为止

.siblings() 获得匹配元素集合中所有元素的同辈元素，由选择器筛选（可选）

.parent()   获得当前匹配元素集合中每个元素的父元素，由选择器筛选（可选）

.parents()  获得当前匹配元素集合中每个元素的祖先元素，由选择器筛选（可选）

.offsetParent() 获得用于定位的第一个父元素

.closest()  从元素本身开始，逐级向上级元素匹配，并返回最先匹配的祖先元素

.slice()    将匹配元素集合缩减为指定范围的子集

.insertAfter()  把匹配的元素插入到另一个指定的元素集合的后面

.after()    在匹配的元素之后插入内容

.insertBefore() 把匹配的元素插入到另一个指定的元素集合的前面

.before()   在每个匹配的元素之前插入内容

.appendTo() 向目标结尾插入匹配元素集合中的每个元素

.append()   向匹配元素集合中的每个元素结尾插入由参数指定的内容

.prependTo()    向目标开头插入匹配元素集合中的每个元素

.prepend()  向匹配元素集合中的每个元素开头插入由参数指定的内容

.remove()   移除所有匹配的元素

.detach()   从 DOM 中移除匹配元素集合   保留所有绑定的事件、附加的数据，这一点与 remove() 不同

## 对象增删改查

.wrap() 把匹配的元素用指定的内容或元素包裹起来

.wrapInner()    将每一个匹配的元素的子内容用指定的内容或元素包裹起来

.wrapAll()  把所有匹配的元素用指定的内容或元素包裹起来

.unWrap()   移除并替换指定元素的父元素

.clone()    创建匹配元素集合的副本

.data()     DOM 中存取数据

## 事件

.on()   向元素添加事件处理程序

.one()  向被选元素添加一个或多个事件处理程序。该处理程序只能被每个元素触发一次

.off() 移除通过 on() 方法添加的事件处理程序

.trigger()  触发被选元素的指定事件类型

.hover() 当鼠标指针悬停在被选元素上时要运行的两个函数。该方法触发 mouseenter 和 mouseleave 事件

兼容的事件对象：

    e.pageX、e.clienX、e.which、e.button

    e.preventDefault()

    e.stopPropagation()

    return false

## 实例方法-动画

.hide()、.show()、.toggle() 参数：null 或 （duration, easing, callblack）

.fadeIn、.fadeout 、.fadeToggle、.fadeTo()  参数：null或 （duration, [opacity], easing, callblack）

.slideDown()、.slideUp()、.slideToggle()    参数：null或 （duration, [opacity], easing, callblack）

.animate()  参数：(target duration easing callback）

.stop() .finish()   参数：true false

.delay()

jQuery.fx.off = true 运动的开关
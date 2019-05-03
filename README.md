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

.addClass()

.removeClass()

.hasClass()

.css()

.attr()

.prop()

    尽量避免直接添加行间样式，因为其权重过高 ，这样不利于响应式设计，破坏了c3+h5优雅的解决方案

    attr和prop的区别：jQuery认为：attribute的checked、selected、disabled就是表示该属性初始状态的值，

    property的checked、selected、disabled才表示该属性实时状态的值(值为true或false)

.val()
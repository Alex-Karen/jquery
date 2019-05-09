var data = [
    {title: 'aaaaa', search: '444765', hisSearch: '343431'},
    {title: 'bbbbb', search: '4447', hisSearch: '343431'},
    {title: 'ccccc', search: '44471', hisSearch: '34331'},
    {title: 'ddddd', search: '444765', hisSearch: '343431'},
    {title: 'eeeee', search: '444765', hisSearch: '34331'},
    {title: 'fffff', search: '444765', hisSearch: '343451'},
    {title: 'ggggg', search: '444765', hisSearch: '12345'},
    {title: 'hhhhh', search: '444765', hisSearch: '343231'},
    {title: 'iiiii', search: '444765', hisSearch: '343431'},
    {title: 'jjjjj', search: '448765', hisSearch: '343431'},
    {title: 'kkkkk', search: '44765', hisSearch: '34331'},
    {title: 'lllll', search: '44965', hisSearch: '343431'},
    {title: 'mmmmm', search: '444765', hisSearch: '70765'},
    {title: 'nnnnn', search: '444765', hisSearch: '343431'},
    {title: 'ooooo', search: '444765', hisSearch: '343431'},
    {title: 'ppppp', search: '44475', hisSearch: '343431'},
    {title: 'qqqqq', search: '444765', hisSearch: '343431'},
    {title: 'rrrrr', search: '444765', hisSearch: '343431'},
    {title: 'sssss', search: '444765', hisSearch: '343431'},
    {title: 'ttttt', search: '44765', hisSearch: '343431'},
    {title: 'uuuuu', search: '43765', hisSearch: '343431'},
];
(function(data) {
    //初始化变量
    var $Wrapper = $('.wrapper');
    var $ShowSection = $Wrapper.find('.showSection');
    var colorsArray = ['#f54545', '#ff8547', '#ffac38'];
    var curPage = 0;
    var totalPage = Math.ceil(data.length / 10);

    $ShowSection.hide();
    function bindEvent() {
        $Wrapper.find('.change').on('click', function() {
            curPage =  ++curPage % totalPage;
            renderPage(data);
        })
    }
    function renderPage(data) {
        //渲染数据
        $ShowSection.hide().find('.showItem').remove();
        var len = (data.length - curPage * 10) >= 10 ? 10 : data.length - curPage * 10;
        for (var i = 0; i < len; i++) {
            var $Clone = $Wrapper.find('.tpl').clone().removeClass('tpl').addClass('showItem');
            var ele = data[i + curPage * 10];
            $Clone.children('span').eq(0)
                .text(i + curPage * 10 + 1).css('backgroundColor', curPage == 0 && colorsArray[i + curPage])
                .next().text(ele.title)
                .next().text(ele.search).addClass(ele.search > ele.hisSearch ? 'up' : 'down');
            $ShowSection.append($Clone);
        }
        $ShowSection.fadeIn();
    }
    bindEvent();
    renderPage(data);
})(data);
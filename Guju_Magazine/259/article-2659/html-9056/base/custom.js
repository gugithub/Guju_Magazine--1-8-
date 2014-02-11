$(document).ready(function () {
    var $labelNavLi = $("#labelNav>li"),
        $labelprompt=$("#labelprompt"),
        $labelBox = $("#labelBox"),
        $labelConLi = $("#labelCon>li"),
        $view = $('#view');

    $labelNavLi.each(function(e,i){
    	$(e).tap(function(){
            $("#labelprompt").hide();
    		if($(e).hasClass("current")){
                if(!$labelBox.hasClass("show"))  {
                    $labelBox.addClass("show");
                    
                }else{
                    $labelBox.removeClass("show");

                }
    		}else{
                $(e).addClass("current").siblings().removeClass("current");
                $($labelConLi.dom[i]).addClass("current").siblings().removeClass("current");
                if(!$labelBox.hasClass("show")){
                    $labelBox.addClass("show");
                }
            }  
            
        });

    });
    $labelBox.tap(function(){
    	$labelBox.removeClass("show");
    });

    var bgScroll1;
    bgScroll1 = new bgScroll({
        beforeLeft: -308, //自动滚动之前的坐标
        startLeft: -308, //自动滚动后的坐标
        autoTime: 0, //当前页面滚动的时间 0为不自动滚动
        start: function () {
            $('#scroll').hide();
            $('#showBigImg').hide();
        }, //进入全屏大图时候函数
         end: function () {
            $('#scroll').show();
            $('#showBigImg').show();
         } //退出全屏大图时候函数
    });
});
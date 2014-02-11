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
});
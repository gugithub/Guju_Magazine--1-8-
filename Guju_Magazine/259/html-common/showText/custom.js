/*    custom page logic      
 */

$(document).ready(function () {

	
	
    // -------------------- variable --------------------
    var $button=$(".showBtn .button");
	
    $button.tap(function(){
		$("#public_prompt").hide();
        var $parent=$($(this).get(0).parentNode);
		$(this).find("span").css("-webkit-animation","3s")
	    $parent.toggle("show");  
	})
	
	$("#showFront_btn").bind("touchstart",function(){
	    $("#showFront_prompt").hide();
		$("#front").toggle("show"); 
	})





});
/*    custom page logic      
 */

$(document).ready(function () {

     var width=window.innerWidth;
    // -------------------- variable --------------------
	$("#view").css("width",width+"px");
	
	
	
    var $button = $("#button"),
        $scroll = $("#scroller"),
		$bg = $("#bg"),
        $prompt = $(".prompt"),
		$centent=$("#centent"),
        $front = $("#front"),
        maxScroll = width - $scroll.width(),
		ma = new WebKitCSSMatrix(window.getComputedStyle($scroll.get(0)).webkitTransform);
        starX= x = ma.e;
		 $prompt.css("width",width+"px");
		 $front.css("width",width+"px");
		

    // -------------------- param --------------------

    //--------------------- DOM----------------
    // -------------------- extend --------------------
    // -------------------- custom function -------------------
	 function transform(x) {

         if(x<0&&x>maxScroll)  
		 {     
		$scroll.css({ "-webkit-transform": "translate3d(" + x + "px,0,0)", "-webkit-transition": "-webkit-transform 0",})
		 }
    }
	function transformEnd() {
		 $scroll.css({ "-webkit-transform": "translate3d(" + starX + "px,0,0)","-webkit-transition": "-webkit-transform 0.5s" })

    }




    // -------------------- event --------------------
    $button.tap(function () {
		$("#round_button").hide();
		$("#text").hide();
		$scroll.addClass("show")
		$("#public_prompt").hide();
		console.log("tap")
        $button.hide();
		$bg.show();
		$centent.addClass("show");
		

    });
	
	var touch={},t;
	 $bg.bind("touchstart",function(e){
		 	ma = new WebKitCSSMatrix(window.getComputedStyle($scroll.get(0)).webkitTransform);
            x = ma.e;
		    t=setTimeout(function(){$prompt.addClass("show");},150)
			touch.start = Date.now()
            touch.x1 = e.touches[0].pageX;
			$centent.removeClass("show");
	
	       
	   }).bind("touchmove",function(e){
		   	e.preventDefault();
			e.stopPropagation();
	        touch.x2 = e.touches[0].pageX;
			transform(x+(touch.x2-touch.x1));
			touch.start = -1;
			
	   }).bind("touchend",function(e){
		    clearTimeout(t);
			
			if(touch.start>0&&(Date.now()-touch.start<=150))
			{
            $button.show();
			$("#round_button").show();
		    $("#text").show();
			t2=setTimeout(function(){$scroll.removeClass("show");},500)
		    $bg.hide();
		    $prompt.removeClass("show");
			transformEnd();
			}
			else{
		    $prompt.removeClass("show");  
			}
	  });
	  
	  
	$("#round_button").tap(function(){
		console.lot("11")
	    $("#text").addClass("show");
	});
	$("#text").tap(function(){
	    $(this).removeClass("show").addClass("out");
	});



});
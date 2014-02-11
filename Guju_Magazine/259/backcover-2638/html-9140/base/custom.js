/*    custom page logic      
 */
$(document).ready(function () {
    // -------------------- variable --------------------
       var $navLi = $("#nav li"),
        $nav = $("#nav"),
        $navWrap = $("#navWrap"),
        $content = $("#content"),
        $post = $content.find(".post img"),
		current=0,
		start=false,
		t;
		

    // -------------------- init -------------------- 

    //$("link.animation").each(function(a_e){$(a_e).attr("href",$(a_e).attr("data-href"));});
    if (Magazine._debug) {

    } else {
        Magazine.addEvent(1, function () {
             if(!start){
				 auto();
				 start=true;
				 
			}
            //Magazine.replaceImageIn();
            //alert("pageIn")
        })
        Magazine.addEvent(0, function () {
			if(start){
				clearInterval(t);
				 start=false;
				 
			}

        })
    }



        // -------------------- param --------------------
        //--------------------- DOM----------------

    function auto(){
	    t=setInterval(function(){
		   if(current>=4)
		   {
			   var i=0;
		   }else{
		  var i=current+1;
		  }
		   goto(i) ;     
		},3000)

	}

    // -------------------- extend --------------------
    // -------------------- custom function --------------------
    function goto(i) {
		    current=i;
			$("#nav li:nth-child("+ (i+1) +")").addClass("current").siblings().removeClass("current");
			$nav.attr("class","current"+(i+1));
            var $come = $content.find(".come"),
                $out = $content.find(".out");
            var img = new Image();
            //img.src = "../html-"+ imgSrc +"/"+(i+1)+".jpg";	
            img.src = "images/" + (i + 1) + ".jpg";
            img.onload = function () {
                $come.attr("class", "out");
                //$out.attr("class","come").find("img").attr("src","../html-"+ imgSrc +"/"+(i+1)+".jpg");
                $out.attr("class", "come").find("img").attr("src", "images/" + (i + 1) + ".jpg");
                setTimeout(function () {
                    //$post.attr("src","../html-"+ imgSrc +"/"+(i+1)+".jpg");
                    $post.attr("src", "images/" + (i + 1) + ".jpg");

                }, 500)
            }


    }
    // -------------------- event --------------------
    $navLi.each(function (e, i) {

        $(e).tap(function () {
            if ($(this).hasClass("current")) return false;
		   clearInterval(t);
           goto(i);



        })

    });

   $('#app').tap(function(){
       window.location.href="openapps:http://www.pchouse.com.cn/app/34/349331.html";
   });
});
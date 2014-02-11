(function(){
	
	function focusPicture(options){
	    var that=this;
		that.options = {
		    navId:"focusPicture_nav",
		    contentId:"focusPicture_content",
		    promptId:"showFront_prompt",
			maximum:4,
		    navClass:["b","b","b","w"],
		    start: function () {},
		    end: function () {}
	    };
		
	that.start = that.options.start;
	delete that.options.start;
	
	that.end = that.options.end;
	delete that.options.end;
	
	var  navEl=document.getElementById(that.options.navId)
	for(i=2;i<=that.options.maximum;i++)
	{ 
	   var newelementNav = document.createElement("li");
	   newelementNav.innerHTML="<span>"+i+"</span>";
       navEl.appendChild(newelementNav);
	}
	that.$nav=$("#"+that.options.navId);
	that.$navLi=$("#"+that.options.navId+" li");
	that.$conten=$("#"+that.options.contentId);
	that.$post=$("#"+that.options.contentId+" .post");
	

	that.$navLi.each(function(e,i){	

		$(e).tap(function(){

			if($(this).hasClass("current")) return false;
			that.$nav.prev().hide();
			that.start();
			$(this).addClass("current").siblings().removeClass("current");
			 var $come=that.$conten.find(".come"),
			     $out=that.$conten.find(".out");
				 
			 var img1= new Image();
             //img.src = "../html-"+ imgSrc +"/"+(i+1)+".jpg";	
			 img1.src = "images/"+(i+1)+"-1.jpg";
			 img1.onload = function () {
		
			 var img2= new Image();
             //img.src = "../html-"+ imgSrc +"/"+(i+1)+".jpg";	
			 img2.src = "images/"+(i+1)+"-2.jpg";	
	         img2.onload = function () {
				 that.$nav.attr("class",that.options.navClass[i]);
				 console.log("11")
			    $come.attr("class","out");
				//$out.attr("class","come").find("img").attr("src","../html-"+ imgSrc +"/"+(i+1)+".jpg");
				$out.attr("class","come").find(".topImg").attr("src","images/"+(i+1)+"-1.jpg");
				$out.attr("class","come").find(".bottomImg").attr("src","images/"+(i+1)+"-2.jpg");
				setTimeout(function(){
					that.$post.find(".topImg").attr("src","images/"+(i+1)+"-1.jpg");
				    that.$post.find(".bottomImg").attr("src","images/"+(i+1)+"-2.jpg");
					that.end();
				},500)
			 }
				
				     
		
			}
		    
		})
	
	})
	
 
 
 
	}
	
	window.focusPicture = focusPicture;
})()

$(document).ready(function () {
	//-------------获取图片文件------------
	//var imgSrc = Magazine.parseAppMsg("img"); 
	// -------------------- init -------------------- 

//$("link.animation").each(function(a_e){$(a_e).attr("href",$(a_e).attr("data-href"));});
	if(Magazine._debug ){
		$("link.animation").each(function(a_e){$(a_e).attr("href",$(a_e).attr("data-href"));});
	}else{
		Magazine.addEvent(1,function(){
			$("link.animation").each(function(a_e){$(a_e).attr("href",$(a_e).attr("data-href"));});
			//Magazine.replaceImageIn();
			//alert("pageIn")
		})
		Magazine.addEvent(0,function(){
			$("link.animation").each(function(a_e){$(a_e).attr("href","");});
			//alert("pageOut")
		})
	}

    // -------------------- variable --------------------
    var $navLi = $("#nav li"),
	    $nav = $("#nav"),
		$navWrap = $("#navWrap"),
        $content = $("#content"),
		$post=$content.find(".post img")
        color=""

    // -------------------- param --------------------
    //--------------------- DOM----------------
	var img=new Image();
	    img.src="images/1.jpg";
		 img.onload = function () {
		    $("#view").css({"width":img.width+"px","height":img.height+"px"});
			$("#content li").css({"width":img.width+"px","height":img.height+"px"});
			$navWrap.css("left",(img.width-($navWrap.width()+140))/2+"px")
		}
		
		
	
    // -------------------- extend --------------------

    // -------------------- custom function --------------------

    // -------------------- event --------------------






});
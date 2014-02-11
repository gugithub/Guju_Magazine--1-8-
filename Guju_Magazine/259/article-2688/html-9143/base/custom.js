
$(document).ready(function(){
	
	//-------------- your code ------------------
	 var AD = initAD("http://ivy.pchouse.com.cn/adpuba/show?adid=263397&id=pchouse.ipad.fm2.cygg.&media=js",
   	//var AD = initAD("http://ivy.pconline.com.cn/adpuba/show?adid=278239&id=pc.test.click.&media=js", //test
				{vc:"",
				 cc:""
				});
	AD.sendEvent("vc","");





    var  start=false;
	var  pull=false;
	var cur=1,$bgLi=$("#ImgList>li"),$sbgLi=$("#sImgList>li"),$textLi=$("#textList>li"),t;
    // animationStart();
	
	if(Magazine._debug ){

	}else{
		Magazine.addEvent(1,function(){
			//$("link#animation").each(function(a_e){$(a_e).attr("href",$(a_e).attr("data-href"));});
			 if(!start)
			 {
	         
			  start=true;
			  animationStart();
			 }
		})
		Magazine.addEvent(0,function(){
			 if(start)
			 {
			  start=false;
			  animationEnd();
			 }
	
		})
	}
   //-----------animation function------------//

  
   function animationStart(){
$("#ImgList").removeClass("hide")
 t=setInterval(function(){
    $($bgLi.dom[cur]).addClass("show").siblings().removeClass("show");   
    cur++
    if(cur==4) 
    	{cur=1
          clearInterval(t);
          $("#ImgList").addClass("hide")
          stantsmall()
    	}
 },1000)
   }
   
   function animationEnd(){


   }
   
  function stantsmall(){
 t=setInterval(function(){
    $($sbgLi.dom[cur]).addClass("show").siblings().removeClass("show");   
    $($textLi.dom[cur]).addClass("show").siblings().removeClass("show"); 
    cur++
    if(cur==3) {cur=0}
 },3000)

  } 
   
   $("#button").tap(function(){
   	AD.sendEvent("vc","");
   	window.location.href="adclick:201310海福乐游戏"
       $("#p2").addClass("show");
	 
  });
  $("#buttonWeibo").bind("touchstart",function(){
	    window.location.href="sinaweibo:亲们，一起来下载杂志>>http://t.cn/zOqIjAN 参与挑战#海福乐五金 DIY服饰#活动，赢取野餐包或功能钳（共12份）。分享来自 #PChouse家居杂志# iPad版 @PChouse家居杂志 @德国海福乐五金"
  });
  
  $("#navButton").bind("touchstart",function(e){
	   $("#a2").addClass("show");
      $("#nav").toggle("show");
	    e.preventDefault();
		e.stopPropagation();
  }).bind("touchmove",function(e){
      	e.preventDefault();
		e.stopPropagation();
  });
  
$("#bgNav>li").each(function(e,i){
    $(e).tap(function(){
    	$("#canvas>img").remove();
    	$("#showBigImg_prompt2").hide();
    	$("#canvas").css("background-image","url(images/danpin/"+i+".png)").css("background-size",$(e).attr("data-bgsize")+"px")
    	$("#zhishi").attr("class","c"+i)
    	$("#imgNav").addClass("show");
    	$("#imgNavBg").addClass("show");
    })
})

$("#close").tap(function(){
     $("#p2").removeClass("show");	
});
   var touch={},$img,img;
   $("#imgNav li").bind("touchstart",function(e){
	    $("#nav").removeClass("show");
		var img=document.createElement("img");
		var view=document.getElementById("view");
		 touch.tar=e.touches[0];
		img.src="images/img/"+$(this).data("img");
		img.width="100";
		view.appendChild(img);
		$img=$(img);
	    $img.css({"left": (e.touches[0].pageX-50)+"px","top":(e.touches[0].pageY-50)+"px"});
		touch.start=[e.touches[0].pageX,e.touches[0].pageY]
   }).bind("touchmove",function(e){
	      e.preventDefault();
		  e.stopPropagation();
          touch.deltaX=e.touches[0].pageX-touch.start[0];
		  touch.deltaY=e.touches[0].pageY-touch.start[1];
	      $img.css("-webkit-transform","translate("+touch.deltaX+"px,"+ touch.deltaY +"px)");
		 
       
   }).bind("touchend",function(e){
	   if( ((touch.tar.pageX>40&&touch.tar.pageX<700)&&(touch.tar.pageY>50&&touch.tar.pageY<920)))
	   {
       var canvas=document.getElementById("canvas");
	   $img.remove();
	   
	   img=$img.get(0);
	   img.width="80";
       $img=$(img);
	   canvas.appendChild(img);
	   $img.css({"left": (touch.deltaX+touch.start[0]+10)+"px","top":(touch.deltaY+touch.start[1]+30)+"px","-webkit-transform":"translate(0,0)"}); 
	   $img.attr({"data-x":0,"data-y":0,"data-r":0,"data-s":1}); 
       touch={};
	   }else{
	        $img.remove();
	      
	   }
   });
 

  
  var moveImg={}; 

function setMoveImg(){
    moveImg.start=[parseInt($img.attr("data-x")),parseInt($img.attr("data-y")),parseFloat($img.attr("data-r")),parseFloat($img.attr("data-s"))]
} 
   $("#canvas").bind("touchstart",function(e){
     
	  touch.tar=e.touches[0];
		if(e.touches[0].target.tagName=="IMG"){
			pull=true;
			console.log("111");
			 $img=$(e.touches[0].target);
			 touch.start=[e.touches[0].pageX,e.touches[0].pageY];
			 setMoveImg();
		}
	  console.log( moveImg.start)
	 touch.deltaX=0;
	 touch.deltaY=0;


   }).bind("touchmove",function(e){

       if(!pull) return;

	   if(moveImg.gesturestart) return;

	   e.preventDefault();
       e.stopPropagation();
	   
	  
	   touch.deltaX=e.touches[0].pageX-touch.start[0];
	   touch.deltaY=e.touches[0].pageY-touch.start[1];

	   

	   $img.css("-webkit-transform","translate("+(touch.deltaX+moveImg.start[0])+"px,"+ (touch.deltaY+moveImg.start[1]) +"px) rotate("+moveImg.start[2]+"deg) scale("+ moveImg.start[3] +")");
	   $img.attr({"data-x":(touch.deltaX+moveImg.start[0]),"data-y":(touch.deltaY+moveImg.start[1]),"data-r":(moveImg.start[2]),"data-s":(moveImg.start[3])}); 

 
   }).bind("gesturestart",function(e){
	   moveImg.gesturestart=true;
	   setMoveImg(); 
	   	   e.preventDefault();
       e.stopPropagation();
       
   }).bind("gesturechange",function(e){
	   e.preventDefault();
       e.stopPropagation();
       touch.r=e.rotation;
	   touch.s=e.scale;
	   console.log("gesturechange")
	   $img.css("-webkit-transform","translate("+(moveImg.start[0])+"px,"+ (moveImg.start[1]) +"px) rotate("+(moveImg.start[2]+touch.r)+"deg) scale("+  Math.round((touch.s*moveImg.start[3])*100)/100 +")");
	   $img.attr({"data-x":(moveImg.start[0]),"data-y":(moveImg.start[1]),"data-r":(moveImg.start[2]+touch.r),"data-s":(Math.round((touch.s*moveImg.start[3])*100)/100)});
	   
   }).bind("gestureend",function(e){
	      moveImg.gesturestart=false;
         setMoveImg(); 
	   
   }).bind("touchend",function(e){

	   	if( !((touch.tar.pageX>40&&touch.tar.pageX<700)&&(touch.tar.pageY>50&&touch.tar.pageY<800)))
	   {
		  $img.remove();
		  console.log( "x="+touch.tar.pageX+" Y="+touch.tar.pageY)
	    }
        pull=false;
   });
})

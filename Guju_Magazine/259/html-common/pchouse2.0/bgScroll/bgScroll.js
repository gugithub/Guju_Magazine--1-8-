/* 背景滚动*/

(function(){

function bgScroll(options){
	 var that = this;
	 var devicePixelRatio =window.devicePixelRatio;
	 that.width=window.innerWidth;
    // -------------------- variable --------------------
	//$("#view,#bgScroll").css("width",that.width+"px");
	that.options = {
		buttonId:"bgScroll_button",
		startLeft:0,
		imgCount:4,
		onScrollStart: function () {},
		onScrollEnd: function () {}
	};
	
	if (typeof options == 'object') {
		for (i in options) {
			that.options[i] = options[i];
		}
	}
	
	that.onScrollStart = that.options.onScrollStart;
	delete that.options.onScrollStart;
	
	that.onScrollEnd = that.options.onScrollEnd;
	delete that.options.onScrollEnd;
  
	that.$bgScroll=$("#bgScroll");
	var imgStr=" ",maxScroll=0;
	var imgArray= new Array(that.options.imgCount);
	
	that.loadImg();

	that.$button = $("#"+that.options.buttonId);
    that.$bgScroll_scroller = $("#bgScroll_scroller") ;
	that.$bgScroll_scroller.find("img")
	 
    that.$prompt = $("#bgScroll .prompt");

	that.$centre=$("#bgScroll_centre");
    that.x = that.options.startLeft;

	
    that.$button.tap(function () {
		 that.$button.hide();
		 that.$bgScroll.addClass("show");
		 $("#bgScroll_centre").addClass("show")
          that.onScrollStart();
    });
	
	var touch={},t;
	 that.$bgScroll.bind("touchstart",function(e){
		    e.preventDefault();
			e.stopPropagation();
			
		 	var ma = new WebKitCSSMatrix(window.getComputedStyle($("#bgScroll_scroller").get(0)).webkitTransform);
            that.x = ma.e;
		    t=setTimeout(function(){$("#bgScroll .prompt").addClass("show");},150);
			touch.start = Date.now();
            touch.x1 = e.touches[0].pageX;
			$("#bgScroll_centre").removeClass("show");
	   }).bind("touchmove",function(e){
		   
		   
	        touch.x2 = e.touches[0].pageX;
			
			that.transform(that.x+(touch.x2-touch.x1));
			touch.start = -1;
		   	
	   }).bind("touchend",function(e){
	
		    clearTimeout(t);
			if(touch.start>0&&(Date.now()-touch.start<=150))
			{
             that.$button.show();
			t2=setTimeout(function(){that.$bgScroll.removeClass("show");},500)
		    $("#bgScroll .prompt").removeClass("show");
			that.transformEnd();
			}
			else{
		     $("#bgScroll .prompt").removeClass("show");  
			}
		   
	  });
	
	
}
bgScroll.prototype = {
	maxScroll:0,	
	loadImg:function(){
		    var that=this;
			var i=0;
			var imgArray=new Array(that.options.imgCount);
	
			var imgStr="",maxScroll=0;
			recursion();
			function recursion(){
			i++;
			imgArray[i]=new Image();
			imgArray[i].src="images/bg"+ i +".jpg";
			imgArray[i].onload=function(){
			  imgStr+='<img src="images/bg'+ i +'.jpg"  width="'+ (this.width/devicePixelRatio) +'">';
			  that.maxScroll+=this.width/devicePixelRatio;
			  if(i<(that.options.imgCount))
			  {
			      recursion();
				  
			  }else{
				  	console.log("bg: ",that.$bgScroll)
	                that.$bgScroll.html('<div id="bgScroll_scroller" style="-webkit-transform:translate3d('+ that.options.startLeft +'px,0,0);"><div style="width:'+that.maxScroll+'px">'+imgStr+'</div></div><div id="bgScroll_top" class="prompt">左右滑动图片</div><div id="bgScroll_bottom" class="prompt">点击返回</div><div id="bgScroll_centre">左右滑动图片<br />点击返回</div>');
			  }
			}
			    
			}

	    	
	},
	transform:function(x) {
         var that=this;
         if(x<0&&x>(-(that.maxScroll-that.width)))  
		 {  
	       console.log(x);
		  $("#bgScroll_scroller").css({ "-webkit-transform": "translate3d(" + x + "px,0,0)", "-webkit-transition": "-webkit-transform 0",});
		 }
    },
	transformEnd:function (){
		var that=this;
	    console.log("translate3d(" + that.options.startLeft + "px,0,0)"  )
		$("#bgScroll_scroller").css({ "-webkit-transform": "translate3d(" + that.options.startLeft + "px,0,0)","-webkit-transition": "-webkit-transform 0.5s" });
		that.onScrollEnd();
    },
	touchStart:function(){
	 var that=this;
	 that.options.onScrollStart;
	 that.$bgScroll.addClass("show");
	 
	},

}
window.bgScroll = bgScroll;
})();
(function(){
	
	function glideShow(options){
	  var that=this;
		that.options = {
		eleW:"#glideShowWrap",	
		ele:"#glideShow",
		button:"#glideShow_button",
        direction:"x",
		startPlace:[0,0],
		start: function () {},
		end: function () {},
		move:function(){},
	    };
	
	if (typeof options == 'object') {
		for (i in options) {
			that.options[i] = options[i];
		}
	}
	
	that.start = that.options.start;
	delete that.options.start;
	
	that.end = that.options.end;
	delete that.options.end;
	
	that.move = that.options.move;
	delete that.options.move;

	that.x=that.options.startPlace[0];
	that.y=that.options.startPlace[1];
	$ele=$(that.options.ele);
	$eleW=$(that.options.eleW);
	$button=$(that.options.button);
	that.maxWidth=$eleW.width()-2;
	that.maxHeight=$eleW.height()-2;

   $button.bind("touchstart",function(e){that.touchstart(e)});
   $("#view").bind("touchmove",function(e){that.touchmove(e)}).bind("touchend",function(e){that.thouchend(e)})


	
	}
glideShow.prototype={
	touch:{},
	glide:false,
    goto:function(x,y,time){
		var that=this;
      
	    if(that.options.direction=="x"){
			if(!(x>=0&&x<=that.maxWidth)) return;
			console.log(that.options.direction);
			$eleW.css({"-webkit-transform":"translate("+x+"px,0)","-webkit-transition-duration":time+"s"});
			$ele.css({"-webkit-transform":"translate(-"+x+"px,0)","-webkit-transition-duration":time+"s"});
			$button.css({"-webkit-transform":"translate("+x+"px,0)","-webkit-transition-duration":time+"s"});
			that.x=x;
	    }else{
			if(!(y>=0&&y<=that.maxHeight)) return;
			$eleW.css({"-webkit-transform":"translate(0,"+y+"px)","-webkit-transition-duration":time+"s"});
			$ele.css({"-webkit-transform":"translate(0,-"+y+"px)","-webkit-transition-duration":time+"s"});
			$button.css({"-webkit-transform":"translate(0,"+y+"px)","-webkit-transition-duration":time+"s"});
			that.y=y;
		}
	},
	touchstart:function(e){
	     var that=this;
		 that.glide=true;

		 that.start();
		 that.touch.startX=e.touches[0].pageX;
		 that.touch.startY=e.touches[0].pageY;
		 that.touch.start
		
	},
	touchmove:function(e){
		var that=this;
		if(!that.glide) return;
		e.preventDefault();
		e.stopPropagation();
	    
		 that.start();
		 that.touch.deltaX=e.touches[0].pageX-that.touch.startX;
		 that.touch.deltaY=e.touches[0].pageY-that.touch.startY;
	
		 that.goto(that.options.startPlace[0]+that.touch.deltaX,that.options.startPlace[1]+that.touch.deltaY,0)
	
	},
	thouchend:function(){
	    var that=this;
		console.log(that.options.startPlace);
		that.options.startPlace=[that.x,that.y]
		 that.glide=false;;
		//that.end();
	},
	
}	
	
window.glideShow = glideShow;
})()
(function(){
	
	function showFront(options){
	  var that=this;
		that.options = {
		buttonId:"showFront_button",
		frontId:"showFront_front",
		promptId:"showFront_prompt",
		hasBg:false,
		start: function () {},
		end: function () {}
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
	
	that.$button=$("#"+that.options.buttonId);
    that.$front=$("#"+that.options.frontId);
	that.$prompt=$("#"+that.options.promptId);
	that.$button.tap(function(){
	//that.$button.bind("click",function(){
		
	    if(that.$button.hasClass("close_btn"))
		{
			that.end();
			that.$button.removeClass("close_btn");
		}else{
		    that.start();
			that.$button.addClass("close_btn");
		}
		

		that.$prompt.hide();
		that.$front.toggle("show");
		if(that.options.hasBg){
		   if(that.$front.hasClass("show")){
		      that.$front.css("pointer-events","auto")  
		   }else{
		       that.$front.css("pointer-events","none") 
		   }
		}
	});
	
	if(that.options.hasBg)
	    that.$front.tap(function(e){
			e.stopPropagation();
		    that.end();
			that.$button.removeClass("close_btn");
			that.$front.removeClass("show");
			 that.$front.css("pointer-events","none") 
			
			
		})
	
	}
window.showFront = showFront;
})()
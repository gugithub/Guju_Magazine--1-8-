$(document).ready(function(){ 

(function () {
 var devicePixelRatio =window.devicePixelRatio;
 if(!Magazine.parseAppMsg("app_version")) devicePixelRatio =2;


    function showBigImg(options) {
        var that = this;
		
        that.options = {
            navId: "showBigImg_nav", 
            boxId: "showBigImg_showbox",
            promptId: "showBigImg_prompt",
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

        that.$nav = $("#" + that.options.navId + " li");
        that.$box = $("#" + that.options.boxId);
        that.$boxImg=$("#" + that.options.boxId + ">div>img");
        that.$prompt = $("#" + that.options.promptId);
        that.$showBigImg = $("#showBigImg");
        that.$box.css({"width":window.innerWidth+"px","height":window.innerHeight+"px"})


		that.$showBigImg.tap(function(e){
			        e.preventDefault();
					e.stopPropagation();
		            that.end();
                    that.$nav.show();
                    that.$prompt.hide();
                    that.$showBigImg.removeClass("show");
		})
        that.$nav.each(function (e, i) {
            $(e).tap(function () {
                    that.start();
                    that.$prompt.hide();
                    that.$nav.hide();
                    var img = new Image();
                    img.src = "images/showBigImg/" + (i + 1) + ".jpg";
                    img.onload = function () {
                        that.$boxImg.attr({"src":img.src,"width":img.width/devicePixelRatio});
                        that.$showBigImg.addClass("show");
                        that.$nav.hide();
                    }
            })
        })

    }
    window.showBigImg = showBigImg;
})()
})
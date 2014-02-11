$(document).ready(function(){ 

function IOSVersion(){   //获取IOS版本
    var index=window.clientInformation.userAgent.indexOf("CPU OS");
     console.log(window.navigator.userAgent);
    return window.clientInformation.userAgent.slice(index+7,index+8);
}

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
        that.$boxLi=$("#" + that.options.boxId + " li");
        that.$prompt = $("#" + that.options.promptId);
        that.$showBigImg = $("#showBigImg");

		that.$showBigImg.tap(function(e){
			        e.preventDefault();
					e.stopPropagation();
		            that.end();
                    that.$nav.show();
                    that.$showBigImg.removeClass("show");
                    that.$nav.show();
		})


        that.$nav.each(function (e, i) {
            $(e).tap(function () {
                    
                    that.start();
					that.$prompt.hide();
                    that.$nav.hide();
                    var img = new Image();
                    img.src = "images/" + (i + 1) + ".jpg";
                    img.onload = function () {
                        if((img.width*img.height)>2000000)
                        {
                        that.$boxLi.find("img").attr({"src":img.src,"width":img.width,"height":img.height});
                        alert(img.width)
                        }else{
                        that.$boxLi.find("img").attr({"src":img.src,"width":img.width/devicePixelRatio,"height":img.height/devicePixelRatio});
                        }

                        alert(img.width)
                        that.$showBigImg.addClass("show");
                        var left=Math.round((768-(img.width/devicePixelRatio))/2)-20,
		                top=Math.round((1024-(img.height/devicePixelRatio))/2)-20;	
                        that.$boxLi.css({"left":left+"px","top":top+"px"});
                        that.$nav.hide();
          

                }

            })

        })

    }
    window.showBigImg = showBigImg;
})()
})
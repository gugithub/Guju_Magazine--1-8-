(function () {

    function focusPicture(options) {
        var that = this;
        that.options = {
            navId: "focusPicture_nav",
            contentId: "focusPicture_content",
            promptId: "showFront_prompt",
            maximum: 4,
            isauto: false,
            autoTime: 3000,
            isFull: true,
            navClass: [],
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

        that.current = 0;
        if (!that.options.isauto) {
            var navEl = document.getElementById(that.options.navId)
            for (i = 2; i <= that.options.maximum; i++) {
                var newelementNav = document.createElement("li");
                newelementNav.innerHTML = "<span>" + i + "</span>";
                navEl.appendChild(newelementNav);
            }
        }
        that.$nav = $("#" + that.options.navId);
        that.$navLi = $("#" + that.options.navId + " li");
        that.$conten = $("#" + that.options.contentId);
        that.$post = $("#" + that.options.contentId + " .post");


        if (!that.options.isauto) {
            that.$navLi.each(function (e, i) {
		
                $(e).tap(function () {
                    if ($(this).hasClass("current")) return false;
                    that.current = i;
                    that.$nav.prev().hide();

                    $(this).addClass("current").siblings().removeClass("current");
					that.endAuto();
                    that.goto(i);
                })

            })
        }
    }
    focusPicture.prototype = {
        goto: function (i) {
            var that = this;
			that.current=i;
            that.start();
            var $come = that.$conten.find(".come"),
                $out = that.$conten.find(".out");

            var img1 = new Image();
            //img.src = "../html-"+ imgSrc +"/"+(i+1)+".jpg";	
            if (that.options.isFull) {
                img1.src = "images/" + (i + 1) + "-1.jpg";
            } else {
                img1.src = "images/" + (i + 1) + ".jpg";


            }
            img1.onload = function () {
                if (that.options.isFull) {
                    console.log("11")
                    var img2 = new Image();
                    //img.src = "../html-"+ imgSrc +"/"+(i+1)+".jpg";	
                    img2.src = "images/" + (i + 1) + "-2.jpg";
                    img2.onload = function () {
                        that.$nav.attr("class", that.options.navClass[i]);
                        $come.attr("class", "out");
                        //$out.attr("class","come").find("img").attr("src","../html-"+ imgSrc +"/"+(i+1)+".jpg");
                        $out.attr("class", "come").find(".topImg").attr("src", "images/" + (i + 1) + "-1.jpg");
                        $out.attr("class", "come").find(".bottomImg").attr("src", "images/" + (i + 1) + "-2.jpg");
                        setTimeout(function () {
                            that.$post.find(".topImg").attr("src", "images/" + (i + 1) + "-1.jpg");
                            that.$post.find(".bottomImg").attr("src", "images/" + (i + 1) + "-2.jpg");
                            that.end();
                        }, 500)
                    }
                } else {

                    that.$nav.attr("class", that.options.navClass[i]);
                    $come.attr("class", "out");
                    //$out.attr("class","come").find("img").attr("src","../html-"+ imgSrc +"/"+(i+1)+".jpg");
                    $out.attr("class", "come").find("img").attr("src", "images/" + (i + 1) + ".jpg");
                    setTimeout(function () {
                        that.$post.find("img").attr("src", "images/" + (i + 1) + ".jpg");
                        that.end();
                    }, 500)

                }


            }

        },
        auto: function () {
            var that = this;
            that.current++;
            if (that.current >= that.options.maximum) that.current = 0;
            that.goto(that.current);
        },
        startAuto: function () {
            var that = this;
            auto = setInterval(function () {
                that.auto()
            }, that.options.autoTime)
        },
        endAuto: function () {
            var that = this;
            clearInterval(auto);
        }
    }

    window.focusPicture = focusPicture;
})()
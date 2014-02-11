$(document).ready(function () {
   
    (function () {
        function bgScroll(options) {//全屏背景滚动
            var that = this;
            that.options = {
                beforeLeft: 0, //自动滚动之前的坐标
                startLeft: 0, //自动滚动后的坐标
                autoTime: 0, //当前页面滚动的时间 0为不自动滚动
                start: function () {}, //进入全屏大图时候函数
                end: function () {} //推出全屏大图的时候
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

            that.t=0;
            that.$bgScroll_button = $("#bgScroll_button");
            that.$bgScroll_prompt = $("#bgScroll_prompt");
            that.$scroll = $("#bgscroll");
            that.$bgscroller = $("#scroller");
            that.$bgScroll_centre = $('#bgScroll_centre');
            that.$frontImg = $("#frontImg");


            that.$bgScroll_button.tap(function () {
                that.$scroll.css("pointer-events", "auto");
                that.$bgScroll_button.hide();
                that.$bgScroll_prompt.hide();
                that.$frontImg.removeClass("show");
                that.$bgScroll_centre.addClass("show")
                that.start();
            })

            that.$scroll.tap(function () {

                that.mybgScroll.scrollTo(that.options.startLeft, 0, 500)
                that.$scroll.css("pointer-events", "none");
                that.$bgScroll_button.show()
                that.$bgScroll_prompt.show()
                that.$frontImg.addClass("show");
                that.$bgScroll_centre.removeClass("show");
                that.end();
            })


            that.mybgScroll;
            that.mybgScroll = new iScroll("bgscroll", {
                hScrollbar: false,
                bounceLock: false,
                flip: "y",
                vScrollbar: false,
                x: that.options.beforeLeft,
                onScrollMove: function () {
                    that.$bgScroll_centre.removeClass("show")
                },
                onScrollEnd: function () {},
            });

            if (that.options.autoTime > 0) { //有自动时间 证明一开始需要自动播放
                that.scrollstart = false;
                that.$bgScroll_button.hide();
                that.$bgScroll_prompt.hide();
                Magazine.addEvent(1, function () {
                    if (!that.scrollstart) {
                        that.scrollstart = true;
                        that.mybgScroll.scrollTo(that.options.startLeft, 0, that.options.autoTime)

                        that.t = setTimeout(function () {
                            that.$frontImg.addClass("show");
                            that.$bgScroll_button.show();
                            that.$bgScroll_prompt.show();
                        }, that.autoTime)
                    }
                })
                Magazine.addEvent(0, function () {
                    if (that.scrollstart) {
                        that.scrollstart = false;
                        clearTimeout(that.t);
                        that.$bgScroll_button.hide();
                        that.$bgScroll_prompt.hide();
                        that.$frontImg.removeClass("show");
                        that.mybgScroll.scrollTo(that.options.beforeLeft, 0, 0)
                    }
                })
            } else {
                that.$frontImg.addClass("show");
            }
        }
     window.bgScroll = bgScroll;
    })()
});
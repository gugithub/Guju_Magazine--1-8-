$(document).ready(function(){

    // -------------------- variable --------------------



var t,
    $bgScroll_button=$("#bgScroll_button"),
    $bgScroll_prompt=$("#bgScroll_prompt"),
    $scroll=$("#bgscroll"),
    $bgscroller=$("#scroller"),
    $bgScroll_centre=$('#bgScroll_centre'),
    $frontImg=$("#frontImg");
     
$bgScroll_button.tap(function(){
   $scroll.css("pointer-events","auto");
    $bgScroll_button.hide();
    $bgScroll_prompt.hide(); 
    $frontImg.removeClass("show");
    $bgScroll_centre.addClass("show")
    $("#scroll").hide();
})

$scroll.tap(function(){
  mybgScroll.scrollTo(startLeft,0,500) 
  $scroll.css("pointer-events","none");
  $bgScroll_button.show()
  $bgScroll_prompt.show()
  $frontImg.addClass("show");
  $("#scroll").show();
  $bgScroll_centre.removeClass("show")
})


var mybgScroll; 
    mybgScroll = new iScroll("bgscroll", {
       hScrollbar: false,
       bounceLock:false,
       flip:"y",
       vScrollbar: false,
       x: beforeLeft,
       onScrollMove:function(){
            $bgScroll_centre.removeClass("show")
       },
       onScrollEnd:function(){
       },
}); 

if(autoTime>0){ //有自动时间 证明一开始需要自动播放
    start=false;
    $bgScroll_button.hide();
    $bgScroll_prompt.hide(); 
    Magazine.addEvent(1,function(){
       if(!start)
      {
        start=true;
        mybgScroll.scrollTo(startLeft,0,autoTime) 

       t=setTimeout(function(){
             $frontImg.addClass("show");
                 $bgScroll_button.show();
                 $bgScroll_prompt.show(); 
        },autoTime)
      }
    })
    Magazine.addEvent(0,function(){
      if(start)
      {
            start=false;
            clearTimeout(t);
            $bgScroll_button.hide();
            $bgScroll_prompt.hide(); 
            $frontImg.removeClass("show");
            mybgScroll.scrollTo(beforeLeft,0,autoTime) 
      }
    }) 
}else{
    $frontImg.addClass("show");
}
});
/*    custom page logic      
 */
var myScroll2;
$(document).ready(function () {
    //------------ 当前页加载动画 --------------


	if(Magazine._debug ){

	}else{
		Magazine.addEvent(1,function(){
			
	
		})
		Magazine.addEvent(0,function(){
	
		})
	}
	
	
    // -------------------- variable --------------------
 	
 myScroll2 = new iScroll('scroller',{
	  flip:"x",
	  hScrollbar: false,
	vScrollbar: false, 
  });  
    

var a=[
    2677,2656,2678,2660,2655,2692,2693,2683,
    2677,2642,2640,2670,2651,2674,
    2656,2659,2665,2667,2654,2653,2695,
    2678,2675,2679,2669,2681,2682,2684,
    2660,2661,2687,2680,2686,2672,2671,2673,
    2655,2658,2664,2689,
    2692,2639,2691,
    2694,2693,
    2683,2666
]


$(".link_button").each(function(e,i){
   $(e).tap(function(){
   	  window.location.href="http://article-"+ a[i] +"/page-0"
   })
})
    // -------------------- param --------------------

    //--------------------- DOM----------------
    // -------------------- extend --------------------

    // -------------------- custom function --------------------

    // -------------------- event --------------------
	



    // -------------------- init --------------------



});
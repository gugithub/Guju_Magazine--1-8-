/*    custom page logic      
 */

$(document).ready(function () {


	
	// -------------------- variable --------------------

	 var height=window.innerHeight;
	 $("body").css("height",height+"px");




    // -------------------- param --------------------
    //--------------------- DOM----------------
    // -------------------- extend --------------------
    
  

 var t, current,index=0,sum;

  
    // -------------------- custom function --------------------

    // -------------------- event --------------------
	$("#nav li").tap(function(){
		console.log("11")
	    
		if(index==$("#nav li").index($(this))) return;
		
		index=$("#nav li").index($(this))
		clearInterval(t);
		current=1;
		
		if($(this).attr("data-img")){
		   sum=$(this).attr("data-img")
		   transImg(index+1) 
		   t=setInterval(function(){
				current>sum ? current=0:current;
				if(current==0){
				    transImg(index+1) 
				}else{
				    transImg(index+1+"-"+current)
				}
				current++

			},1500)
		}else{
		  transImg(index+1)  
		}
		
	})
	function transImg(i){
		console.log("11")
	    var $come=$(".come"),
		    $out=$(".out");
		$out.attr("src","images/"+(i)+".jpg").removeClass("out").addClass("come");
		$come.removeClass("come").addClass("out");
	}
	    

	

		 



});
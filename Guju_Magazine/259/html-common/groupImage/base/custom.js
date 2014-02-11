/*    custom page logic      
 */

$(document).ready(function () {

	var color=Magazine.parseAppMsg("color");
	var position=Magazine.parseAppMsg("position");
	var article=Magazine.parseAppMsg("article");
	var ig=Magazine.parseAppMsg("ig");
	var $groupImage_btn=$("#groupImage_btn");
	var $groupImage_prompt=$("#groupImage_prompt")

	
	if(color)
	{
	  $groupImage_btn.addClass(color)
	  $groupImage_prompt.addClass(color)
	};
	
	
/*	$("#view").tap(function(){
		 $("#groupImage_prompt").hide();
		 //window.location.href="http://GroupImage:article-"+ article +"/ig-"+ ig;
	})*/
	

	
	
	


    // -------------------- variable --------------------
    

    // -------------------- param --------------------

    //--------------------- DOM----------------
    // -------------------- extend --------------------
    // -------------------- custom function -------------------





    // -------------------- event --------------------
   $groupImage_btn.tap(function(){
     $groupImage_prompt.hide();
     window.location.href="groupimage:article-"+article+"/ig-"+ig  

   })


});
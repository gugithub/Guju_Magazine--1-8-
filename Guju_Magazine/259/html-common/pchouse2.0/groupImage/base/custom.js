/*    custom page logic      
 */

$(document).ready(function () {


//file:html-common/pchouse2.0/groupImage/index.html?color=w&article=1020&ig=4364
	var color=Magazine.parseAppMsg("color");
	var article=Magazine.parseAppMsg("article");
	var ig=Magazine.parseAppMsg("ig");
	var $groupImage_btn=$("#groupImage_btn");
	var $groupImage_prompt=$("#groupImage_prompt")

	
	if(color)
	{
	  $groupImage_btn.addClass(color)
	  $groupImage_prompt.addClass(color)
	};
	
	

	
	
	$("#groupImage_btn").tap(function(){
		 $("#groupImage_prompt").hide();

		// console.log("groupimage:article-"+ article +"/ig-"+ig)
		 window.location.href="groupimage:article-"+article+"/ig-"+ig;
		 
		 
	})
	

	
	
	


    // -------------------- variable --------------------
    

    // -------------------- param --------------------

    //--------------------- DOM----------------
    // -------------------- extend --------------------
    // -------------------- custom function -------------------





    // -------------------- event --------------------



});
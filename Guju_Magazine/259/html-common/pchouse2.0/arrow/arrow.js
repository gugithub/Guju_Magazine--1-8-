$(document).ready(function(){
  $("body").append("<div class='arr'></div>");
  $("body").bind("touchmove",function(){
	$(".arr").hide();
  })
})
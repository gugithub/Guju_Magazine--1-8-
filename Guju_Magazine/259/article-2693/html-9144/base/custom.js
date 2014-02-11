/*    custom page logic      
 */
var myScroll1,myScroll2,myScroll3;
$(document).ready(function () {
    //------------ 当前页加载动画 --------------

var start=false;
setTimeout(function(){currStart();},500)
	if(Magazine._debug ){

	}else{
		Magazine.addEvent(1,function(){
	    if(!start)
		{
		 currStart();
		 start=true;   
		}

		})
		Magazine.addEvent(0,function(){
				    if(start)
		{
		 currEnd();
		 start=false;   
		}
	
		})
	}
	
	
    // -------------------- variable --------------------
	
 myScroll1 = new iScroll('scroller1',{
	  flip:"x",
      hScrollbar: false,
	  vScrollbar: false,
	  y:-500,

  });  
 myScroll2 = new iScroll('scroller2',{
	  flip:"x",
      hScrollbar: false,
	  vScrollbar: false,
	  topOffset:-500,
	  y:500,

  }); 
   myScroll3 = new iScroll('scroller3',{
	  flip:"x",
	  hScrollbar: false,
	  vScrollbar: false,
	  y:-500,

  }); 
function currStart(){
        myScroll1.scrollTo(0,0,500); 
	    myScroll2.scrollTo(0,0,500);
	    myScroll3.scrollTo(0,0,500);
	 	myScroll1.scrollTo(0,0,500); 
		console.log(myScroll1.minScrollY)
		//myScroll2.maxScrollY-=myScroll2.minScrollY;
        myScroll2.minScrollY=0;
		myScroll2.topOffset=0,
		setTimeout(function(){
		    $(".loadImg").each(function(e,i){
			  $(e).attr("src",$(e).attr("data-src"))  ;
			})
			console.log("11")
		},500)
}


function currEnd(){
        myScroll1.scrollTo(0,-500,500); 
	    
	    myScroll3.scrollTo(0,-500,500);
	 	myScroll1.scrollTo(0,-500,500);  
		myScroll2.options.topOffset=-500;
		myScroll2.scrollTo(0,500,0);
}
        $("#link_button1").tap(function(){
            window.location.href="http://www.samsung.com/cn/consumer/televisions/televisions/uhd-tv/UA55F9000AJXXZ-features?pid=cn_home_televisions_left1_F9000_20130902#custombrowser";
            setTimeout(function(){
             window.location.href="adclick:2013.10三星UHD"; 
            },500)
        });
        $("#link_button2").tap(function(){
            window.location.href="http://china.dell.com/cn/p/xps-27-2720-aio/pd#custombrowser";
            setTimeout(function(){
             window.location.href="adclick:2013.10 DELL触控"; 
            },500)
        });

$('#view').bind('touchstart',function(){
	$('#labelprompt').hide();
});
});
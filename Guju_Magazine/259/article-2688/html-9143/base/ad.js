/*
* 异步加载js
* 广告有效期内,从广告系统获取计数器链接,过期后使用本地代码的客户链接.
* 离线状态下忽略计数器,直接使用本地代码的客户链接.
*/

function getJson(a_sUrl,a_sCallback){
	console.log("-----------")
	var _script = document.createElement("script");
	_script.type="text/javascript";
	_script.src=a_sUrl;
	if( a_sCallback){
		_script.onload = a_sCallback;
		_script.onerror = a_sCallback;
	}
	if(_script.onreadystatechange!==undefined){//only work in IE for httpwatch testing.
        _script.onreadystatechange = function() {
                if (_script.readyState == 'loaded')//ERROR LOADING
                    a_sCallback();
                else
                if(_script.readyState == 'complete')//loaded
                    a_sCallback();

        };
	}
	document.getElementsByTagName("head")[0].appendChild(_script);
}
function parseUrl(a_sUrl,a_sParamName){
	var reg = new RegExp("(^|\\?|&)"+ a_sParamName +"=([^&]*)(\\s|&|$)", "i");
	if (reg.test(a_sUrl)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
	return "";
}
function parseJson(a_json){
	isDataUseful = true;
	//alert("parseJson")
	ADJSON = a_json;
}
var ADJSON = "";
var isDataUseful = false;
/*
* param:pconline url,time limited
* param:custom url
*/
function initAD(a_sPConlineUrl,a_oCusUrl){
	var _AD={id:parseUrl(a_sPConlineUrl,"id")};
	//var _AD={id:"auto.ipad.nyzb1.xcty.dtzs."};
	console.log(a_sPConlineUrl)
	console.log(_AD.id)
	getJson(a_sPConlineUrl);
	_AD.sendEvent = function(a_sType,a_nMethod,a_fCallback){
			getJson(a_sPConlineUrl,function(){
				if(isDataUseful){
					// 广告有效
					if("browser"===a_nMethod){
						// 打开浏览器
						window.location.href = ADJSON[_AD.id].ads[0][a_sType+"-uri"];
					}else {
						// 后台发送
						getJson(ADJSON[_AD.id].ads[0][a_sType+"-uri"],function(){
							//alert("send request")
							if(a_fCallback)a_fCallback();
						});
					}
					isDataUseful = false;//取消有效标志,保证每次都是最新数据
					ADJSON = "";
				}else{
					// 找不到链接。广告过期 or 离线状态
					if("browser"===a_nMethod){
						window.location.href = a_oCusUrl[a_sType]+"#CustomBrowser";
					}else{
						getJson(a_oCusUrl[a_sType],function(){
							//alert("广告失效，send request")
							if(a_fCallback)a_fCallback();
						});
					}
				}
				
			})
	}
	return _AD;
}


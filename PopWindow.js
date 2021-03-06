var _pop_win = {
	loadScript : function(src, func){
		var script = document.createElement("script");
		script.src = src;
		script.type = "text/javascript";
		script.onload = func;
		document.getElementsByTagName("body")[0].appendChild(script);	
	},
	_init : function(){
		$("body").on("click","*[data-pop-param]",function(){//data-pop-param参数设置
			_pop_win._http_pop($(this).attr("data-pop-param"));
		})
		$("body").on("click", "*[data-pop-action=\"close\"]", function(){//data-pop-action=close关闭浮窗
			$("*[data-pop-id=\"container\"]").remove();
		})		
	},
	_pop_close : function(){//手动调用js关闭浮窗
		$("*[data-pop-id=\"container\"]").remove();
	},
	_http_pop : function(data){//{宽，高，路径} 
		if(data != null && data != ""){
			data = data.split(",");
			if(data.length == 3){
				var container = $("<div data-pop-id=\"container\"></div>");
				$(container).css({"width":"100%","height":"100%","position":"fixed","top":"0","left":"0","background-color":"#0a0909a6","display":"flex","justify-content":"center","align-items":"center","z-index":"999"});
				
				var main = $("<div></div>");
				$(main).css({"width":data[0],"height":data[1],"position":"relative"});
				$(container).append(main);
								
				var button = $("<div data-pop-action=\"close\">X</div>");
				$(button).css({"cursor":"pointer","width":"20px","height":"20px","display":"flex","align-items":"center","justify-content":"center","font-size":"20px","color":"#FF5722","background-color":"white","position":"absolute","right":"-15px","top":"-15px","border-radius":"50%","border":"5px solid #FF5722"});
				$(main).append(button);		
					
				var suffix = data[2].substr(data[2].lastIndexOf(".") ,4);	
				if(suffix == ".jpg" || suffix == ".png" || suffix == ".gif" || suffix == ".jpeg" || suffix == ".JPG" || suffix == ".GIF" || suffix == ".PNG" || suffix == ".JPEG"){
					var img = $("<img src=\"" + data[2] + "\"/>");
					$(img).css({"width":"100%","height":"100%"});
					$(main).append(img);				
				}else{
					var myFrame = $("<iframe frameborder=\"0\" src=\"" + data[2] + "\"></iframe>");
					$(myFrame).css({"width":"100%","height":"100%"});
					$(main).append(myFrame);
				}
				
				$("body").append(container);
			}
		}
	},
	_html_pop : function(data, str){//{宽，高},html代码字符串 
		if(data != null && data != "" && str != ""){
			data = data.split(",");
			if(data.length == 2){
				var container = $("<div data-pop-id=\"container\"></div>");
				$(container).css({"width":"100%","height":"100%","position":"fixed","top":"0","left":"0","background-color":"#0a0909a6","display":"flex","justify-content":"center","align-items":"center","z-index":"999"});
				
				var main = $("<div></div>");
				$(main).css({"width":data[0],"height":data[1],"position":"relative","background-color":"white"});
				$(container).append(main);
								
				var button = $("<div data-pop-action=\"close\">X</div>");
				$(button).css({"cursor":"pointer","width":"20px","height":"20px","display":"flex","align-items":"center","justify-content":"center","font-size":"20px","color":"#FF5722","background-color":"white","position":"absolute","right":"-15px","top":"-15px","border-radius":"50%","border":"5px solid #FF5722"});
				$(main).append(button);		
					
				if(str.indexOf("<") == 0){					
					var myHtml = $(str);
					$(myHtml).css({"width":"100%","height":"100%"});
					$(main).append(myHtml);//字符串拼接html
				}else {
					var myHtml = $("#" + str).clone();//从页面中复制指定id内的html
					myHtml.css("display","block");//包裹html的元素应添加frame样式
					$(main).append(myHtml.html());
				}
				
				$("body").append(container);
				return container;//返回该对象便于外部js调用
			}
		}
	}
}

/*判断是否引入jquery,然后执行初始化方法*/
if(!window.jQuery) {
	_pop_win.loadScript("https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js", _pop_win._init);	
}else{
	_pop_win._init();
}

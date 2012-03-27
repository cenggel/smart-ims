
 (function($) {
    $.fn.tabs = function(options) {
		var funcs = {
		       fun_tabclick : function (Element)
			   {
				  if($(this).data("status")==-1)
				  {
					  funcs.createWindow($(this).attr("id"));
				  }
				  else if($(this).data("status")==0)
				  {
					  funcs.displayWindow($(this).attr("id"));
				  }
				  else
				  {
					  //激活状态下什么都不做
					  return;
				  }
			   },
               createWindow  : function(key){
               	   for (var t_key in JCJ_datas["tabs"])
                   {
                   	   if($("#IFRAME_"+t_key))
                       {
                       	   if(t_key==key)
                           {
                           	   $("#IFRAME_"+t_key).remove();
                           }
                           else
                           {
                           	   $("#IFRAME_"+t_key).hide();
                            }
                       }
                   }
                   var t_iframe = $('<IFRAME id="IFRAME_'+key+'" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; WIDTH: 100%; height:100%; DISPLAY: block; BORDER-TOP: 0px; BORDER-RIGHT: 0px; frameborder: 0; scrolling: no" src="'+JCJ_datas["tabs"][key]["src"]+'" frameBorder=0></IFRAME>');
                   $("#tmmain").append(t_iframe);
               },
			   displayWindow : function(){
			   }
        };
        
        $(this).data("curIndex",'-1');
        for (var key in JCJ_datas["tabs"])
        {
        	$("#"+key).data("index",JCJ_datas["tabs"][key]["index"]);
			$("#"+key).data("status",JCJ_datas["tabs"][key]["status"]);
        	$("#"+key).click(funcs.fun_tabclick);
        }
    };
})(jQuery);
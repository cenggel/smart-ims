
 (function($) {
    $.fn.tabs = function(options) {
		var funcs = {
		       fun_tabclick : function (Element)
			   {
				  if(JCJ_datas["tabs"][$(this).attr("id")]["status"]==-1)
				  {
					  funcs.createWindow($(this).attr("id"));
				  }
				  else if(JCJ_datas["tabs"][$(this).attr("id")]["status"]==0)
				  {
					  funcs.displayWindow($(this).attr("id"));
				  }
				  else
				  {
					  return;
				  }
			   },
			   fun_tabactive:function (key)
			   {
			   	   var idx = $.inArray(key,JCJ_datas["tabs_stack"]);
			   	   if(idx!=-1)
			       {
			       	   JCJ_datas["tabs_stack"] = JCJ_datas["tabs_stack"].splice(idx,1);
			       }
			   	   JCJ_datas["tabs_stack"].push(key);
			   },
               createWindow  : function(key){
               	   for (var t_key in JCJ_datas["tabs"])
                   {
                   	   if($("#IFRAME_"+t_key).size())
                       {
                           $("#IFRAME_"+t_key).hide();
                       }
                       if($("#menu_"+t_key).size())
                       {
                       	   $("#menu1_"+t_key).removeClass("t_tab_curl");
                       	   $("#menu1_"+t_key).addClass("t_tab_norl");
                       	   $("#menu2_"+t_key).removeClass("t_tab_curm");
                       	   $("#menu2_"+t_key).addClass("t_tab_norm");
                       	   $("#menu3_"+t_key).removeClass("t_tab_curr");
                       	   $("#menu3_"+t_key).addClass("t_tab_norr");
                       	   JCJ_datas["tabs"][t_key]["status"] = 0;
                       }
                   }
                   var t_html  = '<DIV id="menu_' + key + '" style="WIDTH: 99px; WHITE-SPACE: nowrap; OVERFLOW: hidden" class=menuli>';
					   t_html  +='   <DIV id="menu1_' + key + '" class=t_tab_curl>';
					   t_html  +='    <DIV id="menu2_' + key + '" class=t_tab_curm>';
					   t_html  +='       <DIV id="menu3_' + key + '" class=t_tab_curr><A id="CLOSE_' + key + '" class=close title=关闭 href="javascript:void(0);"></A><A title=' + JCJ_datas["tabs"][key]["key_word"] + ' href="javascript:void(0);">' + JCJ_datas["tabs"][key]["key_word"] + '</A></DIV>';
					   t_html  +='    </DIV>';
					   t_html  +='  </DIV>';
					   t_html  +='</DIV>';
				   $(t_html).appendTo($("#menu"))
				   $("#menu_"+key).click(function() {funcs.displayWindow(key)});
				   $("#CLOSE_"+key).click(function() {funcs.closeWindow(key)});
				   JCJ_datas["tabs"][key]["status"] = 1;
				   
                   var t_iframe = $('<IFRAME id="IFRAME_'+key+'" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; WIDTH: 100%; height:100%; DISPLAY: block; BORDER-TOP: 0px; BORDER-RIGHT: 0px; frameborder: 0; scrolling: no" src="'+JCJ_datas["tabs"][key]["src"]+'" frameBorder=0></IFRAME>');
                   $("#tmmain").append(t_iframe);
                   funcs.fun_tabactive(key);
               },
			   displayWindow : function(key){
			   	   for (var t_key in JCJ_datas["tabs"])
                   {
                   	   if($("#IFRAME_"+t_key).size())
                       {
                       	   if(t_key==key)
                           {
                           	   $("#IFRAME_"+t_key).show();
                           }
                           else
                           {
                           	   $("#IFRAME_"+t_key).hide();
                           }
                       }
                       if($("#menu_"+t_key).size())
                       {
                       	   if(t_key==key)
                           {
	                       	   $("#menu1_"+t_key).addClass("t_tab_curl");
	                       	   $("#menu1_"+t_key).removeClass("t_tab_norl");
	                       	   $("#menu2_"+t_key).addClass("t_tab_curm");
	                       	   $("#menu2_"+t_key).removeClass("t_tab_norm");
	                       	   $("#menu3_"+t_key).addClass("t_tab_curr");
	                       	   $("#menu3_"+t_key).removeClass("t_tab_norr");
                           	   JCJ_datas["tabs"][t_key]["status"] = 1;
                           }
                           else
                           {
	                           $("#menu1_"+t_key).removeClass("t_tab_curl");
	                       	   $("#menu1_"+t_key).addClass("t_tab_norl");
	                       	   $("#menu2_"+t_key).removeClass("t_tab_curm");
	                       	   $("#menu2_"+t_key).addClass("t_tab_norm");
	                       	   $("#menu3_"+t_key).removeClass("t_tab_curr");
	                       	   $("#menu3_"+t_key).addClass("t_tab_norr");
                           	   JCJ_datas["tabs"][t_key]["status"] = 0;
                           }
                       }
                   }
                   funcs.fun_tabactive(key);
			   },
			   closeWindow:function (key)
			   {
			   	   $("#menu_"+key).remove();
			   	   $("#IFRAME_"+key).remove();
			   	   JCJ_datas["tabs"][key]["status"]=-1;
			   	   JCJ_datas["tabs_stack"].splice($.inArray(key,JCJ_datas["tabs_stack"]),1);
			   	   var active_key = JCJ_datas["tabs_stack"].pop();
			   	   funcs.displayWindow(active_key);
			   }
        };
        
        $(this).data("curIndex",'0');
        $("#menu_desktop").click(function() {funcs.displayWindow("desktop")});
        for (var key in JCJ_datas["tabs"])
        {
        	$("#"+key).data("index",JCJ_datas["tabs"][key]["index"]);
			$("#"+key).data("status",JCJ_datas["tabs"][key]["status"]);
        	$("#"+key).click(funcs.fun_tabclick);
        }
    };
})(jQuery);
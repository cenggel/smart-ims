
 (function($) {
    $.fn.tabs = function(options) {
		var funcs = {
		       fun_tabclick : function (Element)
			   {
				  if($(this).data("status")==-1)
				  {
					  $(this).createWindow();
				  }
				  else if($(this).data("status")==0)
				  {
					  $(this).displayWindow();
				  }
				  else
				  {
					  //激活状态下什么都不做
					  return;
				  }
			   },
               createWindow  : function(){},
			   displayWindow : function(){}
        };
		
		$.extend({},funcs, options);

        $(this).data("curIndex",'-1');
        for (var key in JCJ_datas["tabs"])
        {
        	$("#"+key).data("index",JCJ_datas["tabs"][key]["index"]);
			$("#"+key).data("status",JCJ_datas["tabs"][key]["status"]);
        	$("#"+key).click($(this).fun_tabclick);
        }
    };
})(jQuery);
(function($, prototype) {
	$.extend(prototype.options, {
		fitFrameHeight:true,
		remoteInFrame : false,
		frameTemplat:"<div class=\"tabIframeWrapper\"><iframe class=\"iframetab\" src=\"#{url}\">Load Failed?</iframe></div>"
	});

	var _load = prototype.load;

	prototype.load = function(index) {
		index = this._getIndex(index);
		var self = this, 
		o = this.options; 
		if(!o.remoteInFrame){
			return _load.call(this,index);			
		}
		
		a = this.anchors.eq(index)[0], 
		url = $.data(a, "load.tabs");

		this.abort();

		// not remote or from cache
		if (!url || this.element.queue("tabs").length !== 0
				&& $.data(a, "cache.tabs")) {
			this.element.dequeue("tabs");
			return;
		}

		
		

		if (o.spinner) {
			var span = $("span", a);
			span.data("label.tabs", span.html()).html(o.spinner);
		}
		
		
		// load remote from here on
		this.lis.eq(index).addClass("ui-state-processing");
		
		var frame = $(o.frameTemplat.replace( /#\{url\}/g, url ));
		
		if(o.fitFrameHeight){
			frame.find('iframe').load(function(){
				var thisheight = $(this).contents().outerHeight(true)+30;
				alert(thisheight);
				$(this).height(thisheight);
				});
		}
		
		$(self.panels[index]).html(frame)
	     .addClass("ui-iframe-tab-panel");
		self._trigger("load", null, self._ui(self.anchors[index],
				self.panels[index]));
		self._cleanup();
		
		if ( o.cache ) {
			$.data( a, "cache.tabs", true );
		}

		
		$("#frame_con").load(function(){
			var thisheight = $(this).contents().find("body").height()+30;
			$(this).height(thisheight < 500 ? 500 : thisheight);
			});

		
		// last, so that load event is fired before show...
		self.element.dequeue("tabs");

		return this;
	}
}(jQuery, jQuery.ui.tabs.prototype));

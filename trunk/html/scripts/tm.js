// JavaScript Document
// top mgt  js file
var tm ={
	showNum:0,
	currColoredDomId:null,
	wresize:function (){			
			var o =$("tmmain");
			o.setStyles({"height":window.getSize().y-125} );
			tm.tab.resize();
	},
	receiveMessage:function (content){
		debug("receiveMessage:" + JSON.encode(content));
		if(typeof content == "string") 	
			content = JSON.decode(content);
		if(!content) return;
		if(content.reference && typeof content.reference == "object"){
			debug("receiveMessage:  show"  );
			tm.tab.show(content.reference.url,"");
			return;
		}
		debug("type:" + typeof content.enterComponent);
		if(content.enterComponent && typeof content.enterComponent == "object"){
			var o = content.enterComponent;
			debug("receiveMessagesss o:" + JSON.encode(o));
			if(o && o.file=='true'){
				tm.tab.show("MGT_DOC:fresh",'url='+o.url+'&file=true');
			}else{
				tm.tab.show(o.url,"");
			}	
		}	
	},
	getCrossDoaminContent:function (message, domain, uri, srcname){
		if(message ){
			debug('tm.getCrooss....:'+JSON.encode(message));
			tm.receiveMessage(message[0]);
		}
	},	
	showMenu:function(){//系统仅仅执行一次。
		var showNum = 10;
		var ul = $("bigTitleId");
		var moreUL = $("moreTitleId");
		
		var len =tm.menu.length;
		var needMore = false;
		if(len>showNum)
			needMore = true;
		tm.menu.each(function(item,index){		
			tm._createIdArr(item);
			if(index==0)return;
			if(index<showNum|| !needMore){
				ul.adopt(tm._createMenu( item));
			}else{
				if(index==showNum){
					var m = {name:gVar.more,idArr:["more"],pic:"j_ico_more"};
					ul.adopt(tm._createMenu(m));
				}
				moreUL.adopt(tm._createMenu( item));
			}
		});
		this.initSearchDiv();
		
		if(Browser.Engine.trident4){
			$("tmmain").load("indexie6.jsp");
		}
		return;		
	},
	initSearchDiv:function(){
		//noShow:表示不需要在 tab那里进行渲染
		var a = {'name':'search','url':'searchBar','domId':'MGT_CLIENT_SEARCH','out':false,"noShow":true};
		tm._createIdArr(a);
		tm.menu.include(a);	
		
		var d = $("t_search_div");
		d.addEvent("click",function(){
			tm.tab.show("MGT_CLIENT_SEARCH","");
		});
	},
	_createMenu:function(menu){
		
		var b = new Element("b",{
			'class':menu.pic
		});
		var div = new Element("div",{
			'class':"imgwap"
		}).adopt(b);
		
		var li = new Element("li",{
			events: {
				 mouseout: function(){
			         this.removeClass('navlimov');
			    },
			     mouseover: function(){
			    	 this.addClass('navlimov');
			    }
			}
		}).adopt(div);
		
		var a=  new Element('a',{
			'href':"javascript:void(0);",			
			'html':menu.name
		});
		li.adopt(a);
		
		li.addEvent("click",function(){
			if(menu.idArr[0]=="more"){
				tm._showMoreMenu();				
			}else{
				tm.tab.show(menu.idArr[0],"");
				tm._showMoreMenuHidden();
			}			
		});
		return li;
	},
	_showMoreMenuStatus:false,
	_showMoreMenu:function(){
		var div =$("t_pop_navli");
		var b=$("bigTitleId").getCoordinates();
		if(!this._showMoreMenuStatus){
			this._showMoreMenuStatus=true;
			
			div.addEvent("click",function(event){
				event.stop();				
			});
		}
		
		var hdiv = $("bigTitleIdHideDiv");
		if(!hdiv){			
			hdiv = new Element("div",{
				"id":"bigTitleIdHideDiv",
				styles:{
					position:"absolute",top:0,left:0,
					"background-color":"white",
					"filter":"alpha(opacity=1)",
					"opacity":"0.01",
					//"border":"5px solid blue",
					"z-index":1
				}
			}).inject($(document.body));
			
			hdiv.addEvent("click",function(event){
				event.stop();
				div.setStyle("display","none");
				hdiv.setStyle("display","none");
			});
		}
		var s = window.getSize();
		this._showMoreMenuHiddenStatus=true;
		var b=$("bigTitleId").getCoordinates();
		div.setStyles({"display":"block",
			top:b.top+45,left:b.left+b.width-240
			});
		hdiv.setStyles(
				{"display":"block",
				  width:s.x,
			      height:s.y			
			});
	},	
	_showMoreMenuHiddenStatus:false,
	_showMoreMenuHidden:function(){
		debug("this._showMoreMenuHiddenStatus " + this._showMoreMenuHiddenStatus );
		
		if(this._showMoreMenuHiddenStatus){
			try{
			this._showMoreMenuHiddenStatus=false;
			var hdiv = $("bigTitleIdHideDiv");
			var div =$("t_pop_navli");
			div.setStyle("display","none");
			hdiv.setStyle("display","none");
			}catch(e){
				debug("error: " + e +" , " + e.message );
			}
		}
	},
	getSubMenu:function(o){//输入格式为:mgt_doc,RA12B11,RA1,RA1_23,RA2B2_23
		var sub=this._getSubMenu(o);
		var len,t;
		if(!sub){
			if(o.length>2){
				t = o.substring(0,2);
				if(t=="RA"){
					len = o.indexOf("C");
					if(len>2&&len<9){
						t = o.substring(0,len);
						sub=this._getSubMenu(t);
					}
					if(!sub){
						len = o.indexOf("B");
						if(len>2){
							t = o.substring(0,len);
							sub=this._getSubMenu(t);
						}
						if(!sub){
							var len = o.indexOf("_");
							if(len>2){
								t = o.substring(0,len);
								sub=this._getSubMenu(t);
							}
						}
					}
				}else{
					len = o.indexOf(":");
					if(len>3){
						t = o.substring(0,len);
						sub=this._getSubMenu(t);
					}
					if(!sub){
						debug(" ooo  ");
						len = o.indexOf("%3A");
						debug(" ooo  " + o +", len: " + len );
						if(len>3){
							t = o.substring(0,len);
							debug(" ooo  " + o +", t: " + t );
							sub=this._getSubMenu(t);
						}						
					}
					if(!sub){
						if(o.length>5){
							var k = o.substring(5).indexOf("_");					
							if(k>0){								
								sub=this._getSubMenu( o.substring(0,5+k));
							}
						}						
					}
					
				}			
			}
		}
		return sub;
	},
	_getSubMenu:function(o){
		var sub=null;
		var idArr;
		tm.menu.each(function(item,index){			
			item.idArr.each(function(k){
				if(k==o)
					sub=item;
			});			
		});
		return sub;
	},
	_createIdArr:function(m){
		if(!m.idArr){
			m.idArr = m.domId.split(",");	
		}
		return m.idArr;
	},	
	showMore:function(e){
		e= new Event(e);
		e.stopPropagation();
		var menuShow = $('menuShowMoreId');
		menuShow.empty();		
		tm.menu.each(function(item,index){
			if(index<tm.showNum) return;
			menuShow.adopt(tm._createMenu(item.name,item.domId));
		});
		$("menuList").setStyle("display","block");
		
		$("zindexFrame").setStyle("display","block");
		$("zindexFrame").setStyle("width",$("menuList").getWidth() + 1);
		$("zindexFrame").setStyle("height",$("menuList").getHeight());
		$("zindexFrame").setStyle("left",$("menuList").getOffsets().x);
		$("zindexFrame").setStyle("top",$("menuList").getOffsets().y);

		var Overlay = this.getOverlay(tm.closeShowMore);
		setTimeout(function(){Overlay.injectInside(document.body);},50);
	},
	getOverlay:function(clickFuc){
		var Overlay = $("dfOverlay");
		if(Overlay) 
			return Overlay;
		
		Overlay = new Element('div', {
			'id': 'dfOverlay',
			'styles': {
				'z-index': 99,
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'width':'100%',				
				'height':'100%'
			}
		});
		if(Browser.Engine.trident){//如果是IE浏览器，加滤镜以遮盖overlay下的元素
			Overlay.setStyles(
				{
					'background-color':'white',
					'filter': 'alpha(opacity=0);'
				}
			);
		}
		if(clickFuc && (clickFuc instanceof Function)){
			Overlay.addEvent('click',clickFuc);
		}
		return Overlay;
	},
	showAccountInfo:function(event){
		
		event = event || window.event;
		event = new Event(event);
		event.stopPropagation();
		
		var overlay = this.getOverlay(tm.closeAccountInfo);
		overlay.injectInside(document.body);
		var b= $("t_space_div_click").getCoordinates();
		
		var div=$("accountInfoArea");
		div.setStyle("display","block");
		div.setStyles({
		    top:b.top+15,left:b.left
		});
	},
	closeShowMore:function(){
		$("menuList").setStyle("display","none");
		$("zindexFrame").setStyle("display","none");
		if($("dfOverlay")){
			$("dfOverlay").destroy();
		}
	},
	closeAccountInfo:function(){
		$("accountInfoArea").setStyle("display","none");
		if($("dfOverlay")){
			$("dfOverlay").destroy();
		}
	},
	currMenu:null,	
	isOpen:function(o){//一个模块是否开启
		var isOpened = false;
		tm.menu.each(function(item,index){
			if(item.domId == o){
				isOpened = true;
			}
		});
		return isOpened;
	}
	
};
tm.tab={
	arr:[],
	currTab:null,
	tabSize:function(){//搜索按钮特殊处理
		var len=0;
		this.arr.each(function(item){
			if(!item.menu.noShow){
				len=len+1;				
			}
		});
		return len;
	},
	show:function(url,q){// u是标示tab唯一的内容,一个tab可以有多个domId。如果已经存在，则打开，否则显示默认页面,q:真正的参数
		try{
		debug("show, url=" +url +" ,q="+ q );
		if(!url){		
			url="h";		
		}
		if(!q)q="url="+url;
		var menu =  tm.getSubMenu(url);
		if(!menu){
			window.alert(gVar.noright);
			return;
		}
		
		var o= this.get(menu);		
		debug("show, menu:" +menu.name +",menu.noShow:" + menu.noShow );
		this.hideCurr();
		var flushTab=false;
		if(!o){			
			o = new this.TmTabClass(menu);
			var a1  = this.tabSize();
			this.arr.include(o);
			var a2  = this.tabSize();
			debug("go123: " + a1 +" , " + a2   );
			flushTab=true;
		}else{
			this.arr.erase(o);
			this.arr.include(o);			
		}
		o.showMeDefault(url,q,3);
		this.currTab=o;
		if(flushTab){
			if(!menu.noShow){
				var afterLen  = this.tabSize();
				this.adjustTabLength(afterLen -1,afterLen );
			}
		}
		}catch(e){
			
			debug("show error : " + e +" , " + e.message );
		}
	},
	resize:function(){
		var o =this.currTab;
		if(o)
			o.resize();
	},
	insertHead:function(){
		var menu = tm.menu[0];
		o = new this.TmTabClass(menu);		
		this.arr.include(o);
		o.showMeDefault(menu.domId,"",1);
	},
	maxLen:9,
	showLen:891,
	adjustTabLength:function(beforeLen,afterLen ){
		debug("beforeLen,"+ beforeLen +",afterLen "+afterLen );
		if(beforeLen == afterLen) return;
		var len;
		if(beforeLen>afterLen){
			if(beforeLen<=this.maxLen){
				return;
			}			
		}else{
			if(afterLen<=this.maxLen){
				return;
			}
		}
		len = this.showLen/afterLen;
		var count = 5;
		if(len>=99){
			count=5;
		}else if(len>=80){
				count=4;
		}else if(len>=70){
				count=3;
		}else if(len>=50){
				count=2;
		}else if(len>=30){
			count=1;
		}else{ 
			count=0;
		}
		
		debug("beforeLen,"+ len );
		
		this.arr.each(function(item,index){
			debug($type(item.tabDom) +" , " +index +" " + item.menu.name );
			if($type(item.tabDom) == "element"){
				item.tabDom.setStyle("width",len+"px");
			
				var aDom= item.aDom; 
				var t = aDom.get("title");
				var tlen = t.length;
				if(tlen<=count){
					aDom.set("html",t);
				}else{				
					aDom.set("html",t.substring(0,count)+".");
				}
			}
		});
		debug("beforeLen,"+ len );
	},
	destroy:function(url){
		if(!url){		
			return;		
		}		
		var menu =  tm.getSubMenu(url);
		var o= this.get(menu);
		
		if(!o) return;
		
		o.destroy();
		this.arr.erase(o);		
		if(this.currTab==o){
			o = this.arr.getLast();
			this.show(o.idArr[0],"");
		}
		var len = this.tabSize();
		this.adjustTabLength(len+1,len );
		
	},
	hideCurr:function(){
		if(Browser.Engine.trident4) return;

		if(!this.currTab) return;
		var t = this.currTab;
		if(t){
			t.hide();
		}else{
			debug("t is null, this.currId: ");
		}
	},	
	TmTabClass : new Class({
		initialize: function(m){			
			this.menu= m;
			this.idArr= m.idArr;
			this.tabStatus=0;//1:已经渲染了 tab,2:已经渲染 iframe, 3:都要渲染 位操作
		},
		hide:function(){
			this.frameDiv.setStyle("display","none");
			this._showTab(false);
		},
		destroy:function(){
			this.frameDiv.dispose();
			this.tabDom.dispose();
		},
		_showTab:function(b){
			
			var a = this.tabDom;
			if(this.menu.noShow){				
				a=$("t_search_div");				
			}
			
			var d0= a.getFirst();
			var d1= d0.getFirst();
			var d2= d1.getFirst();			
			if(b){
				d0.removeClass("t_tab_norl").addClass("t_tab_curl");
				d1.removeClass("t_tab_norm").addClass("t_tab_curm");
				d2.removeClass("t_tab_norr").addClass("t_tab_curr");
			}else{
				d0.removeClass("t_tab_curl").addClass("t_tab_norl");
				d1.removeClass("t_tab_curm").addClass("t_tab_norm");
				d2.removeClass("t_tab_curr").addClass("t_tab_norr");
			}
		},
		showMe:function(){
			this.frameDiv.setStyle("display","block");
			this._showTab(true);			
		},
		isNewUrl:function(url){
			debug("isNewUrl : " + url );
			if(url.length>2 && url.indexOf("_")>2 && url.substring(0,2)=="RA")
				return true;
			if(url.length>5 && (url.indexOf(":")>4 || url.indexOf("%3A")>4)  && url.substring(0,4)=="MGT_")
				return true;
			return false;
		},
		showMeDefault:function(url,q,action){
			var menu = this.menu;
			var go;
			if(!this.frame){
				debug("showMeDefault 02 menu.noShow: " + menu.noShow );
				if( (1&this.tabStatus)==0 && (1&action)==1){
					this.tabStatus = this.tabStatus|1;
					if(!Browser.Engine.trident4){
						if(menu.noShow){
							this.tabDom ="out";							
						}else{
							this._createTab(action,menu);	
						}
					}
				}
				
				if(menu.out){
					go = this._getOutUrl(menu,url);
					if(menu.idArr[0]=="igoal"){
						var len = url.indexOf("_");
						if(len>0){
							go += "&id="+url.substring(len+1);
						}						
					}else if(menu.idArr[0]=="MGT_CLIENT_NEIGHBOR"|| menu.idArr[0]=="MGT_ENC"){
						var len = url.indexOf(":");
						if(len>0){
							go += "&id="+url.substring(len+1);
						}						
					}else if(url == 'MGT_MY_ATTENDANCE'){
						go += "&place=MyAttendance";
					}else if(url == 'MGT_ATTENDANCE_STATISTICS'){
						go += "&place=attendStatistics";
					}
				}else{
					if(url =="MGT_CLIENT_SEARCH"){
						go =globalCp+"/systemSearch/iGoal/index.jsp?"+q;					 	
					}else{						
					 	go = globalCp+"/worktable.html?"+q;//工作台页面
					}
				}
				if(Browser.Engine.trident4){
					window.open(go);
					tm.tab.arr =[];
					return;
				}
				
				if( (2&this.tabStatus)==0 && (2&action)==2){
					this.tabStatus = this.tabStatus|2;
					//go ="http://www.jingoal.com";
					this.frame = new IFrame({			 
					    src: go,		 
					    styles: {
					        width: '100%',height: '100%',frameborder:'0',scrolling:'no',"border":"0"
					    }
					});
					this.frame.set("frameBorder","0");					
					
					debug(" url:" + go + " , $('tmmain') " + $('tmmain') );				
					/**var a = new Element("div",{
						styles: {width: '100%',height: '100%'}
					});;
					*/
					this.frameDiv = this.frame ;// new Element("div").adopt(a);
					$('tmmain').adopt(this.frameDiv);
				}
			}else{
				go = this._getOutUrl(menu,url);
				if(menu.idArr[0]=="igoal"){
					var len = url.indexOf("_");
					if(len>0){
						go = this._getOutUrl(menu,url)+"&id="+url.substring(len+1);
						this.frame.set('src',go);
					}
				}else if(menu.idArr[0]=="MGT_CLIENT_NEIGHBOR"|| menu.idArr[0]=="MGT_ENC"){
					var len = url.indexOf(":");
					if(len>0){
						go += "&id="+url.substring(len+1);
						this.frame.set('src',go);
					}
				}else if(this.isNewUrl(url)){					
					var go = globalCp+"/workdest.html?"+q;//工作台页面
					this.frame.set('src',go);
				} 				
			}
			if( (3&this.tabStatus)==3){
				this.showMe();
			}
			
		},
		_createTab:function(action,menu){
			
			var d0 = new Element("div",{
				"class":"menuli",
				styles:{
					"overflow": "hidden","white-space": "nowrap","width": "99px"
				}
			});
			
			var k ="cur";
			if(action==1) k="nor";
			var d1 = new Element("div",{
				"class":"t_tab_"+k+"l"
			});
			var d2 = new Element("div",{
				"class":"t_tab_"+k+"m"
			});
			var d3 = new Element("div",{
				"class":"t_tab_"+k+"r"
			});
			d2.adopt(d3);
			d1.adopt(d2);
			d0.adopt(d1);
			
			
			var closeA=null;
			var tid = this.idArr[0];
			if(tid!="h"){
				closeA= new Element('a',{
					"class":"close",
					'href':"javascript:void(0);",			
					'title':gVar.close
				});
				closeA.addEvent("click",function(event){
					event.stop();
					debug(" in closeA.addEvent ");
					this.destroy(tid);
				}.bind(tm.tab));
				d3.adopt(closeA);
			}
			var a1=  new Element('a',{					
				'href':"javascript:void(0);",			
				'html':menu.name,
				'title':menu.name
			});
			
			
			
			d0.addEvent("click",function(){
				debug(" in d0.addEvent ,show tid");
				this.show(tid,"");					
			}.bind(tm.tab));
			
			d3.adopt(a1);			
			$('menu').adopt(d0);
			this.tabDom =d0 ;
			this.aDom =a1 ;			
		},
		_getOutUrl:function(menu,url){
			var go = menu.url;
			var paramIndex = go.indexOf("?");
			if(paramIndex == -1){
				go += "?";
			}else if(paramIndex >= go.length){
				go +="&";
			}			
			go += "locale=" + global_language;
			return go;
		},
		resize:function(){
			this.frameDiv.setStyle("height","100%");
		}
	}),	
	get:function(menu){//得到对应的Tab
		var t=null;
		this.arr.each(function(item){
			if(item.menu == menu)
					t=item;				
		});
		return t;				
	}
};


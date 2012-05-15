<HTML>
<HEAD>
<META content=IE=7 http-equiv=X-UA-Compatible>
<SCRIPT language=javascript type=text/javascript>		
			var fulltestsearch={
				curpage : 1,
				pageMax : 10,
				curstart : new Array("0"),
				startTime : '',	
			    endTime : '',
			   	typeids : 'R',	//类型id,默认全部
			   	userIDs : '',	//要看的用户的id
			   	dutyIDs : '',//要看的部门的id
			   	userNames : '',
			   	dutyNames : '',
			   	selectidtype : 1, //选择人员范围的类型（全部/组织结构/职务）
			   	key : '',		//关键字
			   	duration : '',	//近几天的时间
			   	docFlag : 0     // 0:搜索所有,  1:只搜索内容,  2:只搜索文件
			};
			
			var curPageUser = {
				id : 1076575
			}
			function closePop3(){//为系统搜索服务
				mgtPopupClose({num:3});
			}
			//为igoal进入到具体模块服务
			function resizeHeight4igoal(){		
				//var box=$("box");
				var widthOffset=23;				
				
				var left=$("a_left");
				if($("i_left")){ //为沟通记录页面服务
					left=$("i_left");
				}
				var right=$("a_right");
				if($("i_right")){//为沟通记录页面服务
					right=$("i_right");
					widthOffset=13;
				}
				var iRightWidth=$("i_right_width");//为沟通记录页面服务
				
				var imRecordChat=$("imRecordChat");//为沟通记录页面服务
				
				var main=$("a_con");
				if($("i_middle")){//为沟通记录页面服务
					main=$("i_middle");
				}
				var ww=$('ww');//为沟通记录页面服务
				
				var wh=Window.getSize().y;
				var nh=wh-6;
				var aTopHeight = 8;
				if(left){
					nh = wh - left.getCoordinates().top -aTopHeight;
				}else if(right){
					nh = wh - right.getCoordinates().top -aTopHeight;
				}else if(imRecordChat){
					nh = wh - imRecordChat.getCoordinates().top -aTopHeight;
				}else if(main){
					nh = wh - main.getCoordinates().top -aTopHeight;
				}				
				
				if(nh<50) return;
				//if(box)box.setStyle("height",wh);
				if(left)left.setStyle("height",nh);
				var noScrollSet=true;
				if(right){
					right.setStyle("height",nh);
					if(Browser.Engine.trident4){
						noScrollSet=false;
						var len = (right.getStyle("margin-left")+"").toInt()+widthOffset;
						right.setStyle("width",window.getSize().x-len);
					}	
				}else if(imRecordChat){//为沟通记录页面服务
					imRecordChat.setStyle("height",nh);
					if(Browser.Engine.trident4){
						noScrollSet=false;
						var len = (imRecordChat.getStyle("margin-left")+"").toInt();
						imRecordChat.setStyle("width",window.getSize().x-len);
					}	
					$('imRecordChatContent').setStyle("width",window.getSize().x-widthOffset);
				}
				if(iRightWidth){//为沟通记录服务
					try{
						var iWidth = window.getSize().x;
						if(left){
							iWidth=iWidth-(left.getStyle("width")+"").toInt();
						}
						if(main){
							iWidth=iWidth-(main.getStyle("width")+"").toInt();
						}
						iWidth=iWidth-32;	
						iRightWidth.setStyle("width",iWidth);
					}catch(e){
						debug(e.name+";"+e.message+";"+e.error);
					}	
				}
				if(main){
					if($("i_middle")){//为沟通记录页面服务
						main.setStyle("height",nh + 3);
					}else{
						main.setStyle("height",nh + 6);	
					}
					if(Browser.Engine.trident4&&noScrollSet){						
						main.setStyle("width",window.getSize().x-widthOffset);
					}
				};	
				if(ww){//为沟通记录页面服务
					ww.setStyle("height",nh-100);
				}
				
			}
			
			//因为加入知识框口太大，所以需要动态设置
			function toggleOverflow(hidden){
				debug("come into toggleOverflow and hidden=="+hidden);
				if(hidden){
					$(document.body).setStyles({"overflow-x":"hidden","overflow-y":"hidden"});	
				}else{
					$(document.body).setStyles({"overflow-x":"auto","overflow-y":"auto"});
				}
			}
			//以为现在是在div内部的滚动条,所以这里重写了scroll方法
			function scroll(x,y){
				if($("a_con")){
					$("a_con").scrollLeft=x;
					$("a_con").scrollTop=y;
				}
				if($("a_right")){
					$("a_right").scrollLeft=x;
					$("a_right").scrollTop=y;
				}
			}
		</SCRIPT>
</HEAD>
<BODY onload=initMainIndex(); onresize='setTimeout("resizeHeight4igoal()",300);'>
<DIV style="Z-INDEX: 19700; POSITION: absolute; TOP: -1970px; LEFT: -1970px">
  <IFRAME style="WIDTH: 180px; HEIGHT: 197px" border=0 src="/mgt/scripts/My97DatePicker/My97DatePicker.htm" frameBorder=0 scrolling=no></IFRAME>
</DIV>
<DIV style="Z-INDEX: 3; POSITION: absolute; DISPLAY: none" id=id_of_blind>
  <DIV class=sucs>
    <DIV class="ico_le cprom_sico"></DIV>
    <SPAN id=id_of_blind_content></SPAN></DIV>
</DIV>
<DIV style="DISPLAY: none" id=mgtAlertDivId class=pop_win>
  <TABLE style="WIDTH: 355px" class=bdy border=0 cellSpacing=0 cellPadding=0>
    <TBODY>
      <TR>
        <TD class=fl_le></TD>
        <TD class=ptop><B id=icoSw class=icoSw></B><SPAN id=alertTitle>系统提示</SPAN> <A id=btnSysInfoClose class=btn_cls title=关闭 href="javascript:mgtMsgBox.close('alert');"></A></TD>
        <TD class=fl_ri></TD>
      </TR>
      <TR>
        <TD class=le_bo></TD>
        <TD class=bdy_ctn><DIV class=ote>
            <TABLE>
              <TBODY>
                <TR>
                  <TD width=20>&nbsp;</TD>
                  <TD><BR>
                    <B id=icoIfo class=ico_ifo></B><BR></TD>
                  <TD><SPAN class=alertContentClass></SPAN></TD>
                </TR>
              </TBODY>
            </TABLE>
          </DIV></TD>
        <TD class=ri_bo></TD>
      </TR>
      <TR>
        <TD class=bfl_le></TD>
        <TD class=bot><DIV class=fr>
            <INPUT id=buttonOk class=btn_sty onClick="mgtMsgBox.close('alert');" value=确定 type=button>
          </DIV></TD>
        <TD class=bfl_ri></TD>
      </TR>
    </TBODY>
  </TABLE>
</DIV>
<DIV style="DISPLAY: none" id=mgtConfirmDivId class=pop_win>
  <TABLE style="WIDTH: 355px" class=bdy border=0 cellSpacing=0 cellPadding=0>
    <TBODY>
      <TR>
        <TD class=fl_le></TD>
        <TD class=ptop><B id=icoSw class=icoSw></B><SPAN id=confirmTitle>系统提示</SPAN> <A id=btnSysInfoClose class=btn_cls title=关闭 onClick="mgtMsgBox.close('confirm',false);" href="javascript:void(0)"></A></TD>
        <TD class=fl_ri></TD>
      </TR>
      <TR>
        <TD class=le_bo></TD>
        <TD class=bdy_ctn><DIV class=ote>
            <TABLE>
              <TBODY>
                <TR>
                  <TD width=20>&nbsp;</TD>
                  <TD><BR>
                    <B id=icoIfo class=ico_ifo></B><BR></TD>
                  <TD><SPAN class=alertContentClass></SPAN></TD>
                </TR>
              </TBODY>
            </TABLE>
          </DIV></TD>
        <TD class=ri_bo></TD>
      </TR>
      <TR>
        <TD class=bfl_le></TD>
        <TD class=bot><DIV class=fr>
            <INPUT id=confirmOk class=btn_sty onClick="mgtMsgBox.close('confirm',true);" value=确定 type=button>
            <INPUT class=btn_sty onClick="mgtMsgBox.close('confirm',false);" value=取消 type=button>
          </DIV></TD>
        <TD class=bfl_ri></TD>
      </TR>
    </TBODY>
  </TABLE>
</DIV>
<IFRAME style="Z-INDEX: 1; POSITION: absolute; DISPLAY: none" id=hiddenIfram marginHeight=0 src="javascript:false" frameBorder=0 width=1 marginWidth=0 scrolling=no> </IFRAME>
<IFRAME style="Z-INDEX: 1; POSITION: absolute; FILTER: Alpha(opacity=0.1); DISPLAY: none; opacity: 0.1" id=growIdIfram marginHeight=0 src="javascript:false" frameBorder=0 width=1 name=growIdIfram marginWidth=0 scrolling=no> </IFRAME>
<!-- 效果掸出层  iframe操作-->
<SCRIPT language=javascript type=text/javascript>//为即时通讯服务

	eimserver_u = 'admin@7065110';
	eimserver_p = 'd7f0c8b59b78b2dc7e1cc772a52e53273bf8af5e';	
	eimserver_meId = 1076575;
	eimserver_name = '管理员';
	version = '20111219';
	var mGlobal={};
	
//下拉菜单操作 结束
	window.addEvent("load",  function(){		
		validatorItemHash.init();
		mgtShow = new mgtShowClass();
		mgtMenu = new mgtMenuClass();
	});
	function showOnline(){
		dwrService.getCompanyName(268328, toShowOnline );
	};
	/*function toShowOnline(cName){
		try{
			var url = globalCp +"/login/online/main.jsp?mgtUser="+encodeURI('268328@@管理员')+"&cid=2&cName="+encodeURI(cName);
			var sub = "fullscreen=2,width=500,height=400,top="+screen.height/3+",left="+screen.width/3+",toolbar=0,location="+(common_is_ie?0:1)+",status=1,menubar=0,resizable=0,scrollbars=0";
			window.open(url,"在线客服",sub);
		}catch(ex){}
	};*/
	
	window.defaultStatus ="实践目标管理";
	
	var userInfo={
		userName:'admin',
		email:'lifuan.china@gmail.com'
	};
	var _mgtToolBarClass=  new Class({
		DELAY_MINUTE :1000*600,
		mgtAutoNum:0,
		mgtToolBarDelay:null,
		oData:{"onlineUserIds":[]},
		send: function(){
			new Request.JSON({
				url: '/mgt/login/tools/top_oper.data.jsp?online_ids_stamp=' + online_ids_stamp + '&cid='+268328+'&t=' + new Date().getTime(),
				method: 'get',
				onSuccess: this.callback.bind(this),
				onFailure: function(json, text) {
					if(this.mgtAutoNum < 4)	{									
						this.mgtAutoNum++;
					}else{
						if(this.mgtToolBarDelay){
							 $clear(this.mgtToolBarDelay);
						}
						debug("top_oper.jsp too many error,so give up , error num: " + this.mgtAutoNum );
					}
				}.bind(this)
			}).send();
		},
		callback: function(data){
			if(data) {				
				if (data.onlineUser.stamp>0) {
					online_ids_stamp = data.onlineUser.stamp;		
					this.oData.onlineUserIds = data.onlineUser.userIds;
					this.updateUbcomm(this.oData.onlineUserIds);
					//debug('stamp update');
				}
			}
		},
		next : function(data){
			if(data){
				this.callback(data);
			}
			if(this.mgtToolBarDelay){
				 $clear(this.mgtToolBarDelay);
			}	
			
			this.mgtToolBarDelay = this.send.periodical( this.DELAY_MINUTE,this);
		},
		/*更新无不不在的沟通的图标状态*/
		updateUbcomm : function(userIds){
			$(document.body).getElements('a.ub_comm').each(
				function(a){
					var isOnline = false;
					if(userIds.contains(a.getProperty('rel'))){
						isOnline = true;
					};		
					if(isOnline){
						a.getPrevious('b').setProperty('class', 'ico_le sys_awake_cl');
					}else{
						a.getPrevious('b').setProperty('class', 'ico_le ub_offline_ico');
					}					
				}	
			);
		}
	});
	mgtToolBar = new _mgtToolBarClass();
	mgtToolBar.send();
	//为mgt-system服务
	Cookie.write('lang', 'zh_CN',{'path':'/'});
	
	// 把时区信息设置到cookie里
	Cookie.write("timeZone", (-new Date().getTimezoneOffset()*60000));
	//主要为web im 服务、在线客服，控制当前只有一个打开的窗口
	function mgtWindowOpen(url){
		try{
			//向cookie里面放imWindow
			Cookie.write("mgtImWindow","mgtImWindow");
			//2秒后，如果还能取到imWindow ，那么说明当前没有打开的im窗口
			setTimeout(function(){
				var mgtImWindow = Cookie.read("mgtImWindow");
				if(mgtImWindow){
					Cookie.dispose("mgtImWindow");
					window.open(url);
				}
			},2000);
		}catch(e){
			debug(e.name+";"+e.message+";"+e.error);
		}
	}
</SCRIPT>
<DIV style="BACKGROUND: #f2f9ff" id=box>
  <DIV id=mainBody>
    <INPUT type=hidden>
    <SCRIPT>
logs = {
	currentPage : 1,
	beginTime: "",
	endTime: "",
	requestType: "",
	year: "",
	month:"",
	index:0,
	isEnd:"",
	init: function(){
		this.currentPage=1;		
		this.beginTime="";
		this.endTime="";
		this.requestType="";	
		this.year= "";
		this.month="";
		this.index=0;
		this.isEnd="";	
	},
	listParam: function(curr){
		curr = curr || this.currentPage;
		var arr = new Array(),len=0;
		arr[len++]="currentPage=";
		arr[len++]=curr;
		arr[len++]="&beginTime=";
		arr[len++]=this.beginTime;
		arr[len++]="&endTime=";
		arr[len++]=this.endTime;
		arr[len++]="&requestType=";
		arr[len++]=this.requestType;
		arr[len++]="&year=";
		arr[len++]=this.year;
		arr[len++]="&month=";
		arr[len++]=this.month;
		arr[len++]="&index=";
		arr[len++]=this.index;
		arr[len++]="&isEnd=";
		arr[len++]=this.isEnd;
		
		return arr.join("");
	},
	changePage: function(page){
		this.currentPage = page;
		showMyLogList();
	}
};
Compass.call(logs);

pendingMatter = {
	currentPage : 1,
	startDate : "",
	endDate : "", 
	search:0,//是否显示时间查询的输入框.1：显示，0：不显示
	label:-1,//-1:所有,0:未标注,1已标注
	status:-1,//-1：所有,0:未完成,1已完成
	init: function(){
		this.currentPage=1;		
		this.startDate="";
		this.endDate="";	
		this.search=0;	
		label:-1;
		status:-1;
	},
	listParam: function(){
		var arr = new Array(),len=0;
		arr[len++]="currentPage=";
		arr[len++]=this.currentPage;
		arr[len++]="&beginDate=";
		arr[len++]=this.startDate;
		arr[len++]="&endDate=";
		arr[len++]=this.endDate;
		arr[len++]="&search=";
		arr[len++]=this.search;
		arr[len++]="&label=";
		arr[len++]=this.label;
		arr[len++]="&status=";
		arr[len++]=this.status;
		return arr.join("");
	},
	changePage: function(page){
		this.currentPage = page;
		showPendingMatterList();
	},
	listPage : function(){
	    this.search=1;  
	    this.currentPage=1;
		showPendingMatterList();
	},
	cancelButton:function(){
	    this.startDate="";
	    this.endDate="";
	    this.search=0;
		smartToggle($('dateFilterIconDiv'));
   	    smartToggle($('dateFilterDiv'));
   	    showPendingMatterList();
	}
};
TimeSpan.call(pendingMatter);

//mouse 1:鼠标无手;!1鼠标有手.flag   1:本条记录正在编辑;0：未编辑状态
//s有时间应该去掉，
overTrStyle = function(obj,s,mouse,flag){
	
	if(flag) {
		if($(flag).value==1){return ;}
	}
	if($(s) && $(s).style.visibility){
		$(s).style.visibility='visible';
	}else if($(s)){
		$(s).setStyle("display","");
	}
	var currColor = mouse ==1?'trbgcolor0':'trbgcolor3';
	$(obj).addClass(currColor);
}

outTrStyle = function(obj,s,mouse){
	if($(s)&&$(s).style.visibility){
		$(s).style.visibility='hidden';
	}else if($(s)){
		$(s).setStyle("display","none");
	}
	var currColor = mouse ==1?'trbgcolor0':'trbgcolor3';
	$(obj).removeClass(currColor);
}
</SCRIPT>
    <DIV id=a_top>
      <DIV class=t_log_tabs>
        <UL>
          <LI class=cur onClick="showModule('/worklog/mylog/index.jsp');">我的日志</LI>
          <LI onClick="showModule('/worklog/commentlog/index.jsp');">评阅日志</LI>
        </UL>
      </DIV>
    </DIV>
    <DIV style="WIDTH: 200px; HEIGHT: 440px" id=a_left>
      <DIV style="BORDER-BOTTOM: 0px; BACKGROUND: none transparent scroll repeat 0% 0%; HEIGHT: 440px" id=leftPaneMain class=tree_div_border>
        <!-- 
<div class="tibg">
	<b class="ico_le flog_view_ico"></b>&nbsp;<span style="line-height: 3.0">日历显示</span>
</div>
 -->
        <DIV id=t_left class=t_left>
          <?php $this->widget("application.widgets.LogCalendar");?>
          <DIV id=time_depl_show class=time_depl_oper><B class="ico_le ltime_span_ico"></B><A class=unline_b onClick="javascript:changeCalendarDisplayState('time_depl_show','time_depl_hide');" href="javascript:void(0)">自定义时间跨度列表显示</A> </DIV>
          <DIV style="DISPLAY: none" id=time_depl_hide class=time_depl_oper><B class="ico_le ltime_span_ico"></B><A class=unline_b onClick="javascript:changeCalendarDisplayState('time_depl_hide','time_depl_show');" href="javascript:void(0)">自定义时间跨度列表隐藏</A> </DIV>
          <DIV style="DISPLAY: none" id=time_depl class=time_depl>
            <P class=ti>自定义时间选择</P>
            <DIV>&nbsp;&nbsp;从&nbsp;
              <INPUT id=begindate class=Wdate onFocus="var begin1334563509003=$dp.$('enddate');WdatePicker({onpicked:function(){begin1334563509003.focus();}, maxDate:'#F{$dp.$D(\'enddate\')}'})" size=12>
            </DIV>
 
            <DIV>&nbsp;&nbsp;至&nbsp;
              <INPUT id=enddate class=Wdate onFocus="WdatePicker({minDate:'#F{$dp.$D(\'begindate\')}'})" size=12>
            </DIV>
            <BR>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <INPUT class=btn_sty onClick="javascript: submitTime();" value=提交 type=button>
            &nbsp;
            <INPUT class=btn_sty onClick="javascript: cancelTime();" value=重置 type=button>
          </DIV>
          <DIV class=calendar_expl>
            <UL>
              <LI class=blue_box></LI>
              <LI>有日志</LI>
              <LI class=gray_box></LI>
              <LI>无日志</LI>
              <LI class=foc_box></LI>
              <LI>选中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</LI>
              <LI class=yell_box></LI>
              <LI>今日日志</LI>
              <LI class=comm_box></LI>
              <LI>有评论</LI>
            </UL>
            <DIV class=cb></DIV>
          </DIV>
          <DIV class=noread_ti>
            <LI class=ti>&nbsp;最新评论</LI>
            <LI class=more><A class=unline onclick=initWeekStatus();freshCommentMore(); href="javascript:void(0);">&gt;&gt;更多</A></LI>
          </DIV>
          <UL class=log_comm_li>
            <LI onmouseover="this.className='trcolor';" onmouseout="this.className='';" onclick=javascript:contentView(2778204)>
              <DIV class=cont_text><A href="javascript:void(0);">评论一</A></DIV>
              <DIV class=cdate>04-16</DIV>
            </LI>
            <LI onmouseover="this.className='trcolor';" onmouseout="this.className='';" onclick=javascript:contentView(2778204)>
              <DIV class=cont_text><A href="javascript:void(0);">评论二</A></DIV>
              <DIV class=cdate>04-16</DIV>
            </LI>
            <LI onmouseover="this.className='trcolor';" onmouseout="this.className='';" onclick=javascript:contentView(2778204)>
              <DIV class=cont_text><A href="javascript:void(0);">评论三</A></DIV>
              <DIV class=cdate>04-16</DIV>
            </LI>
            <LI onmouseover="this.className='trcolor';" onmouseout="this.className='';" onclick=javascript:contentView(2778204)>
              <DIV class=cont_text><A href="javascript:void(0);">评论四</A></DIV>
              <DIV class=cdate>04-16</DIV>
            </LI>
          </UL>
          <SCRIPT>
function contentView(worklogId){
	initWeekStatus();
	logs.setCompass("2778204", '1');
	var dwr = new DwrBackCall();
	dwr.addOneUrl('/worklog/mylog/content.jsp?requestType=fromCommnet&id='+worklogId, 'rightPaneMain');
	dwr.dwrProxy();
}
</SCRIPT>
        </DIV>
        <SCRIPT>
setTimeout( function(){
		setLeftHeight("leftPaneMain");
	},500);
</SCRIPT>
      </DIV>
    </DIV>
    <DIV style="BACKGROUND: white; MARGIN-LEFT: 208px">
      <DIV style="WIDTH: 99%" id=rightPaneMain>
        <DIV class=log_rtop><SPAN><SPAN class=fr><A class=unline onclick=exportToExcel(); href="javascript:void(0);">导出</A> | <A class=unline onclick=showPendingMatterList(); href="javascript:void(0);">日计划列表</A> </SPAN><A class=unline onClick="showModule('/worklog/mylog/index.jsp');" href="javascript:void(0);">今天（04月16日）</A> <SPAN class=lmr><A class=unline onClick="javascript:changeDay('2012','3','15','15');" href="javascript:void(0);">上一天</A> | <B>2012年04月16日&nbsp;(星期一)</B> | <A class=unline onClick="javascript:changeDay('2012','3','17','17');" href="javascript:void(0);">下一天</A> </SPAN></SPAN></DIV>
        <TABLE class="rtable_2colorrows tb" border=0 cellSpacing=1 cellPadding=3>
          <TBODY>
            <TR>
              <TH class=rt width="10%">&nbsp;</TH>
              <TH class=wh colSpan=2>详细内容</TH>
              <TH width="20%" colSpan=2>编辑时间</TH>
            </TR>
            <TR style="DISPLAY: none" id=supplementLog class=trbgcolor1>
              <TD class=td_break colSpan=5><DIV id=addSupplementFormId class=log_dialog>
                  <DIV class=renew_ti>补充日志</DIV>
                  <TEXTAREA id=supplementContent class="size required validate-length-range-0-10000"></TEXTAREA>
                  <DIV class=cb></DIV>
                  <DIV class=refer>
                    <INPUT class=btn_sty onmousedown=submitSupplementLog(); value=提交 type=button>
                    <INPUT class=btn_sty onmousedown=javascript:cancelSubmitSupplementLog(); value=取消 type=button>
                    <SPAN class=remark_g>补充的日志，今天之内还能编辑</SPAN> </DIV>
                </DIV></TD>
            </TR>
            <!-- today plan -->
            <TR vAlign=top>
              <TD class=staff_frm align=center>今日计划</TD>
              <TD id=pending_box colSpan=4><DIV id=pend_title_div onMouseOver="overTrStyle(this,'add_pending_button',2);" onMouseOut="outTrStyle(this,'add_pending_button',2);" onClick="showAddPendingMatter(0,1334840801493,'edit_pend_div0','pend_title_div');">
                  <TABLE class=tb border=0 cellSpacing=0 cellPadding=0 width="100%">
                    <TBODY>
                      <TR vAlign=top>
                        <TD class="td_break staff_frm" colSpan=3><A href="javascript:void(0);">&gt;&gt;添加今日计划</A></TD>
                        <TD class=staff_frm width="10%">&nbsp;<SPAN style="DISPLAY: none" id=add_pending_button class="td_break remark_g fr">&nbsp;</SPAN></TD>
                      </TR>
                    </TBODY>
                  </TABLE>
                </DIV>
                <DIV style="DISPLAY: none" id=edit_pend_div0 class=log_dialog></DIV></TD>
            </TR>
            <!-- mylog -->
            <TR id=log_content_tr class=staff_frm vAlign=top>
              <TD class="td_break staff_frm" align=center>工作记录</TD>
              <TD id=log_box colSpan=4><DIV id=mylog_title_div onMouseOver="overTrStyle(this,'clickedit',2);" onMouseOut="outTrStyle(this,'clickedit',2);" onClick="showAddMiddLog('2','edit_middel_div','mylog_title_div');">
                  <TABLE class=tb border=0 cellSpacing=0 cellPadding=0 width="100%">
                    <TBODY>
                      <TR vAlign=top>
                        <TD class="td_break staff_frm" colSpan=3><A href="javascript:void(0);">&gt;&gt;工作记录</A></TD>
                        <TD class=staff_frm width="10%">&nbsp;<SPAN style="DISPLAY: none" id=clickedit class="td_break remark_g fr">&nbsp;</SPAN></TD>
                      </TR>
                    </TBODY>
                  </TABLE>
                </DIV>
                <DIV style="DISPLAY: none" id=edit_middel_div class=log_dialog></DIV></TD>
            </TR>
            <!-- mylong end -->
            <TR vAlign=top>
              <TD class="td_break staff_frm rt" align=center>工作小结</TD>
              <TD id=end_box colSpan=4><DIV id=mylogend_title_div onMouseOver="overTrStyle(this,'edit_end_button',2);" onMouseOut="outTrStyle(this,'edit_end_button',2);" onClick="showAddMiddLog('3','add_end_div','mylogend_title_div');">
                  <TABLE class=tb border=0 cellSpacing=0 cellPadding=0 width="100%">
                    <TBODY>
                      <TR vAlign=top>
                        <TD class="td_break staff_frm" colSpan=3><A href="javascript:void(0);">&gt;&gt;工作小结</A></TD>
                        <TD class=staff_frm width="10%">&nbsp;<SPAN style="DISPLAY: none" id=edit_end_button class="td_break remark_g fr">&nbsp;</SPAN></TD>
                      </TR>
                    </TBODY>
                  </TABLE>
                </DIV>
                <DIV style="DISPLAY: none" id=add_end_div class=log_dialog></DIV></TD>
            </TR>
            <TR vAlign=top>
              <TD class="td_break staff_frm rt" align=center>&nbsp;&nbsp;&nbsp;&nbsp;附件</TD>
              <TD colSpan=4 align=left><DIV id=annex_content>
                  <DIV id=annex_op_div>
                    <DIV id=annex_title_div onMouseOver="overTrStyle(this,'add_attach_button',2);" onMouseOut="outTrStyle(this,'add_attach_button',2);" onClick="editMyAnnex('0', false)">
                      <TABLE class=tb border=0 cellSpacing=0 cellPadding=0 width="100%">
                        <TBODY>
                          <TR vAlign=top>
                            <TD class="td_break staff_frm" colSpan=3><A href="javascript:void(0);">&gt;&gt;添加附件</A></TD>
                            <TD class=staff_frm width="10%">&nbsp;<SPAN style="DISPLAY: none" id=add_attach_button class="td_break remark_g fr">&nbsp;</SPAN></TD>
                          </TR>
                        </TBODY>
                      </TABLE>
                    </DIV>
                  </DIV>
                  <TABLE class=tb border=0 cellSpacing=0 cellPadding=0 width="100%">
                    <TBODY>
                      <TR>
                        <TD class="staff_frm rt" colSpan=2><LINK rel=Stylesheet type=text/css href="/mgt/styles/mergedstyle.css?version=20111219" media=all>
                          &nbsp; </TD>
                      </TR>
                    </TBODY>
                  </TABLE>
                  <SCRIPT>
function deleteWorklogAnnex(relationId) {
    var logId='0'
	var dwr = new DwrBackCall();
	dwr.addOneUrl('/worklog/mylog/attachItem.jsp?id='+logId, 'annex_content');

	dwrService.removeWorkLogAttachment(relationId, dwr.getAllUrls(),dwr.backToDwrUrls.bind(dwr));
}

</SCRIPT>
                </DIV></TD>
            </TR>
          </TBODY>
        </TABLE>
        <DIV class=renew_log>
          <!--日志补充 -->
          <DIV id=supplements></DIV>
          <!--阅读记录 -->
          <DIV id=viewLogs></DIV>
        </DIV>
        <DIV style="POSITION: absolute; DISPLAY: none" id=log_calendar class=log_calendar><SPAN class=remark_g>转移日期：</SPAN>
          <INPUT id=todaytime value=2012-04-16 type=hidden>
          <INPUT id=indivFireDate class=Wdate onFocus="WdatePicker({minDate:'#F{$dp.$D(\'todaytime\')}'})" size=18>
          <DIV class=cb></DIV>
          <INPUT id=log_calendar_del_flag value="" CHECKED type=checkbox>
          <SPAN style="CURSOR: pointer" onClick="extendCheck('log_calendar_del_flag');">删除本条 </SPAN>
          <INPUT id=log_calendar_del_id type=hidden>
          <DIV class=conf>
            <INPUT id=person_modify class=btn_sty onclick=submitMoveDay(); value=提交 type=button>
            <INPUT class=btn_sty onclick=hideMoveDayDiv() value=取消 type=button>
          </DIV>
        </DIV>
        <SCRIPT>
var commentValidate ;

function addComment(mylogid) {
	getHtmlEditorContent('commentContent');
	if(!commentValidate.validate()) return;
	
	var id = mylogid;
	var dwr = new DwrBackCall();
	dwr.addOneUrl('/worklog/mylog/mylog_review_list.jsp?id='+id, 'commentDiv');
	dwr.backCallFunc = function(){
		//scrollTo(0,100000);  因为执行后页面会向上顶一部分，所以暂时评比
	}
	dwrService.worklogAddComment(id, trim($("commentContent").value), dwr.getAllUrls(),dwr.backToDwrUrls.bind(dwr));
};

function modifyComment(mylogId,comId) {
	getHtmlEditorContent('commentContent');
	if(!commentValidate.validate()) return;
		
	
	this.NextStep = function(){
		var dwr = new DwrBackCall();
		dwr.addOneUrl('/worklog/mylog/mylog_review_list.jsp?id='+mylogId, 'commentDiv');
		dwr.backCallFunc = function(){
			$('commentEditdiv').scrollTo(0,0); 
		}

		dwrService.modifyComment(mylogId,comId, trim($("commentContent").value), dwr.getAllUrls(), function(m){
			dwr.backToDwrUrls(m);
		});
	}
	confirm(Resource.common.areyousure, this);
}
function editComment(comId) {
	commentValidate=new Validate('commentForm');
	mylogId=2778204;
	if(comId>0){modifyComment(mylogId,comId);}
	else{addComment(mylogId) ;}
	
}
function showEditComment(id) {
	var url = "/worklog/mylog/editComment.jsp?commentId="+id;
	var dwr = new DwrBackCall();
	dwr.backCallFunc = function(){
		htmlEditorFocus();
	}
	dwr.addOneUrl(url, "commentEdit");
	dwr.dwrProxy();
}
function cancelComment() {
	var url = "/worklog/mylog/mylog_review_list.jsp?id=2778204";
	var dwr = new DwrBackCall(); 
	dwr.backCallFunc = function(){
		scrollTo(0,0);
	}
	dwr.addOneUrl(url, "commentDiv");
	dwr.dwrProxy();
}
</SCRIPT>
      </DIV>
      <DIV class=cb></DIV>
      <SCRIPT>
function showMoveDayDiv(id,fromEvent) {
	var from = $(fromEvent);
	var moveDiv = $("log_calendar");
	$("log_calendar_del_id").value=id
	moveDiv.style.top =(from.getCoordinates().top + 15) + "px";
	moveDiv.style.left = (from.getCoordinates().left-200) + "px";
	moveDiv.setStyle("display","");
};
function hideMoveDayDiv (){
	$("log_calendar").setStyle("display","none");
	$("indivFireDate").value='';
	$('log_calendar_del_flag').checked=true;
}
function submitMoveDay () {
  var id = $("log_calendar_del_id").value;
  var datestr = $("indivFireDate").value.split('-');
  var date = new Date(datestr[0],datestr[1]-1,datestr[2]);
  var time = date.getTime();
  var del = $('log_calendar_del_flag').checked;
  var currDate = '2012-04-16';
  var dwr = new DwrBackCall();
  dwr.backCallFunc = function(m){
  	if(del&&m.id&&m.id!=-1){
  		$('pend_content_'+id).dispose();
  		if(currDate==$("indivFireDate").value){
  			createPlanDiv('1334563508996',m.id,'edit_pend_div_button');
		}
  	}else if(!del&&currDate==$("indivFireDate").value&&m.id!=-1){
  		createPlanDiv('1334563508996',m.id,'edit_pend_div_button');
  	}
  	$("log_calendar").setStyle("display","none");
  	$("indivFireDate").value='';
  	$('log_calendar_del_flag').checked=true;
  }
  if(time) {
  	dwrService.updatePendingMatterMoveDate(time,id,del,dwr.getAllUrls(),dwr.backToDwrUrls.bind(dwr));
  }else{
  	alert("请选择时间");
  }
};


//-----今日计划编辑----//
function submitPending(sn,id,curr,show){
	if( id<=0&&$("addLogDate").value == ""){
			alert("请选择时间", this);
			return;
	}
	if(trim($('myPendingContent_'+id).value) == "") {
		$("validateMylog_"+id).value = "0";
	} else {
		$("validateMylog_"+id).value = "1";
	}
	$("validateMylog_"+id).value = trim($('myPendingContent_'+id).value);
	$("examinContent_"+id).value = trim($('myPendingContent_'+id).value);
	validatePop = new Validate('myLogForm_'+id);
	if(!validatePop.validate()) return;
    var currTime = curr;
    if(id<=0) {
    	var currStr = document.getElementById("addLogDate").value.split('-');
		var currDate = new Date(currStr[0],currStr[1]-1,currStr[2]);
		currTime = currDate.getTime()
	}
	var pendingMatter = {
		id:id,
		type:1,
		typeId:currTime,
		content:trim($('myPendingContent_'+id).value)
  	 };
    var ccc = 1334563508996;
	if(id>0) {
		editPendingMatter(pendingMatter,currTime);
	}else{
		if(sn!=1){$('pend_title_div').setStyle("display","");}
		if(ccc==currTime||(currTime<ccc&&ccc<currTime+1000*60*60*24)){ //currTime>logDateValue
			addPendingMatter(sn,pendingMatter,currTime,show);
		}else{
			addPendingMatterOtherDay(sn,pendingMatter,currTime,show);
		}
	}
}
function addPendingMatter(sn,pendingMatter,currTime,show) {
	var dwr = new DwrBackCall();
	dwr.backCallFunc = function(m){
		var temp = document.createElement("div");
		var disDiv = document.createElement("div");
		var id=m.id;
		disDiv.id="edit_pend_div"+id;
		disDiv.style.display="none";
		temp.id="pend_content_"+id;
		temp.innerHTML='';
		disDiv.innerHTML='';
		
		$('pending_box').appendChild(temp);
			
		var dwr1=new DwrBackCall();
		dwr1.backCallFunc = function(){
			temp.addEvent('mouseover', function(){overTrStyle(temp,'work_pend_operate'+id,1,'is_operateing_'+id);});
	  		temp.addEvent('mouseout', function(){outTrStyle(temp,'work_pend_operate'+id,1,'is_operateing_'+id);});
		}
		dwr1.addOneUrl("/worklog/mylog/pendingItem.jsp?pendingId="+m.id+"&currTime"+currTime, 'pend_content_'+m.id);
		dwr1.dwrProxy();
		if($(show)){
			$(show).setStyle("display","");
		}
		createPlanDiv(currTime,m.id,show);
		refreshReview(m.worklogId);
	}
	dwrService.addPendingMatter(pendingMatter,  dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
	if(sn>0){
		$('myPendingContent_'+pendingMatter.id).focus();
		$('myPendingContent_'+pendingMatter.id).value='';
		
	}else {
		$('edit_pend_div0').setStyle("display","none");
	}
}
function createPlanDiv(currTime,mid,show) {
	var temp = document.createElement("div");
	var disDiv = document.createElement("div");
	var id=mid;
	disDiv.id="edit_pend_div"+id;
	disDiv.style.display="none";
	temp.id="pend_content_"+id;
	temp.innerHTML='';
	disDiv.innerHTML='';
		
	$('pending_box').appendChild(temp);
			
	var dwr1=new DwrBackCall();
	dwr1.backCallFunc = function(){
	 	temp.addEvent('mouseover', function(){overTrStyle(temp,'work_pend_operate'+id,1,'is_operateing_'+id);});
	  	temp.addEvent('mouseout', function(){outTrStyle(temp,'work_pend_operate'+id,1,'is_operateing_'+id);});
	}
	dwr1.addOneUrl("/worklog/mylog/pendingItem.jsp?pendingId="+id+"&currTime"+currTime, 'pend_content_'+id);
	dwr1.dwrProxy();
	if($(show)){
		$(show).setStyle("display","");
	}
}
function addPendingMatterOtherDay(sn,pendingMatter,currTime,show) {
	var dwr = new DwrBackCall();

	dwrService.addPendingMatter(pendingMatter,  dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
	if(sn>0){
		$('myPendingContent_'+pendingMatter.id).focus();
		$('myPendingContent_'+pendingMatter.id).value='';
	}else {
		$('edit_pend_div0').setStyle("display","none");
	}
}
function editPendingMatter(pendingMatter,currTime){	
	var dwr = new DwrBackCall();
	dwr.addOneUrl("/worklog/mylog/pendingItem.jsp?pendingId="+pendingMatter.id+"&currTime"+pendingMatter.currTime, 'pend_content_'+pendingMatter.id);
	dwrService.updatePendingMatterContent(pendingMatter.content,pendingMatter.id, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
	$('edit_pend_div'+pendingMatter.id).setStyle("display","none");
}

function submitByCtrlAndShift(oEvent,id,currTime) {
	if(oEvent.ctrlKey && oEvent.keyCode==13) {
		submitPending(-1,id,currTime);
	}
}

cancelPending = function (id,show){
	if($('tr_edit_pend_div'+id)){$('tr_edit_pend_div'+id).setStyle("display","none");}
	$('edit_pend_div'+id).setStyle("display","none");
	if(id<=0){$('pend_title_div').setStyle("display","");}
	if($('is_operateing_'+id)){$('is_operateing_'+id).value=0;}
	if($(show)){
		$(show).setStyle("display","");
	}
}

function logsInitButtons () {
	var type = 'init';
	if('fromTimeSpan' == type || 'fromCommnet' == type) {
		logs.setCallUrl("/mgt/worklog/mylog/content_list.jsp?callBack=true&"+logs.listParam('{curr}'));
	}
	if('fromCommnet' == type) {
		logs.initButtons("0", "showDwrPage('/worklog/mylog/content.jsp?requestType=fromCommnet&id={id}', 'rightPaneMain');");
	} else if('fromWeek' ==type){
		logs.initButtons("0", "showDwrPage('/worklog/mylog/content.jsp?requestType=fromWeek&id={id}&year=' + null + '&month=' + null + '&beginTime=' + null + '&endTime=' + null + '&index=' + null + '&isEnd=' + null, 'rightPaneMain');");
	}else if('fromTimeSpan' ==type){
		logs.initButtons("0", "showDwrPage('/worklog/mylog/content.jsp?requestType=fromTimeSpan&id={id}&&beginTime=' + null + '&endTime=' + null, 'rightPaneMain');");
	}
}

function refreshReview(id) {
	var dwr = new DwrBackCall();
	dwr.addOneUrl('/worklog/mylog/mylog_review_list.jsp?id='+id, 'commentDiv');
	dwr.dwrProxy();
}
logsInitButtons();

//补充日志
function supplementLog(){
	$('supplementLog').style.display='';
	$('supplementContent').value='';
	//展开添加日志补充部分后，置灰“补充日志”按钮
	$('addSupplementButton').setProperty('disabled','true');
	$('addSupplementButton').setStyle('cursor','default');
	//打开时,取掉提示信息
	var validateAdvice=$('supplementContent').getNext('.validation-advice');
	if(validateAdvice){
		validateAdvice.dispose();
	}
}
//提交补充日志
function submitSupplementLog(){
	var validate =new Validate('addSupplementFormId');
	if(!validate.validate())return;
	var segment={
		id:-1,
		workLogId:2778204,
		type:4,
		content:$('supplementContent').value
	}
	var dwr = new DwrBackCall();
	dwr.backCallFunc=function(m){
		changeDay(2012,3,16,16);
	}
	dwrService.editSupplementWorkLog(segment,1334563508996,null,dwr.backToDwrUrls.bind(dwr));
}
//点“取消”按钮后触发
function cancelSubmitSupplementLog(){
	$('supplementLog').style.display='none';
	//展开添加日志补充部分后，置灰“补充日志”按钮
	$('addSupplementButton').setProperty('disabled','');
	$('addSupplementButton').setStyle('cursor','pointer');
}

if( 1 == '-1') {
	showAddPendingMatter(-1,1334563508996,'edit_pend_div');
}
</SCRIPT>
    </DIV>
  </DIV>
  <SCRIPT>
//左侧日历
changeDay = function(year, month, day, chooseDay){
	logs.requestType = "changeDay";
	showModule("/worklog/mylog/index.jsp?requestType=changeDay&year="+year+"&month="+month+"&day="+day+"&chooseDay="+chooseDay);
}
changeWeek = function(index) {
	var weekIndex = 'week'+index;
	var weekTrIndex = 'weekTr'+index;
	document.getElementById(weekIndex).onclick();
	document.getElementById(weekTrIndex).parentNode.className='mov_row_log';
}
selectTimeSpanList = function(bTime,eTime,curr) { //时间跨度选择列表
	initWeekStatus();
	var dwr = new DwrBackCall();
	logs.beginTime = bTime;
	logs.endTime = eTime;
	logs.requestType = 'fromTimeSpan'
	dwr.addOneUrl("/worklog/mylog/content_list.jsp?"+logs.listParam(),"rightPaneMain");
	dwr.dwrProxy();
}
selectWeekList = function(year, 
						  month, 
						  beginTime, //周开始跨度时间
						  endTime,   //结束跨度时间
						  index,     //当前周num
						  isEnd) {   //是否是末周1
	logs.requestType = "fromWeek";
	logs.year = year;
	logs.month = month;
	logs.index = index;
	logs.isEnd = isEnd;
	logs.beginTime=beginTime;
	logs.endTime=endTime;
	var dwr = new DwrBackCall();
	dwr.addOneUrl("/worklog/mylog/left.jsp?index="+index+"&year="+year+"&month="+month,"leftPaneMain");
	dwr.addOneUrl("/worklog/mylog/content_list.jsp?year="+year+"&month="+month+"&beginTime="+beginTime+"&endTime="+endTime+"&requestType=fromWeek&index="+index+"&isEnd="+isEnd,"rightPaneMain");
	dwr.dwrProxy();
}
initWeekStatus = function() {
	var temp =  $('calendarWeek');
	var end = temp.getElementsByTagName('tr');
	for(var i=0; i<end.length; i++) {
		end[i].className='';
	}
}
changeMonth = function(year, month){
	var dwr = new DwrBackCall();
	var dt = new Date();
	dwr.addOneUrl("/worklog/mylog/calendar.jsp?year="+year+"&month="+month+"&dt=" + dt.getTime() ,"show_Calendar");
	dwr.dwrProxy();
}
//aaaaaaaaaaaaa
changeYear = function(year, month){
	var dwr = new DwrBackCall();
	var dt = new Date();
	dwr.addOneUrl("/worklog/mylog/calendar.jsp?year="+year+"&month="+month+"&dt=" + dt.getTime() ,"show_Calendar");
	dwr.dwrProxy();
}
submitTime = function() { //时间跨度选择列表
	initWeekStatus();
	logs.init();
	var dwr = new DwrBackCall();
	var begin = document.getElementById("begindate").value.split('-');
	var end = document.getElementById("enddate").value.split('-');
	var begindate = new Date(begin[0],begin[1]-1,begin[2]);
	var enddate = new Date(end[0],end[1]-1,end[2]);
	logs.beginTime = begindate.getTime();
	logs.endTime = enddate.getTime();
	logs.requestType = 'fromTimeSpan'
	dwr.addOneUrl("/worklog/mylog/content_list.jsp?"+logs.listParam(),"rightPaneMain");
	dwr.dwrProxy();
}
cancelTime = function() {
	document.getElementById("begindate").value='';
	document.getElementById("enddate").value='';
}
changeCalendarDisplayState = function (h,s) {
	$(h).setStyle("display","none");
	$(s).setStyle("display","");
	var time_sel = $('time_depl');
	if(time_sel.style.display=='block') {
		time_sel.style.display='none';
	} else {
		time_sel.style.display='block';
	}
	setLeftHeightTemp("add");
}
function setLeftHeightTemp(op){	
	var outer = $('leftPaneMain');
	var temp = outer.getStyle('height').toInt();
	if(op == 'add')
		temp = temp+120;
	var y = window.getSize().y-10;
	if(temp>=y-outer.getCoordinates().top && temp<y+50){
		outer.setStyle("height", temp);
	}
}
//今日计划
function deletePendingMatter(id,time){
	var currTime = time;
    var dwr = new DwrBackCall();
 	dwr.backCallFunc = function(){
    	$('pend_content_'+id).dispose();
    }
    dwrService.deletePendingMatterById(id, dwr.getAllUrls(), dwr.backToDwrUrls.bind(dwr));
}
function updateStatusById(id,status,time,sign) {
	var currTime = time;
    var dwr = new DwrBackCall();
 	dwr.backCallFunc = function(m) {
 		if(m.result == false)return;
    	var dwr2 = new DwrBackCall();
	    if(sign=='plan_list') {
	    	dwr2.addOneUrl("/worklog/mylog/item_planList.jsp?pendingId="+id, 'pend_content_'+id);
	    }else {
	    	dwr2.addOneUrl("/worklog/mylog/pendingItem.jsp?pendingId="+id, 'pend_content_'+id);
	    }
    	dwr2.dwrProxy();
 	}
    dwrService.updatePendingMatterStatusById(status, id, dwr.getAllUrls(),dwr.backToDwrUrls.bind(dwr));
}
function showAddPendingMatter(id,currTime,to,hide) {
	var url = "/worklog/mylog/worklog_pend_edit.jsp?id="+id+"&currTime="+currTime;
	var dwr = new DwrBackCall();		
	dwr.addOneUrl( url,to);
	if($(hide)){
		$(hide).setStyle("display","none");
	}
	$(to).setStyle("display","");
	dwr.dwrProxy({check:false});
}
function showAddMiddLog(type,to,hide) {
	var url = "/worklog/mylog/worklog_edit.jsp?type="+type;
	var dwr = new DwrBackCall();		
	dwr.addOneUrl(url,to);
	$(hide).setStyle("display","none");
	$(to).setStyle("display","");
	dwr.dwrProxy({check:false});
}

function showEditPendingMatter(id,currTime,to) {
	if($('tr_'+to)){
		$('tr_'+to).setStyle("display","");
	}
	var url = "/worklog/mylog/worklog_pend_edit.jsp?id="+id+"&currTime="+currTime;
	$('is_operateing_'+id).value=1;
	var dwr = new DwrBackCall();
	dwr.addOneUrl( url,to);
	$(to).setStyle("display","");
	dwr.dwrProxy({check:false});
} 
function showEditMyLog(type,id,to){
	if($('tr_'+to)){$('tr_'+to).setStyle("display","");}
	var url = "/worklog/mylog/worklog_edit.jsp?id="+id+"&type="+type;
	var dwr = new DwrBackCall();		
	dwr.addOneUrl(url,to);
	$(to).setStyle("display","");
	dwr.dwrProxy({check:false});
};

function freshCommentMore(curr) {   
	logs.init();
	logs.requestType='fromCommnet';
	if(curr){logs.currentPage=curr;};
	var dwr = new DwrBackCall();
	dwr.addOneUrl('/worklog/mylog/content_list.jsp?'+logs.listParam(),'rightPaneMain');
	dwr.dwrProxy();
}
function editMyAnnex(id, hide){
	var url = "/worklog/mylog/worklogAddAnnex.jsp?id=" + id + "&hide=" + hide;
	var dwr = new DwrBackCall();
	dwr.addOneUrl(url, 'annex_op_div');
	dwr.dwrProxy();
};
function showMyLogList() {
	var url = "/worklog/mylog/content_list.jsp?"+logs.listParam();
	var dwr = new DwrBackCall();
	dwr.addOneUrl(url, "rightPaneMain");
	dwr.dwrProxy();
};
function hiddenSelDate() {
	if (window.document.body.removeEventListener) {
		window.document.body.removeEventListener("click", hiddenSelDate, false);
	} else {
		window.document.body.detachEvent("on" + "click", hiddenSelDate);
	}
	if($("sele_month").style.display=="block"){
		$("sele_month").style.display="none";
		$('sele_month_text').setStyle('display','none');$('month').setStyle('display','');
	}
	if($("year_sele").style.display=="block"){
		$("year_sele").style.display="none";
		$('sele_year_text').setStyle('display','none');$('year').setStyle('display','');
	}
}
dateFilterToggle = function () {
	smartToggle($('dateFilterIconDiv'));
	smartToggle($('dateFilterDiv'));
}

// 日计划列表
function showPendingListByLabel(label) {
	pendingMatter.currentPage=1;
    pendingMatter.label=label;  
	
   showPendingMatterList();
}
function showPendingListByAll(all) {
	pendingMatter.currentPage=1;
    pendingMatter.status=all;  
   	showPendingMatterList();
}
function showPendingListByTime() {
	pendingMatter.search=1;
	pendingMatter.currentPage=1;
    pendingMatter.startDate=$('begindate1').value;  
    pendingMatter.endDate=$('enddate1').value; 
   	showPendingMatterList();
}
function showPendingMatterList() {
    var url = "/worklog/mylog/plan_list.jsp?"+pendingMatter.listParam();
    var dwr = new DwrBackCall();
    dwr.addOneUrl(url, "rightPaneMain");
    dwr.dwrProxy();
}



//导出日志
function exportToExcel(){
	var url="/include/dataExport.jsp?exportType=worklog";
	var dwr = new DwrBackCall();
	dwr.addOneUrl(url,mgtPopupId());
	dwr.backCallFunc=function(){
		mgtPopup();
	}
	dwr.dwrProxy();
}

</SCRIPT>
</DIV>
</DIV>
</BODY>
</HTML>

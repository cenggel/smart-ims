<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<title><?php echo CHtml::encode($this->pageTitle); ?></title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="Shortcut Icon" type="image/x-icon" href="./images/eim_app.ico" />
<link rel="icon" type="image/x-icon" href="./images/eim_app.ico" />
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/mergedstyle.css', 'all' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/top.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/main.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/public.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/font.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/sysmnghint.css', 'screen' ); ?>


<style type="text/css">
#bigTitleId LI:hover
{
	background:url(images/navlimov.png);
}

</style>
<?php 
Yii::app()->clientScript->registerScriptFile( Yii::app()->theme->baseUrl . '/scripts/YCJ_DATA.js' , CClientScript::POS_END );
Yii::app()->clientScript->registerScriptFile( Yii::app()->theme->baseUrl . '/scripts/YCJ_FUN.js' , CClientScript::POS_END );

?>

<script language="JavaScript" >
$(document).ready(function(){
  $("#t_nav_li").tabs();
});
</script>
</head>
<body>
<div class="wlbg">
<div class="top">
  <div class="t_shortcut">
    <div class="t_menu">
    <?php //var_dump(Yii::app()->user);
		$this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'权限管理', 'url'=>array('/rights'),'visible'=>Yii::app()->user->isSuperUser==true),
				array('label'=>'帮助', 'url'=>array('/site/help')),
				array('label'=>'登录', 'url'=>array(Yii::app()->user->loginUrl[0]), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'退出 ', 'url'=>array('/home/logout'), 'visible'=>!Yii::app()->user->isGuest,
						'itemOptions'=>array('class'=>"bgnone"))
			),
		)); ?>
      
    </div>
    <!-- 容量提示 -->
    <div id="t_space_div_click" class="t_space_box" style="cursor:hand;" title="剩余2G">
      <div class="t_space" > <a href="javascript:void(0);" class="t_long" style="width:0%; 
						
						background:#108c0a;"> </a> </div>
      <div class="t_space_text" 
					 style="color:#108c0a;">2G </div>
    </div>
    <!-- 容量提示结束 -->
    <!-- 公司容量信息 -->
    <div class="t_space_div" style="display:none;z-index:100" id="accountInfoArea">
      <div class="t_space_div_one">
        <p>容量：2G</p>
        <p>剩余：2G</p>
        <p>单文件限制：10M</p>
      </div>
      <div class="t_space_div_two"> 可使用短信：0条 </div>
      <div class="t_space_div_three"> <a href="javascript:void(0);" onclick="g.loadpop1('/login/cn/enlargeSpace.jsp');tm.closeAccountInfo();"> 扩容 </a> </div>
    </div>
    <!-- 公司容量信息结束 -->
  </div>
  <div class="cb"></div>
  <div class="t_name">
    <h1> <?php echo CHtml::encode(Yii::app()->name); ?> </h1>
    </h1>
  </div>
  <div class="t_nav_li">
    <ul id="bigTitleId">
      <LI id="attendance">
        <DIV class=imgwap><B class=j_ico_attend></B></DIV>
        <A href="javascript:void(0);" >事务</A></LI>
      <LI id="twitter">
        <DIV class=imgwap><B class=j_ico_twitter></B></DIV>
        <A href="javascript:void(0);">微博</A></LI>
      <LI id="notice">
        <DIV class=imgwap><B class=j_ico_notice></B></DIV>
        <A href="javascript:void(0);">公告</A></LI>
      <LI id="memorandum">
        <DIV class=imgwap><B class=j_ico_memo></B></DIV>
        <A href="javascript:void(0);">备忘</A></LI>
      <LI id="documents">
        <DIV class=imgwap><B class=j_ico_docu></B></DIV>
        <A href="javascript:void(0);">文档</A></LI>
      <LI id="log">
        <DIV class=imgwap><B class=j_ico_log></B></DIV>
        <A href="javascript:void(0);">日志</A></LI>
    </ul>
  </div>
  <div class="cb"></div>
  <!--更多-->
  <div class="t_pop_navli" id="t_pop_navli" style="z-index:100;display: none">
    <div class="bgt"></div>
    <div class="bgm">
      <ul id="moreTitleId">
      </ul>
      <div class="cb"></div>
    </div>
    <div class="bgb"></div>
  </div>
  <div class="t_search" id="t_search_div">
    <div class="t_tab_norl">
      <div class="t_tab_norm">
        <div class="t_tab_norr"> <b class="srh_ico_nav"></b> <a href="javascript:void(0)">搜索</a> </div>
      </div>
    </div>
  </div>
  <div class="t_nav" id="header">
    <div>
      <DIV id="menu">
        <DIV id="menu_desktop" style="WIDTH: 99px; WHITE-SPACE: nowrap; OVERFLOW: hidden" class=menuli>
          <DIV id="menu1_desktop" class=t_tab_curl>
            <DIV id="menu2_desktop" class=t_tab_curm>
              <DIV id="menu3_desktop" class=t_tab_curr><A title=工作台 href="javascript:void(0);">工作台</A></DIV>
            </DIV>
          </DIV>
        </DIV>
      </DIV>
    </div>
  </div>
  <div class="jgcont" id="tmmain"  style="height: 475px; width: 1000px;position:relative;overflow:hidden;">
    <IFRAME id="IFRAME_desktop" src="<?php echo Yii::app()->urlManager->createUrl('/member/home');?>" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; WIDTH: 100%; height:100%; DISPLAY: block; BORDER-TOP: 0px; BORDER-RIGHT: 0px; frameborder: 0; scrolling: no"  frameBorder=0></IFRAME>
    <IFRAME id="IFRAME_log" style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; WIDTH: 100%; height:100%; DISPLAY: none; BORDER-TOP: 0px; BORDER-RIGHT: 0px; frameborder: 0; scrolling: no" src="./log.html" frameBorder=0></IFRAME>
  </div> 
</div>
</div>
</body>
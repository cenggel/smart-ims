<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>烟草局企业工作平台</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<link rel="Shortcut Icon" type="image/x-icon" href="<?php echo Yii::app()->getTheme()->getBaseUrl(); ?>/images/favicon.ico"/>
</head>
<body>
<div id="bodyContainer">
  <div id="headerContainer">
    <div id="header_top">
      <div class="himg"> <a href="javascript:void(0);"><img src="<?php echo Yii::app()->getTheme()->getBaseUrl(); ?>/images/toplogo110720.jpg" title="今目标企业工作平台" border="0" /></a> </div>
      <div class="slogan"> </div>
      <div class="htext">
        <div> <a href="javascript:void(0);" onclick="void(0);">设为收藏</a> | <a href="javascript:void(0);">首页</a> | <a href="javascript:void(0);">在线咨询</a> </div>
        <div class="hoper"> 服务热线：0471-8010532 </div>
      </div>
    </div>
    <div class="header_simpline"></div>
    <div class="cb"></div>
  </div>
  <div id="container">
    <form name="jingoalLoginForm" id="jingoalLoginForm" method="post" action="<?php echo $this->createUrl("auth/login",array("aa"=>"bb"));?>">
      <center>
        <div  class="login_bg">
          <div class="login_cont">
            <div class="login_bo_t"></div>
            <div class="login_bo">
              <div class="login_win" id="login_win">
                <div class="ti"> <b class="login_ico login_ti_ico"></b>登录系统 </div>
                <div class="label"> <span class="lb">登录帐号:</span>
                  <input tabindex="1" class="in"  id="loginNameNomal" name="loginName"  value="" maxlength="100" type="text"/>
                  <a id="accountTip2" title="登录帐号"  href="javascript:void(0);">登录帐号？</a> </div>
                <div class="label"> <span class="lb">&nbsp;&nbsp;密&nbsp;&nbsp;码:</span>
                  <input tabindex="2" class="in" id="pwd" 	maxlength="20" type="password" />
                  <a href="javascript:void(0);">忘记密码</a> </div>
                <div class="label"> <span class="save">
                  <input tabindex="3" name="saveinfo" id="saveinfo" type="checkbox"  />
                  <label for="saveinfo">保存用户信息</label>
                  </span> </div>
                <div class="cb"></div>
                <div class="btn"  id="insertDiv">
                  <input tabindex="4" value="登  录" class="login_ico login_nor_btn" type="submit"/>
                  <div class="cb"></div>
                </div>
                <div class="no_acco">还没有帐号？ <a href="javascript:void(0);" >立即注册</a> </div>
              </div>
              <div class="login_faq">
                <ul>
                  <li> ·<a target="_blank" href="javascript:void(0);">什么是数字证书？</a> </li>
                  <li style="width: 200px;"> ·保护您的密码请阅读 <a href="javascript:void(0);">密码安全</a> </li>
                </ul>
                <div class="cb"></div>
              </div>
            </div>
            <div class="login_bo_b"></div>
          </div>
          <div class="login_rightbar">
            <div class="login_client">
              <input type="button" onclick="void(0);" class=" login_ico login_download_btn" value="立即下载" />
            </div>
            <div class="login_mobile">
              <input type="button" onclick="void(0);" class=" login_ico login_downloadm_btn" value="立即下载" />
            </div>
          </div>
          <div class="cb"></div>
        </div>
      </center>
    </form>
  </div>
  <div id="copyright_simp">
    <table cellpadding="1" cellspacing="0" border="0" width="100%" height="50">
      <tbody>
        <tr>
          <td class="aboutus_bg"><div class="aboutus"> <a href="javascript:void(0);">法律声明</a>&nbsp;|&nbsp; <a href="javascript:void(0);">服务条款</a>&nbsp;|&nbsp; <a href="javascript:void(0);">隐私声明</a>&nbsp;|&nbsp; <a href="javascript:void(0);">联系我们</a> </div>
            <div class="fr">服务热线：0471-8010532 &nbsp;</div>
            <div class="cb"></div></td>
        </tr>
        <tr>
          <td align="center"><span class="copy_t">XXXXXXXXXXXX有限公司版权所有</span>&nbsp;[<a href="javascript:void(0);" target="_blank">京ICP备06024223号</a>]</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>

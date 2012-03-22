<?php /* Smarty version Smarty-3.0.5, created on 2012-03-18 14:32:16
         compiled from "D:\web\wwwdocs\smart-ims\protected\views\layouts\main.html" */ ?>
<?php /*%%SmartyHeaderCode:46534f65f1f0113092-90846792%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '04ef55562443fbff0ef0b4cdb73e697f16d9f496' => 
    array (
      0 => 'D:\\web\\wwwdocs\\smart-ims\\protected\\views\\layouts\\main.html',
      1 => 1332081128,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '46534f65f1f0113092-90846792',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="en" />

<!-- blueprint CSS framework -->
<link rel="stylesheet" type="text/css"
	href="<?php echo $_smarty_tpl->getVariable('Yii')->value->request->baseUrl;?>
/css/screen.css" media="screen" />
<link rel="stylesheet" type="text/css"
	href="<?php echo $_smarty_tpl->getVariable('Yii')->value->request->baseUrl;?>
/css/print.css" media="print" />
<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->getVariable('Yii')->value->request->baseUrl;?>
/css/ie.css" media="screen, projection" />
	<![endif]-->

<link rel="stylesheet" type="text/css"
	href="<?php echo $_smarty_tpl->getVariable('Yii')->value->request->baseUrl;?>
/css/main.css" />
<link rel="stylesheet" type="text/css"
	href="<?php echo $_smarty_tpl->getVariable('Yii')->value->request->baseUrl;?>
/css/form.css" />
<link rel="stylesheet" type="text/css"
	href="<?php echo $_smarty_tpl->getVariable('Yii')->value->request->baseUrl;?>
/css/grid24.css" />
<link rel="stylesheet" type="text/css"
	href="<?php echo $_smarty_tpl->getVariable('Yii')->value->request->baseUrl;?>
/css/new/new.css" />


<title><?php echo $_smarty_tpl->getVariable('this')->value->pageTitle;?>
</title>
</head>

<body>
<div class="header-container" >
    <div class="container_24">
    		<div id="header">
			<div class="top">
			<?php if (isset($_smarty_tpl->getVariable('this',null,true,false)->value->menu)){?>
		<div id="topmenu" class="grid_24">
			<?php echo $_smarty_tpl->getVariable('this')->value->widget('zii.widgets.CMenu',$_smarty_tpl->getVariable('this')->value->menu,true);?>
</div>
			<?php }?>
		<!-- mainmenu -->
			</div>
			<div class="t_nav_li">
				<ul id="bigTitleId">
					
					<li class=""><div class="imgwap">
							<b class="j_ico_twitter"></b>
						</div>
						<a href="javascript:void(0);">微博</a></li>
					<li class=""><div class="imgwap">
							<b class="j_ico_notice"></b>
						</div>
						<a href="javascript:void(0);">公告</a></li>
					<li class=""><div class="imgwap">
							<b class="j_ico_memo"></b>
						</div>
						<a href="javascript:void(0);">备忘</a></li>
					<li class=""><div class="imgwap">
							<b class="j_ico_docu"></b>
						</div>
						<a href="javascript:void(0);">文档</a></li>
					<li class=""><div class="imgwap">
							<b class="j_ico_comm"></b>
						</div>
						<a href="javascript:void(0);">沟通</a></li>
					<li class=""><div class="imgwap">
							<b class="j_ico_log"></b>
						</div>
						<a href="javascript:void(0);">日志</a></li>
				</ul>
			</div>
			<div id="logo"><?php echo $_smarty_tpl->getVariable('Yii')->value->name;?>
</div>
		</div>
		<!-- header -->
    </div>
</div>
	<div class="container_24" id="page">

		<?php echo $_smarty_tpl->getVariable('content')->value;?>


		<div class="clear"></div>

		<div id="footer">
			<!--   Copyright &copy; <?php echo date('Y');?>
 by My Company.<br /> All Rights
			Reserved.<br /> <?php echo Yii::powered();?>
  -->
		</div>
		<!-- footer -->

	</div>
	<!-- page -->

</body>
</html>

<?php /* Smarty version Smarty-3.1.8, created on 2012-03-10 13:49:25
         compiled from "D:\web\wwwdocs\dangan\protected\views\layouts\main.html" */ ?>
<?php /*%%SmartyHeaderCode:156574f4c8d0d9ef713-68029289%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '99b8305191a87c9339d59a81a3b983d846e00d2f' => 
    array (
      0 => 'D:\\web\\wwwdocs\\dangan\\protected\\views\\layouts\\main.html',
      1 => 1331387246,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '156574f4c8d0d9ef713-68029289',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_4f4c8d0db13903_33398993',
  'variables' => 
  array (
    'Yii' => 0,
    'this' => 0,
    'content' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_4f4c8d0db13903_33398993')) {function content_4f4c8d0db13903_33398993($_smarty_tpl) {?><?php if (!is_callable('smarty_function_breadcrumbs')) include 'D:\\web\\wwwdocs\\dangan\\protected\\extensions\\renderers\\smarty\\plugins\\function.breadcrumbs.php';
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />

	<!-- blueprint CSS framework -->
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['Yii']->value->request->baseUrl;?>
/css/screen.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['Yii']->value->request->baseUrl;?>
/css/print.css" media="print" />
	<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['Yii']->value->request->baseUrl;?>
/css/ie.css" media="screen, projection" />
	<![endif]-->

	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['Yii']->value->request->baseUrl;?>
/css/main.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['Yii']->value->request->baseUrl;?>
/css/form.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['Yii']->value->request->baseUrl;?>
/css/grid12.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['Yii']->value->request->baseUrl;?>
/css/jquery-ui-1.8.16.custom.css" />
	

	<title><?php echo $_smarty_tpl->tpl_vars['this']->value->pageTitle;?>
</title>
</head>

<body>

<div class="container_12"  id="page">

	<div id="header">
	    <div class="top">
	       <div class="grid_4 ">
	          <div class="ui-icon ui-icon-star"></div>
	       </div>
	    	<?php if (isset($_smarty_tpl->tpl_vars['this']->value->menu)){?>
			<div id="topmenu" class="grid_8">
				<?php echo $_smarty_tpl->tpl_vars['this']->value->widget('zii.widgets.CMenu',$_smarty_tpl->tpl_vars['this']->value->menu,true);?>

			</div><!-- mainmenu -->
			<?php }?>
	    </div>
		<div id="logo"><?php echo $_smarty_tpl->tpl_vars['Yii']->value->name;?>
</div>
	</div><!-- header -->

   <?php if (isset($_smarty_tpl->tpl_vars['this']->value->menu)){?>
	<div id="mainmenu" class="grid_12">
		<?php echo $_smarty_tpl->tpl_vars['this']->value->widget('zii.widgets.CMenu',$_smarty_tpl->tpl_vars['this']->value->menu,true);?>

	</div><!-- mainmenu -->
	<?php }?>

	<?php if (isset($_smarty_tpl->tpl_vars['this']->value->breadcrumbs)&&count($_smarty_tpl->tpl_vars['this']->value->breadcrumbs)>0){?>
	<div id="breadcrumbs" class="grid_12">
		<?php echo smarty_function_breadcrumbs(array('links'=>$_smarty_tpl->tpl_vars['this']->value->breadcrumbs),$_smarty_tpl);?>
<!-- breadcrumbs -->
	</div>
	<?php }?>
	<?php echo $_smarty_tpl->tpl_vars['content']->value;?>


	<div class="clear"></div>

	<div id="footer">
		Copyright &copy; <?php echo date('Y');?>
 by My Company.<br/>
		All Rights Reserved.<br/>
		<?php echo Yii::powered();?>

	</div><!-- footer -->

</div><!-- page -->

</body>
</html>
<?php }} ?>
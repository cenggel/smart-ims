<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="en" />

<!-- blueprint CSS framework -->
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/screen.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/print.css', 'print' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/invalid.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile(Yii::app()->themeManager->baseUrl. '/css/jquery.crossSelect.css', 'screen' ); ?>
<!--[if lt IE 8]>
	<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/ie.css', 'screen' ); ?>
	
	<![endif]-->


<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/form.css' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/main.css' ); ?>
<?php  Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/grid24.css' ); 
Yii::app()->clientScript->registerScriptFile( Yii::app()->themeManager->baseUrl . '/scripts/jquery.crossSelect.js' );
?>
<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>

	<div class="container_24" id="page">

		<div id="header">
			<div id="logo">
				<?php echo CHtml::encode(Yii::app()->name); ?>
			</div>
		</div>
		<!-- header -->
		<div id="placemainmenu">
			<div id="mainmenu">
				<?php //var_dump(Yii::app()->user);
				$this->widget('zii.widgets.CMenu',array(
						'items'=>array(
								array('label'=>'首页', 'url'=>Yii::app()->homeUrl, ),
								array('label'=>'工作组', 'url'=>array('/groups/index'), 'visible'=>!Yii::app()->user->isGuest,
										'items'=>Groups::model()->getOwenMenuList()),
								array('label'=>'通知', 'url'=>array('/notice/index',),'visible'=>!Yii::app()->user->isGuest),
								array('label'=>'日历', 'url'=>array('/cal',),'visible'=>!Yii::app()->user->isGuest),
								array('label'=>'文档', 'url'=>array('/document/index',),'visible'=>!Yii::app()->user->isGuest),
								array('label'=>'日志', 'url'=>array('/blog/index',), 'visible'=>!Yii::app()->user->isGuest),
								array('label'=>'教程', 'url'=>array('/tutorials/index',), 'visible'=>!Yii::app()->user->isGuest),
								array('label'=>'权限管理', 'url'=>array('/rights'),'visible'=>Yii::app()->user->isSuperUser==true),
								array('label'=>'用户管理', 'url'=>array('/user/admin'),'visible'=>Yii::app()->user->isSuperUser==true),
								array('label'=>'个人资料', 'url'=>array('/user/profile'), 'visible'=>!Yii::app()->user->isGuest),
								array('label'=>'登录', 'url'=>array(Yii::app()->user->loginUrl[0]), 'visible'=>Yii::app()->user->isGuest),
								array('label'=>'退出 ('.Yii::app()->user->name.')', 'url'=>array('/home/logout'), 'visible'=>!Yii::app()->user->isGuest)
						),
				)); ?>
			</div>
			<!-- mainmenu -->
		</div>

		<div id="contenttop"></div>
		<div class="content"
			id="<?php echo Yii::app()->getController()->getId()?>">
			<?php $this->widget('site.widgets.GroupNav'); ?>
			<?php if(isset($this->breadcrumbs) && count($this->breadcrumbs)>0):?>
			<div id="newsinfo" class="grid_24">
				<?php 
					
				$this->widget('zii.widgets.CBreadcrumbs', array(
						//'links'=>array_merge(array('Member'=>array('/member/index')),$this->breadcrumbs),
						'links'=>$this->breadcrumbs,
				)); ?>
			</div>
			<!-- breadcrumbs -->
			<?php endif?>

			<div class="clear"></div>
			<div class="alert-div grid_24">
				<?php $this->widget('bootstrap.widgets.BootAlert'); ?>
			</div>


			<?php echo $content; ?>
			<div class="clear"></div>
		</div>
		<div id="bottomnew"></div>


		<div id="footer">
			Copyright &copy;
			<?php echo date('Y'); ?>
			by My Company.<br /> All Rights Reserved.<br />
			<?php echo Yii::powered(); ?>
		</div>
		<!-- footer -->

	</div>
	<!-- page -->

</body>
</html>

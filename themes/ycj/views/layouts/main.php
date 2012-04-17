<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<title><?php echo CHtml::encode($this->pageTitle); ?></title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="Shortcut Icon" type="image/x-icon"
	href="./images/eim_app.ico" />
<link rel="icon" type="image/x-icon" href="./images/eim_app.ico" />
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/style.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/mergedstyle.css', 'all' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/main.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/public.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/font.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/sysmnghint.css', 'screen' ); ?>
<?php Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/module.css', 'screen' ); ?>

<style type="text/css">
#bigTitleId LI:hover {
	background: url(images/navlimov.png);
}
</style>



</head>
<BODY style="overflow: hidden;">
	<DIV style="BACKGROUND: #f2f9ff;" ; id=box>
		<DIV id=mainBody>
			<?php echo $content; ?>
		</div>
	</DIV>
</body>
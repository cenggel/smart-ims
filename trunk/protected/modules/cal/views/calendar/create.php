<?php
$this->breadcrumbs=array(
	Yii::t('CalModule.calendar','Calendars')=>array('index'),
	Yii::t('CalModule.calendar','Create'),
);

$this->menu=array(
	array('label'=>Yii::t('CalModule.calendar','List Calendar'),'url'=>array('index')),
	array('label'=>Yii::t('CalModule.calendar','Manage Calendar'),'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('CalModule.calendar','Create Calendar')?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.groups','Groups')=>array('index')
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.groups','List Groups'), 'url'=>array('index')),
	array('label'=>Yii::t('siteModule.groups','Manage Groups'), 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('siteModule.groups', 'Create Groups')?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
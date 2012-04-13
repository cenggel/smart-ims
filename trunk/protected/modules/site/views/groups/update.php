<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.groups','Groups')=>array('index'),
	$model->group_name=>array('view','id'=>$model->id),
	'变更',
);

$this->menu=array(
	array('label'=>'List Groups', 'url'=>array('index')),
	array('label'=>'Create Groups', 'url'=>array('create')),
	array('label'=>'View Groups', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Groups', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('siteModule.groups','Update Groups ') .$model->group_name; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
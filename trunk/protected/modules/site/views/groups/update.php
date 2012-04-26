<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.groups','Groups')=>array('index'),
	$model->group_name=>array('view','id'=>$model->id),
	'变更',
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.groups','List Groups'), 'url'=>array('index')),
	array('label'=>Yii::t('siteModule.groups','Create Groups'), 'url'=>array('create')),
	array('label'=>Yii::t('siteModule.groups','View Groups'), 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>Yii::t('siteModule.groups','Manage Groups'), 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('siteModule.groups','Update Groups {groupname}',array('{groupname}'=>$model->group_name)) ; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
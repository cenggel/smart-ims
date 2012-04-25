<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.groups','Groups'),
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.groups','Create Groups'), 'url'=>array('create')),
	array('label'=>Yii::t('siteModule.groups','Manage Groups'), 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('siteModule.groups','Groups List') ?></h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>

<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.request','Request'),
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.request','Create Request'), 'url'=>array('create')),
	array('label'=>Yii::t('siteModule.request','Manage Request'), 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('siteModule.request','Request List') ?></h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>

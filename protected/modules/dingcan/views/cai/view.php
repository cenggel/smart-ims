<?php
$this->breadcrumbs=array(
	'菜单'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'订餐', 'url'=>array('/dingcan')),
	array('label'=>'每日菜单', 'url'=>array('index')),
	array('label'=>'添加菜单', 'url'=>array('create')),
	array('label'=>'更新菜单', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'删除菜单', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'管理菜单', 'url'=>array('admin')),
);
?>

<h1>详细</h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		array('name'=>'cai_date','value'=>date("Y-m-d",$model->cai_date)),
		'description',
		'price',
	),
)); ?>

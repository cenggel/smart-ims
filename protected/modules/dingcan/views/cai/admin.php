<?php
$this->breadcrumbs=array(
	'菜单'=>array('index'),
	'管理',
);

$this->menu=array(
	array('label'=>'菜单列表', 'url'=>array('index')),
	array('label'=>'添加菜单', 'url'=>array('create')),
);


?>

<h1>管理菜单</h1>




<!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'cai-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'id',
		array('name'=>'cai_date',
			'value'=>'date("Y-m-d",$data->cai_date)'),
		'description',
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>

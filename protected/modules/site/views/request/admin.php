<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.request','Request')=>array('index'),
	Yii::t('siteModule.request','Manage'),
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.request','Create Request'), 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('groups-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php Yii::t('siteModule.request', 'Manage Request')?></h1>




<?php $this->widget('bootstrap.widgets.TbGridView', array(
	'id'=>'groups-grid',
	'dataProvider'=>$model->with('creator')->search(),
	'filter'=>$model,
	'columns'=>array(
		'id',
		'group_name',
		array('name'=>'description',
				'type' => 'raw',),
		array('name'=>'create_user',
				'value'=>'$data->creator->username'),
		array('name'=>'create_date',
				'value'=>'date("Y-m-d",$data->create_date)'),
		array(
			  'class'=>'bootstrap.widgets.TbButtonColumn',
            'htmlOptions'=>array('style'=>'width: 50px'),
		),
	),
)); ?>

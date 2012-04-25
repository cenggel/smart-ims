<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.groups','Groups')=>array('index'),
	Yii::t('siteModule.groups','Manage'),
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.groups','Create Groups'), 'url'=>array('create')),
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

<h1><?php Yii::t('siteModule.groups', 'Manage Groups')?></h1>




<?php $this->widget('bootstrap.widgets.BootGridView', array(
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
			  'class'=>'bootstrap.widgets.BootButtonColumn',
            'htmlOptions'=>array('style'=>'width: 50px'),
		),
	),
)); ?>

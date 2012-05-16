<?php
$this->breadcrumbs=array(
	'Calendars'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Calendar','url'=>array('index')),
	array('label'=>'Create Calendar','url'=>array('create')),
	array('label'=>'Update Calendar','url'=>array('update','id'=>$model->id)),
	array('label'=>'Delete Calendar','url'=>'#','linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Calendar','url'=>array('admin')),
);
?>

<h1> <?php echo Yii::t('CalModule.calander','View Calendar');?></h1>

<?php $this->widget('bootstrap.widgets.BootDetailView',array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'name',
		array('name'=>'color',
			   'value'=>"$data->color <div  style=\"background-color:$model->color ; width:20px; height:20px; display:block\"></div>",	
				'type'=>'raw',			
			),
		array('name'=>'visibility',
				'value'=>Calendar::visibilityList($model->visibility),
				)
	),
)); ?>

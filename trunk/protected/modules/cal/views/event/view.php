<?php
$this->breadcrumbs=array(
	'Events'=>array('index'),
	$model->title,
);

$this->menu=array(
	array('label'=>'List Event','url'=>array('index')),
	array('label'=>'Create Event','url'=>array('create')),
	array('label'=>'Update Event','url'=>array('update','id'=>$model->id)),
	array('label'=>'Delete Event','url'=>'#','linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Event','url'=>array('admin')),
);
?>

<h1>View Event #<?php echo $model->id; ?></h1>

<?php $this->widget('bootstrap.widgets.BootDetailView',array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'calendar_id',
		'title',
		'description',
		'user_id',
		'allDay',
		'editable',
		'start_time',
		'end_time',
		'cal_date',
		'location',
		'event_type',
		'completed',
		'complete_date',
		'actor_id',
		'duration',
		'create_date',
		'update_date',
	),
)); ?>

<?php
$this->breadcrumbs=array(
	'Groups'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'List Groups', 'url'=>array('index')),
	array('label'=>'Create Groups', 'url'=>array('create')),
	array('label'=>'Update Groups', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Groups', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Groups', 'url'=>array('admin')),
);
?>

<h1>View Groups #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'group_name',
		'description',
		'create_user',
		'create_date',
		'views',
	),
)); ?>

<?php
$this->breadcrumbs=array(
	'Tags'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Tags', 'url'=>array('index')),
	array('label'=>'Create Tags', 'url'=>array('create')),
	array('label'=>'Update Tags', 'url'=>array('update', 'id'=>$model->name)),
	array('label'=>'Delete Tags', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->name),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Tags', 'url'=>array('admin')),
);
?>

<h1>View Tags #<?php echo $model->name; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'name',
		'frequency',
	),
)); ?>

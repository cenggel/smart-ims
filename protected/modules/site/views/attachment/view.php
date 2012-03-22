<?php
$this->breadcrumbs=array(
	'Attachments'=>array('index'),
	$model->title,
);

$this->menu=array(
	array('label'=>'List Attachment', 'url'=>array('index')),
	array('label'=>'Create Attachment', 'url'=>array('create')),
	array('label'=>'Update Attachment', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Attachment', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Attachment', 'url'=>array('admin')),
);
?>

<h1>View Attachment #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'item_id',
		'title',
		'description',
		'item_type',
		'file_path',
		'file_type',
		'isImage',
		'create_date',
		'update_date',
		'create_user',
		'update_user',
	),
)); ?>

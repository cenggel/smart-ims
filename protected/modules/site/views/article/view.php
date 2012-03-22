<?php
$this->breadcrumbs=array(
	'Articles'=>array('index'),
	$model->title,
);

$this->menu=array(
	array('label'=>'List Article', 'url'=>array('index')),
	array('label'=>'Create Article', 'url'=>array('create')),
	array('label'=>'Update Article', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Article', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Article', 'url'=>array('admin')),
);
?>

<h1>View Article #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'Category_id',
		'title',
		'content',
		'tags',
		'status',
		'essential',
		'article_date',
		'author_id',
		'create_date',
		'update_date',
		'update_user',
	),
)); ?>

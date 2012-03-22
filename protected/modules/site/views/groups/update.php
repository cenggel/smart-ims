<?php
$this->breadcrumbs=array(
	'Groups'=>array('index'),
	$model->id=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Groups', 'url'=>array('index')),
	array('label'=>'Create Groups', 'url'=>array('create')),
	array('label'=>'View Groups', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Groups', 'url'=>array('admin')),
);
?>

<h1>Update Groups <?php echo $model->id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
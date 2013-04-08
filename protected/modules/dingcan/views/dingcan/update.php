<?php
$this->breadcrumbs=array(
	'Dingcans'=>array('index'),
	$model->id=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Dingcan', 'url'=>array('index')),
	array('label'=>'Create Dingcan', 'url'=>array('create')),
	array('label'=>'View Dingcan', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Dingcan', 'url'=>array('admin')),
);
?>

<h1>Update Dingcan <?php echo $model->id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
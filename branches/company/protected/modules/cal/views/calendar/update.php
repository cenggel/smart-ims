<?php
$this->breadcrumbs=array(
	'Calendars'=>array('index'),
	$model->name=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Calendar','url'=>array('index')),
	array('label'=>'Create Calendar','url'=>array('create')),
	array('label'=>'View Calendar','url'=>array('view','id'=>$model->id)),
	array('label'=>'Manage Calendar','url'=>array('admin')),
);
?>

<h1>Update Calendar <?php echo $model->id; ?></h1>

<?php echo $this->renderPartial('_form',array('model'=>$model)); ?>
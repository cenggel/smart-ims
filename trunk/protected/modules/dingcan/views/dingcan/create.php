<?php
$this->breadcrumbs=array(
	'Dingcans'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Dingcan', 'url'=>array('index')),
	array('label'=>'Manage Dingcan', 'url'=>array('admin')),
);
?>

<h1>Create Dingcan</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
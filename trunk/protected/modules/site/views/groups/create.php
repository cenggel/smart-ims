<?php
$this->breadcrumbs=array(
	'Groups'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Groups', 'url'=>array('index')),
	array('label'=>'Manage Groups', 'url'=>array('admin')),
);
?>

<h1>Create Groups</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
<?php
$this->breadcrumbs=array(
	'Calendars',
);

$this->menu=array(
	array('label'=>'Create Calendar','url'=>array('create')),
	array('label'=>'Manage Calendar','url'=>array('admin')),
);
?>

<h1>Calendars</h1>

<?php $this->widget('bootstrap.widgets.BootListView',array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>

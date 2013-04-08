<?php
$this->breadcrumbs=array(
	'Dingcans',
);

$this->menu=array(
	array('label'=>'Create Dingcan', 'url'=>array('create')),
	array('label'=>'Manage Dingcan', 'url'=>array('admin')),
);
?>

<h1>Dingcans</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>

<?php
$this->breadcrumbs=array(
	'Articles',
);


$class=$this->working_class?$this->working_class."/":"";
$params=array();
if($this->working_class)
	$params['class_code'] = $this->working_class;
if($this->working_group){
	$params['group_id'] = $this->working_group->id;
}
$this->menu=array(
	array('label'=>'Create Article', 'url'=>array_merge(array('create'),$params)),
	array('label'=>'Manage Article', 'url'=>array_merge(array('admin'),$params)),
);
?>

<h1>Articles</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>

<?php
$this->breadcrumbs=array(
	'每日菜单'=>array('index'),
	'添加',
);

$this->menu=array(
	array('label'=>'每日菜单', 'url'=>array('index')),
	array('label'=>'管理菜单', 'url'=>array('admin')),
);
?>

<h1>添加菜单</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
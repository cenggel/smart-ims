<?php
$this->breadcrumbs=array(
	'每日菜单'=>array('index'),
	$model->id=>array('view','id'=>$model->id),
	'跟新',
);

$this->menu=array(
	array('label'=>'每日菜单', 'url'=>array('index')),
	array('label'=>'添加菜单', 'url'=>array('create')),
	array('label'=>'查看菜单', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'管理菜单', 'url'=>array('admin')),
);
?>

<h1>更新菜单# <?php echo $model->id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
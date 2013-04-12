<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.groups','Groups')=>array('index'),
	$model->group_name,
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.request','Create Request'), 'url'=>array('create')),
	array('label'=>Yii::t('siteModule.request','Manage Request'), 'url'=>array('admin')),
);
?>

<h1><?php echo  Yii::t('siteModule.groups','Group {group} info',array('{group}'=>$model->group_name)); ?></h1>

<?php $this->widget('bootstrap.widgets.TbDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'group_name',
		'description:html',		
		'creator.username',
		array('name'=>'create_date',
				'type'=>'date'),
	),
)); 


?>

<?php 

$user = new User();
$mem = new CActiveDataProvider($user->memberOfGroup($model->id)->with('profile')) ;
$this->widget('bootstrap.widgets.TbGridView', array(
		'dataProvider'=>$mem,
		'columns'=>array(
				'username',
				'profile.firstname',
				'email'
		),
));
?>
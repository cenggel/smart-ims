<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.groups','Groups')=>array('index'),
	$model->group_name,
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.groups','List Groups'), 'url'=>array('index')),
	array('label'=>Yii::t('siteModule.groups','Create Groups'), 'url'=>array('create')),
	array('label'=>Yii::t('siteModule.groups','Update Groups'), 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>Yii::t('siteModule.groups','Delete Groups'), 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>Yii::t('siteModule.groups','Manage Groups'), 'url'=>array('admin')),
);
?>

<h1><?php echo  Yii::t('siteModule.groups','Group {group} info',array('{group}'=>$model->group_name)); ?></h1>

<?php $this->widget('bootstrap.widgets.BootDetailView', array(
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

$mem = new CActiveDataProvider(User::model()->memberOfGroup($model->id)->with('profile')) ;
$this->widget('bootstrap.widgets.bootGridView', array(
		'dataProvider'=>$mem,
		'columns'=>array(
				'username',
				'profile.firstname',
				'email'
		),
));
?>
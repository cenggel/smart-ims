<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.request','Request')=>array('index'),
	$groupsModel->group_name=>array('view','id'=>$groupsModel->id),
	'变更',
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.request','List Request'), 'url'=>array('index')),
	array('label'=>Yii::t('siteModule.request','Create Request'), 'url'=>array('create')),
	array('label'=>Yii::t('siteModule.request','View Request'), 'url'=>array('view', 'id'=>$groupsModel->id)),
	array('label'=>Yii::t('siteModule.request','Manage Request'), 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('siteModule.groups','Update Groups {groupname}',array('{groupname}'=>$groupsModel->group_name)) ; ?></h1>

<?php echo $this->renderPartial('_form', array(
                                        'requestModel'=>$requestModel,
                                        'groupsModel'=>$groupsModel,
)); ?>
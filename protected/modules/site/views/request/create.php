<?php
$this->breadcrumbs=array(
	Yii::t('siteModule.request','Request')=>array('index')
);

$this->menu=array(
	array('label'=>Yii::t('siteModule.request','List Request'), 'url'=>array('index')),
	array('label'=>Yii::t('siteModule.request','Manage Request'), 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('siteModule.request', 'Create Request')?></h1>

<?php echo $this->renderPartial('_form', array('requestModel'=>$requestModel,'groupsModel'=>$groupsModel)); ?>
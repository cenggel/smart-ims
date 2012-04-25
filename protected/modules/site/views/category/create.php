<?php
/*$this->breadcrumbs=array(
	'Categories'=>array('index'),
	'Create',
);


$this->menu=array(
	array('label'=>Yii::t('siteModule','List Category'), 'url'=>array('index')),
	array('label'=>Yii::t('siteModule','Manage Category'), 'url'=>array('admin'),'visible'=>$this->hasRight('Site.Category.Admin')),
);*/
?>

<h1><?php echo Yii::t('siteModule.category', 'Create Category')?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
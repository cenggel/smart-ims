<?php
/*$this->breadcrumbs=array(
	'Articles'=>array('index'),
	$model->title=>array('view','id'=>$model->id),
	'Update',
);
*/

?>

<h1><?php echo Yii::t('siteModule.article','Update Article') ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
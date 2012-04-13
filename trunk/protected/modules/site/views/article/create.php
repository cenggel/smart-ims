<?php
$class = 'Articles';
if($this->working_class) $class = ucfirst($this->working_class);


?>

<h1><?php echo Yii::t('siteModule.article','Create {Article}',array('{Article}'=>Yii::t('siteModule.article',$class)))?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
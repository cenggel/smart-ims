<?php
$class = 'Documents';
if($this->working_class) $class = ucfirst($this->working_class);


?>

<h1><?php echo Yii::t('siteModule.documents','Create Document')?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
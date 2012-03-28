<?php
$this->breadcrumbs=array(
	'Articles'=>array('index'),
	'Create',
);


?>

<h1>Create Article</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
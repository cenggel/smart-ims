<?php $this->Widget('ext.form.FormGenerator', array(
		'model'=>$model,
		'enableAjaxValidation'=>true,
		'displayAttribes'=>array(
				'id'=>array('type'=>'hidden'),'group_name','description'=>array('type'=>'editor')
		)));
?>


<?php $this->Widget('ext.form.FormGenerator', array(
		'model'=>$model,
		'enableAjaxValidation'=>true,
		'htmlOptions'=>array('class'=>'frmcontact','enctype'=>'multipart/form-data'),
		'defaultHtmlOptions'=>array('text'=>array('class'=>'medium-input text-input'),
				'dropdown'=>array('class'=>'medium-input'),
				'textarea'=>array('class'=>'medium-input'),),
		'displayAttribes'=>$model->getFromFieldList()));
?>

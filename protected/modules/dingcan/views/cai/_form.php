<div class="form">
<?php 
$this->Widget('ext.form.FormGenerator', array(
		'id'=>'cai-form',
		'model'=>$model,
		'enableAjaxValidation'=>true,
		'htmlOptions'=>array('class'=>'frmcontact','enctype'=>'multipart/form-data'),
		'defaultHtmlOptions'=>array('text'=>array('class'=>'medium-input text-input'),
				'dropdown'=>array('class'=>'medium-input'),
				'textarea'=>array('class'=>'medium-input'),),
		'displayAttribes'=>array(
        'category'=>array('type'=>'dropdown','data'=>$model->categoryList),
        'cai_date'=>array('type'=>'date'),
		'end_date'=>array('type'=>'date'),
        'price',
         'description'


)));

?>

</div><!-- form -->
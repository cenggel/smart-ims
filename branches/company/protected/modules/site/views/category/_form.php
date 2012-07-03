

<?php $this->Widget('ext.form.FormGenerator', array(
		'model'=>$model,
		'enableAjaxValidation'=>true,
		'htmlOptions'=>array('class'=>'frmcontact'),
		'defaultHtmlOptions'=>array('text'=>array('class'=>'medium-input text-input'),
				'dropdown'=>array('class'=>'medium-input'),
				'textarea'=>array('class'=>'medium-input'),),
		'displayAttribes'=>array(
				'id'=>array('type'=>'hidden'),
				'name',
				'parent_id'=>array('type'=>'dropdown','data'=>Category::model()->getListData(0,'--',$model->group_id,$model->class_code),
						'htmlOptions'=>array('encode'=>false,
	    						'empty'=>array(''=>Yii::t('siteModule.category','Root Category')))),
				'description',
				'display_order',
				'group_id'=>array('type'=>'hidden'),
				'class_code'=>array('type'=>'hidden'),
		)));
?>

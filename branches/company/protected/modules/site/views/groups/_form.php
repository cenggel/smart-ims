<?php $this->Widget('ext.form.FormGenerator', array(
		'model'=>$model,
		'enableAjaxValidation'=>true,
		'displayAttribes'=>array(
				'id'=>array('type'=>'hidden'),'group_name',
				'members'=>array(
						'type'=>'dropdown',
						'data'=>CHtml::listData(User::model()->active()->with('profile')->findAll(array('order'=>'username')),'id','profile.firstname'),
						'htmlOptions'=>array('multiple'=>"multiple",'options'=>array($model->create_user=>array('disabled'=>'disabled')))),
				'description'=>array('type'=>'textarea')
		)));
?>

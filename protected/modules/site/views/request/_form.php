<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'comment-form',
	'enableAjaxValidation'=>false,
)); ?>

	<?php echo $form->errorSummary($requestModel); ?>
	<?php echo $form->errorSummary($groupsModel); ?>
	<?php 
	  $script = ' $(function() {// alert("aaa");
				$( "#Request_booking_release_date" ).datepicker(jQuery.extend($.datepicker.regional["zh-CN"], {
				changeMonth: true,
				dateFormat:"yy-mm-dd",
				 showButtonPanel: true,
		changeYear: true}));

		if(!$( "#Request_booking_release_date" ).val()){
		$( "#Request_booking_release_date" ).datepicker("setDate",new Date());
	}else{

	var date = new Date();
	date.setTime(parseInt($( "#Request_booking_release_date" ).val())*1000);
	$( "#Request_booking_release_date" ).datepicker("setDate",date);
	}

	});';
		
		//var_dump($script1); exit;
		Yii::app()->clientScript->registerScript(Request_booking_release_date,$script,CClientScript::POS_READY); ?>
<table>
	<tr>
		<td>
			<div class="row">
				<?php echo $form->labelEx($groupsModel,Yii::t('siteModule.request','Group Name')); ?>
				<?php echo $form->textField($groupsModel,'group_name',array('size'=>45,'maxlength'=>45)); ?>
				<?php echo $form->error($groupsModel,'group_name'); ?>
			</div>
		</td>
		<td>
		    <div class="row">
				<?php echo $form->labelEx($requestModel,Yii::t('siteModule.request','Request Code')); ?>
				<?php echo $form->textField($requestModel,'request_code',array('size'=>100,'maxlength'=>100)); ?>
				<?php echo $form->error($requestModel,'request_code'); ?>
			</div>
		</td>
		
	</tr>
	<tr>
		<td>
		   <div class="row">
				<?php echo $form->labelEx($requestModel,Yii::t('siteModule.request','Booking Date')); ?>
				<?php echo $form->textField($requestModel,'booking_release_date',array('size'=>100,'maxlength'=>100)); ?>
				<?php echo $form->error($requestModel,'booking_release_date'); ?>
			</div>
		</td>
	</tr>
	<tr>
	</tr>
</table>
	
	
	
	<div class="row">
		<?php echo $form->labelEx($groupsModel,Yii::t('siteModule.request','Request members')); ?>
		<?php echo CHtml::activeListBox($groupsModel, 'members', CHtml::listData(User::model()->active()->with('profile')->findAll(array('order'=>'username')),'id','profile.firstname'),
				array('multiple'=>"multiple",
						'options'=>array(
								$groupsModel->create_user=>array('disabled'=>'disabled','selected'=>'selected'))) ) ?>
		<?php echo $form->error($groupsModel,'members'); ?>
	</div>
	
	<div class="row">
		<?php echo $form->labelEx($groupsModel,Yii::t('siteModule.request','Description')); ?>
		<?php echo $form->textArea($groupsModel,'description',array('size'=>255,'maxlength'=>255)); ?>
		<?php echo $form->error($groupsModel,'description'); ?>
	</div>


	<div class="row buttons">
		<?php echo CHtml::submitButton($groupsModel->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->
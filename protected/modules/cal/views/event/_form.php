<?php 
  $assets = Yii::app()->getAssetManager()->publish(Yii::getPathOfAlias('cal') . '/assets');
  
  $cs = Yii::app()->clientScript;
  $cs->registerScriptFile($assets . '/jquery.clockpick.1.2.9.min.js');
  $cs->registerCssFile($assets. '/jquery.clockpick.1.2.9.css');
  
  $js =<<<T
  $('.timePicker').clockpick({
 starthour : 6,
 endhour : 15,
 showminutes : true,
 minutedivisions:4,
 military: true,
 
 });
  $('.datePicker').datepicker($.datepicker.regional[ "zh_CN" ]);
T;

$cs->registerScript("event_form",$js);
?>

<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm',array(
	'id'=>'event-form',
	'enableAjaxValidation'=>true,
)); ?>

	<p class="help-block">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<?php echo $form->dropDownListRow($model,'calendar_id',CHtml::listData(Calendar::model()->owen()->public()->findAll(), 'id', 'name')); ?>

	<?php echo $form->textFieldRow($model,'title',array('class'=>'span5','maxlength'=>100)); ?>
	
	<?php echo $form->textFieldRow($model,'location',array('class'=>'span5','maxlength'=>150)); ?>
	
	<?php echo $form->textAreaRow($model,'description',array('rows'=>6, 'cols'=>50, 'class'=>'span8')); ?>

	<?php echo $form->checkBoxRow($model,'allDay',array('class'=>'checkbox')); ?>

	<?php echo $form->checkBoxRow($model,'editable',array('class'=>'checkbox')); ?>

	
	<?php echo $form->dropDownListRow($model,'event_type', Event::getEnumList('EVENT_TYPE'), array('class'=>'span5','maxlength'=>45)); ?>
	<?php echo $form->textFieldRow($model,'startDate',array('class'=>'span5 datePicker')); ?>
	<?php echo $form->textFieldRow($model,'startTime',array('class'=>'span5 timePicker')); ?>

	<?php echo $form->textFieldRow($model,'endDate',array('class'=>'span5 datePicker')); ?>
	<?php echo $form->textFieldRow($model,'endTime',array('class'=>'span5 timePicker')); ?>



	<?php echo $form->textFieldRow($model,'completed',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'complete_date',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'actor_id',array('class'=>'span5')); ?>

	

	<div class="form-actions">
		<?php $this->widget('bootstrap.widgets.BootButton', array(
			'buttonType'=>'submit',
			'type'=>'primary',
			'label'=>$model->isNewRecord ? 'Create' : 'Save',
		)); ?>
	</div>

<?php $this->endWidget(); ?>

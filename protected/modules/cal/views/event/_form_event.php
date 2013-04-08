<?php 
  $assets = Yii::app()->getAssetManager()->publish(Yii::getPathOfAlias('cal') . '/assets');
  
  $cs = Yii::app()->clientScript;
  $cs->registerScriptFile($assets . '/jquery.clockpick.1.2.9.min.js');
  $cs->registerCssFile($assets. '/jquery.clockpick.1.2.9.css');
  Yii::app()->clientScript->registerCoreScript('jquery.ui');
  $cs->registerCssFile(Yii::app()->theme->baseUrl .'/css/redmond/jquery-ui-1.8.18.custom.css');
  $dayNamesMin= "['日', '一', '二', '三', '四', '五', '六']";
  $monthNames ="['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']";
  $js =<<<T
  $('.timePicker').clockpick({
 starthour : 6,
 endhour : 15,
 showminutes : true,
 minutedivisions:4,
 military: true,
 
 });
  $('.datePicker').datepicker({ dateFormat: 'yy-mm-dd' , dayNamesMin:$dayNamesMin ,monthNames:$monthNames});
  
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
    <br>
    <div class="span2"><?php // echo $form->checkBoxRow($model,'allDay',array('class'=>'checkbox')); ?></div>

	<div class="span2"><?php // echo $form->checkBoxRow($model,'editable',array('class'=>'checkbox')); ?></div>
	<?php echo $form->textFieldRow($model,'title',array('class'=>'span5','maxlength'=>100)); ?>
	
	<?php //echo $form->textFieldRow($model,'location',array('class'=>'span5','maxlength'=>150)); ?>
	
	<?php echo $form->textAreaRow($model,'description',array('rows'=>6, 'cols'=>50, 'class'=>'span8')); ?>

	

	
	<?php //echo $form->dropDownListRow($model,'event_type', Event::getEnumList('EVENT_TYPE'), array('class'=>'span5','maxlength'=>45)); 
     echo CHtml::activeHiddenField($model, 'event_type',array('value'=>'task'))?>
	<?php echo $form->textFieldRow($model,'startDate',array('class'=>'span2 datePicker'));
	 echo CHtml::activeTextField($model,'startTime',array('class'=>'span1 timePicker')) ?>
	<?php //echo $form->textFieldRow($model,'startTime',array('class'=>'span5 timePicker')); ?>

	<?php echo $form->textFieldRow($model,'endDate',array('class'=>'span2 datePicker')); 
	echo CHtml::activeTextField($model,'endTime',array('class'=>'span1 timePicker'))?>
	<?php //echo $form->textFieldRow($model,'endTime',array('class'=>'span5 timePicker')); ?>


    <?php if(!$model->isNewRecord){?>
	<?php echo $form->textFieldRow($model,'completed',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'complete_date',array('class'=>'span5')); ?>

	<?php }?>
	<?php echo $form->dropDownListRow($model,'actor_id',CHtml::listData(User::model()->active()->findAll(array('order'=>'username')),'id','username'),
			 array('class'=>'span5')); ?>

	

	<div class="form-actions">
		<?php $this->widget('bootstrap.widgets.BootButton', array(
			'buttonType'=>'submit',
			'type'=>'primary',
			'label'=>$model->isNewRecord ? 'Create' : 'Save',
		)); ?>
	</div>

<?php $this->endWidget(); ?>

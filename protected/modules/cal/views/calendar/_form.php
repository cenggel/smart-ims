<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm',array(
	'id'=>'calendar-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="help-block">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<?php echo $form->textFieldRow($model,'name',array('class'=>'span5','maxlength'=>50)); ?>

	<?php 
	echo $form->label($model,'color');
	$this->widget('ext.SMiniColors.SActiveColorPicker', array(
    'model' => $model,
    'attribute' => 'color',
    'hidden'=>true, // defaults to false - can be set to hide the textarea with the hex
    'options' => array(), // jQuery plugin options
    'htmlOptions' => array(), // html attributes
)); ?>

	<?php echo $form->dropDownListRow($model,'visibility',Calendar::visibilityList()); ?>

	<div class="form-actions">
		<?php $this->widget('bootstrap.widgets.BootButton', array(
			'buttonType'=>'submit',
			'type'=>'primary',
			'label'=>$model->isNewRecord ? 'Create' : 'Save',
		)); ?>
	</div>

<?php $this->endWidget(); ?>

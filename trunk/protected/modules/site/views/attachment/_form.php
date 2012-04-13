<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm',array(
	'id'=>'attachment-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="help-block">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<?php echo $form->textFieldRow($model,'item_id',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'title',array('class'=>'span5','maxlength'=>200)); ?>

	<?php echo $form->textAreaRow($model,'description',array('rows'=>6, 'cols'=>50, 'class'=>'span8')); ?>

	<?php echo $form->textFieldRow($model,'class_code',array('class'=>'span5','maxlength'=>45)); ?>

	<?php echo $form->textFieldRow($model,'file_path',array('class'=>'span5','maxlength'=>255)); ?>

	<?php echo $form->textFieldRow($model,'file_type',array('class'=>'span5','maxlength'=>45)); ?>

	<?php echo $form->textFieldRow($model,'isImage',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'create_date',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'update_date',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'create_user',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'update_user',array('class'=>'span5')); ?>

	<div class="form-actions">
		<?php $this->widget('bootstrap.widgets.BootButton', array(
			'buttonType'=>'submit',
			'type'=>'primary',
			'label'=>$model->isNewRecord ? 'Create' : 'Save',
		)); ?>
	</div>

<?php $this->endWidget(); ?>

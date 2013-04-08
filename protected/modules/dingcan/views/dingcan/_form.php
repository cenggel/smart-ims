<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'dingcan-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'user_id'); ?>
		<?php echo $form->textField($model,'user_id',array('size'=>10,'maxlength'=>10)); ?>
		<?php echo $form->error($model,'user_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'count'); ?>
		<?php echo $form->textField($model,'count',array('size'=>10,'maxlength'=>10)); ?>
		<?php echo $form->error($model,'count'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'book_date'); ?>
		<?php echo $form->textField($model,'book_date',array('size'=>10,'maxlength'=>10)); ?>
		<?php echo $form->error($model,'book_date'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'cancel_tag'); ?>
		<?php echo $form->textField($model,'cancel_tag'); ?>
		<?php echo $form->error($model,'cancel_tag'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->
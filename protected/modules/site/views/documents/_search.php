<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'id'); ?>
		<?php echo $form->textField($model,'id'); ?>
	</div>

<!-- 	<div class="row">
		<?php echo $form->label($model,'Category_id'); ?>
		<?php echo $form->textField($model,'Category_id'); ?>
	</div>
 -->
	<div class="row">
		<?php echo $form->label($model,'doc_name'); ?>
		<?php echo $form->textField($model,'doc_name',array('size'=>60,'maxlength'=>255)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'description'); ?>
		<?php echo $form->textArea($model,'description',array('rows'=>6, 'cols'=>50)); ?>
	</div>

		<div class="row">
		<?php echo $form->label($model,'create_user'); ?>
		<?php echo $form->textField($model,'create_user'); ?>
	</div> -->

	<div class="row">
		<?php echo $form->label($model,'create_date'); ?>
		<?php echo $form->textField($model,'create_date'); ?>
	</div>



	<div class="row">
		<?php echo $form->label($model,'update_date'); ?>
		<?php echo $form->textField($model,'update_date'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'update_user'); ?>
		<?php echo $form->textField($model,'update_user'); ?>
	</div> -->

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
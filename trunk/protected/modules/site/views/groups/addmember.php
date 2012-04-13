 
<div class="form" style="padding:10px;">
<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'group-member-form',
	'enableAjaxValidation'=>true,
)); ?>

    
	<div class="row">
		<?php echo $form->labelEx($model,'users'); ?>
		<?php echo CHtml::activeListBox($model, 'users', CHtml::listData($users, 'id', 'username'),
				array('multiple'=>"multiple",
						'options'=>array(
								$group->create_user=>array('disabled'=>'disabled','selected'=>'selected'))) ) ?>
		<?php echo $form->error($model,'users'); ?>
	</div>

	<div class="row">
		<?php echo CHtml::activeHiddenField($model, 'groups_id')?>
	</div>


	<div class="row buttons">
		<?php echo CHtml::submitButton('确定',array('class'=>'btn_orange_ss')); ?> 
	</div>

<?php $this->endWidget(); ?>
</div><!-- form -->

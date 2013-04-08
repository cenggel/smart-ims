

	<?php echo $form->dropDownListRow($model,'calendar_id',CHtml::listData(Calendar::model()->owen()->public()->findAll(), 'id', 'name'),array('class'=>'span4')); ?>
    <br>
    <div class="span2"><?php // echo $form->checkBoxRow($model,'allDay',array('class'=>'checkbox')); ?></div>

	<div class="span2"><?php // echo $form->checkBoxRow($model,'editable',array('class'=>'checkbox')); ?></div>
	<?php echo $form->textFieldRow($model,'title',array('class'=>'span4','maxlength'=>100)); ?>
	
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
	<?php echo $form->textFieldRow($model,'completed',array('class'=>'span4 complate-process')); ?>

	<?php echo $form->textFieldRow($model,'complete_date',array('class'=>'span4 datePicker')); ?>

	<?php }?>
	<?php echo $form->dropDownListRow($model,'actor_id',CHtml::listData(User::model()->active()->findAll(array('order'=>'username')),'id','username'),
			 array('class'=>'span4')); ?>

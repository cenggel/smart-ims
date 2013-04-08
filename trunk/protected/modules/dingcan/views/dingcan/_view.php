<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('user_id')); ?>:</b>
	<?php echo CHtml::encode($data->user_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('count')); ?>:</b>
	<?php echo CHtml::encode($data->count); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('book_date')); ?>:</b>
	<?php echo CHtml::encode($data->book_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('cancel_tag')); ?>:</b>
	<?php echo CHtml::encode($data->cancel_tag); ?>
	<br />


</div>
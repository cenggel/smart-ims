<?php
/* @var $this AttachmentController */
/* @var $data Attachment */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('item_id')); ?>:</b>
	<?php echo CHtml::encode($data->item_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('title')); ?>:</b>
	<?php echo CHtml::encode($data->title); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('description')); ?>:</b>
	<?php echo CHtml::encode($data->description); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('class_code')); ?>:</b>
	<?php echo CHtml::encode($data->class_code); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('file_path')); ?>:</b>
	<?php echo CHtml::encode($data->file_path); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('file_type')); ?>:</b>
	<?php echo CHtml::encode($data->file_type); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('isImage')); ?>:</b>
	<?php echo CHtml::encode($data->isImage); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('create_date')); ?>:</b>
	<?php echo CHtml::encode($data->create_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('update_date')); ?>:</b>
	<?php echo CHtml::encode($data->update_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('create_user')); ?>:</b>
	<?php echo CHtml::encode($data->create_user); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('update_user')); ?>:</b>
	<?php echo CHtml::encode($data->update_user); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('file_size')); ?>:</b>
	<?php echo CHtml::encode($data->file_size); ?>
	<br />

	*/ ?>

</div>

<div id="attach-<?php echo $data->id ?>" class="attach-row">
	<div class="check-row">
		
		<?php echo CHtml::activeLabel($data, "[$data->id]deleteFlag") ?>
		<?php echo CHtml::activeCheckBox($data, "[$data->id]deleteFlag") ?>
		<br>
	</div>
	<?php 
	if($data->isImage){
		$image = CHtml::image($data->url);
	}else{
		$image = $data->extImage;
	}
	?>
	<div class="span-6 first">
		<div class="thumbnail">
			<?php echo $image ?>
		</div>
	</div>
	<div class="span-12 last">
		<div>
			<?php  echo CHtml::activeLabel($data, "[$data->id]title")?>
			<?php  echo CHtml::activeTextField($data, "[$data->id]title",array(
					'class'=>'text-input medium-input'))?>
		</div>
		<div>
			<?php  echo CHtml::activeLabel($data, "[$data->id]description")?>
			<?php  echo CHtml::activeTextArea($data, "[$data->id]description")?>
		</div>
	</div>
	<div class="clear"></div>
</div>


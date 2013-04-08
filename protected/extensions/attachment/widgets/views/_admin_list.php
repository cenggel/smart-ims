
<div id="attach-<?php echo $data->id ?>" class="attach-row row-fluid row">
	<div class="check-row">
		
		<?php echo CHtml::activeLabel($data, "[$data->id]deleteFlag") ?>
		<?php echo CHtml::activeCheckBox($data, "[$data->id]deleteFlag") ?>
		<br>
	</div>
	<?php 
	if($data->isImage){
		$image = CHtml::image(Yii::app()->baseUrl .'/' . $data->file_path);
	}else{
		$image = $data->extImage;
	}
	?>
	<div class="span4 first-child">
		<div class="thumbnail">
			<?php echo $image ?>
		</div>
	</div>
	<div class="span6 first">
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


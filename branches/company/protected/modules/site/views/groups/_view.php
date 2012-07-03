<?php $class = ($index%3==0)?"alpha":(($index%3==2)?"omega":"")?>
<div class="group-info-box grid_6 <?php echo $class;?>">
	<div class=" round group-block">

		<div class="block-head">
			<div class="name">
				<a href="<?php echo $data->url?>"><img align="left"
					src="<?php echo ($data->image? Yii::app()->baseUrl.'/' .$data->image:Yii::app()->theme->baseUrl .'/images/group_logo_default60.jpg')?>"
					alt="" /> <?php echo CHtml::encode($data->group_name); ?> </a>
				
					<?php echo $data->description; ?>
			</div>			

			<div class="clear"></div>
		</div>
		<div class="block-content">
		
		<div class="clear"></div>
		</div>
		
	</div>
	<div class="clear"></div>
</div>

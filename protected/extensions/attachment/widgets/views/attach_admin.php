<div id="<?php echo $options['id']?$options['id']:"attachment_wrap" ?>"
	class="attachment-wrap <?php echo $options['class']?>">

	<div class="muti-upload" >
	<?php
	CHtml::resolveNameID($attachModel, 'file_path', $fileOptions);
	if($optons['showLabel'])
		echo CHtml::activeLabel($attachModel, 'file_path');
	if(!isset($fileOptions['class'])){
		$fileOptions['class']='multi';
	}else{
		$fileOptions['class']=$fileOptions['class'].' multi ';
	}

	echo CHtml::fileField($fileOptions['name'].'[]','',$fileOptions);
	?></div>
	
	
	<?php if(!$model->isNewRecord){ ?>
	<div class="attach-list">
		<?php 

		$attachModel->item_id = $model->id;
		$attachModel->class_code = $model->attachClassCode;
		
		
		$this->widget('zii.widgets.CListView', array(
			'dataProvider'=>$attachModel->seach(),
			'itemView'=>'_admin_list',
		)); 
		?>
	</div>
	<?php }?>
</div>

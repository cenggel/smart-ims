<div id="<?php echo $options['id']?$options['id']:"attachment_wrap" ?>"
	class="attachment-wrap <?php echo $options['class']?>">

	<div class="muti-upload" >
	<?php
	$attributeName = 'file_path';
	/*CHtml::resolveNameID($attachModel,$attributeName , $htmlOptions);
	if($optons['showLabel'])
		echo CHtml::activeLabel($attachModel, $attributeName);
	if(!isset($htmlOptions['class'])){
		$htmlOptions['class']='multi';
	}else{
		$htmlOptions['class']=$htmlOptions['class'].' multi ';
	}

	echo CHtml::fileField($htmlOptions['name'].'[]','',$htmlOptions);*/
	//var_dump($options);exit;
	$this->widget('CMultiFileUpload', array_merge( array(
			      'model'=>$attachModel,
			      'attribute'=>$attributeName,),$options)
			   );
	?></div>
	
	
	<?php if($model && !$model->isNewRecord){ ?>
	<div class="attach-list">
		<?php 

		$attachModel->item_id = $model->id;
		$attachModel->class_code = $model->getAttachClassCode();
		
		
		$this->widget('zii.widgets.CListView', array(
			'dataProvider'=>$attachModel->search(),
			'itemView'=>'_admin_list',
			'emptyText'=>'还没有上传文件',
		)); 
		?>
	</div>
	<?php }?>
</div>

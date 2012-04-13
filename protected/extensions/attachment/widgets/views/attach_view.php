<div id="<?php echo $options['id']?$options['id']:"attachment_wrap" ?>"
	class="attachment-wrap <?php echo $options['class']?>">


	
	<?php if(!$model->isNewRecord){ ?>
	<div class="attach-list">
		<?php 

		$attachModel->item_id = $model->id;
		$attachModel->class_code = $model->attachClassCode;
		$attachModel->isImage=1;
		$this->widget('bootstrap.widgets.BootThumbnails', array(
				'dataProvider'=>$attachModel->seach(),
				'template'=>"{items}\n{pager}",
				'itemView'=>'_thumb',
				// Remove the existing tooltips and rebind the plugin after each ajax-call.
				'afterAjaxUpdate'=>"js:function() {
					jQuery('.tooltip').remove();
					jQuery('a[rel=tooltip]').tooltip();
				}",
		));

		$attachModel->isImage=0;
		
		$this->widget('zii.widgets.CListView', array(
			'dataProvider'=>$attachModel->seach(),
			'itemView'=>'_list',
		)); 
		?>
	</div>
	<?php }?>
</div>

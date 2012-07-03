<div id="<?php echo $options['id']?$options['id']:"attachment_wrap" ?>"
	class="attachment-wrap <?php echo $options['class']?>">



	<?php if(!$model->isNewRecord){ ?>
	<div class="attach-list">
		<?php 

		$attachModel->item_id = $model->id;
		$attachModel->class_code = $model->getAttachClassCode();
		$attachModel->isImage=1;
		$data=$attachModel->search();
		//if($data->totalItemCount >0){
			//$this->widget('bootstrap.widgets.BootThumbnails', array(
			$this->widget('zii.widgets.CListView', array(
					'dataProvider'=>$data,
					'template'=>"{items}\n{pager}",
					'itemView'=>'_thumb',
					'itemsTagName'=>'ul',
					'itemsCssClass'=>'thumbnails',
					'emptyText'=>'',
					// Remove the existing tooltips and rebind the plugin after each ajax-call.
					'afterAjaxUpdate'=>"js:function() {
					jQuery('.tooltip').remove();
					jQuery('a[rel=tooltip]').tooltip();
		}",
			));
		//}

		$attachModel->isImage=0;
		$data=$attachModel->search();
		//if($data->totalItemCount >0){
			$this->widget('zii.widgets.CListView', array(
					'dataProvider'=>$data,
					'itemView'=>'_list',
					'emptyText'=>'',
					'template'=>"{items}\n{pager}",
			));
		//}
		?>
	</div>
	<?php }?>
</div>

<?php

//if($model->category){
//	$this->addBreadcrumbs(array($model->category->name=>$model->category->viewUrl));
//}
/*$this->breadcrumbs=array(
 'Articles'=>array('index'),
		$model->title,
);

$this->menu=array(
		array('label'=>'List Article', 'url'=>array('index')),
		array('label'=>'Create Article', 'url'=>array('create')),
		array('label'=>'Update Article', 'url'=>array('update', 'id'=>$model->id)),
		array('label'=>'Delete Article', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
		array('label'=>'Manage Article', 'url'=>array('admin')),
);*/
?>
<div class="article-detail">
	<div class="title">
		<h1 style="clear: both;">
			<?php echo $model->doc_name; ?>
		</h1>
	</div>
	<div class="time-fun">
		<?php echo Yii::app()->dateFormatter->format('yyyy-MM-dd hh:m:ss',$model->update_date);?>
		 | <a href="<?php echo Yii::app()->urlManager->createUrl('/user/user/view',array('id'=>$model->create_user));?>"> <?php echo $model->author->profile->firstname?></a>
		 
	</div>
	
	<div class="article-content">
	  <?php echo "描述：" . $model->description?>
	</div>
	<div class="article-content">
	  <?php echo "最新更新说明：" . $model->update_note?>
	</div>
	


	<?php $this->widget('ext.form.markitup.Highlighter');?>
	
	<div class="attachments">
	
	  <div class="attach-list">
		<?php 
		    
			$data=$model->search();
//			$this->widget('zii.widgets.CListView', array(
//					'dataProvider'=>$data,
//					'template'=>"{items}\n{pager}",
//					'itemView'=>'_thumb',
//					'itemsTagName'=>'ul',
//					'itemsCssClass'=>'thumbnails',
//					'emptyText'=>'',
//					// Remove the existing tooltips and rebind the plugin after each ajax-call.
//					'afterAjaxUpdate'=>"js:function() {
//					jQuery('.tooltip').remove();
//					jQuery('a[rel=tooltip]').tooltip();
//		}",
//			));

			$this->widget('zii.widgets.CListView', array(
					'dataProvider'=>$data,
					'itemView'=>'_list',
					'emptyText'=>'',
					'template'=>"{items}\n{pager}",
			));
		?>
	</div>
	</div>
	
	<?php  $this->widget('comments.widgets.ECommentsListWidget', array(
    'model' => $model,
			'theme'=>'redmond',
	'cssFile'=>'',
)); 

	?>
	
	
</div>

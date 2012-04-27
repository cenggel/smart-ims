<?php

if($model->category){
	$this->addBreadcrumbs(array($model->category->name=>$model->category->viewUrl));
}
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
			<?php echo $model->title; ?>
		</h1>
	</div>
	<div class="time-fun">
		<?php echo Yii::app()->dateFormatter->format('yyyy-MM-dd hh:m:ss',$model->update_date);?>
		 | <a href="<?php echo Yii::app()->urlManager->createUrl('/user/user/view',array('id'=>$model->user_id));?>"> <?php echo $model->author->profile->firstname?></a>
		 | <?php echo Yii::t('core','Views :{num}',array('{num}'=>$model->views))?>
	</div>
	
	<div class="article-content">
	  <?php echo $model->content?>
	</div>
	
	<div class="tags round">
	  <span>Tags:</span>
	   <?php 
	     $this->widget('zii.widgets.CMenu',array(
	     		'items'=>Tag::string2TagLink($model->tags, 
	     				  'site/article/tag',
	     				  array('group_id'=>$model->group_id,
	     				'class_code'=>$model->class_code)),
	     		));
	   ?>
	</div>

	<?php $this->widget('ext.form.markitup.Highlighter');?>
	
	<div class="attachments">
	
	   <?php 
	    $this->widget('ext.attachment.widgets.AttachWidget',array(
	    		'model'=>$model,
	    		'type'=>'view',
	    		))
	   ?>
	</div>
	
	<?php $this->widget('comments.widgets.ECommentsListWidget', array(
    'model' => $model,
			'theme'=>'redmond',
));?>
	
	
</div>

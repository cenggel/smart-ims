<div class="article-list-row">

	<div class="title">
		<span><?php echo CHtml::link($data->title,$data->url) ?></span>
		<div class="date-user floatright">
			<?php echo Yii::app()->dateFormatter->format('yyyy-MM-dd hh:m:ss',$data->update_date);?>
			| <a
				href="<?php echo Yii::app()->urlManager->createUrl('/user/user/view',array('id'=>$model->user_id));?>">
				<?php echo $data->author->profile->firstname?>
			</a> |
			<?php echo Yii::t('core','Views :{num}',array('{num}'=>$data->views))?>
		</div>
	</div>
    
	<div class="article-summary">
		<?php echo CHtml::encode( substr(strip_tags($data->content),0,150) ); ?>
	</div>

	<div class="tags">
		<?php echo CHtml::encode($data->tags); ?>
	</div>


</div>

<div class="article-list-row">

	<div class="title">
		<span><?php echo CHtml::link($data->doc_name,$data->url) ?></span>
		<?php if($data->metaData->hasRelation('attachCount')&& $data->attachCount >0) { echo CHtml::image(Yii::app()->theme->baseUrl.'/images/attach.png','attachment',array('width'=>16)); echo "({$data->attachCount})";}?>
		<div class="date-user floatright">
			<?php echo Yii::app()->dateFormatter->format('yyyy-MM-dd hh:m:ss',$data->update_date);?>
			| <a
				href="<?php echo Yii::app()->urlManager->createUrl('/user/user/view',array('id'=>$model->user_id));?>">
				<?php echo $data->author->profile->firstname?>
			</a> |
		</div>
	</div>
    
	<div class="article-summary">
		<?php echo CHtml::encode( substr(strip_tags($data->description),0,150) ); ?>
	</div>



</div>

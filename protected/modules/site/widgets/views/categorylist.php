
<div class="portlet-title">
	<?php echo Yii::t('siteModule.category', "Caegory List")?>
	<div class="floatright links" style="float: right">
		<a
			href="<?php echo Yii::app()->urlManager->createUrl('site/category/create',array('group_id'=>$group_id,'class_code'=>$class_code));?>">
			<?php echo CHtml::image(Yii::app()->theme->baseUrl .'/images/add_group.gif',"",array('class'=>'icon'))?>
		</a> <a
			href="<?php echo Yii::app()->urlManager->createUrl('site/category/admin',array('group_id'=>$group_id,'class_code'=>$class_code));?>">
			<?php echo CHtml::image(Yii::app()->theme->baseUrl .'/images/config16_g.gif',"",array('class'=>'icon'))?>
		</a>
	</div>
</div>
<?php $this->widget('bootstrap.widgets.BootMenu', array(
		'type'=>'list',// '', 'tabs', 'pills' (or 'list')

		'items'=>$items,
));?>

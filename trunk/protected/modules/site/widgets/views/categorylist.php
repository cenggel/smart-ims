<div id="category-list-sidebar">
<div class="portlet-title">
	<?php echo Yii::t('siteModule.category', "Category List")?>
	<div class="floatright links" style="float: right">
	   <?php if(Yii::app()->user->checkAccess('Site.Category.Create')){?>
		<a
			href="<?php echo Yii::app()->urlManager->createUrl('site/category/create',$params);?>">
			<?php echo CHtml::image(Yii::app()->theme->baseUrl .'/images/add_group.gif',"",array('class'=>'icon'))?>
		</a> 
		<?php }?>
		<?php if(Yii::app()->user->checkAccess('Site.Category.Admin')||Yii::app()->user->checkAccess('op_admin_all_category')){?>
		<a
			href="<?php echo Yii::app()->urlManager->createUrl('site/category/admin',$params);?>">
			<?php echo CHtml::image(Yii::app()->theme->baseUrl .'/images/config16_g.gif',"",array('class'=>'icon'))?>
		</a>
		<?php }?>
	</div>
</div>
<?php $this->widget('bootstrap.widgets.BootMenu', array(
		'type'=>'list',// '', 'tabs', 'pills' (or 'list')

		'items'=>$items,
));?>
</div>
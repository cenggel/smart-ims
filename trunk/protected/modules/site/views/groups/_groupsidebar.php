<div class="portlet">
   <div class="portlet-decoration">
	<div class="portlet-title">
	    <?php echo Yii::t('siteModule.groups', "Group members")?>
	    <?php if(Yii::app()->user->checkAccess('Site.Groups.Update')){?>
		<div class="floatright links" style="float: right">
			<a
				href="<?php echo Yii::app()->urlManager->createUrl('/groups/update',array('id'=>$group->id));?>">
				<?php echo CHtml::image(Yii::app()->theme->baseUrl .'/images/add_group.gif',"",array('class'=>'icon'))?>添加成员
			</a>
		</div>
		<?php }?>
	</div>
	</div>
	<div class="portlet-content group-member-list">
	<ul class="clean-list">
		<?php foreach($group->members as $m):?>
		<li><?php echo CHtml::image($m->profile->userImage,"",array('class'=>'icon','width'=>30,'height'=>'30')); echo CHtml::link( $m->profile->firstname,
		Yii::app()->urlManager->createUrl('user/user/view',array('id'=>$m->id))); ?>
		</li>
		<?php endforeach?>
	</ul>
	</div>
</div>

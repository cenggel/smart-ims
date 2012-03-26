<?php $this->beginContent('//layouts/main'); ?>
<div class="grid_6 left-sidebar">
	<div id="sidebar">
	<?php
	
	$this->beginWidget('zii.widgets.CPortlet');
	$this->widget('widgets.MemberInfo',array('visible'=>!Yii::app()->user->isGuest));
	$this->endWidget();
	    
	
		$this->beginWidget('zii.widgets.CPortlet', array(
			'title'=>'Operations',
		));
		$this->widget('zii.widgets.CMenu', array(
			'items'=>$this->menu,
			'htmlOptions'=>array('class'=>'operations-new'),
		));
		$this->endWidget();
		
	?>
	</div><!-- sidebar -->
</div>
<div class="grid_18 ">
	<div id="main-content">
		<?php echo $content; ?>
	</div><!-- content -->
</div>

<?php $this->endContent(); ?>
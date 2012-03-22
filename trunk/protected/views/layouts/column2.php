<?php $this->beginContent('//layouts/main'); ?>
<div class="grid_5 left-sidebar">
	<div id="sidebar">
	<?php
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
<div class="grid_19 ">
	<div id="main-content">
		<?php echo $content; ?>
	</div><!-- content -->
</div>

<?php $this->endContent(); ?>
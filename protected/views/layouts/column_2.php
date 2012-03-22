<?php $this->beginContent('//layouts/main'); ?>
<div class="grid_3">
	<div id="sidebar">
	<?php
		
		$this->widget('zii.widgets.CMenu', array(
			'items'=>$this->submenu,
			'htmlOptions'=>array('class'=>'sections'),
		));
	?>
	</div><!-- sidebar -->
</div>
<div class="grid_9">
	<div id="main-content">
		<?php echo $content; ?>
	</div><!-- content -->
</div>

<?php $this->endContent(); ?>
<?php $this->beginContent('//layouts/main'); ?>

<!-- left-bar -->
<DIV style="BACKGROUND: #ffffff; HEIGHT: 480px; OVERFLOW: hidden"
	id=a_left>
	<DIV
		style="BORDER-BOTTOM: 0px; BACKGROUND: none transparent scroll repeat 0% 0%">
		<DIV style="BACKGROUND-COLOR: #fff" class=tree_div_border>
			<?php $this->widget('widgets.MemberInfo',array('visible'=>!Yii::app()->user->isGuest));
			$this->beginWidget('zii.widgets.CPortlet', array(
					'title'=>'Operations',
			));
			$this->widget('zii.widgets.CMenu', array(
					'items'=>$this->menu,
					'htmlOptions'=>array('class'=>'operations-new'),
			));
			$this->endWidget();
			?>

		</DIV>
	</DIV>
</DIV>
<!-- left-bar  end-->

<DIV style="HEIGHT: 480px; MARGIN-LEFT: 208px" id=a_right>
	<?php echo $content; ?>
</DIV>


<?php $this->endContent(); ?>
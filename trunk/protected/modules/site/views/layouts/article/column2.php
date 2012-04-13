<?php $this->beginContent('//layouts/main'); ?>
<div class="grid_6 left-sidebar">
	<div id="sidebar">
		<?php

		$this->beginWidget('zii.widgets.CPortlet');
		$this->widget('widgets.MemberInfo',array('visible'=>!Yii::app()->user->isGuest));
		$this->endWidget();
			

		if(isset($this->menu) && count($this->menu)>0){
			//var_dump($this->menu);
			$this->beginWidget('zii.widgets.CPortlet', array(
					'title'=>'Operations',
			));
			$this->widget('zii.widgets.CMenu', array(
					'items'=>$this->menu,
					'htmlOptions'=>array('class'=>'operations-new'),
			));
			$this->endWidget();
		}

		if(isset($this->blocks['left']) && is_array($this->blocks['left'])){
			$this->renderPartial('//layouts/_side_block',array('blocks'=>$this->blocks['left']));
		}
		?>
	</div>
	<!-- sidebar -->
</div>
<div class="grid_18 ">
	<div id="main-content">
		<div class="article-operation floatright">
			<?php 
			$this->widget('zii.widgets.CMenu',array(
					'items'=>$this->article_menu));
			?>
			<div class="clear"></div>
		</div>
		<?php echo $content; ?>
	</div>
	<!-- content -->
</div>

<?php $this->endContent(); ?>
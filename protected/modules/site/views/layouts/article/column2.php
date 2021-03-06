<?php $this->beginContent('//layouts/main'); ?>
<div class="span3 left-sidebar">
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
		
		/*$this->widget('ext.cumulus.Tagcloud',
				array(
						'tags' =>$tags,
						'width'=>220,
						'height'=>'220',
						'bgcolor'=>'0x55555',
						
				));
				*/
		?>
	</div>
	<!-- sidebar -->
</div>
<div class="span9 ">
	<div id="main-content">
		<div class="article-operation floatright">
			<?php 
			//print_r($this->article_menu);
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
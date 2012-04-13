<?php
$this->breadcrumbs=array(
	'Member',
);?>

<div class="grid_6 left-sidebar">
  <div id="sidebar">
		<?php $this->widget('widgets.MemberInfo' );?>
		<?php
		$this->beginWidget('zii.widgets.CPortlet',array('title'=>'工作组'));
		 $this->widget('site.widgets.MemberGroup' ,array('visible'=>!Yii::app()->user->isGuest));
		$this->endWidget();
		?>
	</div>	
</div>
   
<div class="grid_18"></div>

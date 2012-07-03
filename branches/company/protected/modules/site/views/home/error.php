<?php
$this->pageTitle=Yii::app()->name . ' - Error';
$this->breadcrumbs=array(
	'Error',
);
?>
<div style="text-align:center;">
<div style="text-align:left; padding:20px;  margin:auto; display:inline-block	;" class="errorSummary" >
<h2><?php echo CHtml::image(Yii::app()->theme->baseUrl .'/images/warning_01.gif',"ERROR"); echo "&nbsp;&nbsp; $code"; ?></h2>

<div class="error ">
<?php echo CHtml::encode($message); ?>
</div>
</div>
</div>
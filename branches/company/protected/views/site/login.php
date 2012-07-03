<?php
$this->pageTitle=Yii::app()->name . ' - Login';
$this->breadcrumbs=array(
	'Login',
);
?>
 <div class="grid_12center" style="margin-bottom:10px;">
    <div style="width:400px; text-align:left; margin:auto; border:1px solid #ddd; ">

<div class="form" style="padding:10px;">
<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'login-form',
	'enableAjaxValidation'=>true,
)); ?>

    
	<div class="row">
		<?php echo $form->labelEx($model,'username'); ?>
		<?php echo $form->textField($model,'username'); ?>
		<?php echo $form->error($model,'username'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'password'); ?>
		<?php echo $form->passwordField($model,'password'); ?>
		<?php echo $form->error($model,'password'); ?>
		<p class="hint">
			
		</p>
	</div>

	<div class="row rememberMe">
		<?php echo $form->checkBox($model,'rememberMe'); ?>
		<?php echo $form->label($model,'rememberMe'); ?>
		<?php echo $form->error($model,'rememberMe'); ?>
	</div>
<!--
	<div class="row">
	<?php echo CHtml::activeLabel($model,'verifyCode'); ?>
	<div class="pt">
		<?php $this->widget('CCaptcha'); ?><br/>
		<?php echo CHtml::activeTextField($model,'verifyCode',array('class'=>'t_input')); ?>
	</div>
	<p class="hint">请输入上面的4位字母或数字，看不清可刷新</p>
</div> -->
	<div class="inquiry row buttons">
		<?php echo CHtml::submitButton('登录',array('class'=>'btn_orange_ss')); ?> &nbsp;&nbsp;<a href="<?php echo CController::createUrl('user/create');?>">还没有帐户，免费注册</a>
	</div>

<?php $this->endWidget(); ?>
</div><!-- form -->
	</div>
  </div>
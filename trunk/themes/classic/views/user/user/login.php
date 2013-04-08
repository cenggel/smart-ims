<?php $this->params['contentClass'] = '';?>
<div class="row">
<div class="sys-info span6 clearfix">&nbsp;</div>

<div class="sign-in span6">
<div class="signin-box form">
	<h1>
		登录
	</h1>
<?php echo CHtml::beginForm(); ?>
<?php echo CHtml::errorSummary($model); ?>
<?php if(Yii::app()->user->hasFlash('loginMessage')): ?>

<div class="success">
	<?php echo Yii::app()->user->getFlash('loginMessage'); ?>
</div>

<?php endif; ?>

	<div class="twolin">
		<div id="login_in">
			<p>				
		
				<strong><?php echo CHtml::activeLabelEx($model,'username'); ?></strong>
				<?php echo CHtml::activeTextField($model,'username' ,array('class'=>'medium-input')) ?>
			</p>
			<p>
		
					<strong><?php echo CHtml::activeLabelEx($model,'password'); ?></strong>
				<?php echo CHtml::activePasswordField($model,'password',array('class'=>'medium-input')) ?>
			</p>

			<p>
				<label>
					&nbsp;
				</label>
				<?php echo CHtml::submitButton(UserModule::t("Login")); ?>
				
				&nbsp;<?php echo CHtml::link(UserModule::t("Register"),Yii::app()->getModule('user')->registrationUrl); ?> | <?php echo CHtml::link(UserModule::t("Lost Password?"),Yii::app()->getModule('user')->recoveryUrl); ?>
			</p>
			<p class="rememberMe">
				<?php echo CHtml::activeCheckBox($model,'rememberMe'); ?>
				<?php echo CHtml::activeLabelEx($model,'rememberMe'); ?>
			</p>
		</div>
	</div>
<?php echo CHtml::endForm(); ?>
</div>
</div>
</div>

<?php
$form = new CForm(array(
    'elements'=>array(
        'username'=>array(
            'type'=>'text',
            'maxlength'=>32,
        ),
        'password'=>array(
            'type'=>'password',
            'maxlength'=>32,
        ),
        'rememberMe'=>array(
            'type'=>'checkbox',
        )
    ),

    'buttons'=>array(
        'login'=>array(
            'type'=>'submit',
            'label'=>'Login',
        ),
    ),
), $model);
?>
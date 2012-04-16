<?php $this->params['contentClass'] = '';
Yii::app()->clientScript->registerCssFile(Yii::app()->getTheme()->getBaseUrl() . "/css/login.css");
		Yii::app()->clientScript->registerCssFile(Yii::app()->getTheme()->getBaseUrl() . "/css/tips.css");
		?>

<div id="bodyContainer">
	<div id="headerContainer">
		<div id="header_top">
			<div class="himg">
				<a href="javascript:void(0);"><img
					src="<?php echo Yii::app()->getTheme()->getBaseUrl(); ?>/images/toplogo110720.jpg"
					title="今目标企业工作平台" border="0" /> </a>
			</div>
			<div class="slogan"></div>
			<div class="htext">
				<div>
					<a href="javascript:void(0);" onclick="void(0);">设为收藏</a> | <a
						href="javascript:void(0);">首页</a> | <a href="javascript:void(0);">在线咨询</a>
				</div>
				<div class="hoper">服务热线：0471-8010532</div>
			</div>
		</div>
		<div class="header_simpline"></div>
		<div class="cb"></div>
	</div>
	<div id="container">
		<!--<form name="jingoalLoginForm" id="jingoalLoginForm" method="post" action="<?php echo $this->createUrl("auth/login",array("aa"=>"bb"));?>">-->
		<?PHP
		$form=$this->beginWidget('CActiveForm',array(
				'id'=>'login-form'
		));
		?>
		<center>
			<div class="login_bg">
				<div class="login_cont">
					<div class="login_bo_t"></div>
					<div class="login_bo">
						<div class="login_win" id="login_win">
							<div class="ti">
								<b class="login_ico login_ti_ico"></b>登录系统
							</div>
							<div class="label">
								<span class="lb">登录帐号:</span>
								<!--<input tabindex="1" class="in"  id="loginNameNomal" name="loginName"  value="" maxlength="100" type="text"/>-->
								<?php echo CHtml::activeTextField($model,'username' ,array('class'=>'in','tabindex'=>"1",'maxlength'=>"100")) ?>
								<a id="accountTip2" rel="tooltip" title="请填写用户名或电子邮件地址" href="javascript:void(0);">登录帐号？</a>
							</div>
							<div class="label">
								<span class="lb">&nbsp;&nbsp;密&nbsp;&nbsp;码:</span>
								<!--<input tabindex="2" class="in" id="pwd" 	maxlength="20" type="password" />-->
								<?php echo CHtml::activePasswordField($model,'password',array(
										'class'=>'in',
										'tabindex'=>'2',
										'maxlength'=>'20',
								)) ;?>

								<?php echo CHtml::link(UserModule::t("Lost Password?"),Yii::app()->getModule('user')->recoveryUrl); ?>
							</div>
							<div class="label">
								<span class="save"> <!--<input tabindex="3" name="saveinfo" id="saveinfo" type="checkbox"  />-->
									<?php echo CHtml::activeCheckBox($model,'rememberMe',array('tabindex'=>'3','style'=>"display:inline;")); ?> 
									<?php echo CHtml::activeLabelEx($model,'rememberMe',array('style'=>'display:inline;')); ?>
								</span>
							</div>
							<div class="cb"></div>
							<div class="btn" id="insertDiv">
								<!--<input tabindex="4" value="登  录" class="login_ico login_nor_btn" type="submit"/>-->
								<?PHP
								echo CHtml::submitButton('登  录',array(
										'class'=>'login_ico login_nor_btn',
										'tabindex'=>'4',
								));
								?>
								<div class="cb"></div>
							</div>
							<div class="no_acco">
								还没有帐号？ <?php echo CHtml::link(UserModule::t("Register"),Yii::app()->getModule('user')->registrationUrl); ?>
							</div>
						</div>
						<div class="login_faq">
							<ul>
							<!-- 	<li>·<a target="_blank" href="javascript:void(0);">什么是数字证书？</a>
								</li>
								<li style="width: 200px;">·保护您的密码请阅读 <a
									href="javascript:void(0);">密码安全</a>
								</li>  -->
							</ul>
							<div class="cb"></div>
						</div>
					</div>
					<div class="login_bo_b"></div>
				</div>
				<div class="login_rightbar">
					<div class="login_client">
						<input type="button" onclick="void(0);"
							class=" login_ico login_download_btn" value="立即下载" />
					</div>
					<div class="login_mobile">
						<input type="button" onclick="void(0);"
							class=" login_ico login_downloadm_btn" value="立即下载" />
					</div>
				</div>
				<div class="cb"></div>
			</div>
		</center>
		<!---</form>-->
		<?PHP $this->endWidget()?>
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
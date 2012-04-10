<?php
	
//
class AuthController extends Controller
{
	public $layout='blank';
	/**
	*私有变量,保存临时使用的model实例
	*/
	private $_model;
	
	/**
	*配置过滤条件,调用accessRules中的过滤规则
	*/
	public function filters()
	{
		return array('accessControl');
	}
	/**
	*对Action的访问规则定义
	*/
	public function accessRules()
	{
		return array();
	    
	    return array(
	    	array(//暂时不做权限控制,功能完成后,增加具体的访问控制
	    	  'allow',
	    	  'users'=>array('*'),
	    	),
	    );
	}
	
	/**
	*用户登录认证动作
	*/
	public function actionLogin()
	{
		Yii::app()->clientScript->registerCssFile(Yii::app()->getTheme()->getBaseUrl() . "/css/login.css");
		Yii::app()->clientScript->registerCssFile(Yii::app()->getTheme()->getBaseUrl() . "/css/tips.css");
		Yii::app()->clientScript->registerCoreScript('jquery');
		Yii::app()->clientScript->registerScriptFile(Yii::app()->getTheme()->getBaseUrl() . "/scripts/mergedjs.js");
		Yii::app()->clientScript->registerScriptFile(Yii::app()->getTheme()->getBaseUrl() . "/scripts/login.js");
		
		$this->render('login',array());
	}
}
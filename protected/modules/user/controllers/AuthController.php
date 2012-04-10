<?php
	
//
class AuthController extends Controller
{
	public $layout='blank';
	/**
	*˽�б���,������ʱʹ�õ�modelʵ��
	*/
	private $_model;
	
	/**
	*���ù�������,����accessRules�еĹ��˹���
	*/
	public function filters()
	{
		return array('accessControl');
	}
	/**
	*��Action�ķ��ʹ�����
	*/
	public function accessRules()
	{
		return array();
	    
	    return array(
	    	array(//��ʱ����Ȩ�޿���,������ɺ�,���Ӿ���ķ��ʿ���
	    	  'allow',
	    	  'users'=>array('*'),
	    	),
	    );
	}
	
	/**
	*�û���¼��֤����
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
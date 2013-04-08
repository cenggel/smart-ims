<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends RController
{
	/**
	 * @var string the default layout for the controller view. Defaults to 'column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout='//layouts/column1';
	/**
	 * @var array context menu items. This property will be assigned to {@link CMenu::items}.
	 */
	public $menu=array();

	public $submenu = array();

	public $blocks= array();
	/**
	 * @var array the breadcrumbs of the current page. The value of this property will
	 * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
	 * for more details on how to specify this property.
	 */
	public $breadcrumbs=array();

	public $params = array();

	public $sumitActions= array('create','update','delete');
	
	protected $_tux = false;
	
	protected $hasError = false;
	
	protected function beforeAction($action)
	{ //print_r(Yii::app()->user); exit;
		if(parent::beforeAction($action)){
			if(in_array($action->getId(), $this->sumitActions)){
			  // $this->_tux=	Yii::app()->db->beginTransaction();
			}
			
			Yii::app()->clientScript->registerCssFile(Yii::app()->theme->baseUrl . '/css/redmond/jquery-ui-1.8.18.custom.css');
			Yii::app()->clientScript->registerCoreScript('jquery');
			Yii::app()->clientScript->registerCoreScript('jquery.ui');
			Yii::app()->clientScript->registerScriptFile(Yii::app()->theme->baseUrl . '/scripts/main.js');
			//Yii::app()->clientScript->registerScriptFile(Yii::app()->theme->baseUrl . '/scripts/jquery.scrollabletab.js');
			//Yii::app()->clientScript->registerScriptFile(Yii::app()->theme->baseUrl . '/scripts/jquery-ui-1.8.extend.js');


			/*$this->menu=array(
			 'items'=>array(
			 		array('label'=>Yii::t('core','Home'),
			 				'url'=>array('/site/index')
			 		),
			 		array('label'=>Yii::t('core','About'), 'url'=>array('/site/page', 'view'=>'about')),
			 		array('label'=>Yii::t('core','Contact'), 'url'=>array('/site/contact')),
			 		//array('label'=>'Login', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
			 		//array('label'=>'Logout ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest),
			 		array('url'=>array('/rights'), 'label'=>Yii::t('core','Rights'), 'visible'=>Yii::app()->user->isSuperuser==true),
			 		array('url'=>Yii::app()->getModule('user')->loginUrl, 'label'=>Yii::app()->getModule('user')->t("Login"), 'visible'=>Yii::app()->user->isGuest),
			 		array('url'=>Yii::app()->getModule('user')->registrationUrl, 'label'=>Yii::app()->getModule('user')->t("Register"), 'visible'=>Yii::app()->user->isGuest),
			 		array('url'=>Yii::app()->getModule('user')->profileUrl, 'label'=>Yii::app()->getModule('user')->t("Profile"), 'visible'=>!Yii::app()->user->isGuest),
			 		array('url'=>Yii::app()->getModule('user')->logoutUrl, 'label'=>Yii::app()->getModule('user')->t("Logout").' ('.Yii::app()->user->name.')', 'visible'=>!Yii::app()->user->isGuest),
			 		 
			 ));*/
			return true;
		}
		return false;
	}

	
	protected function beforeRender($view){
		return true;
	}

	public function filters() {
		//print_r("user".Yii::app()->user->id);
		return array( 'rights', 
				);
	}

	public function allowedActions() {
		if(isset(Yii::app()->params['allowedActions'][Yii::app()->controller->getId()])){
			return Yii::app()->params['allowedActions'][Yii::app()->controller->getId()];
		}
		return 'index, login,logout,error';
	}

	public function hasRight($right_code, $params=array(), $allowCaching=false){
		//print_r($right_code);
		//print_r($params);
		if(is_array($right_code)){
			foreach ($right_code as $right){
				if(Yii::app()->user->checkAccess($right ,$params,$allowCaching))
					 return true;
			}
			return false;
		}else{
		 	return Yii::app()->user->checkAccess($right_code ,$params,$allowCaching);
		}
	}

	public function addBreadcrumbs($bread){
		if(is_array($bread))
			$this->breadcrumbs = array_merge($this->breadcrumbs,$bread);
		if(is_string($bread)){
			$this->breadcrumbs[]=$bread;
		}
	}
	
	public function getParam($name,$defaultValue=null){
		return Yii::app()->request->getParam($name,$defaultValue);
	}
	
	public function redirect($url,$terminate=true,$statusCode=302){
		$this->afterAction($this->getAction());
		
		parent::redirect($url,$terminate,$statusCode);
	}
	
	
}
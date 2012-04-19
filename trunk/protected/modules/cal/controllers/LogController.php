<?PHP
	/**
	日志处理,日志包括:工作日志,日程安排等
	add by lifuan 20120419
	*/
class LogController extends Controller
{
	/**
	成员变量的定义
	*/
	
	/**
	在执行所有的action之前要进行的初始化工作
	*/
	public function init()
    {
    	$this->layout='blank';
    	$this->pageTitle='日志管理';
	}
	
	/**
	登录权限控制
	*/
	public function filters()
	{
		return array(
			'accessControl',
		);
	}
	
	/**
	登录认证
	*/
	public function accessRules()
	{
		return array(
			array('allow',
			    'users'=>array('*'),
			),
		);
	}
	
	/**
	日志管理主页面
	*/
	public function actionIndex()
	{
	    Yii::app()->clientScript->registerCssFile(Yii::app()->theme->baseUrl.'/css/WdatePicker.css');
		Yii::app()->clientScript->registerCssFile(Yii::app()->theme->baseUrl.'/css/mergedstyle.css');
		Yii::app()->clientScript->registerCssFile(Yii::app()->theme->baseUrl.'/css/module.css');
		Yii::app()->clientScript->registerCssFile(Yii::app()->theme->baseUrl.'/css/relogin.css');
		Yii::app()->clientScript->registerCssFile(Yii::app()->theme->baseUrl.'/css/ui.css');
		Yii::app()->clientScript->registerCssFile(Yii::app()->theme->baseUrl.'/css/window.css');
		
		$this->render('index');
	}
}
?>
<?PHP
	/**
	��־����,��־����:������־,�ճ̰��ŵ�
	add by lifuan 20120419
	*/
class LogController extends Controller
{
	/**
	��Ա�����Ķ���
	*/
	
	/**
	��ִ�����е�action֮ǰҪ���еĳ�ʼ������
	*/
	public function init()
    {
    	$this->layout='blank';
    	$this->pageTitle='��־����';
	}
	
	/**
	��¼Ȩ�޿���
	*/
	public function filters()
	{
		return array(
			'accessControl',
		);
	}
	
	/**
	��¼��֤
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
	��־������ҳ��
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
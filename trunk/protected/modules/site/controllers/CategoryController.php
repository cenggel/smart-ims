<?php

class CategoryController extends Controller
{

	public $working_group=null;
	public $working_class=null;
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
				'accessControl', // perform access control for CRUD operations
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
				array('allow',  // allow all users to perform 'index' and 'view' actions
						'actions'=>array('index','view'),
						'users'=>array('*'),
				),
				array('allow', // allow authenticated user to perform 'create' and 'update' actions
						'actions'=>array('create','update'),
						'users'=>array('@'),
				),
				array('allow', // allow admin user to perform 'admin' and 'delete' actions
						'actions'=>array('admin','delete'),
						'users'=>array('admin'),
				),
				array('deny',  // deny all users
						'users'=>array('*'),
				),
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
				'model'=>$this->loadModel($id),
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate($group_id=0,$class_code='')
	{
		$model=new Category;
		$model->group_id = $group_id;
		$model->class_code = $class_code;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Category']))
		{
			$model->attributes=$_POST['Category'];
			if($model->save())
				$this->redirectToArticle($model);
				//$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('create',array(
				'model'=>$model,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Category']))
		{
			$model->attributes=$_POST['Category'];
			if($model->save())
				$this->redirectToArticle($model);
				//$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('update',array(
				'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		if(Yii::app()->request->isPostRequest)
		{
			// we only allow deletion via POST request
			$this->loadModel($id)->delete();

			// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
			if(!isset($_GET['ajax']))
				$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
		}
		else
			throw new CHttpException(400,'Invalid request. Please do not repeat this request again.');
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		
		$id = (int) Yii::app()->request->getParam('id');
		$category = false;
		
		if($id >0){
			$category = $this->loadModel($id);
			$_GET['category_id'] = $id;
			
			$this->redirectToArticle($category);
			
		}
		
		$data = Category::model();
		if($id) $data->parent_id = $id;
		if($this->working_class)  $data->class_code = $this->working_class;
		if($this->working_group) $data->group_id = $this->working_group->id;
		$dataProvider=$data->search();
		
		 $this->render('index',array(
		 		'dataProvider'=>$dataProvider,
		 		'model'=>$category,
		 ));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin($class_code,$group_id=0)
	{
		$model=new Category('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Category']))
			$model->attributes=$_GET['Category'];

		$model->class_code = $class_code;
		$model->group_id = $group_id;
		
		$this->render('admin',array(
				'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id)
	{
		$model=Category::model()->findByPk($id);
		if($model->group_id){
			$this->working_group= $model->group;
			$_GET['group_id'] = $model->group_id;
		}
		
		if($model->class_code){
			$this->working_class = $model->class_code;
			$_GET['class_code']= $model->class_code;
		}
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='category-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}

	public function beforeAction($action){
		
		
		$group_id = Yii::app()->request->getParam("group_id");
		$class_code = Yii::app()->request->getParam("class_code");

		$params =array();

		if($group_id >0){
			//echo "<br> here ...";
			$working_group = Groups::model()->findByPk($group_id);
			//var_dump($working_group);
			if( !$this->hasRight(array('op_view_all_groups','Site.Groups.View'),array('group'=>$working_group)))
			{
				throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
			}
				
			$params['group_id']=$group_id;
			$this->working_group = $working_group;


		}

		if($class_code){
			$this->working_class = $class_code;
			$params['class_code']=$class_code;
				

		}
		if($this->working_group)
			$this->addBreadcrumbs(array($this->working_group->group_name=>array('/groups/home','id'=>$this->working_group->id)));

		if($this->working_class)
			$this->addBreadcrumbs(array(Enumeration::item('ARTICLE_CLASS',$this->working_class)=>Yii::app()->urlManager->createUrl('site/article/index',$params)));

		$this->blocks['left'][]=array('widget'=>array('name'=>'site.widgets.CategoryList',
				'param'=>$params));
		return parent::beforeAction($action);
	}
	
	/**
	 * 
	 * @param Category $model
	 */
	protected function redirectToArticle($model){
		$params =array();
		if($model || $this->working_group) $params['group_id']= ($model?$model->group_id:$this->working_group->id);
		
		if($model || $this->working_class) $params['class_code']= ($this->working_class?$this->working_class:$model->class_code);
		if($model) $params['category_id']= $model->id;
		$this->redirect(Yii::app()->urlManager->createUrl('site/article/index',$params));
	} 
}

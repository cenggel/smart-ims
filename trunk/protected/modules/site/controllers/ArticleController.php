<?php

class ArticleController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';
	public $working_group =null;
	public $working_class = null;

	

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$model = $this->loadModel($id);
		
		if(!$this->working_class && $model->class_code){
			$this->working_class= $model->class_code;
			
		}
		
		if(!$this->working_group && $model->group_id){
			$this->working_group = Groups::model()->findByPk($model->group_id);
			
		}
		$this->render('view',array(
				'model'=>$model,
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate($class_code,$group_id=0)
	{
		$model=new Article;
		$model->class_code = $class_code;
		$model->group_id = $group_id;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Article']))
		{
			$model->attributes=$_POST['Article'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
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

		if(isset($_POST['Article']))
		{
			$model->attributes=$_POST['Article'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
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
	public function actionIndex($class_code=null,$group_id=0)
	{   //$class_code = $_GET['class_code'];
		//echo $class_code;
		//echo "<br> $group_id";

		$article = Article::model();
		if($class_code!=null){
			$this->working_class = $class_code;
			$article = $article->byClass($class_code);
		}
		if($group_id>0){
			$article = $article->byGroup($group_id);
		}

		$dataProvider=new CActiveDataProvider($article);
		$this->render('index',array(
				'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Article('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Article']))
			$model->attributes=$_GET['Article'];
		if(isset($_POST['Article']))
			$model->attributes=$_GET['Article'];
		
		$group_id = Yii::app()->request->getParam("group_id");
		$class_code = Yii::app()->request->getParam("class_code");
		if($group_id) $model->group_id = $group_id;
		if($class_code) $model->class_code = $class_code;

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
		$model=Article::model()->findByPk($id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='article-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}

	protected function beforeAction($action){
		$group_id = Yii::app()->request->getParam("group_id");
		$class_code = Yii::app()->request->getParam("class_code");

		if($group_id >0){
			//echo "<br> here ...";
			$working_group = Groups::model()->findByPk($group_id);
			//var_dump($working_group);
			if( !Yii::app()->user->checkAccess('op_view_all_groups') ||!Yii::app()->user->checkAccess('groups.view',array('group'=>$working_group)))
			{
				throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
			}
				
			$this->working_group = $working_group;
				
				
		}

		if($class_code){
			$this->working_class = $class_code;
		}
		
		return parent::beforeAction($action);
	}
	
	
	public function beforeRender($view){
		$params =array();
		if($this->working_class)
			$params['class_code'] = $this->working_class;
		if($this->working_group){
			$params['group_id'] = $this->working_group->id;
		}
		$this->menu=array(
				
				array('label'=>Yii::t('siteModule.article','Create Article'), 'url'=>array_merge(array('create'),$params)),
				array('label'=>Yii::t('siteModule.article','List Article'), 'url'=>array_merge(array('index'),$params)),
				array('label'=>Yii::t('siteModule.article','Manage Article'), 'url'=>array_merge(array('admin'),$params)),
				array('label'=>Yii::t('siteModule.article','Update Article'), 'url'=>array_merge(array('update', 'id'=>Yii::app()->request->getParam("id")),$params),
						'visible'=>('view'==$this->getAction()->getId())),
				array('label'=>Yii::t('siteModule.article','Delete Article'), 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>Yii::app()->request->getParam("id")),'confirm'=>Yii::t('siteModule.article','Are you sure you want to delete this item?')),
						'visible'=>('view'==$this->getAction()->getId())),
				
		);
		
		return true;
	}
	

}

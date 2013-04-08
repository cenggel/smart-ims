<?php

class CaiController extends Controller
{
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
	public function actionCreate()
	{
		$model=new Cai;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Cai']))
		{
			$model->attributes=$_POST['Cai'];
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

		if(isset($_POST['Cai']))
		{
			$model->attributes=$_POST['Cai'];
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
	public function actionIndex()
	{
		$model = new Cai();
		$attr = $_POST['Cai']?$_POST['Cai']:$_GET['Cai'];
		$model->unsetAttributes();
		//var_dump($attr);
		$model->attributes = $attr;
	    if(!$model->cai_date){
			$week = date('w');
			$mon = date('Y-m-d',strtotime( '+'. 1-$week .' days' ));
			
			$model->end_date=">=".$mon;
		}
		$dataProvider=$model->search();
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		    'model'=>$model
		));
	}

	public function actionBook() {
		
	  if (isset ( $_POST ['Dingcan'] )) {
			$model = new Dingcan ();
			$model->attributes = $_POST ['Dingcan'];
			$model->user_id = Yii::app ()->user->id;
			
			$cai = Cai::model()->findByPk($model->cai_id);
			if(Cai){
				$model->total_price = $model->count * $cai->price;
			}
			if(!$model->book_date){
				$model->book_date =strtotime ( date ( 'Y-m-d' ) );
			}
	       if (! $model->save ())
				exit ( json_encode ( array ('result' => 'error', 'msg' => CHtml::errorSummary ( $model ) ) ) );
			else
				exit ( json_encode ( array ('result' => 'success', 'msg' => 'Your data has been successfully saved' ) ) );
		} else {
			exit ( json_encode ( array ('result' => 'error', 'msg' => 'No input data has been passed.' ) ) );
		}
			
	}
	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Cai('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Cai']))
			$model->attributes=$_GET['Cai'];
				
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
		$model=Cai::model()->findByPk($id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='cai-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	
	public function allowedActions() {
		if(isset(Yii::app()->params['allowedActions'][Yii::app()->controller->getId()])){
			return Yii::app()->params['allowedActions'][Yii::app()->controller->getId()];
		}
		return '';
	}
}

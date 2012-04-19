<?php

class GroupsController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	public $working_group = null;

	public $working_class = null;
	/**
	 * @return array action filters
	 */




	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->working_group  =$this->loadModel($id);
		$this->render('view',array(
				'model'=>$this->working_group,
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Groups;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		//$model->create_user = Yii::app()->user->id;
		if(isset($_POST['Groups']))
		{
			$trans = $model->getDbConnection()->beginTransaction();
			try{
				$model->attributes=$_POST['Groups'];
				//$model->members = User::model()->findByPk(Yii::app()->user->id);
				$model->members = array_merge(array(Yii::app()->user->id), $_POST['Groups']['members']);
				if($model->save()){
					$trans->commit();
					$this->redirect(array('view','id'=>$model->id));
				}
				$trans->rollBack();
			}catch(Exception $e){
				$trans->rollBack();
				throw $e;
			}
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
		$this->working_group  =$model;
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Groups']))
		{
			
			$trans = $model->dbConnection->beginTransaction();
			try{
				$model->attributes=$_POST['Groups'];
				$model->members = array_merge(array($model->create_user), $_POST['Groups']['members']);
				if($model->save()){
					echo "commited";
					$trans->commit();
					$this->redirect(array('view','id'=>$model->id));
				}
				$trans->rollBack();
			}catch (Exception $e){
				Yii::trace("update group info error ! {$id}");
				$trans->rollBack();
				Yii::app()->user->setFlash($e->getMessage());
			}
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
			$model =$this->loadModel($id);
			$trans = $model->dbConnection->beginTransaction();
			try{
				if($model->delete()){
					$trans->commit();
					// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
					if(!isset($_GET['ajax']))
						$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
				}
			}catch (Exception $e){
				$trans->rollBack();
				throw $e;
			}
		}
		else
			throw new CHttpException(400,Yii::t('siteModule.error','Invalid request. Please do not repeat this request again.'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$model = new Groups;
		if(!$this->hasRight('op_view_all_groups')){
			$model->create_user = (int)Yii::app()->user->id;
		}
		$dataProvider=new CActiveDataProvider('Groups');
		$this->render('index',array(
				'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Groups('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Groups']))
			$model->attributes=$_GET['Groups'];

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
		$model=Groups::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');

		//echo $this->hasRight('groups.view',array('group'=>$working_group));exit;
		/*if( !$this->hasRight('op_view_all_groups') || !$this->hasRight('Site.Groups.View',array('group'=>$working_group)))
		{
				
			$this->accessDenied();
		}*/
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='groups-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionHome($id)
	{
		$working_group = $this->loadModel($id);

		$this->working_group = $working_group;
		$this->render('home',array(
				'model'=>$working_group,
		));
	}

	public function actionAddMember($group_id){

		$this->working_group = $this->loadModel($group_id);

		if(!$this->hasRight('op_manage_group_member',array('group'=> $this->working_group))){
			$this->accessDenied();
		}

		if(Yii::app()->request->isPostRequest)
		{
			// we only allow deletion via POST request
			//echo "<pre>";print_r($_POST); exit;
			//$model = new GroupMember();
			//$model->attributes =$_POST['GroupMember'];

			$this->working_group->members= array_merge(array( $this->working_group->create_user),$_POST['GroupMember']['users']);
			// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
			//if(!isset($_GET['ajax']))
			//	$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
		}

		$model = new GroupMember();
		$model->groups_id = (int)$group_id;

		$model->users = $this->working_group->members;
		$users = User::model()->findAll();


		$this->render('addmember',array('model'=>$model,'users'=>$users,'group'=>$this->working_group));

	}
}

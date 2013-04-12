<?php

class RequestController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	public $working_group_request = null;

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
		//$this->working_group_request  =$this->loadModel($id);
		$this->working_group_request = Groups::model()->with(array('creator','members'=>array('with'=>'profile')))->findByPk($id);
		$this->render('view',array(
				'model'=>$this->working_group_request,
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$requestModel=new Request();
        $groupsModel = new Groups();
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		//$model->create_user = Yii::app()->user->id;
		if(isset($_POST['Request']) && isset($_POST['Groups']))
		{
			$connection = $groupsModel->getDbConnection();
			$trans = $connection->beginTransaction();
			try{
				$groupsModel->attributes=$_POST['Groups'];
				$groupsModel->group_type='request';
				$requestModel->attributes=$_POST['Request'];
				
				//$model->members = User::model()->findByPk(Yii::app()->user->id);
				$groupsModel->members = array_merge(array(Yii::app()->user->id), $_POST['Groups']['members']);
				if($groupsModel->save() ){
					$requestModel->groups_id = $groupsModel->id;
					if($requestModel->save()){
						$trans->commit();
					    $this->redirect(array('view','id'=>$groupsModel->id));
					}
//					$sql = "INSERT INTO request (groups_id, request_code , state ,create_date ,booking_release_date)
//						VALUES (:groups_id, :request_code, :state,:create_date,:booking_release_date)";
//					$command = $connection->createCommand($sql) ;
//					$command->bindValue(':groups_id', $groupsModel->id );
//					$command->bindValue(':request_code', $_POST['Request']['request_code']);
//					$command->bindValue(':state', '0');
//					$command->bindValue(':create_date', time());
//					$command->bindValue(':booking_release_date', $_POST['Request']['booking_release_date']);
//					$command->execute();
					
				}
				$trans->rollBack();
			}catch(Exception $e){
				$trans->rollBack();
				throw $e;
			}
		}

		$this->render('create',array(
				'requestModel'=>$requestModel,
		        'groupsModel'=>$groupsModel,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$groupsModel=$this->loadModel($id);
		$sql = "SELECT * FROM request where groups_id=:id ";
		$params = array();
		$params['id'] = $id;
		
		$requestModel = Request::model()->findBySql($sql,$params);
		$tmp = $requestModel;
		$this->working_group_request  =$groupsModel;
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Request']) && isset($_POST['Groups']))
		{
		    $connection = $groupsModel->getDbConnection();	
			$trans = $connection->beginTransaction();
			try{
				$groupsModel->attributes=$_POST['Groups'];
				$requestModel->attributes=$_POST['Request'];
				$requestModel->id=$tmp->id;
				$requestModel->groups_id = $tmp->groups_id;
				$requestModel->create_date = $requestModel->create_date;
				
				$groupsModel->members = array_merge(array($groupsModel->create_user), $_POST['Groups']['members']);
				if($groupsModel->save() && $requestModel->save()){
//					print_r($requestModel->id ."    ".$requestModel->groups_id."  ".$requestModel->request_code."   ".$requestModel->state."  ".$requestModel->create_date);
//					exit();
					$trans->commit();
//					echo "commited";
//					print_r("groupsModel save");
//					exit();
//					$sql = "update request set request_code=:request_code,booking_release_date=:booking_release_date where groups_id=:groups_id";
//					$command = $connection->createCommand($sql) ;
//					$command->bindValue(':groups_id', $groupsModel->id );
//					$command->bindValue(':request_code', $_POST['Request']['request_code']);
//					$command->bindValue(':booking_release_date', $_POST['Request']['booking_release_date']);
//					$command->execute();
					
					$this->redirect(array('view','id'=>$groupsModel->id));
				}
				$trans->rollBack();
			}catch (Exception $e){
				Yii::trace("update group info error ! {$id}");
				$trans->rollBack();
				Yii::app()->user->setFlash($e->getMessage());
			}
		}

		$this->render('update',array(
				'requestModel'=>$requestModel,
		        'groupsModel'=>$groupsModel,
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
		$dataProvider=new CActiveDataProvider('Groups',array(
        'criteria'=>array(
          'condition'=>"group_type='request'",
		  'with'=>'request',
       ))
       );
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

		$model->group_type='request';
		if(!$this->hasRight('op_manage_all_groups')){
			$model->create_user= Yii::app()->user->id;
		}
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

		//echo $this->hasRight('groups.view',array('group'=>$working_group_request));exit;
		/*if( !$this->hasRight('op_view_all_groups') || !$this->hasRight('Site.Groups.View',array('group'=>$working_group_request)))
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
		$working_group_request = $this->loadModel($id);

		$this->working_group_request = $working_group_request;
		$this->render('home',array(
				'model'=>$working_group_request,
		));
		
	}

	public function actionAddMember($group_id){

		$this->working_group_request = $this->loadModel($group_id);

		if(!$this->hasRight('op_manage_group_member',array('group'=> $this->working_group_request))){
			$this->accessDenied();
		}

		if(Yii::app()->request->isPostRequest)
		{
			// we only allow deletion via POST request
			//echo "<pre>";print_r($_POST); exit;
			//$model = new GroupMember();
			//$model->attributes =$_POST['GroupMember'];

			$this->working_group_request->members= array_merge(array( $this->working_group_request->create_user),$_POST['GroupMember']['users']);
			// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
			//if(!isset($_GET['ajax']))
			//	$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
		}

		$model = new GroupMember();
		$model->groups_id = (int)$group_id;

		$model->users = $this->working_group_request->members;
		$users = User::model()->findAll();


		$this->render('addmember',array('model'=>$model,'users'=>$users,'group'=>$this->working_group_request));

	}
	
}

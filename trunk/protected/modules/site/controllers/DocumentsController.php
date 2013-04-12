<?php

class DocumentsController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='article/column2';
	public $working_group_request =null;
	public $working_class = null;
	public $category = null;
	public $upload_path='uploads';
	
	public $article_menu =array();

	

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$model = $this->loadModel($id);
		if(!$this->hasRight('Site.Article.View',array('article'=>$model))){
			$this->accessDenied();
		}
		if(!$this->working_class && $model->class_code){
			$this->working_class= $model->class_code;
			
		}
		
		if(!$this->working_group_request && $model->groups_id){
			$this->working_group_request = Groups::model()->findByPk($model->groups_id);
			
		}
		
		$this->category= $model->category;
		$this->setMenu($model);
		//echo "11";
//		$model->updateViews();
		$this->render('view',array(
				'model'=>$model,
		));
	}
	
/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionViewhis($id)
	{
		$sql = "SELECT * FROM documents_history where id=:id order by version";
		$params = array();
		$params['id'] = $id;
		
		$model = DocumentsHistory::model()->findAllBySql($sql,$params);
		$modelnow = $this->loadModel($id);
//		if(!$this->hasRight('Site.Article.View',array('article'=>$model))){
//			$this->accessDenied();
//		}
		if(!$this->working_class && $model->class_code){
			$this->working_class= $model->class_code;
			
		}
		
		if(!$this->working_group_request && $model->groups_id){
			$this->working_group_request = Groups::model()->findByPk($model->groups_id);
			
		}
		
		$this->category= $model->category;
//		$this->setMenu($model);
		//echo "11";
//		$model->updateViews();
		$this->render('viewhis',array(
				'model'=>$model,
		        'modelnow'=>$modelnow,
		));
	}
	


	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate($class_code,$group_id=0,$category_id=0)
	{
		$model=new Documents;
		$model->class_code = $class_code;
		$model->groups_id = $group_id;
		$model->Category_id =$category_id;
		

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Documents']))
		{
			$model->attributes=$_POST['Documents'];
			
			$att = CUploadedFile::getInstance($model,'file_path');
			$basePath = $this->upload_path;
			
			if(substr($basePath, -1)=='/' ||substr($basePath, -1)=='\\' ){
				$basePath = substr($basePath, 0, strlen($basePath)-1);
			}
	
			if(!is_dir($basePath)){
				mkdir($basePath,0777,true);
			}
			if(! $att->hasError){
//				if($this->class_code)
//					$model->class_code = $this->class_code;
				$path = $basePath . '/' . md5($att->name).".".$att->extensionName;

				if (file_exists($path)) {
					$path = str_replace('.'.$att->extensionName,'-'.time().'.'.$att->extensionName,$path);
				}
				
				$model->file_path = $path;
				$model->doc_size = $att->size;
				$model->doc_type = $att->type;
				$att->saveAs($path);
				if($model->save()){
					//$att->saveAs($path);
					$this->redirect(array('view','id'=>$model->id));
				}else{
					unlink($path);
				}

			}else{
				Yii::app()->user->setFlash('error',Yii::t('core','<b>File upload error!</b> ERROR:{error} File Name:{name} ',array('{error}'=>$att->error,'{name}'=>$att->name)));
			}
	
			
			//echo "<pre>";print_r($value);
			
			
			
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
		
		$modelNew= $this->loadModel($id);
		$modelOld = new DocumentsHistory();
//		$model->unPurify();
        $att = CUploadedFile::getInstance($modelNew,'file_path');
        //var_dump($att); exit;
		$basePath = $this->upload_path;
		
		if(substr($basePath, -1)=='/' ||substr($basePath, -1)=='\\' ){
			$basePath = substr($basePath, 0, strlen($basePath)-1);
		}

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
		if(isset($_POST['Documents']))
		{
			$modelOld->attributes = $modelNew->attributes;
			$modelOld->isNewRecord = true;
			$modelOld->id=$id;
			$modelNew->attributes=$_POST['Documents'];
			if($att!==NULL){
				$path = $basePath . '/' . md5($att->name).".".$att->extensionName;
	
				if (file_exists($path)) {
					$path = str_replace('.'.$att->extensionName,'-'.time().'.'.$att->extensionName,$path);
				}
				$att->saveAs($path);
			}
			if($att == NULL){
				$modelNew->file_path = $modelOld->file_path;
				$modelNew->doc_size = $modelOld->doc_size;
			    $modelNew->doc_type = $modelOld->doc_type;
			}else{
				$modelNew->file_path = $path;
				$modelNew->doc_size = $att->size;
			    $modelNew->doc_type = $att->type;
			}
			
			
			$modelNew->version = $modelNew->version+1;
			
		    if($modelOld->save()){

		    	if( $modelNew->save()){
//		    		$trans->commit();
		    		
		    		$this->redirect(array('view','id'=>$modelNew->id));
		    	}
		    }	
			
		}

		$this->render('update',array(
				'model'=>$modelNew,
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
			$modelNew= $this->loadModel($id);
		    $modelOld = new DocumentsHistory();
		    $modelOld->attributes = $modelNew->attributes;
			$modelOld->isNewRecord = true;
			$modelOld->del_tag='1';
			$modelOld->id=$id;
		    if($modelOld->save()){
		    	$modelNew->delete();
		    }
			

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
	public function actionIndex($class_code=null,$group_id=0,$category_id=0,$tag=false)
	{   

		$article = Documents::model();
//		if($class_code!=null){
//			$this->working_class = $class_code;
//			$article = $article->byClass($class_code);
//		}
		if($group_id>0){
			$article = $article->byGroup($group_id);
		}
        
		
		if($category_id){
			$article->category_id = (int)$category_id;
			$this->category = Category::model()->findByPk((int)$category_id);
			$article = $article->byCategory($category_id);
		}
		
		
		if($tag){
			$article->withTag($tag);
		}
		
		$dataProvider=new CActiveDataProvider($article);
		$this->render('index',array(
				'dataProvider'=>$dataProvider,
		));
	}

	public function actionTag($tag){
		$article = new Article();
		$article->unsetAttributes();
		$this->layout="//layouts/column1";
		if($tag){
			$article->withTag($tag);
		}
		$dataProvider=new CActiveDataProvider($article->with('author')->published());
		$this->render('index',array(
				'dataProvider'=>$dataProvider,
		));
	}
	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Documents('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Documents']))
			$model->attributes=$_GET['Documents'];
		if(isset($_POST['Documents']))
			$model->attributes=$_GET['Documents'];		
		
		$group_id = Yii::app()->request->getParam("groups_id");
		$class_code = Yii::app()->request->getParam("class_code");
		if($group_id) $model->groups_id = $group_id;
		if($class_code) $model->class_code = $class_code;

		
		if(!$this->hasRight('op_manage_all_article')){
			$model->user_id = Yii::app()->user->id;
			$userFilter= false;			
		}else{
			$userFilter = CHtml::listData(User::model()->active()->findAll(), 'id', 'username');
		}
		$this->render('admin',array(
				'model'=>$model,
				'userFilter'=>$userFilter,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 * @return Article
	 */
	public function loadModel($id)
	{
		$model=Documents::model()->findByPk($id);
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
		$category_id = Yii::app()->request->getParam("category_id");

		if($group_id >0){
			//echo "<br> here ...";
			$working_group_request = Groups::model()->findByPk($group_id);
			//var_dump($working_group_request);
			if( !$this->hasRight(array('op_view_all_groups','Site.Groups.View'),array('group'=>$working_group_request)))
			{
				throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
			}
				
			$this->working_group_request = $working_group_request;
				
				
		}

		if($class_code){
			$this->working_class = $class_code;
		}
		
		if($category_id){
			$this->category = Category::model()->findByPk($category_id);
		}
		
		Yii::app()->clientScript->registerCssFile( Yii::app()->theme->baseUrl . '/css/highlight.css', 'all' ); 
		return parent::beforeAction($action);
	}
	
	
	public function beforeRender($view){
		if(count($this->article_menu)==0)
			$this->setMenu();
		
		return true;
	}
	
    protected function setMenu($model = false){
    	//echo "22 ".$this->working_group->id . $this->working_class;
    	//echo $model->user_id ." <br> -------------------<br>";
    	//var_dump(($this->hasRight('Site.Article.Update',array('article'=>$model))));
    	//exit;
    	$params =array();
    	$class = 'documents';
    	if($this->working_group_request){
    		$this->addBreadcrumbs(array('需求管理'=>array('/request/index')));
    	}
    	
//       if($this->working_group_request){
//    		$params['group_id'] = $this->working_group_request->id;
//    	
//    		$this->addBreadcrumbs(array('需求管理'=>array('/request/index','id'=>$this->working_group_request->id)));
//    	}
    	if($this->working_group_request){
    		$params['group_id'] = $this->working_group_request->id;
    	
    		$this->addBreadcrumbs(array($this->working_group_request->group_name=>array('/request/home','id'=>$this->working_group_request->id)));
    	}
    	
//    	if($this->working_class){
//    		$params['class_code'] = $this->working_class;
//    		$class= $this->working_class;
//    	
//    		$this->addBreadcrumbs(array(Enumeration::item('DOCUMENTS_CLASS',$this->working_class)=>Yii::app()->urlManager->createUrl('site/documents/index',$params)));
//    	
//    	}
    	
    	//var_dump($this->category);
//    	if($this->category){
//    		$this->addBreadcrumbs(array($this->category->name => $this->category->getViewUrl($params['groups_id'],$params['class_code'])));
//    		$params['category_id'] = $this->category->id;
//    	}
//    	$this->blocks['left'][]=array('widget'=>array('name'=>'site.widgets.CategoryList',
//    			'param'=>$params));
    	
    	
    	$class = Yii::t("siteModule.documents", 'documents');
    	$this->article_menu=array(
    	
    			array('label'=>Yii::t('siteModule.documents','Create {Article}',array('{Article}'=>$class)), 'url'=>array_merge(array('create'),$params),
    					'visible'=>($this->hasRight('Site.Article.Create')),
    					'linkOptions'=>array('class'=>'create',
    							'rel'=>'tooltip',
    							'title'=>Yii::t('siteModule.documents','Create {Article}',array('{Article}'=>$class)))),
    			/*array('label'=>Yii::t('siteModule.documents','List {Article}',array('{Article}'=>$class)), 'url'=>array_merge(array('index'),$params),
    					'visible'=>($this->hasRight('Site.Article.Index')),
    					'itemOptions'=>array('class'=>'list')),*/
    			array('label'=>Yii::t('siteModule.documents','Manage {Article}',array('{Article}'=>$class)), 'url'=>array_merge(array('admin'),$params),
    				'visible'=>($this->hasRight('Site.Article.Admin')),
    					'linkOptions'=>array('class'=>'admin',
    							'rel'=>'tooltip',
    							'title'=>Yii::t('siteModule.documents','Manage {Article}',array('{Article}'=>$class)))),
    			array('label'=>Yii::t('siteModule.documents','Update {Article}',array('{Article}'=>$class)), 'url'=>array_merge(array('update', 'id'=>Yii::app()->request->getParam("id")),$params),
    					'visible'=>('view'==$this->getAction()->getId()&&$this->hasRight('Site.Article.Update',array('article'=>$model))),
    					'linkOptions'=>array('class'=>'update',
    							'rel'=>'tooltip',
    							'title'=>Yii::t('siteModule.documents','Update {Article}',array('{Article}'=>$class)))),
    			array('label'=>Yii::t('siteModule.documents','Delete {Article}',array('{Article}'=>$class)), 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>Yii::app()->request->getParam("id"),'returnUrl'=>Yii::app()->request->getRequestUri()),'confirm'=>Yii::t('siteModule.documents','Are you sure you want to delete this item?'),'class'=>'delete',
    							'rel'=>'tooltip',
    							'title'=>Yii::t('siteModule.documents','Delete {Article}',array('{Article}'=>$class))),
    					'visible'=>('view'==$this->getAction()->getId()&&$this->hasRight('Site.Article.Delete',array('article'=>$model))),
    					),
    	
    	);
    }
    
    public function actionParser(){
    	$this->layout='//layouts/simple';
    	$content = $_POST['dontvalidate'];
    	
    	$m = new CMarkdownParser();
    	$content = $m->transform($content);
    	
    	$this->render('parser',array('content'=>$content));
    	
    }
}

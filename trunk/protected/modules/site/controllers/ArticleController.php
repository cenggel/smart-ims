<?php

class ArticleController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='article/column2';
	public $working_group =null;
	public $working_class = null;
	public $category = null;
	
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
		
		if(!$this->working_group && $model->group_id){
			$this->working_group = Groups::model()->findByPk($model->group_id);
			
		}
		
		$this->category= $model->category;
		$this->setMenu($model);
		//echo "11";
		$model->updateViews();
		$this->render('view',array(
				'model'=>$model,
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate($class_code,$group_id=0,$category_id=0)
	{
		$model=new Article;
		$model->class_code = $class_code;
		$model->group_id = $group_id;
		$model->category_id =$category_id;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Article']))
		{
			$model->attributes=$_POST['Article'];
			
			//echo "<pre>";print_r($value);
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
		
		$model= $this->loadModel($id);
		$model->unPurify();

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
	public function actionIndex($class_code=null,$group_id=0,$category_id=0,$tag=false)
	{   

		$article = Article::model();
		if($class_code!=null){
			$this->working_class = $class_code;
			$article = $article->byClass($class_code);
		}
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
		
		$dataProvider=new CActiveDataProvider($article->attachRel()->with('author','attachCount')->published()->byRecently(),array(     
		 'pagination'=>array(
          'pageSize'=>30,
      )));
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
		$category_id = Yii::app()->request->getParam("category_id");

		if($group_id >0){
			//echo "<br> here ...";
			$working_group = Groups::model()->findByPk($group_id);
			//var_dump($working_group);
			if( !$this->hasRight(array('op_view_all_groups','Site.Groups.View'),array('group'=>$working_group)))
			{
				throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
			}
				
			$this->working_group = $working_group;
				
				
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
    	$class = 'article';
    	
    	if($this->working_group){
    		$params['group_id'] = $this->working_group->id;
    	
    		$this->addBreadcrumbs(array($this->working_group->group_name=>array('/groups/home','id'=>$this->working_group->id)));
    	}
    	
    	if($this->working_class){
    		$params['class_code'] = $this->working_class;
    		$class= $this->working_class;
    	
    		$this->addBreadcrumbs(array(Enumeration::item('ARTICLE_CLASS',$this->working_class)=>Yii::app()->urlManager->createUrl('site/article/index',$params)));
    	
    	}
    	
    	//var_dump($this->category);
    	if($this->category){
    		$this->addBreadcrumbs(array($this->category->name => $this->category->getViewUrl($params['group_id'],$params['class_code'])));
    		$params['category_id'] = $this->category->id;
    	}
    	$this->blocks['left'][]=array('widget'=>array('name'=>'site.widgets.CategoryList',
    			'param'=>$params));
    	
    	
    	$class = Yii::t("siteModule.article", ucfirst($class));
    	$this->article_menu=array(
    	
    			array('label'=>Yii::t('siteModule.article','Create {Article}',array('{Article}'=>$class)), 'url'=>array_merge(array('create'),$params),
    					'visible'=>($this->hasRight('Site.Article.Create')),
    					'linkOptions'=>array('class'=>'create',
    							'rel'=>'tooltip',
    							'title'=>Yii::t('siteModule.article','Create {Article}',array('{Article}'=>$class)))),
    			/*array('label'=>Yii::t('siteModule.article','List {Article}',array('{Article}'=>$class)), 'url'=>array_merge(array('index'),$params),
    					'visible'=>($this->hasRight('Site.Article.Index')),
    					'itemOptions'=>array('class'=>'list')),*/
    			array('label'=>Yii::t('siteModule.article','Manage {Article}',array('{Article}'=>$class)), 'url'=>array_merge(array('admin'),$params),
    				'visible'=>($this->hasRight('Site.Article.Admin')),
    					'linkOptions'=>array('class'=>'admin',
    							'rel'=>'tooltip',
    							'title'=>Yii::t('siteModule.article','Manage {Article}',array('{Article}'=>$class)))),
    			array('label'=>Yii::t('siteModule.article','Update {Article}',array('{Article}'=>$class)), 'url'=>array_merge(array('update', 'id'=>Yii::app()->request->getParam("id")),$params),
    					'visible'=>('view'==$this->getAction()->getId()&&$this->hasRight('Site.Article.Update',array('article'=>$model))),
    					'linkOptions'=>array('class'=>'update',
    							'rel'=>'tooltip',
    							'title'=>Yii::t('siteModule.article','Update {Article}',array('{Article}'=>$class)))),
    			array('label'=>Yii::t('siteModule.article','Delete {Article}',array('{Article}'=>$class)), 'url'=>'#', 
    					'visible'=>('view'==$this->getAction()->getId()&&$this->hasRight('Site.Article.Delete',array('article'=>$model))),
    					'linkOptions'=>array('class'=>'delete',
    							'rel'=>'tooltip',
    							'submit'=>array('delete','id'=>Yii::app()->request->getParam("id"),'returnUrl'=>Yii::app()->request->getRequestUri()),'confirm'=>Yii::t('siteModule.article','Are you sure you want to delete this item?'),
    							'title'=>Yii::t('siteModule.article','Delete {Article}',array('{Article}'=>$class)))),
    	
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

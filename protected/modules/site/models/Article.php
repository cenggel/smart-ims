<?php

/**
 * This is the model class for table "article".
 *
 * The followings are the available columns in table 'article':
 * @property integer $id
 * @property integer $category_id
 * @property string $title
 * @property string $description
 * @property string $content
 * @property string $tags
 * @property integer $status
 * @property integer $essential
 * @property integer $article_date
 * @property integer $user_id
 * @property integer $create_date
 * @property integer $update_date
 * @property integer $update_user
 * @property integer $views
 * @property string $class_code
 * @property string $image_path
 * @property string $file_path
 * @property string $hash
 * @property integer $group_id
 * @property string alias
 */
class Article extends BaseActiveRecord
{
	const STATUS_DRAFT   = 1;
	const STATUS_PUBLISH = 2;
	const STATUS_PRIVATE = 3;
	private $_oldTags;
	
	private $_purify = true;
	private $_org_content;
	
	
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Article the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'article';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('category_id, title, content', 'required'),
			array('category_id, status, essential, article_date, user_id, create_date, update_date, update_user, views, group_id', 'numerical', 'integerOnly'=>true),
			array('title, description, tags, image_path, file_path', 'length', 'max'=>255),
			array('alias,class_code', 'length', 'max'=>45),
			array('hash', 'length', 'max'=>64),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, category_id, title, description, content, tags, status, essential, article_date, user_id, create_date, update_date, update_user, views, class_code, image_path, file_path, hash, group_id', 'safe', 'on'=>'search'),
		);
	}

	

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => Yii::t('siteModule.article','ID'),
			'category_id' => Yii::t('siteModule.article','Category'),
			'title' => Yii::t('siteModule.article','Title'),
			'description' => Yii::t('siteModule.article','Description'),
			'content' => Yii::t('siteModule.article','Content'),
			'tags' => Yii::t('siteModule.article','Tags'),
			'status' => Yii::t('siteModule.article','Status'),
			'essential' => Yii::t('siteModule.article','Essential'),
			'article_date' => Yii::t('siteModule.article','Article Date'),
			'user_id' => Yii::t('siteModule.article','Author'),
			'create_date' => Yii::t('siteModule.article','Create Date'),
			'update_date' => Yii::t('siteModule.article','Update Date'),
			'update_user' => Yii::t('siteModule.article','Update User'),
			'views' => Yii::t('siteModule.article','Views'),
			'class_code' => Yii::t('siteModule.article','Class Code'),
			'image_path' => Yii::t('siteModule.article','Image Path'),
			'file_path' => Yii::t('siteModule.article','File Path'),
			'hash' => Yii::t('siteModule.article','Hash'),
			'group_id' => Yii::t('siteModule.article','Group'),
			'alias' => Yii::t('siteModule.article','Alias'),
			'attachment' => Yii::t('siteModule.article','Attachment'),
		);
		
		
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('category_id',$this->category_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('content',$this->content,true);
		$criteria->compare('tags',$this->tags,true);
		$criteria->compare('status',$this->status);
		$criteria->compare('essential',$this->essential);
		$criteria->compare('article_date',$this->article_date);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('update_date',$this->update_date);
		$criteria->compare('update_user',$this->update_user);
		$criteria->compare('views',$this->views);
		$criteria->compare('class_code',$this->class_code,true);
		$criteria->compare('image_path',$this->image_path,true);
		$criteria->compare('file_path',$this->file_path,true);
		$criteria->compare('hash',$this->hash,true);
		$criteria->compare('group_id',$this->group_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		'pagination' => array(
               'pagesize' => 40),
		));
	}
	
	
	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
				'category'=>array(self::BELONGS_TO,'Category','category_id'),
				'author'=>array(self::BELONGS_TO,'User','user_id'),
				'group'=>array(self::BELONGS_TO,'Groups','group_id'),
				//'AttachCount' => array(self::STAT, 'Attachment', 'item_id','condition'=>'AttachCount.class_code= :class_code','params'=>array(':class_code'=>$this->class_code)),
		);
	}
	
	/**
	 * scopes
	 * @see CActiveRecord::scopes()
	 */
	public function scopes()
	{
		return array(
				'published'=>array(
						'condition'=>$this->getTableAlias() .'.status= ' . self::STATUS_PUBLISH .
						' or ( user_id =' . (int)Yii::app()->user->id .
								' and  '.$this->getTableAlias() .'.status= ' . self::STATUS_PRIVATE .') ',
				),
				'private'=>array('condition'=>$this->getTableAlias() .'.status= ' . self::STATUS_PRIVATE,),
				'draft'=>array('condition'=>$this->getTableAlias() .'.status= ' . self::STATUS_DRAFT,),
				'recently'=>array(
						'order'=>'create_date DESC',
						'limit'=>5,
				),
				'own'=>array('condition'=>' user_id =' . Yii::app()->user->id),
				'byClass'=>array(),
				'byGroup'=>array(),
				'byCategory'=>array(),
				'byRecently'=>array(
						'order'=>'create_date DESC'),
		);
	}
	
	public function recently($limit=5)
	{
		$this->getDbCriteria()->mergeWith(array(
				'order'=>'create_date DESC',
				'limit'=>$limit,
		));
		return $this;
	}
	public  function byClass($class_code){
		$this->getDbCriteria()->mergeWith(array('condition'=>$this->getTableAlias() .'.class_code =:class_code' ,'params'=>array(':class_code'=>$class_code)));
		return $this;
	}
	
	public function byGroup($group_id){
		$this->getDbCriteria()->mergeWith(array('condition'=>'group_id =:group_id' ,'params'=>array(':group_id'=>$group_id)));
		return $this;
	}
	
	public function byCategory($category_id){
		$this->getDbCriteria()->mergeWith(array('condition'=>'category_id =:category_id' ,'params'=>array(':category_id'=>$category_id)));
		return $this;
	}
	
	public function withTag($tag){
		$this->getDbCriteria()->compare('tags', $tag,true);
		return $this;
	}
	//~~~ scope section end 
	
	public function getFromFieldList($section=false){
			
		$editorOptions = array('type'=>(Yii::app()->params['article'][$this->class_code."_editor"]?Yii::app()->params['article'][$this->class_code."_editor"]:Yii::app()->params['editor']));
	    $default =array(
	    		'category_id'=>array('type'=>'dropdown',
	    				'data'=>Category::model()->getListData(0,'--',$this->group_id,$this->class_code),
	    				'htmlOptions'=>array('encode'=>false,
	    						'empty'=>array(''=>Yii::t('siteModule.category','Root Category')))),
	    		'title',
	    		'description',
	    		'content'=>array('type'=>'editor','htmlOptions'=>array('editor'=>$editorOptions)),
	    		'tags'=>array('type'=>'tag'),
	    		'status'=>array('type'=>'dropdown','data'=>'ARTICLE_STATUS'),
	    		'hash'=>array('type'=>'hidden'),
	    		'group_id'=>array('type'=>'hidden'),
	    		//'id'=>array('type'=>'hidden'),
	    		'class_code'=>array('type'=>'hidden'),
	    		'attachment'=>array('type'=>'attach'),
	    		);
	        if(!$section) $section = $this->class_code;
		    switch ($section){
				case 'blog': 
					return array_merge(array('article_date'=>array('type'=>'date')),$default);
				case 'document':
				 	return array_merge($default,array('file_path'=>array('type'=>'file'),));
				default: return $default;
		    }
	}
	
	protected function beforeSave(){
		if(!parent::beforeSave()) return false;
		
		if($this->isNewRecord){
			$this->user_id = $this->update_user=Yii::app()->user->id;
			$this->create_date = $this->update_date = time();
		}else{
			$this->update_date = time();
			$this->update_user = Yii::app()->user->id;
		}
		
		if($this->article_date && ((int)$this->article_date)==0)
			$this->article_date = strtotime($this->article_date);
		
		if(is_array($_POST['Tags']))
			$this->tags = implode(',', $_POST['Tags']) ;
		//print_r($this->tags); exit;
		//print_r($_FILES);
		return true;
	}
	
	
	/**
	 * This is invoked when a record is populated with data from a find() call.
	 */
	protected function afterFind()
	{
		parent::afterFind();
		$this->_oldTags=$this->tags;
		
		$this->_org_content = $this->content;
		if($this->_purify){
			$m = new  CMarkdownParser();
			$this->content= $m->transform($this->content);
			
			$p = new CHtmlPurifier();
			$this->content = $p->purify($this->content);
		}
	}
	
	/**
	 * This is invoked after the record is saved.
	 */
	protected function afterSave()
	{
		parent::afterSave();
		//print_r($this->_oldTags, $this->tags);exit;
		Tag::model()->updateFrequency($this->_oldTags, $this->tags);
		
	}
	
	public function getUrl(){
		$params= array('id'=>$this->id);
		if($this->class_code) $params['class_code'] = $this->class_code;
		if($this->group_id) $params['group_id'] = $this->group_id;
		
		return Yii::app()->urlManager->createUrl('site/article/view',$params);
	}
	
	public function updateViews(){
		$criteria=new CDbCriteria;
		$criteria->addCondition('id = '.$this->id);
		$this->updateCounters(array('views'=>1),$criteria);
	}
	
	public function unPurify(){
		$this->content = $this->_org_content;
		return $this;
	}
	
	public function behaviors(){
		$b = parent::behaviors();
		$behaviors = array(
				'notifier'=>array(
						'class'=>'application.modules.notify.components.NotifyArBehavior',
						'notifyClass'=>'$data->class_code',
						'notifyEvents'=>array('insert'=>'NEW','update'=>'UPDATE'),
						'users'=>'group.members',
						'title'=>'title',
						'summary'=>'substr(strip_tags($data->content),0,300)'),
		        'solr'=>array(
		             'class'=>'ext.solr.SolrBehavior',		             
		             'solr'=>Yii::app()->solr,	
		             'id'=>'"article_{$data->id}"',
		             'data'=>array('url'=>'$data->url',
		             'content'=>'$data->content',
		             'description'=>'$data->description',
		             'tags'=>'$data->tags',
					 'group'=>'$data->groupName',		
					 'cat'=>'$data->categoryName',
					 'update_date'=>'date("Y-m-d\TH:i:s\Z",$data->update_date)',
		             'title'=>'"$data->className  $data->categoryName   $data->title"',	
		             'user'=>'$data->author->username',),
		             'file'=>'$data->file_path?$data->file_path:""',
		         ),
		);
		if(is_array($b)){
			$behaviors = array_merge($behaviors,$b);
		}
		
		return $behaviors;
	}
	
	
	public function getCategoryName(){
		return $this->category->name;
	}
	
	public function getGroupName(){
		return $this->group->group_name;
	}
	
	public function getClassName(){
		Enumeration::item($this->class_code, "ARTICLE_CLASS");
	}
	
}
<?php

/**
 * This is the model class for table "documents".
 *
 * The followings are the available columns in table 'documents':
 * @property integer $id
 * @property string $doc_name
 * @property string $description
 * @property integer $create_date
 * @property integer $version
 * @property integer $create_user
 * @property integer $update_date
 * @property integer $update_user
 * @property string $file_path
 * @property string $thumb_path
 * @property string $doc_type
 * @property integer $doc_size
 * @property integer $doc_lock
 * @property integer $lock_user
 * @property integer $groups_id
 * @property integer $Category_id
 * @property string $update_note
 *
 * The followings are the available model relations:
 * @property Category $category
 * @property Groups $groups
 */
class Documents extends BaseActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Documents the static model class
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
		return 'documents';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('doc_name, file_path, groups_id, Category_id', 'required','on'=>'create'),
			array('doc_name, groups_id, Category_id,description,update_note', 'required','on'=>'update'),
			array('create_date, version, create_user, update_date, update_user, doc_size, doc_lock, lock_user, groups_id, Category_id', 'numerical', 'integerOnly'=>true),
			array('doc_name, file_path, thumb_path', 'length', 'max'=>400),
			array('doc_type', 'length', 'max'=>200),
			array('description', 'safe'),
			array('update_note', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, doc_name, description, create_date, version, create_user, update_date, update_user, file_path, thumb_path, doc_type, doc_size, doc_lock, lock_user, groups_id, Category_id,update_note,del_tag', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'category' => array(self::BELONGS_TO, 'Category', 'Category_id'),
			'groups' => array(self::BELONGS_TO, 'Groups', 'groups_id'),
			'author'=>array(self::BELONGS_TO,'User','create_user'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => Yii::t('siteModule.documents','ID'),
			'doc_name' => Yii::t('siteModule.documents','Doc Name'),
			'description' =>Yii::t('siteModule.documents','Description') ,
			'create_date' =>Yii::t('siteModule.documents','Create Date') ,
			'version' =>Yii::t('siteModule.documents','Version') ,
			'create_user' => Yii::t('siteModule.documents','Create User'),
			'update_date' => Yii::t('siteModule.documents','Update Date'),
			'update_user' => Yii::t('siteModule.documents','Update User'),
			'file_path' => Yii::t('siteModule.documents','File Path'),
			'thumb_path' => Yii::t('siteModule.documents','Thumb Path'),
			'doc_type' => Yii::t('siteModule.documents','Doc Type'),
			'doc_size' => Yii::t('siteModule.documents','Doc Size'),
			'doc_lock' => Yii::t('siteModule.documents','Doc Lock'),
			'lock_user' => Yii::t('siteModule.documents','Lock User'),
			'groups_id' => Yii::t('siteModule.documents','Groups'),
			'Category_id' => Yii::t('siteModule.documents','Category'),
			'update_note' => Yii::t('siteModule.documents','Update Note'),
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
		$criteria->compare('doc_name',$this->doc_name,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('update_note',$this->update_note,true);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('version',$this->version);
		$criteria->compare('create_user',$this->create_user);
		$criteria->compare('update_date',$this->update_date);
		$criteria->compare('update_user',$this->update_user);
		$criteria->compare('file_path',$this->file_path,true);
		$criteria->compare('thumb_path',$this->thumb_path,true);
		$criteria->compare('doc_type',$this->doc_type,true);
		$criteria->compare('doc_size',$this->doc_size);
		$criteria->compare('doc_lock',$this->doc_lock);
		$criteria->compare('lock_user',$this->lock_user);
		$criteria->compare('groups_id',$this->groups_id);
		$criteria->compare('Category_id',$this->Category_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public function byGroup($group_id){
		$this->getDbCriteria()->mergeWith(array('condition'=>'groups_id =:group_id' ,'params'=>array(':group_id'=>$group_id)));
		return $this;
	}
	
	public function byCategory($category_id){
		$this->getDbCriteria()->mergeWith(array('condition'=>'Category_id =:category_id' ,'params'=>array(':category_id'=>$category_id)));
		return $this;
	}
	
/**
	 * scopes
	 * @see CActiveRecord::scopes()
	 */
	public function scopes()
	{
		return array(
//				'published'=>array(
//						'condition'=>$this->getTableAlias() .'.status= ' . self::STATUS_PUBLISH .
//						' or ( user_id =' . (int)Yii::app()->user->id .
//								' and  '.$this->getTableAlias() .'.status= ' . self::STATUS_PRIVATE .') ',
//				),
//				'private'=>array('condition'=>$this->getTableAlias() .'.status= ' . self::STATUS_PRIVATE,),
//				'draft'=>array('condition'=>$this->getTableAlias() .'.status= ' . self::STATUS_DRAFT,),
//				'recently'=>array(
//						'order'=>'create_date DESC',
//						'limit'=>5,
//				),
				'byGroupId'=>array('condition'=>' groups_id=' .$this->groups_id),
				'own'=>array('condition'=>' user_id =' . Yii::app()->user->id),
				'byClass'=>array(),
				'byGroup'=>array(),
				'byCategory'=>array(),
				'byRecently'=>array(
						'order'=>'create_date DESC'),
		);
	}
	

	public function getFromFieldList($section=false){
			
		$editorOptions = array('type'=>(Yii::app()->params['article'][$this->class_code."_editor"]?Yii::app()->params['article'][$this->class_code."_editor"]:Yii::app()->params['editor']));
	    $default =array(
	    		'Category_id'=>array('type'=>'dropdown',
	    				'data'=>Category::model()->getListData(0,'--','',$this->class_code),
	    				'htmlOptions'=>array('encode'=>false,
	    						'empty'=>array(''=>Yii::t('siteModule.category','Root Category')))),
	    		'doc_name',
	    		'description',
	    		//'content'=>array('type'=>'editor','htmlOptions'=>array('editor'=>$editorOptions)),
	    		//'tags'=>array('type'=>'tag'),
	    		//'status'=>array('type'=>'dropdown','data'=>'ARTICLE_STATUS'),
	    		//'hash'=>array('type'=>'hidden'),
	    		'groups_id'=>array('type'=>'hidden'),
	    		//'id'=>array('type'=>'hidden'),
	    		'class_code'=>array('type'=>'hidden'),
	            'update_note'=>array('type'=>$this->isNewRecord ? 'hidden':'text'),
	    		//'attachment'=>array('type'=>'attach'),
	    		);
	       
		return array_merge($default,array('file_path'=>array('type'=>'file'),));
				
	}
	
	protected function beforeSave(){
		if(!parent::beforeSave()) return false;
		
		if($this->isNewRecord){
			$this->create_user = $this->update_user=Yii::app()->user->id;
			$this->create_date = $this->update_date = time();
		}else{
			$this->update_date = time();
			$this->update_user = Yii::app()->user->id;
		}
		
		
		//print_r($_FILES);
		return true;
	}
	
	public function getUrl(){
		$params= array('id'=>$this->id);
		$params['class_code'] = 'documents';
		if($this->groups_id) $params['group_id'] = $this->groups_id;
		
		return Yii::app()->urlManager->createUrl('site/documents/view',$params);
	}
	
	public function getHisUrl(){
		$params= array('id'=>$this->id);
		$params['class_code'] = 'documents';
		if($this->groups_id) $params['group_id'] = $this->groups_id;
		
		return Yii::app()->urlManager->createUrl('site/documents/viewhis',$params);
	}
	
	public function getFileUrl(){
		return Yii::app()->baseUrl .'/' . $this->file_path;
	}
	
	public function getDownloadUrl(){
		return Yii::app()->baseUrl .'/' . $this->file_path;
	}
	
	public function getExtName()
	{
		if(($pos=strrpos($this->file_path,'.'))!==false)
			return (string)substr($this->file_path,$pos+1);
		else
			return '';
	}
	
	public function getExtImage($htmlOptions=array('class'=>'ext-image')){
		$image = Yii::app()->theme->baseUrl . '/images/attach/'. $this->extName .'.png';
				
		if(file_exists(str_replace(array('//','\\\\'), '/', $_SERVER['DOCUMENT_ROOT'] .$image)))
		return CHtml::image($image,
				$this->extName,$htmlOptions);
		
		return '';
	}
	
	public function getExtImageUrl(){
		$image = Yii::app()->theme->baseUrl . '/images/attach/'. $this->extName .'.png';
	
		if(file_exists(str_replace(array('//','\\\\'), '/', $_SERVER['DOCUMENT_ROOT'] .$image)))
			return $image;
	
		return false;
	}
	
	public function getPath(){
		$path = Yii::app()->baseUrl . DIRECTORY_SEPARATOR . $this->file_path;
		
		return str_replace(array('//','\\\\'), '/', $_SERVER['DOCUMENT_ROOT'] .$path);
		
	}
	
	public function getDeleteFlag(){
		return $this->deteleFlag;
	}
	
	public function setDeleteFlag($flag){
		$this->deleteFlag = (int)$flag;
		
	}
	
	public function behaviors(){
		$b = parent::behaviors();
		$behaviors = array(
				'notifier'=>array(
						'class'=>'application.modules.notify.components.NotifyArBehavior',
						'notifyClass'=>'documents',
						'notifyEvents'=>array('insert'=>'NEW','update'=>'UPDATE'),
						'users'=>'groups.members',
						'title'=>'doc_name',
						'summary'=>' substr(strip_tags($data->update_note . $data->description),0,300)'),
		        'solr'=>array(
		             'class'=>'ext.solr.SolrBehavior',		             
		             'solr'=>Yii::app()->solr,	
		             'id'=>'"documents_{$data->id}"',
		             'data'=>array('url'=>'$data->url',
		             'content'=>'$data->description',
		             'description'=>'$data->description',
		             //'tags'=>'$data->tags',
					 'group'=>'$data->groupName',		
					 'cat'=>'$data->categoryName',
					 'update_date'=>'date("Y-m-d\TH:i:s\Z",$data->update_date)',
		             'title'=>'"$data->categoryName   $data->doc_name"',	
		             'user'=>'$data->author->username',),
		             'file'=>'$data->file_path?realpath($data->file_path):""',
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
		return $this->groups->group_name;
	}
}
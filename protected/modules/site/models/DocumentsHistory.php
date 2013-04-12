<?php

/**
 * This is the model class for table "documents_history".
 *
 * The followings are the available columns in table 'documents_history':
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
 */
class DocumentsHistory extends BaseActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return DocumentsHistory the static model class
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
		return 'documents_history';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('doc_name, file_path, groups_id, Category_id', 'required'),
			array('create_date, version, create_user, update_date, update_user, doc_size, doc_lock, lock_user, groups_id, Category_id', 'numerical', 'integerOnly'=>true),
			array('doc_name, file_path, thumb_path', 'length', 'max'=>400),
			array('doc_type', 'length', 'max'=>45),
			array('description', 'safe'),
			array('update_note', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, doc_name, description, create_date, version, create_user, update_date, update_user, file_path, thumb_path, doc_type, doc_size, doc_lock, lock_user, groups_id, Category_id,del_tag', 'safe', 'on'=>'search'),
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
			'author'=>array(self::BELONGS_TO,'User','update_user'),
		);
	}
	
	protected function beforeSave(){
		if(!parent::beforeSave()) return false;
		
		$this->update_user=Yii::app()->user->id;
		$this->update_date = time();
		
		
		//print_r($_FILES);
		return true;
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'doc_name' => 'Doc Name',
			'description' => 'Description',
			'create_date' => 'Create Date',
			'version' => 'Version',
			'create_user' => 'Create User',
			'update_date' => 'Update Date',
			'update_user' => 'Update User',
			'file_path' => 'File Path',
			'thumb_path' => 'Thumb Path',
			'doc_type' => 'Doc Type',
			'doc_size' => 'Doc Size',
			'doc_lock' => 'Doc Lock',
			'lock_user' => 'Lock User',
			'groups_id' => 'Groups',
			'Category_id' => 'Category',
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
	
	public function getUrl(){
		$params= array('id'=>$this->id);
		$params['class_code'] = 'documents';
		if($this->groups_id) $params['group_id'] = $this->groups_id;
		
		return Yii::app()->urlManager->createUrl('site/documents/view',$params);
	}
	
   public function getFileUrl(){
		return Yii::app()->baseUrl .'/' . $this->file_path;
	}
	
	public function getDownloadUrl(){
		return Yii::app()->baseUrl .'/' . $this->file_path;
	}
}
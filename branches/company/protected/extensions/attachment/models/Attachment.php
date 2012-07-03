<?php

/**
 * This is the model class for table "attachment".
 *
 * The followings are the available columns in table 'attachment':
 * @property integer $id
 * @property integer $item_id
 * @property string $title
 * @property string $description
 * @property string $class_code
 * @property string $file_path
 * @property string $file_type
 * @property integer $isImage
 * @property integer $create_date
 * @property integer $update_date
 * @property integer $create_user
 * @property integer $update_user
 * @property integer $file_size
 */
class Attachment extends CActiveRecord
{
	/**
	 * 
	 * @var integer
	 */
	public $deleteFlag=0;
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Attachment the static model class
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
		return '{{attachment}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('file_path', 'required'),
			array('item_id, isImage, create_date, update_date, create_user, update_user, file_size,deleteFlag', 'numerical', 'integerOnly'=>true),
			array('title', 'length', 'max'=>200),
			array('class_code, file_type', 'length', 'max'=>45),
			array('file_path', 'length', 'max'=>255),
			array('description', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, item_id, title, description, class_code, file_path, file_type, isImage, create_date, update_date, create_user, update_user, file_size', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'item_id' => 'Item',
			'title' => Yii::t('attachment',  'Title'),
			'description' => Yii::t('attachment','Description'),
			'class_code' => Yii::t('attachment','Class Code'),
			'file_path' => Yii::t('attachment','File Path'),
			'file_type' => Yii::t('attachment','File Type'),
			'isImage' => Yii::t('attachment','Is Image'),
			'create_date' => Yii::t('attachment','Create Date'),
			'update_date' => Yii::t('attachment','Update Date'),
			'create_user' => Yii::t('attachment','Create User'),
			'update_user' => Yii::t('attachment','Update User'),
			'file_size' => Yii::t('attachment','File Size'),
			'deleteFlag'=>Yii::t('attachment','Delete'),
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
		$criteria->compare('item_id',$this->item_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('class_code',$this->class_code,true);
		$criteria->compare('file_path',$this->file_path,true);
		$criteria->compare('file_type',$this->file_type,true);
		$criteria->compare('isImage',$this->isImage);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('update_date',$this->update_date);
		$criteria->compare('create_user',$this->create_user);
		$criteria->compare('update_user',$this->update_user);
		$criteria->compare('file_size',$this->file_size);
		
		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
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
		return true;
	}
	
	public function getUrl(){
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
}
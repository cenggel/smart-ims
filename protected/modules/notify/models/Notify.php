<?php

/**
 * This is the model class for table "notify".
 *
 * The followings are the available columns in table 'notify':
 * @property integer $id
 * @property string $notify_class
 * @property string $notify_event
 * @property integer $notify_type
 * @property string $title
 * @property string $summary
 * @property string $item_id
 * @property string $user_id
 * @property integer $status
 * @property string $params
 * @property string $url
 * @property integer $create_user
 * @property integer $create_date
 * @property integer $read_date
 * @property string $owner_class
 */
class Notify extends CActiveRecord
{
	
	const READ = 1;
	const UNREAD = 0;
	
	const NOTIFY_DEFAULT= 1;
	CONST NOTIFY_EMAIL = 2;
	CONST NOTIFY_SMS = 3;
	
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Notify the static model class
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
		return 'notify';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('notify_class, user_id,title,notify_type', 'required'),
			array('notify_type, status, create_user, create_date, read_date', 'numerical', 'integerOnly'=>true),
			array('notify_class, notify_event, item_id, user_id', 'length', 'max'=>45),
			array('title', 'length', 'max'=>200),
			array('owner_class', 'length', 'max'=>100),
			array('url', 'length', 'max'=>255),
			array('summary, params,owner_class', 'safe'),
			array('notify_class, notify_event, notify_type, title, summary, item_id, user_id, status, params, url, create_user, create_date', 'safe', 'on'=>'insert'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, notify_class, notify_event, notify_type, title, summary, item_id, user_id, status, params, url, create_user, create_date, read_date', 'safe', 'on'=>'search'),
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
		     'user'=>array(self::BELONGS_TO,'User','user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'notify_class' => 'Notify Class',
			'notify_event' => 'Notify Event',
			'notify_type' => 'Notify Type',
			'title' => 'Title',
			'summary' => 'Summary',
			'item_id' => 'Item',
			'user_id' => 'User',
			'status' => 'Status',
			'params' => 'Params',
			'url' => 'Url',
			'create_user' => 'Create User',
			'create_date' => 'Create Date',
			'read_date' => 'Read Date',
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
		$criteria->compare('notify_class',$this->notify_class,true);
		$criteria->compare('notify_event',$this->notify_event,true);
		$criteria->compare('notify_type',$this->notify_type);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('summary',$this->summary,true);
		$criteria->compare('item_id',$this->item_id,true);
		$criteria->compare('user_id',$this->user_id,true);
		$criteria->compare('status',$this->status);
		$criteria->compare('params',$this->params,true);
		$criteria->compare('url',$this->url,true);
		$criteria->compare('create_user',$this->create_user);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('read_date',$this->read_date);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public function scopes(){
		return array(
				'read'=>array('condition'=> $this->getTableAlias().'.status = '.self::READ),
				'unread'=>array('condition'=> $this->getTableAlias().'.status = '.self::UNREAD),
		);
	}
	
	public function defaultScope(){
		return array('order'=> 'notify_class,create_date desc');
		
	}
	
	
	public  function byUser($user){
		$this->getDbCriteria()->compare('user_id',(int) $user);
		return $this;
	}
	
	public function getViewUrl(){
		return Yii::app()->urlManager->createUrl('notify',array('id'=>$this->id));
	}
	
	public function getIsRead(){
		return $this->status == self::READ;
	}
	
	public  function beforeSave(){
		if($this->isNewRecord){
			$this->create_date = time();
			$this->create_user = (int) Yii::app()->user->id;
		}
		
		return true;
	}
	
}
<?php

/**
 * This is the model class for table "calendar".
 *
 * The followings are the available columns in table 'calendar':
 * @property integer $id
 * @property string $name
 * @property string $color
 * @property integer $visibility
 *
 * The followings are the available model relations:
 * @property Event[] $events
 */
class Calendar extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Calendar the static model class
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
		return 'calendar';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name', 'required'),
			array('visibility', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>50),
			array('color', 'length', 'max'=>45),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, name, color, visibility', 'safe', 'on'=>'search'),
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
			'events' => array(self::HAS_MANY, 'Event', 'calendar_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'name' => Yii::t('CalModule.calendar','Name'),
			'color' => Yii::t('CalModule.calendar','Color'),
			'visibility' => Yii::t('CalModule.calendar','Visibility'),
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
		$criteria->compare('name',$this->name,true);
		$criteria->compare('color',$this->color,true);
		$criteria->compare('visibility',$this->visibility);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public static function visibilityList($code = false){
		$visiblityList = array('0'=>Yii::t('CalModule.calendar','public'),
				'1'=>Yii::t('CalModule.calendar','private'));
		
		if($code!==false){
			return isset($visiblityList[$code])? $visiblityList[$code]:'';
		}
		
		return $visiblityList;
	}
	
	public function beforeSave(){
		return true;
	}
	
	public function scopes(){
		return array(
				'owen'=>array('condition'=>'user_id = '. (Yii::app()->user->isGuest?'0':Yii::app()->user->id) ),
				'public'=>array('condition'=>' visibility = 0 '),
				);
	}
		
}
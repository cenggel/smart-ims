<?php

/**
 * This is the model class for table "event".
 *
 * The followings are the available columns in table 'event':
 * @property integer $id
 * @property integer $calendar_id
 * @property string $title
 * @property string $description
 * @property integer $user_id
 * @property integer $allDay
 * @property integer $editable
 * @property integer $start_time
 * @property integer $end_time
 * @property integer $cal_date
 * @property string $location
 * @property string $event_type
 * @property integer $completed
 * @property integer $complete_date
 * @property integer $actor_id
 * @property integer $duration
 * @property integer $create_date
 * @property integer $update_date
 * 
 * @property string $endDate
 * @property string $endTime
 * @property string $startTime
 * @property string $startDate
 *
 * The followings are the available model relations:
 * @property Calendar $calendar
 * @property EventLog[] $eventLogs
 * @property EventRepeats[] $eventRepeats
 * @property EventTask[] $eventTasks
 */
class Event extends CActiveRecord
{
	
	public  $startDate ,$startTime,$endDate,$endTime;
	
	public function afterConstruct(){
		 $this->startDate = $this->endDate =  date('Y-m-d',time());
		 $this->startTime= date('H:i',time());
		 $this->endTime = date('H:i',strtotime('+1 hour'));
	}
	public static $enum =array('EVENT_TYPE'=>array(
			'task'=>'Task',
			'meeting'=>'Meeting'),
			);
	
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Event the static model class
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
		return 'event';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('calendar_id, title', 'required'),
			array('title', 'length', 'max'=>100),
			array('location', 'length', 'max'=>150),
			array('event_type', 'length', 'max'=>45),
			array('description', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
		    array('startDate,startTime,endDate,endTime','safe','on'=>'insert,update'),
			array('startTime,endTime','match','pattern'=>'#\d{2}:\d{2}#'),
			array('calendar_id, user_id, allDay, editable, start_time, end_time, cal_date, completed, complete_date, actor_id, duration, create_date, update_date', 'numerical', 'integerOnly'=>true),
				
			array('id, calendar_id, title, description, user_id, allDay, editable, start_time, end_time, cal_date, location, event_type, completed, complete_date, actor_id, duration, create_date, update_date', 'safe', 'on'=>'search'),
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
			'calendar' => array(self::BELONGS_TO, 'Calendar', 'calendar_id'),
			'eventLogs' => array(self::HAS_MANY, 'EventLog', 'event_id'),
			'eventRepeats' => array(self::HAS_MANY, 'EventRepeats', 'event_id'),
			'eventTasks' => array(self::HAS_MANY, 'EventTask', 'event_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'calendar_id' => 'Calendar',
			'title' => 'Title',
			'description' => 'Description',
			'user_id' => 'User',
			'allDay' => 'All Day',
			'editable' => 'Editable',
			'start_time' => 'Start Time',
			'end_time' => 'End Time',
			'cal_date' => 'Cal Date',
			'location' => 'Location',
			'event_type' => 'Event Type',
			'completed' => 'Completed',
			'complete_date' => 'Complete Date',
			'actor_id' => 'Actor',
			'duration' => 'Duration',
			'create_date' => 'Create Date',
			'update_date' => 'Update Date',
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
		$criteria->compare('calendar_id',$this->calendar_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('allDay',$this->allDay);
		$criteria->compare('editable',$this->editable);
		$criteria->compare('start_time',$this->start_time);
		$criteria->compare('end_time',$this->end_time);
		$criteria->compare('cal_date',$this->cal_date);
		$criteria->compare('location',$this->location,true);
		$criteria->compare('event_type',$this->event_type,true);
		$criteria->compare('completed',$this->completed);
		$criteria->compare('complete_date',$this->complete_date);
		$criteria->compare('actor_id',$this->actor_id);
		$criteria->compare('duration',$this->duration);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('update_date',$this->update_date);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public function beforeValidate(){
		$this->cal_date = strtotime($this->startDate);
		//echo($this->startDate.' '.$this->startTime);
		$this->start_time = strtotime($this->startDate.' '.$this->startTime);
		//echo "$this->start_time";
		///exit;
		$this->end_time = strtotime($this->endDate.' '.$this->startTime);
		if( ! is_numeric($this->complete_date))
			$this->complete_date = strtotime($this->complete_date);
		
		return parent::beforeValidate();
	}
	
	public function beforeSave(){
		if($this->isNewRecord){
			$this->create_date = $this->update_date= time();
			$this->user_id= Yii::app()->user->id;
		}
		
		$this->duration = $this->end_time - $this->start_time;
		
		return parent::beforeSave();
	}
	public function afterFind(){
		$this->startDate = date('Y-m-d',$this->start_time);
		$this->startTime = date('H:i:s',$this->start_time);		
		
		$this->endDate = date('Y-m-d',$this->end_time);
		$this->endTime = date('H:i:s',$this->end_time);
		
	}
	
	public static function getEnumList($key){
		if(isset(self::$enum[$key])){
			return self::$enum[$key];
		}
		return array();
	}
	
	public static function getEnumName($key,$code){
		$list = self::getEnumList($key);
		return isset($list[$code])? $list[$code]:"";
	}
}
<?php

/**
 * This is the model class for table "event_task".
 *
 * The followings are the available columns in table 'event_task':
 * @property integer $id
 * @property integer $event_id
 * @property string $actor_id
 * @property string $name
 * @property string $description
 * @property integer $end_actor_id
 * @property integer $start_date
 * @property integer $end_date
 * @property integer $complete_date
 * @property integer $completed
 * @property integer $actual_start
 *
 * The followings are the available model relations:
 * @property EventLog[] $eventLogs
 * @property Event $event
 */
class EventTask extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return EventTask the static model class
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
		return 'event_task';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('event_id', 'required'),
			array('event_id, end_actor_id, start_date, end_date, complete_date, completed, actual_start', 'numerical', 'integerOnly'=>true),
			array('actor_id, name', 'length', 'max'=>45),
			array('description', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, event_id, actor_id, name, description, end_actor_id, start_date, end_date, complete_date, completed, actual_start', 'safe', 'on'=>'search'),
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
			'eventLogs' => array(self::HAS_MANY, 'EventLog', 'task_id'),
			'event' => array(self::BELONGS_TO, 'Event', 'event_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'event_id' => 'Event',
			'actor_id' => 'Actor',
			'name' => 'Name',
			'description' => 'Description',
			'end_actor_id' => 'End Actor',
			'start_date' => 'Start Date',
			'end_date' => 'End Date',
			'complete_date' => 'Complete Date',
			'completed' => 'Completed',
			'actual_start' => 'Actual Start',
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
		$criteria->compare('event_id',$this->event_id);
		$criteria->compare('actor_id',$this->actor_id,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('end_actor_id',$this->end_actor_id);
		$criteria->compare('start_date',$this->start_date);
		$criteria->compare('end_date',$this->end_date);
		$criteria->compare('complete_date',$this->complete_date);
		$criteria->compare('completed',$this->completed);
		$criteria->compare('actual_start',$this->actual_start);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
<?php

/**
 * This is the model class for table "event_log".
 *
 * The followings are the available columns in table 'event_log':
 * @property integer $id
 * @property integer $event_id
 * @property integer $task_id
 * @property integer $actor_id
 * @property string $title
 * @property string $description
 * @property integer $completed
 * @property integer $create_date
 * @property integer $update_date
 * @property string $turnouts
 *
 * The followings are the available model relations:
 * @property Event $event
 * @property EventTask $task
 */
class EventLog extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return EventLog the static model class
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
		return 'event_log';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('event_id, actor_id, title', 'required'),
			array('event_id, task_id, actor_id, completed, create_date, update_date', 'numerical', 'integerOnly'=>true),
			array('title', 'length', 'max'=>100),
			array('description, turnouts', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, event_id, task_id, actor_id, title, description, completed, create_date, update_date, turnouts', 'safe', 'on'=>'search'),
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
			'event' => array(self::BELONGS_TO, 'Event', 'event_id'),
			'task' => array(self::BELONGS_TO, 'EventTask', 'task_id'),
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
			'task_id' => 'Task',
			'actor_id' => 'Actor',
			'title' => 'Title',
			'description' => 'Description',
			'completed' => 'Completed',
			'create_date' => 'Create Date',
			'update_date' => 'Update Date',
			'turnouts' => 'Turnouts',
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
		$criteria->compare('task_id',$this->task_id);
		$criteria->compare('actor_id',$this->actor_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('completed',$this->completed);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('update_date',$this->update_date);
		$criteria->compare('turnouts',$this->turnouts,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
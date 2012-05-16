<?php

/**
 * This is the model class for table "event_repeats".
 *
 * The followings are the available columns in table 'event_repeats':
 * @property string $repeat_type
 * @property integer $end
 * @property integer $endtime
 * @property integer $frequency
 * @property string $months
 * @property string $monthdays
 * @property string $weekdays
 * @property string $weekno
 * @property string $yearday
 * @property integer $repeat_count
 * @property integer $event_id
 *
 * The followings are the available model relations:
 * @property Event $event
 */
class EventRepeats extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return EventRepeats the static model class
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
		return 'event_repeats';
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
			array('end, endtime, frequency, repeat_count, event_id', 'numerical', 'integerOnly'=>true),
			array('repeat_type, weekno, yearday', 'length', 'max'=>45),
			array('months, monthdays, weekdays', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('repeat_type, end, endtime, frequency, months, monthdays, weekdays, weekno, yearday, repeat_count, event_id', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'repeat_type' => 'Repeat Type',
			'end' => 'End',
			'endtime' => 'Endtime',
			'frequency' => 'Frequency',
			'months' => 'Months',
			'monthdays' => 'Monthdays',
			'weekdays' => 'Weekdays',
			'weekno' => 'Weekno',
			'yearday' => 'Yearday',
			'repeat_count' => 'Repeat Count',
			'event_id' => 'Event',
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

		$criteria->compare('repeat_type',$this->repeat_type,true);
		$criteria->compare('end',$this->end);
		$criteria->compare('endtime',$this->endtime);
		$criteria->compare('frequency',$this->frequency);
		$criteria->compare('months',$this->months,true);
		$criteria->compare('monthdays',$this->monthdays,true);
		$criteria->compare('weekdays',$this->weekdays,true);
		$criteria->compare('weekno',$this->weekno,true);
		$criteria->compare('yearday',$this->yearday,true);
		$criteria->compare('repeat_count',$this->repeat_count);
		$criteria->compare('event_id',$this->event_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
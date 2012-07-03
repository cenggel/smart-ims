<?php

/**
 * This is the model class for table "monthly_review".
 *
 * The followings are the available columns in table 'monthly_review':
 * @property integer $id
 * @property integer $month
 * @property integer $user_id
 * @property integer $actor_id
 * @property integer $score
 * @property string $comment
 * @property integer $create_date
 * @property integer $update_date
 */
class MonthlyReview extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return MonthlyReview the static model class
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
		return 'monthly_review';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('month, user_id, actor_id', 'required'),
			array('month, user_id, actor_id, score, create_date, update_date', 'numerical', 'integerOnly'=>true),
			array('comment', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, month, user_id, actor_id, score, comment, create_date, update_date', 'safe', 'on'=>'search'),
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
			'month' => 'Month',
			'user_id' => 'User',
			'actor_id' => 'Actor',
			'score' => 'Score',
			'comment' => 'Comment',
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
		$criteria->compare('month',$this->month);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('actor_id',$this->actor_id);
		$criteria->compare('score',$this->score);
		$criteria->compare('comment',$this->comment,true);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('update_date',$this->update_date);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
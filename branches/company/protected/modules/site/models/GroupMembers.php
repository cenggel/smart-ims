<?php

/**
 * This is the model class for table "group_members".
 *
 * The followings are the available columns in table 'group_members':
 * @property integer $users_id
 * @property integer $groups_id
 * @property integer $administrator
 */
class GroupMembers extends BaseActiveRecord
{
	
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return GroupMembers the static model class
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
		return 'group_members';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('users_id, groups_id', 'required'),
			array('users_id, groups_id, administrator', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('users_id, groups_id, administrator', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'users_id' => 'Users',
			'groups_id' => 'Groups',
			'administrator' => 'Administrator',
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

		$criteria->compare('users_id',$this->users_id);
		$criteria->compare('groups_id',$this->groups_id);
		$criteria->compare('administrator',$this->administrator);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public  function getFromFieldList(){
		return array(
				'groups_id'=>array('type'=>'hidden'),
				'users'=>array('type'=>'dropdown',
						'htmlOptions'),
				);
	}
	
}
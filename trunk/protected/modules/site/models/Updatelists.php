<?php

/**
 * This is the model class for table "updatelists".
 *
 * The followings are the available columns in table 'updatelists':
 * @property integer $id
 * @property integer $group_id
 * @property string $title
 * @property string $content
 * @property string $file_path
 * @property string $update_note
 * @property integer $create_user
 * @property string $create_date
 * @property integer $update_user
 * @property string $update_date
 */
class Updatelists extends BaseActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Updatelists the static model class
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
		return 'updatelists';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('group_id, title, content, file_path, update_note, create_user, create_date, update_user, update_date', 'required'),
			array('group_id, create_user, update_user', 'numerical', 'integerOnly'=>true),
			array('title', 'length', 'max'=>50),
			array('file_path', 'length', 'max'=>255),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, group_id, title, content, file_path, update_note, create_user, create_date, update_user, update_date', 'safe', 'on'=>'search'),
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
			'group_id' => 'Group',
			'title' => 'Title',
			'content' => 'Content',
			'file_path' => 'File Path',
			'update_note' => 'Update Note',
			'create_user' => 'Create User',
			'create_date' => 'Create Date',
			'update_user' => 'Update User',
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
		$criteria->compare('group_id',$this->group_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('content',$this->content,true);
		$criteria->compare('file_path',$this->file_path,true);
		$criteria->compare('update_note',$this->update_note,true);
		$criteria->compare('create_user',$this->create_user);
		$criteria->compare('create_date',$this->create_date,true);
		$criteria->compare('update_user',$this->update_user);
		$criteria->compare('update_date',$this->update_date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
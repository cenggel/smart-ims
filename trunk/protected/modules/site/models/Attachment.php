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
		return 'attachment';
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
			array('item_id, isImage, create_date, update_date, create_user, update_user, file_size', 'numerical', 'integerOnly'=>true),
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
			'title' => 'Title',
			'description' => 'Description',
			'class_code' => 'Class Code',
			'file_path' => 'File Path',
			'file_type' => 'File Type',
			'isImage' => 'Is Image',
			'create_date' => 'Create Date',
			'update_date' => 'Update Date',
			'create_user' => 'Create User',
			'update_user' => 'Update User',
			'file_size' => 'File Size',
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
}
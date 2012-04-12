<?php

/**
 * This is the model class for table "comment".
 *
 * The followings are the available columns in table 'comment':
 * @property integer $id
 * @property string $title
 * @property string $content
 * @property integer $status
 * @property string $email
 * @property string $url
 * @property integer $author_id
 * @property integer $item_id
 * @property string $class_code
 * @property string $author_name
 * @property integer $parent_id
 */
class Comment extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Comment the static model class
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
		return 'comment';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('content', 'required'),
			array('status, author_id, item_id, parent_id', 'numerical', 'integerOnly'=>true),
			array('title, email, url', 'length', 'max'=>100),
			array('content, class_code', 'length', 'max'=>45),
			array('author_name', 'length', 'max'=>30),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, title, content, status, email, url, author_id, item_id, class_code, author_name, parent_id', 'safe', 'on'=>'search'),
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
			'title' => 'Title',
			'content' => 'Content',
			'status' => 'Status',
			'email' => 'Email',
			'url' => 'Url',
			'author_id' => 'Author',
			'item_id' => 'Item',
			'class_code' => 'Class Code',
			'author_name' => 'Author Name',
			'parent_id' => 'Parent',
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
		$criteria->compare('title',$this->title,true);
		$criteria->compare('content',$this->content,true);
		$criteria->compare('status',$this->status);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('url',$this->url,true);
		$criteria->compare('author_id',$this->author_id);
		$criteria->compare('item_id',$this->item_id);
		$criteria->compare('class_code',$this->class_code,true);
		$criteria->compare('author_name',$this->author_name,true);
		$criteria->compare('parent_id',$this->parent_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
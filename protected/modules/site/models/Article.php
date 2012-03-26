<?php

/**
 * This is the model class for table "article".
 *
 * The followings are the available columns in table 'article':
 * @property integer $id
 * @property integer $Category_id
 * @property string $title
 * @property string $content
 * @property string $tags
 * @property integer $status
 * @property integer $essential
 * @property integer $article_date
 * @property integer $author_id
 * @property integer $create_date
 * @property integer $update_date
 * @property integer $update_user
 */
class Article extends CActiveRecord
{
	const  STATUS_DRAFT   = 1;
	const  STATUS_PUBLISH = 2;
	const  STATUS_PRIVATE = 3;
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Article the static model class
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
		return 'article';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('Category_id, title, content', 'required'),
			array('Category_id, status, essential, article_date, author_id, create_date, update_date, update_user', 'numerical', 'integerOnly'=>true),
			array('title, tags', 'length', 'max'=>255),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, Category_id, title, content, tags, status, essential, article_date, author_id, create_date, update_date, update_user', 'safe', 'on'=>'search'),
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
			'Category_id' => 'Category',
			'title' => 'Title',
			'content' => 'Content',
			'tags' => 'Tags',
			'status' => 'Status',
			'essential' => 'Essential',
			'article_date' => 'Article Date',
			'author_id' => 'Author',
			'create_date' => 'Create Date',
			'update_date' => 'Update Date',
			'update_user' => 'Update User',
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
		$criteria->compare('Category_id',$this->Category_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('content',$this->content,true);
		$criteria->compare('tags',$this->tags,true);
		$criteria->compare('status',$this->status);
		$criteria->compare('essential',$this->essential);
		$criteria->compare('article_date',$this->article_date);
		$criteria->compare('author_id',$this->author_id);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('update_date',$this->update_date);
		$criteria->compare('update_user',$this->update_user);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public function scopes()
	{
		return array(
				'published'=>array(
						'condition'=>'status= ' . self::STATUS_PUBLISH,
				),
				'private'=>array('condition'=>'status= ' . self::STATUS_PRIVATE,),
				'draft'=>array('condition'=>'status= ' . self::STATUS_DRAFT,),
				'recently'=>array(
						'order'=>'create_date DESC',
						'limit'=>5,
				),
				'own'=>array('condition'=>' create_user =' . Yii::app()->user->id),
				'byClass'=>array(),
		);
	}
	
	public function recently($limit=5)
	{
		$this->getDbCriteria()->mergeWith(array(
				'order'=>'create_date DESC',
				'limit'=>$limit,
		));
		return $this;
	}
	public  function byClass($class_code){
		$this->getDbCriteria()->mergeWith(array('condition'=>'class_code =:class_code' ,'params'=>array(':class_code'=>$class_code)));
		return $this;
	}
}
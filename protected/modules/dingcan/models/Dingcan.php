<?php

/**
 * This is the model class for table "dingcai".
 *
 * The followings are the available columns in table 'dingcai':
 * @property string $id
 * @property string $user_id
 * @property string $count
 * @property string $book_date
 * @property integer $cancel_tag
 * @property float  $total_price
 */
class Dingcan extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Dingcan the static model class
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
		return 'dingcai';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id,cai_id, count, book_date', 'required'),
			array('cancel_tag', 'numerical', 'integerOnly'=>true),
			array('user_id, count, book_date', 'length', 'max'=>10),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, user_id, count, book_date, cancel_tag', 'safe', 'on'=>'search'),
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
		'user'=>array(self::BELONGS_TO,'User','user_id'),
		'cai'=>array(self::BELONGS_TO,'Cai','cai_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
		    'cai_id'=>'订购菜',
			'user_id' => '用户',
			'count' => '订购数量',
			'book_date' => '订购日期',
			'cancel_tag' => 'Cancel Tag',
		    'total_price'=>'合计金额',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search($order=false)
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('user_id',$this->user_id,true);
		$criteria->compare('count',$this->count,true);
		$criteria->compare('book_date',$this->book_date,true);
		$criteria->compare('cancel_tag',$this->cancel_tag);

		if($order){
			$criteria->order=$order;
		}
		
		
		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		    'sort'=> false,
            'pagination' => array(
               'pagesize' => 30,
            ),
		
		));
	}
	
	public function statCaiBook(){
		
		$result = Cai::model()->with(array('bookCount'=>array('condition'=>'book_date = :day','params'=>array(':day'=>$this->book_date))))->findAll(' t.id in ( select cai_id from dingcai b where b.book_date = :book_date) ',array(':book_date'=>$this->book_date));
		return $result;
	} 
	
	public function statUserSum(){
		return User::model()->with(array('booksum'=>array('condition'=>'book_date = :day','params'=>array(':day'=>$this->book_date)),'profile'))->findAll(' id in ( select user_id from dingcai b where b.book_date = :book_date) ',array(':book_date'=>$this->book_date));
	}
}
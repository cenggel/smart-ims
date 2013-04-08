<?php

/**
 * This is the model class for table "cai".
 *
 * The followings are the available columns in table 'cai':
 * @property string $id
 * @property string $cai_date
 * @property string $description
 * @property integer $del_flag
 * @property end_date
 * @property price
 */
class Cai extends CActiveRecord {
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Cai the static model class
	 */
	public static function model($className = __CLASS__) {
		return parent::model ( $className );
	}
	
	/**
	 * @return string the associated database table name
	 */
	public function tableName() {
		return 'cai';
	}
	
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules() {
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array (array ('cai_date, description', 'required' ), 
		array('price', 'numerical',),
		array('category','numerical','integerOnly'=>'true'),
		array ('cai_date,end_date', 'length', 'max' => 10 ), // The following rule is used by search().
		// Please remove those attributes that should not be searched.
		array ('id, cai_date, description,category', 'safe', 'on' => 'search' ) );
	}
	
	/**
	 * @return array relational rules.
	 */
	public function relations() {
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array (
		   'bookCount'=>array(self::STAT,'Dingcan','cai_id','select'=>'sum(count)'),
		);
	}
	
	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels() {
		return array ('id' => 'ID', 'cai_date' => '日期', 'description' => '今日菜单',
		'price'=>'单价', 'del_flag' => 'Del Flag' ,'end_date' => '有效期至',
		'bookCount'=>'订购数',
		'category'=>'分类',
		'count'=>'订购数');
	}
	
	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search() {
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.
		

		$criteria = new CDbCriteria ();
		
		$criteria->compare ( 'id', $this->id, true );
		if (is_integer ( $this->cai_date )) {
			$criteria->compare ( 'cai_date', $this->cai_date, true );
		} else {
			$value = $this->cai_date;
			if (preg_match ( '/^(?:\s*(<>|<=|>=|<|>|=))?(.*)$/', $value, $matches )) {
				$value = $matches [2];
				$op = $matches [1];
			} else {
				$op = '';
			}
			$criteria->compare ( 'cai_date', $op . strtotime ( $value, true ) );
		}
		$criteria->compare ( 'description', $this->description, true );
		$criteria->compare ( 'del_flag', $this->del_flag );
		$criteria->compare ('price',   $this->price);
		//var_dump( $this->category);
		$criteria->compare('category', $this->category);
		
		//print_r ( $criteria->toArray () );
		return new CActiveDataProvider ( $this, array ('criteria' => $criteria ,'pagination' => array(
               'pagesize' => 40,
            )) );
	}
	
	protected function beforeSave() {
		if (! parent::beforeSave ())
			return false;
		
		echo strtotime ( $this->cai_date ) . "  =" . $this->cai_date;
		$this->cai_date = strtotime ( $this->cai_date );
		$this->end_date = strtotime ( $this->end_date );
		//echo $this->cai_date;exit;
		$this->del_flag = 0;
		return true;
	}
	
	public static function getCaiList(){
		$time = time ();
		$day = strtotime ( date ( 'Y-m-d' ) );
		$models = Cai::model()->with(array('bookCount'=>array('condition'=>'book_date = :day','params'=>array(':day'=>$day))))->findAll("cai_date  <= :date and end_date > :date",array(":date"=>$time));
		$result=array();
		
		foreach ($models as $model){
			$result[$model->id]= $model->description . '（ '.$model->price .' 元）';
		}
		return $result;
	}
	
	public function getCategoryName(){
		return Enumeration::item('CAI_CAT', $this->category);
	}
	
	public static function getCategoryList(){
		return Enumeration::items('CAI_CAT');
	}
}
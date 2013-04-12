<?php
Yii::import('application.modules.site.siteModule.php');
/**
 * This is the model class for table "request".
 *
 * The followings are the available columns in table 'request':
 * @property integer $id
 * @property integer $groups_id
 * @property string $request_code
 * @property integer $state
 * @property integer $create_date
 * @property integer $release_date
 * @property integer $booking_release_date
 *
 * The followings are the available model relations:
 * @property Groups $groups
 */
class Request extends BaseActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Request the static model class
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
		return 'request';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('request_code', 'required'),
			array('id, groups_id, state, create_date, release_date', 'numerical', 'integerOnly'=>true),
			array('request_code', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, groups_id, request_code, state, create_date, release_date, booking_release_date', 'safe', 'on'=>'search'),
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
			'groups' => array(self::BELONGS_TO, 'Groups', 'groups_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
		    'group_name' => Yii::t('siteModule.request','Group Name'),
			'groups_id' => 'Groups',
			'request_code' => Yii::t('siteModule.request','Request Code'),
			'state' => 'State',
			'create_date' => 'Create Date',
			'release_date' => 'Release Date',
			'booking_release_date' =>  Yii::t('siteModule.request','Booking Date'),
		
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
		$criteria->compare('groups_id',$this->groups_id);
		$criteria->compare('request_code',$this->request_code,true);
		$criteria->compare('state',$this->state);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('release_date',$this->release_date);
		$criteria->compare('booking_release_date',$this->booking_release_date);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public function getOwenMenuList(){
//		$models = self::model()->owned()->findAll();
	    
		$menu = array(array('label'=>'需求列表','url'=> array( '/request/index')));
//		foreach ($models as $key=>$g){
		$menu[]= array('label'=>Yii::t('siteModule.request','Create Request'),'url'=>array('/request/create'));
//		}
		//print_r($menu);
		return $menu;
	}
	
   protected function beforeSave() {
		if (! parent::beforeSave ())
			return false;
		
		echo strtotime ( $this->booking_release_date ) . "  =" . $this->booking_release_date;
		$this->booking_release_date = strtotime ( $this->booking_release_date );
//		$this->release_date = strtotime ( $this->release_date );
		$this->state = '0';
		if ($this->isNewRecord ){
			$this->create_date=time();
		}
		//echo $this->cai_date;exit;
//		$this->del_flag = 0;
		return true;
	}
	
	
}
<?php

/**
 * This is the model class for table "groups".
 *
 * The followings are the available columns in table 'groups':
 * @property integer $id
 * @property string $group_name
 * @property string $description
 * @property integer $create_user
 * @property integer $create_date
 * @property integer $views
 * @property string  $image
 * @property integer $status
 * @property string  $alias
 * @property string  $group_type
 * 
 */
class Groups extends BaseActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Groups the static model class
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
		return 'groups';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('group_name', 'required'),
			array('create_user, create_date, views, status', 'numerical', 'integerOnly'=>true),
			array('group_name,alias', 'length', 'max'=>45),
			array('description,image', 'length', 'max'=>255),
			array('alias, group_name','unique','on'=>'create,update'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, group_name, description, create_user, create_date, views,image,alias,status,group_type', 'safe', 'on'=>'search'),
		);
	}


	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'group_name' => Yii::t('siteModule.groups','Group Name'),
			'description' => Yii::t('siteModule.groups','Description'),
			'create_user' => Yii::t('siteModule.groups','Create User'),
			'create_date' => Yii::t('siteModule.groups','Create Date'),
			'members' => Yii::t('siteModule.groups','Members'),
			'views' => Yii::t('siteModule.groups','Views'),
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
		$criteria->compare('group_name',$this->group_name,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('create_user',$this->create_user);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('views',$this->views);
		$criteria->compare('alias',$this->alias);
		$criteria->compare('status', $this->status);
		$criteria->compare('group_type', $this->group_type);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	
	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
				'members'=>array(self::MANY_MANY,'User','group_members(groups_id,users_id)'),
				'creator'=>array(self::BELONGS_TO,'User','create_user'),
				'articles'=>array(self::HAS_MANY,'Article','group_id'),
				'categories'=>array(self::HAS_MANY,'Category','group_id'),
				'request'=>array(self::HAS_ONE,'Request','groups_id'),
		);
	}
	
	public function getFromFieldList(){
		return array(
				'defualt'=>array(
						'group_name',
						'description',
				),
		);
	}
	
	public function scopes(){
		return array(
				'owned'=>array('condition'=>'create_user = ' . (Yii::app()->user->id?Yii::app()->user->id:'0')),
		);
	}
	
	public function getOwenMenuList(){
		$models = self::model()->owned()->findAll();
	
		$menu = array(array('label'=>Yii::t('core','Create Group'),'url'=>array('/groups/create')));
		foreach ($models as $key=>$g){
			$menu[]= array('label'=>$g->group_name,'url'=> array( '/groups/home','id'=>$g->id));
		}
		//print_r($menu);
		return $menu;
	}
	
	public  function getUrl(){
		return Yii::app()->urlManager->createUrl('/groups/home',array('id'=>$this->id));
	}
	
	public  function getRequestHomeUrl(){
		return Yii::app()->urlManager->createUrl('/request/home',array('id'=>$this->id));
	}
	
	public static function getCreateUrl(){
		return Yii::app()->urlManager->createUrl('/groups/create');
	}
	protected function beforeSave() {
		if (! parent::beforeSave ())
			return false;
		if ($this->isNewRecord) {
			$this->create_date =  time ();
			$this->create_user = Yii::app ()->user->id;
		}
	
		return true;
	}
	
	public  function getArticleStatInfo(){
		$class = Enumeration::items('ARTICLE_CLASS');
		$result = array();
		//echo "<pre>";
		foreach ($class as $k=>$c){
			//print_r($c);
			$result[$k] = Article::model()->count()->byClass($k)->byGroup($this->id)->published();
		}
		
		//print_r($result);exit;
		return $result;
	}
	
	public function getLatestAritcleList(){
		$class = Enumeration::items('ARTICLE_CLASS');
		$result = array();
		//echo "<pre>";
		foreach ($class as $k=>$c){
			//print_r($c);
			$model = Article::model()->recently(5)->byClass($k)->published();
			if($this->id >0){
				$model=$model->byGroup($this->id);
			}
			$result[$k] = $model->findAll();
		}
		
		//print_r($result);exit;
		return $result;
	}
	
public function getDocumentsList(){
		$result = array();
		$model = new Documents;;
		$model=$model->byGroup($this->id);
		
		return $model->findAll();
	}
	
	public  function afterDelete(){
		Article::model()->updateAll(array('group_id'=>'0'),'group_id = :group_id',array(':group_id'=>$this->id));
		Category::model()->updateAll(array('group_id'=>'0'),'group_id = :group_id',array(':group_id'=>$this->id));
		return parent::afterDelete();
	}
	
}
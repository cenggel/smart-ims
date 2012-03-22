<?php

/**
 * This is the model class for table "category".
 *
 * The followings are the available columns in table 'category':
 * @property integer $id
 * @property string $name
 * @property string $Alias
 * @property string $class_code
 * @property string $description
 * @property integer $parent_id
 * @property integer $display_order
 * @property integer $create_user
 * @property integer $views
 * @property integer $group_id
 * @property integer $create_date
 * @property integer $update_date
 * @property integer $update_user
 */
class Category extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Category the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	
	protected $old_class_code=null;

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'category';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name', 'required'),
			array('parent_id, display_order, create_user, views, group_id, create_date, update_date, update_user', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>200),
			array('Alias, class_code', 'length', 'max'=>45),
			array('description', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, name, Alias, class_code, description, parent_id, display_order, create_user, views, group_id, create_date, update_date, update_user', 'safe', 'on'=>'search'),
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
				'parent'=>array(self::BELONGS_TO, 'Category', 'parent_id'),
				'children'=>array(self::HAS_MANY, 'Category', 'parent_id'),
				
				
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		$labels = array(
			'id' => 'ID',
			'name' => 'Name',
			'Alias' => 'Alias',
			'class_code' => 'Class Code',
			'description' => 'Description',
			'parent_id' => 'Parent',
			'display_order' => 'Display Order',
			'create_user' => 'Create User',
			'views' => 'Views',
			'group_id' => 'Group',
			'create_date' => 'Create Date',
			'update_date' => 'Update Date',
			'update_user' => 'Update User',
		);
		
		foreach($labels as $key=>$val){
			$labels[$key]= SiteModule::t($val,null,'category');
		}
		return $labels;
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
		$criteria->compare('name',$this->name,true);
		$criteria->compare('Alias',$this->Alias,true);
		$criteria->compare('class_code',$this->class_code,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('parent_id',$this->parent_id);
		$criteria->compare('display_order',$this->display_order);
		$criteria->compare('create_user',$this->create_user);
		$criteria->compare('views',$this->views);
		$criteria->compare('group_id',$this->group_id);
		$criteria->compare('create_date',$this->create_date);
		$criteria->compare('update_date',$this->update_date);
		$criteria->compare('update_user',$this->update_user);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	protected function afterFind(){
		parent::afterFind();
		if($this->class_code)
			$this->old_class_code = $this->class_code;
	}
	
	protected function beforeSave() {
		if (! parent::beforeSave ())
			return false;
		if ($this->isNewRecord) {
			$this->create_date = $this->update_date = time ();
			$this->create_user = Yii::app ()->user->id;
		} else {
			$this->update_date = time ();
			$this->update_user = Yii::app ()->user->id;
			
		}
		
		//class code can't be changed
		if($this->old_class_code && $this->class_code && $this->old_class_code!= $this->class_code){
			$this->addError(class_code, Yii::t('siteModel.category', "Category class code can't be changed"));
			return false;
		}
		
		/*$img =CUploadedFile::getInstance($this,'image');
		
		if(!empty($img)){
			$this->image= Yii::app()->params['categoryImageDir']['url'].$img->name;
			$img->saveAs(Yii::app()->params['categoryImageDir']['path'].$img->name);
		}*/
		
		return true;
	}
	
	public function getTreeListForSelect($parentid = 0, $prefix = "&nbsp&nbsp;") {
		
		$return = array ('0'=>Yii::t('siteModule.category','Root Category'));
		$criteria = new CDbCriteria ( );
		$criteria->condition = "class_code='{$this->class_code}' and parent_Id= {$parentid}";
		$criteria->order = " parent_Id asc,display_order asc";
		$cats = Category::model ()->findAll ( $criteria );
		foreach ( $cats as $cat ) {
			//$cat->name='|'.str_repeat($prefix,$cat->level)."|-".$cat->name;
			//echo "<br>".str_repeat("&nbsp;&nbsp;&nbsp;",$cat->level)."|-".$cat->name;
			$return [$cat->id] = str_repeat ( $prefix, $cat->level + 1 ) . "|-" . $cat->name;
			//print_r($this->getTreeListForSelect($moduleName,$cat->id));
			$return = array_merge ( $return, $this->getTreeListForSelect (  $cat->id ) );
		}
		return $return;
	
	}
	
	public function getSelectDataList($parentid = 0, $prefix = "&nbsp&nbsp;"){
		return $this->getTreeListForSelect($parentid,$prefix);
	}
}
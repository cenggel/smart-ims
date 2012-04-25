<?php

/**
 * This is the model class for table "category".
 *
 * The followings are the available columns in table 'category':
 * @property integer $id
 * @property string $name
 * @property string $alias
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
 * @property integer $category_type
 */
class Category extends CActiveRecord
{
	const SYS_CATEGORY = 1;
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
			array('parent_id, display_order, create_user, views, group_id, create_date, update_date, update_user, category_type', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>200),
			array('alias, class_code', 'length', 'max'=>45),
			array('description', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, name, alias, class_code, description, parent_id, display_order, create_user, views, group_id, create_date, update_date, update_user, category_type', 'safe', 'on'=>'search'),
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
				'childs'=>array(self::HAS_MANY, 'Category', 'parent_id'),
				'group'=>array(self::BELONGS_TO, 'Groups', 'group_id'),
				'articles'=>array(self::HAS_MANY,'Article','category_id'),
				
				
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
			'alias' => 'Alias',
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
		$criteria->compare('alias',$this->alias,true);
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
	
	public function getTreeListCat($parentid = 0, $depth = "--",$group_id=false,$class_code=false) {
		
		$data = array ();
		$criteria = new CDbCriteria ( );
		$criteria->condition = " parent_Id= {$parentid}";
		
		if(!$class_code) $class_code = $this->class_code;
		if($class_code){
			$criteria->addCondition("class_code ='{$class_code}'");
		}
		
		if($group_id){
			$criteria->addCondition("(group_id = $group_id or category_type=" .self::SYS_CATEGORY .")");
		}
		$criteria->order = " parent_Id asc,display_order asc";
		$cats = Category::model ()->findAll ( $criteria );
		foreach ( $cats as $cat ) {
			$data [] = $cat;
			$data = array_merge( $data,$this->getRecursiveCats($cat));
		}
		
		//echo "<br>";print_r($return);
		return $data;
	
	}
	
	public function getListData($parentid = 0, $depth = "--",$group_id=false,$class_code=false){
		$models =$this->getTreeListCat($parentid,$depth,$group_id,$class_code);
		//print_r($models);exit;
		return CHtml::listData($models,'id','name');
	}
	
	
	/**
	 * Get root categories
	 */
	public function getRootCats()
	{
		$data = array();
		
		$criteria=new CDbCriteria;
		$criteria->addCondition('parent_id = 0 ');
		if($this->group_id) $criteria->addCondition('group_id = '.$this->group_id);
		if($this->class_code) $criteria->addCondition("class_code = '{$this->class_code}'");
		
		$models = self::model()->byPosition()->findAll($criteria);
		if( count( $models ) )
		{
			foreach($models as $model)
			{
				$data[] = $model;
				$data = array_merge($data, $this->getRecursiveCats($model));
			}
		}
		return $data;
	}
	
	/**
	 * Recursive function to get child categories
	 */
	public function getRecursiveCats($cat, $depth='--')
	{
		$data = array();
		foreach($cat->childs as $model)
		{
			$model->name = '|' .$depth . ' ' . $model->name;
			$data[] = $model;
			$data = array_merge($data, $this->getRecursiveCats($model, $depth . $depth));
		}
	
		return $data;
	}
	
	/**
	 * Get root categories
	 */
	public function getRootCategories()
	{
		Yii::trace('test---------');
		$data = array();
		$criteria=new CDbCriteria;
		$criteria->addCondition('parent_id = 0 ');
		if($this->group_id) $criteria->addCondition('group_id = '.$this->group_id);
		if($this->class_code) $criteria->addCondition("class_code = '{$this->class_code}'");
		$models = self::model()->byPosition()->findAll($criteria);
		if( count( $models ) )
		{
			foreach($models as $model)
			{
				$data[ $model->id ] = array_merge(
						$model->getAttributes(),
						array('children' => self::getChilds($model->id))
				);
			}
		}
		return $data;
	}
	
	/**
	 * Get child categories
	 */
	public function getChilds($id, $depth = '--')
	{
		$data = array();
		$childs = self::model()->findAll('parent_id=:parent', array(':parent'=>$id));
		if( count($childs) )
		{
			foreach($childs as $model)
			{
				$model->name = $depth . $model->name;
				$data[ $model->id ] = array_merge(
						$model->getAttributes(),
						array('children' => self::getChilds($model->id, $depth . $depth))
				);
			}
		}
		return $data;
	}
	
	public function getViewUrl($group_id=false,$class_code=false){
		$params= array('id'=>$this->id);
		if(Yii::app()->request->getParam('group_id') && !$group_id) $group_id =  Yii::app()->request->getParam('group_id');
		
		if($this->group_id || $group_id) $params['group_id'] = $group_id?$group_id:$this->group_id;
		if($this->class_code || $class_code) $params['class_code']=$class_code ? $class_code:$this->class_code;
		return  Yii::app()->urlManager->createUrl('site/category/index',$params);
	}
	
	
	/**
	 * Scopes
	 */
	public function scopes()
	{
		return array(
				'byPosition'=>array(
						'order'=>'display_order ASC',
				),
		);
	}
	
	public function beforeDelete(){
		if($this->category_type== self::SYS_CATEGORY){
			Yii::app()->user->setFlash('error',Yii::t('siteModule.category','system category cannot be delete!'));
			return false;
		}
		
		return parent::beforeDelete();
	}
	
	public function afterDelete(){
		$defcat = $this->findByAttributes(array('class_code'=>$this->class_code,'category_type'=>self::SYS_CATEGORY));
		$catId = '0';
		if($defcat){
			$catId= $defcat->id;
		}
		Article::model()->updateAll(array('category_id'=>$defcat),'category_id = :category_id',array(':category_id'=>$this->id));
		
		return parent::afterDelete();
	}
}
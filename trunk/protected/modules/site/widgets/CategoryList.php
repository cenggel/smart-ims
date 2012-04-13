<?php
class CategoryList extends Portlet{
	
	public $class_code=false;
	public $group_id=false;
	public $category_id =false;
	
	protected  $items=array();
	public function childInit(){
		//$this->items[]=	array('label'=>Yii::t('siteModule.category','Category List'));
			
		$cates = Category::model()->getTreeListCat((int)$category_id,'--',$this->group_id,$this->class_code);
		if(is_array($cates)){
			foreach ($cates as $cat){
				$this->items[]=array('label'=>$cat->name,
						'url'=>$cat->getViewUrl($this->group_id,$this->class_code),
						'icon'=>'folder-open');
			}
		}
	} 
	public function renderContent(){
		/*$this->widget('bootstrap.widgets.BootMenu', array(
				'type'=>'list',// '', 'tabs', 'pills' (or 'list')
				
				'items'=>$this->items,
		));*/
		
		$this->render('categorylist',array('group_id'=>$this->group_id,
				'class_code'=>$this->class_code,'items'=>$this->items));
	}
}
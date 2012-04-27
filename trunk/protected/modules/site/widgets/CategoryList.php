<?php
class CategoryList extends Portlet{
	
	public $class_code=false;
	public $group_id=false;
	public $category_id =false;
	
	protected  $items=array();
	public function childInit(){
		//$this->items[]=	array('label'=>Yii::t('siteModule.category','Category List'));
			
		$cates = Category::model()->getTreeListCat((int)$this->category_id,'--',$this->group_id,$this->class_code);
		if(is_array($cates)){
			foreach ($cates as $cat){
				$this->items[]=array('label'=>$cat->name,
						'url'=>$cat->getViewUrl($this->group_id,$this->class_code),
						'icon'=>'folder-open');
			}
		}
		
		$tags= Tag::model()->findall();
		if(is_array($tags)){
			$this->items[]=array('label'=>'Tags');
			foreach ($tags as $tag){
				$this->items[] = array('label'=>$tag->name,
						'url'=>$tag->url,
						'icon'=>'tag');
			}
		}
	} 
	public function renderContent(){
		/*$this->widget('bootstrap.widgets.BootMenu', array(
				'type'=>'list',// '', 'tabs', 'pills' (or 'list')
				
				'items'=>$this->items,
		));*/
		
		$params = array();
		if($this->class_code){
			$params['class_code']= $this->class_code;
		}
		if($this->group_id){
			$params['group_id']= $this->group_id;
		}
		$this->render('categorylist',array('group_id'=>$this->group_id,
				'class_code'=>$this->class_code,'items'=>$this->items,
				'params'=>$params));
	}
}
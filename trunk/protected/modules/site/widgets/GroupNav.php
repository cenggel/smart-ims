<?php
class GroupNav extends Portlet{
	
	function init(){
		//print_r($this->owner);
		$this->visible = (isset($this->owner->working_group) && $this->owner->working_group !=null);
		parent::init();
	}
	
	public function renderContent(){
		$menu = array(
				
				
				'notice'=>array('label'=>'通知',
						'url'=>Yii::app()->urlManager->createUrl('site/article/index',array('group_id'=>$this->owner->working_group->id,
								'class_code'=>'notice')),
						'active'=>('notice'==$this->owner->working_class)),
				
				'tutorials'=>array('label'=>'教程',
						'url'=>Yii::app()->urlManager->createUrl('site/article/index',array('group_id'=>$this->owner->working_group->id,
						'class_code'=>'tutorials')),
						'active'=>('tutorials'==$this->owner->working_class)),
				'handbook'=>array('label'=>'手册','url'=>Yii::app()->urlManager->createUrl('site/article/index',array('group_id'=>$this->owner->working_group->id,
						'class_code'=>'handbook')),
						'active'=>('handbook'==$this->owner->working_class)),
				'document'=>array('label'=>'文档','url'=>Yii::app()->urlManager->createUrl('site/article/index',array('group_id'=>$this->owner->working_group->id,
						'class_code'=>'document')),
						'active'=>('document'==$this->owner->working_class)),
				'event'=>array('label'=>'日历',
						'url'=>Yii::app()->urlManager->CreateUrl('/cal'),
						'active'=>('cal'== $this->getController()->getModule()->getId())
						),
				'settings'=>array('label'=>'管理',
						'url'=>Yii::app()->urlManager->CreateUrl('site/groups/view',array('id'=>$this->owner->working_group->id,'id'=>$this->owner->working_group->id)),
						
						'active'=>('groups'== $this->getController()->getId() && 'home'!=$this->getController()->getAction()->getId()))
				);
		//var_dump($this->owner->working_class);
		//print_r($menu);exit;
		
				
		$themebase = Yii::app()->theme->baseUrl;
		echo "<div class='group-nav'>";
		$this->widget('bootstrap.widgets.TbNavbar',array(
				'type'=>'inverse', // null or 'inverse'
			    'brand'=>$this->owner->working_group->group_name,
			    'brandUrl'=>$this->owner->working_group->url,
		        'htmlOptions'=>array('class'=>'group-navbar','style'=>'top:48px; z-index:1020;'),
			    
			    'collapse'=>true, 
				'items'=>array(
								array(
				            'class'=>'bootstrap.widgets.TbMenu',
								'type'=>'pills',
							'items'=>$menu,
								),
					),
				)); 
 		echo "</div>";
/*
echo <<<T
		<div class="group-nav grid_24">
		<div class="group-info grid_6 alpha"><img src="{$themebase}/images/group_logo_default60.jpg"  align="absBottom" alt="{$this->owner->working_group->group_name}"/> <span class="name" >{$this->owner->working_group->group_name}</span></div>
		<div class="grid_18 sub-nav omega ui-tabs">
		<ul class="inline-list floatright ui-tabs-nav">
		
T;
       foreach ($menu as $m){
		echo "<li class=\"ui-state-default ui-corner-top ";
		if($m['selected']) echo " ui-tabs-selected ui-state-active ";
		echo " \"><a href=\"{$m['url']}\">{$m['label']}</a></li>";
	}
echo <<<T
		</ul>
		</div>
		</div>
T;
	
	*/
	}
}
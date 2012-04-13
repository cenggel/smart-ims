<?php
//Yii::import('zii.widgets.CPortlet');

class Portlet extends CWidget
{
	public $visible=true;
	
	public function init(){
		if($this->visible){
			$this->childInit();
			parent::init();
		}
	}
	
	public function run(){
		
		if($this->visible){
			$this->renderContent();
		}
	}
	
	public function renderContent(){}
	public function childInit(){
		
	}
}
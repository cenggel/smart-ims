<?php
class NotifyList extends CWidget{
	
	/**
	 * 
	 * @var string unread|all
	 */
	public $type='unread';
	public $wrapHtmlOptions =array();
	
	public $module =null;
	
	public function init(){
		if(!isset($this->wrapHtmlOptions['id'])){
			$this->wrapHtmlOptions['id']='notify-list';
		}
		if(!isset($this->wrapHtmlOptions['class'])){
			$this->wrapHtmlOptions['class']='notify-list';
		}
		
		$this->module = Yii::app()->getModule('notify');
	}
	public function run(){
		$notifies = false;
		if(!Yii::app()->user->isGuest){
			if(strtolower($this->type)=='all'){
			  	$notifies = Yii::app()->notifier->getAllNotifies(Yii::app()->user->id);
			}else{
				$notifies = Yii::app()->notifier->getUnreadNotifies(Yii::app()->user->id);
			}
			
			$this->render('notifylist',array('notifies'=>$notifies,'wrapHtmlOptions'=>$this->wrapHtmlOptions));
		}
	}
	
	public function getBadges($var,$type="info"){
		ob_start();
		$this->widget('bootstrap.widgets.BootBadge', array(
				'type'=>$type, // '', 'success', 'warning', 'error', 'info' or 'inverse'
				'label'=>$var,
		));
		
		return ob_get_clean();
	}
	
	public function renderContent($notifies){
		//var_dump(count($notifies));
		ob_start();
		$this->render('_list',array('notifies'=>$notifies));
		$return = ob_get_clean();
		//var_dump($return);
		return $return;
	}
}
<?php
Yii::import('application.modules.notify.NotifyModule');
class NotifyArBehavior extends CActiveRecordBehavior{
	public $notifyEvents =array();
	public $notifyClass;
	public $notifyType=false;
	public $users = false;
	public $defaultUsers='*';
	public $title;
	public $summary=false;
	public $url=false;



	public function afterSave($event){
		if(in_array($this->owner->getScenario(), array_keys($this->notifyEvents) )){
			$this->addEvent($this->notifyEvents[$this->owner->getScenario()]);
		}
		
		return true;
	}

	public function addEvent($event){
		
		if(empty($this->notifyClass)){
			throw new CException(Yii::t('NotifyModule.notify', 'Event class not be empty'));
		}

		$notify = array();
		if(method_exists($this->owner, 'getNotifyInfo')){
			$notify = $this->owner->notifyInfo;
		}else {

			if(empty($this->title)){
				throw new CException(Yii::t('NotifyModule.notify', 'Event title not be empty'),400);
			}

			$users =$this->getUserList();
			$notify = array('title'=>strpos( $this->title,'$data')!==false?$this->getValueByData($this->title):$this->owner->getAttribute($this->title));

			if($this->summary){
				$notify['summary']= strpos($this->summary,'$data')!==false?$this->getValueByData($this->summary):$this->owner->getAttribute($this->summary);
			}

			
			if($this->owner->hasAttribute('url')||method_exists($this->owner, 'getUrl')){
				$notify['url']=$this->owner->url;
			}else if($this->url){
				$notify['url']= Yii::app()->urlManager->createUrl($this->url,array('id'=> $this->owner->getAttribute($this->owner->getPrimaryKey())));
			}

			$notify['item_id'] = $this->owner->getPrimaryKey();
		}
		
		
		if(!isset($notify['notify_type']) && $this->notifyType){
			$notify['notify_type'] = $this->notifyType;
		}
		$notify['owner_class']= get_class($this->owner);
		Yii::app()->notifier->event($this->getValueByData($this->notifyClass),$this->getValueByData($event),$users,$notify);
	}
	
	protected function getUserList(){
		$users = $this->users;
		if(strpos( $users,'$data')){
			$data = $this->owner;
			return eval("return $users ;");
		}
		if(is_string($this->users) && $this->users !='*' && !is_numeric($this->users)){//
			if(strpos( $this->users,'.')!==false){//get user from relations
				list($rel,$meth) = explode('.', $this->users);
				return $this->owner->$rel instanceof CActiveRecord ? $this->owner->$rel->$meth:$this->defaultUsers;				
			}
			
			if($this->owner->hasAttribute($users)){
				return $this->owner->$users;
			}
			
			if(method_exists($this->owner, $users)){
				return $this->owner->$users();
			}
			
			return $this->defaultUsers;
		}
		
		return $this->users;
	}
	
	protected function getValueByData($val_str){
		
		if(strpos( $val_str,'$data')===false) return $val_str;
		$data = $this->owner;
		return eval("return $val_str ;");
		
	}
}
<?php

class NotifyModule extends CWebModule
{

	public  $userConfig=array();
	public $notifyConfig=array();
	public function init()
	{
		// this method is called when the module is being created
		// you may place code here to customize the module or the application

		// import the module-level models and components
		$this->setImport(array(
				'notify.models.*',
				'notify.components.*',
		));

		$this->aliases=array('notify'=>'applicaiton.modules.notify');
	}

	public function beforeControllerAction($controller, $action)
	{
		if(parent::beforeControllerAction($controller, $action))
		{
			// this method is called before any module controller action is performed
			// you may place customized code here
			return true;
		}
		else
			return false;
	}

	public function getClassLabel($notify){

		if(is_string($notify)){
			$label = $notify;
			$retLabel = isset($this->notifyConfig[$class]) && isset($this->notifyConfig[$class]['label'])?$this->notifyConfig[$class]['label']:$class;

		}else if($notify instanceof  CActiveRecord){
			$retLabel = $label = $class= $notify->notify_class;
			
			if(isset($this->notifyConfig[$class]) && isset($this->notifyConfig[$class]['label'])){
				$retLabel = $this->notifyConfig[$class]['label'];
			}else if($notify->owner_class && isset($this->notifyConfig[$notify->owner_class]) &&
					isset($this->notifyConfig[$notify->owner_class]['classLabel'])){
				$retLabel = $this->notifyConfig[$notify->owner_class]['classLabel'];
			}
		}

		//echo $retLabel." = $label <br>";
		if(strpos($retLabel, '$label')){
			return eval("return $retLabel ;");
		}
		return Yii::t('notifyModule.notify',$retLabel);
	}

	public function getEventLabel($notify,$class=''){
		if(is_string($notify)){
			$label = $notify;
			$events = (isset($this->notifyConfig[$class]) && isset($this->notifyConfig[$class][$notify])?$this->notifyConfig[$class][$notify]:array());
			$retLabel = isset($events['label'])?$events['label']:$event;
		}else if($notify instanceof  CActiveRecord){
			$class = $notify->notify_class;
			$retLabel = $label= $event = $notify->notify_event;
			$events = (isset($this->notifyConfig[$class]) && isset($this->notifyConfig[$class][$event])?$this->notifyConfig[$class][$event]:array());

			if(isset($events['label'])){
				$retLabel = $events['label'];
			}if($notify->owner_class && isset($this->notifyConfig[$notify->owner_class]) &&
					isset($this->notifyConfig[$notify->owner_class]['eventLabel'])){
				$retLabel = $this->notifyConfig[$notify->owner_class]['eventLabel'];
			}
		}
		if(strpos($retLabel, '$label')){
			return eval("return $retLabel ;");
		}
		return Yii::t('notifyModule.notify',$event);

	}


}

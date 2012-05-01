<?php
Yii::import('application.modules.notify.models.*');
class Notifier extends CApplicationComponent{

	public function init(){
		//$this->event('ARTICLE', 'NEW', 1,array('title'=>'new event test','summary'=>'new event testing new event testingnew event testingnew event testingnew event testing ........'));
		//echo "xxxwwww";
	}

	/**
	 * add notify event
	 *
	 * @param string $notify_class
	 * @param string $event
	 * @param integer $item_id
	 * @param mixed $users '*' all users;array(1,2,4) user id list; 1 one user; array(userActiveRecord1,userActiveRecord2) user object list
	 * @param array $notify  valid params [title,summary,url,notify_type,params,item_id]
	 */
	public function event($notify_class,$event,$users="*",$notify=array()){

		if($users =="*"){
			$userConfig = Yii::app()->getModule('notify')->userConfig;
			if (isset($userConfig['class']) && class_exists($userConfig['class'])) {
				$umod = new $userConfig['class'];
				$users = $umod->findAll();
			}
		}
		if(is_array($users)){
			foreach ($users as $key =>$u){
				if($u instanceof CActiveRecord){
					//@todo user id field read from config ?
					$this->addEvent($notify_class, $event, $u->id,$notify);
				}
				else if(is_numeric($u)){
					$this->addEvent($notify_class, $event, $u,$notify);
				}
			}
		}else if(is_numeric($users)){
			$this->addEvent($notify_class, $event, $users,$notify);
		}

	}


	protected  function addEvent($notify_class,$event,$user,$notifyattr){
		$notify = new Notify();
		 
		 
		$notify->notify_class = $notify_class;
		$notify->notify_event = $event;
		$notify->setAttributes($notifyattr);
		$notify->user_id = $user;
		$notify->status = Notify::UNREAD;
		if($notify->notify_type==null){
			$notify->notify_type = Notify::NOTIFY_DEFAULT;
		}
		 
		if(!$notify->save()){
			$errors = array();
			if(is_array($notify->getErrors())){
				foreach ($notify->getErrors() as $err){
					if(is_string($err)){
						$errors[]= $err;	
					}else if(is_array($err)){
						$errors = array_merge($errors,$err);
					}
				}
			}
			throw new CException(implode('<br>', $errors));
		}
	}

	public function getAllNotifies($user_id){
		$notifies = Notify::model()->byUser($user_id)->findAll();
		return $this->formatNotifies($notifies);
	}
	public function getUnreadNotifies($user_id){
		return $this->formatNotifies( Notify::model()->byUser($user_id)->unread()->findAll());
	}

	protected function formatNotifies($notifies){
		$data = array();
		$class="";
		if(is_array($notifies)){
			foreach ($notifies as $n){
				if(!isset($data[$n->notify_class])){
					$data[$n->notify_class]= array();
				}
				/*if(!isset($data[$n->notify_event])){
				 $data[$n->notify_class][$n->notify_event]= array();
				}*/
				 
				$data[$n->notify_class]['all'][]=$n;
				if(!$n->isRead)
					$data[$n->notify_class]['unread'][]=$n;
			}
		}
		 
		return $data;
	}
}
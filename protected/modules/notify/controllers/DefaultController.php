<?php

class DefaultController extends Controller
{
	public function actionIndex($id)
	{
		$notify = Notify::model()->findByPk($id);
		$notify->status = Notify::READ;
		$notify->read_date = time();

		$notify->save();
		if($notify->url){
			$this->redirect($notify->url);
		}

		$module = $module = Yii::app()->getModule('notify');

		if(isset($module->notifyConfig[$notify->notify_class])){
			$url = (
					isset($module->notifyConfig[$notify->notify_class][$notify->notify_event])&&
					isset($module->notifyConfig[$notify->notify_class][$notify->notify_event]['url']))? $module->notifyConfig[$notify->notify_class][$notify->notify_event]['url']
					:null;
			
			if(empty($url) && isset($module->notifyConfig[$notify->notify_class]['url'])){
				$url = $module->notifyConfig[$notify->notify_class]['url'];
			}
		}

		// get url from owner class config
		if(empty($url) && $notify->owner_class && 
				isset($module->notifyConfig[$notify->owner_class]) &&
				isset($module->notifyConfig[$notify->owner_class]['url'])){
			$url = $module->notifyConfig[$notify->owner_class]['url'];
				
		}

		if(!empty($url)){
			if($notify->item_id){
				$param = !empty($notify->params)? unserialize($notify->params):array();
				$param['id'] = $this->item_id;
				$url = Yii::app()->urlManager->createUrl($url,$param);
			}
				
			$this->redirect($url);
		}
		$this->render('index',array('model'=>$notify));
	}
}
<?php
class MemberInfo extends Portlet{
	
	public function renderContent(){
		if(Yii::app()->user->id){
			$user = User::model()->findByPk(Yii::app()->user->id);
			
			$this->render('memberinfo',array('user'=>$user));
		}
	}
}
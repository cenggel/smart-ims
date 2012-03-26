<?php
class MemberGroup extends Portlet{
	
	public function renderContent(){
		$groups = User::model()->findByPk(Yii::app()->user->id)->groups;
		
		$this->render("membergroup",array('groups'=>$groups));
	}
}
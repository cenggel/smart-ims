<?php
class UserBehavior extends CActiveRecordBehavior{
	public function memberOfGroup($group_id){
		$this->owner->getDbCriteria()->mergeWith(array(
				'condition'=>'t.id in (select gm.users_id from group_members gm where gm.groups_id = :group_id)',
				'params'=>array(':group_id'=>$group_id),
		));
		
		return $this->owner;
	}
}
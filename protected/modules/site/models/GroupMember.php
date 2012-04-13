<?php

/**
 * 
 * @author tsing
 * @property array $users
 * @property integer $groups_id
 * @property integer $administrator
 * 
 *
 */
class GroupMember extends CFormModel{
	
	public $groups_id;
	public $users;
	public $administrator;
	
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
				array('users, groups_id', 'required'),
				array('groups_id, administrator', 'numerical', 'integerOnly'=>true),
				array('users','type','type'=>'array'),
				// The following rule is used by search().
		);
	}
	
	public function attributeLabels(){
		return array(
				'users'=>Yii::t('siteModule.groups','工作组成员'),
				'groups_id'=>Yii::t('siteModule.groups','工作组'),
				'administrator'=>'管理员',
				);
	}
	
	
	public function save(){
		
	}
}
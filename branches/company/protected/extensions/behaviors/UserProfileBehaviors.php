<?php
class  UserProfileBehaviors extends CActiveRecordBehavior{
	public function getUserImage($size=30){
		
		$img=Yii::app()->theme->baseUrl . '/images/member' . $size . '.gif';
		if($this->owner->image){
			$img = Yii::app()->baseUrl . '/'. $this->owner->image;
		}
		return $img;
		
	}
}
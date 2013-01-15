<?php
class TagList extends Portlet{
	
	public function renderContent(){
		$tags= Tag::model()->findall();
		
	}
}
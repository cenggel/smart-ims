<?php
echo CHtml::openTag('ul');
if(is_array($notifies)){
	//echo "<br> begin <br>";
	foreach ($notifies as $n){
		//echo "$n->status <br>";
		echo CHtml::openTag('li');
		echo CHtml::link('['.$this->module->getEventLabel($n).']'.$n->title,$n->viewUrl,array('class'=>$n->isRead ?'read':'unread'));
		echo Chtml::openTag('span',array('class'=>'date'));
		echo Yii::app()->dateFormatter->format('yyyy-MM-dd hh:m:ss',$n->create_date);
		echo CHtml::closeTag('span');
		if($n->summary) 
			echo "<p>{$n->summary}</p>";
		echo CHtml::closeTag('li');
	}
}

echo CHtml::closeTag('ul');
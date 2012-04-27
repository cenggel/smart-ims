<?php

foreach ($blocks as $data){
	if(is_array($data)){
		if(isset($data['portlet']) &&$data['portlet']){
			$p = array();
			if($data['title']) $p['title']=$data['title'];
			if($data['portletOptions'])$p['htmlOptions']= $data['portletOptions'];
			$this->beginWidget('zii.widgets.CPortlet', $p);
		}

		if(isset($data['widget'])&&count($data['widget'])>=1){
			$param = $data['widget']['param']?$data['widget']['param']:array();
			$this->widget($data['widget']['name'],
					$param
			);
		}

		if(isset($data['content'])){
			echo $data['content'];
		}

		if(isset($data['portlet']) &&$data['portlet']){
			$this->endWidget();
		}
	}else if(is_string($data)){
		echo $data;
	}
}

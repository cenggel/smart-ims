<?php

//require_once ('framework/web/widgets/CWidget.php');

class FlexPaperViewer extends CWidget {
	protected static  $index=1;
	public $width= "100%";
	public $height = "600px";
	
	public $viewer = "";
	
	public $doc = "";
	
	public $name="";
	
	
	public function init(){
		if(empty($this->viewer)){			
			$this->viewer= Yii::app()->flexpaper->viewSingle ?Yii::app()->flexpaper->viewSingle:Yii::app()->baseUrl.'/flexpaper/php/simple_document.php';
		}
		if(strlen($this->doc)==0){
			throw  new CException("doument must be set!", "500");
		}
		
		if(strlen($this->name)==0){
			$this->name="flexpaperViewer_".self::$index;
			self::$index+=1;
		}
	}
	
	public function run(){
		
		echo<<<EOD
		<iframe src="$this->viewUrl" frameborder="0" name="$this->name" height="$this->height"
		width="$this->width" > 您的浏览器不支持 frame 无法显示</iframe>
EOD;
	}

	protected function getViewUrl(){
		$doc = Yii::app()->flexpaper->getPdfFileName($this->doc);
		$w= $this->getClientSize($this->width);
		$h= $this->getClientSize($this->height);
		return $this->viewer."?width=$w&height=$h&doc=$doc";
	}
	protected function getClientSize($var){
		$int = intval($var);
		if(strpos(strtolower($var), 'px')){
			return ($int-40).'px';
		}
	if(strpos(strtolower($var), '%')){
			return ($int-2).'%';
		}
	}
}

?>
<?php

//require_once ('framework/db/ar/CActiveRecordBehavior.php');
require_once 'mimetypes.php';
class PdfConvertBehavior extends CActiveRecordBehavior {

	public $file_field = 'file_path';
	
	
	public function afterSave($event){
		
		$file = $this->getFilePath();
		if($this->IsImage($file)) return  true;
		
		$realPath = realpath($file);
		if(file_exists($realPath) && !Yii::app()->flexpaper->isConverted($file)){
			Yii::app()->flexpaper->convertToPdf($file);
			Yii::app()->flexpaper->createThumb($file);
			return true;
		}
	}
	
	public function afterDelete($event){
		$file = $this->getFilePath();
		
		if(Yii::app()->flexpaper->isConverted($file)){
			unlink(Yii::app()->flexpaper->getOutPutFileName($file));
		}
		
	}
	
	protected  function getFilePath(){
		$field = $this->file_field;
		$file = $this->owner->$field;
		return $file;
	}
	
	protected function IsImage($filePath){
		return strpos(get_file_mimetype($filePath),'image') !==false;
	}
	
	public function getThumbUrl(){
		$file = $this->getFilePath();
		if($this->IsImage($file)){
			return Yii::app()->baseUrl.'/'. $file;
		}
		//echo"xxxxxxxxxxxxxxxxx";
		//var_dump(file_exists(Yii::app()->flexpaper->getOutPutFileName($file))&&!file_exists(Yii::app()->flexpaper->getThumbUrl($file)));
		$flex = Yii::app()->flexpaper;
		
		if(file_exists(Yii::app()->flexpaper->getOutPutFileName($file))&&!file_exists(Yii::app()->flexpaper->getThumbPath($file))){
			Yii::app()->flexpaper->createThumb($file);
		}
		//echo "<br> $file";
		//var_dump(Yii::app()->flexpaper->getThumbUrl($file));
		//var_dump(realpath(Yii::app()->flexpaper->getThumbUrl($file)));
		//var_dump("/smart-ims/images/thumbs/2ac01ecb161e9efea099e29d930475441.jpg");
		//var_dump(file_exists(Yii::app()->flexpaper->getThumbPath($file)));
		if(file_exists(Yii::app()->flexpaper->getThumbPath($file))){
		  return  Yii::app()->flexpaper->getThumbUrl($file);
		}
		
		if(method_exists($this->owner, "getExtImageUrl")){
			return $this->owner->extImageUrl;
		}
	}
}

?>
<?php
class AttachmentArBehavior extends CActiveRecordBehavior{
	public $class_code='';
	public $upload_path='upload';
	
	public function getAttachments(){
		init();
		$id = $this->owner->id;
		if(empty($id)) return null;
		$crit = new CDbCriteria();
		$crit->compare('item_id', $id);
		if(empty($this->class_code)){
			$crit->addCondition(" class_code is null ");
		}else{
			$crit->compare('class_code', $this->class_code);
		}
		return Attachment::model()->findAll($crit) ;
	}
	
	public function getAttachClassCode(){
		init();
		return $this->class_code;
	}
	public function afterSave($event){
		init();
		$this->handleNewAttach();
		$this->handleUpdateAttach();
	}
	
	protected function handleNewAttach(){
		$atts = CUploadedFile::getInstances(new Attachment(),'file_path');
		$item_id = $this->owner->id;
		
		$basePath = $this->upload_path;
		
		if(substr($basePath, -1)=='/' ||substr($basePath, -1)=='\\' ){
			$basePath = substr($basePath, 0, strlen($basePath)-1);
		}
		if(count($atts)>0){
			foreach ($atts as $att){
				if(! $att->hasError){
					$model = new Attachment;
					$model->item_id = $item_id;
					if($this->class_code)
						$model->class_code = $this->class_code;
					$path = $basePath . DS . $att->name;
					
					if (file_exists($path)) {
						$path = str_replace('.'.$att->extensionName,'-'.time().'.'.$att->extensionName,$path);
					}
					
					$att->saveAs($path);
					$model->file_path = $path;
					$model->title = $att->name;
					$model->file_size = $att->size;
					$model->file_type = $att->type;
					$model->isImage = strpos($att->type, 'image')===false?0:1;
					
					$model->save();
					
				}else{
					Yii::app()->user->setFlash('error',Yii::t('core','<b>File upload error!</b> ERROR:{error} File Name:{name} ',array('{error}'=>$att->error,'{name}'=>$att->name)));
				}
		
			}
		}
	}
	
	protected function handleUpdateAttach(){
		$atts = Yii::app()->request->getParams('Attachment');
		if(is_array($atts)){
			foreach ($atts as $key => $att){
				$model = Attachment::model()->findByPk($key);
				if($model){
					$model->setAttributes($att);
					$model->save();
				}
			}
		}
	}
	protected function init(){
		
		$this->class_code = $this->owner->hasAttribute('class_code') && $this->owner->class_code? $this->owner->class_code:$this->class_code;
		
		$basePath = is_array(Yii::app()->params['uploadPath']) && Yii::app()->params['uploadPath'][$this->class_code]?
		Yii::app()->params['uploadPath'][$this->class_code]:
		(is_string(Yii::app()->params['uploadPath'])?Yii::app()->params['uploadPath']:'upload');
		
		$this->upload_path = $basePath;
	}
	
	public function afterDelete($event){
				
		init();
		
		$atts = $this->getAttachements();
		
		if($atts){
			foreach ($atts as $att){
				$file = $att->file_path;
				if ($file&&file_exists($file))
					unlink($file);
				$att->remove();
			}
		}
		
	}
	
	
	public function setFileAttribute($field_varname){
		$model =$this->owner;
		$value = CUploadedFile::getInstance($model,$field_varname);
		
		if ($value) {
			$old_file = $model->getAttribute($field_varname);
			$file_name = $this->upload_path.'/'.$value->name;
			if (file_exists($file_name)) {
				$file_name = str_replace('.'.$value->extensionName,'-'.time().'.'.$value->extensionName,$file_name);
			}
			
			if ($old_file&&file_exists($old_file))
				@unlink($old_file);
			
			$value->saveAs($file_name);
			
			$value = $file_name ;
		} else {
			if (isset($_POST[get_class($model)]['filedel'][$field_varname])&&$_POST[get_class($model)]['filedel'][$field_varname]) {
				$old_file = $model->getAttribute($field_varname);
				if ($old_file&&file_exists($old_file))
					@unlink($old_file);
				$value='';
			} else {
				$value = $model->getAttribute($field_varname);
			}
		}
		$model->setAttribute($field_varname, $value)  ;
	}
}
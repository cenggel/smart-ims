<?php
class AttachmentArBehavior extends CActiveRecordBehavior{
	public $class_code='';
	public $upload_path='uploads';
	public $allowed='';
	public $maxsize=-1;
	public $useModelClassCode = false;
    
	private $_files;

	
	/**
	 * add attachment relative relations to model.
	 * attachCount: attachment count relation
	 * attach: attachment relation.
	 * 
	 * usage:
	 * $model = $Post::model();
	 * $model->attachRel()->with('attach')->findAll();
	 * 
	 * @param string $class_code  attachment class code default false use defualt class_code.
	 */
	public  function attachRel($class_code=false){

		if($class_code) {
			$this->class_code=$class_code;
		}
		else{
			$this->init();
		}
		if(!$this->owner->metaData->hasRelation('attachCount')){
			$this->owner->metaData->addRelation('attachCount',
					array(CActiveRecord::STAT, 'Attachment', 'item_id','condition'=>"class_code= '{$this->class_code}'"));
		}

		if(!$this->owner->metaData->hasRelation('attach')){
			$this->owner->metaData->addRelation('attach',
					array(CActiveRecord::HAS_MANY, 'Attachment', 'item_id','condition'=>'attach.class_code= :class_code','params'=>array(':class_code'=>$this->class_code)));
		}
		return $this->owner;
	}
	
	/**
	 * return model relative attachments.
	 * 
	 */
	public function getAttachments(){
		$this->init();
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

	/**
	 * get applied class code.
	 * 
	 * 
	 */
	public function getAttachClassCode(){
		$this->init();
		return $this->class_code;
	}
	
	
	/**
	 * after save model handle attachment.
	 */
	public function afterSave($event){
		//echo "aftersave";
		$this->init();
		$this->handleNewAttach();
		$this->handleUpdateAttach();
		
		return true;
	}

	/**
	 * save uploaded files and save infomation to attachment table.
	 * 
	 */
	protected function handleNewAttach(){
		$atts = CUploadedFile::getInstances(new Attachment(),'file_path');
		//print_r($atts); exit;
		$item_id = $this->owner->id;

		$basePath = $this->upload_path;

		if(substr($basePath, -1)=='/' ||substr($basePath, -1)=='\\' ){
			$basePath = substr($basePath, 0, strlen($basePath)-1);
		}

		if(!is_dir($basePath)){
			mkdir($basePath,0777,true);
		}
		if(count($atts)>0){
			$paths =array();
			foreach ($atts as $att){
				if(! $att->hasError){
					
					$model = new Attachment;
					$model->item_id = $item_id;
					
					$path = $basePath . "/attach_{$item_id}_" . date('YmdHis').rand(1, 1000).'.'.$att->extensionName ;
					
					

					if (file_exists($path)) {
						$path = str_replace('.'.$att->extensionName,'-'.time().'.'.$att->extensionName,$path);
					}

					$att->saveAs($path);
					$paths[]=$path;
					if($this->class_code)
						$model->class_code = $this->class_code;
					
					$model->file_path = $path;
					$model->title = $att->name;
					$model->file_size = $att->size;
					$model->file_type = $att->type;
					$model->isImage = strpos($att->type, 'image')===false?0:1;
					try{
						//echo "<br>save attach $path";
					   if(!$model->save()){
					   	  unlinkFiles($paths);
					   	  $errstr="";
					   	  foreach ($model->getErrors() as $err){
					   	  	$errstr = implode("<br>", $err);
					   	  }					   	  
					   	  throw new CException($errstr, "500");
					   }
					   //echo "<br> save ok! <pre>";
					   //print_r($model);
					   //exit();
					}
					catch (Exception $e){
					
						unlinkFiles($paths);
						throw $e;
					}
					
					

				}else{
					Yii::app()->user->setFlash('error',Yii::t('core','<b>File upload error!</b> ERROR:{error} File Name:{name} ',array('{error}'=>$att->error,'{name}'=>$att->name)));
				}

			}
		}
	}

	protected function unlinkFiles($paths) {
		foreach ( $paths as $path )
			if (file_exists ( $path )) {
				unlink ( $path );
			}
	}
	/**
	 * update attachment title and descriptiong or delete attachment when select deleteflag.
	 * 
	 */
	protected function handleUpdateAttach(){
		$atts = Yii::app()->request->getParam('Attachment');
		if(is_array($atts)){
			foreach ($atts as $key => $att){
				$model = Attachment::model()->findByPk($key);

				if($model){// print_r($model);
					if($att['deleteFlag']){
						if(file_exists($model->file_path))
							unlink($model->file_path);
						$model->delete();
					}else{
						$model->setAttributes($att);
						$model->save();
					}
				}
			}
		}
	}
	
	/**
	 * init attachment class code and file save path etc.
	 */
	protected function init(){

		if($this->useModelClassCode)
			$this->class_code = $this->owner->hasAttribute('class_code') && $this->owner->class_code? $this->owner->class_code:$this->class_code;

		$basePath = is_array(Yii::app()->params['uploadPath']) && Yii::app()->params['uploadPath'][$this->class_code]?
		Yii::app()->params['uploadPath'][$this->class_code]:
		(is_string(Yii::app()->params['uploadPath'])?Yii::app()->params['uploadPath']:'uploads');

		$this->upload_path = $basePath;
	}

	/**
	 * after model deleted delete relative attachment.
	 * 
	 * @see CActiveRecordBehavior::afterDelete()
	 */
	public function afterDelete($event){

		$this->init();

		$atts = $this->getAttachments();

		if($atts){
			foreach ($atts as $att){
				$file = $att->path;
				if ($file&&file_exists($file))
					unlink($file);
				$att->delete();
			}
		}

		return true;

	}


	/**
	 * save uploaded file to server and set file path to given attribute.
	 * @param string $field_varname file attribute name
	 */
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
	
	

	/**
	 * (non-PHPdoc)
	 * @see CModelBehavior::beforeValidate()
	 */
	public  function beforeValidate($event){
		/* 
		 * @todo write attachment file validation
		$atts = CUploadedFile::getInstances(new Attachment(),'file_path');
		$this->owner->addError('attachment', "attachment valiate error");
		$event->isValid=false;
		*/
	}
}
<?php
class AttachWidget extends CWidget{

	/**
	 *
	 * @var CActiveRecord
	 */
	public $model=null;
	public $options =array();
	public $fileOptions =array();
	
	/**
	 * 
	 * @var string 
	 * admin :display upload file field and update Attach title
	 * view :only show attach and download buttons
	 */
	public $state ='admin';

	public function init(){

		if($this->model == null){
			throw new Exception(Yii::t("error","Model must can not be null ."),'500',null);
		}
		if(!($this->model instanceof CActiveRecord)){
			throw new Exception(Yii::t("error","Model must instance of CActiveRecord ."),'500',null);
		}

		//@todo auto attach attachment behavior

		parent::init();
	}

	public function run(){
		Yii::app()->clientScript->registerCoreScript('multifile');

		$this->render('attach_'. $this->state,array('model'=>model,
				'attachModel'=>new Attachment(),
				'options'=>$this->options,
				'fileOptions'=>$this->fileOptions));
	}
}
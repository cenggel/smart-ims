<?php
class AttachWidget extends CWidget{

	
	/**
	 *
	 * @var CActiveRecord
	 */
	public $model=null;
	
	/**
	 * 
	 * @var array paramers (see {@link CMultiFileUpload})
	 */
	public $options =array();
	public $htmlOptions =array();
	
	
	/**
	 * 
	 * @var string 
	 * admin :display upload file field and update Attach title
	 * view :only show attach and download buttons
	 */
	public $type ='admin';

	private $_assetsUrl;
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
		Yii::app()->clientScript->registerCssFile($this->getAssetsUrl().'/css/attach.css');

		$attach = new Attachment();
		$attach->unsetAttributes();
		if(!is_array($this->options)) $this->options= array();
		$this->render('attach_'. $this->type,array('model'=>$this->model,
				'attachModel'=>$attach,
				'options'=>$this->options,
				'htmlOptions'=>$this->htmlOptions));
	}
	
	protected function getAssetsUrl()
	{
		if ($this->_assetsUrl !== null)
			return $this->_assetsUrl;
		else
		{
			$assetsPath = Yii::getPathOfAlias('application.extensions.attachment.assets');
	
			if (YII_DEBUG)
				$assetsUrl = Yii::app()->assetManager->publish($assetsPath, false, -1, true);
			else
				$assetsUrl = Yii::app()->assetManager->publish($assetsPath);
	
			return $this->_assetsUrl = $assetsUrl;
		}
	}
}
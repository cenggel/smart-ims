<?php

class FormGenerator extends CWidget {
	
	public $model;
	public $displayAttribes;
	public $id;
	public $enableAjaxValidation;
	public $htmlOptions=array();
	public $templateFile;
	public $headerHtmlOption;
	public $bodyHtmlOption;
	public $defaultHtmlOptions;
	
	public $form;
	
	/**
	 * 
	 * @see CBaseController::getViewFile()
	 */
	function getViewFile($viewName) {
		return parent::getViewFile ( $viewName );
		//TODO - Insert your code here
	}
	
	public function init() {
		if ($this->model === null)
			throw new CException ( Yii::t ( 'yii', '{class} must specify "model" property values.', array ('{class}' => get_class ( $this ) ) ) );
		if ($this->displayAttribes == null) {
			if (method_exists ( $this->model, 'getDisplayAttribes' )) {
				$this->displayAttribes = $this->model->getDisplayAttribs ();
			}
		}
		if ($this->displayAttribes === null) {
			throw new CException ( Yii::t ( 'yii', '{class} must specify "displayAttribes" property values.', array ('{class}' => get_class ( $this ) ) ) );
		}
		if(!$this->templateFile){
			$this->templateFile = 'FormGenerator';
		}
		//$this->htmlOptions['id']=$this->id;
	}
	
	public function run() {
		
		$this->render ( $this->templateFile, 
			array (
				'model' => $this->model, 
				'displayAttribes' => $this->displayAttribes,
				'form'=>$this->form,
				'headerHtmlOption'=>$this->headerHtmlOption,
				'bodyHtmlOption'=>$this->bodyHtmlOption, )
			 );
	}
}


?>
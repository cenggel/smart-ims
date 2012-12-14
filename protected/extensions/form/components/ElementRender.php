<?php
/**
 * @property $lable
 * @property $htmlOptions
 * @property $element
 * @property $id
 * @property $type
 * @property $name
 *
 */
class ElementRender {
	protected $attribes = array ();
	protected $model = null;
	protected $htmlOptions = array ();
	protected $form =null;
	protected $type;
	protected $name;

	protected $owner;
	public function __construct(& $owner){
		$this->owner = $owner;
	}
	public function __get($name) {
		switch ($name){
			case 'label': return $this->renderLable(false);
			case 'htmlOptions':
				if(!array_key_exists('class')){
					$this->htmlOptions['class']=$this->type;
				}else{
					$this->htmlOptions['class'].=' '.$this->type;
				}
				return $this->htmlOptions;
			case 'element':
				return  $this->renderField(false);
			case 'id':
				return get_class($this->model).'_'.$this->name;
			case 'type':
				return $this->type;
			case 'name':
				return $this->name;
			default:
				return array_key_exists ( $name, $this->attribes )?$this->attribes [$name]:"";
		}

	}
	public function __set($name, $value) {
		if ($name == "attribes" && is_array ( $value )) {
			$this->attribes = $value;
		} else if($name == 'htmlOptions'){
			$this->htmlOptions=$value;
		}else{
			$this->attribes [$name] = $value;
		}
	}

	public function getError(){

	}
	public function renderField($output = true) {
		// 	echo "$this->type    $this->name <br>";
		$render = $this->type . 'Render';
		if (method_exists ( $this, $render )) {
			$ele = $this->$render ();
			if ($output) {
				echo $ele;
			} else {
				return $ele;
			}
		} else {
			echo Yii::t ( 'admin', 'field type {attrtype} not supported by FormGenerator.', array ('{attrtype}' => $this->type ) );
			;
		}
	}

	protected function textRender() {
		if($this->form){
			return $form->textField($this->model,$this->name,$this->htmlOptions);
		}
		return CHtml::activeTextField($this->model,$this->name,$this->htmlOptions);
	}
	protected function dropdownRender() {
		$list=$this->data;
		if($list&&!is_array($list)){
			$list=Enumeration::items($list);
		}
		if(empty($list))
			$list=array();
		return CHtml::activeDropDownList($this->model,$this->name,$list,$this->htmlOptions);

	}
	protected function fileRender(){
		if($this->multi){
			Yii::app()->clientScript->registerCoreScript('multifile');
			$this->htmlOptions['class'] =$this->htmlOptions['class']? $this->htmlOptions['class']."multi":$this->htmlOptions['class']='multi';
			CHtml::resolveNameID($this->model,$this->name,$this->htmlOptions);
			$htmlOptions = $this->htmlOptions;
			$hiddenOptions=isset($htmlOptions['id']) ? array('id'=>CHtml::ID_PREFIX.$htmlOptions['id']) : array('id'=>false);
			$ret = CHtml::hiddenField($htmlOptions['name'],'',$hiddenOptions);			
			
			//$this->htmlOptions['name'] = $this->htmlOptions['name'].'[]';
			$ret = $ret . CHtml::fileField($this->htmlOptions['name'].'[]','',$htmlOptions);
		}else {
		$ret=CHtml::activeFileField($this->model,$this->name,$this->htmlOptions);
		}
		
		if($this->showThumb&&!empty($this->model->$this->name)){

			$ret.="<div class=\"file-thumb\">";
			if($this->isImage($this->model->$this->name)){
				$ret.="<img class='image-thumb' src={$this->model->$this->name}/>";
			}
			$ret.="</div>";
		}
		return $ret;
	}

	protected  function dateRender(){
		//echo $this->id;

		$script = ' $(function() {// alert("aaa");
				$( "#'.$this->id.'" ).datepicker(jQuery.extend($.datepicker.regional["zh-CN"], {
				changeMonth: true,
				dateFormat:"yy-mm-dd",
				 showButtonPanel: true,
		changeYear: true}));

		if(!$( "#'.$this->id.'" ).val()){
		$( "#'.$this->id.'" ).datepicker("setDate",new Date());
	}else{

	var date = new Date();
	date.setTime(parseInt($( "#'.$this->id.'" ).val())*1000);
	$( "#'.$this->id.'" ).datepicker("setDate",date);
	}

	});';
		
		//var_dump($script1); exit;
		Yii::app()->clientScript->registerScript($this->id,$script,CClientScript::POS_READY);

		return $this->textRender();

	}

	protected function hiddenRender(){
		return CHtml::activeHiddenField($this->model,$this->name,$this->htmlOptions);
	}

	protected function checkRender(){
		if($this->data){
			return CHtml::activeCheckBoxList($this->model,$this->name,$this->data,$this->htmlOptions);
		}else{
			return CHtml::activeCheckBox($this->model,$this->name,$this->htmlOptions);
		}
	}

	protected function radioRender(){
		if($this->data){
			return CHtml::activeRadioButtonList($this->model,$this->name,$this->data,$this->htmlOptions);
		}else{
			return CHtml::activeRadioButton($this->model,$this->name,$this->htmlOptions);
		}
	}
	protected function listRender(){
		if($this->data){
			return CHtml::activeListBox($this->model,$this->name,$this->data,$this->htmlOptions);
		}else{
			return CHtml::activeRadioButton($this->model,$this->name,array('0'=>Yii::t('admin','--请选择--')),$this->htmlOptions);
		}
	}

	protected function attachRender(){
		
		ob_start();
		ob_implicit_flush(false);
		Yii::app()->Controller->widget('ext.attachment.Widgets.AttachWidget',array('model'=>$this->model,
				'options'=>$this->options,
				'htmlOptions'=>	$this->htmlOptions));
		
		return ob_get_clean();
	}
	protected function editorRender(){

		$ret=CHtml::activeTextArea($this->model,$this->name,array('rows'=>6, 'cols'=>60));;
		ob_start();
		ob_implicit_flush(false);

		if(empty($this->htmlOptions['editor'])){
			$option = array('name'=>$this->id,);
		}else {
			$option = $this->htmlOptions['editor'];
			unset($this->htmlOptions['editor']);
			$option['name']= $this->id;
		}

		if(isset($option['type'])&& $option['type']=='markitup'){
			Yii::app()->controller->widget('ext.form.markitup.markitup', array( 'model' => $this->model, 'attribute' => $this->name ));
			return ob_get_clean();
		}
		
		$widget=Yii::app()->getWidgetFactory()->createWidget($this,'application.extensions.editor.editor',
				$option);
		$widget->init();
		$widget->run();
		$ret.= ob_get_clean();
		//echo $ret;
		return $ret;
	}
	
	protected function tagRender(){
		$name = $this->name;
		$params = array('tags'=>$this->model->$name);
		if(isset($this->attribes['url'])){
			$params['url'] = $this->url;
		}
		ob_start();
		ob_implicit_flush(false);
		  
		Yii::app()->controller->widget('ext.form.tag.TagWidget',
				$params);
	
		$ret = ob_get_clean();
		return $ret;
	}
	protected function textareaRender(){
		return CHtml::activeTextArea($this->model,$this->name,array_merge($this->htmlOptions,array('rows'=>4, 'cols'=>60)));
	}
	protected function isImage($file){
		return in_array(strtolower(pathinfo($file,PATHINFO_EXTENSION)),Yii::app()->params['allowedImages']);
	}
	public function getLabel(){
		return $this->renderLable(true);
	}
	public function getElement(){
		return $this->renderField(true);
	}


	public function renderLable($output = true) {
		$attrlabel = CHtml::activeLabelEx ( $this->model, $this->name );
		if ($this->note) {
			$attrlabel .= "<br><p class=\"label-note\">{$this->note}</p>";
		}
		if ($output) {
			echo $attrlabel;
		} else {
			return $attrlabel;
		}
	}
	/**
	 *
	 *
	 */
	public function parse(&$model, $field,& $form=null) {
		$this->attribes = array ();
		$this->htmlOptions=array();
		$this->model = & $model;
		$this->form = & $form;

		if (is_string ( $field )) {
			$this->name = $field;
			//trace($model->getMetaData()->columns,true);
			$this->type = $this->parseType ($model->metaData->columns[$field]->type,$model->metaData->columns[$field]->size );

		} else if (is_array ( $field )) {
			$this->name = $field ['name'];
			$this->type = $this->parseType ( $field ['type'] );
			foreach ( $field as $key => $v ) {
				//echo "<br> $key";
				if ($key != 'type') {
					$this->$key = $v;
				}
			}
		}


		//关系处理


		//var_dump(($this->data));
			foreach (  $model->metaData->relations as $rel ) {
					
				if ($rel instanceof CActiveRelation &&  get_class ($rel) == 'CBelongsToRelation' && $rel->foreignKey == $this->name) {
					if ((strtolower($this->type) == 'dropdown' ||strtolower($this->type) =='text')&&  !is_array($this->data)&& class_exists ( $rel->className, false )) {
						$class=null;
						if (get_class($rel) == get_class($model))
							$class = & $model;
						else
							$class = new $rel->className ( );
							
						if($class){
							if (method_exists ( $class, 'getListData' ))
								$this->data = $class->getListData ();
							else
								$this->data = CHtml::listData ( $class->findAll (), 'id', 'name' );
							$this->type='dropdown';
						}
					}

				}
			}
		

		if(isset($this->owner) && isset($this->owner->defaultHtmlOptions)
				&& is_array($this->owner->defaultHtmlOptions) && isset($this->owner->defaultHtmlOptions[$this->type])){
			$this->htmlOptions = array_merge_recursive($this->htmlOptions,$this->owner->defaultHtmlOptions[$this->type]);
		}

		//echo $this->type ." ".$this->name;
		//print_r($this->owner->defaultHtmlOptions[$this->type]);
		//	 echo "<pre>";
		//	 print_r($field);
		//	 print_r($this);
		//	 echo "</pre>";
	}

	protected function parseType($type,$size=10) {

		if(stripos(strtoupper($type),'STRING')!==FALSE){

			return ($size>500 OR empty($size))?'textarea':'text';
		}elseif (stripos(strtoupper($type), 'INTEGER')!==false){
			return 'text';
		}
		switch(strtoupper($type)){
			case 'TEXT':
			case 'MEDIUMTEXT':
			case 'MEDIUMTEXT':
			case 'MEDIUMTEXT':
				return 'textarea';
			case 'FLOAT':
			case 'DOUBLE':
				return 'text';
			default:
				return $type;
		}
	}
}
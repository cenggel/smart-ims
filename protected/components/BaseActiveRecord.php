<?php
class BaseActiveRecord extends CActiveRecord{
	
	/**
	 * @return array 
	 * return a array of field list by format
	 * 
	 * array(
	 *    'section name'=>render field array,
	 *    
	 *    .....
	 * );
	 * render field array
	 *  array('field1','field2',//simple field
	 *     'field3'=>array('type'=>'hidden'), // hidden field
	 *     
	 *     //dropdown
	 *     'field4'=>array('type'=> 'dropdown','data'=>'enum_type_code'),// Enumeration type_code
	 *     'field5'=>array('type'=>'dropdown','data'=>array('code'=>'name',)),//array data
	 *     'relation_field'=>array('type'=>'dropdown'), //
	 *     
	 *     
	 *  )
	 *  
	 * 
	 */
	public function getFromFieldList(){}
	
	public function getFieldRender($section="default"){
		$fields = $this->getFromFieldList();
		$renders = array();
		if(is_array( $fields[$section])){
			foreach ($fields[$section] as $key=>$attr){
				$attrName = $attr;
				if (is_array ( $attr ) && empty ( $attr ['name'] )) {
					$attr ['name'] = $key;
				}else{
					$key = $attr;
				}	
				
				$render = new ElementRender ( );
				$render->parse ( $model, $attr );
				$renders[$key] = $render;
			}
		}
		
		return $renders;
	}
	
	public function behaviors(){
		return array( 'CAdvancedArBehavior' => array(
				'class' => 'application.extensions.CAdvancedArBehavior'));
	}
} 
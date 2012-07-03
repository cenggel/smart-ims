<?php
/**
 *
 *
 * @param array $params
 * @param Smarty $smarty
 * @return string
 */

function smarty_function_breadcrumbs($params,$smarty){
	if(!isset($params['links'])){
		throw new CException(Yii::t('yiiext', "You should specify links parameters."));
	}
	//print_r($smarty);exit;
	return $smarty->tpl_vars['this']->value->widget('zii.widgets.CBreadcrumbs', array(
			'links'=>$params['links'],
	),true);
	
}
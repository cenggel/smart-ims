<?php
function genMenuSection($label,$items){
	return array(
			'label'=>$label,
			'items'=>$items,
			'template'=>'<a ><span class="icon"></span>{menu}</a>',
			'itemOptions'=>array('class'=>'section'),
			);
}

function debug_print($var,$exit){
	echo "<pre>";
	print_r($var);
	echo "</pre>";
	
	if($exit)
		exit();
}
return array(
		/*'user'=>genMenuSection('profile', array(
				array('label'=>UserModule::t('Manage User'), 'url'=>array('/user/admin'),'visible'=>UserModule::isAdmin()),
				array('label'=>UserModule::t('List User'), 'url'=>array('/user/admin'),'visible'=>!UserModule::isAdmin()),
				array('label'=>UserModule::t('Profile'), 'url'=>array('/user/profile')),
				array('label'=>UserModule::t('Edit'), 'url'=>array('edit')),
				array('label'=>UserModule::t('Change password'), 'url'=>array('changepassword')),
				array('label'=>UserModule::t('Logout'), 'url'=>array('/user/logout')),
				)),
		*/
		);

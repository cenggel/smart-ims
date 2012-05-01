<?php
echo CHtml::openTag('div',$wrapHtmlOptions);

$tabs = array();
if(count($notifies)==0){
	echo Yii::t('notifyModule.core', 'No new notify found.');
}else{
	$module = Yii::app()->getModule('notify');

	$first = true;
	foreach ($notifies as $key=> $nc){
		//print_r($nc);
		$clabel = $module->getClassLabel($nc[all][0]);

		if(count($nc['unread']))
			$clabel .= $this->getBadges(count($nc['unread']));
		if(isset($nc['unread']) && count($nc['unread'])>0 && count($nc['all'])!=count($nc['unread'])){
				
			$tab=array('label'=>$clabel,
					'items'=>array(
							array('label'=>Yii::t('notifyModule.notify', 'All'),
									'content'=>$this->renderContent($nc['all']),),
							array('label'=>Yii::t('notifyModule.notify', 'Unread'),
									'content'=>$this->renderContent($nc['unread']),
							),
					),);
		}else{
			$tab=array('label'=>$clabel,
					'content'=>$this->renderContent($nc['all']),);
		}

		if($first){
			if($tab['items']){
				$tab['items'][1]['active']=true;
			}else{
				$tab['active'] = true;
			}
				
			$first =false;
		}

		$tabs[]= $tab;


	}
}

//print_r($tabs);

$this->widget('bootstrap.widgets.BootTabbable', array(
		'type'=>'tabs', // 'tabs' or 'pills'
		'encodeLabel'=>false,
		'tabs'=>$tabs,
));



echo CHtml::closeTag('div');
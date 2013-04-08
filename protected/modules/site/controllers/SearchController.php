<?php

class SearchController extends Controller
{
	public function actionIndex()
	{
		$q = Yii::app()->request->getParam('q');
		$page = max(0, Yii::app()->request->getParam('page','1'));
		//echo "$page";
		$pageSize = 30;
		$offset = max(0,($page -1))*$pageSize;
		$results = Yii::app()->solr->get($q,$offset,$pageSize);
		
		$this->render('index',array('results'=>$results,'page'=>$page,'q'=>$q,'pageSize'=>$pageSize));
		//echo "<pre>";
		//print_r($this->route);
	}

	// Uncomment the following methods and override them if needed
	/*
	public function filters()
	{
		// return the filter configuration for this controller, e.g.:
		return array(
			'inlineFilterName',
			array(
				'class'=>'path.to.FilterClass',
				'propertyName'=>'propertyValue',
			),
		);
	}

	public function actions()
	{
		// return external action classes, e.g.:
		return array(
			'action1'=>'path.to.ActionClass',
			'action2'=>array(
				'class'=>'path.to.AnotherActionClass',
				'propertyName'=>'propertyValue',
			),
		);
	}
	*/
}
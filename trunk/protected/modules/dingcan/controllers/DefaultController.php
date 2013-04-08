<?php

class DefaultController extends Controller {
	public $layout='//layouts/column2';
	
	public function actionIndex() {
		if (isset ( $_POST ['Dingcan'] )) {
			$model = new Dingcan ();
			$model->attributes = $_POST ['Dingcan'];
			$model->user_id = Yii::app ()->user->id;
			$cai = Cai::model()->findByPk($model->cai_id);
			if(Cai){
				$model->total_price = $model->count * $cai->price;
			}
			//if(!$model->book_date){
			//	$model->book_date =strtotime ( date ( 'Y-m-d' ) );
			//}
			$model->save ();
			$this->redirect(array("index"));
		}
		$time = strtotime ( date ( 'Y-m-d' ) );
		$cai = Cai::model ()->find ( "cai_date = :vcai_date", array (':vcai_date' => $time ) );
		$dingcan = new Dingcan ();
		$dingcan->book_date = $time;
		$book = $dingcan->search (' user_id ');
		
		$dingcan->count = 1;
		
		$count = Yii::app ()->db->createCommand ()->select ( 'sum(count)  count ,sum(total_price) total_price ' )->from ( 'dingcai' )->where ( "book_date = :vbook_date", array (':vbook_date' => $time ) )->queryRow ();
		
		$caiBook = $dingcan->statCaiBook();
		$usersum = $dingcan->statUserSum();
		$this->render ( 'index', array ('cai' => $cai, 'book' => $book, 'model' => $dingcan, 'count' => $count ,'caiBook'=>$caiBook,'usersum'=>$usersum) );
	}
	
	public function actionDelete($id) {
		if (Yii::app ()->request->isPostRequest) {
			// we only allow deletion via POST request
			$this->loadModel ( $id )->delete ();
			
			// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
			if (! isset ( $_GET ['ajax'] ))
				$this->redirect ( isset ( $_POST ['returnUrl'] ) ? $_POST ['returnUrl'] : array ('admin' ) );
		} else
			throw new CHttpException ( 400, 'Invalid request. Please do not repeat this request again.' );
	}
	
	public function loadModel($id) {
		$model = Dingcan::model ()->findByPk ( $id );
		if ($model === null)
			throw new CHttpException ( 404, 'The requested page does not exist.' );
		return $model;
	}
	
	public function allowedActions() {
		if(isset(Yii::app()->params['allowedActions'][Yii::app()->controller->getId()])){
			return Yii::app()->params['allowedActions'][Yii::app()->controller->getId()];
		}
		return '';
	}
	
	public function actionMybook(){
		
		$time = strtotime ( date ( 'Y-m-d' ) );
		$dingcan = new Dingcan ();
		$dingcan->book_date = $time;
		$dingcan->user_id = Yii::app()->user->id;
		$book = $dingcan->search ();
		$this->render ( 'mybook', array ('book' => $book) );
		
	}
}
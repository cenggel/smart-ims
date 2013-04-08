<?php


class solrListWidget extends CWidget {
    public $cssFile='';
    public $results=null;
    public $type='simple';
    public $options=array();
    public $htmlOptions=array();
    
    
    /**
     * 
     * @var string name of the GET variable storing the current page index. Defaults to 'page'
     */
    public $pageVar='page';
    
    public $page='1';
    public $pageSize = '30';
    
    public $searchVar='q';
    
    
    private $_assetsUrl;
    
	public function init(){

		parent::init();
	}

	public function run(){
		
		if(!empty($this->cssFile)){
		  Yii::app()->clientScript->registerCssFile($this->cssFile);
		}else {
			Yii::app()->clientScript->registerCssFile($this->assetsUrl .'/searchindex.css');
		}
		  
		$pagination = new CPagination();
		//$pagination->currentPage= $this->page;
		$pagination->pageVar= $this->pageVar;
		$pagination->pageSize = $this->pageSize;
		$pagination->params = array('q'=>Yii::app()->request->getParam($this->searchVar));
		if(!empty($this->results)){
		  $pagination->itemCount = $this->results->response->numFound;
		}else{
			$pagination->itemCount=0;
		}

		//print_r($pagination);
		$this->render('solrResultList_'. $this->type,array(
				'options'=>$this->options,
				'htmlOptions'=>$this->htmlOptions,
				'results'=>$this->results,
				'pagination'=>$pagination,
		        'pageSize'=>$this->pageSize,
		));
	}
	
	protected function getAssetsUrl()
	{
		if ($this->_assetsUrl !== null)
			return $this->_assetsUrl;
		else
		{
			$assetsPath = Yii::getPathOfAlias('application.extensions.solr.assets');
	
			if (YII_DEBUG)
				$assetsUrl = Yii::app()->assetManager->publish($assetsPath, false, -1, true);
			else
				$assetsUrl = Yii::app()->assetManager->publish($assetsPath);
	
			return $this->_assetsUrl = $assetsUrl;
		}
	}
	
	/**
	 * 
	 * Enter description here ...
	 * @param unknown_type $data
	 */
	public function getTitle($data){
		
	}
    protected function getValueByData($data,$val_str) {
		//echo $val_str;	
		if (strpos ( $val_str, '$data' ) === false)
			return $val_str;
		
		return eval ( "return $val_str ;" );
	
	}
}

?>
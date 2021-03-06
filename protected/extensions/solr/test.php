<?php
require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'phpSolrClient'.DIRECTORY_SEPARATOR.'Service.php');
require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'phpSolrClient'.DIRECTORY_SEPARATOR.'Document.php');
class test{
 /**
    * Host name
    * 
    * @var strinf
    */
    public $host='localhost';
    
    /**
    * The port of the solr server
    * 
    * @var int
    */
    public $port='8983';
    
    /**
    * The Solr index (core)
    * 
    * @var string (the url path)
    */
    public $indexPath = '/solr';
    public $_solr;
    
    public function init()
    { // parent::init();
        if(!$this->host || !$this->indexPath)
            throw new CException('No server or index selected.');
        else 
            $this->_solr = new Apache_Solr_Service($this->host, $this->port, $this->indexPath);
        if (!$this->_solr->ping()){
            echo "$this->host, $this->port, $this->indexPath";
            
            throw new CException('Solr service not responding.');
        }
    }
    
    /**
    * This function add or update one entry on solr index
    * 
    * @param array $document Example: array('id'=>1,'title'=>'the title of the article')
    */
    
    public function updateOne($document=array()){
        if(!is_array($document)){
            throw new CException('Document must be an array.');
        }
        $part = new Apache_Solr_Document();
        foreach ( $document as $key => $value ) {
            $part->$key = $value;
        }
        $documents[] = $part;
        try {
          $this->_solr->addDocuments( $documents );
          $this->_solr->commit();
          $this->_solr->optimize();
          return true;
        }
        catch ( Exception $e ) {
            throw new CException('Solr error: '.$e->getMessage());
        }
        return false;
    }
    /**
    * This function add or update one entry on solr index
    * 
    * @param array $document Example: 
    * array('0'=>array('id'=>1,'title'=>'the title of the article 2'),                   
    *       '1'=>array('id'=>2,'title'=>'the title of the article 2')
    *       );
    */
    
    public function updateMany($documents=array()){
        if(!is_array($documents)){
            throw new CException('Documents must be an array.');
        }
        foreach ( $documents as $item => $document ) {
            $part = new Apache_Solr_Document();
            foreach ( $document as $key => $value ) {
                $part->$key = $value;
            }
            $docs[] = $part;
        }
        
        try {
          $this->_solr->addDocuments( $docs );
          $this->_solr->commit();
          $this->_solr->optimize();
          return true;
        }
        catch ( Exception $e ) {
            throw new CException('Solr error: '.$e->getMessage());
        }
        return false;
    }
    
    /**
    * Return resutls for a query
    * 
    * @param mixed $query
    * @param mixed $offset
    * @param mixed $limit
    * @param mixed $additionalParameters
    * 
    * Example: $additionalParameters = array('facet' => 'true',
    *                               'facet.field' => 'links',
    *                               'sort'=> 'id desc'
    *                                );
    * 
    * @return Apache_Solr_Response 
    * 
    * 
    */
    public function get($query, $offset = 0, $limit = 30, $additionalParameters=array())      {
      $response = $this->_solr->search($query, $offset, $limit, $additionalParameters);
      if ( $response->response->numFound > 0 ) {
            return($response);
      }
    }
    
    
    /**
     * 
     * post file to solr
     * @param string $file
     * @param array $params
     * @param string $mimetype
     * @param Apache_Solr_Document $document
     */
    public function extract($file, $params = array(),  $mimetype = 'application/octet-stream',$document = null){
    	try{
    		return $this->_solr->extract($file,$params,$document,$mimetype);
    		
    	}catch (Exception $e){
    		 throw new CException('Solr error: '.$e->getMessage());
    	}
    }
    
    /**
	 * Create a delete document based on document ID
	 *
	 * @param string $id Expected to be utf-8 encoded
	 * @param boolean $fromPending
	 * @param boolean $fromCommitted
	 * @param float $timeout Maximum expected duration of the delete operation on the server (otherwise, will throw a communication exception)
	 * @return Apache_Solr_Response
	 *
	 * @throws Apache_Solr_HttpTransportException If an error occurs during the service call
	 */
    public function deleteById($id, $fromPending = true, $fromCommitted = true, $timeout = 3600){
    	return  $this->_solr->deleteById($id, $fromPending, $fromCommitted, $timeout);
    }
    
    public function deleteByQuery($rawQuery, $fromPending = true, $fromCommitted = true, $timeout = 3600)
	{
		  $this->_solr->deleteByQuery($rawQuery);
		$this->_solr->commit ();
		$this->_solr->optimize ();
	}
}

class data{
  public $class_code = "dataClass";
  public $item_id=2;
  public $id=23;
  public $file_path="/test/test";
}
$data = new data();
$str='$data->file_path?realpath($data->file_path):\"\"';
echo "$str \n";

echo eval( "return \"$str\" ;");
//return;
$t = new Test();
$t->init();
$t->deleteByQuery('*:*');
//$t->updateOne(array('id'=>'article_24','content'=>'�ҵ�ȫ�ļ���','url'=>'http://test.com'));
//$t->extract("D:\web\wwwdocs\smart-ims\upload\Chrysanthemum.jpg", array("id"=>"attach_1","url" => "", "title" => "Chrysanthemum.jpg", "description" => "", "mimetype" => "image/jpeg", ), "image/jpeg") ;
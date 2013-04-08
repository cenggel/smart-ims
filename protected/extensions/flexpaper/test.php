<?php
$yii=dirname(__DIR__).'/../../../yii/yii-1.1.13/framework/yii.php';
echo $yii;
require_once ($yii);
require_once 'HttpTransport.php';
require_once dirname(__DIR__).'/EHttpClient/EHttpClient.php';
define('APACHE_MIME_TYPES_URL','http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types');
require_once 'mimetypes.php'; 


function generateUpToDateMimeArray($url){
    $s=array();
    foreach(@explode("\n",@file_get_contents($url))as $x)
        if(isset($x[0])&&$x[0]!=='#'&&preg_match_all('#([^\s]+)#',$x,$out)&&isset($out[1])&&($c=count($out[1]))>1)
            for($i=1;$i<$c;$i++)
              $s[$out[1][$i]] = $out[1][0];
               // $s[]="  '".$out[1][$i].'\' => \''.$out[1][0].'\'';
    //$result= @sort($s)?"$mime_types = array(\n".implode($s,",\n")."\n);":false;
   // echo $result;
    //return $result;
    return $s;
}



class CFlexpaper {

	public $jodserviceUrl = "http://134.0.133.248:8088/jodconverter/service";
	//public $jodserviceUrl = "http://134.0.133.248:8983/solr";
	
	/**
	 * 
	 * @var string openOffice service ip
	 */
	public $host = "127.0.0.1";
	
	/**
	 * 
	 * @var string openOffice service port
	 */
	public $port = "8088";
	
	
	/**
	 * 
	 * @var string flexpaper simple viewer url
	 */
	public $viewSingle = "";
	
	/**
	 * 
	 * @var string flexpaper split viewer url
	 */
	public $viewSplit = "";
	
	
	public $viewMode = "single";
	
	/**
	 * 
	 * @var String folder path of save pdf files.
	 */
	public $pdfPath ="d:\\docs\\pdf";
	

	
	public function init(){
		//parent::init();
		
		if(empty($this->viewSingle)&&empty($this->viewSplit)){
			//throw new CException ( 'viewer url must be set!' );
		}
		
		if(empty($this->pdfPath)){
			throw new CException ( 'pdfPath must be set!' );
		}
		
		

	}
	
	public function convertToPdf($file){
		
	}
	
	public  function convertByJodConvertSerivce($file){		
		$outputFile = $this->pdfPath . DIRECTORY_SEPARATOR . $this->getPdfFileName($file);
		//echo "output file name = $outputFile\n";
		$client = new EHttpClient($this->jodserviceUrl, array(
		    'maxredirects' => 0,
		    'timeout'      => 300));
		
		
		$client->setRawData(file_get_contents(realpath($file)),get_file_mimetype($file));
		
		$client->setHeaders('Accept','application/pdf');
		$response = $client->request(EHttpClient::POST); 
		if($response->isSuccessful()){
           file_put_contents($outputFile, $response->getBody());
		}else{
			throw new CException($response->getMessage(), $response->getStatus());
		}
	}
	
	
	
	protected function getPdfFileName($file){
		return md5($file).".pdf";
	}
}


$paper = new CFlexpaper();

//var_dump( get_file_mimetype("d:\\test.xlsx")); exit;
echo "begin";
echo $paper->convertByJodConvertSerivce("d:\\test.xlsx");
echo "end";
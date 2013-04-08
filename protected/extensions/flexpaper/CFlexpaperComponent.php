<?php

//require_once ('framework/base/CApplicationComponent.php');


Yii::import('ext.EHttpClient.*');
require_once 'mimetypes.php';
class CFlexpaperComponent extends CApplicationComponent {
	
	public $jodserviceUrl = "http://134.0.133.248:8088/jodconverter/service";
	
	/**
	 * 
	 * @var string openOffice service ip
	 */
	//public $host = "127.0.0.1";
	
	/**
	 * 
	 * @var string openOffice service port
	 */
	//public $port = "8088";
	
	//public $path = "/jodconverter/service";
	
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
	public $pdfPath = "";
	
	public $thumbDir="images/thumbs";
	
	
	
	public function init() {
		parent::init ();
		
		if (empty ( $this->viewSingle ) && empty ( $this->viewSplit )) {
			throw new CException ( 'viewer url must be set!' );
		}
		
		if (empty ( $this->pdfPath )) {
			throw new CException ( 'pdfPath must be set!' );
		}
		
		if(!is_dir($this->thumbDir)){
			mkdir($this->thumbDir,'777',true);
		}
	
	}
	
	public function getThumbDir(){
		return $this->thumbDir;
	}
	
	public function createThumb($file){
		$pdfbox = dirname(__FILE__);
		$pdfName = $this->getPdfFileName($file);
		$thumb = $this->thumbDir .'/'.substr($pdfName, 0,strrpos($pdfName, '.'));
		$pdfpath = $this->getOutPutFileName($file);
		$command = "java -jar  {$pdfbox}/pdfbox-app.jar PDFToImage -endPage 1  -outputPrefix $thumb -nonSeq  $pdfpath";
		$output="";
		$retrun="";		
		exec($command,$output,$retrun);
		/*$thumbsrc = $this->pdfPath . DIRECTORY_SEPARATOR . $thumb.'1.jpg';
		//$thumbdes = $this->getThumbPath($file);
		echo " desc=$thumbdes <br> src = $thumbsrc <br>";
		if(file_exists($thumbsrc)){
			copy($thumbsrc, $thumbdes);
			//unlink($thumbsrc);
		}
		*/

	}
	public function convertToPdf($file) {
		return $this->convertByJodConvertSerivce($file);
	}
	
	protected function convertByJodConvertSerivce($file) {
		
		$outputFile = $this->pdfPath . DIRECTORY_SEPARATOR . $this->getPdfFileName ( $file );
		//echo "output file name = $outputFile\n";
		$client = new EHttpClient ( $this->jodserviceUrl, array ('maxredirects' => 0, 'timeout' => 300 ) );
		
		$client->setRawData ( file_get_contents ( realpath ( $file ) ), get_file_mimetype ( $file ) );
		
		$client->setHeaders ( 'Accept', 'application/pdf' );
		$response = $client->request ( EHttpClient::POST );
		if ($response->isSuccessful ()) {
			file_put_contents ( $outputFile, $response->getBody () );
			return true;
		} else {
			throw new CException ( $response->getMessage (), $response->getStatus () );
		}
	}
	
	public function getPdfFileName($file) {
		//echo __FUNCTION__." $file <br> md5= " .md5($file) ."<br>";
		return md5 ( $file ) . ".pdf";
	}
	
	public function getOutPutFileName($file){
		return $this->pdfPath . DIRECTORY_SEPARATOR . $this->getPdfFileName ( $file );
	}
	public function isConverted($filename){
		return  file_exists($this->getOutPutFileName($filename));
	}
	
	public function getThumbPath($file){
		//echo __FUNCTION__." $file <br> md5= " .md5($file) ."<br>";
		return $this->getThumbDir() . DIRECTORY_SEPARATOR . md5($file) .'1.jpg';
		
	}
	
    public function getThumbUrl($file){
    	//echo __FUNCTION__." $file <br> md5= " .md5($file) ."<br>";
		return Yii::app()->baseUrl .'/'. $this->thumbDir . '/' . md5($file) .'1.jpg';
		
	}
}

?>
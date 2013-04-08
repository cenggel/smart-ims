<?php

//require_once ('framework/db/ar/CActiveRecordBehavior.php');


class SolrBehavior extends CActiveRecordBehavior {
	
	/**
	 * 
	 * document id
	 * @var string
	 */
	public $id;
	/**
	 * 
	 * 保存的数据
	 * @var array
	 */
	public $data;
	
	/**
	 * 
	 * 提交的文件绝对路径后网络路径（http://... or https://...）
	 * @var string
	 */
	public $file = NULL;
	
	public $stripTags = true;
	
	/**
	 * 
	 * config 中定义的  CSolrComponent 组件名字
	 * @var CSolrComponent
	 */
	public $solr = NULL;
	
	public function afterSave($event) {
		
		$this->init ();
		
		if (! empty ( $this->id ) && ! isset ( $this->data ['id'] )) {
			$this->data ['id'] = $this->id;
		}
		
		if ($this->stripTags)
			foreach ( $this->data as $k => $v ) {
				$this->data [$k] = strip_tags ($this->getValueByData (  $v ) );
			}
		
		$this->file = $this->getValueByData ( $this->file );
		if (is_null ( $this->file ) || empty ( $this->file )) {
			$this->solr->updateOne ( $this->data );
			return true;
		} else {
			//print_r($this->data); exit;
			$mimetype = isset ( $this->data ['mimetype'] ) ? $this->data ['mimetype'] : 'application/octet-stream';
			$this->solr->extract ( $this->file, $this->data, $mimetype );
		
		}
		
		return true;
	}
	
	public function afterDelete($event) {
		if (! $this->id) {
			$this->id = $this->getValueByData ( $this->id );
			$this->solr->deleteById ( $this->id );
		}
		return true;
	}
	
	public function init() {
		if (is_null ( $this->data ))
			$this->data = array ();
	
	}
	
	protected function getValueByData($val_str) {
		//echo $val_str;	
		if (strpos ( $val_str, '$data' ) === false)
			return $val_str;
		$data = $this->owner;
		return eval ( "return $val_str ;" );
	
	}
}

?>
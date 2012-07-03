<?php
Class WebUser extends RWebUser{
	
	/**
	 * (non-PHPdoc)
	 * @see RWebUser::checkAccess()
	 */
	public function checkAccess($operations, $params=array(), $allowCaching=true){
		$result = false;
		if(is_array($operations)){
			foreach ($operations as $operation)
		   $pos = strrpos($operation, '.');
			if(!($pos ===false)){
				$result = $result||$this->checkOneAccess( substr($operation, 0,$pos).'.*' ,$params,$allowCaching);
			}
			
			$result = $result||$this->checkOneAccess($operation,$params,$allowCaching);
			
			if($result) return true;
		
		}else{
			$pos = strrpos($operations, '.');
			//var_dump($pos);
			if(!($pos ===false)){
				//echo "pos := $pos / " .$operations ."  = " .substr($operations, 0,$pos).'.*<br>';
				$result = $result||$this->checkOneAccess( substr($operations, 0,$pos).'.*' ,$params,$allowCaching);
			}
			
			$result = $result||$this->checkOneAccess($operations,$params,$allowCaching);
		}
		
		return $result;
	}
	
	protected function checkOneAccess($operation, $params=array(), $allowCaching=true){
	   return parent::checkAccess($operation,$params,$allowCaching);	
	}
}
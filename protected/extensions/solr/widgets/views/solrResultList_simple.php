<?php

$q = Yii::app ()->request->getParam ( 'q' );
$form = $this->beginWidget ( 'CActiveForm', array ('id' => 'search-large-form', 'enableAjaxValidation' => false,'method'=>'get' ,
'action'=>Yii::app()->getController()->createUrl("")));

echo CHtml::textField ( 'q', $q, array ('class' => 'input-xxlarge' ) );
echo CHtml::submitButton ( '搜索',array ('style'=>'height:30px; margin-bottom:10px; padding-left:30px;padding-right:30px;' ) );

$this->endWidget ();
?>

<div class="search-index" >

<?php

if (! empty ( $results )) {
	
foreach ( $results->response->docs as $i => $doc ) {
		/*<th><?php echo htmlspecialchars($field, ENT_NOQUOTES, 'utf-8'); ?></th>
   *          <td><?php echo htmlspecialchars($value, ENT_NOQUOTES, 'utf-8'); ?></td>
   * 
   */
		
		$id = $doc->id;
		$highlight = $results->highlighting->$id;
		
		$title = $highlight->title ? $highlight->title : $doc->title;
		if(is_array($title)) $title = implode("", $title);
		$abstract = "";
		$hascontent =false;
		foreach ( $highlight as $k=>$h ) {
			if(in_array($k, array('content','description'))) $hascontent =true;
			$abstract .= is_array ( $h ) ? implode ( "", $h ) : $h;
		}
		if(!$hascontent){
			$abstract .= empty($doc->description)?$doc->description: substr($doc->content, 0,200);
		}
		
		$abstract = strip_tags($abstract,'<em>');
		echo <<<EOD
<div class="doc pos-{$i}" >


    <h2><a href="{$doc->url}" target="_blank">$title</a></h2>
    <div class="abstract">
       $abstract
    </div>
    <div class="links">
        <span class="url">{$doc->url}</span>
    </div>
</div>
EOD;
	
	}
	
	

	$this->widget ( 'CLinkPager', array ('pages' => $pagination ) );
} else if (! empty ( $q )) {
	echo "没有搜索到<em>$q</em>相关内容";
} else {
	echo "请输入查询内容";
}
?>

</div>
<div class="clear">&nbsp;</div>

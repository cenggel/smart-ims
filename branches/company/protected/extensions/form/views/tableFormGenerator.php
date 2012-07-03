
<div class="form"><pre><?php //print_r($this);?></pre>
<?php
if (empty ( $displayAttribes )) {
echo Yii::t ( "admin", "no attribe to display." );
Yii::app ()->end ( 0 );
}

$form1 = $this->beginWidget ( 'CActiveForm',
array ('id' => $this->id,
'enableAjaxValidation' => $this->enableAjaxValidation,
'htmlOptions'=>$this->htmlOptions ) );

?>
<pre><?php //print_r($model->MetaData);?></pre>
<table>
<?php
$rowcnt = 0;
$hidden =array();
foreach ( $displayAttribes as $key => $attr ) {
$attrName = $attr;
if (is_array ( $attr ) && empty ( $attr ['name'] )) {
$attr ['name'] = $key;
}

if(strtolower($attr['type'])=='hidden'){
$hidden[] = attr;
continue;
}
$render = new ElementRender ( );
$render->parse ( $model, $attr );
echo "<tr class=\"row\"><th>{$render->label}</th><td>{$render->element}</td></tr>";

}

foreach($hidden as $attr){
$render = new ElementRender ( );
$render->parse ( $model, $attr );
echo "<tr class=\"row hidden\" style=\"display:none;\"><th>{$render->label}</th><td>{$render->element}</td></tr>";

}
?>
<tr><td colspan="2"><div class="row buttons">
<?php
echo CHtml::submitButton ( $model->isNewRecord ? 'Create' : 'Save' );
?>
</div></td></tr>
</table>



<?php
$this->endWidget ();
?>
</div>
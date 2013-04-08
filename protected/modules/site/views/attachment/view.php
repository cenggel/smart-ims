<?php
$this->breadcrumbs=array(
	'附件'=>array('#'),
	$model->title,
);

$content = <<<EOD
<div class="attach-info">
   <h2> $model->title </h2>
   <p> $model->description </p>
   <a href="$model->downloadUrl" class="attach-download" >download</a>
</div>
EOD;
$this->blocks['left'][]=array('content'=>$content);
/*$this->menu=array(
	array('label'=>'List Attachment','url'=>array('index')),
	array('label'=>'Create Attachment','url'=>array('create')),
	array('label'=>'Update Attachment','url'=>array('update','id'=>$model->id)),
	array('label'=>'Delete Attachment','url'=>'#','linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Attachment','url'=>array('admin')),
);*/
?>

<?php 
if($model->isImage!=1){
$this->widget('ext.flexpaper.widgets.FlexPaperViewer',array(
	'doc'=>$model->file_path,
	
)); 

}else{
 echo CHtml::image($model->downloadUrl,$model->title,array('width'=>'100%'));
}?>

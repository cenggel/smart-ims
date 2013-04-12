<?php 
$url = Yii::app()->baseUrl .'/' . $data->file_path;
?>
<li class="span3">
<a href="<?php echo $url ?>" class="thumbnail" rel="tooltip" data-title="<?php echo $data->doc_name ?>" target="_blank">
<img src="<?php echo Yii::app()->baseUrl .'/' . $data->file_path?>" alt="<?php echo $data->doc_name ?>">
</a>

</li>
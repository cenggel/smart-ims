
<div class="attach-row span4">
<div class="span6 first">
<div class="thumbnail">
<a href="<?php echo $data->url?>"  target="_blank">
 <?php echo CHtml::image($data->thumbUrl,$data->title,array('class'=>'att-thumb')); //echo $data->extImage; ?>
 </a>
 </div>
</div>
<div class="span6 first">
 <a href="<?php echo $data->url?>"  target="_blank">
  <?php  echo $data->title?>
 </a>
 <p><?php echo $data->description;?> </p>
</div>
</div>
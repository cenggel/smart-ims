<?php $this->beginContent('//layouts/main'); 
 $class="grid_24";
 if(isset($this->params['contentClass'])){
 	$class= $this->params['contentClass'];
 }
?>

<div id="content" class="clearfix <?php echo $class?>">
	<?php echo $content; ?>
</div><!-- content -->
<?php $this->endContent(); ?>
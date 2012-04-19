<script type="text/javascript" src="<?php echo $this->path; ?>/ckeditor.js"></script>
<script type="text/javascript">
        $('#<?php echo $this->name; ?>').wrap("<div class='editor'></div>"); 
        CKEDITOR.replace( "<?php echo $this->name; ?>" ,{
        	'filebrowserUploadUrl' :'<?php echo Yii::app()->urlManager->createUrl('home/fileuploader');?>'
            });
</script>
